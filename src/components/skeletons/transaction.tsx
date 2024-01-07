import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TransactionSkeleton() {
  return (
    <div className="mt-6 max-w-7xl mx-auto">
        <div>
          <Skeleton className='h-8 w-36'/>
          <Skeleton className='h-6 w-40 mt-2'/>
        </div>

        <div className='border border-zinc-700/20 rounded-xl p-6 h-64 mt-6 flex flex-col gap-2'>
          <Skeleton className='h-10'/>
          <Skeleton className='h-10'/>
          <Skeleton className='h-10'/>
          <Skeleton className='h-10'/>
          <Skeleton className='h-10'/>
        </div>
    </div>
  )
}
