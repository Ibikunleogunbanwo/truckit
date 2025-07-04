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

const Accessibility = ({ entries, onEntriesChange }) => {
  const [buildingType, setBuildingType] = useState(entries?.buildingType ?? "");
  const [accessType, setAccessType] = useState(entries?.accessType ?? "");
  const [instruction, setInstruction] = useState(
    entries?.instruction ?? "No Instructions"
  );

  const handleBuildingChange = (e) => {
    setBuildingType(e.target.value);
    setAccessType("");
    setInstruction("");
  };

  const handleAccessChange = (e) => {
    setAccessType(e.target.value);
  };

  //this happens when the submit button is pressed//
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buildingType || !accessType) return;

    if (entries) return;

    onEntriesChange({
      buildingType,
      accessType,
      instruction: instruction.trim(),
    });

    setAccessType("");
    setInstruction("");
  };

  const handleDelete = () => {
    onEntriesChange(null);
  };

  return (
    <div className="grid">
      <p className="text-teal-500 font-bold">
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

          <div className="md:hidden w-full md:w-1/2 mb-2 flex flex-col justify-start">
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

          <button
            onClick={handleSubmit}
            //disable if entries is true//
            disabled={Boolean(entries)}
            className={`text-sm mt-2 px-4 py-2 ${
              //render if entries is true//
              Boolean(entries)
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#00000005] hover:border-teal-500"
            } text-xs md:text-sm relative mt-2 px-4 py-2 bg-[#00000005] border-[0000001A] border-1 shadow-lg hover:border-teal-500 text-black  h-12 rounded md:w-36 flex items-center justify-center gap-2 disabled:opacity-50`}
          >
            <Image src={plusimg} alt="Add" />
            Submit
          </button>
        </div>

        {/* Right: Instruction */}
        <div className="hidden w-full md:w-1/2 mb-2 md:flex flex-col justify-start">
          <label
            htmlFor="instruction"
            className="text-xs md:text-sm mb-2 font-medium"
          >
            Special Entry Instructions
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
      {entries && (
        <div className="w-full md:w-3/4 mt-6">
          <ul className="space-y-2">
            <li className="border p-2 rounded flex justify-between items-start gap-4 text-sm">
              <div>
                <strong>
                  {entries.buildingType} → {entries.accessType}
                </strong>
                <div className="text-gray-600 mt-1">
                  {entries.instruction || "No instructions"}
                </div>
              </div>

              <button
                onClick={() =>
                  window.confirm(
                    "Are you sure you want to delete this entry?"
                  ) && handleDelete()
                }
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
              
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accessibility;
