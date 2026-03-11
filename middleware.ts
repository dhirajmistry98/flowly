import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  return withAuth(request);
}

export const config = {
  matcher: [
    /*
     * Only run the auth middleware on dashboard/workspace routes.
     * This intentionally excludes:
     *   - /api/auth/*   → Kinde callback (single-use code — must never be double-hit)
     *   - /             → marketing landing page (public)
     *   - /_next/*      → Next.js internals
     *   - /favicon.ico, /icon.png, etc. → static assets
     */
    "/workspace/:path*",
  ],
};
