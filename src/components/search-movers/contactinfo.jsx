"use client";

import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const Contactinfo = ({ onContactChange }) => {
  const [ContactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const debouncedOnChange = useMemo(() => {
    return debounce((info) => {
      if (onContactChange) onContactChange(info);
    }, 1000); // 500ms delay
  }, [onContactChange]);

  useEffect(() => {
    return () => debouncedOnChange.cancel();
  }, [debouncedOnChange]);



  const handleChange = (field) => (e) => {
    const updatedInfo = {
      ...ContactInfo,
      [field]: e.target.value,
    };
    setContactInfo(updatedInfo);
    if (onContactChange) debouncedOnChange(updatedInfo);
  };

  return (
    <div>
      <p className="text-teal-500 font-bold mt-10 mb-4">
        4. Contact information
      </p>
      <div className="grid lg:grid-cols-4 my-4 gap-2 ">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-sm mb-1 font-semibold">
            First Name:
          </label>
          <input
            type="text"
            value={ContactInfo.firstName}
            onChange={handleChange('firstName')}
            className="text-sm p-4 border border-gray-300 rounded-md"
            placeholder="john"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-sm mb-1 font-semibold">
            Last Name:
          </label>
          <input
            type="text"
            value={ContactInfo.lastName}
            onChange={handleChange('lastName')}
            className="text-sm p-4 border border-gray-300 rounded-md"
            placeholder="Wick"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone_number" className="text-sm mb-1 font-semibold">
            Phone number:
          </label>
          <input
            type="tel"
            value={ContactInfo.phoneNumber}
            onChange={handleChange('phoneNumber')}
            className="text-sm p-4 border border-gray-300 rounded-md "
            placeholder=""
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm mb-1 font-semibold">
            Email address:
          </label>
          <input
            type="text"
            value={ContactInfo.emailAddress}
            onChange={handleChange('emailAddress')}
            className="text-sm p-4 border border-gray-300 rounded-md"
            placeholder=""
          />
        </div>
      </div>
      <div></div>

      <div></div>
    </div>
  );
};

export default Contactinfo;
