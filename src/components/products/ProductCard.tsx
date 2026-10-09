import Link from "next/link";
import type { Product } from "@/types/Types";
import { formatPrice, formatUnit, getProductDisplayName } from "@/utils/format";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl border border-slate-200/80 p-4.5 hover:border-slate-300 hover:shadow-xs transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
          {product.image || product.categoryIcon || "🍚"}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
            {getProductDisplayName(product)}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between pt-1">
        <div>
          <span className="block text-[11px] text-slate-500 font-medium leading-none">
            Today&apos;s Price
          </span>
          <span className="block text-lg font-extrabold text-slate-900 tracking-tight mt-1">
            {formatPrice(product.today)}
          </span>
        </div>

        <div>
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
    </Link>
  );
}
