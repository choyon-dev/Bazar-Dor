import type { Category, Product } from "@/types/Types";

const BASE_URL_PRIMARY = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const BASE_URL_FALLBACK = process.env.NEXT_PUBLIC_API_FALLBACK_URL || "";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  const primary = BASE_URL_PRIMARY ? `${BASE_URL_PRIMARY}${endpoint}` : "";
  const fallback = BASE_URL_FALLBACK ? `${BASE_URL_FALLBACK}${endpoint}` : "";

  if (primary) {
    try {
      const res = await fetch(primary, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      if (!fallback) {
        throw new Error("Primary failed and no fallback");
      }
    }
  }

  if (fallback) {
    const fallbackRes = await fetch(fallback, {
      next: { revalidate: 60 },
    });
    if (fallbackRes.ok) {
      return await fallbackRes.json();
    }
  }

  throw new Error("Failed to fetch");
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
