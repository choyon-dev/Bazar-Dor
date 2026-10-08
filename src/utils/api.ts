import type { Category, Product } from "@/types/Types";

const BASE_URL_PRIMARY = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_FALLBACK = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_PRIMARY}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Primary failed: ${res.status}`);
    return await res.json();
  } catch {
    const fallbackRes = await fetch(`${BASE_URL_FALLBACK}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!fallbackRes.ok) throw new Error(`Fallback failed: ${fallbackRes.status}`);
    return await fallbackRes.json();
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchWithFallback<Category[]>("/categories");
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchWithFallback<Product[]>("/products");
  } catch {
    return [];
  }
}
