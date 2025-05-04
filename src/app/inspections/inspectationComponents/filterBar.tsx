"use client"
import React,{useEffect, useState} from 'react'
import {useInspectationContex} from '../page'
import { getCars } from '@/DataFunctions/car'
import { carType } from '@/app/Types'
type Props = {}

const FilterBar = (props: Props) => {
    const context=useInspectationContex()
    const [car,setCar]=useState<[]| carType[]>([])

    useEffect(()=>{
        getCars().then((res)=>{
              setCar(res)
        })
    },[])


    const DisplayCars=car.map((c,i)=>{
        return <option value={(c.number).toString()}>{(c.number).toString()}</option>
    }
    )
  return (
    <div className='lg:flex lg:jutify-start items-center lg:gap-x-[10px] lg:px-[100px]'>
            <div className='lg:flex lg:justify-start lg:items-center lg:gap-x-[10px]'>
            <label htmlFor="date" className='font-semibold'>Search inspectation by car number</label>
            <select name="" id=""  className='border px-3 py-2 rounded-lg' onChange={(e)=>{context.setCarNumber(e.target.value)}}>
                <option value=""></option>
                {DisplayCars}
            </select>
             {context.carNumber!=" "?<button className='bg-red-500 hover:bg-red-400 text-white rounded-lg px-2 py-2 cursor-pointer' onClick={()=>{context.setCarNumber(" ")}}>Cancel car feltering</button>:''}
        </div>
    </div>
  )
}

export default FilterBar