"use client";

import React, { useMemo, useCallback } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Image from "next/image";

const LocationPicker = ({ 
  placeholder = "Pickup Location", 
  src = "/logo.png",
  location,
  onLocationChange
}) => {
  // Memoize autocomplete options to prevent recreation on every render
  const autocompleteOptions = useMemo(() => ({ 
    types: ["address"] 
  }), []);

  // Memoize the place selection handler
  const handlePlaceSelected = useCallback((place) => {
    onLocationChange(place);
  }, [onLocationChange]);

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none z-10">
        <Image
          src={src}
          alt="Location icon"
          width={20}
          height={20}
          className="h-5 w-5 sm:h-[18px] sm:w-[18px] text-slate-500 opacity-70"
        />
      </span>

      <ReactGoogleAutocomplete
        className="h-16 w-full pl-11 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-3 border border-slate-200 rounded-lg text-sm sm:text-xs text-slate-700 placeholder:text-slate-400 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 touch-manipulation"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={autocompleteOptions}
        placeholder={placeholder}
        defaultValue={location || ""}
      />
    </div>
  );
};

export default LocationPicker;