import { NextResponse } from "next/server";

import {
  createAdminSessionValue,
  getAdminSessionCookieName,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  isValidAdminPassword,
} from "@/lib/admin-auth";
import { storyblokEditorUrl } from "@/lib/storyblok/env";

function buildRedirectUrl(request: Request, path: string, next?: string) {
  const url = new URL(path, request.url);

  if (next) {
    url.searchParams.set("next", next);
  }

  return url;
}

function resolveNextUrl(request: Request, next?: string) {
  if (!next) {
    return new URL(storyblokEditorUrl);
  }

  if (next.startsWith("/")) {
    return new URL(next, request.url);
  }

  try {
    const externalUrl = new URL(next);
    const allowedOrigin = new URL(storyblokEditorUrl).origin;

    if (externalUrl.origin === allowedOrigin) {
      return externalUrl;
    }
  } catch {}

  return new URL(storyblokEditorUrl);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const nextPath = String(formData.get("next") || storyblokEditorUrl);

  if (!isAdminAuthConfigured()) {
    return NextResponse.redirect(buildRedirectUrl(request, "/admin/login?error=missing-config"), 303);
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.redirect(
      buildRedirectUrl(request, "/admin/login?error=invalid-password", nextPath),
      303,
    );
  }

  const response = NextResponse.redirect(resolveNextUrl(request, nextPath), 303);
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
