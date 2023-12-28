"use server";

import { budgetData } from "@/components/form/create-budget-form";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



export async function createBudget(data: budgetData) {
  const cookie = cookies().get('next_token')?.value

  try{
    await fetch('http://localhost:4000/envelopes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `userId=${cookie}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    revalidatePath('/home')

  } catch(err) {
    throw new Error()
  }
} 