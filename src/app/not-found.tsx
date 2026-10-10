import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          ৪০৪
        </h1>
        <h2 className="text-lg font-bold text-slate-700 mb-2">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-xs mx-auto">
          আপনি যে পাতাটি খুঁজছেন তা হয়তো সরানো হয়েছে বা মুছে ফেলা হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full bg-[#15803d] hover:bg-[#137236] text-white py-3 rounded-xl font-medium text-sm transition-colors shadow-xs active:scale-[0.99]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
