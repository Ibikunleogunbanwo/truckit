"use client";

import React from "react";
import Image from "next/image";
import logowhite from "../../../assets/images/logo-white.png";
import Logo from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ContinueWithLogin from "@/components/landingpage/button";

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              placeholder="sample@gmail.com"
              autoComplete="email"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-xs font-bold mb-1 block">
              Phone number:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="text-xs font-bold mb-1 block">
              First name:
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="text-xs font-bold mb-1 block">
              Last name:
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className="w-full h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="relative col-span-1">
            <label htmlFor="password" className="text-xs font-bold mb-1 block">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type={showPassword1 ? "text" : "password"}
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
          </div>
        </form>

        <div className="w-full my-6 ">
          <ContinueWithLogin
            buttonText="Create account"
            linkText="Sign in"
            linkHref="/login"
            widthClass="w-36"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
