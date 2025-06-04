'use client';

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import CalendarIcon from "../../assets/images/img-calender.png";

export default function MyDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const today = new Date();
  const formatted = today.toLocaleDateString();


  return (
    <div className="relative w-full h-16">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Image
          src={CalendarIcon}
          alt="date icon"
          width={20}
          height={20}
          className="h-5 w-5 text-black/80"
        />
      </span>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText={formatted}
        className="pl-10 pr-4 h-16 w-full border border-gray-300 rounded text-sm text-black/80 placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-teal-500"
        wrapperClassName="w-full"
      />
    </div>
  );
}