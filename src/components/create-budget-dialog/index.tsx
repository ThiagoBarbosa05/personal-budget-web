'use client'

import { useState } from "react";
import CreateBudgetForm from "../form/create-budget-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function CreateBudgetDialog({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          New budget
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Create a new budget here, fill in all the fields and click send, or
          cancel to undo this action.
        </DialogDescription>

        <CreateBudgetForm openChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}