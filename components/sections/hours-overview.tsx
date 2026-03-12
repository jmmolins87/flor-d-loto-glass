"use client";

import { useEffect, useState } from "react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { getScheduleStatus, storeHours } from "@/lib/store-hours";

export function HoursOverview() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const storeStatus = getScheduleStatus(storeHours, now);

  return (
    <ScrollReveal className="surface p-8" distance={28}>
      <p className="eyebrow">Horario</p>
      <div className="mt-4 flex h-[calc(100%-2rem)] flex-col justify-between rounded-[1.75rem] border border-primary/15 bg-white/55 p-6">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-foreground">Flor de Loto Segovia</p>
          <p className="text-base leading-7 text-foreground/72">
            Estado actual de la tienda en tiempo real segun la hora local de Segovia.
          </p>
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/65 p-5">
          <Badge
            className="rounded-full px-4 py-2"
            variant={storeStatus.isOpen ? "default" : "secondary"}
          >
            {storeStatus.message}
          </Badge>
          <p className="mt-4 text-base leading-7 text-foreground/72">
            Tienda fisica con horario partido entre semana y apertura de mañana en domingo y lunes.
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
