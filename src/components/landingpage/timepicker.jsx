"use client";

import React, { useMemo, useCallback } from "react";
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
  // Memoize time slots to avoid regenerating on every render
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Memoize filtered time slots for "To" dropdown
  const filteredToTimeSlots = useMemo(() => {
    return fromTime ? timeSlots.filter((time) => time > fromTime) : timeSlots;
  }, [timeSlots, fromTime]);

  // Memoize the from time change handler
  const handleFromTimeChange = useCallback((value) => {
    onFromTimeChange(value);
    if (toTime && toTime <= value) {
      onToTimeChange("");
    }
  }, [onFromTimeChange, onToTimeChange, toTime]);

  return (
    <div className="w-full">
      <div className="flex rounded-lg border border-slate-200 overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500">
        
        {/* From Time Selector */}
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none z-10">
            <Image 
              src={TimeIcon} 
              alt="Time icon" 
              width={20} 
              height={20} 
              className="h-5 w-5 sm:h-[18px] sm:w-[18px] text-slate-500 opacity-70"
            />
          </span>
          <select
            value={fromTime}
            onChange={(e) => handleFromTimeChange(e.target.value)}
            className="w-full h-16 pl-11 sm:pl-12 pr-3 sm:pr-4 border-r border-slate-200 text-base sm:text-sm text-slate-700 focus:outline-none bg-white appearance-none cursor-pointer touch-manipulation hover:bg-slate-50 transition-colors duration-150"
          >
            <option value="" disabled className="text-slate-400">From</option>
            {timeSlots.map((time) => (
              <option key={`from-${time}`} value={time} className="text-slate-700">{time}</option>
            ))}
          </select>
        </div>

        {/* To Time Selector */}
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none z-10">
            <Image 
              src={TimeIcon} 
              alt="Time icon" 
              width={20} 
              height={20} 
              className="h-5 w-5 sm:h-[18px] sm:w-[18px] text-slate-500 opacity-70"
            />
          </span>
          <select
            value={toTime}
            onChange={(e) => onToTimeChange(e.target.value)}
            disabled={!fromTime}
            className={`w-full h-16 pl-11 sm:pl-12 pr-3 sm:pr-4 text-base sm:text-sm text-slate-700 focus:outline-none bg-white appearance-none touch-manipulation transition-all duration-150 ${
              !fromTime 
                ? "opacity-50 cursor-not-allowed bg-slate-50" 
                : "cursor-pointer hover:bg-slate-50"
            }`}
          >
            <option value="" disabled className="text-slate-400">To</option>
            {filteredToTimeSlots.map((time) => (
              <option key={`to-${time}`} value={time} className="text-slate-700">{time}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}