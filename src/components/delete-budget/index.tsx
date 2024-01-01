import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import DeleteButton from "./delete-button";

export default function DeleteBudgetDialog({children}: {children: React.ReactNode}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            budget.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DeleteButton />
      </AlertDialogContent>
    </AlertDialog>
  )
}
