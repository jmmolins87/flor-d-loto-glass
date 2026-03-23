import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { storyblokPreviewSecret } from "@/lib/storyblok/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  if (!storyblokPreviewSecret || secret !== storyblokPreviewSecret) {
    return NextResponse.json({ message: "Secret invalido." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, request.url));
}
