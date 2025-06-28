'use client';

import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import CalendarIcon from "../../assets/images/img-calender.png";
import { format } from "date-fns";

export default function MyDatePicker({ date, onDateChange }) {
  // Memoize placeholder to avoid recreating on every render
  const placeholder = useMemo(() => format(new Date(), "EEE, dd MMM yyyy"), []);
  
  // Memoize today's date to avoid recreating on every render
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none z-10">
        <Image
          src={CalendarIcon}
          alt="Calendar icon"
          width={20}
          height={20}
          className="h-5 w-5 sm:h-[18px] sm:w-[18px] text-slate-500 opacity-70"
        />
      </span>

      <DatePicker
        selected={date} 
        onChange={onDateChange}
        placeholderText={placeholder}
        minDate={today}
        className="pl-11 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-3 h-16 w-full border border-slate-200 rounded-lg text-base sm:text-sm text-slate-700 placeholder:text-slate-400 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 touch-manipulation"
        wrapperClassName="w-full"
        popperClassName="z-50"
        calendarClassName="shadow-lg border-slate-200 text-base sm:text-sm"
        showPopperArrow={false}
        fixedHeight
      />
    </div>
  );
}