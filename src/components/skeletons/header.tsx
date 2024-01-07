import React from 'react'
import { Skeleton } from '../ui/skeleton'

export  function HeaderSkeleton() {
  return (
    <div className='p-6 flex items-center justify-between'>
      <div className="flex items-center gap-2">
        
        <Skeleton className='h-7 w-40'/>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className='w-10 h-8 rounded-md' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
    </div>
  )
}
