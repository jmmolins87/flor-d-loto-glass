"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminLoginFormProps = {
  errorMessage: string | null;
  isConfigured: boolean;
  nextPath: string;
};

export function AdminLoginForm({
  errorMessage,
  isConfigured,
  nextPath,
}: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action="/api/admin/session" method="POST" className="space-y-5">
      <input type="hidden" name="next" value={nextPath} />
      <div className="space-y-2">
        <label className="text-base font-medium text-foreground" htmlFor="password">
          Contraseña
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Introduce la contraseña del panel"
            autoComplete="current-password"
            disabled={!isConfigured}
            required
            className="pr-14"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute inset-y-0 right-2 flex w-10 items-center justify-center rounded-full text-foreground/56 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
            disabled={!isConfigured}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {errorMessage ? <p className="text-base text-destructive">{errorMessage}</p> : null}

      <div className="rounded-[1.6rem] border border-white/72 bg-white/52 p-4 text-sm leading-6 text-foreground/64">
        {isConfigured ? (
          <p>La sesión dura 12 horas y se guarda en una cookie firmada del servidor.</p>
        ) : (
          <p>Define las variables de entorno para activar la protección antes de usar el panel.</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="rounded-full px-7" disabled={!isConfigured}>
          Entrar al panel
        </Button>
        <Button asChild variant="ghost" className="rounded-full px-7">
          <Link href="/">Volver a la web</Link>
        </Button>
      </div>
    </form>
  );
}
