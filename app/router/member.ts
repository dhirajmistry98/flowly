import z from "zod";
import { heavyWriteSecuritymiddleware } from "../middlewares/arcjet/heavy-write";
import { standardSecuritymiddleware } from "../middlewares/arcjet/standard";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";
import { requiredWorkSpaceMiddleware } from "../middlewares/workspace";
import { inviteMemberSchema } from "../schemas/member";
import { init, organization_user, Organizations, Users } from "@kinde/management-api-js";
import { getAvatar } from "@/lib/get-avatar";
import { readSecuritymiddleware } from "../middlewares/arcjet/read";

function getKindeErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "body" in error &&
    typeof error.body === "object" &&
    error.body !== null
  ) {
    const body = error.body as {
      message?: string;
      errors?: Array<{ message?: string }> | { message?: string };
    };

    if (typeof body.message === "string" && body.message.length > 0) {
      return body.message;
    }

    if (Array.isArray(body.errors) && typeof body.errors[0]?.message === "string") {
      return body.errors[0].message;
    }

    if (
      !Array.isArray(body.errors) &&
      typeof body.errors?.message === "string" &&
      body.errors.message.length > 0
    ) {
      return body.errors.message;
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.length > 0
  ) {
    return error.message;
  }

  return "Unable to invite this member right now.";
}

function hasKindeScopeError(error: unknown, scope: string) {
  return getKindeErrorMessage(error).includes(`Scope is missing: ${scope}`);
}

function isExistingUserError(error: unknown) {
  const message = getKindeErrorMessage(error).toLowerCase();

  return (
    message.includes("already exists") ||
    message.includes("already been taken") ||
    message.includes("already in use") ||
    message.includes("duplicate")
  );
}

async function findUserByEmail(email: string) {
  const response = await Users.getUsers({
    email,
    expand: "organizations",
  });

  return response.users?.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase(),
  );
}

async function addUserToWorkspace(orgCode: string, userId: string) {
  await Organizations.addOrganizationUsers({
    orgCode,
    requestBody: {
      users: [{ id: userId }],
    },
  });
}

export const inviteMember = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .use(standardSecuritymiddleware)
  .use(heavyWriteSecuritymiddleware)
  .route({
    method: "POST",
    path: "/workspace/members/invite",
    summary: "Invite Member",
    tags: ["Members"],
  })
  .input(inviteMemberSchema)
  .output(z.void())
  .handler(async ({ input, context, errors }) => {
    init();

    const email = input.email.trim().toLowerCase();

    try {
      await Users.createUser({
        requestBody: {
          organization_code: context.workspace.orgCode,
          profile: {
            given_name: input.name,
            picture: getAvatar(null, email),
          },
          identities: [
            {
              type: "email",
              details: {
                email,
              },
            },
          ],
        },
      });
    } catch (error) {
      if (!isExistingUserError(error)) {
        throw errors.BAD_REQUEST({
          message: getKindeErrorMessage(error),
        });
      }

      try {
        const existingUser = await findUserByEmail(email);

        if (!existingUser?.id) {
          throw errors.BAD_REQUEST({
            message: "This member already exists, but their workspace access could not be resolved.",
          });
        }

        if (existingUser.organizations?.includes(context.workspace.orgCode)) {
          throw errors.BAD_REQUEST({
            message: "This member is already in the workspace.",
          });
        }

        await addUserToWorkspace(context.workspace.orgCode, existingUser.id);
        return;
      } catch (lookupError) {
        if (hasKindeScopeError(lookupError, "read:users")) {
          throw errors.BAD_REQUEST({
            message:
              "This email already exists in Kinde. Add the `read:users` management scope if you want Flowly to attach existing accounts to a workspace.",
          });
        }

        if (
          typeof lookupError === "object" &&
          lookupError !== null &&
          "code" in lookupError &&
          lookupError.code === "BAD_REQUEST"
        ) {
          throw lookupError;
        }

        throw errors.BAD_REQUEST({
          message: getKindeErrorMessage(lookupError),
        });
      }
    }
  });


  export const listMembers = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .use(standardSecuritymiddleware)
  .use(readSecuritymiddleware)
.route({
  method:"GET",
  path:'/workspace/members',
  summary:"List All Members",
  tags:["Members"],
})
.input(z.void())
.output(z.array(z.custom<organization_user>()))
.handler(async({context,errors})=>{
       try {
      init();
      const data = await Organizations.getOrganizationUsers({
        orgCode: context.workspace.orgCode!,
        sort:'name_asc'
      });
      if (!data.organization_users) {
        throw errors.NOT_FOUND();
      }
      return data.organization_users;
       } catch {
      throw errors.INTERNAL_SERVER_ERROR();
       }
})
