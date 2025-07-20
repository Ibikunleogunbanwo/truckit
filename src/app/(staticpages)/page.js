"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import heroimage from "../../assets/images/hero-image.png";
import ContinueWithLogin from "@/components/landingpage/button";
import serviceleft from "../../assets/images/services-left.png";
import serviceright from "../../assets/images/services-right.png";
import MyDatePicker from "@/components/landingpage/datepicker";
import truck from "../../assets/images/truck.png";
import TimeRangeSelector from "@/components/landingpage/timepicker";
import Locationpicker from "@/components/landingpage/locationpicker";
import pickup from "../../assets/images/img-location.png";
import dropoff from "../../assets/images/img-dropoff.png";
import Carousel from "@/components/landingpage/carousel";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";


const Page = () => {

  const router = useRouter();
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromTime: "",
    toTime: "",
  });

 
  function getDurationInHours(fromTime, toTime) {
    const [fromHour, fromMinute] = fromTime.split(":").map(Number);
    const [toHour, toMinute] = toTime.split(":").map(Number);
  
    const fromTotalMinutes = fromHour * 60 + fromMinute;
    const toTotalMinutes = toHour * 60 + toMinute;
  
    const durationMinutes = toTotalMinutes - fromTotalMinutes;
    const durationHours = durationMinutes / 60;
  
    return `${durationHours} hrs`;
  }


  const handleSubmit = () => {
    const errors = [];
    if (!pickupLocation?.fullAddress) errors.push("Pickup location");
    if (!dropOffLocation?.fullAddress) errors.push("Drop-off location");
    if (!startDate) errors.push("Date");
    if (!timeRange.fromTime || !timeRange.toTime) errors.push("Time range");
  
    if (errors.length > 0) {
      toast.error(`Please fill in: ${errors.join(", ")}`);
      return;
    }
  
    try {
      const {
        fullAddress: pickupFullAddress,
        apartmentNumber: pickupApartmentNumber,
        streetNumber: pickupStreetNumber,
        streetName: pickupStreetName,
        city: pickupCity,
        province: pickupProvince,
        postalCode: pickupPostalCode,
        country: pickupCountry,
        location: pickupLoc,
      } = pickupLocation;
  
      const {
        fullAddress: dropOffFullAddress,
        apartmentNumber: dropOffApartmentNumber,
        streetNumber: dropOffStreetNumber,
        streetName: dropOffStreetName,
        city: dropOffCity,
        province: dropOffProvince,
        postalCode: dropOffPostalCode,
        country: dropOffCountry,
        location: dropOffLoc,
      } = dropOffLocation;
  
      const moveRequestDetails = {
        // Pickup
        pickupFullAddress,
        pickupApartmentNumber,
        pickupStreetNumber,
        pickupStreetName,
        pickupCity,
        pickupProvince,
        pickupPostalCode,
        pickupCountry,
        pickupLat: pickupLoc?.lat,
        pickupLng: pickupLoc?.lng,
  
        // Drop-off
        dropOffFullAddress,
        dropOffApartmentNumber,
        dropOffStreetNumber,
        dropOffStreetName,
        dropOffCity,
        dropOffProvince,
        dropOffPostalCode,
        dropOffCountry,
        dropOffLat: dropOffLoc?.lat,
        dropOffLng: dropOffLoc?.lng,
  
        // Other move info
        date: startDate.toISOString().split("T")[0],
        fromTime: timeRange.fromTime,
        toTime: timeRange.toTime,
        duration: getDurationInHours(timeRange.fromTime, timeRange.toTime),
      };
  
      const query = new URLSearchParams({
        move: JSON.stringify(moveRequestDetails),
      });
  
      router.push(`/search-movers?${query.toString()}`);
    } catch (error) {
      console.error("Routing error:", error);
      alert("Failed to process your request. Please try again.");
    }
  };


  return (
    <div id="main" className="min-h-screen bg-white w-full">
      <div
        id="Hero-Section"
        className="flex flex-col-reverse lg:flex-row p-4 my-10 "
      >
        <div className="flex-1 ">
          <div className="grid p-4 gap-4 w-full">
            <h1 className=" w-full lg:w-80 lg:h-16 text-teal-500 text-xl md:text-xl">
              Move anywhere, anytime with TruckIt.
            </h1>
            <p className="text-black/80 leading-8 font-medium lg:mr-12 lg:h-18 text-sm lg:mb-10 md:text-lg lg:pr-2 text-justify">
              Effortless relocations at your fingertips. Whether you&apos;re moving
              across town or across the country, TruckIt connects you with
              reliable movers to get you there stress-free.
            </p>
            <div className=" grid md:grid-cols-2 gap-4 my-2 w-full">
              <Locationpicker
                src={pickup}
                placeholder="Pickup Location"
                location={pickupLocation}
                onLocationChange={setPickUpLocation}
              />
              <Locationpicker
                src={dropoff}
                placeholder="Drop-off Location"
                location={dropOffLocation}
                onLocationChange={setDropOffLocation}
              />
              <MyDatePicker 
              date={startDate}
              onDateChange={setStartDate}
              />
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

            <ContinueWithLogin
              buttonText="Continue"
              linkText="Login to see user activity"
              linkHref="/login"
              widthClass="w-36"
              onClick={handleSubmit}
            />
          </div>
        </div>

        <div className="flex-1 rounded-md">
          <Image
            src={heroimage}
            alt="Hero Image"
            className="w-full h-full object-cover p-4 rounded-3xl border-white"
          />
        </div>
      </div>

      <div id="services" className="grid px-8 my-8 gap-y-2 lg:gap-y-4 ">
        <h1 className="text-teal-500 font-semibold md:font-extrabold text-xl">
          Our Services.
        </h1>
        <span className="text-black/80 leading-6 font-medium text-sm md:text-base text-justify mb-4 lg:w-1/2">
          Reliable Rides,Seamless Moves. Whether you need a trusted driver or a
          hassle-free moving service, we’ve got you covered!
        </span>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full mb-6">
          <div className="relative flex-1">
            <Image
              src={serviceleft}
              alt="Hero Image"
              className="w-full h-72 object-cover rounded border-white"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded">
              <div className=" relative p-4 md:p-8 w-full h-full flex flex-col justify-end ">
                <h2 className="text-white font-bold leading-4 md:text-3xl my-4">
                  Hire a truck driver
                </h2>
                <p className="text-white font-normal text-sm text-justify mb-4">
                  Need to transport goods, furniture, or equipment? Instantly
                  connect with reliable truck drivers for safe and efficient
                  delivery—whether it’s across town or long-distance.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <Image
              src={serviceright}
              alt="Hero Image"
              className="w-full h-72 object-cover rounded border-white"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded">
              <div className="relative p-4 md:p-8 w-full h-full flex flex-col justify-end">
                <h2 className="text-white font-bold leading-2 md:text-3xl my-4">
                  Find professional movers
                </h2>
                <p className="text-white font-normal text-sm text-justify mb-4">
                  Moving homes or offices? Get skilled movers to help with
                  packing, loading, and transportation, ensuring a smooth and
                  stress-free moving experience
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-black/80 font-bold text-lg">
          Join Our Network Today!
        </h1>
        <span className="text-black/80 leading-6 font-medium text-sm md:text-base text-justify mb-4 lg:w-1/2">
          Looking to offer your services? Whether you&apos;re a truck driver or a
          mover, sign up now to connect with customers and grow your business.
        </span>
        <ContinueWithLogin
          buttonText="Get Started"
          linkText=""
          linkHref=""
          widthClass="w-36"
        />
      </div>

      <div
        id="activity"
        className="flex flex-col lg:flex-row text-black justify-between w-full h-full p-4 "
      >
        <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-[28rem]">
          <div className="absolute top-15 sm:top-16 lg:top-20 bg-teal-50 w-full h-2/3 lg:h-3/4 bottom-5 z-10 rounded-md "></div>
          <div className="absolute bg-teal-500 w-7/12 max-w-5xl h-1/3 lg:h-2/3 left-1/2 transform -translate-x-1/2 z-0 bottom-2 rounded-md"></div>
          <Image
            src={truck}
            alt="Hero Image"
            className=" absolute w-full max-h-full object-cover p-4 bottom-3 rounded border-white z-10"
          />
        </div>

        <div className="relative w-full lg:w-1/2  flex flex-col justify-end mb-8`">
          <div className="h-1/2"></div>
          <div id="login" className="p-4">
            <h1 className=" text-lg md:text-xl font-bold lg:font-extrabold text-teal-500 pb-4 ">
              Login to see your recent activity
            </h1>
            <p className="text-sm text-black/80 leading-6 mb-4">
              Log in to access your account and stay updated on your recent
              activity, transactions, and progress, all in one place!
            </p>

            <ContinueWithLogin
              buttonText="Log in to your account"
              linkText="Create account"
              linkHref="/register"
              widthClass="w-48"
              onClick={()=>{router.push("/login")}}
            />
          </div>
        </div>
      </div>

      <div id="carousel" className=" bg-black w-full h-[567px] mt-4 ">
        <Carousel rating={4.0} />
      </div>
    </div>
  );
};

export default Page;
