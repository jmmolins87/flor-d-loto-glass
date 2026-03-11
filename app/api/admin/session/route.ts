import { NextResponse } from "next/server";

import {
  createAdminSessionValue,
  getAdminSessionCookieName,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  isValidAdminPassword,
} from "@/lib/admin-auth";

function buildRedirectUrl(request: Request, path: string, next?: string) {
  const url = new URL(path, request.url);

  if (next && next.startsWith("/")) {
    url.searchParams.set("next", next);
  }

  return url;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const nextPath = String(formData.get("next") || "/admin");

  if (!isAdminAuthConfigured()) {
    return NextResponse.redirect(buildRedirectUrl(request, "/admin/login?error=missing-config"), 303);
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.redirect(
      buildRedirectUrl(request, "/admin/login?error=invalid-password", nextPath),
      303,
    );
  }

  const response = NextResponse.redirect(new URL(nextPath.startsWith("/") ? nextPath : "/admin", request.url), 303);
  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: await createAdminSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  return response;
}
