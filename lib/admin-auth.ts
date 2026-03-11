const ADMIN_SESSION_COOKIE = "flor_admin_session";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getAdminPassword() {
  return process.env.ADMIN_LOGIN_PASSWORD;
}

function getAdminSecret() {
  return process.env.ADMIN_LOGIN_SECRET;
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminPassword() && getAdminSecret());
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

async function importSecretKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function signValue(value: string, secret: string) {
  const key = await importSecretKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createAdminSessionValue() {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("Missing ADMIN_LOGIN_SECRET");
  }

  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = String(expiresAt);
  const signature = await signValue(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionValue(sessionValue?: string | null) {
  const secret = getAdminSecret();

  if (!secret || !sessionValue) {
    return false;
  }

  const [expiresAtRaw, signature] = sessionValue.split(".");

  if (!expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expectedSignature = await signValue(expiresAtRaw, secret);
  return signature === expectedSignature;
}

export function isValidAdminPassword(password: string) {
  const adminPassword = getAdminPassword();
  return Boolean(adminPassword) && password === adminPassword;
}

export function getAdminSessionMaxAge() {
  return Math.floor(ADMIN_SESSION_TTL_MS / 1000);
}
