"use client";
import React from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import Link from "next/link";
import { useRouter } from "next/navigation";

const SubmissionModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-xs sm:max-w-md">
        <DialogHeader className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-500/10">
          <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-transparent">
            <Check className="absolute left-[10px] top-[18px] h-5 w-5 text-teal-500" />
            <Check className="absolute left-[20px] top-[18px] h-5 w-5 text-teal-500" />
          </span>
        </DialogHeader>
        <DialogTitle className="text-center">
          Your request has been submitted!
        </DialogTitle>
        <DialogDescription className="text-center">
          <>
            <span className="block mt-2">
              We’re matching you with a mover and will send the instructions to
              your email.
            </span>
            <span className="block mt-6">
              Would you like to create an account? <span className="block">This
              lets you track past and upcoming moves easily.</span>
            </span>
          </>
        </DialogDescription>

        <DialogFooter className="!flex w-full md:w-3/4 justify-center">
          <div className="grid grid-rows-2 gap-4 w-full md:max-w-3/4 ">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/register");
              }}
              className="rounded bg-teal-500 px-6 py-4 text-white text-sm"
            >
              Yes, Create an account
            </button>
            <Link href="/">
              <p className="text-gray-600 underline md:text-sm text-center py-2 cursor-pointer">
                I’m not interested
              </p>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
