"use client"
import React, { useEffect , useMemo, useState } from 'react'
import { useSaleContex } from '../page'
import { getSaleData } from '@/DataFunctions/sale'
import {saleType} from '../../Types'
import Sale from './Sale'
type Props = {}

const DisplaySale = (props: Props) => {
    const context=useSaleContex()
    const [sales,setSales]=useState<saleType[] | []>([])

    useEffect(()=>{
        getSaleData().then((res)=>{
            setSales(res)
            setFiltredSales(res)
        })
    },[])


    const [filtredSales,setFiltredSales]=useState(sales)
    useEffect(()=>{
        if(context.date != null){
            const sales_=sales.filter((sale)=>(sale.date).toString()==(context.date)?.toString())
             setFiltredSales(sales_)
        }
    },[context])

    const displaySales=useMemo(()=>{
        return filtredSales.map((sale,index)=>{
            return <Sale sale={sale} key={index} />
        })
    },[filtredSales])

  return (
    <div className='lg:px-[100px] lg:pt-[50px]'>
        {displaySales}
    </div>
  )
}

export default DisplaySale