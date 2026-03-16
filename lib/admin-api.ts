// lib/admin-api.ts
import { getToken, logout } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function adminFetchJSON<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return adminFetch<T>(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
}
