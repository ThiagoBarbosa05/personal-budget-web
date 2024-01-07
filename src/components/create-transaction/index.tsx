"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransaction } from "@/app/actions";
import { usePathname } from "next/navigation";

const transactionBodySchema = z.object({
  payment_recipient: z.string(),
  payment_amount: z.coerce
    .number()
    .min(0.1, { message: "The transaction value cannot be less than zero" }),
});

export type TransactionData = z.infer<typeof transactionBodySchema>;

export default function CreateTransactionDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const envelopeId = pathname.split("/")[2];

  const [messageError, setMessageError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionBodySchema),
  });

  async function onSubmit(data: TransactionData) {
    const res = await createTransaction({ ...data, envelopeId });

    if (res) {
      setMessageError(res.message);
    }

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          New Transaction
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Create a new transaction for the budget, fill in all the fields and
          click send, or cancel to undo this action.
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="payment-recipient">Payment recipient:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="Payment recipient"
              id="payment"
              {...register("payment_recipient")}
            />
          </div>
          <div className="text-zinc-100">
            <Label htmlFor="payment-amount">Payment amount:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120.50"
              id="payment-amount"
              type="number"
              step="0.01"
              pattern="\d+\.\d{2}"
              {...register("payment_amount")}
            />
          </div>
          {messageError && <span className="text-red-500">{messageError}</span>}
          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button className="text-zinc-100" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button variant="secondary">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
