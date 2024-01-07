
type Transaction = {
  id: string
  payment_recipient: string
  payment_amount: number
  created_at: string
  updated_at: string
  envelope_id: string
}

export  function getLastTransaction(arr: Transaction[]): Transaction {
    const sortByCreatedAt = (a: Transaction, b: Transaction) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    
    const sortedTransactions = arr.sort(sortByCreatedAt)

    const lastTransaction = sortedTransactions[sortedTransactions.length - 1]


    return lastTransaction
}
