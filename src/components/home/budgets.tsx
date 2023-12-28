import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { CurrencyDollar } from '@phosphor-icons/react/dist/ssr'
import { formatCurrency } from '@/utils/format-currency'

import { Budget } from '@/types'

async function getBudgets(userId: string): Promise<Budget> {
  try {
    const response = await fetch('http://localhost:4000/envelopes', {
      headers: {
        Cookie: `userId=${userId}`
      },
      credentials: 'include'
    })

    const budgets = await response.json()

   
    return budgets
  } catch(err) {
    throw(err)
  }
}

export async function Budgets() {
 


  return (
    <section className="px-6 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {/* {budgets.envelopes.map((budget) => (
      <Link key={budget.id} className="rounded-md" href={`/budget/${budget.id}`}>
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
              {formatCurrency(budget.amount)}
            
            </strong>
            <span className="text-zinc-400 text-sm">
              Last transaction at May 5
            </span>
          </CardContent>
        </Card>
      </Link>
    ))} */}
  </section>
  )
}
