import { inspectionType } from '@/app/Types'
import React, { useState } from 'react'
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineNumbers } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { MdDisabledByDefault } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

type Props = {}

const Inspectation = ({ins,i}: {ins:inspectionType,i:any}) => {
    const [index,setIndex]=useState(0)
    
  return (
    <div key={i} className={`flex lg:flex lg:justify-start lg:items-center lg:gap-[50px] bg-gray-100 lg:py-2 `}>
           <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
                  <MdOutlineNumbers className='lg:text-3xl  lg:font-semibold' />
                  <h1 className='lg:font-semibold lg:tet-3xl '>{(ins.carNumber).toString()}</h1>
                </div>
              <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
                  <BsFillCalendarDateFill className='lg:text-3xl  lg:font-semibold' />
                  <h1 className='lg:font-semibold lg:tet-3xl '>{(ins.date).toString()}</h1>
                </div>
                

                <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
                <MdNavigateNext onClick={()=>{setIndex((index+1)%ins.faults.length)}} className='lg:text-4xl hover:text-red-500 cursor-pointer  lg:font-semibold' />
                <h1 className='lg:font-semibold lg:tet-3xl '>{(ins.faults[index]).toString()}</h1>
                </div>

                
              
                

    </div>
  )
}

export default Inspectation