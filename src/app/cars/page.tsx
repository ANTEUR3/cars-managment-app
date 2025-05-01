"use client"
import React,{useEffect,createContext,useContext,useState}from 'react'
import { getCars } from '@/DataFunctions/car'
import  FilterBar from './CarsComponents/filterBar'
import { carType, filterContextType } from '../Types'
import DisplayCars from './CarsComponents/DisplayCars'


type Props = {}

const page = (props: Props) => {
  const [cars,setCars]=useState<carType[] | []>([])
    useEffect(() => {
        getCars().then((res)=>{
               setCars(res)
        })      
    },[])

    

    const [carType,setCarType]=useState('All types')
    const [available,setAvailable]=useState(true)
  return (
    <div className=' min-h-screen w-full lg:pt-[100px]'>
       <filterContext.Provider value={{carType,setCarType,available,setAvailable}}>
          <FilterBar>
             <FilterItem item={'All types'} />
              <FilterItem item={'economical'} />
              <FilterItem item={'electric'} />
              <FilterItem item={'luxury'} />
          </FilterBar>
       </filterContext.Provider>
       <DisplayCars cars={cars} />
    </div>
  )
}

export default page

const FilterItem=({item}:{item:String})=>{
  const context=useFilterContext();
  return  <div className={` lg:px-3 lg:py-1 font-semibold lg:rounded-lg text-black ${context.carType==item ?'bg-yellow-500':'bg-gray-300 cursor-pointer hover:scale-108'}`} onClick={()=>{context.setCarType(item)}}>
            {item}
    </div>


}

const filterContext=createContext<filterContextType | null>(null);

export const useFilterContext=()=>{
  const context=useContext(filterContext)
  if(!context){
    throw new Error ('Filter contex not available')
  }
  return context
}
