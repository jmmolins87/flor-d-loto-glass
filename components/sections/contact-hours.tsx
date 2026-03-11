"use client";

import { Clock3, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  deliveryHours,
  formatHoursRow,
  getScheduleStatus,
  storeHours,
  weekdayLabels,
} from "@/lib/store-hours";

export function ContactHours() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const storeStatus = getScheduleStatus(storeHours, now);

  return (
    <div className="surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Horario y reparto</p>
          <h3 className="mt-3 text-3xl text-foreground">Estado actual de la tienda</h3>
        </div>
        <Badge
          className="rounded-full px-4 py-2"
          variant={storeStatus.isOpen ? "default" : "secondary"}
        >
          {storeStatus.message}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="rounded-[1.5rem] border border-primary/15 bg-white/55 p-4">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-primary" />
            <p className="text-lg font-semibold text-foreground">Tienda</p>
          </div>
          <div className="mt-4 space-y-2 text-sm leading-6 text-foreground/72">
            {weekdayLabels.map((day, index) => (
              <p key={day}>
                <span className="font-medium text-foreground">{day}</span> ·{" "}
                {formatHoursRow(storeHours[index])}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-white/45 p-4">
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            <p className="text-lg font-semibold text-foreground">Entrega a domicilio</p>
          </div>
          <div className="mt-4 space-y-2 text-sm leading-6 text-foreground/72">
            {weekdayLabels.map((day, index) => (
              <p key={day}>
                <span className="font-medium text-foreground">{day}</span> ·{" "}
                {formatHoursRow(deliveryHours[index])}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
