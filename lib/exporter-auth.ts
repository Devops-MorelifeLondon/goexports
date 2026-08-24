import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "exporter_session";
const SECRET_KEY = process.env.EXPORTER_AUTH_SECRET || process.env.BREVO_API_KEY || "goexports-exporter-auth-secret-key-2025";

export interface ExporterSession {
  id: string;
  email: string;
  slug: string;
  companyName: string;
  exp: number; // timestamp in seconds
}

/**
 * Creates a signed token for an exporter session
 */
export function createExporterToken(payload: { id: string; email: string; slug: string; companyName: string }): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days
  const sessionData: ExporterSession = {
    ...payload,
    exp,
  };

  const dataStr = Buffer.from(JSON.stringify(sessionData)).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(dataStr).digest("base64url");
  return `${dataStr}.${signature}`;
}

/**
 * Verifies and decodes a signed exporter token
 */
export function verifyExporterToken(token: string): ExporterSession | null {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [dataStr, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", SECRET_KEY).update(dataStr).digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const session: ExporterSession = JSON.parse(Buffer.from(dataStr, "base64url").toString("utf-8"));
    if (session.exp && session.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Retrieves the current session from Request cookies or Authorization header
 */
export async function getExporterSessionFromRequest(req?: Request): Promise<ExporterSession | null> {
  try {
    // 1. Check Authorization Header if provided
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        const session = verifyExporterToken(token);
        if (session) return session;
      }
    }

    // 2. Check Next.js Cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (sessionCookie?.value) {
      const session = verifyExporterToken(sessionCookie.value);
      if (session) return session;
    }

    // 3. Fallback: Parse Cookie header directly from request
    if (req) {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const match = cookieHeader.match(new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]*)`));
        if (match && match[1]) {
          const session = verifyExporterToken(decodeURIComponent(match[1]));
          if (session) return session;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };
