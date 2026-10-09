export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 animate-pulse">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-11 h-11 rounded-xl bg-slate-200 shrink-0"></div>
        <div className="space-y-1.5 w-full">
          <div className="h-4 bg-slate-200 rounded w-28"></div>
          <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
      </div>

      <div className="flex items-end justify-between pt-1">
        <div className="space-y-1">
          <div className="w-16 h-2.5 bg-slate-200 rounded"></div>
          <div className="w-20 h-5 bg-slate-200 rounded"></div>
        </div>
        <div className="w-14 h-5 rounded-full bg-slate-200"></div>
      </div>
    </div>
  );
}
