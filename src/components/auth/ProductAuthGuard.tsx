"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProductAuthGuard({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push(`/signin?callbackUrl=/product/${slug}`);
    }
  }, [isPending, session, slug, router]);

  if (isPending) {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
}
