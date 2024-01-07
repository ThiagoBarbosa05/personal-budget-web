export interface Budget {
  envelopes: {
    id: string
    description: string
    amount: number
    created_at: string
    updated_at: string
    totalAmountTransactions: number
  }[]
} 

export interface BudgetById {
  envelope: {
    id: string
    description: string
    amount: number
    created_at: string
    updated_at: string
    totalAmountTransactions: number
  }
}
