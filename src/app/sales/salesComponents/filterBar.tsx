"use client"
import React,{ReactNode} from 'react'
import {useSaleContex} from '../page'

type Props = {}

const FilterBar = ({children}: {children?:ReactNode}) => {
    const context=useSaleContex()
  return (
    <div className='lg:flex lg:jutify-start items-center lg:gap-x-[10px] lg:px-[100px]'>
        <div className='lg:flex lg:justify-start lg:items-center lg:gap-x-[10px]'>
            <label htmlFor="date" className='font-semibold'>Search slae by date</label>
             <input name='date' type="date" value={(context.date)?.toString()} onChange={(e)=>{context.setDate(e.target.value)}} className={`border rounded-lg px-2 py-2`} />
             {context.date!=""?<button className='bg-red-500 hover:bg-red-400 text-white rounded-lg px-2 py-2 cursor-pointer' onClick={()=>{context.setDate("")}}>Cancel date feltering</button>:''}
        </div>
        {children}
    </div>
  )
}

export default FilterBar
