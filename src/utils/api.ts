import type { Category, Product } from "@/types/Types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }
  return await res.json();
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchApi<Category[]>("/categories");
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchApi<Product[]>("/products");
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
