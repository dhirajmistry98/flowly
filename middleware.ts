import arcjet, { detectBot } from "@arcjet/next";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
        "CATEGORY:MONITOR",
        "CATEGORY:WEBHOOK",
      ],
    }),
  ],
});

export default withAuth(
  async function middleware(req: any) {
    // 1. Run Arcjet protection
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Org code redirect logic
    const url = req.nextUrl;
    const orgCode =
      req.kindeAuth?.user?.org_code ||
      req.kindeAuth?.token?.org_code ||
      req.kindeAuth?.token?.claims?.org_code;

    if (
      url.pathname.startsWith("/workspace") &&
      !url.pathname.includes(orgCode || "")
    ) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = `/workspace/${orgCode}`;
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    publicPaths: ["/", "/api/uploadthing", "/api/auth", "/rpc"],
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (Kinde auth routes - EXCLUDING THESE IS CRITICAL)
     * - rpc (ORPC routes)
     * - any static file with an extension (e.g. .png, .jpg, .svg)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|rpc|.*\\..*).*)",
  ],
};
