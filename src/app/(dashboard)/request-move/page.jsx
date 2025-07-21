"use client"
import DashboardHeader from '@/components/dashboardheader'
import MyDatePicker from '@/components/landingpage/datepicker'
import Locationpicker from '@/components/landingpage/locationpicker'
import TimeRangeSelector from '@/components/landingpage/timepicker'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import pickup from "../../../assets/images/img-location.png";
import dropoff from "../../../assets/images/img-dropoff.png";
import Arrowicon from "../../../assets/images/Arrow - Left.png";
import SelectServices from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import Link from "next/link";
import ContactInfo from "@/components/search-movers/contactinfo";
import ContinueWithLogin from "@/components/landingpage/button";
import SubmissionModal from "@/components/modal";
import { Toaster, toast } from "sonner";
import haversine from 'haversine';



const RequestMove = () => {

    const [pickupLocation, setPickUpLocation] = useState({});
    const [dropOffLocation, setDropOffLocation] = useState({});

    const [startDate, setStartDate] = useState(null);
    const [timeRange, setTimeRange] = useState({
        fromTime: "",
        toTime: "",
      });


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
    const [contactInfo, setContactInfo] = useState(null);

   
  
    function getDurationInHours(fromTime, toTime) {
      const [fromHour, fromMinute] = fromTime.split(":").map(Number);
      const [toHour, toMinute] = toTime.split(":").map(Number);
    
      const fromTotalMinutes = fromHour * 60 + fromMinute;
      const toTotalMinutes = toHour * 60 + toMinute;
    
      const durationMinutes = toTotalMinutes - fromTotalMinutes;
      const durationHours = durationMinutes / 60;
    
      return `${durationHours} hrs`;
    }
    
      
      const RequestDetails = {
        PickupLocation: {
          fullAddress: pickupLocation.fullAddress || "",
          apartmentNumber: pickupLocation.apartmentNumber || "",
          streetNumber:  pickupLocation.streetNumber || "",
          streetName:  pickupLocation.streetName || "",
          city:  pickupLocation.city || "",
          province:  pickupLocation.province || "",
          postalCode:  pickupLocation.postalCode || "",
          country:  pickupLocation.country || "",
          latitude:  pickupLocation.location?.lat || "",
          longitude:  pickupLocation.location?.lng || "",
        },

        DropOffLocation: {
          fullAddress: dropOffLocation.fullAddress || "",
          apartmentNumber: dropOffLocation.apartmentNumber || "",
          streetNumber: dropOffLocation.streetNumber || "",
          streetName: dropOffLocation.streetName || "",
          city: dropOffLocation.city || "",
          province: dropOffLocation.province || "",
          postalCode: dropOffLocation.postalCode || "",
          country: dropOffLocation.country || "",
          latitude: dropOffLocation.location?.lat || "",
          longitude: dropOffLocation.location?.lng || "",
        },
        Date: startDate || "Not selected",
        FromTime: timeRange.fromTime || "00:00",
        ToTime: timeRange.toTime || "00:00",
        Duration: getDurationInHours(timeRange.fromTime,timeRange.toTime)
      };
    

      
      const start = pickupLocation.location
      ? { latitude: pickupLocation.location.lat, longitude: pickupLocation.location.lng }
      : null;
  
    const end = dropOffLocation.location
      ? { latitude: dropOffLocation.location.lat, longitude: dropOffLocation.location.lng }
      : null;
  
    const distance = useMemo(() => {
      if (start && end) {
        return haversine(start, end).toFixed(2);
      }
      return "N/A";
    }, [start, end]);


    
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
          request_details: RequestDetails,
          accessibility_details: accessibilityData,
          move_items: items,
          movers_requirements: moversDetails,
          move__contacts: contactInfo,
          agreedToTerms: isChecked,
          move_distance: distance,
        };
      
    
        console.log(pickupLocation)
    
        if (!items || items.length === 0) {
          toast("Please select at least one Category & Sub category.");
          return;
        }
      
        if (!accessibilityData || Object.keys(accessibilityData).length === 0) {
          toast.error("Please fill out accessibility information.");
          return;
        }
      
        if (
          !moversDetails?.Vehicleneedeed?.trim() ||
          !Number(moversDetails?.NoofMovers) ||
          Number(moversDetails?.NoofMovers) <= 0
        )
      
        if (!contactInfo || Object.keys(contactInfo).length === 0) {
          toast.error("Please fill out contact information.");
          return;
        }
      
        if (!isChecked) {
          toast.error("Please agree to the terms before submitting.");
          return;
        }
      
        console.log("Submitting form data:", formData);
        toast.success("Your request has been submitted");
        
       
      
        // fetch('/api/submit', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
      };
    

  return (
    <div className="w-full mt-14 md:mt-22">
         <div className="mt-4 fixed top-0 z-50">
        <DashboardHeader />
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 text-sm">
      <p className="text-lg font-extrabold font-inknut-antiqua mb-4">
        Request Move
      </p>

      {/* Responsive Grid for Inputs */}
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="w-full">
          <Locationpicker
            src={pickup}
            placeholder="Pickup Location"
            location={pickupLocation}
            onLocationChange={setPickUpLocation}
          />
        </div>
        <div className="w-full">
          <Locationpicker
            src={dropoff}
            placeholder="Drop-off Location"
            location={dropOffLocation}
            onLocationChange={setDropOffLocation}
          />
        </div>
        <div className="w-full">
          <MyDatePicker date={startDate} onDateChange={setStartDate} />
        </div>
        <div className="w-full">
          <TimeRangeSelector
            fromTime={timeRange.fromTime}
            toTime={timeRange.toTime}
            onFromTimeChange={(fromTime) =>
              setTimeRange((prev) => ({ ...prev, fromTime }))
            }
            onToTimeChange={(toTime) =>
              setTimeRange((prev) => ({ ...prev, toTime }))
            }
          />
        </div>
      </div>

      {/* Main Form Content Box */}


      <div className="my-6 w-full space-y-8 rounded-xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
        {/* Section: Items to be moved */}
        <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
          <p className="text-base font-bold text-teal-500">
            1. Items to be moved
          </p>
          <SelectServices items={items} onItemsChange={setItems} />
          <hr className="mt-2 border-gray-300" />
        </section>

        {/* Section: Accessibility */}
        <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
          <Accessibility
            entries={accessibilityData}
            onEntriesChange={setAccessibilityData}
          />
          <hr className="mt-4 border-gray-300" />
        </section>

        {/* Section: Movers Assistance */}
        
    <section className="w-full rounded-xl border border-teal-100/60 bg-white p-4 shadow-md">
      <div className="flex flex-col gap-4">
        <Moversassistance
          moversDetails={moversDetails}
          onMoversDetailsChange={setMoversDetails}
        />
        <hr className="border-gray-300" />
      </div>
    </section>

        {/* Section: Contact Info */}
        <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
          <ContactInfo onContactChange={handleValidContactChange} />
          <hr className="mt-2 border-gray-300" />
        </section>

        {/* Section: Confirmation */}
        <section id="confirmation" className="flex flex-col w-full gap-4 pt-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 h-4 w-4"
            />
            <label htmlFor="agree" className="text-justify text-xs lg:text-sm">
              Before you continue, please confirm that you have read and you
              understand TruckIt’s{" "}
              <Link href="#">
                <span className="font-bold hover:underline">terms of service.</span>
              </Link>
            </label>
          </div>

          <ContinueWithLogin
            onClick={handleSubmit}
            buttonText="Submit request"
            linkButton="#"
            widthClass="w-40"
          />
        </section>

       
      </div>
      
          </div>

      </div>
   
  )
}

export default RequestMove
