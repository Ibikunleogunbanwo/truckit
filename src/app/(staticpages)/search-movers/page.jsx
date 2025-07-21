"use client";

import React, { useMemo, useReducer } from "react";
import Image from "next/image";
import Arrowicon from "../../../assets/images/Arrow - Left.png";
import SelectServices from "@/components/search-movers/selectservices";
import Accessibility from "@/components/search-movers/Accessibility";
import Moversassistance from "@/components/search-movers/moversassistance";
import Link from "next/link";
import ContactInfo from "@/components/search-movers/contactinfo";
import ContinueWithLogin from "@/components/landingpage/button";
import SubmissionModal from "@/components/modal";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";
import haversine from "haversine";

const initialState = {
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
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_ACCESSIBILITY":
      return { ...state, accessibilityData: action.payload };
    case "SET_MOVERS_DETAILS":
      return { ...state, moversDetails: action.payload };
    case "SET_CONTACT_INFO":
      return { ...state, contactInfo: action.payload };
    case "SET_CHECKED":
      return { ...state, isChecked: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}

const Searchmovers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchParams = useSearchParams();

  const moveDetails = useMemo(() => {
    const raw = searchParams.get("move");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [searchParams]);

  const parsedMove = moveDetails || {};
  const {
    pickupLocation = {},
    dropOffLocation = {},
    date = "",
    fromTime = "",
    toTime = "",
    duration = "",
  } = parsedMove;

  const RequestDetails = {
    PickupLocation: {
      fullAddress: parsedMove.pickupFullAddress || "",
      apartmentNumber: parsedMove.pickupApartmentNumber || "",
      streetNumber: parsedMove.pickupStreetNumber || "",
      streetName: parsedMove.pickupStreetName || "",
      city: parsedMove.pickupCity || "",
      province: parsedMove.pickupProvince || "",
      postalCode: parsedMove.pickupPostalCode || "",
      country: parsedMove.pickupCountry || "",
      latitude: parsedMove.pickupLat || "",
      longitude: parsedMove.pickupLng || "",
    },
    DropOffLocation: {
      fullAddress: parsedMove.dropOffFullAddress || "",
      apartmentNumber: parsedMove.dropOffApartmentNumber || "",
      streetNumber: parsedMove.dropOffStreetNumber || "",
      streetName: parsedMove.dropOffStreetName || "",
      city: parsedMove.dropOffCity || "",
      province: parsedMove.dropOffProvince || "",
      postalCode: parsedMove.dropOffPostalCode || "",
      country: parsedMove.dropOffCountry || "",
      latitude: parsedMove.dropOffLat || "",
      longitude: parsedMove.dropOffLng || "",
    },
    Date: parsedMove.date,
    FromTime: parsedMove.fromTime,
    ToTime: parsedMove.toTime,
    Duration: parsedMove.duration,
  };

  const start =
    parsedMove.pickupLat && parsedMove.pickupLng
      ? {
          latitude: parseFloat(parsedMove.pickupLat),
          longitude: parseFloat(parsedMove.pickupLng),
        }
      : null;

  const end =
    parsedMove.dropOffLat && parsedMove.dropOffLng
      ? {
          latitude: parseFloat(parsedMove.dropOffLat),
          longitude: parseFloat(parsedMove.dropOffLng),
        }
      : null;

  const distance = useMemo(() => {
    if (start && end) {
      return haversine(start, end).toFixed(2);
    }
    return "N/A";
  }, [start, end]);

  const handleSubmit = () => {
    const generateRequestId = (length = 10) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

    if (
      !state.accessibilityData ||
      Object.keys(state.accessibilityData).length === 0
    ) {
      toast.error("Please fill out accessibility information.");
      return;
    }

    if (
      !state.moversDetails?.selectedVehicleType?.trim() ||
      typeof state.moversDetails?.selectedNoOfMovers !== "number" ||
      state.moversDetails.selectedNoOfMovers <= 0
    ) {
      toast.error("Please fill out truck type and movers needed information.");
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
    dispatch({ type: "TOGGLE_MODAL", payload: true });
  };

  return (
    <div id="main" className="min-h-screen bg-white w-full">
      <div className="grid p-8">
        <Image src={Arrowicon} alt="Arrow icon" className="mb-2" />

        {/* Move Summary */}
        <div className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg ">
          <div className="flex items-start">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 mt-1.5 flex-shrink-0 shadow-sm"></div>
            <p className="text-sm leading-relaxed text-slate-700 pr-2 ml-2 mb-4">
              You're about to book a moving service from{" "}
              <span className="text-teal-600 font-semibold px-3 py-1.5 rounded-lg block mt-3 mb-2 text-center shadow-sm border">
                {parsedMove.pickupFullAddress?.trim() || (
                  <span className="italic text-slate-400">
                    [Pickup location not set]
                  </span>
                )}
              </span>
              to{" "}
              <span className="text-teal-600 font-semibold px-3 py-1.5 rounded-lg block mt-2 text-center shadow-sm border">
                {parsedMove.dropOffFullAddress || (
                  <span className="italic text-slate-400">
                    [Drop off location not set]
                  </span>
                )}
              </span>
            </p>
          </div>

          {/* Date / Time / Duration */}
          <div className="space-y-3 mt-2">
            <InfoRow
              label="Date"
              value={
                date ||
                new Date().toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            />
            <InfoRow
              label="Time"
              value={`${fromTime || "[00:00]"} - ${toTime || "[00:00]"}`}
            />
            <InfoRow label="Duration" value={duration || "[0hrs]"} />
          </div>
        </div>

        {/* Step 1: Items */}
        <SectionTitle title="1. Items to be moved" />
        <div className="mb-4 grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <SelectServices
            items={state.items}
            onItemsChange={(items) =>
              dispatch({ type: "SET_ITEMS", payload: items })
            }
          />
        </div>

        {/* Step 2: Accessibility */}
        <div className="mb-4 grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <Accessibility
            entries={state.accessibilityData}
            onEntriesChange={(entries) =>
              dispatch({ type: "SET_ACCESSIBILITY", payload: entries })
            }
          />
        </div>

        {/* Step 3: Movers Assistance */}
        <div className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-lg">
          <Moversassistance
            moversDetails={state.moversDetails}
            onMoversDetailsChange={(data) =>
              dispatch({ type: "SET_MOVERS_DETAILS", payload: data })
            }
          />
        </div>

        {/* Step 4: Contact Info */}
        <div className="grid gap-4 p-5 rounded-xl border border-teal-100/60 shadow-md">
          <ContactInfo
            onContactChange={(data) =>
              dispatch({ type: "SET_CONTACT_INFO", payload: data })
            }
          />
        </div>

        {/* Step 5: Confirmation */}
        <div className="flex flex-col w-full mt-10 mb-12 gap-2">
          <div className="flex justify-start items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="agree"
              checked={state.isChecked}
              onChange={(e) =>
                dispatch({ type: "SET_CHECKED", payload: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="agree" className="text-xs lg:text-sm text-justify">
              Before you continue, please confirm that you have read and you
              understand TruckIt’s{" "}
              <Link href="#">
                <span className="font-bold hover:underline">
                  terms of service.
                </span>
              </Link>
            </label>
          </div>

          <ContinueWithLogin
            onClick={handleSubmit}
            buttonText="Submit request"
            linkButton="#"
            widthClass="w-40"
          />
        </div>

        <SubmissionModal
          isOpen={state.isOpen}
          setIsOpen={(val) => dispatch({ type: "TOGGLE_MODAL", payload: val })}
        />
      </div>
    </div>
  );
};

// Helper for summary display
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
      <span className="text-slate-600 text-sm">{label}:</span>
    </div>
    <span className="font-semibold text-teal-600 bg-gradient-to-r from-white to-teal-50/50 px-4 py-2 rounded-lg text-sm ml-3.5 sm:ml-0 shadow-sm border border-teal-100/40">
      {value}
    </span>
  </div>
);

const SectionTitle = ({ title }) => (
  <p className="text-teal-500 font-bold mt-18">{title}</p>
);

export default Searchmovers;
