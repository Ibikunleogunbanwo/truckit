"use client";
import React, { useReducer, useMemo } from "react";
import DashboardHeader from "@/components/dashboardheader";
import MyDatePicker from "@/components/landingpage/datepicker";
import Locationpicker from "@/components/landingpage/locationpicker";
import TimeRangeSelector from "@/components/landingpage/timepicker";
import pickup from "../../../assets/images/img-location.png";
import dropoff from "../../../assets/images/img-dropoff.png";
import SelectServices from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import ContactInfo from "@/components/search-movers/contactinfo";
import ContinueWithLogin from "@/components/landingpage/button";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import haversine from "haversine";

// Initial state
const initialState = {
  pickupLocation: {},
  dropOffLocation: {},
  startDate: null,
  timeRange: { fromTime: "", toTime: "" },
  accessibilityData: null,
  items: [],
  isChecked: false,
  moversDetails: {
    needDriver: true,
    needMover: true,
    needUnload: true,
    Vehicleneedeed: "",
    NoofMovers: "",
    equipmentRequired: "",
  },
  contactInfo: null,
};


function reducer(state, action) {
  switch (action.type) {
    case "SET_PICKUP":
      return { ...state, pickupLocation: action.payload };
    case "SET_DROPOFF":
      return { ...state, dropOffLocation: action.payload };
    case "SET_DATE":
      return { ...state, startDate: action.payload };
    case "SET_TIME":
      return { ...state, timeRange: { ...state.timeRange, ...action.payload } };
    case "SET_ACCESSIBILITY":
      return { ...state, accessibilityData: action.payload };
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_MOVERS":
      return { ...state, moversDetails: action.payload };
    case "SET_CONTACT":
      return { ...state, contactInfo: action.payload };
    case "TOGGLE_TERMS":
      return { ...state, isChecked: action.payload };
    default:
      return state;
  }
}

// Helper function
function getDurationInHours(fromTime, toTime) {
  const [fromHour, fromMinute] = fromTime.split(":").map(Number);
  const [toHour, toMinute] = toTime.split(":").map(Number);
  const fromTotalMinutes = fromHour * 60 + fromMinute;
  const toTotalMinutes = toHour * 60 + toMinute;
  const durationMinutes = toTotalMinutes - fromTotalMinutes;
  return `${durationMinutes / 60} hrs`;
}

const RequestMove = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = state.pickupLocation.location
    ? {
        latitude: state.pickupLocation.location.lat,
        longitude: state.pickupLocation.location.lng,
      }
    : null;

  const end = state.dropOffLocation.location
    ? {
        latitude: state.dropOffLocation.location.lat,
        longitude: state.dropOffLocation.location.lng,
      }
    : null;

  const distance = useMemo(() => {
    if (start && end) {
      return haversine(start, end).toFixed(2);
    }
    return "N/A";
  }, [start, end]);

  const RequestDetails = {
    PickupLocation: {
      fullAddress: state.pickupLocation.fullAddress || "",
      apartmentNumber: state.pickupLocation.apartmentNumber || "",
      streetNumber: state.pickupLocation.streetNumber || "",
      streetName: state.pickupLocation.streetName || "",
      city: state.pickupLocation.city || "",
      province: state.pickupLocation.province || "",
      postalCode: state.pickupLocation.postalCode || "",
      country: state.pickupLocation.country || "",
      latitude: state.pickupLocation.location?.lat || "",
      longitude: state.pickupLocation.location?.lng || "",
    },
    DropOffLocation: {
      fullAddress: state.dropOffLocation.fullAddress || "",
      apartmentNumber: state.dropOffLocation.apartmentNumber || "",
      streetNumber: state.dropOffLocation.streetNumber || "",
      streetName: state.dropOffLocation.streetName || "",
      city: state.dropOffLocation.city || "",
      province: state.dropOffLocation.province || "",
      postalCode: state.dropOffLocation.postalCode || "",
      country: state.dropOffLocation.country || "",
      latitude: state.dropOffLocation.location?.lat || "",
      longitude: state.dropOffLocation.location?.lng || "",
    },
    Date: state.startDate || "Not selected",
    FromTime: state.timeRange.fromTime || "00:00",
    ToTime: state.timeRange.toTime || "00:00",
    Duration: getDurationInHours(state.timeRange.fromTime, state.timeRange.toTime),
  };

  const handleSubmit = () => {
    const generateRequestId = (length = 10) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((byte) => chars[byte % chars.length])
        .join("");
    };

    const formData = {
      requestId: generateRequestId(),
      request_details: RequestDetails,
      accessibility_details: state.accessibilityData,
      move_items: state.items,
      movers_requirements: state.moversDetails,
      move__contacts: state.contactInfo,
      agreedToTerms: state.isChecked,
      move_distance: distance,
      move_status: "initiated"
    };

    if (!state.items || state.items.length === 0) {
      toast("Please select at least one Category & Sub category.");
      return;
    }

    if (!state.accessibilityData || Object.keys(state.accessibilityData).length === 0) {
      toast.error("Please fill out accessibility information.");
      return;
    }

    if (
      !state.moversDetails?.Vehicleneedeed?.trim() ||
      !Number(state.moversDetails?.NoofMovers) ||
      Number(state.moversDetails?.NoofMovers) <= 0
    ) {
      toast.error("Please complete movers details.");
      return;
    }

    if (!state.contactInfo || Object.keys(state.contactInfo).length === 0) {
      toast.error("Please fill out contact information.");
      return;
    }

    if (!state.isChecked) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }

    console.log("Submitting form data:", formData);
    toast.success("Your request has been submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <DashboardHeader />
    </div>
      <div className="w-full max-w-screen-xl mt-18 mx-auto px-4 py-6 text-sm">
        <p className="text-lg font-extrabold font-inknut-antiqua mb-4">
          Request Move
        </p>

        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Locationpicker
            src={pickup}
            placeholder="Pickup Location"
            location={state.pickupLocation}
            onLocationChange={(val) => dispatch({ type: "SET_PICKUP", payload: val })}
          />
          <Locationpicker
            src={dropoff}
            placeholder="Drop-off Location"
            location={state.dropOffLocation}
            onLocationChange={(val) => dispatch({ type: "SET_DROPOFF", payload: val })}
          />
          <MyDatePicker
            date={state.startDate}
            onDateChange={(val) => dispatch({ type: "SET_DATE", payload: val })}
          />
          <TimeRangeSelector
            fromTime={state.timeRange.fromTime}
            toTime={state.timeRange.toTime}
            onFromTimeChange={(fromTime) =>
              dispatch({ type: "SET_TIME", payload: { fromTime } })
            }
            onToTimeChange={(toTime) =>
              dispatch({ type: "SET_TIME", payload: { toTime } })
            }
          />
        </div>

        <div className="my-6 w-full space-y-8 rounded-xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
          <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
            <p className="text-base font-bold text-teal-500">
              1. Items to be moved
            </p>
            <SelectServices
              items={state.items}
              onItemsChange={(val) => dispatch({ type: "SET_ITEMS", payload: val })}
            />
            <hr className="mt-2 border-gray-300" />
          </section>

          <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
            <Accessibility
              entries={state.accessibilityData}
              onEntriesChange={(val) =>
                dispatch({ type: "SET_ACCESSIBILITY", payload: val })
              }
            />
            <hr className="mt-4 border-gray-300" />
          </section>

          <section className="w-full rounded-xl border border-teal-100/60 bg-white p-4 shadow-md">
            <Moversassistance
              moversDetails={state.moversDetails}
              onMoversDetailsChange={(val) =>
                dispatch({ type: "SET_MOVERS", payload: val })
              }
            />
            <hr className="border-gray-300" />
          </section>

          <section className="grid gap-4 rounded-xl border border-teal-100/60 bg-white p-5 shadow-md">
            <ContactInfo
              onContactChange={(val) =>
                dispatch({ type: "SET_CONTACT", payload: val })
              }
            />
            <hr className="mt-2 border-gray-300" />
          </section>

          <section id="confirmation" className="flex flex-col w-full gap-4 pt-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={state.isChecked}
                onChange={(e) =>
                  dispatch({ type: "TOGGLE_TERMS", payload: e.target.checked })
                }
                className="mt-1 h-4 w-4"
              />
              <label htmlFor="agree" className="text-justify text-xs lg:text-sm">
                Before you continue, please confirm that you have read and you
                understand TruckIt’s{" "}
                <Link href="#">
                  <span className="font-bold hover:underline">terms of service.</span>
                </Link>
              </label>
            </div>

            <ContinueWithLogin
              onClick={handleSubmit}
              buttonText="Submit request"
              linkButton="#"
              widthClass="w-40"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default RequestMove;