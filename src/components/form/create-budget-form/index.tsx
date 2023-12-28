'use client'

import { createBudget } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/authenticate'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const budgetBodySchema = z.object({
  description: z.string(),
  amount: z.coerce.number()
})

export type budgetData = z.infer<typeof budgetBodySchema>

export default function CreateBudgetForm({openChange}: {openChange: Dispatch<SetStateAction<boolean>>}) {

  

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<budgetData>({
    resolver: zodResolver(budgetBodySchema)
  })


  async function onSubmit(data: budgetData) {
    await createBudget(data)
    openChange(false)
  }

  return (
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
  )
}
