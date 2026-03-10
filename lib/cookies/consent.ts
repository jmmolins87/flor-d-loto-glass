export const CONSENT_STORAGE_KEY = "flor-de-loto-consent";
export const CONSENT_COOKIE_KEY = "flor_de_loto_consent";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const defaultConsent: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

export function createConsent(
  values?: Partial<Omit<ConsentPreferences, "necessary" | "updatedAt">>,
): ConsentPreferences {
  return {
    necessary: true,
    analytics: values?.analytics ?? false,
    marketing: values?.marketing ?? false,
    updatedAt: new Date().toISOString(),
  };
}

export function serializeConsent(consent: ConsentPreferences) {
  return JSON.stringify(consent);
}
