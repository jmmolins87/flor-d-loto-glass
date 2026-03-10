import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
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
