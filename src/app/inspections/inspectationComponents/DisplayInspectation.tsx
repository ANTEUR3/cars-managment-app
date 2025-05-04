import React,{useState,useEffect,useMemo} from 'react'
import { useInspectationContex } from '../page'
import { getInspections } from '@/DataFunctions/inspection'
import { inspectionType } from '@/app/Types'
import Inspectation from './Inspectation'

type Props = {}

const DisplayInspectation = (props: Props) => {

 const context=useInspectationContex()
    const [inspectation,setInspectation]=useState<inspectionType[] | []>([])
    const [filtredInspectation,setfiltredInspectation]=useState<any>([])


    useEffect(()=>{
        getInspections().then((res)=>{
            setInspectation(res)
            setfiltredInspectation(res)
        })
    },[])

    useEffect(()=>{
      if((context.carNumber).toString()==" "){
        setfiltredInspectation(inspectation)
      }else{
         const F=inspectation.filter((i:inspectionType)=>(i.carNumber).toString()==(context.carNumber).toString())
         setfiltredInspectation(F);
      }

    },[context.carNumber])

    const displayInspectation_=useMemo(()=>{
      return filtredInspectation.map((ins:inspectionType,index:any)=>{
          return <Inspectation key={(ins.id)?.toString()} ins={ins} i={index}   />
      })
  },[filtredInspectation])


  return (
    <div className='lg:px-[100px] lg:pt-[50px] lg:flex flex-col justify-start lg:gap-y-3 '>
         <div className={`  flex lg:flex lg:justify-start lg:items-center lg:gap-[50px]  lg:py-2 text-red-500 `}>
         <h1  className='lg:w-[150px]  lg:font-semibold lg:tet-3xl '>Car number</h1>
         <h1 className='lg:w-[150px]  lg:font-semibold lg:tet-3xl '>Date</h1>
         <h1 className='lg:font-semibold lg:tet-3xl '>Faults</h1>


         </div>
        {displayInspectation_}
        
    </div>
  )
}

export default DisplayInspectation

