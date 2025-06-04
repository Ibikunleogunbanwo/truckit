"use client";
import React from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Image from "next/image";

const Locationpicker = ({ placeholder = "Pickup Location", src = "/logo.png" }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none px-2">
        <Image
          src={src}
          alt="location icon"
          width={20}
          height={20}
          className="h-5 w-5 text-black/80"
        />
      </span>

      <ReactGoogleAutocomplete
        className="h-16 w-full pl-14 pr-1 py-4 border border-gray-300 rounded text-xs text-black/80 placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-teal-500"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        onPlaceSelected={(place) => console.log(place)}
        options={{ types: ["address"] }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Locationpicker;