import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Indica tu nombre."),
  email: z.email("Introduce un email valido."),
  phone: z.string().min(9, "Indica un telefono valido."),
  occasion: z.string().min(2, "Cuéntanos la ocasion."),
  message: z.string().min(20, "Necesitamos algo mas de contexto para ayudarte."),
  privacy: z.literal(true, "Debes aceptar la politica de privacidad."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
