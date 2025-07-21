"use client";
import React from "react";
import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { useRouter } from "next/navigation";

const RequestModal = ({
  isOpen,
  setIsOpen,
  redirectto,
  from = "123 Maple Street, Toronto",
  to = "456 Wood Street, Toronto",
  quotes = [],
  onChevronClick = () => {},
  isLoading = false,
  packageDetails = "1 driver and 2 movers",
}) => {
  const router = useRouter();

  const handleProceed = async () => {
    if (isLoading) return;
    
    try {
      setIsOpen(false);
      if (redirectto) {
        await router.push(redirectto);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      // Could add error handling/toast notification here
    }
  };

  const handleQuoteSelect = (quote) => {
    setIsOpen(false);
    if (typeof onChevronClick === "function") {
      onChevronClick(quote);
    }
  };

  const handleChevronKeyDown = (e, quote) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleQuoteSelect(quote);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={setIsOpen}
      aria-describedby="quote-description"
    >
      <DialogContent className="w-full max-w-2xl lg:max-w-4xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Main Title for Accessibility */}
        <DialogTitle className="sr-only">
          Moving Price Quotations from {from} to {to}
        </DialogTitle>

        {/* Header */}
        <DialogHeader className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Price Quotations</h2>
          
          {/* Route Information */}
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPinIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-700">From:</span>
                <span className="text-gray-600 ml-1">{from}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPinIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-700">To:</span>
                <span className="text-gray-600 ml-1">{to}</span>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-200" />
        </DialogHeader>

        {/* Package Info */}
        <div 
          id="quote-description"
          className="bg-teal-50 border border-teal-200 rounded-lg p-4"
        >
          <p className="text-teal-800 text-sm">
            The quotes below are for{" "}
            <span className="font-semibold">{packageDetails}</span> combined package
          </p>
        </div>

        {/* Quotes List */}
        {quotes.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              Available Quotes ({quotes.length})
            </h3>
            <div className="space-y-2">
              {quotes.map((quote, index) => (
                <div 
                  key={`quote-${index}-${quote.id || quote.name}`}
                  className="flex justify-between items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{quote.name}</span>
                      <span className="font-bold text-teal-600">{quote.price}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {quote.jobs && `${quote.jobs} moves`}
                      {quote.jobs && quote.distance && " • "}
                      {quote.distance && quote.distance}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleQuoteSelect(quote)}
                    onKeyDown={(e) => handleChevronKeyDown(e, quote)}
                    className="p-2 rounded-full hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
                    aria-label={`Select quote from ${quote.name} for ${quote.price}${quote.jobs ? ` with ${quote.jobs} moves` : ''}${quote.distance ? ` covering ${quote.distance}` : ''}`}
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-colors duration-200" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No quotes available at the moment.</p>
            <p className="text-sm mt-1">Please try again later or contact support.</p>
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          
          <button
            onClick={handleProceed}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Proceed to booking page"
          >
            {isLoading ? "Loading..." : "Proceed to Booking"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;