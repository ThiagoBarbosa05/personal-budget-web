import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import CreateTransactionForm from '../form/create-transaction-form'

export default function CreateTransactionDialog({children}: {children: React.ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          New Transaction
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
        Create a new transaction for the budget, fill in all the fields and click send, or
          cancel to undo this action.
        </DialogDescription>

        <CreateTransactionForm />
      </DialogContent>
    </Dialog>
  )
}
