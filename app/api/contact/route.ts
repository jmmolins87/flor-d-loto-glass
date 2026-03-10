import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos no validos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Solicitud recibida correctamente.",
  });
}
