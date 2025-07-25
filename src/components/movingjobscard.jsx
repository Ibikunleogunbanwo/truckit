"use client";

import React, { useMemo } from "react";
import {
  Calendar,
  ClockIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import DashboardHeader from "@/components/dashboardheader";

const MovingJobCard = ({ job, index }) => {
  const formatDate = useMemo(() => {
    const date = new Date(job.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      formatted: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      isUpcoming: date >= today,
    };
  }, [job.date]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Date and status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium text-gray-900">
              {formatDate.formatted}
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              formatDate.isUpcoming
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {formatDate.isUpcoming ? "Upcoming" : "Completed"}
          </span>
        </div>

        {/* Locations */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Pickup Location
              </p>
              <p className="text-sm font-medium text-gray-900">{job.from}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Drop-off Location
              </p>
              <p className="text-sm font-medium text-gray-900">{job.to}</p>
            </div>
          </div>
        </div>

        {/* Time and truck driver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {job.fromTime} – {job.toTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">DriverName :  {job.truckDriver}</span>
          </div>
        </div>

        {/* Movers */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <UsersIcon className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Moving Team
              </p>
              <div className="flex flex-wrap gap-1">
                {job.movers.map((mover, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700"
                  >
                    {mover}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingJobCard;