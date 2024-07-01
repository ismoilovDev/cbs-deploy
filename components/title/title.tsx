import React, { ReactNode } from 'react'

type Props = {
   children: ReactNode,
   size?: string
}

export default function Title({ children, size }: Props) {
   return (
      <div className="my-2 mb-5">
         <span className={!size ? "text-3xl font-medium" : size}>{children}</span>
      </div>
   )
}
