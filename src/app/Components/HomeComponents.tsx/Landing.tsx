import React, { useEffect } from 'react'
import Image from 'next/image'
import blackCar from '../../../../public/blackCar.png'
import Link from 'next/link'
import { ToastContainer,toast } from 'react-toastify';

type Props = {}

const Landing = ({alert,visible,setVisible , inspection, setInspection, purchase,setPurchase}: {alert:{visible:boolean,message:String},visible:boolean,setVisible:any,inspection:boolean, setInspection:any,purchase:boolean,setPurchase:any}) => {
  
  const showSuccessAlert = () => {
    toast.success(`New car has been seccessfully creted`, {
      position: "top-left",
      autoClose: 5000,
      style: { 
        background: "white",
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "10px",
        width:"100%"
      },
       
    });
  };

  useEffect(()=>{
    if(alert.visible){
      showSuccessAlert()
    }
      
  },[alert])
  
  return (
    <div className={`lg:h-screen lg:flex  lg:justify-between items-start lg:pt-[80px] lg:px-[100px] bg-gray-100 ${visible || inspection || purchase?'opacity-5':'opacity-100'}`}>
            <ToastContainer className={'w-[500px]  lg:top-30 left-[50%] translate-x-[50%]'}/>

        <div className='lg:flex lg:flex-col  lg:justify-start items-cener lg:pt-[70px] lg:gap-y-[30px]'>
            <h1 className='leading-[50px] lg:w-[50%] font-bold text-4xl'><span className='text-yellow-500'>Manage </span>your cars now with nice and simple Dashboard <br></br> <span className='text-yellow-500'>register</span> new car new Test or sel </h1>
             <p className='lg:w-[50%] lg:text-md lg:font-light  text-gray-600'>
             Manage your Tiaret car business efficiently with our dashboard. Track your car list, schedule car tests, handle registration, and monitor car sales – all in one place. Streamline operations and boost productivity.
             </p>
             <div className='lg:flex lg:justify-star lg:items-center lg:gap-x-[20px] lg:mt-[10px]'>
                <Link onClick={()=>{setVisible(true)}} href={"/"} className='lg:px-3 lg:py-2 lg:rounded-lg text-black font-semibold bg-yellow-500 hover:scale-105 hover:bg-yellow-400'>new car</Link>
                <Link onClick={()=>{setInspection(true)}} href={"/"} className='lg:px-3 lg:py-2 lg:rounded-lg text-black font-semibold bg-yellow-500 hover:scale-105 hover:bg-yellow-400'>new test</Link>
                <Link onClick={()=>{setPurchase(true)}} href={"/"} className='lg:px-3 lg:py-2 lg:rounded-lg text-black font-semibold bg-yellow-500 hover:scale-105 hover:bg-yellow-400'>new purchase</Link>
             </div>
        </div>
        <Image src={blackCar} alt='' className='lg:w-[550px] lg:h-[400px] absolute right-[100px]'/>
    </div>
  )
}

export default Landing