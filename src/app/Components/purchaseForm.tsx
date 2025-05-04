"use client"
import React ,{useState, useEffect,useMemo} from 'react'

import Link from 'next/link'
import {FaAddressCard } from 'react-icons/fa'
import {BsCalendar2DateFill} from 'react-icons/bs'
import { MdCancel } from "react-icons/md";
import { carType } from '../Types'

import { useNavigate } from 'react-router'
import {useCarContext} from '../page'
import { newSale } from '@/DataFunctions/sale'
type Props = {}

const PurchaseForm = ({visible,setVisible,setAlert,carNumber,setCarNumber}: {visible:boolean,setVisible:any,setAlert?:any,carNumber?:number,setCarNumber?:any}) => {
const [cars,setCars]=useState<carType[]>([])
const carContext=useCarContext()



useEffect(()=>{
    setCars(carContext)
},[carContext])

    const [formData, setFormData] = useState({
            carNumber: 0,
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

            const handleCancel=()=>{
              formData.carNumber=0;
              formData.date=new Date();
              formData.price=''
      
          }
           const handleSubmit=(e:any)=>{
                e.preventDefault();
                newSale({carNumber:formData.carNumber,date:formData.date,price:formData.price}).catch((err)=>{
                  console.log(err)
                })
             
                setTimeout(() => {
                  setVisible(false);
                  
                  if(setAlert){
                    setAlert({visible:true,message:'New inspection for car number '+formData.carNumber+' has been seccessfully created'})

                  }
                  handleCancel()
                  if(carNumber){
                    window.location.reload()

                  }
                  
                  
                }, 500);
          
              }

              const displaycars=useMemo(()=>{
                   if(cars){
                     return cars.map((car,index)=>{
                       if(car.available){
                        return <option key={(car.number.toString())} value={(car.number).toString()}>{(car.number).toString()}</option>
                      }
                     })
                   }
                        
                 },[cars])
               useEffect(()=>{
                   if(carNumber){
                    formData.carNumber=carNumber;
                    console.log(carNumber)
                   }
               },[carNumber])   
    return (
        <div className={`flex items-center py-12  px-12 rounded-xl   justify-center  bg-white  absolute z-10 left-[50%] -translate-x-[50%] top-[50%] transition-all duration-800 shadow-lg border-2 border-yellow-500 ${visible ?'-translate-y-[50%]':'-translate-y-[1000px]'}` }>
            <MdCancel onClick={()=>{setVisible(false);if(carNumber){setCarNumber(0)}}} className=' text-2xl text-black absolute right-3 top-3 cursor-pointer hover:text-red-500 hover:scale-105' />
        <div className="w-full max-w-md  rounded-lg text-black ">
        
         
          <form onSubmit={handleSubmit}  className="space-y-2 ">


            <div className={`space-y-2 ${carNumber ?'hidden':''} `}>
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
                                defaultValue={carNumber}
                                onChange={handleChange}
                                
                                className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                                
                              >
                                <option value={0} >Select a car</option>
                                {displaycars}
                                </select>
                            </div>
                          
                  
                          
                        </div>
                        <div className={`space-y-2 ${carNumber ?'':'hidden'} `}>
                            <label htmlFor="carNumber" className="block text-md font-semibold">
                             Car number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                                <FaAddressCard />
                                  
                              </div>
                              <input
                                
                                id="carNumber"
                                name="carNumber"
                                readOnly
                                value={(formData.carNumber).toString() || ""}
                                className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                                
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
              
              className={`w-full py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors   ${(carNumber || formData.carNumber) && formData.price && formData.date ?' bg-yellow-500 hover:bg-yellow-400 hover:scale-105 cursor-pointer':'bg-gray-600' } `}
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