import { carType } from '@/app/Types'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdOutlineNumbers } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { LuType } from "react-icons/lu";
import {getInspections} from '../../../DataFunctions/inspection'
import {inspectionType} from '../../Types'
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";


type Props = {}

const Car = ({car,carNumber,setCarNumber}: {car:carType,carNumber:Number,setCarNumber:any}) => {


   const [inspectation,setInspectation]=useState<inspectionType[] | []>([]);   

  useEffect(()=>{
      getInspections().then((res)=>{
            setInspectation(res);
      })
  },[])
      const carInspectation=inspectation.filter((i)=>(i.carNumber).toString()==(car.number).toString());
  return (
      
    <div className={`lg:flex lg:justify-between lg:items-center lg:px-[60px] lg:gap-x-[50px] lg:py-4 lg:mb-3 bg-gray-100 ${carNumber!=0?'opacity-0':'opacity-100'}`}>
          <CarItem information={car.number}>
                <MdOutlineNumbers className='lg:text-3xl  lg:font-semibold' />
          </CarItem>
          <CarItem information={car.type}>
                <LuType className='lg:text-3xl  lg:font-semibold' />
          </CarItem>
          <CarItem information={(car.date).toString()}>
                <BsFillCalendarDateFill className='lg:text-3xl  lg:font-semibold' />

          </CarItem>
          <div className={`lg:flex lg:justify-start items-center lg:gap-x-[10px]  font-semibold lg:text-sm text-black lg:rounded-lg lg:px-3 lg:py-2 transition-all duration-600  ${carInspectation.length==0?'bg-gray-400 ':'bg-yellow-500 cursor-pointer hover:bg-yellow-400'} `}>
                show inspectations
          </div>
          
          <button onClick={()=>{setCarNumber(car.number)}} className={`lg:flex lg:justify-start items-center lg:gap-x-[10px]  font-semibold lg:text-sm text-black lg:rounded-lg lg:px-3 lg:py-2 transition-all duration-600  ${!car.available?'bg-gray-400 ':'bg-green-500 cursor-pointer hover:bg-green-400 text-gray-100'}  `}>
             <BiSolidPurchaseTagAlt className='text-gray-100 lg:text-lg' />
            <p>sale</p>
          </button>
          <button className={`lg:flex lg:justify-start items-center lg:gap-x-[10px]  font-semibold lg:text-sm  lg:rounded-lg lg:px-3 lg:py-2 bg-red-500 cursor-pointer hover:bg-red-400 text-gray-100 transition-all duration-600 ` }>
                <MdOutlineDeleteForever className='text-gray-100 lg:text-lg' />
                <p>Delet</p>       
         </button>

          
    </div>
  )
}

export default Car


const CarItem=({children,information}:{children:ReactNode,information:String | Number})=>{
    return <div className='lg:flex lg:justify-start items-center lg:gap-x-[10px] lg:w-[130px]'>
       {children}
       <h1 className='lg:font-semibold lg:tet-3xl '>{information.toString()}</h1>
    </div>

}