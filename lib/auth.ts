// lib/auth.ts
const TOKEN_KEY = "cvm_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  window.location.replace("/login");
}

/** Decode JWT payload to extract username claim. No verification — display only. */
export function getUsername(): string {
  const token = getToken();
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username ?? payload.sub ?? payload.name ?? "";
  } catch {
    return "";
  }
}
