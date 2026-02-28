import aj, {shield,slidingWindow,sensitiveInfo, detectBot} from "@/lib/arcjet";
import { base } from "../base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

const buildAiAj = () => {
  return aj.withRule(
    shield({
      mode: "LIVE",
    })
   ).withRule(
    slidingWindow({
      mode: "LIVE",
      interval: 10,
      max: 3,
    })
   ).withRule(
    detectBot({
      mode: "LIVE",
      allow:["CATEGORY:SEARCH_ENGINE","CATEGORY:PREVIEW"],
    })
   ).withRule(
   sensitiveInfo({
    mode: "LIVE",
    deny:["PHONE_NUMBER","CREDIT_CARD_NUMBER"],
   })
   );
};

export const aiSecuritymiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildAiAj().protect(context.request, {
      userId: context.user.id,
    });
    if (decision.isDenied()) {
      if (decision.reason.isSensitiveInfo()) {
        throw errors.FORBIDDEN({
          message: "Sensitive information detected!!",
        });
      }
      if (decision.reason.isRateLimit()) {
        throw errors.RATE_LIMITED({
          message: "Too many impactual changes. please slow down",
        });
      }
      if (decision.reason.isBot()) {
        throw errors.FORBIDDEN({
          message: "Automated traffic blocked!!",
        });
      }
      if (decision.reason.isShield()) {
        throw errors.FORBIDDEN({
          message: "Request Blocked by security policy!!",
        });
      } 
       throw errors.FORBIDDEN({ message:"REQUEST BlOCKED!!"})
      
    }
    return next();
  });
