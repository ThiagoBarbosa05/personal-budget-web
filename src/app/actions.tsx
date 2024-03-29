"use server";

import { budgetData } from "@/components/create-budget-dialog";
import { TransactionData } from "@/components/create-transaction";
import { editBudgetData } from "@/components/edit-budget";
import { EditTransactionData } from "@/components/edit-transaction";
import { InsufficientFundsError } from "@/utils/validation-error";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface TransferValueParams {
  amountToUpdate: number;
  originId: string;
  destinationId: string;
}

interface Transaction extends TransactionData {
  envelopeId: string;
}

interface EditTransactionParams extends EditTransactionData {
  envelopeId: string;
  transactionId: string;
}

export async function createBudget(data: budgetData) {
  const token = cookies().get("next_token")?.value;

  try {
    await fetch(`${process.env.BASE_API_URL}/envelopes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    revalidatePath("/home");
  } catch (err) {
    throw new Error();
  }
}

export async function EditBudget(data: editBudgetData, id: string) {
  const token = cookies().get("next_token")?.value;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/envelopes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (response.status === 400) {
      throw new InsufficientFundsError();
    }

    revalidatePath(`/budget/${id}`);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      return {
        message:
          "The value to be updated cannot be less than the total number of transactions",
      };
    }
  }
}

export async function transferValue({
  amountToUpdate,
  destinationId,
  originId,
}: TransferValueParams) {
  try {
    const token = cookies().get("next_token")?.value;

    const response = await fetch(
      `${process.env.BASE_API_URL}/envelopes/transfer/${originId}/${destinationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ amountToUpdate }),
      }
    );

    if (!response.ok) {
      throw new InsufficientFundsError();
    }

    revalidatePath(`/budget/${originId}`);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      return { message: err.message };
    }
  }
}

export async function deleteBudget(budgetId: string) {
  const token = cookies().get("next_token")?.value;

  try {
    await fetch(
      `${process.env.BASE_API_URL}/envelopes/${budgetId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    revalidatePath("/home");
  } catch (err) {
    throw new Error();
  }
}

export async function createTransaction(data: Transaction) {
  const token = cookies().get("next_token")?.value;

  try {
    const res = await fetch(
      `${process.env.BASE_API_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          payment_recipient: data.payment_recipient,
          payment_amount: data.payment_amount,
          envelope_id: data.envelopeId,
        }),
      }
    );

    if (res.status === 400) {
      throw new InsufficientFundsError();
    }

    revalidatePath(`/budget/${data.envelopeId}`);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      return {
        message:
          "The transaction value cannot be greater than the total budget value.",
      };
    }
  }
}

export async function EditTransaction(data: EditTransactionParams) {
  const token = cookies().get("next_token")?.value;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/transactions/${data.envelopeId}/${data.transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({payment_recipient: data.payment_recipient, payment_amount: data.payment_amount}),
      }
    );

    if (response.status === 400) {
      throw new InsufficientFundsError();
    }

    revalidatePath(`/budget/${data.envelopeId}`);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      return {
        message:
          "The transaction value cannot be greater than the budget value",
      };
    }
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    await fetch(
      `${process.env.BASE_API_URL}/transactions/${transactionId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    revalidatePath("/budget/:path*");
  } catch (err) {
    throw new Error();
  }
}