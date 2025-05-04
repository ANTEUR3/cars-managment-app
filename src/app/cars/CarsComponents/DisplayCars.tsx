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
  const [visible,setVisible]=useState(false)


  const displayCars=useMemo(()=>{
    return [...Array(6)].map((_, i) => {
      if(i+(index*6)<filtredCars.length){
        return  <Car setVisible={setVisible} carNumber={carNumber} setCarNumber={setCarNumber} key={i+index*6} car={filtredCars[i+index*6]} />

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
 


 
  return (
    <div className='lg:px-[50px] lg:pt-5 relative'>
      <PurchaseForm setCarNumber={setCarNumber} visible={visible} setVisible={setVisible}  carNumber={carNumber}  />
      <MdNavigateNext onClick={incrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:right-4 ${(index+1)*6 <filtredCars.length?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`} />
      <GrFormPrevious onClick={decrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:left-4 ${index>0 ?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`}  />
       <div className={`lg:flex lg:justify-start lg:items-center lg:px-[60px] lg:gap-x-[50px] lg:py-4 lg:mb-3 bg-gray-100 ${carNumber!=0?'opacity-0':'opacity-100'}`}>
       <p className='lg:w-[130px] lg:px-3 text-red-500 text-xl'>Car number</p>
       <p className='lg:w-[130px] lg:px-3 text-red-500 translate-x-[100px] text-xl'>Car type</p>
       <p className='lg:w-[190px] lg:px-3 text-red-500 translate-x-[190px] text-xl'>Registration date</p>
     
       </div>
      {displayCars}
    </div>
  )
}

export default DisplayCars