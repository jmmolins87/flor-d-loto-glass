"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      occasion: "",
      message: "",
      privacy: true,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    setIsSuccess(false);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("No hemos podido enviar tu mensaje. Intentalo de nuevo.");
      return;
    }

    setIsSuccess(true);
    toast.success("Mensaje enviado. Te responderemos muy pronto.");
    reset();
  });

  return (
    <form className="surface space-y-5 p-6 md:p-8" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-base font-medium text-foreground" htmlFor="name">
            Nombre
          </label>
          <Input id="name" {...register("name")} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <p className="text-base text-destructive">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium text-foreground" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="text-base text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-base font-medium text-foreground" htmlFor="phone">
            Telefono
          </label>
          <Input id="phone" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? (
            <p className="text-base text-destructive">{errors.phone.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium text-foreground" htmlFor="occasion">
            Ocasión o necesidad
          </label>
          <Input
            id="occasion"
            {...register("occasion")}
            aria-invalid={Boolean(errors.occasion)}
          />
          {errors.occasion ? (
            <p className="text-base text-destructive">{errors.occasion.message}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium text-foreground" htmlFor="message">
          Cuéntanos lo que necesitas
        </label>
        <Textarea
          id="message"
          rows={6}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p className="text-base text-destructive">{errors.message.message}</p>
        ) : null}
      </div>
      <Controller
        name="privacy"
        control={control}
        render={({ field }) => (
          <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white/60 p-4">
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="mt-1"
              aria-invalid={Boolean(errors.privacy)}
            />
            <span className="text-base leading-7 text-foreground/72">
              Acepto la politica de privacidad y autorizo el uso de mis datos para responder a mi
              consulta.
            </span>
          </label>
        )}
      />
      {errors.privacy ? (
        <p className="text-base text-destructive">{errors.privacy.message}</p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button disabled={isSubmitting} type="submit" className="rounded-full px-7">
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 size-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar consulta"
          )}
        </Button>
        {isSuccess ? (
          <p className="text-base text-primary">Todo listo. Hemos recibido tu mensaje.</p>
        ) : (
          <p className="text-base text-foreground/55">Respuesta habitual en menos de 24h.</p>
        )}
      </div>
    </form>
  );
}
