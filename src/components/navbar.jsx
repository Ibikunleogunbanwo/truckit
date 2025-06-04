import React from "react";
import Image from "next/image";
import logoimg from "../assets/images/image.png";
import buttonimg from "../assets/images/buttonimg.png";
import Logo from "../components/logo";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div
      id="Nav-bar"
      className="bg-black w-full h-20 border border-black flex justify-between items-center  lg:p-4"
    >
      <div className="flex items-center justify-between w-full px-4">
        <div id="logo-warapper" className="flex-start flex items-center gap-12">
          <div id="logo" className="flex items-center justify-center gap-2">
            <Logo src={logoimg} height={50} width={50} className="bg-white" />
            <h1 className="text-lg text-white font-bold">Truckit</h1>
          </div>

          <div className="hidden md:block">
          <ul className="flex items-center md:gap-4 lg:gap-4 text-white text-sm lg:px-6">
            <li className="hover:underline md:text-xs lg:text-base cursor-pointer">
              Drivers & Movers
            </li>
            <li className="hover:underline md:text-xs lg:text-base cursor-pointer">
              FAQS
            </li>
            <li className="hover:underline md:text-xs lg:text-base cursor-pointer">
              How it works
            </li>
          </ul>
         </div>

        </div>
        <div id="button" className="flex-1 flex justify-end">
        <Link href="/login">
          <button 
          type="button"
          className="bg-white w-22 lg:w-28  h-8 lg:h-11 text-black flex justify-center items-center gap-2 text-sm rounded shadow-md p-1 lg:p-4 hover:bg-teal-500 hover:text-white ">
            Sign in
            <span>
              <Image src={buttonimg} width={15} height={15} alt="button logo" />
            </span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


       
