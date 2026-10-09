"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import type { Category, Product, SortOption } from "@/types/Types";
import { getCategoryEnglishName } from "@/utils/format";

export default function CategoryView({
  category,
  initialProducts,
}: {
  category: Category;
  initialProducts: Product[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex items-center justify-between gap-6 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {getCategoryEnglishName(category.slug, category.nameBn)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
            Today&apos;s prices and changes for {initialProducts.length} products
          </p>
        </div>

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-2xs">
          {category.icon || "🍚"}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Showing a total of {sortedProducts.length} products
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="category-sort"
            className="text-xs font-semibold text-slate-500"
          >
            Sort:
          </label>
          <select
            id="category-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-slate-200/90 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0f8544] cursor-pointer shadow-2xs transition-colors"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="text-4xl mb-3">📦</div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            No products found
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-5">
            There are currently no products listed under this category.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0f8544] hover:bg-[#0d733b] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
