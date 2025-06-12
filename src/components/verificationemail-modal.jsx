"use client";
import React from "react";
import { Check } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useRouter } from "next/navigation";



const VerificationEmail = ({isOpen, setIsOpen} ) => {
    
  const router = useRouter();

  return (
 
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="w-[90%] max-w-xs sm:max-w-md">
      <DialogHeader className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-500/10">
        <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-transparent">
          <FontAwesomeIcon icon={faPaperPlane} className=" h-24 w-24 text-teal-500" />
        </span>
      </DialogHeader>
      <DialogTitle className="text-center">
      Verification email sent
      </DialogTitle>
      <DialogDescription className="text-center">
        <>
          <span className="block mt-2">
          To complete your account creation, please click the verification link we sent to your email address.
          </span>
          
        </>
      </DialogDescription>

      <DialogFooter className="!flex w-full md:w-3/4 justify-center">
        <div className="grid grid-rows-2 gap-4 w-full md:max-w-3/4 ">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("login");
            }}
            className="rounded bg-teal-500 px-6 py-4 text-white text-sm"
          >
            Okay
          </button>
         
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  )
}

export default VerificationEmail
