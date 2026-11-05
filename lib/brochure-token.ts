import crypto from "crypto";
import fs from "fs";
import path from "path";
import { env } from "@/lib/env";

const BROCHURE_FILENAME_REGEX = /^[a-z0-9-]+\.pdf$/;
const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getSigningSecret(): string {
  return `${env.CLOUDFLARE_TURNSTILE_SECRET_KEY}:${env.RESEND_API_KEY}`;
}

export function isValidBrochureFile(file: string): boolean {
  if (!BROCHURE_FILENAME_REGEX.test(file)) return false;
  const fullPath = path.join(process.cwd(), "private", "brochures", file);
  return fs.existsSync(fullPath);
}

export function createBrochureDownloadToken(file: string): string {
  const payload = JSON.stringify({
    file,
    exp: Date.now() + TOKEN_TTL_MS,
  });
  const payloadB64 = Buffer.from(payload, "utf-8").toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyBrochureDownloadToken(
  file: string,
  token: string
): boolean {
  if (!isValidBrochureFile(file) || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;

  const expectedSig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payloadB64)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return false;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    ) as { file?: string; exp?: number };

    if (decoded.file !== file) return false;
    if (typeof decoded.exp !== "number" || Date.now() > decoded.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
