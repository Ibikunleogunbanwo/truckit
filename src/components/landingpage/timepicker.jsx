"use client";

import React, { useState } from "react";
import Image from "next/image";
import TimeIcon from "../../assets/images/img-time.png";


const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour < 21; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMin = min.toString().padStart(2, "0");
      slots.push(`${formattedHour}:${formattedMin}`);
    }
  }
  return slots;
};

export default function TimeRangeSelector() {
  const timeSlots = generateTimeSlots();
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleFromTimeChange = (value) => {
    setFromTime(value);
    if (toTime && toTime <= value) {
      setToTime("");
    }
  };



  return (
    <div className="w-full">
      <div className="flex rounded border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image
              src={TimeIcon}
              alt="calendar icon"
              width={20}
              height={20}
              className="h-5 w-5 text-black/80"
            />
          </span>
          <select
            value={fromTime}
            onChange={(e) => handleFromTimeChange(e.target.value)}
            className="w-full h-16 pl-10 pr-4 border-r-0 border-gray-300 text-sm text-black/80 focus:outline-none bg-white"
          >
            <option value=" " disabled>
              12:00
            </option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* TO SELECT */}
        <div className="relative w-1/2">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image
              src={TimeIcon}
              alt="calendar icon"
              width={20}
              height={20}
              className="h-5 w-5 text-black/80"
            />
          </span>
        <select
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="w-full h-16 pl-10 pr-4 border-r-0 border-gray-300 text-sm text-black/80 focus:outline-none bg-white"
        >
          <option value="" disabled>
            12:00
          </option>
          {timeSlots
            .filter((time) => !fromTime || time > fromTime)
            .map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
        </select>
        </div>
      </div>
    </div>
  );
}
