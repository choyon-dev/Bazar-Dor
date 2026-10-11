"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/common/UserAvatar";

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
      toast.error("Please sign in to view your profile");
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
      <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] px-4 py-10 sm:py-14 animate-pulse">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-6 space-y-2">
            <div className="h-8 bg-slate-200/80 rounded w-44"></div>
            <div className="h-4 bg-slate-200/80 rounded w-64"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex items-center justify-between mb-6 h-28">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 shrink-0"></div>
              <div className="space-y-2">
                <div className="h-6 bg-slate-200 rounded w-40"></div>
                <div className="h-4 bg-slate-200 rounded w-52"></div>
              </div>
            </div>
            <div className="w-24 h-10 rounded-xl bg-slate-200 shrink-0 hidden sm:block"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 h-64">
            <div className="h-6 bg-slate-200 rounded w-28 mb-5"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-11 bg-slate-200 rounded w-full"></div>
              <div className="h-12 bg-slate-200 rounded w-full mt-2"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#edf2ed] px-4 py-10 sm:py-14">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View and manage your account details.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs mb-6">
          <div className="flex items-center gap-4">
            <UserAvatar
              src={session.user.image}
              name={fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl"
            />
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
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-slate-800 mb-5">Information</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border border-slate-200 bg-[#fafbfa] rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#15803d] hover:bg-[#137236] text-white py-3.5 rounded-xl font-medium text-sm transition-colors shadow-xs active:scale-[0.99] disabled:opacity-70 cursor-pointer mt-2"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
