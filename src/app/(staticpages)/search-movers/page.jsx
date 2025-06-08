"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Arrowicon from "../../../assets/images/Arrow - Left.png";
import SelectServices from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import Link from "next/link";
import Contactinfo from "@/components/search-movers/contactinfo";
import ContinueWithLogin from "@/components/landingpage/button";


const Searchmovers = () => {
  const [accessibilityData, setAccessibilityData] = useState(null);
  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [moversDetails, setMoversDetails] = useState({
    needDriver: true,
    needMover: true,
    needUnload: true,
    Vehicleneedeed: "",
    NoofMovers: "",
    equipmentRequired: "",
  });
   

  const [contactInfo, setContactInfo]= useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
      })


      // Log formData on state change (which is fine for debugging)
useEffect(() => {
  const formData = {
    accessibility: accessibilityData,
    items,
    movers: moversDetails,
    contact: contactInfo,
    agreedToTerms: isChecked,
  };

  console.log("Updated form data:", formData);
}, [accessibilityData, items, moversDetails, isChecked, contactInfo]);




const handleSubmit = () => {
  const formData = {
    accessibility: accessibilityData,
    items,
    movers: moversDetails,
    contact: contactInfo,
    agreedToTerms: isChecked,
  };

  if (!formData.agreedToTerms) {
    alert("Please agree to the terms before submitting.");
    return;
  }

  console.log("Submitting form data:", formData);
  
  // TODO: fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
};

  // useEffect(() => {
  //   console.log("Moveersdeet", moversDetails);
  //   console.log("Selectcategory",items);
  //   console.log("Accesibility", accessibilityData)
  //   console.log("checkbox",isChecked)
  //   console.log("Contact", ContactInfo)
  // }, [moversDetails,items,accessibilityData,isChecked,ContactInfo]);



  
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
        <div id="selectservices" className="mb-4">
          <SelectServices items={items} onItemsChange={setItems} />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div id="Accesibility" className="mb-4">
          <Accessibility
            entries={accessibilityData}
            onEntriesChange={(entries) => setAccessibilityData(entries)}
          />
          <hr className="mt-4 border-gray-300" />
        </div>

        <div id="moversassistance">
          <Moversassistance 
          moversDetails={moversDetails}
          onMoversDetailsChange={(moversDetails) =>(setMoversDetails(moversDetails))}
          />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div id="contact info">
          <Contactinfo 
          ContactInfo={contactInfo}
          onContactChange={(contactInfo)=>(setContactInfo(contactInfo))}
          />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div id="confirmation" className="flex flex-col w-full mt-10 mb-12 gap-2">
          <div className="flex justify-start items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="agree" className="text-xs lg:text-sm text-justify">
              Before you continue, please confirm that you have read and you
              understand TruckIt’s{" "}
              <Link href="#">
                <span className="font-bold hover:underline">
                  terms of service.
                </span>
              </Link>
            </label>
          </div>
          <ContinueWithLogin
          onClick={handleSubmit}
           buttonText="Submit request" 
           linkButton="#"
           widthClass="w-40" />
        </div>
      </div>
    </div>
  );
};

export default Searchmovers;
