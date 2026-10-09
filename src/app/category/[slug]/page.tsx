import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryView from "@/components/category/CategoryView";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/utils/api";

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({
        slug: cat.slug,
      }));
    }
  } catch {
    return [{ slug: "chal" }];
  }
  return [{ slug: "chal" }];
}

function CategorySkeleton() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex items-center justify-between gap-6">
        <div className="space-y-2.5">
          <div className="h-8 bg-slate-200 rounded w-44"></div>
          <div className="h-4 bg-slate-200 rounded w-56"></div>
        </div>
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-200 shrink-0"></div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="h-4 bg-slate-200 rounded w-44"></div>
        <div className="h-8 bg-slate-200 rounded w-28"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 h-36"
          ></div>
        ))}
      </div>
    </main>
  );
}

async function CategoryDataWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return <CategoryView category={category} initialProducts={products} />;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryDataWrapper params={params} />
    </Suspense>
  );
}
