import type { Category, Product } from "@/types/Types";

const BASE_URL_PRIMARY = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const BASE_URL_FALLBACK = process.env.NEXT_PUBLIC_API_FALLBACK_URL || "";

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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.slug === slug);
    return product || null;
  } catch {
    return null;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter((p) => p.category === categorySlug);
  } catch {
    return [];
  }
}
