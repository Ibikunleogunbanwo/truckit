"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Arrowicon from "../../../assets/images/Arrow - Left.png";
import SelectServices from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import Link from "next/link";
import ContactInfo from "@/components/search-movers/contactinfo";
import ContinueWithLogin from "@/components/landingpage/button";
import SubmissionModal from "@/components/modal";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";

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

  const [isOpen, setIsOpen] = useState(false);

  const [contactInfo, setContactInfo] = useState(null);

  const searchParams = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const dropOffLocation = searchParams.get("dropOffLocation");
  const date = searchParams.get("date");
  const fromTime = searchParams.get("fromTime");
  const toTime = searchParams.get("toTime");
  const duration = searchParams.get("duration");

  const RequestDetails = {
    PickupLocation: pickupLocation,
    PropOffLocation: dropOffLocation,
    Date: date,
    FromTime:fromTime,
    ToTime: toTime,
    Duration: duration,
  }

  const handleValidContactChange = (validDataOrNull) => {
    setContactInfo(validDataOrNull);
  };

  const handleSubmit = () => {
    const generateRequestId = (length = 10) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((byte) => chars[byte % chars.length])
        .join('');
    };
  
    const requestId = generateRequestId();
  
    const formData = {
      requestId:generateRequestId(),
      RequestDetails,
      accessibility: accessibilityData,
      items,
      movers: moversDetails,
      contact: contactInfo,
      agreedToTerms: isChecked,
    };
  
    if (!formData.items || formData.items.length === 0) {
      toast("Please select at least one Category & Sub category.");
      return;
    }
  
    if (
      !formData.accessibility ||
      Object.keys(formData.accessibility).length === 0
    ) {
      toast.error("Please fill out accessibility information.");
      return;
    }
  
    if (
      String(formData.movers.Vehicleneedeed).trim() === "" ||
      String(formData.movers.NoofMovers).trim() === ""
    ) {
      toast.error("Please fill out truck type and movers needed information.");
      return;
    }
  
    if (!contactInfo) {
      toast.error("Please fix errors before submitting.");
      return;
    }
  
    if (!formData.agreedToTerms) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }
  
    console.log("Submitting form data:", formData);
    toast.success("Your request has been submitted");
    setIsOpen(true);
  
    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <div id="main" className="min-h-screen bg-white w-full">
      <div className="grid p-8">
        <div>
          <Image src={Arrowicon} alt="Arrow icon" className="mb-2" />
        </div>

        <div className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg ">
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 mt-1.5 flex-shrink-0 shadow-sm"></div>
            <p className="text-sm leading-relaxed text-slate-700 pr-2">
              You're about to book a moving service from{" "}
              <span className="text-teal-600 font-semibold px-3 py-1.5 rounded-lg block mt-2 mb-2 text-center shadow-sm border ">
                {pickupLocation || <span className="italic text-slate-400">[Pickup location not set]</span>}
              </span>{" "}
              to{" "}
              <span className="text-teal-600 font-semibold  px-3 py-1.5 rounded-lg block mt-2 text-center shadow-sm border">
                {dropOffLocation || <span className="italic text-slate-400">[Drop off location not set]</span>}
              </span>
            </p>
          </div>

          <div className="space-y-3 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 shadow-sm"></div>
                <span className="text-slate-600 text-sm">Date:</span>
              </div>
              <span className="font-semibold text-teal-600 bg-gradient-to-r from-white to-teal-50/50 px-4 py-2 rounded-lg text-sm ml-3.5 sm:ml-0 shadow-sm border border-teal-100/40">
                {date || <span className="italic text-slate-400">[Date not set]</span>}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                <span className="text-slate-600 text-sm">Time:</span>
              </div>
              <span className="font-semibold text-teal-600 bg-gradient-to-r from-white to-teal-50/50 px-4 py-2 rounded-lg text-sm ml-3.5 sm:ml-0 shadow-sm border border-teal-100/40">
                {fromTime || <span className="italic text-slate-400">[00:00]</span>} - {toTime || <span className="italic text-slate-400">[00:00]</span>}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                <span className="text-slate-600 text-sm">Duration:</span>
              </div>
              <span className="font-semibold text-teal-600 bg-gradient-to-r from-white to-teal-50/50 px-4 py-2 rounded-lg text-sm ml-3.5 sm:ml-0 shadow-sm border border-teal-100/40">
                {duration || <span className="italic text-slate-400">[0hrs]</span>}
              </span>
            </div>
          </div>
        </div>
        <p className="text-teal-500 font-bold mt-18">1. Items to be moved</p>
        <div id="selectservices" className="mb-4 grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <SelectServices items={items} onItemsChange={setItems} />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div id="Accesibility" className="mb-4 grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <Accessibility
            entries={accessibilityData}
            onEntriesChange={(entries) => setAccessibilityData(entries)}
          />
          <hr className="mt-4 border-gray-300" />
        </div>

        <div id="moversassistance" className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <Moversassistance
            moversDetails={moversDetails}
            onMoversDetailsChange={(moversDetails) =>
              setMoversDetails(moversDetails)
            }
          />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div id="contact info" className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-md">
          <ContactInfo onContactChange={handleValidContactChange} />
          <hr className="mt-2 border-gray-300" />
        </div>

        <div
          id="confirmation"
          className="flex flex-col w-full mt-10 mb-12 gap-2"
        >
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
            widthClass="w-40"
          />
        </div>

        <div>
          <SubmissionModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Searchmovers;
