"use client"

import React,{useContext,createContext, useState} from 'react'
import { inspectationFilterType } from '../Types'
import FilterBar from './inspectationComponents/filterBar'
import DisplayInspectation from './inspectationComponents/DisplayInspectation'
type Props = {}

const page = (props: Props) => {

  const [carNumber,setCarNumber]=useState<" "| Number>(" ")
  return (
    <div  className=' min-h-screen w-full lg:pt-[100px]'>
       <inspectationFilterContext.Provider value={{carNumber,setCarNumber}}>
         <FilterBar/>
         <DisplayInspectation/>
       </inspectationFilterContext.Provider>

    </div>
  )
}

export default page



const inspectationFilterContext=createContext<inspectationFilterType | null>(null);

export const useInspectationContex=()=>{
  const context=useContext(inspectationFilterContext);
  if(!context){
    throw new Error ('we cant use sela context')
  }
  return context;
}
