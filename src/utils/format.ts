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
  return `${price.toLocaleString("en-US")} Tk`;
}

export function formatUnit(unit: string | undefined | null): string {
  const norm = unit?.toLowerCase()?.trim() || "";
  switch (norm) {
    case "kg":
      return "per kg";
    case "liter":
    case "ltr":
      return "per liter";
    case "dozen":
      return "per dozen";
    case "piece":
    case "pcs":
    case "pc":
      return "per piece";
    case "gm":
    case "gram":
      return "per gram";
    default:
      return norm ? `per ${norm}` : "per unit";
  }
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

const PRODUCT_NAME_MAP: Record<string, string> = {
  "deshi-peyaj": "Onion",
  "peyaj": "Onion",
  "ada": "Ginger",
  "begun": "Eggplant",
  "rui-mach": "Rui Fish",
  "dim": "Eggs",
  "makhon": "Butter (100g)",
  "kacha-morich": "Green Chili",
  "rosun": "Garlic",
  "alu": "Potato",
  "katla-mach": "Katla Fish",
  "hasher-mangsho": "Duck Meat",
  "khasir-mangsho": "Mutton",
  "sorno-machi-chal": "Sorno Machi Rice",
  "miniket-chal": "Miniket Rice",
  "najir-chal": "Nazir Rice",
  "batam-size-chal": "Batam Size Rice",
  "mosur-dal": "Moshur Lentils",
  "mug-dal": "Mung Lentils",
  "chola": "Chickpeas",
  "sorisar-tel": "Mustard Oil",
  "soyabean-tel": "Soybean Oil",
  "ilish-mach": "Hilsa Fish",
  "murgir-mangsho": "Chicken Meat",
  "gorur-mangsho": "Beef Meat",
  "gura-dudh": "Powder Milk",
  "halud-gura": "Turmeric Powder",
  "morich-gura": "Chili Powder",
  "jira": "Cumin Seeds",
  "dhania": "Coriander",
  "potol": "Pointed Gourd",
  "dherosh": "Okra",
  "shosha": "Cucumber",
  "tomato": "Tomato",
};

export function getProductDisplayName(product: { nameBn?: string; slug?: string } | null | undefined): string {
  if (!product) return "";
  if (product.slug && PRODUCT_NAME_MAP[product.slug]) {
    return PRODUCT_NAME_MAP[product.slug];
  }
  if (product.slug) {
    return product.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return product.nameBn || "";
}
