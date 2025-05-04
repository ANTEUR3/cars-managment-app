import React, { ReactNode } from 'react'
import { useFilterContext } from '../page'

type Props = {}

const FilterBar = ({children}: {children:ReactNode}) => {
    const context=useFilterContext()
  return (
    <div className='lg:flex lg:justify-between lg:items-center w-full  lg:px-[100px]'>
        <div className='lg:flex lg:justify-start lg:items-center lg:gap-x-[20px]'>
             {children}
        </div>
        <div className='lg:flex lg:justify-end lg:items-center lg:gap-x-[20px]'>
             <div className={`lg:px-3 lg:py-1 lg:rounded-lg  ${context.available?'bg-black text-white':'bg-gray-300 text-black  cursor-pointer hover:scale-108'}`} onClick={()=>{context.setAvailable(true)}}>Available</div>
             <div className={`lg:px-3 lg:py-1 lg:rounded-lg  ${!context.available?'bg-black text-white':'bg-gray-300 text-black  cursor-pointer hover:scale-108'}`} onClick={()=>{context.setAvailable(false)}}>Inavailable</div>
        </div>
    </div>
  )
}

export default FilterBar