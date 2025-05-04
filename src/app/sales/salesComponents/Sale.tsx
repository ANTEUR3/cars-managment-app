import { carType, saleType } from '@/app/Types'
import { getCars } from '@/DataFunctions/car';
import React,{useEffect, useState} from 'react'
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineNumbers } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";


type Props = {}

const Sale = ({sale}: {sale:saleType}) => {
    const [car,setCar]=useState<null | carType[]>(null)
    useEffect(()=>{
        getCars().then((res)=>{
               setCar(res)
        })
    },[])
    const selected:carType|undefined=car?.find((car:carType)=> car?.number==sale.carNumber);
  return (
    <div className={`flex lg:flex lg:justify-start lg:items-center lg:gap-[50px] bg-gray-100 lg:py-2 `}>
        <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
          <BsFillCalendarDateFill className='lg:text-3xl  lg:font-semibold' />
          <h1 className='lg:font-semibold lg:tet-3xl '>{(sale.date).toString()}</h1>
        </div>
        <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
          <MdOutlineNumbers className='lg:text-3xl  lg:font-semibold' />
          <h1 className='lg:font-semibold lg:tet-3xl '>{(sale.carNumber).toString()}</h1>
        </div>
        <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
          <MdOutlineAttachMoney className='lg:text-3xl  lg:font-semibold' />
          <h1 className='lg:font-semibold lg:tet-3xl '>{(sale.price).toString()}</h1>
        </div>
        {selected?
        <div className='lg:w-[150px] flex justify-start items-center lg:gap-x-[10px]'>
        <MdOutlineAttachMoney className='lg:text-3xl  lg:font-semibold' />
        <h1 className='lg:font-semibold lg:tet-3xl '>{(selected.type).toString()}</h1>
      </div>:''}
        
    </div>
  )
}

export default Sale