import { carType } from '@/app/Types'
import React,{useEffect, useMemo, useState} from 'react'
import { useFilterContext } from '../page'
import Car from './Car'

type Props = {}

const DisplayCars = ({cars}: {cars:carType[]}) => {
  const context=useFilterContext();
  const [filtredCars,setFiltredCars]=useState(cars)
  useEffect(()=>{
    const cars_=cars.filter((car)=>car.availabale==context.available && car.type==context.carType)
    setFiltredCars(cars_)
  },[context.carType,context.available])

 


    const displayCars=useMemo(()=>{
      return filtredCars.map((car,index)=>{
              return <Car key={index} car={car} />
      })

    },[filtredCars])
  return (
    <div className='lg:px-[50px] *:'></div>
  )
}

export default DisplayCars