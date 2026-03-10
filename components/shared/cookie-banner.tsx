"use client";

import { useState } from "react";

import { CookiePreferencesDialog } from "@/components/shared/cookie-preferences-dialog";
import { Button } from "@/components/ui/button";
import {
  CONSENT_COOKIE_KEY,
  CONSENT_STORAGE_KEY,
  createConsent,
  defaultConsent,
  serializeConsent,
  type ConsentPreferences,
} from "@/lib/cookies/consent";

function persistConsent(value: ConsentPreferences) {
  const serialized = serializeConsent(value);
  window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=31536000; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("consent:updated", { detail: value }));
}

function getInitialConsent() {
  if (typeof window === "undefined") {
    return { visible: false, consent: defaultConsent };
  }

  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (!stored) {
    return { visible: true, consent: defaultConsent };
  }

  try {
    return {
      visible: false,
      consent: JSON.parse(stored) as ConsentPreferences,
    };
  } catch {
    return { visible: true, consent: defaultConsent };
  }
}

export function CookieBanner() {
  const initialState = getInitialConsent();
  const [visible, setVisible] = useState(initialState.visible);
  const [consent, setConsent] = useState<ConsentPreferences>(initialState.consent);

  const save = (value: ConsentPreferences) => {
    persistConsent(value);
    setConsent(value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl">
      <div className="surface flex flex-col gap-5 px-6 py-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="font-serif text-2xl text-foreground">Tu privacidad, con criterio.</p>
          <p className="text-base leading-7 text-foreground/68">
            Usamos cookies necesarias para el funcionamiento del sitio y, si lo aceptas,
            tambien analiticas y marketing para mejorar la experiencia.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            className="cursor-pointer rounded-full"
            onClick={() => save(createConsent({ analytics: true, marketing: true }))}
          >
            Aceptar
          </Button>
          <Button
            className="cursor-pointer rounded-full"
            onClick={() => save(createConsent({ analytics: false, marketing: false }))}
            variant="outline"
          >
            Rechazar
          </Button>
          <CookiePreferencesDialog initialValue={consent} onSave={save} />
        </div>
      </div>
    </div>
  );
}
