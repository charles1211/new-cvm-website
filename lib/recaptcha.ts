/* ─────────────────────────────────────────────────────────────
   Google reCAPTCHA v3 helpers
   Client : executeRecaptcha(action) → token string
   Server : verifyRecaptcha(token)   → { success, score }
───────────────────────────────────────────────────────────── */

/** Execute reCAPTCHA v3 and return a fresh token (browser only) */
export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");

  return new Promise<string>((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA script not loaded"));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}

/** Verify a reCAPTCHA v3 token on the server and return score (0.0–1.0) */
export async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score: number; action?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("RECAPTCHA_SECRET_KEY is not set");

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });

  const data = await res.json();
  return {
    success: data.success === true,
    score: data.score ?? 0,
    action: data.action,
  };
}
