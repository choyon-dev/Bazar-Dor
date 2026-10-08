export function getEnglishDate(): string {
  try {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Tuesday, Oct 6, 2026";
  }
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) return "0 Tk";
  return `${price} Tk`;
}

const CATEGORY_MAP: Record<string, string> = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dui": "Milk & Eggs",
  mosla: "Spices",
};

export function getCategoryEnglishName(slug: string, fallback?: string): string {
  return CATEGORY_MAP[slug] || fallback || slug;
}

export function getProductDisplayName(product: { nameBn?: string; slug?: string } | null | undefined): string {
  if (!product) return "";
  if (product.slug) {
    return product.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return product.nameBn || "";
}
