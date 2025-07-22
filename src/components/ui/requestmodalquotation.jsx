"use client";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import vehicle from "../../assets/images/vehicledriver.png";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const RequestModalQuotation = ({
  isOpen,
  setIsOpen,
  redirectto,
  truck_type = "Ford rf-50 truck",
  distance = "30km",
  jobs = "350",
  price = "350 CAD",
  quotes = [],
  onChevronClickBack = () => {},
  onQuoteChevronClick = () => {},
  setPreviousModalOpen = () => {},
  isLoading = false,
  // New props for AcceptQuotation modal
  setIsOpenAcceptQuotation = () => {},
  onConfirmMove = () => {}, // Optional callback when confirm is clicked
}) => {
  const router = useRouter();

  const handleProceed = async () => {
    if (isLoading) return;
    
    try {
      // Close this modal and open AcceptQuotation modal
      setIsOpen(false);
      setIsOpenAcceptQuotation(true);
      
      // Call optional callback
      if (typeof onConfirmMove === "function") {
        onConfirmMove();
      }
      
      // Note: We don't navigate here anymore since AcceptQuotation will handle it
    } catch (error) {
      console.error("Modal transition error:", error);
      // Could add error handling/toast notification here
    }
  };

  const handleBack = () => {
    setIsOpen(false);
    setPreviousModalOpen(true);
    if (typeof onChevronClickBack === "function") {
      onChevronClickBack();
    }
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      aria-labelledby="quotation-modal-title"
    >
      <DialogContent className="w-full max-w-sm sm:max-w-sm md:max-w-md space-y-4">
        {/* Visually hidden DialogTitle for accessibility */}
        <VisuallyHidden asChild>
          <DialogTitle>Moving Quotation Summary for {truck_type}</DialogTitle>
        </VisuallyHidden>

        {/* Back Icon */}
        <ChevronLeftIcon
          onClick={handleBack}
          className="cursor-pointer text-teal-600 hover:text-teal-800 bg-teal-100/20 hover:bg-teal-100/40 h-8 w-8 border border-teal-200 rounded-md transition-colors duration-200"
          aria-label="Go back to previous screen"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, handleBack)}
        />

        {/* Header with Image */}
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <Image
            src={vehicle}
            alt={`${truck_type} truck with driver illustration`}
            width={320}
            height={103}
            className="rounded-md border shadow-sm"
            priority
          />
        </DialogHeader>

        {/* Main Quote Info */}
        <div className="grid grid-cols-2 gap-4 text-sm px-2">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Truck Type:</p>
              <p className="font-semibold text-gray-900">{truck_type}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Distance:</p>
              <p className="font-semibold text-gray-900">{distance}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">No of Moves:</p>
              <p className="font-semibold text-gray-900">{jobs}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Quotation:</p>
              <p className="font-bold text-teal-600 text-base">{price}</p>
            </div>
          </div>
        </div>

        {/* List of Quotes */}
        {quotes.length > 0 && (
          <div className="flex flex-col gap-2 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Available Quotes ({quotes.length})
            </h3>
            {quotes.map((quote, index) => (
              <div
                key={`quote-${index}-${quote.id || quote.name}`}
                onClick={() => onQuoteChevronClick(quote)}
                onKeyDown={(e) => handleKeyDown(e, () => onQuoteChevronClick(quote))}
                role="button"
                tabIndex={0}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-teal-300 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                aria-label={`Select quote from ${quote.name}${quote.price ? ` for ${quote.price}` : ''}`}
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{quote.name}</p>
                  {quote.price && (
                    <p className="text-xs text-gray-500 mt-1">{quote.price}</p>
                  )}
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        )}

        {/* Proceed and Dismiss Buttons */}
        <DialogFooter>
          <div className="w-full flex items-center justify-center gap-3">
            <button
              onClick={handleProceed}
              disabled={isLoading}
              className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Confirm and proceed to acceptance modal"
            >
              {isLoading ? "Processing..." : "Confirm Move"}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Cancel and dismiss this quotation"
            >
              Cancel
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModalQuotation;