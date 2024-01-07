import CreateTransactionDialog from "@/components/create-transaction";
import DeleteBudgetDialog from "@/components/delete-budget";
import { EditBudgetDialog } from "@/components/edit-budget";

import TransferValueDialog from "@/components/tranfer-value";
import Transaction from "@/components/transactions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BudgetById } from "@/types";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getLastTransaction } from "@/utils/get-last-transaction";
import {
  CurrencyCircleDollar,
  PencilSimpleLine,
  Plus,
  ShuffleAngular,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import { cookies } from "next/headers";

async function getBudgetById(id: string, token?: string): Promise<BudgetById> {
  try {
    const response = await fetch(
      `https://personal-budget-api-3285.onrender.com/envelopes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    return response.json();
  } catch (err) {
    throw new Error();
  }
}

async function getTransactions(envelopeId: string, token?: string) {
  try {
    const response = await fetch(
      `https://personal-budget-api-3285.onrender.com/transactions/${envelopeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    return response.json();
  } catch (err) {
    throw new Error();
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const token = cookies().get("next_token")?.value;

  const { envelope } = await getBudgetById(params.id, token);
  const { transactions } = await getTransactions(params.id, token);

  const lastTransactions = getLastTransaction(transactions);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <section className="flex  overflow-x-auto gap-4 pb-6">
        <Card className="w-full min-w-[280px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="leading-6 font-bold lg:text-2xl">
                {envelope.description}
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
              {formatCurrency(envelope.amount)}
            </strong>
            <span className="text-zinc-400 text-sm">
              Created at: {formatDate({ date: envelope.created_at })}
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
              {formatCurrency(envelope.totalAmountTransactions / 100)}
            </strong>
            <span className="text-zinc-400 text-sm">
              {lastTransactions
                ? `Last transaction at ${dayjs(
                    lastTransactions?.created_at
                  ).format("MMM YYYY")}`
                : "There are no transactions for this envelope yet."}
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
          Here are all the transactions in the budget{" "}
          <strong>${envelope.description}</strong>
        </span>
        <Transaction transactions={transactions} />
      </section>
    </div>
  );
}
5;
