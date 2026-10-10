"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [customName, setCustomName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fullName = session?.user?.name || "Rezwan Ahmed";
  const email = session?.user?.email || "rezwanahmed@gmail.com";
  const name = customName !== null ? customName : fullName;

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("দয়া করে নাম লিখুন");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা যায়নি");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl p-8 animate-pulse h-80" />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] px-4 py-10 sm:py-14">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/90 shadow-2xs">
              <Image
                src="/user-avatar.jpg"
                alt={fullName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {fullName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-xl px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer self-end sm:self-center shrink-0"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-slate-800 mb-5">তথ্য</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full border border-slate-200 bg-[#fafbfa] rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#15803d] hover:bg-[#137236] text-white py-3.5 rounded-xl font-medium text-sm transition-colors shadow-xs active:scale-[0.99] disabled:opacity-70 cursor-pointer mt-2"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
