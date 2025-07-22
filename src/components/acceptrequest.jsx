"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../components/ui/dialog";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const AcceptQuotation = ({
  isOpenRequestQuotationModal,
  setIsOpenRequestQuotationModal,
  isOpenAcceptQuotation,
  setIsOpenAcceptQuotation,
  redirectto,
  truck_type = "Ford rf-50 truck",
  distance = "30km",
  jobs = "350",
  price = "350 CAD",
  moverName = "Louis Saha",
  fromAddress = "123 Maple Street, Toronto",
  toAddress = "456 Wood Street, Toronto",
  onChevronClickBack = () => {},
  setPreviousModalOpen = () => {},
  isLoading = false,
  onError = () => {},
}) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleProceed = async () => {
    if (isLoading) return;

    try {
      setError("");
      
      // Close modals first
      setIsOpenRequestQuotationModal(false);
      setIsOpenAcceptQuotation(false);

      // Add a small delay to ensure state updates complete
      await new Promise(resolve => setTimeout(resolve, 100));

      if (redirectto) {
        router.push(redirectto);
      }
    } catch (err) {
      console.error("Navigation error:", err);
      setError("Unable to process your request. Please try again.");
      onError(err);
    }
  };

  const handleBack = () => {
    setError("");
    setIsOpenAcceptQuotation(false);
    
    // Use setTimeout to ensure the modal closes before opening the previous one
    setTimeout(() => {
      setPreviousModalOpen(true);
      onChevronClickBack?.();
    }, 100);
  };

  const handleModalClose = (open) => {
    if (!open && !isLoading) {
      setIsOpenAcceptQuotation(false);
      setError("");
    }
  };

  return (
    <Dialog
      open={isOpenAcceptQuotation}
      onOpenChange={handleModalClose}
    >
      <DialogContent
        className="w-full max-w-sm md:max-w-md space-y-4"
      >
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              Confirm your moving quotation
            </DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col items-center justify-center gap-2">
            <AlertCircle className="bg-yellow-500 size-24 text-white rounded-full p-4 shadow-lg" />
          </div>
        </DialogHeader>

        {error && (
          <div className="px-2 py-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="px-2 text-sm text-gray-800">
          <p className="text-black p-4">
            You're about to confirm <strong>{moverName}</strong> for your move
            from: <span className="text-sm text-teal-500 font-bold "><em>{fromAddress}</em></span> <span className="block text-sm text-teal-500 font-bold">to: <em>{toAddress}</em>.</span>
          </p>

          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quote Details:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span role="img" aria-label="Truck">🚚</span>
                <span className="text-xs text-gray-500">Truck Type:</span>
                <span className="font-medium">{truck_type}</span>
              </li>
              <li className="flex items-center gap-2">
                <span role="img" aria-label="Distance">📍</span>
                <span className="text-xs text-gray-500">Distance:</span>
                <span className="font-medium">{distance}</span>
              </li>
              <li className="flex items-center gap-2">
                <span role="img" aria-label="Jobs">🧱</span>
                <span className="text-xs text-gray-500">Jobs Completed:</span>
                <span className="font-medium">{jobs}</span>
              </li>
              <li className="flex items-center gap-2">
                <span role="img" aria-label="Price">💰</span>
                <span className="text-xs text-gray-500">Price:</span>
                <span className="font-bold text-teal-600">{price}</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="w-full sm:w-auto border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Go back to previous step"
            >
              Cancel
            </button>

            <button
              onClick={handleProceed}
              disabled={isLoading}
              className="w-full sm:w-auto bg-teal-500 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[140px]"
              aria-label="Confirm and make payment"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Yes, Confirm and Pay"
              )}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptQuotation;