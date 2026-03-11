import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  getAdminSessionCookieName,
  isAdminAuthConfigured,
  verifyAdminSessionValue,
} from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!isAdminAuthConfigured()) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "missing-config");
    return NextResponse.redirect(loginUrl);
  }

  const sessionCookie = request.cookies.get(getAdminSessionCookieName())?.value;
  const isAuthenticated = await verifyAdminSessionValue(sessionCookie);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);

  if (pathname !== "/admin") {
    loginUrl.searchParams.set("next", `${pathname}${search}`);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
