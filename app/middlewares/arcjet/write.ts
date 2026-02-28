import arcjet, {  sensitiveInfo, slidingWindow } from "@/lib/arcjet";
import { base } from "../base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

const buildStandardAj = () =>
  arcjet.withRule(
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 40,
    })
  ).withRule(
     sensitiveInfo({
      mode: "LIVE",
      deny:["PHONE_NUMBER","CREDIT_CARD_NUMBER"],
     })
     );

export const writeSecuritymiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardAj().protect(context.request, {
      userId: context.user.id,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw errors.RATE_LIMITED({
          message: "Too many impactual changes. please slow down",
        });
      }
      if (decision.reason.isSensitiveInfo()) {
        throw errors.FORBIDDEN({
          message: "Sensitive information detected!!",
        });
      }

      throw errors.FORBIDDEN({
        message: "Request Blocked!!",
      });
    }

    return next();
  });
