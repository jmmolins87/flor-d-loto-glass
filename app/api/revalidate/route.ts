import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { storyblokRevalidateSecret } from "@/lib/storyblok/env";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!storyblokRevalidateSecret || secret !== storyblokRevalidateSecret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/ocasiones");
  revalidatePath("/sobre-nosotros");
  revalidatePath("/contacto");
  revalidatePath("/politica-cookies");
  revalidatePath("/politica-privacidad");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
