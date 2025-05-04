"use client"
import React, { useEffect , useMemo, useState } from 'react'
import { useSaleContex } from '../page'
import { getSaleData } from '@/DataFunctions/sale'
import {saleType} from '../../Types'
import Sale from './Sale'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
type Props = {}

const DisplaySale = (props: Props) => {
    const context=useSaleContex()
    const [index,setIndex]=useState(0)
    const [sales,setSales]=useState<saleType[] | []>([])

    useEffect(()=>{
        getSaleData().then((res)=>{
            setSales(res)
            setFiltredSales(res)
        })
    },[])


    const [filtredSales,setFiltredSales]=useState(sales)
    useEffect(()=>{
        if((context.date) != ""){
            const sales_=sales.filter((sale)=>(sale.date).toString()==(context.date)?.toString())
             setFiltredSales(sales_)
        }else{
            setFiltredSales(sales)
        }
        console.log(context.date)
    },[context])

    const displaySales=useMemo(()=>{
        return [...Array(6)].map((_, i) => {
            if(i+(index*6)<filtredSales.length){
              return  <Sale sale={filtredSales[i+(index*6)]} key={i+(index*6)} />
      
            }
      
          })
    },[filtredSales,index])

    const incrementIndex=()=>{
        if((index+1*6)<filtredSales.length){
          setIndex(index+1)
        }
      }
    const decrementIndex=()=>{
      if((index>0)){
        setIndex(index-1)
      }
    
    }

  return (
    <div className='lg:px-[100px] lg:pt-[50px] lg:flex flex-col justify-start lg:gap-y-3'>
        <MdNavigateNext onClick={incrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:right-4 ${(index+1)*6 <filtredSales.length?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`} />
              <GrFormPrevious onClick={decrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:left-4 ${index>0 ?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`}  />
              
        {filtredSales.length!=0?displaySales:''}
        
    </div>
  )
}

export default DisplaySale