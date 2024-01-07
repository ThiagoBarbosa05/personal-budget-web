import { CreateBudgetDialog } from "@/components/create-budget-dialog";
import Header from "@/components/header";
import { Profile } from "@/components/profile";
import Providers from "@/components/providers";
import { HeaderSkeleton } from "@/components/skeletons/header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  CurrencyDollarSimple,
  Plus,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies();
  const token = cookie.get("next_token");

  if (!token) {
    redirect("/");
  }

  return (
    <Providers>
      <div>
        <Header />
        
        {children}
      </div>
    </Providers>
  );
}
