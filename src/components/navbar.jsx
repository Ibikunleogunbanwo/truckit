import React from "react";
import Image from "next/image";
import logoimg from "../assets/images/image.png";
import buttonimg from "../assets/images/buttonimg.png";
import Logo from "../components/logo";
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav
      id="Nav-bar"
      className="bg-black w-full h-20 border border-black overflow-hidden"
    >
      <div className="flex justify-between items-center h-full px-4 lg:px-8">
        {/* Logo and Navigation Section */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo src={logoimg} height={50} width={50} className="bg-white" />
            <h1 className="text-lg lg:text-xl text-white font-bold whitespace-nowrap">
              Truckit
            </h1>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li>
                <a href="#" className="text-white text-sm lg:text-base hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap">
                  Drivers & Movers
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-sm lg:text-base hover:text-teal-400 transition-colors cursor-pointer">
                  FAQS
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-sm lg:text-base hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap">
                  How it works
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sign In Button */}
        <div className="flex-shrink-0">
          <Link href="/login">
            <button 
              type="button"
              className="bg-white px-4 py-2 lg:px-6 lg:py-3 text-black flex justify-center items-center gap-2 text-sm lg:text-base rounded shadow-md hover:bg-teal-500 hover:text-white transition-colors whitespace-nowrap"
            >
              Sign in
              <Image src={buttonimg} width={15} height={15} alt="button logo" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;