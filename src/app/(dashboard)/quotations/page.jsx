"use client"

import DashboardHeader from '@/components/dashboardheader'
import RequestModal from '@/components/requestmodal'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
     const [isOpen, setIsOpen] = useState(false);

    const handleClickResponse =() =>{

        setIsOpen(true);

    }


  return (
    <div className="w-full mt-14 md:mt-20">
         <div className="mt-4 fixed top-0 z-50">
        <DashboardHeader />
      </div>

    <div className='mx-8 mt-8'>
        <p className="text-lg font-extrabold font-inknut-antiqua mb-4">
            Quotations
        </p>
        <div className='flex flex-col border-1 border-gray-300 gap-2 rounded-md p-4'>
         
         <p className='text-sm text-gray-500'>
            <span className='text-sm text-black'>Thur, Dec 32 </span>  - 10.30
         </p>

         <p className='text-sm text-gray-500'>
            <span className='text-sm text-black'>From </span> 123 Mapple Street, Toronto.
         </p>

         <p className='text-sm text-gray-500'> 
            <span className='text-sm text-black'>To </span> 456 Wood street, Toronto.
         </p>

        <div className='flex flex-col lg:flex-row justify-between gap-2 items-start lg:items-center'>
         <p className='text-sm text-gray-500'>
            <span className='text-sm text-black'>Service Required: </span>Truckdriver, Movers (2)
         </p>
        <Link href="/quotations"
        onClick={handleClickResponse}>
         <p className='underline text-green-500'>View 5 responses</p>
         </Link>
         </div>
        </div>
        <RequestModal isOpen={isOpen} setIsOpen={setIsOpen} redirectto = "/quotations" />
    </div>
    </div>
  )
}

export default page
