'use client'

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createBudget } from "@/app/actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const budgetBodySchema = z.object({
  description: z.string(),
  amount: z.coerce.number()
})

export type budgetData = z.infer<typeof budgetBodySchema>

export function CreateBudgetDialog({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false)

  
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<budgetData>({
    resolver: zodResolver(budgetBodySchema)
  })

  const router = useRouter()

  async function onSubmit(data: budgetData) {
    await createBudget(data)
    setIsOpen(false)
    router.push('/home')
  }

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="description">Description of the budget:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="Description"
              id="description"
              {...register('description')}
            />
            <span>{errors.description?.message}</span>
          </div>
          <div className="text-zinc-100">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120,50"
              id="amount"
              type="number"
              step="0.01"
              pattern="\d+\.\d{2}"
              {...register('amount')}
            />
            <span>{errors.amount?.message}</span>
          </div>

          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button className="text-zinc-100" variant="outline">Cancel</Button>
            </DialogClose>

            <Button disabled={isSubmitting} variant="secondary">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}