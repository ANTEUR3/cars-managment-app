import React,{useState , useEffect , } from 'react'
import Link from 'next/link'
import {FaAddressCard } from 'react-icons/fa'

import {BsCalendar2DateFill} from 'react-icons/bs'
import { MdCancel } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { getCars } from '@/DataFunctions/car'
import { carType } from '../Types'
import { newInspection } from '@/DataFunctions/inspection'
import {useCarContext} from '../page'


type Props = {}

const InspectionForm = ({visible,setVisible,setAlert}:{visible:boolean,setVisible:any,setAlert:any} ) => {

const [allowFault,setAllowFault]=useState<boolean>(true)
const [faultNumber,setFaultNumber]=useState<number>(0)
const [faultsDta,setFaultsDta]=useState<string[]>([])
const [cars,setCars]=useState<carType[]>([])
const carContext=useCarContext()



useEffect(()=>{
    setCars(carContext)

},[carContext])

    const addFault=()=>{
      if(allowFault){
        const faults = document.getElementById('flauts') as HTMLDivElement

        const faultDiv=document.createElement('div')
        faultDiv.className='flex flex-row justify-start items-center lg:gap-x-[15px]  w-full '

        const fault = document.createElement('input')
        fault.id=`fault${faultNumber}`
        fault.type='text'
        fault.name='carType'
        fault.placeholder='Faults'
        fault.className=' w-[80%] pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700 mb-2'
        
        const cancel = document.createElement('h2')
        cancel.innerText='Cancel'
        cancel.className='text-white bg-red-500 px-2 py-1 rounded-lg cursor-pointer hover:scale-105 hidden'

        const confirm = document.createElement('h2')
        confirm.innerText='Confirm'
        confirm.className='text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer hover:scale-105 '
       
        faultDiv.appendChild(fault)
        faultDiv.appendChild(cancel)
        faultDiv.appendChild(confirm)

        faults.appendChild(faultDiv)
        
        setAllowFault(false)

        cancel.addEventListener('click',()=>{
            faults.removeChild(faultDiv)
            setAllowFault(true)
            setFaultsDta(prev=>prev.filter(f=>f!==fault.value))


        })

        confirm.addEventListener('click',()=>{
          cancel.classList.remove('hidden')
          setAllowFault(true)
          confirm.classList.add('hidden')
          setFaultsDta(prev=>[...prev,fault.value])

      })
      }
       
      

    }
   
    const [formData, setFormData] = useState({
        carNumber: 0,
        date:new Date(),
      })

      const handleCancel=()=>{
        formData.carNumber=0;
        document.getElementById('flauts')!.innerHTML=''
        formData.date=new Date()

    }
    
     
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent< HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit=(e:any)=>{
      e.preventDefault();
      newInspection({carNumber:formData.carNumber,date:formData.date,faults:faultsDta})
      setTimeout(() => {
        setVisible(false);
        setAlert({visible:true,message:'New inspection for car number '+formData.carNumber+' has been seccessfully created'})
        handleCancel()
        
      }, 500);

    }
    
   
    return (
        <div className={`flex items-center py-12  px-12 rounded-xl   justify-center  bg-white  absolute z-10 left-[50%] -translate-x-[50%] top-[50%] transition-all duration-800 shadow-lg border-2 border-yellow-500 ${visible?'-translate-y-[50%]':'-translate-y-[1000px]'}` }>
            <MdCancel onClick={()=>{setVisible(false),handleCancel()}} className=' text-2xl text-black absolute right-3 top-3 cursor-pointer hover:text-red-500 hover:scale-105' />
        <div className="w-full max-w-md  rounded-lg text-black ">
        
         
          <form onSubmit={handleSubmit}  className="space-y-2 ">
            <div className={`space-y-2 `}>
                <label htmlFor="carNumber" className="block text-md font-semibold">
                 Car number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                    <FaAddressCard />
                      
                  </div>
                  <select
                  
                    id="carNumber"
                    name="carNumber"
                    value={formData.carNumber}
                    onChange={handleChange}
                    
                    className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                    required
                  >
                    <option value={0} >Select a car</option>
                    {cars.map((car)=>(
                      <option key={(car.number.toString())} value={(car.number).toString()}>{(car.number).toString()}</option>
                    ))}
                    </select>
                </div>
              
      
              
            </div>
            <div className={`space-y-2 `}>
            <label htmlFor="Faults" className=" text-md font-semibold flex justify-start items-center lg:gap-x-[5px]">
               <p>Faults</p> 
                <IoAddCircle onClick={addFault} className='lg:text-3xl cursor-pointer hover:text-gray-700 hover:scale-109' />         
            </label>
            <div id='flauts' className='w-full flex flex-col jsutify-start items-start'>

            </div>
            </div>
  
            
  
  
            <div className={`space-y-2 `}>
              <label htmlFor="date" className="block text-md font-semibold">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <BsCalendar2DateFill />
      
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={(formData.date).toString().split('T')[0]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                  required
                />
              </div>
            </div>
      
            
            <button
              type="submit"
              
              className={`w-full py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors   ${formData.carNumber && formData.date && faultsDta.length!=0 ?' bg-yellow-500 hover:bg-yellow-400 hover:scale-105 cursor-pointer':'bg-gray-600' } `}
            >
               Confirm     
       </button>
          
       
      
            <p className="text-xs text-neutral-500 mt-1">
              By creating an account, you agree to the{" "}
              <Link href="/terms" className="text-neutral-400 hover:underline">
                Terms of Service
              </Link>
              . We'll occasionally send you account-related emails.
            </p>
  
           
          </form>
         
     
      
          
        </div>
      </div>
      )
}


export default InspectionForm