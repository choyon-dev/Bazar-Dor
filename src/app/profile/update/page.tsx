"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [customName, setCustomName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const name = customName !== null ? customName : session?.user?.name || "";

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please sign in to update your profile");
      router.push("/signin?callbackUrl=/profile/update");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-white rounded-3xl p-8 animate-pulse h-80" />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Update Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Change your account name
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#15803d] hover:bg-[#137236] text-white py-3 rounded-xl font-medium text-sm transition-colors shadow-xs active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              <Link
                href="/profile"
                className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-medium text-sm transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/profile"
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
          >
            <span>←</span> Back to Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
