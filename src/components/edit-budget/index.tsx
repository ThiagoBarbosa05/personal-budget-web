"use client";

import { usePathname } from "next/navigation";
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
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { EditBudget } from "@/app/actions";

interface EditBudgetDialogProps {
  budget: {
    id: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
    totalAmountTransactions: number;
  };
  children: React.ReactNode
}

const editBudgetBodySchema = z.object({
  description: z.string().min(1, {message: 'Please enter a budget description.'}),
  amount: z.coerce.number().min(0.01, {message: 'Amount cannot be zero or empty.'}),
});

export type editBudgetData = z.infer<typeof editBudgetBodySchema>;

export function EditBudgetDialog({budget, children}: EditBudgetDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editBudgetData>({
    resolver: zodResolver(editBudgetBodySchema),
  });

  const [messageError, setMessageError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(data: editBudgetData) {
    try {
      const res = await EditBudget(data, budget.id);

      if (!res) {
        setIsOpen(false);
      }

      setMessageError(res?.message);
    } catch (err) {
      throw new Error();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          Edit the budget
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Enter data to edit the budget
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="description">Description of the budget:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="Description"
              {...register("description")}
              id="description"
              defaultValue={budget.description}
            />
            {errors && <span className="text-red-500 text-sm">{errors.description?.message}</span>}
          </div>
          <div className="text-zinc-100">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120.50"
              id="amount"
              type="number"
              step="0.01"
              pattern="\d+\.\d{2}"
              {...register("amount")}
              defaultValue={budget.amount}
            />
            {errors && <span className="text-red-500 text-sm">{errors.amount?.message}</span>}
          </div>
          {messageError && (
            <span className="text-red-500 text-sm">{messageError}</span>
          )}
          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button className="text-zinc-100" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isSubmitting} variant="secondary">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
