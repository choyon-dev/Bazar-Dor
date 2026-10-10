import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductAuthGuard from "@/components/auth/ProductAuthGuard";
import { getProductBySlug, getProducts } from "@/utils/api";
import {
  formatDivision,
  formatMarketName,
  formatUnit,
  getCategoryEnglishName,
  getProductDisplayName,
} from "@/utils/format";

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    if (products && products.length > 0) {
      return products.map((product) => ({
        slug: product.slug,
      }));
    }
  } catch {
    return [{ slug: "sorno-machi-chal" }];
  }
  return [{ slug: "sorno-machi-chal" }];
}

function ProductSkeleton() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-48"></div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 shrink-0"></div>
          <div className="space-y-2">
            <div className="h-7 bg-slate-200 rounded w-48"></div>
            <div className="h-4 bg-slate-200 rounded w-28"></div>
            <div className="h-3 bg-slate-200 rounded w-56"></div>
          </div>
        </div>
        <div className="w-36 h-28 bg-slate-100 rounded-2xl shrink-0"></div>
      </div>

      <div className="space-y-3">
        <div className="h-5 bg-slate-200 rounded w-36"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 h-28"
            ></div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-5 bg-slate-200 rounded w-48"></div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 h-64"></div>
      </div>
    </main>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;
  const yesterday = product.yesterday ?? product.today;
  const diff = product.today - yesterday;

  const markets = product.markets || [];
  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
            markets.length
        )
      : product.today;

  return (
    <ProductAuthGuard slug={slug}>
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0f8544] transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#0f8544] transition-colors"
        >
          {getCategoryEnglishName(product.category, product.categoryNameBn)}
        </Link>
        <span>›</span>
        <span className="text-slate-800 font-semibold truncate">
          {getProductDisplayName(product)}
        </span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-2xs">
            {product.image || product.categoryIcon || "🍚"}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {getProductDisplayName(product)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {formatUnit(product.unit)} ·{" "}
              {getCategoryEnglishName(product.category, product.categoryNameBn)}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {diff > 0
                ? `Price increased by ${diff} Tk compared to yesterday`
                : diff < 0
                ? `Price decreased by ${Math.abs(diff)} Tk compared to yesterday`
                : "Price unchanged compared to yesterday"}
            </p>
          </div>
        </div>

        <div className="bg-[#f9fbf9] border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center min-w-[150px] sm:min-w-[170px] shrink-0 self-stretch md:self-auto flex flex-col items-center justify-center">
          <span className="text-xs text-slate-500 font-semibold block mb-1">
            Today&apos;s Price
          </span>

          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            {product.today}
          </span>

          <span className="text-xs text-slate-500 font-medium mt-1.5 block">
            Tk / {product.unit || "kg"}
          </span>

          <div className="mt-2.5">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isUp
                  ? "bg-rose-50 text-rose-600"
                  : isDown
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {pct}%
            </span>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3.5">
          Price Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
              Lowest Price
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#0f8544] tracking-tight block">
              {minPrice} Tk
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1.5 block">
              Lowest priced market
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
              Highest Price
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight block">
              {maxPrice} Tk
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1.5 block">
              Highest priced market
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
              Average Price
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#0f8544] tracking-tight block">
              {avgPrice} Tk
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1.5 block">
              Based on {formatUnit(product.unit)} calculation
            </span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3.5">
          Market-Wise Today&apos;s Prices
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-semibold text-slate-500">
                  <th className="px-5 py-3.5">Market</th>
                  <th className="px-5 py-3.5">Division</th>
                  <th className="px-5 py-3.5">Minimum</th>
                  <th className="px-5 py-3.5">Maximum</th>
                  <th className="px-5 py-3.5">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {markets.map((m, idx) => {
                  const rowAvg = (m.min + m.max) / 2;
                  const formattedRowAvg =
                    rowAvg % 1 === 0 ? `${rowAvg} Tk` : `${rowAvg.toFixed(2)} Tk`;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-semibold text-slate-900">
                        {formatMarketName(m.market)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {formatDivision(m.division)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">
                        {m.min} Tk
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">
                        {m.max} Tk
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {formattedRowAvg}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
    </ProductAuthGuard>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
