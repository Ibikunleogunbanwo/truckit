"use client";

import React from "react";
import Image from "next/image";
import logowhite from "../../../assets/images/logo-white.png";
import Logo from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ContinueWithLogin from "@/components/landingpage/button";
import VerificationEmail from "@/components/verificationemail-modal";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid Email Required"),
    phone: z.string().refine(
      (val) => {
        const phone = parsePhoneNumberFromString(val, "CA");
        return phone?.isValid();
      },
      { message: "Invalid phone number" }
    ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password Must include a lowercase letter")
      .regex(/[A-Z]/, "Password Must include an uppercase letter")
      .regex(/[0-9]/, "Password Must include a number")
      .regex(/[^a-zA-Z0-9]/, "Password Must include a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });



const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      const newError = {};
      result.error.issues.forEach((issue) => {
        newError[issue.path[0]] = issue.message;
      });
      setErrors(newError);
    } else {
      console.log("Valid Data:", result.data);
      setErrors({});
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col max-h-screen bg-white justify-center mt-20 px-4">
      <div id="innerdiv1" className="flex flex-col items-center mb-12 mt-28">
        <Logo src={logowhite} height={50} width={50} className="bg-teal-500" />
        <h1 className="text-lg text-teal-500 font-bold mt-2">Truckit</h1>
      </div>

      <div
        id="innerdiv2"
        className="w-full sm:max-w-[320px] md:max-w-[400px] lg:max-w-[600px] mx-auto border-1 border-gray-200 rounded-md px-4 md:px-6 py-6"
      >
        <h1 className="text-sm font-bold">
          Create a <span className="text-teal-500">TruckIt</span> account
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 mt-6">
          <div>
            <label htmlFor="email" className="text-xs font-bold mb-1 block">
              Email address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="sample@gmail.com"
              autoComplete="email"
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.email && (
              <span className="error text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="text-xs font-bold mb-1 block">
              Phone number:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              autoComplete="tel"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="h-4 mt-1">
            {errors.phone && (
              <span className="error text-red-500 text-xs">{errors.phone}</span>
            )}
            </div>
          </div>

          <div>
            <label htmlFor="firstName" className="text-xs font-bold mb-1 block">
              First name:
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              autoComplete="given-name"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.firstName && (
              <span className="error text-red-500 text-xs">
                {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="text-xs font-bold mb-1 block">
              Last name:
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              autoComplete="family-name"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.lastName && (
              <span className="error text-red-500 text-xs">
                {errors.lastName}
              </span>
            )}
          </div>

          <div className="relative col-span-1">
            <label htmlFor="password" className="text-xs font-bold mb-1 block">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type={showPassword1 ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="new-password"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute inset-y-0 right-3 top-4 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword1 ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <span className="error text-red-500 text-xs">
                {errors.password}
              </span>
            )}
          </div>

          <div className="relative col-span-1">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-bold mb-1 block"
            >
              Confirm password:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              autoComplete="new-password"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 top-4 flex items-center text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <span className="error text-red-500 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="text-red-500 place-items-center text-sm mt-2">
                Passwords do not match
              </p>
            )}
        </form>

        <div className="w-full my-6 ">
          <ContinueWithLogin
            buttonText="Create account"
            linkText="Sign in"
            widthClass="w-36"
            linkHref="/login"
            onClick={handleSubmit}
          />
          <div>
            <VerificationEmail isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
