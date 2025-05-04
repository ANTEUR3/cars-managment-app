import React,{useState,useEffect,useMemo} from 'react'
import { useInspectationContex } from '../page'
import { getInspections } from '@/DataFunctions/inspection'
import { inspectionType } from '@/app/Types'
import Inspectation from './Inspectation'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
type Props = {}

const DisplayInspectation = (props: Props) => {

 const context=useInspectationContex()
 const [index,setIndex]=useState(0)
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
      return [...Array(6)].map((_, i) => {
        if(i+(index*6)<filtredInspectation.length){
          return  <Inspectation key={(filtredInspectation[i+(index*6)].id)?.toString()} ins={filtredInspectation[i+(index*6)]}    />
  
        }
  
      }
    )
  },[filtredInspectation])

  const incrementIndex=()=>{
    if(((index+1)*6)<filtredInspectation.length){
      setIndex(index+1)
    }
  }
const decrementIndex=()=>{
  if((index>0)){
    setIndex(index-1)
  }

}

  return (
    <div className='lg:px-[100px] lg:pt-[50px] lg:flex flex-col justify-start lg:gap-y-3 '>
         <div className={`  flex lg:flex lg:justify-start lg:items-center lg:gap-[50px]  lg:py-2 text-red-500 `}>
         <h1  className='lg:w-[150px]  lg:font-semibold lg:tet-3xl '>Car number</h1>
         <h1 className='lg:w-[150px]  lg:font-semibold lg:tet-3xl '>Date</h1>
         <h1 className='lg:font-semibold lg:tet-3xl '>Faults</h1>


         </div>
           <MdNavigateNext onClick={incrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:right-4 ${(index+1)*6 <filtredInspectation.length?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`} />
                       <GrFormPrevious onClick={decrementIndex} className={`lg:text-5xl  absolute top-[50%] -translate-y-[50%] lg:left-4 ${index>0 ?'   cursor-pointer text-black hover:text-6xl':'text-gray-500'}`}  />
               
        {displayInspectation_}
        
    </div>
  )
}

export default DisplayInspectation

