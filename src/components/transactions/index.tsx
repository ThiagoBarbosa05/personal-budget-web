import { PencilSimpleLine, Trash } from "@phosphor-icons/react/dist/ssr";
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

interface TransactionProps {
  budget: {
    id: string;
    description: string;
  };
}

export default function Transaction({ budget }: TransactionProps) {
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TableRow key={i}>
            <TableCell>2022-05-03</TableCell>

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
            budget transactions {budget.description}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
