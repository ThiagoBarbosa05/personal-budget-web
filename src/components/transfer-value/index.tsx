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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferValue } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { Budget } from "@/types";
import { useState } from "react";

const transferValueSchema = z.object({
  amountToUpdate: z.coerce
    .number()
    .min(0.1, { message: "the total to transfer must be greater than 1" }),
  destinationId: z.string(),
});

export type TransferValue = z.infer<typeof transferValueSchema>;

export default function TransferValueDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [insufficientFundsMessage, setInsufficientFundsMessage] = useState<
    string | undefined
  >();
  const [isOpen, setIsOpen] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TransferValue>({
    resolver: zodResolver(transferValueSchema),
  });

  const pathname = usePathname();
  const originId = pathname.split("/")[2];
  const token = getCookie("next_token");

  const { data } = useQuery({
    queryKey: ["budgetsData"],

    queryFn: () =>
      fetch(`https://personal-budget-api-3285.onrender.com/envelopes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }).then((res) => res.json()) as Promise<Budget>,
  });

  async function onSubmit(data: TransferValue) {
    const { amountToUpdate, destinationId } = data;

    try {
      const res = await transferValue({
        amountToUpdate,
        originId,
        destinationId,
      });

      if (!res) {
        setIsOpen(false)
      }

      setInsufficientFundsMessage(res?.message);
     
    } catch (err) {
      throw new Error();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          Make a transfer
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Make a transfer to another budget.
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="amount">Amount to transfer:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120.50"
              id="amount"
              type="number"
              step="0.01"
              pattern="\d+\.\d{2}"
              {...register("amountToUpdate")}
            />
            {errors.amountToUpdate?.message && (
              <span className="text-red-500 text-sm block mt-1">
                {errors.amountToUpdate.message}
              </span>
            )}

            <Label className="block mt-4 pb-2" htmlFor="payment-amount">
              Budgets:
            </Label>
            <Controller
              name="destinationId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Budgets</SelectLabel>
                      {data?.envelopes.map((env) => (
                        <SelectItem
                          key={env.id}
                          disabled={env.id === originId}
                          value={env.id}
                        >
                          {env.description}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.destinationId?.message && (
              <span className="text-red-500 text-sm block mt-1">
                {errors.destinationId.message}
              </span>
            )}
          </div>
          {insufficientFundsMessage && <span className="text-red-500">{insufficientFundsMessage}</span>}
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
