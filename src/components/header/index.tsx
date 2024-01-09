import {
  CurrencyDollarSimple,
  Plus,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { Profile } from "../profile";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CreateBudgetDialog } from "../create-budget-dialog";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-6 flex items-center justify-between">
      <Link href='/home'>
        <div className="flex items-center gap-2 text-xl md:text-2xl">
          <CurrencyDollarSimple color="#00B37E" weight="bold" />
          <span className="font-bold">Personal Budget</span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <CreateBudgetDialog>
          <Button className="flex items-center gap-2" size="sm">
            <Plus size={16} weight="bold" />{" "}
            <span className="font-bold hidden sm:block">Add budget</span>
          </Button>
        </CreateBudgetDialog>
        <Profile>
          <Avatar>
            <AvatarFallback>
              <User size={24} className="text-zinc-400" />
            </AvatarFallback>
          </Avatar>
        </Profile>
      </div>
    </header>
  );
}
