

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

export function EditBudgetDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          Edit the budget
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Enter data to edit the budget
        </DialogDescription>

        <form className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="description">Description of the budget:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="Description"
              id="description"
            />
          </div>
          <div className="text-zinc-100">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120.50"
              id="amount"
              type="number"
            />
          </div>

          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button className="text-zinc-100" variant="outline">Cancel</Button>
            </DialogClose>

            <Button variant="secondary">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}