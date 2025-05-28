"use client";

import Logo from "@/components/logo";
import React from "react";
import Image from "next/image";
import logowhite from "../../assets/images/logo-white.png";
import ContinueWithLogin from "@/components/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className=" ">
        <div className="flex flex-col items-center mb-8">
          <Logo
            src={logowhite}
            height={50}
            width={50}
            className="bg-teal-500"
          />
          <h1 className="text-lg text-teal-500 font-bold mt-2 mb-12">
            Truckit
          </h1>
        </div>

        <div className="md:w-[400px] w-full md:border-gray-200 rounded-md md:px-6 md:py-8">
          <p className="text-sm font-bold text-center md:text-left md:ml-5 mb-6">
            Sign in to your account
          </p>

          <form className="flex flex-col items-center p-2 gap-4 md:w-full">
            <div className="w-[300px] md:w-[320px] flex flex-col">
              <label htmlFor="email" className="text-xs font-bold mb-1">
                Email address:
              </label>
              <input
                id="email"
                className="h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="sample@gmail.com"
                autoComplete="email"
                type="email"
              />
            </div>

            <div className="relative w-[300px] md:w-[320px] flex flex-col">
              <label htmlFor="password" className="text-xs font-bold mb-1">
                Password:
              </label>
              <input
                id="password"
                className="h-12 border border-gray-300 rounded px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
              />

              <button
                type="button"
                onClick={() => togglepassword()}
                className="absolute inset-y-0 right-3 top-4 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </form>

          <div className="mt-6 ml-6 md:ml-4  flex justify-center   md:justify-self-start md:justify-normal">
            <ContinueWithLogin
              buttonText="Sign in"
              linkText="Sign up"
              linkHref="/login"
              widthClass="w-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
