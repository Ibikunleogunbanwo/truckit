"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Image from "next/image";

const LocationPicker = ({
  placeholder = "Pickup Location",
  src = "/logo.png",
  location,
  onLocationChange,
}) => {
  const autocompleteOptions = useMemo(() => ({
    types: ["address"]
  }), []);

  // Extract address components from Google Place
  const extractAddressComponents = (place) => {
    const getComponent = (type) =>
      place.address_components?.find(comp => comp.types.includes(type))?.long_name || "";

    return {
      fullAddress: place.formatted_address || "",
      apartmentNumber: getComponent("subpremise"),
      streetNumber: getComponent("street_number"),
      streetName: getComponent("route"),
      city: getComponent("locality"),
      province: getComponent("administrative_area_level_1"),
      postalCode: getComponent("postal_code"),
      country: getComponent("country"),
      location: {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng()
      }
    };
  };

  const handlePlaceSelected = useCallback((place) => {
    if (!place || !place.address_components) return;
    const parsed = extractAddressComponents(place);
    onLocationChange(parsed); // Send structured data to parent
  }, [onLocationChange]);

  // On mount, send full object if available
  useEffect(() => {
    if (location?.fullAddress) {
      onLocationChange(location);
    }
  }, [location, onLocationChange]);

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
        defaultValue={location?.fullAddress || ""}
      />

    </div>
  );
};

export default LocationPicker;