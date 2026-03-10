import Link from "next/link";

import { buttonVariants } from "@/lib/button-styles";

export function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f1117] text-white">
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        poster="/logo.png"
      >
        <source src="/video/not_found.webm" type="video/webm" />
        <source src="/video/not_found.mp4" type="video/mp4" />
        <source src="/video/not_found.ogv" type="video/ogg" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,193,120,0.12),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(34,98,66,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(18,20,24,0.18))]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16 lg:justify-start lg:px-12 xl:px-20">
        <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-8 text-center shadow-[0_40px_120px_-55px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-12 lg:ml-0 lg:max-w-2xl lg:text-left">
          <p className="text-base uppercase tracking-[0.3em] text-white/70">Error 404</p>
          <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
            Esta flor se ha salido del camino.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            La pagina que buscas no existe o ya no esta disponible. Puedes volver al inicio,
            explorar las colecciones o escribirnos y te ayudamos a encontrar lo que necesitas.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "w-full justify-center rounded-full px-7",
              })}
              href="/"
            >
              Volver al inicio
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
                className: "w-full justify-center rounded-full px-7",
              })}
              href="/catalogo"
            >
              Ver catalogo
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "w-full justify-center rounded-full border-white/45 bg-white/22 px-7 text-white hover:bg-white/32 hover:text-white",
              })}
              href="/contacto"
            >
              Ir a contacto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
