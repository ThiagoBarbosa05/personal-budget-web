"use client";

import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTransaction } from "@/app/actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface EditTransactionDialogProps {
  transaction: {
    id: string;
    payment_recipient: string;
    payment_amount: number;
    created_at: string;
    updated_at: string;
    envelope_id: string;
  };
  children: React.ReactNode;
}

const editTransactionSchema = z.object({
  payment_recipient: z
    .string()
    .min(1, { message: "Payment Recipient cannot be empty." }),
  payment_amount: z.coerce
    .number()
    .min(0.01, { message: "Payment Amount cannot be zero or empty." }),
});

export type EditTransactionData = z.infer<typeof editTransactionSchema>;

export default function EditTransactionDialog({
  children,
  transaction,
}: EditTransactionDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditTransactionData>({
    resolver: zodResolver(editTransactionSchema),
  });

  const pathname = usePathname();
  const envelopeId = pathname.split("/")[2];

  const [messageError, setMessageError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(data: EditTransactionData) {
    try {
      const res = await EditTransaction({
        ...data,
        envelopeId,
        transactionId: transaction.id,
      });

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
          Edit Transaction
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Enter data to edit the transaction.
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="payment-recipient">Payment recipient:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="Payment recipient"
              id="payment"
              defaultValue={transaction.payment_recipient}
              {...register("payment_recipient")}
            />
            {errors && (
              <span className="text-red-500 text-sm">
                {errors.payment_recipient?.message}
              </span>
            )}
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
              defaultValue={(transaction.payment_amount / 100).toFixed(2)}
              {...register("payment_amount")}
            />
            {errors && (
              <span className="text-red-500 text-sm">
                {errors.payment_amount?.message}
              </span>
            )}
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
