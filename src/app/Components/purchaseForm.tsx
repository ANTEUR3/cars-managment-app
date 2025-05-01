"use client"
import React ,{useState} from 'react'
import Link from 'next/link'
import {FaAddressCard } from 'react-icons/fa'
import {BsCalendar2DateFill} from 'react-icons/bs'
import { MdCancel } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

type Props = {}

const PurchaseForm = ({visible,setVisible}: {visible:boolean,setVisible:any}) => {

    const [formData, setFormData] = useState({
            carNumber: "",
            price:'',
            date:new Date(),
          })


            const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent< HTMLSelectElement>) => {
                const { name, value } = e.target
               
                if(name==='price'){
                    const price = value.replace(' $','')
                    setFormData((prev) => ({ ...prev, [name]: price }))

                }else{
                    setFormData((prev) => ({ ...prev, [name]: value }))

                }

                
            }
    return (
        <div className={`flex items-center py-12  px-12 rounded-xl   justify-center  bg-white  absolute z-10 left-[50%] -translate-x-[50%] top-[50%] transition-all duration-800 shadow-lg border-2 border-yellow-500 ${visible?'-translate-y-[50%]':'-translate-y-[1000px]'}` }>
            <MdCancel onClick={()=>{setVisible(false)}} className=' text-2xl text-black absolute right-3 top-3 cursor-pointer hover:text-red-500 hover:scale-105' />
        <div className="w-full max-w-md  rounded-lg text-black ">
        
         
          <form  className="space-y-2 ">


            <div className={`space-y-2 `}>
                <label htmlFor="carNumber" className="block text-md font-semibold">
                 Car number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                    <FaAddressCard />
                      
                  </div>
                  <input
                    type="Number"
                    id="carNumber"
                    name="carNumber"
                    value={formData.carNumber}
                    onChange={handleChange}
                    placeholder="Identity number"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                    required
                  />
                </div>
            </div>

            <div className={`space-y-2 `}>
                <label htmlFor="price" className="block text-md font-semibold">
                 Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                    <FaAddressCard />
                      
                  </div>
                  <input
                    type="float"
                    id="price"
                    name="price"
                    value={formData.price+' $'}
                    onChange={handleChange}
                    placeholder="price"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                    required
                  />
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
              
              className={`w-full py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors   ${formData.carNumber && formData.price && formData.date ?' bg-yellow-500 hover:bg-yellow-400 hover:scale-105 cursor-pointer':'bg-gray-600' } `}
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

export default PurchaseForm