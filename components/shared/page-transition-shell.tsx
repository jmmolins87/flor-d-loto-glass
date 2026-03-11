"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransitionShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="relative">
      <div
        aria-hidden={!isReady}
        className={
          isReady
            ? "transition-opacity duration-500 opacity-100"
            : "pointer-events-none opacity-0"
        }
      >
        {children}
      </div>

      {!isReady ? (
        <div
          aria-busy="true"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(214,193,120,0.16),transparent_22%),linear-gradient(180deg,rgba(252,248,241,0.96),rgba(245,238,231,0.98))] backdrop-blur-md"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative h-28 w-28">
              <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full border border-secondary/30" />
              <div className="absolute inset-[18%] animate-pulse rounded-full border border-primary/18 bg-white/70" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite]">
                <span className="absolute left-1/2 top-0 h-10 w-6 -translate-x-1/2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-secondary shadow-[0_8px_20px_-10px_rgba(159,132,55,0.55)]" />
                <span className="absolute left-[14%] top-[18%] h-10 w-6 rotate-[-45deg] animate-[pulse_1.4s_ease-in-out_0.15s_infinite] rounded-full bg-primary shadow-[0_8px_20px_-10px_rgba(34,98,66,0.55)]" />
                <span className="absolute right-[14%] top-[18%] h-10 w-6 rotate-[45deg] animate-[pulse_1.4s_ease-in-out_0.3s_infinite] rounded-full bg-primary shadow-[0_8px_20px_-10px_rgba(34,98,66,0.55)]" />
                <span className="absolute bottom-[18%] left-[20%] h-10 w-6 rotate-[-135deg] animate-[pulse_1.4s_ease-in-out_0.45s_infinite] rounded-full bg-secondary shadow-[0_8px_20px_-10px_rgba(159,132,55,0.55)]" />
                <span className="absolute bottom-[18%] right-[20%] h-10 w-6 rotate-[135deg] animate-[pulse_1.4s_ease-in-out_0.6s_infinite] rounded-full bg-secondary shadow-[0_8px_20px_-10px_rgba(159,132,55,0.55)]" />
                <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-serif text-4xl text-foreground">Preparando tu ramo</p>
              <p className="mx-auto max-w-md text-base leading-7 text-foreground/72">
                Cargando la siguiente pagina con el mismo cuidado con el que se prepara cada detalle floral.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="size-2 animate-[bounce_1s_infinite] rounded-full bg-primary" />
                <span className="size-2 animate-[bounce_1s_0.15s_infinite] rounded-full bg-secondary" />
                <span className="size-2 animate-[bounce_1s_0.3s_infinite] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
