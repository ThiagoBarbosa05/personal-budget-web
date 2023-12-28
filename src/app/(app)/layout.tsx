
import { CreateBudgetDialog } from "@/components/create-budget-dialog";
import { Profile } from "@/components/profile";
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

  const cookie = cookies()
  const token = cookie.get('next_token')
  
  if(!token) {
    redirect('/')
  }

  return (
   <div>
      <header className="p-6 flex items-center justify-between border-b border-zinc-600">
        <div className="flex items-center gap-2">
          <CurrencyDollarSimple color="#00B37E" size={24} weight="bold" />
          <span className="text-xl md:text-2xl font-bold">Personal Budget</span>
        </div>
        <div className="flex items-center gap-4">
          {/* <CreateBudgetDialog>
            <Button className="flex items-center gap-2" size="sm">
              <Plus size={16} weight="bold" />{" "}
              <span className="font-bold hidden sm:block">Add budget</span>
            </Button>
          </CreateBudgetDialog> */}
          <Suspense fallback={<p className="text-zinc-100">Loading...</p>}></Suspense>
          <Profile>
            <Avatar>
              <AvatarFallback>
                <User size={24} className="text-zinc-400" />
              </AvatarFallback>
            </Avatar>
          </Profile>
        </div>
      </header>
      {children}
   </div>
      
   
  );
}
