/* eslint-disable @typescript-eslint/no-explicit-any */
import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

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

async function existingProxy(req: NextRequest): Promise<NextResponse> {
  const anyReq = req as {
    nextUrl: NextRequest["nextUrl"];
    kindeAuth?: { token?: any; user?: any };
  };

  const url = req.nextUrl;

  const orgCode =
    anyReq.kindeAuth?.user?.org_code ||
    anyReq.kindeAuth?.token?.org_code ||
    anyReq.kindeAuth?.token?.claims?.org_code;

  if (
    url.pathname.startsWith("/workspace") &&
    !url.pathname.includes(orgCode || "")
  ) {
    url.pathname = `/workspace/${orgCode}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

const authProxy = withAuth(existingProxy, {
  publicPaths: ["/", "/api/uploadthing", "/api/auth"],
}) as (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse>;

export default createMiddleware(aj, authProxy);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (Kinde auth routes - VERY IMPORTANT to exclude to avoid double-initiation)
     * - rpc (ORPC routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|rpc).*)",
  ],
};
