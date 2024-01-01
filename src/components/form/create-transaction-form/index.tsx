"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const transactionBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
});

export type TransactionData = z.infer<typeof transactionBodySchema>;

export default function CreateTransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionBodySchema),
  });

  function onSubmit(data: TransactionData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="text-zinc-100">
        <Label htmlFor="payment-recipient">Payment recipient:</Label>
        <Input
          className="text-zinc-100 mt-1"
          placeholder="Payment recipient"
          id="payment"
        />
      </div>
      <div className="text-zinc-100">
        <Label htmlFor="payment-amount">Payment amount:</Label>
        <Input
          className="text-zinc-100 mt-1"
          placeholder="ex: 120.50"
          id="payment-amount"
          type="number"
        />
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <DialogClose asChild>
          <Button className="text-zinc-100" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button variant="secondary">Submit</Button>
      </div>
    </form>
  );
}
