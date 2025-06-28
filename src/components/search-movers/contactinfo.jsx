"use client";

import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";


const schema = z.object({
  firstName: z.string().min(1, "First Name is Required"),
  lastName: z.string().min(1, "Last Name is Required"),
  emailAddress: z.string().email("Valid Email Required"),
  phoneNumber: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val, "CA");
      return phone?.isValid();
    },
    { message: "Invalid phone number" }
  ),
});


const ContactInfo = ({ onContactChange }) => {
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    emailAddress: false,
  });
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });



  // Validate all touched fields
  const validate = useCallback(() => {
    const dataToValidate = Object.fromEntries(
      Object.entries(contactInfo).filter(([key]) => touchedFields[key])
    );

    const result = schema.safeParse({
      ...contactInfo,
      ...dataToValidate,
    });

    if (result.success) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(dataToValidate).forEach((key) => delete newErrors[key]);
        return newErrors;
      });
      onContactChange(result.data);
    } else {
      const newErrors = {};
      result.error.issues.forEach((issue) => {
        if (touchedFields[issue.path[0]]) {
          newErrors[issue.path[0]] = issue.message;
        }
      });
      setErrors((prev) => ({ ...prev, ...newErrors }));
      onContactChange(null);
    }
  }, [contactInfo, touchedFields, onContactChange]);

  // Debounced version of validate
  const debouncedValidate = useCallback(debounce(validate, 300), [validate]);

  // Validate when contactInfo or touchedFields change
  useEffect(() => {
    if (Object.values(touchedFields).some(Boolean)) {
      debouncedValidate();
    }
    return () => debouncedValidate.cancel();
  }, [contactInfo, touchedFields, debouncedValidate]);

  

  const handleBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleChange = (fieldName, value) => {
    setContactInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div>
    <p className="text-teal-500 w-full font-bold mb-4">
      4. Contact information
    </p>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm mb-1 font-semibold">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          value={contactInfo.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          onBlur={() => handleBlur("firstName")}
          className="text-sm p-4 border border-gray-300 rounded-md"
          placeholder="John"
        />
        {errors.firstName && (
          <span className="text-red-500 text-xs mt-1">{errors.firstName}</span>
        )}
      </div>
  
      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm mb-1 font-semibold">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          value={contactInfo.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          onBlur={() => handleBlur("lastName")}
          className="text-sm p-4 border border-gray-300 rounded-md"
          placeholder="Wick"
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs mt-1">{errors.lastName}</span>
        )}
      </div>
  
      {/* Phone Number */}
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm mb-1 font-semibold">
          Phone Number:
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={contactInfo.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          onBlur={() => handleBlur("phoneNumber")}
          className="text-sm p-4 border border-gray-300 rounded-md"
          placeholder="(123) 456-7890"
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-xs mt-1">{errors.phoneNumber}</span>
        )}
      </div>
  
      {/* Email Address */}
      <div className="flex flex-col">
        <label htmlFor="emailAddress" className="text-sm mb-1 font-semibold">
          Email Address:
        </label>
        <input
          id="emailAddress"
          type="text"
          value={contactInfo.emailAddress}
          onChange={(e) => handleChange("emailAddress", e.target.value)}
          onBlur={() => handleBlur("emailAddress")}
          className="text-sm p-4 border border-gray-300 rounded-md"
          placeholder="john@example.com"
        />
        {errors.emailAddress && (
          <span className="text-red-500 text-xs mt-1">
            {errors.emailAddress}
          </span>
        )}
      </div>
    </div>
  </div>
  );
};

export default ContactInfo;