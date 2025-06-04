"use client";

import React, { useState } from "react";
import Image from "next/image";
import plusimg from "../../assets/images/Plus.png";

const BUILDING_DATA = {
  Apartment: ["Elevator", "Stairs", "Ramp"],
  House: ["Driveway Access", "Backdoor Entry", "Garage Entry"],
  Office: ["Freight Elevator", "Service Entrance", "Main Lobby"],
  Commercial: ["Loading Dock", "Curbside", "Underground Parking"],
  Warehouse: ["Ground Level Access", "Dock High Access"],
  Others: ["Other Access Methods"],
};

const Accessibility = () => {
  const [buildingType, setBuildingType] = useState("");
  const [accessType, setAccessType] = useState("");
  const [instruction, setInstruction] = useState("");
  const [entries, setEntries] = useState([]);

  const handleBuildingChange = (e) => {
    setBuildingType(e.target.value);
    setAccessType("");
    setInstruction("");
  };

  const handleAccessChange = (e) => {
    setAccessType(e.target.value);
  };

  const handleAddEntry = () => {
    if (!buildingType || !accessType) return;

    if (entries.length >= 1) return; // Only allow one entry

    setEntries([
      {
        buildingType,
        accessType,
        instruction: instruction.trim(),
        count: 1,
      },
    ]);

    setAccessType("");
    setInstruction("");
  };

  const handleDelete = (indexToDelete) => {
    setEntries((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="grid">
      <p className="text-teal-500 font-bold mt-10">
        2. Accessibility and Logistics
      </p>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Left: Selection Inputs */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Building Type */}
            <div className="flex-1">
              <label className="block text-sm mb-2 font-medium">
                Select Type of Building:
              </label>
              <select
                className="w-full border p-3 rounded"
                value={buildingType}
                onChange={handleBuildingChange}
              >
                <option value="">Select Type</option>
                {Object.keys(BUILDING_DATA).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Access Type */}
            {buildingType && (
              <div className="flex-1">
                <label className="block text-sm mb-2 font-medium">
                  Select Building Access:
                </label>
                <select
                  className="w-full border p-3 rounded"
                  value={accessType}
                  onChange={handleAccessChange}
                >
                  <option value="">Select Access</option>
                  {BUILDING_DATA[buildingType].map((access, idx) => (
                    <option key={idx} value={access}>
                      {access}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {accessType && (
            <p className="text-sm text-gray-600">
              Accesibility:{" "}
              <strong>
                {buildingType} → {accessType}
              </strong>
            </p>
          )}

          <button
            onClick={handleAddEntry}
            disabled={entries.length > 0}
            className={`text-sm mt-2 px-4 py-2 ${
              entries.length > 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#00000005] hover:border-teal-500"
            } text-xs md:text-sm relative mt-2 px-4 py-2 bg-[#00000005] border-[0000001A] border-1 shadow-lg hover:border-teal-500 text-black  h-12 rounded md:w-36 flex items-center justify-center gap-2`}
          >
            <Image src={plusimg} alt="Add" />
            Submit
          </button>
        </div>

        {/* Right: Instruction */}
        <div className="w-full md:w-1/2 mb-2 flex flex-col justify-start">
          <label
            htmlFor="instruction"
            className="text-xs md:text-sm mb-2 font-medium"
          >
            Special Entry Handling Instructions
          </label>
          <textarea
            id="instruction"
            name="instruction"
            rows="1"
            className="w-full border rounded p-2 resize-none h-24 sm:h-28 md:h-12"
            placeholder="If Others, list access method here."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>
      </div>

      {/* Display Entry */}
      {entries.length > 0 && (
  <div className="w-full md:w-3/4 mt-6">
    <ul className="space-y-2">
      {entries.map((entry, index) => (
        <li
          key={index}
          className="border p-2 rounded flex justify-between items-start gap-4 text-sm"
        >
          <div>
            <strong>
              {entry.buildingType} → {entry.accessType}
            </strong>
            <div className="text-gray-600 mt-1">
              {entry.instruction || "No instructions"}
            </div>
          </div>

          <button
            onClick={() =>
              window.confirm("Are you sure you want to delete this entry?") &&
              handleDelete(index)
            }
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}


    </div>
  );
};

export default Accessibility;
