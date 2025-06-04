"use client"
import React from 'react'
import { useState } from "react";
import Link from 'next/link';
import ContinueWithLogin from '../landingpage/button';


const Confirmation = () => {
    const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col w-full mt-10 mb-12 gap-2">
    <div className='flex justify-start items-center gap-2 mb-2'>
      <input
        type="checkbox"
        id="agree"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className="w-4 h-4"
      />
      <label htmlFor="agree" className="text-xs lg:text-sm text-justify">
      Before you continue, please confirm that you have read and you understand TruckIt’s <Link href="#"><span className='font-bold hover:underline'>terms of service.</span></Link>
      </label>
      </div>

      <ContinueWithLogin
      buttonText='Submit request'
      widthClass='w-40'
      />
    </div>
  );
}


export default Confirmation
