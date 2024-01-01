

import { usePathname } from "next/navigation";
import {EditBudgetForm} from "../form/edit-budget-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function EditBudgetDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          Edit the budget
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Enter data to edit the budget
        </DialogDescription>

       <EditBudgetForm />
      </DialogContent>
    </Dialog>
  );
}