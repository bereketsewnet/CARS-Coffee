import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isForgotPassword = pathname === "/admin/forgot-password";
  const isResetPassword = pathname === "/admin/reset-password";
  const isApiAuth = pathname.startsWith("/api/auth");
  const isPublicAdminPage = isLoginPage || isForgotPassword || isResetPassword;

  // Always allow NextAuth API routes through
  if (isApiAuth) return NextResponse.next();

  // Check for NextAuth session cookie
  const sessionCookie =
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token");
  const isLoggedIn = !!sessionCookie;

  // Redirect unauthenticated users away from admin pages (except public pages like login/forgot/reset)
  if (isAdminRoute && !isPublicAdminPage && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login to dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
