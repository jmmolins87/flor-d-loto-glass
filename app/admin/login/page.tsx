import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

import { AdminLoginForm } from "@/components/forms/admin-login-form";
import {
  getAdminSessionCookieName,
  isAdminAuthConfigured,
  verifyAdminSessionValue,
} from "@/lib/admin-auth";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "invalid-password") {
    return "La contraseña no es correcta.";
  }

  if (error === "missing-config") {
    return "Faltan ADMIN_LOGIN_PASSWORD y/o ADMIN_LOGIN_SECRET en .env.local.";
  }

  return null;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const currentSession = cookieStore.get(getAdminSessionCookieName())?.value;

  if (await verifyAdminSessionValue(currentSession)) {
    redirect(params.next || "/admin");
  }

  const errorMessage = getErrorMessage(params.error);
  const isConfigured = isAdminAuthConfigured();

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(103,152,126,0.22),transparent_32%),radial-gradient(circle_at_85%_14%,rgba(214,169,96,0.18),transparent_22%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(240,232,222,0.92))]" />
      <div className="shell section-space">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,252,247,0.92),rgba(237,229,216,0.84))] p-8 shadow-[0_40px_120px_-46px_rgba(47,60,76,0.42)] md:p-12">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(90,140,116,0.24),transparent_62%)] blur-2xl" />
            <div className="absolute bottom-0 left-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(205,168,110,0.18),transparent_62%)] blur-2xl" />
            <p className="eyebrow">Acceso editorial</p>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl text-foreground md:text-6xl">
              Una entrada privada antes de tocar el contenido en vivo.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/70">
              El panel de Sanity queda detrás de una contraseña adicional para evitar accesos
              directos a `/admin` y separar mejor la parte pública de la operativa editorial.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.8rem] border border-white/80 bg-white/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                <ShieldCheck className="size-5 text-primary" />
                <p className="mt-4 text-base font-medium text-foreground">Acceso filtrado</p>
                <p className="mt-2 text-sm leading-6 text-foreground/62">
                  Solo se entra al Studio si existe una sesión válida.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/80 bg-white/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                <KeyRound className="size-5 text-primary" />
                <p className="mt-4 text-base font-medium text-foreground">Contraseña externa</p>
                <p className="mt-2 text-sm leading-6 text-foreground/62">
                  Añade una barrera simple incluso si la URL del panel es conocida.
                </p>
              </div>
            </div>
          </section>

          <section className="surface relative p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/80 bg-white/72 shadow-[0_16px_40px_-24px_rgba(47,60,76,0.45)]">
                <LockKeyhole className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-primary/78">Panel privado</p>
                <h2 className="font-serif text-3xl text-foreground">Entrar en `/admin`</h2>
              </div>
            </div>

            <AdminLoginForm
              errorMessage={errorMessage}
              isConfigured={isConfigured}
              nextPath={params.next || "/admin"}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
