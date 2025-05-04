import { carType } from '@/app/Types'
import React,{useEffect, useMemo, useState} from 'react'
import { useFilterContext } from '../page'
import Car from './Car'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import PurchaseForm from '@/app/Components/purchaseForm';

type Props = {}

const DisplayCars = ({cars}: {cars:carType[]}) => {
  const [index,setIndex]=useState(0)
  const context=useFilterContext();
  const [filtredCars,setFiltredCars]=useState(cars)
  const [carNumber,setCarNumber]=useState(0)


  const displayCars=useMemo(()=>{
    return [...Array(6)].map((_, i) => {
      if(i+(index*6)<filtredCars.length){
        return  <Car carNumber={carNumber} setCarNumber={setCarNumber} key={i+index*6} car={filtredCars[i+index*6]} />

      }

    })
   
  },[filtredCars,index])

  useEffect(()=>{console.log(index)},[index])


  useEffect(()=>{
    if(context.carType=='All types'){
      const cars_=cars.filter((car)=>car.available==context.available )
      setFiltredCars(cars_)
    }
    else{
      const cars_=cars.filter((car)=>car.available==context.available && car.type==context.carType)
      setFiltredCars(cars_)
    }
  
  },[context.carType,context.available,cars])

  const incrementIndex=()=>{
    if((index+1*6)<filtredCars.length){
      setIndex(index+1)
    }
  }
const decrementIndex=()=>{
  if((index>0)){
    setIndex(index-1)
  }

}
const [visible,setVisible]=useState(false)
 


 
  return (
    <div className='lg:px-[50px] lg:pt-5 relative'>
      <PurchaseForm setCarNumber={setCarNumber} visible={visible} setVisible={setVisible} setAlert={setVisible} carNumber={carNumber}  />
      <MdNavigateNext onClick={incrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:right-4 ${(index+1)*6 <filtredCars.length?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`} />
      <GrFormPrevious onClick={decrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:left-4 ${index>0 ?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`}  />
      {displayCars}
    </div>
  )
}

export default DisplayCars