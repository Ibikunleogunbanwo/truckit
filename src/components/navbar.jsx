import React from 'react'
import Image from "next/image";
import logoimg from "../assets/images/image.png";
import buttonimg from "../assets/images/buttonimg.png";

const Navbar = () => {
  
  
    return (
        <div id="Nav-bar" className="bg-black w-full h-20 border border-black flex justify-between items-center">
        <div className="flex items-center justify-between px-6 md:w-3/5 lg:px-6 lg:w-1/2">
          <div className="flex items-center gap-2" id="logo">
            <Image
              src={logoimg}
              alt="logo"
              className="bg-white h-[32px] w-[32px] p-2 rounded"
            />
            <h1 className="text-lg text-white font-bold"> Truckit</h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center  md:gap-4 lg:gap-6 text-white text-sm lg:px-6">
              <li className="hover:underline md:text-xs lg:text-base cursor-pointer">
                Drivers & Movers
              </li>
              <li className="hover:underline md:text-xs lg:text-base cursor-pointer">FAQS</li>
              <li className="hover:underline md:text-xs lg:text-base cursor-pointer">
                How it works
              </li>
            </ul>
          </div>
        </div>
        <button className="bg-white w-28 h-11 text-black flex justify-center items-center gap-4 text-sm rounded shadow-md p-4 hover:bg-teal-500 hover:text-white mr-4 lg:mr-10">
          Sign in
          <span>
            <Image src={buttonimg} width={15} height={15} alt="button logo" />
          </span>
        </button>
      </div>
  )
}

export default Navbar
