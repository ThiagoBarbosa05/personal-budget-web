import {
  CurrencyDollar,
  PencilSimpleLine,
  Plus,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import EditTransactionDialog from "../edit-transaction";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatCurrency } from "@/utils/format-currency";
import DeleteTransactionAlert from "../delete-transaction";
import CreateTransactionDialog from "../create-transaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/utils/format-date";

interface TransactionProps {
  transactions: {
    id: string;
    payment_recipient: string;
    payment_amount: number;
    created_at: string;
    updated_at: string;
    envelope_id: string;
  }[];
}

export default function Transaction({ transactions }: TransactionProps) {
  if (transactions.length === 0) {
    return (
      <div className="mt-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>
              You do not yet have transactions for this budget
            </CardTitle>
            <CardDescription>
              Click the button below to add a transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CreateTransactionDialog>
              <Button variant="secondary" className="flex items-center gap-1">
                <Plus size={16} weight="bold" />{" "}
                <span className="font-bold">Add transaction</span>
              </Button>
            </CreateTransactionDialog>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Table className="mt-6 min-w-[640px]">
      <TableHeader>
        <TableRow>
          <TableHead>Created at</TableHead>

          <TableHead>Payment recipient</TableHead>
          <TableHead>Payment amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate({date: transaction.created_at})}</TableCell>

            <TableCell>{transaction.payment_recipient}</TableCell>
            <TableCell>
              {formatCurrency(transaction.payment_amount / 100)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <EditTransactionDialog>
                  <Button size="icon" variant="outline">
                    <PencilSimpleLine size={16} />
                  </Button>
                </EditTransactionDialog>

                <DeleteTransactionAlert>
                  <Button
                    className="text-red-500"
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
      <TableFooter>
        <TableRow>
          <TableCell className="text-center" colSpan={4}>
            All transactions
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
