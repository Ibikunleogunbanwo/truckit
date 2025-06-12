"use client";

import React from "react";
import Image from "next/image";
import TimeIcon from "../../assets/images/img-time.png";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour < 21; hour++) {
    for (let min = 0; min < 60; min += 30) {
      slots.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
  }
  return slots;
};

export default function TimeRangeSelector({
  fromTime,
  toTime,
  onFromTimeChange,
  onToTimeChange
}) {
  const timeSlots = generateTimeSlots();

  const handleFromTimeChange = (value) => {
    onFromTimeChange(value);
    if (toTime && toTime <= value) {
      onToTimeChange("");
    }
  };

  return (
    <div className="w-full">
      <div className="flex rounded border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
        
     
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image src={TimeIcon} alt="Time icon" width={20} height={20} />
          </span>
          <select
            value={fromTime}
            onChange={(e) => handleFromTimeChange(e.target.value)}
            className="w-full h-16 pl-10 pr-4 border-r border-gray-300 text-sm text-black/80 focus:outline-none bg-white"
          >
            <option value="" disabled>From</option>
            {timeSlots.map((time) => (
              <option key={`from-${time}`} value={time}>{time}</option>
            ))}
          </select>
        </div>

      
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image src={TimeIcon} alt="Time icon" width={20} height={20} />
          </span>
          <select
            value={toTime}
            onChange={(e) => onToTimeChange(e.target.value)}
            disabled={!fromTime}
            className={`w-full h-16 pl-10 pr-4 text-sm text-black/80 focus:outline-none bg-white ${
              !fromTime ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <option value="" disabled>To</option>
            {timeSlots
              .filter((time) => !fromTime || time > fromTime)
              .map((time) => (
                <option key={`to-${time}`} value={time}>{time}</option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}