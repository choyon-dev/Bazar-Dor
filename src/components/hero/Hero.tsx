"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getEnglishDate } from "@/utils/format";

export default function Hero() {
  const [dateStr, setDateStr] = useState("Tuesday, Oct 6, 2026");

  useEffect(() => {
    setDateStr(getEnglishDate());
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="rounded-3xl border border-slate-200/90 bg-[#f9fbf9] p-8 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-xs font-semibold">
              <span suppressHydrationWarning>{dateStr}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Today&apos;s Market Prices at a Glance
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Prices of rice, lentils, oil, vegetables, fish, meat, eggs &amp; spices — market-wise details, averages, minimum-maximum and price changes in one place.
            </p>

            <div className="pt-2">
              <Link
                href="#all-products"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0f8544] hover:bg-[#0d733b] text-white font-semibold text-sm transition-colors shadow-xs active:scale-95"
              >
                View All Products
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-4/3 flex items-center justify-center">
              <Image
                src="/bazar-hero.png"
                alt="Bazar Basket"
                width={320}
                height={260}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
