"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ConsentPreferences } from "@/lib/cookies/consent";

export function CookiePreferencesDialog({
  initialValue,
  onSave,
}: {
  initialValue: ConsentPreferences;
  onSave: (value: ConsentPreferences) => void;
}) {
  const [analytics, setAnalytics] = useState(initialValue.analytics);
  const [marketing, setMarketing] = useState(initialValue.marketing);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto cursor-pointer px-0 text-base text-foreground/70">
          Configurar cookies
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[1.5rem] border-white/80 bg-[#fffaf7] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl">Preferencias de cookies</DialogTitle>
          <DialogDescription className="text-foreground/65">
            Puedes aceptar solo las necesarias o activar analiticas y marketing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-white/70 p-4">
            <p className="font-medium text-foreground">Necesarias</p>
            <p className="mt-1 text-base leading-7 text-foreground/65">
              Siempre activas para que la web funcione correctamente.
            </p>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-border/70 bg-white/70 p-4">
            <div>
              <p className="font-medium text-foreground">Analiticas</p>
              <p className="mt-1 text-base leading-7 text-foreground/65">
                Nos ayudan a entender el uso del sitio y mejorar contenidos.
              </p>
            </div>
            <Checkbox
              checked={analytics}
              onCheckedChange={(checked) => setAnalytics(checked === true)}
              className="mt-1 cursor-pointer"
            />
          </label>
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-border/70 bg-white/70 p-4">
            <div>
              <p className="font-medium text-foreground">Marketing</p>
              <p className="mt-1 text-base leading-7 text-foreground/65">
                Permiten personalizacion y posibles campañas futuras.
              </p>
            </div>
            <Checkbox
              checked={marketing}
              onCheckedChange={(checked) => setMarketing(checked === true)}
              className="mt-1 cursor-pointer"
            />
          </label>
        </div>
        <Button
          className="mt-2 cursor-pointer rounded-full"
          onClick={() =>
            onSave({
              necessary: true,
              analytics,
              marketing,
              updatedAt: new Date().toISOString(),
            })
          }
        >
          Guardar preferencias
        </Button>
      </DialogContent>
    </Dialog>
  );
}
