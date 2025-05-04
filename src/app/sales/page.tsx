"use client"
import React, { useContext, useEffect, useState } from 'react'
import FilterBar from './salesComponents/filterBar'
import { createContext } from 'react'
import {saleFilterType} from '../Types'
import DisplaySale from './salesComponents/DisplaySale'
type Props = {}

const page = (props: Props) => {
  const [date,setDate]=useState(null)


 

  return (
    <div className=' min-h-screen w-full lg:pt-[100px]'>
      <saleFilterContext.Provider value={{date,setDate}}>
      <FilterBar>

      </FilterBar>
      <DisplaySale/>
      </saleFilterContext.Provider>
       

    </div>
  )
}

export default page

const saleFilterContext=createContext<saleFilterType | null>(null);

export const useSaleContex=()=>{
  const context=useContext(saleFilterContext);
  if(!context){
    throw new Error ('we cant use sela context')
  }
  return context;
}
