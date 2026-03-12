export const madridTimeZone = "Europe/Madrid";

type Interval = {
  start: string;
  end: string;
};

export type WeeklyHours = Record<number, Interval[]>;

export const weekdayLabels = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
] as const;

export const storeHours: WeeklyHours = {
  0: [{ start: "10:00", end: "14:00" }],
  1: [{ start: "10:00", end: "14:00" }],
  2: [
    { start: "10:00", end: "14:00" },
    { start: "17:00", end: "20:00" },
  ],
  3: [
    { start: "10:00", end: "14:00" },
    { start: "17:00", end: "20:00" },
  ],
  4: [
    { start: "10:00", end: "14:00" },
    { start: "17:00", end: "20:00" },
  ],
  5: [
    { start: "10:00", end: "14:00" },
    { start: "17:00", end: "20:00" },
  ],
  6: [{ start: "10:00", end: "14:00" }],
};

export const deliveryHours: WeeklyHours = {
  0: [{ start: "09:00", end: "14:00" }],
  1: [{ start: "09:00", end: "20:00" }],
  2: [{ start: "09:00", end: "20:00" }],
  3: [{ start: "09:00", end: "20:00" }],
  4: [{ start: "09:00", end: "20:00" }],
  5: [{ start: "09:00", end: "14:00" }],
  6: [{ start: "09:00", end: "14:00" }],
};

type DayTimeParts = {
  day: number;
  hour: number;
  minute: number;
};

function getLocalParts(date: Date): DayTimeParts {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: madridTimeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return { day: dayMap[weekday || "Sun"] ?? 0, hour, minute };
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function formatTime(value: string) {
  return value;
}

export function formatHoursRow(intervals: Interval[]) {
  if (!intervals.length) {
    return "Cerrado";
  }

  return intervals.map((interval) => `${interval.start}–${interval.end}`).join(", ");
}

export function getScheduleStatus(schedule: WeeklyHours, date = new Date()) {
  const { day, hour, minute } = getLocalParts(date);
  const nowMinutes = hour * 60 + minute;
  const today = schedule[day] || [];

  for (const interval of today) {
    const start = toMinutes(interval.start);
    const end = toMinutes(interval.end);

    if (nowMinutes >= start && nowMinutes < end) {
      return {
        isOpen: true,
        message: `Abierto ahora · cierra a las ${formatTime(interval.end)}`,
      };
    }
  }

  const nextToday = today.find((interval) => nowMinutes < toMinutes(interval.start));

  if (nextToday) {
    return {
      isOpen: false,
      message: `Cerrado ahora · abre hoy a las ${formatTime(nextToday.start)}`,
    };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const nextIntervals = schedule[nextDay] || [];

    if (nextIntervals.length) {
      const dayLabel = offset === 1 ? "mañana" : weekdayLabels[nextDay];

      return {
        isOpen: false,
        message: `Cerrado ahora · abre ${dayLabel} a las ${formatTime(nextIntervals[0].start)}`,
      };
    }
  }

  return {
    isOpen: false,
    message: "Horario no disponible",
  };
}
