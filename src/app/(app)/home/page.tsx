import { Budgets } from "@/components/home/budgets";
import { HomeSkeleton } from "@/components/skeletons/home";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Home'
}

export default async function Page() {
  return (
    <main className="min-h-screen pb-6 rounded-md">
      <Suspense fallback={<HomeSkeleton />}>
        <Budgets />
      </Suspense>
    </main>
  );
}
