"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";

const Moversassistance = ({onMoversDetailsChange}) => {
  
  const [moversDetails, setMoversDetails] = useState({
    needDriver: true,
    needMover: true,
    needUnload: true,
    selectedVehicleType: "",
    selectedNoOfMovers: "",
    equipmentRequired: "",
  });

  const baseButtonClasses =
    "w-1/2 p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white";


 const debouncedOnChange = useMemo(() => {
    return debounce((info) => {
      if (onMoversDetailsChange) onMoversDetailsChange(info);
    }, 1000); // 500ms delay
  }, [onMoversDetailsChange]);

  useEffect(() => {
    return () => debouncedOnChange.cancel();
  }, [debouncedOnChange]);




    const handleNeedDriver = (value) => {
      const updatedNeedDriver = {
        ...moversDetails,
        needDriver: value,
      };
      setMoversDetails(updatedNeedDriver);
      if (onMoversDetailsChange) {
        onMoversDetailsChange(updatedNeedDriver);
      }
    };


    const handleNeedMover = (value) => {
      const updatedNeedMover = {
        ...moversDetails,
        needMover: value,
      };
      setMoversDetails(updatedNeedMover);
      if (onMoversDetailsChange) {
        onMoversDetailsChange(updatedNeedMover)
      }
    };


    const handleNeedUnload = (value) => {
      const updatedNeedUnload = {
        ...moversDetails,
        needUnload: value,
      };

    setMoversDetails(updatedNeedUnload);
    if (onMoversDetailsChange){
      onMoversDetailsChange(updatedNeedUnload);
    } 
    };

  
    const handleSelectedVehicleType = (e) => {
      const updatedVehicleType = {
        ...moversDetails,
        selectedVehicleType: e.target.value,
      };

      setMoversDetails(updatedVehicleType);
      if (onMoversDetailsChange){
        onMoversDetailsChange(updatedVehicleType)
      }
    };


    const handleselectedNoOfMovers = (e) => {
      const updatedNoMovers = {
        ...moversDetails,
        selectedNoOfMovers: Number(e.target.value),
      };

      setMoversDetails(updatedNoMovers);
      if (onMoversDetailsChange){
        onMoversDetailsChange(updatedNoMovers);
      }
    };

    const handleequipmentRequired = (e) => {
      const updatedEquipmentRequired = {
        ...moversDetails,
        equipmentRequired: e.target.value,
      };

      setMoversDetails(updatedEquipmentRequired);
      if (onMoversDetailsChange) {
        debouncedOnChange(updatedEquipmentRequired);
      }
    };


   
  return (
    <div>
      <p className="text-teal-500 font-bold mt-10 mb-4">
        3. Movers and assistance
      </p>

      <div className="flex flex-col md:flex-row md:justify-between items-start text-sm gap-6 md:px-8 mb-4">
        {/* Driver */}
        <div className="flex flex-col md:w-1/4 ">
          <div className="min-h-[40px]">
            <label htmlFor="needDriver" className="font-medium">
              Do you need a driver?
            </label>
          </div>
          <div className="flex border-2 gap-1 border-gray-300 rounded-md p-1 w-36">
            <button
              onClick={() => handleNeedDriver(true)}
              className={`${baseButtonClasses} ${
                moversDetails.needDriver
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white rounded-md"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleNeedDriver(false)}
              className={`${baseButtonClasses} ${
                moversDetails.needDriver === false
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Mover Load */}
        <div className="flex flex-col md:w-1/4">
          <div className="min-h-[40px]">
            <label htmlFor="needMover" className="font-medium">
              Do you need movers to help you load?
            </label>
          </div>
          <div className="flex border-2 border-gray-300 rounded-md p-1 w-36">
            <button
              onClick={() => handleNeedMover(true)}
              className={`${baseButtonClasses} ${
                moversDetails.needMover
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white rounded-md"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleNeedMover(false)}
              className={`${baseButtonClasses} ${
                moversDetails.needMover === false
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Mover Unload */}
        <div className="flex flex-col md:w-1/4">
          <div className="min-h-[40px]">
            <label htmlFor="needUnload" className="font-medium">
              Do you need movers to help you unload?
            </label>
          </div>
          <div className="flex border-2 border-gray-300 rounded-md p-1 w-36">
            <button
              onClick={() => handleNeedUnload(true)}
              className={`${baseButtonClasses} ${
                moversDetails.needUnload
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white rounded-md"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleNeedUnload(false)}
              className={`${baseButtonClasses} ${
                moversDetails.needUnload === false
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mb-4 mt-8 gap-2">
        {/* Vehicle & Movers Section */}
        <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-1/2 rounded-md">
          {/* Vehicle Type */}
          <div className="rounded-md w-full md:flex-1">
            <div className="flex justify-between items-center">
              <label htmlFor="vehicle-type" className=" text-sm font-medium">
                Truck Type
              </label>
              <Link href="/help/choose-truck">
                <span className="text-[10px] text-teal-500 cursor-pointer underline">
                  Need help choosing?
                </span>
              </Link>
            </div>
            <select
              id="vehicle-type"
              name="vehicle-type"
              value={moversDetails.selectedVehicleType}
              onChange={handleSelectedVehicleType}
              className="w-full p-3 h-12 text-sm rounded-md border border-gray-300 outline-none"
            >
              <option value="">Select a truck type</option>
              <option value="cargo-van">Cargo Van</option>
              <option value="pickup-truck">Pickup Truck</option>
              <option value="sprinter-van">Sprinter Van</option>
              <option value="box-truck-12ft">Box Truck (12 ft)</option>
              <option value="box-truck-16ft">Box Truck (16 ft)</option>
              <option value="box-truck-24ft">Box Truck (24 ft)</option>
              <option value="box-truck-26ft">Box Truck (26 ft)</option>
              <option value="straight-truck">Straight Truck</option>
              <option value="moving-van">Moving Van</option>
              <option value="trailer">Utility Trailer</option>
              <option value="semi-truck">
                Semi-Truck (for long-distance or bulk)
              </option>
            </select>
          </div>

          {/* Number of Movers */}
          <div className="rounded-md w-full mt-1 md:flex-1">
            <label htmlFor="Noofmovers" className="block text-sm font-medium">
              Number of movers needed:
            </label>
            <select
              id="Noofmovers"
              name="Noofmovers"
              value={moversDetails.selectedNoOfMovers}
              onChange={handleselectedNoOfMovers}
              className="w-full p-3 h-12 text-sm rounded-md border border-gray-300 outline-none"
            >
              <option value="">Select number of movers</option>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Equipment Input */}
        <div className="lg:w-1/2 mt-1 rounded-md ">
          <label htmlFor="equipment-type" className="block text-sm font-medium">
            Equipment Required:
          </label>
          <input
            id="equipment-type"
            type="text"
            value={moversDetails.equipmentRequired}
            onChange={handleequipmentRequired}
            className="border border-gray-300 w-full rounded-md p-3 text-sm"
            placeholder="e.g. straps, dollies"
          />
        </div>
      </div>
          

    </div>
  );
};

export default Moversassistance;
