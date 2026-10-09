import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f8544] flex items-center justify-center p-1.5 shadow-xs">
              <Image
                src="/logo-icon.png"
                alt="Bazar Dor"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Bazar Dor</p>
              <p className="text-xs text-slate-500">
                Daily commodity prices at a glance.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-md italic">
            All prices are indicative; subject to market conditions and regional variances.
          </p>
        </div>
      </div>
    </footer>
  );
}
