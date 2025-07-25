"use client";

import Image from "next/image";
import img from "../../../assets/images/Frame (1).png";
import { Button } from "@/components/ui/button";
import { useReducer, useMemo, useCallback } from "react";
import DashboardHeader from "@/components/dashboardheader";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CircleCheck,
  CircleX,
  EllipsisVertical,
  MapPin,
  Clock,
  Calendar,
  Package,
  Users,
  Building,
  Phone,
  Mail,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Constants
const MOVE_STATUSES = {
  COMPLETED: "Completed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

const STATS_DATA = [
  { title: "Total moves", value: "32", icon: Package, color: "text-blue-600" },
  {
    title: "Upcoming moves",
    value: "32",
    icon: Calendar,
    color: "text-orange-600",
  },
  {
    title: "Completed moves",
    value: "32",
    icon: CircleCheck,
    color: "text-green-600",
  },
  {
    title: "Cancelled moves",
    value: "32",
    icon: CircleX,
    color: "text-red-600",
  },
];

// Initial state
const initialState = {
  status: MOVE_STATUSES.COMPLETED,
  completed: false,
  cancel: false,
  isOpen: false,
  openSections: {},
  openCompletion: false,
  showCompleteDialog: false,
  showCancelDialog: false,
};

// Mock data
const MOCK_MOVE_DATA = {
  id: "MV-001",
  date: "Thu, Dec 32",
  time: "10:30 AM - 12:00 PM",
  status: MOVE_STATUSES.COMPLETED,
  from: "123 Maple Street, Toronto, ON",
  to: "456 Wood Street, Toronto, ON",
  items: [
    {
      category: "Furniture",
      item: "Dining Table",
      quantity: 2,
      specialInstructions: "Handle with care - antique piece",
    },
    {
      category: "Appliances",
      item: "Refrigerator",
      quantity: 1,
      specialInstructions: "Disconnect 24h before move",
    },
    {
      category: "Boxes",
      item: "Medium Boxes",
      quantity: 15,
      specialInstructions: "Fragile items inside",
    },
  ],
  logistics: {
    buildingType: "Apartment",
    buildingAccess: "Elevator",
    parkingInstructions: "Street parking available on north side",
  },
  movers: {
    driver: "Yes",
    moverCount: 6,
    unloadNeeded: "No",
    equipment: "Dolly, Moving blankets, Straps",
    truckType: "26ft Box Truck",
  },
  contact: {
    firstName: "Ayo",
    lastName: "Johnson",
    phoneNumber: "(639) 364-0945",
    email: "ayo.johnson@gmail.com",
  },
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "MARK_COMPLETED":
      return { ...state, completed: true, showCompleteDialog: false };
    case "MARK_CANCELED":
      return { ...state, cancel: true, showCancelDialog: false };
    case "TOGGLE_SECTION":
      return {
        ...state,
        openSections: {
          ...state.openSections,
          [action.payload]: !state.openSections[action.payload],
        },
      };
    case "SET_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_OPEN_COMPLETION":
      return { ...state, openCompletion: action.payload };
    case "TOGGLE_COMPLETE_DIALOG":
      return { ...state, showCompleteDialog: action.payload };
    case "TOGGLE_CANCEL_DIALOG":
      return { ...state, showCancelDialog: action.payload };
    default:
      return state;
  }
}

// Enhanced Components
const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className="group bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-lg rounded-xl border border-gray-200 p-4 sm:p-6 cursor-pointer">
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-[0.5rem] md:text-[0.8rem] lg:text-xs text-gray-600 font-medium mb-1 truncate">
          {title}
        </p>
        <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div
        className={`p-2 sm:p-3 rounded-lg bg-gray-50 group-hover:bg-white transition-colors duration-200 ${color} flex-shrink-0`}
      >
        <Icon className="h-5 w-5 md:h-6 sm:w-6" />
      </div>
    </div>
  </div>
);

const StatusButton = ({ status, currentStatus, onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    variant="ghost"
    size="sm"
    className={`text-xs sm:text-sm font-medium transition-all duration-200 px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${
      currentStatus === status
        ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {status}
  </Button>
);

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case MOVE_STATUSES.COMPLETED:
        return "bg-green-100 text-green-800 border-green-200";
      case MOVE_STATUSES.PENDING:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case MOVE_STATUSES.CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`${getStatusStyles(status)} font-medium text-xs`}
    >
      {status}
    </Badge>
  );
};

const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="h-4 w-4 text-gray-500 flex-shrink-0" />}
      <span className="truncate">{label}</span>
    </div>
    <p className="text-sm text-gray-600 ml-6 break-words">{value}</p>
  </div>
);

const ItemsTable = ({ items, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {item.item}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {item.category}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="text-xs self-start sm:self-auto"
              >
                Qty: {item.quantity}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              <span className="font-medium">Instructions:</span>{" "}
              {item.specialInstructions}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900 text-sm">
              Category
            </TableHead>
            <TableHead className="font-semibold text-gray-900 text-sm">
              Item
            </TableHead>
            <TableHead className="font-semibold text-gray-900 text-sm">
              Quantity
            </TableHead>
            <TableHead className="font-semibold text-gray-900 text-sm">
              Special Instructions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium text-sm">
                {item.category}
              </TableCell>
              <TableCell className="text-sm">{item.item}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {item.quantity}
                </Badge>
              </TableCell>
              <TableCell className="text-xs sm:text-sm text-gray-600 max-w-xs">
                <div className="truncate" title={item.specialInstructions}>
                  {item.specialInstructions}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  onConfirm,
  isDestructive = false,
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="sm:max-w-lg mx-4 sm:mx-auto">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-lg font-semibold">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-600 text-sm">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
        <AlertDialogCancel className="w-full sm:w-auto">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={`w-full sm:w-auto ${
            isDestructive ? "bg-red-600 text-white hover:bg-red-700" : ""
          }`}
        >
          {confirmText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Main Component
export default function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCompleted = useCallback(() => {
    dispatch({ type: "MARK_COMPLETED" });
    toast.success("Move has been marked as completed");
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: "MARK_CANCELED" });
    toast.error("Move has been cancelled successfully");
  }, []);

  const filteredMoves = useMemo(() => {
    // In a real app, this would filter based on state.status
    return [MOCK_MOVE_DATA];
  }, [state.status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <DashboardHeader />
      </div>

      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Greeting Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <div className="flex-1 min-w-0">
                <h1 className="text-xs md:text-xl font-bold text-gray-900 truncate">
                  Good Morning, Abdulrahman
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Here's what's happening with your moves today
                </p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src={img || "/placeholder.svg"}
                  alt="Greeting icon"
                  height={28}
                  width={28}
                  className="opacity-80 sm:h-8 sm:w-8"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
            {STATS_DATA.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Recent Moves Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Section Header */}
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Moves
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage and track your moving requests
                  </p>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-white rounded-lg overflow-x-auto">
                  {Object.values(MOVE_STATUSES).map((status) => (
                    <StatusButton
                      key={status}
                      status={status}
                      currentStatus={state.status}
                      onClick={() =>
                        dispatch({ type: "SET_STATUS", payload: status })
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Move Cards */}
            <div className="p-4 sm:p-6 lg:p-8">
              {filteredMoves.map((move) => (
                <div
                  key={move.id}
                  className="border border-gray-200 rounded-lg p-5 sm:p-6 lg:p-8 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Move Header */}
                  <div className="flex flex-col gap-4 mb-6">
                    {/* Date/Time and Actions Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 min-w-0">
                        <div className="flex items-center gap-2 text-gray-900 min-w-0">
                          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base truncate">
                            {move.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 min-w-0">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm truncate">
                            {move.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                        <StatusBadge status={move.status} />
                        <DropdownMenu
                          open={state.openCompletion}
                          onOpenChange={(val) =>
                            dispatch({
                              type: "SET_OPEN_COMPLETION",
                              payload: val,
                            })
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-2 flex-shrink-0"
                            >
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onSelect={() =>
                                dispatch({
                                  type: "TOGGLE_COMPLETE_DIALOG",
                                  payload: true,
                                })
                              }
                              className="flex items-center gap-2 text-green-700"
                            >
                              <CircleCheck className="h-4 w-4" />
                              Mark as completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                dispatch({
                                  type: "TOGGLE_CANCEL_DIALOG",
                                  payload: true,
                                })
                              }
                              className="flex items-center gap-2 text-red-700"
                            >
                              <CircleX className="h-4 w-4" />
                              Cancel appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Move Locations */}
                  <Collapsible
                    open={state.isOpen}
                    onOpenChange={(val) =>
                      dispatch({ type: "SET_OPEN", payload: val })
                    }
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-700">
                              From
                            </p>
                            <p className="text-sm text-gray-600 break-words">
                              {move.from}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-700">
                              To
                            </p>
                            <p className="text-sm text-gray-600 break-words">
                              {move.to}
                            </p>
                          </div>
                        </div>
                      </div>

                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto sm:self-start bg-transparent"
                        >
                          <span className="flex items-center justify-center gap-2">
                            {state.isOpen ? (
                              <>
                                <ChevronUpIcon className="h-4 w-4" />
                                <span>Hide Details</span>
                              </>
                            ) : (
                              <>
                                <ChevronDownIcon className="h-4 w-4" />
                                <span>Show Details</span>
                              </>
                            )}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent className="mt-8">
                      <div className="border-t border-b border-gray-200">
                        {/* Desktop/Tablet Tabs */}
                        <div className="hidden lg:block">
                          <Tabs defaultValue="items" className="w-full">
                            <TabsList className="grid grid-cols-4 w-full bg-white p-1 mb-6">
                              <TabsTrigger
                                value="items"
                                className="flex items-center gap-2 text-sm py-3"
                              >
                                <Package className="h-4 w-4" />
                                <span>Items</span>
                              </TabsTrigger>
                              <TabsTrigger
                                value="logistics"
                                className="flex items-center gap-2 text-sm py-3"
                              >
                                <Building className="h-4 w-4" />
                                <span>Logistics</span>
                              </TabsTrigger>
                              <TabsTrigger
                                value="movers"
                                className="flex items-center gap-2 text-sm py-3"
                              >
                                <Users className="h-4 w-4" />
                                <span>Movers</span>
                              </TabsTrigger>
                              <TabsTrigger
                                value="contact"
                                className="flex items-center gap-2 text-sm py-3"
                              >
                                <Phone className="h-4 w-4" />
                                <span>Contact</span>
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="items" className="mt-0 pt-6">
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <ItemsTable items={move.items} />
                              </div>
                            </TabsContent>

                            <TabsContent
                              value="logistics"
                              className="mt-0 pt-6"
                            >
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
                                  <InfoItem
                                    icon={Building}
                                    label="Building Type"
                                    value={move.logistics.buildingType}
                                  />
                                  <InfoItem
                                    icon={Building}
                                    label="Building Access"
                                    value={move.logistics.buildingAccess}
                                  />
                                  <InfoItem
                                    label="Parking Instructions"
                                    value={move.logistics.parkingInstructions}
                                    className="sm:col-span-2 lg:col-span-1"
                                  />
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="movers" className="mt-0 pt-6">
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 bg-gray-50 rounded-lg">
                                  <InfoItem
                                    icon={Users}
                                    label="Driver"
                                    value={move.movers.driver}
                                  />
                                  <InfoItem
                                    icon={Users}
                                    label="Movers"
                                    value={move.movers.moverCount}
                                  />
                                  <InfoItem
                                    label="Unload Needed"
                                    value={move.movers.unloadNeeded}
                                  />
                                  <InfoItem
                                    label="Equipment"
                                    value={move.movers.equipment}
                                    className="sm:col-span-2 lg:col-span-1"
                                  />
                                  <InfoItem
                                    icon={Truck}
                                    label="Truck Type"
                                    value={move.movers.truckType}
                                  />
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="contact" className="mt-0 pt-6">
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg">
                                  <InfoItem
                                    label="First Name"
                                    value={move.contact.firstName}
                                  />
                                  <InfoItem
                                    label="Last Name"
                                    value={move.contact.lastName}
                                  />
                                  <InfoItem
                                    icon={Phone}
                                    label="Phone Number"
                                    value={move.contact.phoneNumber}
                                  />
                                  <InfoItem
                                    icon={Mail}
                                    label="Email"
                                    value={move.contact.email}
                                    className="sm:col-span-2 lg:col-span-1"
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        {/* Mobile Accordion */}
                        <div className="lg:hidden bg-white border rounded-lg divide-y divide-gray-200">
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="items">
                              <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline text-sm">
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4" />
                                  <span className="font-medium">
                                    Items to be moved
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 sm:px-6 pt-2 pb-4">
                                <ItemsTable items={move.items} isMobile />
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="logistics">
                              <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline text-sm">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  <span className="font-medium">
                                    Accessibility & Logistics
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 sm:px-6 pt-2 pb-4 space-y-6">
                                <InfoItem
                                  icon={Building}
                                  label="Building Type"
                                  value={move.logistics.buildingType}
                                />
                                <InfoItem
                                  icon={Building}
                                  label="Building Access"
                                  value={move.logistics.buildingAccess}
                                />
                                <InfoItem
                                  label="Parking Instructions"
                                  value={move.logistics.parkingInstructions}
                                />
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="movers">
                              <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline text-sm">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span className="font-medium">
                                    Movers & Assistance
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 sm:px-6 pt-2 pb-4 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <InfoItem
                                    icon={Users}
                                    label="Driver"
                                    value={move.movers.driver}
                                  />
                                  <InfoItem
                                    icon={Users}
                                    label="Movers"
                                    value={move.movers.moverCount}
                                  />
                                </div>
                                <InfoItem
                                  label="Unload Needed"
                                  value={move.movers.unloadNeeded}
                                />
                                <InfoItem
                                  label="Equipment"
                                  value={move.movers.equipment}
                                />
                                <InfoItem
                                  icon={Truck}
                                  label="Truck Type"
                                  value={move.movers.truckType}
                                />
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="contact">
                              <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline text-sm">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span className="font-medium">
                                    Contact Information
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 sm:px-6 pt-2 pb-4 space-y-6">
                                <div className="grid gap-6">
                                  <InfoItem
                                    label="First Name"
                                    value={move.contact.firstName}
                                  />
                                  <InfoItem
                                    label="Last Name"
                                    value={move.contact.lastName}
                                  />
                                </div>
                                <InfoItem
                                  icon={Phone}
                                  label="Phone Number"
                                  value={move.contact.phoneNumber}
                                />
                                <InfoItem
                                  icon={Mail}
                                  label="Email"
                                  value={move.contact.email}
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={state.showCompleteDialog}
        onOpenChange={(val) =>
          dispatch({ type: "TOGGLE_COMPLETE_DIALOG", payload: val })
        }
        title="Mark move as completed?"
        description="This action cannot be undone. The move status will be permanently changed to completed."
        confirmText="Yes, mark as completed"
        onConfirm={handleCompleted}
      />

      <ConfirmationDialog
        open={state.showCancelDialog}
        onOpenChange={(val) =>
          dispatch({ type: "TOGGLE_CANCEL_DIALOG", payload: val })
        }
        title="Cancel this move?"
        description="This action cannot be undone. Are you sure you want to cancel this move request?"
        confirmText="Yes, cancel move"
        onConfirm={handleCancel}
        isDestructive
      />
    </div>
  );
}
