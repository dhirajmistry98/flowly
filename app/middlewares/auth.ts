import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { base } from "./base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

export const requiredAuthMiddleware = base
  .$context<{
    session?: { user?: KindeUser<Record<string, unknown>>; plan?: string };
  }>()
  .middleware(async ({ context, next }) => {
    const session = context.session ?? (await getSession());

    if (!session.user) {
      return redirect("/api/auth/login");
    }
    return next({
      context: { user: session.user, plan: session.plan },
    });
  });

const getSession = async () => {
  const { getUser, getClaim } = getKindeServerSession();
  const user = await getUser();
  const plan = await getClaim("plan");

  return {
    user,
    plan: plan?.value as string | undefined,
  };
};
