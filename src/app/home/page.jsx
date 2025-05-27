import React from "react";
import Image from "next/image";
import heroimage from "../../assets/images/hero-image.png";
import Link from "next/link";
import ContinueWithLogin from "@/components/button";
import serviceleft from "../../assets/images/services-left.png";
import serviceright from "../../assets/images/services-right.png";
import Navbar from "../../components/navbar";
import MyDatePicker from "@/components/datepicker";
import truck from "../../assets/images/truck.png"

const Home = () => {
  return (
    <div id="main" className="min-h-screen bg-white w-full">
      <Navbar />
      <div id="Hero-Section"
        className="flex flex-col-reverse lg:flex-row p-4 my-10"
      >
        <div className="flex-1  ">
          <div className="grid p-4 gap-4 w-full">
            <h1 className=" w-full lg:w-72 lg:h-16 text-teal-500 font-semibold md:font-extrabold leading-8 text-xl md:text-2xl">
              Move anywhere, anytime with TruckIt.
            </h1>
            <p className="text-black/80 leading-8 font-medium lg:mr-12 lg:h-18 text-sm lg:mb-10 md:text-lg lg:pr-2 text-justify">
              Effortless relocations at your fingertips. Whether you're moving
              across town or across the country, TruckIt connects you with
              reliable movers to get you there stress-free.
            </p>
            <div className=" grid md:grid-cols-2 gap-4 my-2 w-full">
              <MyDatePicker />
              <MyDatePicker />
              <MyDatePicker />
              <MyDatePicker />
            </div>

            <ContinueWithLogin
              buttonText="Continue"
              linkText="Login to see user activity"
              linkHref="/login"
            />
          </div>
        </div>

        <div className="flex-1">
          <Image
            src={heroimage}
            alt="Hero Image"
            className="w-full h-full object-cover p-4 rounded border-white"
          />
        </div>
      </div>

      <div id="services" className="grid px-8 my-8 gap-y-2 lg:gap-y-4 ">
        <h1 className="text-teal-500 font-semibold md:font-extrabold text-xl">
          Our Services.
        </h1>
        <span className="text-black/80 leading-6 font-medium text-sm md:text-base text-justify mb-4 lg:w-1/2">
          Reliable Rides,Seamless Moves. Whether you need a trusted driver or a
          hassle-free moving service, we’ve got you covered!
        </span>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full mb-6">
          <div className="relative flex-1">
            <Image
              src={serviceleft}
              alt="Hero Image"
              className="w-full h-72 object-cover rounded border-white"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded">
              <div className=" relative p-4 md:p-8 w-full h-full flex flex-col justify-end ">
                <h2 className="text-white font-bold leading-4 md:text-3xl my-4">
                  Hire a truck driver
                </h2>
                <p className="text-white font-normal text-sm text-justify mb-4">
                  Need to transport goods, furniture, or equipment? Instantly
                  connect with reliable truck drivers for safe and efficient
                  delivery—whether it’s across town or long-distance.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <Image
              src={serviceright}
              alt="Hero Image"
              className="w-full h-72 object-cover rounded border-white"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded">
              <div className="relative p-4 md:p-8 w-full h-full flex flex-col justify-end">
                <h2 className="text-white font-bold leading-2 md:text-3xl my-4">
                  Find professional movers
                </h2>
                <p className="text-white font-normal text-sm text-justify mb-4">
                  Moving homes or offices? Get skilled movers to help with
                  packing, loading, and transportation, ensuring a smooth and
                  stress-free moving experience
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-black/80 font-bold text-lg">
          Join Our Network Today!
        </h1>
        <span className="text-black/80 leading-6 font-medium text-sm md:text-base text-justify mb-4 lg:w-1/2">
          Looking to offer your services? Whether you're a truck driver or a
          mover, sign up now to connect with customers and grow your business.
        </span>
        <ContinueWithLogin buttonText="Get Started" linkText="" linkHref="" />
      </div>

    <div id="activity" className="flex flex-col lg:flex-row text-black justify-between w-full h-full p-4 ">
    <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-[28rem]">
    <div className="absolute top-15 sm:top-16 lg:top-20 bg-teal-50 w-full h-2/3 lg:h-3/4 bottom-5 z-10 rounded-md "></div>
    <div className="absolute bg-teal-500 w-10/12 max-w-5xl h-1/3 lg:h-2/3 left-1/2 transform -translate-x-1/2 z-0 bottom-2 rounded-md"></div>
     <Image
            src={truck}
            alt="Hero Image"
            fill
            className=" absolute w-full h-full object-cover p-4 bottom-3 rounded border-white z-10"
          />
    </div>

    <div className="relative w-full lg:w-1/2  flex flex-col justify-end mb-8`">
    <div className="h-1/2"></div>
    <div id="login" className="p-4"> 
        <h1 className=" text-lg md:text-xl font-bold lg:font-extrabold text-teal-500 pb-4 "
        >Login to see your recent activity</h1>
        <p className="text-sm text-black/80 leading-6 mb-4"
        >Log in to access your account and stay updated on your recent activity, transactions, and progress, all in one place!</p>

        <ContinueWithLogin
              buttonText="Log in to your account"
              linkText="Create account"
              linkHref="/login"
              widthClass = "w-40"
            />
    </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
