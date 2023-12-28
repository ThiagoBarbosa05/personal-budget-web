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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export default function TransferValueDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl text-zinc-100 font-bold">
          Make a transfer
        </DialogTitle>
        <DialogDescription className="text-zinc-400 text-sm ">
          Make a transfer to another budget.
        </DialogDescription>

        <form className="flex flex-col gap-4">
          <div className="text-zinc-100">
            <Label htmlFor="amount">Amount to transfer:</Label>
            <Input
              className="text-zinc-100 mt-1"
              placeholder="ex: 120.50"
              id="amount"
              type="number"
            />

            <Label className="block mt-4 pb-2" htmlFor="payment-amount">Budgets:</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Budgets</SelectLabel>
                  <SelectItem value="budget 1">budget 1</SelectItem>
                  <SelectItem value="budget 2">budget 2</SelectItem>
                  <SelectItem value="budget 3">budget 3</SelectItem>
                  <SelectItem value="budget 4">budget 4</SelectItem>
                  <SelectItem value="budget 5">budget 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
      </DialogContent>
    </Dialog>
  );
}
