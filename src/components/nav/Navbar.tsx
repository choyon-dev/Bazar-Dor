"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category, Product } from "@/types/Types";
import { getCategories, getProducts } from "@/utils/api";
import { getEnglishDate, formatPrice, getProductDisplayName, getCategoryEnglishName } from "@/utils/format";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [products, setProducts] = useState<Product[]>([]);
  const [dateStr, setDateStr] = useState("Tuesday, Oct 6, 2026");

  useEffect(() => {
    setDateStr(getEnglishDate());

    getCategories().then((data) => {
      if (data && data.length > 0) {
        setCategories(data);
      }
    });

    getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

  const tickerList = products.length > 0 ? [...products, ...products] : [];

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs flex items-center justify-center">
              <Image
                src="/logoicon.svg"
                alt="Bazar Dor"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-tight">
                Bazar Dor
              </span>
              <span
                suppressHydrationWarning
                className="text-[11px] font-medium text-slate-500 leading-tight"
              >
                {dateStr}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-semibold text-slate-800 hover:text-[#0f8544] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-4.5 py-2 rounded-[30px] bg-[#0f8544] hover:bg-[#0d733b] text-white text-sm font-semibold shadow-xs transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <nav className="flex items-center justify-start md:justify-center gap-5 md:gap-8 py-2.5 px-3 md:px-0 border-t border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            const englishName = getCategoryEnglishName(cat.slug, cat.nameBn);

            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors rounded-full px-3 py-1 ${
                  isActive
                    ? "bg-slate-100 border border-slate-200/90 text-slate-900 font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{englishName}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {tickerList.length > 0 && (
        <div className="w-full bg-[#fcfcfc] border-y border-slate-200/80 overflow-hidden py-2 text-xs select-none">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {tickerList.map((item, idx) => {
              const isUp = item.change?.dir === "up";
              const isDown = item.change?.dir === "down";
              const pct = item.change?.pct ?? 0;

              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/product/${item.slug}`}
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0f8544] transition-colors"
                >
                  <span className="text-sm">{item.image || item.categoryIcon || "🍚"}</span>
                  <span className="font-semibold text-slate-800">
                    {getProductDisplayName(item)}
                  </span>
                  <span className="text-slate-600">
                    {formatPrice(item.today)}/{item.unit || "kg"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      isUp
                        ? "text-rose-600"
                        : isDown
                        ? "text-[#0f8544]"
                        : "text-slate-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"} {pct}%
                  </span>
                  <span className="text-slate-300 ml-4">|</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
