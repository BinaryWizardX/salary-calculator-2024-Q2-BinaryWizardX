import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    className?:string
    children: React.ReactNode
}

function MaxwidthWrapper({children,className}: Props) {
  return (
    <div className={cn(`mx-auto w-full max-w-screen-xl px-2.5 md:px-5`,className)}>
        {children}
    </div>
  )
}

export default MaxwidthWrapper