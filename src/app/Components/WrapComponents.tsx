"use client"
import React, { ReactNode } from 'react'

type Props = {}

const WrapComponents = ({children}: {children:ReactNode}) => {
  return (
    <div>
       {children}
    </div>
  )
}

export default WrapComponents