'use client'

import { deleteBudget } from "@/app/actions"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog"
import { usePathname, useRouter } from "next/navigation"


export default function DeleteButton() {

  const router = useRouter()

  const pathname = usePathname()
  const id = pathname.split('/')[2]

  async function handleDeleteBudget() {
    await deleteBudget(id)
    router.push('/home')
  }
  
  return (
    <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={handleDeleteBudget}>Continue</AlertDialogAction>
  </AlertDialogFooter>
  )
}
