import React from 'react'
import Logo from "@/components/logo";
import logoimg from "../assets/images/image.png"
import SocialIcon from "../components/socialicon";
import Link from "next/link";


const Footer = () => {
  return (
    <footer id="Footer"
        className="flex flex-col-reverse lg:flex-row w-fulllg:my-8 bg-teal-500"
      >
        <div className="flex flex-col items-start p-4 lg:p-8 w-full lg:w-1/3 h-auto lg:h-[368px]">
          <div className="flex items-center justify-center gap-2">
            <Logo src={logoimg} height={50} width={50} className="bg-black" />
            <h1 className="text-lg text-black font-bold">Truckit</h1>
          </div>

          <p className="text-justify text-xs mt-8 font-semibold">
            Making Every Move Seamless and Stress-Free. Whether you're
            relocating across town or across the country, we connect you with
            trusted movers and drivers to ensure a smooth and hassle-free
            experience.
          </p>

          <div className="mt-12">
            <SocialIcon />
            <p className="text-xs mt-8 lg:mt-12 mb-8">
              © 2025 Truckit. All rights reserved.
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 lg:h-[368px] p-4 lg:p-8">
          <h3 className="text-lg font-bold mb-4">Quick links</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3">
            <Link
              href="/about"
              className="text-xs my-4 lg:my-8 hover:underline"
            >
              About Truckit
            </Link>
            <Link href="/FAQ" className="text-xs my-4 lg:my-8 hover:underline">
              Become A driver
            </Link>
            <Link
              href="/privacy"
              className="text-xs my-4 lg:my-8 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-xs my-4 lg:my-8 hover:underline">
              FAQ
            </Link>
            <Link
              href="/mover"
              className="text-xs my-4 lg:my-8 hover:underline"
            >
              Become a Mover
            </Link>
            <Link
              href="/terms"
              className="text-xs my-4 lg:my-8 hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer
