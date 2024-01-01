import Link from "next/link";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { CurrencyDollar, Plus } from "@phosphor-icons/react/dist/ssr";
import { formatCurrency } from "@/utils/format-currency";

import { Budget } from "@/types";
import { CreateBudgetDialog } from "../create-budget-dialog";
import { Button } from "../ui/button";
import { cookies } from "next/headers";

async function getBudgets(token?: string): Promise<Budget> {
  try {
    const response = await fetch(
      "https://personal-budget-api-3285.onrender.com/envelopes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    return response.json();
  } catch (err) {
    throw err;
  }
}

export async function Budgets() {
  const token = cookies().get("next_token")?.value;

  const { envelopes } = await getBudgets(token);
  

  return (
    <section>
      {envelopes.length > 0 ? (
        <div className="px-6 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {envelopes.map((budget) => {
            const amount = budget.amount / 100

            return (
              <Link
                key={budget.id}
                className="rounded-md"
                href={`/budget/${budget.id}`}
              >
                <Card className="hover:bg-zinc-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="leading-6 font-bold lg:text-2xl">
                        {budget.description}
                      </span>
                      <CurrencyDollar size={20} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <strong className="text-2xl block mb-1 leading-6 lg:text-4xl">
                      {formatCurrency(amount)}
                    </strong>
                    <span className="text-zinc-400 text-sm">
                      Last transaction at May 5
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="max-w-[1200px] mt-8 mx-6">
          <CardHeader className="text-lg md:text-2xl lg:text-3xl">
            <CurrencyDollar />
          </CardHeader>
          <CardContent className="text-zinc-400 flex flex-col items-center justify-center gap-4">
            <p className="text-center">
              It looks like you don&apos;t have any budget yet, click on the
              button to create a new one.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <CreateBudgetDialog>
              <Button className="flex items-center gap-2" size="sm">
                <Plus size={16} weight="bold" />{" "}
                <span className="font-bold">Add budget</span>
              </Button>
            </CreateBudgetDialog>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
