"use client";
import React from "react";
import { ChevronRightIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

import { useRouter } from "next/navigation";

const RequestModal = ({ isOpen, setIsOpen, redirectto }) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent redirectTo={redirectto} className="w-full max-w-xs sm:max-w-md space-y-4">
        {/* Header Section */}
        <DialogHeader className="w-full text-start">
          <p className="text-sm font-bold">Price quotations:</p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-black ">From:</span> 123 Maple
            Street, Toronto
            <br />
            <span className="font-semibold text-black">To:</span> 456 Wood
            Street, Toronto
          </p>
          <hr className="border-gray-300" />
        </DialogHeader>

        {/* Title Section */}
        <DialogTitle className=" text-black text-sm font-normal">
          <p className="text-sm text-black">
            The quotes below are for a{" "}
            <span className="text-gray-500">driver and 2 movers</span> combined
            package
          </p>
        </DialogTitle>

        {/* Description / Quote Details */}
        <div className="text-left text-sm">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className=" text-gray-900 font-bold">
                Louis Saha <span className="text-gray-500">- 30 CAD</span>
              </div>
              <div className="text-sm text-gray-500">350 moves, 30km away</div>
            </div>
            <ChevronRightIcon className="text-gray-400" />
            
          </div>
          <hr className="border-gray-300 mt-2" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
