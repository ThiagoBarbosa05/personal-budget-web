"use server";

import { budgetData } from "@/components/form/create-budget-form";
import { editBudgetData } from "@/components/form/edit-budget-form";
import { InsufficientFundsError } from "@/utils/validation-error";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface TransferValueParams {
  amountToUpdate: number;
  originId: string;
  destinationId: string;
}

export async function createBudget(data: budgetData) {
  const token = cookies().get("next_token")?.value;

  try {
    await fetch("https://personal-budget-api-3285.onrender.com/envelopes", {
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
    await fetch(
      `https://personal-budget-api-3285.onrender.com/envelopes/${id}`,
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
    revalidatePath("/home");
  } catch (err) {
    throw new Error();
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
      `https://personal-budget-api-3285.onrender.com/envelopes/transfer/${originId}/${destinationId}`,
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
      `https://personal-budget-api-3285.onrender.com/envelopes/${budgetId}`,
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
