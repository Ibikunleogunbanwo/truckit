import React from "react";
import Image from "next/image";
import Arrowicon from "../../../assets/images/Arrow - Left.png";
import CategoryDropdown from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import Confirmation from "@/components/search-movers/confirmation";
import Contactinfo from "@/components/search-movers/contactinfo";

const Searchmovers = () => {
  return (
    <div id="main" className="min-h-screen bg-white w-full">
      
      <div className="grid p-8">
        <div>
          <Image src={Arrowicon} alt="Arrow icon" className="mb-2" />
        </div>

        <div className="grid ">
          <p className="mb-4 mt-4 text-sm leading-8 md:leading-0">
            You’re about to book a moving service from{" "}
            <span className="text-teal-500">123 Maple Street, Toronto</span> to{" "}
            <span className="text-teal-500">456 Wood Street, Toronto.</span>
          </p>
          <p className="text-black/80 mb-2">
            Date: <span className="font-semibold">35th Oct, 2044</span>{" "}
          </p>
          <p className="text-black/80 text-sm">
            Time: <span className="font-bold"> 11:00 am</span> -{" "}
            <span className="font-bold">01:00 pm</span>{" "}
          </p>
        </div>
        <p className="text-teal-500 font-bold mt-18">1. Items to be moved</p>
        <div className="mb-4">
          <CategoryDropdown />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div className="mb-4">
          <Accessibility />
          <hr className="mt-4 border-gray-300" />
        </div>

        <div>
      <Moversassistance />
      <hr className="mt-2 border-gray-300" />
        </div>

        <div>
      <Contactinfo />
      <hr className="mt-2 border-gray-300" />
    </div>

        <Confirmation />
      </div>
    </div>
  );
};

export default Searchmovers;
