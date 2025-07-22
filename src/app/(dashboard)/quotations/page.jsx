"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboardheader";
import RequestModal from "@/components/requestmodal";
import RequestModalQuotation from "@/components/ui/requestmodalquotation";
import AcceptQuotation from "@/components/acceptrequest";
const Page = () => {
  const movedetails_quotation = [
    {
      "moveId": "moveA1",
      "date": "Thu, Dec 14",
      "time": "10:30 AM",
      "from": "123 Mapple Street, Toronto",
      "to": "456 Wood Street, Toronto",
      "service": "Truckdriver, Movers (2)",
      "quotes": [
        {
          "id": "quote1",
          "name": "Louis Saha",
          "price": "30 CAD",
          "distance": "30km away",
          "jobs": 350,
          "truck_type": "Medium Van",
          "no_of_moves": 2,
          "distance_covered": "25km",
          "quotation": "Moving 1-bedroom within Toronto"
        },
        {
          "id": "quote2",
          "name": "Didier Drogba",
          "price": "45 CAD",
          "distance": "15km away",
          "jobs": 420,
          "truck_type": "Large Truck",
          "no_of_moves": 3,
          "distance_covered": "40km",
          "quotation": "2-bedroom apartment with stairs"
        },
        {
          "id": "quote3",
          "name": "Samuel Eto'o",
          "price": "38 CAD",
          "distance": "12km away",
          "jobs": 290,
          "truck_type": "Medium Truck",
          "no_of_moves": 2,
          "distance_covered": "22km",
          "quotation": "Quick move downtown"
        }
      ]
    },
    {
      "moveId": "moveB2",
      "date": "Fri, Dec 15",
      "time": "2:00 PM",
      "from": "789 King Street, Toronto",
      "to": "321 Queen Street, Toronto",
      "service": "Truckdriver, Movers (3)",
      "quotes": [
        {
          "id": "quote4",
          "name": "Yaya Touré",
          "price": "42 CAD",
          "distance": "18km away",
          "jobs": 375,
          "truck_type": "Large Van",
          "no_of_moves": 2,
          "distance_covered": "30km",
          "quotation": "Full house move"
        },
        {
          "id": "quote5",
          "name": "Obafemi Martins",
          "price": "50 CAD",
          "distance": "20km away",
          "jobs": 310,
          "truck_type": "Extra-Large Truck",
          "no_of_moves": 4,
          "distance_covered": "50km",
          "quotation": "Includes basement and garage"
        },
        {
          "id": "quote6",
          "name": "Louis Saha",
          "price": "30 CAD",
          "distance": "30km away",
          "jobs": 350,
          "truck_type": "Medium Van",
          "no_of_moves": 2,
          "distance_covered": "25km",
          "quotation": "Moving 1-bedroom within Toronto"
        }
      ]
    },
    {
      "moveId": "moveC3",
      "date": "Sat, Dec 16",
      "time": "9:00 AM",
      "from": "555 Bloor Street, Toronto",
      "to": "777 Yonge Street, Toronto",
      "service": "Truckdriver, Movers (1)",
      "quotes": [
        {
          "id": "quote7",
          "name": "Didier Drogba",
          "price": "45 CAD",
          "distance": "15km away",
          "jobs": 420,
          "truck_type": "Large Truck",
          "no_of_moves": 3,
          "distance_covered": "40km",
          "quotation": "2-bedroom apartment with stairs"
        },
        {
          "id": "quote8",
          "name": "Samuel Eto'o",
          "price": "38 CAD",
          "distance": "12km away",
          "jobs": 290,
          "truck_type": "Medium Truck",
          "no_of_moves": 2,
          "distance_covered": "22km",
          "quotation": "Quick move downtown"
        },
        {
          "id": "quote9",
          "name": "Yaya Touré",
          "price": "42 CAD",
          "distance": "18km away",
          "jobs": 375,
          "truck_type": "Large Van",
          "no_of_moves": 2,
          "distance_covered": "30km",
          "quotation": "Full house move"
        }
      ]
    }
  ];

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isQuoteDetailModalOpen, setIsQuoteDetailModalOpen] = useState(false);
  const [isAcceptQuotationOpen, setIsAcceptQuotationOpen] = useState(false); // New state
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [currentMoveDetails, setCurrentMoveDetails] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Open the RequestModal when user clicks "View responses"
  const handleClickResponse = (moveDetails) => {
    setCurrentMoveDetails(moveDetails);
    setIsRequestModalOpen(true);
  };

  // Handle user selecting a quote from RequestModal
  const handleChevronClick = (quote) => {
    setSelectedQuote(quote);
    setIsRequestModalOpen(false);
    setTimeout(() => setIsQuoteDetailModalOpen(true), 200);
  };

  // Handle back navigation from quote detail modal to quote list modal
  const handleBackToQuoteList = () => {
    setIsQuoteDetailModalOpen(false);
    setTimeout(() => setIsRequestModalOpen(true), 200);
  };

  // Handle "Confirm Move" button in RequestModalQuotation
  const handleConfirmMove = () => {
    console.log("Moving to AcceptQuotation modal for:", selectedQuote?.name);
    // Additional logic if needed before opening AcceptQuotation
  };

  // Handle back navigation from AcceptQuotation to RequestModalQuotation
  const handleBackToQuoteDetail = () => {
    setIsAcceptQuotationOpen(false);
    setTimeout(() => setIsQuoteDetailModalOpen(true), 200);
  };

  // Handle final payment processing
  const handleFinalConfirmation = async () => {
    setIsProcessingPayment(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Payment successful for:", selectedQuote?.name);
      
      // Close all modals and reset state
      handleCloseAllModals();
      
      // You could show a success message here
      alert("Move confirmed successfully!");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle error in payment process
  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    // You could show an error toast here
    alert("Payment failed. Please try again.");
  };

  // Handle closing all modals
  const handleCloseAllModals = () => {
    setIsRequestModalOpen(false);
    setIsQuoteDetailModalOpen(false);
    setIsAcceptQuotationOpen(false);
    setSelectedQuote(null);
    setCurrentMoveDetails(null);
    setIsProcessingPayment(false);
  };

  // Get other quotes for comparison (exclude selected quote)
  const getOtherQuotes = () => {
    if (!currentMoveDetails || !selectedQuote) return [];
    return currentMoveDetails.quotes.filter(quote => quote.id !== selectedQuote.id);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed header */}
      <div className="fixed top-0 z-50 w-full">
        <DashboardHeader />
      </div>

      <div className="pt-20 pb-8">
        <div className="mx-4 sm:mx-6 lg:mx-8">
          <h1 className="text-2xl font-extrabold font-inknut-antiqua mb-6 text-gray-900">
            Your Move Quotations
          </h1>

          {/* Render all move details */}
          <div className="space-y-6">
            {movedetails_quotation.map((moveDetail) => (
              <div 
                key={moveDetail.moveId} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                {/* Move Header */}
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Move Request
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
                      {moveDetail.quotes.length} quote{moveDetail.quotes.length !== 1 ? 's' : ''} received
                    </span>
                  </div>
                </div>

                {/* Move Details */}
                <div className="grid gap-3 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Date:</span>
                    <span className="text-gray-900">{moveDetail.date} at {moveDetail.time}</span>
                  </div>

                  <div className="flex items-start text-sm">
                    <span className="font-medium text-gray-700 w-20 flex-shrink-0">From:</span>
                    <span className="text-gray-900">{moveDetail.from}</span>
                  </div>

                  <div className="flex items-start text-sm">
                    <span className="font-medium text-gray-700 w-20 flex-shrink-0">To:</span>
                    <span className="text-gray-900">{moveDetail.to}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Service:</span>
                    <span className="text-gray-900">{moveDetail.service}</span>
                  </div>
                </div>

                {/* Quote Summary */}
                {moveDetail.quotes.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Lowest: <span className="font-semibold text-green-600">
                          {Math.min(...moveDetail.quotes.map(q => parseInt(q.price.replace(/[^\d]/g, ''))))} CAD
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Highest: <span className="font-semibold text-blue-600">
                          {Math.max(...moveDetail.quotes.map(q => parseInt(q.price.replace(/[^\d]/g, ''))))} CAD
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleClickResponse(moveDetail)}
                    className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    View All {moveDetail.quotes.length} Quote{moveDetail.quotes.length !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {movedetails_quotation.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Move Requests Found</h3>
                <p className="text-gray-500">You haven't submitted any move requests yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal showing quote list */}
      {currentMoveDetails && (
        <RequestModal
          isOpen={isRequestModalOpen}
          setIsOpen={setIsRequestModalOpen}
          redirectto="/dashboard"
          from={currentMoveDetails.from}
          to={currentMoveDetails.to}
          quotes={currentMoveDetails.quotes}
          onChevronClick={handleChevronClick}
          packageDetails={currentMoveDetails.service}
        />
      )}

      {/* Quote Detail Modal showing selected quote details */}
      {selectedQuote && (
        <RequestModalQuotation
          isOpen={isQuoteDetailModalOpen}
          setIsOpen={setIsQuoteDetailModalOpen}
          redirectto="/dashboard"
          truck_type={selectedQuote.truck_type || "Unknown Truck"}
          distance={selectedQuote.distance_covered || selectedQuote.distance || "N/A"}
          jobs={selectedQuote.jobs || "N/A"}
          price={selectedQuote.price || "N/A"}
          quotes={[]} // No quotes needed in detail view
          onChevronClickBack={handleBackToQuoteList}
          setPreviousModalOpen={setIsRequestModalOpen}
          onQuoteChevronClick={(quote) => {
            console.log("Clicked quote in detail modal:", quote);
          }}
          // New props for AcceptQuotation integration
          setIsOpenAcceptQuotation={setIsAcceptQuotationOpen}
          onConfirmMove={handleConfirmMove}
        />
      )}

    
      {selectedQuote && currentMoveDetails && (
        <AcceptQuotation
          isOpenRequestQuotationModal={isQuoteDetailModalOpen}
          setIsOpenRequestQuotationModal={setIsQuoteDetailModalOpen}
          isOpenAcceptQuotation={isAcceptQuotationOpen}
          setIsOpenAcceptQuotation={setIsAcceptQuotationOpen}
          redirectto="/dashboard/confirmed" // Redirect after successful payment
          truck_type={selectedQuote.truck_type || "Unknown Truck"}
          distance={selectedQuote.distance_covered || selectedQuote.distance || "N/A"}
          jobs={selectedQuote.jobs?.toString() || "N/A"}
          price={selectedQuote.price || "N/A"}
          moverName={selectedQuote.name || "Unknown Mover"}
          fromAddress={currentMoveDetails.from}
          toAddress={currentMoveDetails.to}
          onChevronClickBack={handleBackToQuoteDetail}
          setPreviousModalOpen={setIsQuoteDetailModalOpen}
          onError={handlePaymentError}
          isLoading={isProcessingPayment}
        />
      )}
    </div>
  );
};

export default Page;