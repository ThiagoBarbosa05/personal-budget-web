import { BudgetSkeleton } from "@/components/skeletons/budget";
import TransactionSkeleton from "@/components/skeletons/transaction";

export default function lLoading() {
  return (
    <div className="px-6">
        <BudgetSkeleton />
        <TransactionSkeleton />
    </div>
  )
}
