"use server";

// import { budgetData } from "@/components/form/create-budget-form";
// import { getCookie } from "@/hooks/get-cookies";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";


// export async function createBudget(data: budgetData) {
//   const cookie = getCookie()

//   try{
//     await fetch('http://localhost:4000/envelopes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Cookie: `userId=${cookie}`
//       },
//       credentials: 'include',
//       body: JSON.stringify(data)
//     })

//     revalidatePath('/home')

//   } catch(err) {
//     throw new Error()
//   }
// } 