"use client";

import { useEffect, useRef } from "react";
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
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasNotified.current) {
      hasNotified.current = true;
      toast.error("Please sign in to view product details", {
        id: "auth-guard-redirect",
      });
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
