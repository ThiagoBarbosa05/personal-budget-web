"use client";

import { EditBudget } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useQuery} from '@tanstack/react-query'
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { BudgetById } from "@/types";

const editBudgetBodySchema = z.object({
  description: z.string().optional(),
  amount: z.coerce.number().optional(),
});

export type editBudgetData = z.infer<typeof editBudgetBodySchema>;



export function EditBudgetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editBudgetData>({
    resolver: zodResolver(editBudgetBodySchema),
  });

  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const token = getCookie('next_token')

  const [data, setData] = useState<BudgetById>()

  // const {data} = useQuery({queryKey: ['budgetData'],

  // queryFn: () => 
  //   fetch(`https://personal-budget-api-3285.onrender.com/envelopes/${id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     },
  //     credentials: 'include'
  //   }).then(res => res.json())
  // })

  useEffect(() => {
    fetch(`https://personal-budget-api-3285.onrender.com/envelopes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    }).then(res => res.json()).then(d => setData(d))
  }, [])

  console.log(data)

  async function onSubmit(data: editBudgetData) {
    await EditBudget(data, id);
    // openChange(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="text-zinc-100">
        <Label htmlFor="description">Description of the budget:</Label>
        <Input
          className="text-zinc-100 mt-1"
          placeholder="Description"
          {...register("description")}
          id="description"
          defaultValue={data?.envelope.description}
        />
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
          defaultValue={data?.envelope.amount}
        />
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <DialogClose asChild>
          <Button className="text-zinc-100" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button disabled={isSubmitting} variant="secondary">Submit</Button>
      </div>
    </form>
  );
}
