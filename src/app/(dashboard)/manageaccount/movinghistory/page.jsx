"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  Calendar,
  TruckIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import DashboardHeader from "@/components/dashboardheader";
import MovingJobCard from "@/components/movingjobscard";

const movingJobs = [
  {
    date: "2024-12-26",
    fromTime: "10:30 AM",
    toTime: "12:30 PM",
    from: "123 Maple Street, Toronto, ON",
    to: "456 Wood Street, Toronto, ON",
    truckDriver: "Paul Walker",
    movers: ["John Cena"],
  },
  {
    date: "2024-12-27",
    fromTime: "2:00 PM",
    toTime: "4:00 PM",
    from: "78 Oak Avenue, Mississauga, ON",
    to: "21 Pine Street, Brampton, ON",
    truckDriver: "Dominic Toretto",
    movers: ["The Rock"],
  },
  {
    date: "2024-12-28",
    fromTime: "9:00 AM",
    toTime: "11:00 AM",
    from: "99 Elm Street, Scarborough, ON",
    to: "15 Cedar Lane, North York, ON",
    truckDriver: "Brian O'Conner",
    movers: ["Batista"],
  },
  {
    date: "2024-12-29",
    fromTime: "1:30 PM",
    toTime: "3:30 PM",
    from: "312 Birch Road, Toronto, ON",
    to: "711 Spruce Way, Etobicoke, ON",
    truckDriver: "Letty Ortiz",
    movers: ["CM Punk"],
  },
  {
    date: "2024-12-30",
    fromTime: "11:00 AM",
    toTime: "1:00 PM",
    from: "400 Willow Drive, Vaughan, ON",
    to: "120 Redwood Blvd, Toronto, ON",
    truckDriver: "Han Seoul-Oh",
    movers: ["AJ Styles"],
  },
  {
    date: "2024-12-31",
    fromTime: "4:00 PM",
    toTime: "6:00 PM",
    from: "56 Aspen Way, Richmond Hill, ON",
    to: "89 Chestnut Street, Markham, ON",
    truckDriver: "Roman Pearce",
    movers: ["Undertaker"],
  },
  {
    date: "2025-01-01",
    fromTime: "10:00 AM",
    toTime: "12:00 PM",
    from: "78 Fir Street, Toronto, ON",
    to: "62 Beech Avenue, Toronto, ON",
    truckDriver: "Deckard Shaw",
    movers: ["Chris Jericho"],
  },
  {
    date: "2025-01-02",
    fromTime: "3:30 PM",
    toTime: "5:30 PM",
    from: "999 Maplewood Drive, Brampton, ON",
    to: "1000 River Street, Mississauga, ON",
    truckDriver: "Mia Toretto",
    movers: ["Rikishi"],
  },
  {
    date: "2025-01-03",
    fromTime: "12:30 PM",
    toTime: "2:30 PM",
    from: "11 Sycamore Lane, North York, ON",
    to: "200 Cedar Springs Road, Toronto, ON",
    truckDriver: "Tej Parker",
    movers: ["Drew McIntyre"],
  },
  {
    date: "2025-01-04",
    fromTime: "9:45 AM",
    toTime: "11:45 AM",
    from: "87 Hemlock Crescent, Etobicoke, ON",
    to: "342 Poplar Avenue, Toronto, ON",
    truckDriver: "Hobbs Johnson",
    movers: ["Logan Paul"],
  },
];

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleBack = () => router.back();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedJobs = [...movingJobs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Pagination calculations
  const totalJobs = movingJobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, endIndex);

  const upcomingJobs = movingJobs.filter(
    (job) => new Date(job.date) >= today
  ).length;
  const completedJobs = totalJobs - upcomingJobs;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optionally scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationNumbers = () => {
    const delta = 4; // Number of pages to show on each side of current page
    const pages = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <DashboardHeader />
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                Move History
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track all your past and upcoming moves
              </p>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        {movingJobs.length > 0 ? (
          <>
            <div className="space-y-6">
              {currentJobs.map((job, index) => (
                <MovingJobCard 
                  key={`${job.date}-${startIndex + index}`} 
                  job={job} 
                  index={startIndex + index} 
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                {/* Page Info */}
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalJobs)} of {totalJobs} jobs
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex space-x-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          1
                        </button>
                        {currentPage > 4 && (
                          <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                      </>
                    )}

                    {/* Current page range */}
                    {getPaginationNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          page === currentPage
                            ? 'bg-teal-500 text-white border border-teal-500'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Mobile: Simple page indicator */}
                  <div className="sm:hidden">
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No moving history
            </h3>
            <p className="text-gray-600">
              Your completed and upcoming moves will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;