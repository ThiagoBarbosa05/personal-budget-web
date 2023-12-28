import CreateTransactionDialog from "@/components/create-transaction";
import DeleteBudgetDialog from "@/components/delete-budget";
import DeleteTransactionAlert from "@/components/delete-transaction";
import { DropdownMenuTransaction } from "@/components/dropdown-menu-transaction";
import { EditBudgetDialog } from "@/components/edit-budget";
import EditTransactionDialog from "@/components/edit-transaction";
import TransferValueDialog from "@/components/tranfer-value";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format-currency";
import {
  CurrencyCircleDollar,
  PencilSimpleLine,
  Plus,
  ShuffleAngular,
  Trash,
} from "@phosphor-icons/react/dist/ssr";

async function getBudgetById(id: string, userId: string) {
  try {

    const response = await fetch(`http://localhost:4000/envelopes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `userId=${userId}`
      },
      credentials: 'include'
    })

    const budget = await response.json()

    return budget

  } catch (err) {
    throw new Error()
  }
}

export default async function page({params}: {params: {id: string}}) {
  
 

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <section className="flex  overflow-x-auto gap-4 pb-6">
        <Card className="w-full min-w-[280px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="leading-6 font-bold lg:text-2xl">
                Budget example
              </span>
              <DeleteBudgetDialog>
                <Button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="icon"
                >
                  <Trash size={16} />
                </Button>
              </DeleteBudgetDialog>
            </div>
          </CardHeader>
          <CardContent>
            <strong className="text-2xl block mb-1 leading-6 lg:text-4xl">
              {formatCurrency(1234.56)}
            </strong>
            <span className="text-zinc-400 text-sm">
              Created at: 05-03-2023
            </span>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <EditBudgetDialog>
              <Button className="flex items-center gap-1" variant="outline">
                <PencilSimpleLine size={16} />
                edit
              </Button>
            </EditBudgetDialog>

            <TransferValueDialog>
              <Button className="flex items-center gap-1">
                <ShuffleAngular size={16} />
                transfer
              </Button>
            </TransferValueDialog>
          </CardFooter>
        </Card>

        <Card className="w-full min-w-[280px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="leading-6 font-bold lg:text-2xl">
                Transactions Amount
              </span>
              <CurrencyCircleDollar size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <strong className="text-2xl block mb-1 leading-6 lg:text-4xl">
              {formatCurrency(1200.5)}
            </strong>
            <span className="text-zinc-400 text-sm">
              Last transaction at May 5
            </span>
          </CardContent>
          <CardFooter>
            <CreateTransactionDialog>
              <Button className="flex items-center gap-1">
                <Plus size={16} weight="bold" />{" "}
                <span className="font-bold">Add transaction</span>
              </Button>
            </CreateTransactionDialog>
          </CardFooter>
        </Card>
      </section>
      <section className="mt-6">
        <h3 className="text-zinc-100 text-3xl font-bold leading-6">
          Transactions
        </h3>
        <span className="text-zinc-400 text-sm leading-6 block mt-2">
          Here are all the transactions in the budget $example
        </span>
        {/* transactions */}
        <Table className="mt-6 min-w-[640px]">
          <TableHeader>
            <TableRow>
              <TableHead>Created at</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment recipient</TableHead>
              <TableHead>Payment amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <TableRow key={i}>
                <TableCell>2022-05-03</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>internet</TableCell>
                <TableCell>{formatCurrency(120.39)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditTransactionDialog>
                      <Button size="icon" variant="outline">
                        <PencilSimpleLine size={16} />
                      </Button>
                    </EditTransactionDialog>

                    <DeleteTransactionAlert>
                      <Button
                        className="text-destructive"
                        size="icon"
                        variant="outline"
                      >
                        <Trash size={16} />
                      </Button>
                    </DeleteTransactionAlert>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* transactions */}
      </section>
    </div>
  );
}
