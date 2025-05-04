import React from 'react'
import logo from '../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className="lg:px-[130px]  lg:flex lg:justify-between lg:items-center fixed w-full bg-white z-10 ">
        <Link href={'/'} className='lg:flex lg:justify-start lg:items-center lg:gap-x-[-4px] cursor-pointer hover:text-yellow-500'>
      
        <Image src={logo} alt=' ' className='lg:w-[70px] lg:h-[70px]' />
        <h1 className='lg:font-semibold lg:text-xl  '>Omran Cars</h1>
        </Link>
       
       <div className="lg:flex lg:justify-end lg:items-center lg:gap-x-[20px]">
            <Link href={'/cars'} className="lg:font-semibold lg:text-xl text-black  hover:text-yellow-500 cursor-pointer">Cars</Link >
            <Link href={'/sales'} className="lg:font-semibold lg:text-xl text-black  hover:text-yellow-500 cursor-pointer">Sales</Link >
            <Link href={'/inspections'} className="lg:font-semibold lg:text-xl text-black  hover:text-yellow-500 cursor-pointer">Inspections</Link >
      </div>
       
   </div>
  )
}

export default NavBar