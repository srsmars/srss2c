import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
  createRouteMatcher,
} from "@convex-dev/auth/nextjs/server";
import {
  isBypassRoutes,
  isPublicRoutes,
  isProtectedRoutes,
} from "./lib/permissions";
import { NextResponse } from "next/server";

const BypassMatcher = createRouteMatcher(isBypassRoutes);
const PublicMatcher = createRouteMatcher(isPublicRoutes);
const ProtectedMatcher = createRouteMatcher(isProtectedRoutes);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    // Bypass routes (webhooks, auth, convex APIs, etc.)
    if (BypassMatcher(request)) {
      return NextResponse.next();
    }

    // Check if user is logged in
    const authed = await convexAuth.isAuthenticated();

    // If user is logged in and tries to access a public page → redirect to dashboard
    if (PublicMatcher(request) && authed) {
      return nextjsMiddlewareRedirect(request, "/dashboard");
    }

    // If route is protected and user is NOT logged in → redirect to sign-in
    if (ProtectedMatcher(request) && !authed) {
      return nextjsMiddlewareRedirect(request, "/auth/sign-in");
    }

    // Otherwise, allow request
    return NextResponse.next();
  },
  {
    cookieConfig: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
