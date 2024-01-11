import Header from "@/components/header";
import Providers from "@/components/providers";

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
