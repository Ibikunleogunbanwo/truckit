"use client";
import Image from "next/image";
import img from "../../../assets/images/Frame (1).png";
import { Button } from "@/components/ui/button";
import { useReducer } from "react";
import DashboardHeader from "@/components/dashboardheader";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CircleCheck,
  CircleX,
  EllipsisVertical,
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

// Initial state
const initialState = {
  status: "Completed",
  completed: false,
  cancel: false,
  isOpen: false,
  openSections: {},
  openCompletion: false,
  showCompleteDialog: false,
  showCancelDialog: false,
};

// Accordion data
const accordionData = [
  {
    value: "items",
    label: "Items to be moved",
    content: <div className="text-sm text-gray-70 rounded-md p-4"></div>,
  },
  {
    value: "accessibility",
    label: "Accessibility & Logistics",
    content: (
      <div className="grid grid-cols-3 text-sm text-gray-700 rounded-md ml-2">
        <div>
          <p className="font-bold">Building type:</p>
          <p className="text-xs py-2">Apartment</p>
        </div>
        <div>
          <p className="font-bold">Building access:</p>
          <p className="text-xs py-2">Elevator</p>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-bold">Parking instructions:</p>
          <p className="text-xs py-2">No Parking Instruction added.</p>
        </div>
      </div>
    ),
  },
  {
    value: "movers",
    label: "Movers & Assistance",
    content: (
      <div className="grid lg:grid-cols-5 gap-4 text-sm text-gray-700 rounded-md ml-2">
        <div>
          <p className="font-bold">Driver:</p>
          <p className="text-xs py-2">Yes</p>
        </div>
        <div>
          <p className="font-bold">Movers:</p>
          <p className="text-xs py-2">6</p>
        </div>
        <div>
          <p className="font-bold">Unload Needed:</p>
          <p className="text-xs py-2">No</p>
        </div>
        <div>
          <p className="font-bold">Equipment Required:</p>
          <p className="text-xs py-2">No Equipment added.</p>
        </div>
        <div>
          <p className="font-bold">Truck Type:</p>
          <p className="text-xs py-2">Caravan</p>
        </div>
      </div>
    ),
  },
  {
    value: "contact",
    label: "Contact Information",
    content: (
      <div className="grid grid-cols-5 gap-4 text-sm text-gray-700 rounded-md ml-2">
        <div>
          <p className="font-bold">First Name:</p>
          <p className="text-xs py-2">Ayo</p>
        </div>
        <div>
          <p className="font-bold">Last Name:</p>
          <p className="text-xs py-2">John</p>
        </div>
        <div>
          <p className="font-bold">Phone Number:</p>
          <p className="text-xs py-2">6393640945</p>
        </div>
        <div>
          <p className="font-bold">Email:</p>
          <p className="text-xs py-2">Ayo@gmail.com</p>
        </div>
      </div>
    ),
  },
];

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

// Reusable Components
const StatsCard = ({ title, value }) => (
  <div className="bg-white h-24 rounded-xl border border-gray-300 p-4 place-content-center">
    <p className="mb-2 text-xs">{title}</p>
    <p className="font-bold text-lg">{value}</p>
  </div>
);

const StatusButton = ({ status, currentStatus, onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    className={`text-xs font-semibold border-none rounded focus:outline-none focus:ring-2 focus:ring-white ${
      currentStatus === status ? "bg-black text-white" : "bg-gray-200 text-black"
    }`}
  >
    {status}
  </Button>
);

const ItemsTable = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="w-full mt-4 rounded-xl border border-gray-300 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm table-fixed">
            <thead className="bg-gray-200 text-left sticky top-0 z-10">
              <tr>
                <th className="px-2 py-2 w-1/4 font-bold">Category</th>
                <th className="px-2 py-2 w-1/4 font-bold">Item</th>
                <th className="px-2 py-2 w-1/6 font-bold">Qty</th>
                <th className="px-2 py-2 w-1/3 font-bold">Special Instructions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-2 py-2 break-words">Furniture</td>
                <td className="px-2 py-2 break-words">Dinning Table</td>
                <td className="px-2 py-2">2</td>
                <td className="px-2 py-2 break-words text-xs text-gray-600">
                  No instruction added...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-t-xl border border-gray-300 mt-4">
      <Table className="min-w-full border-collapse table-auto">
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="bg-gray-200">
            <TableHead className="text-sm font-bold text-start px-2">Category</TableHead>
            <TableHead className="text-sm font-bold text-start px-2">Item</TableHead>
            <TableHead className="text-sm font-bold text-start px-2">Quantity</TableHead>
            <TableHead className="w-[500px] text-sm font-bold text-start px-2">
              Special Handling Instruction
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-start px-2">Furniture</TableCell>
            <TableCell className="text-start px-2">Dinning Table</TableCell>
            <TableCell className="text-start px-2">2</TableCell>
            <TableCell className="text-start px-2">No instruction added...</TableCell>
          </TableRow>
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
  onConfirm
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Go back</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Main Component
export default function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCompleted = () => {
    dispatch({ type: "MARK_COMPLETED" });
    toast.success("Move has been completed");
  };

  const handleCancel = () => {
    dispatch({ type: "MARK_CANCELED" });
    toast.error("Move has been Cancelled Successfully");
  };

  return (
    <div className="w-full min-h-screen md:mt-22">
      <div className="md:mt-4 fixed top-0 z-50">
        <DashboardHeader />
      </div>

      <div className="flex h-screen">
        <div className="py-10 md:py-6 px-6 mb-4 md:mb-0 mt-5 w-full">
          {/* Greeting Section */}
          <div className="flex gap-2 px-5">
            <p className="text-xs text-black font-bold">Good Morning, </p>
            <div className="flex gap-2">
              <span className="text-xs text-gray-400">Abdulrahman </span>
              <Image src={img} alt="sun image" height={20} width={20} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col gap-4 md:p-4 pt-6 w-full">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 w-full">
              <StatsCard title="Total moves:" value="32" />
              <StatsCard title="Upcoming moves:" value="32" />
              <StatsCard title="Completed moves:" value="32" />
              <StatsCard title="Cancelled moves:" value="32" />
            </div>

            {/* Recent Moves Section */}
            <div className="flex flex-col">
              <div className="border border-gray-300 h-24 md:h-16 p-2 rounded-t-md items-center flex flex-col md:flex-row justify-between md:p-4">
                <p className="font-montserrat font-bold text-sm leading-6 tracking-normal">
                  Recent Moves
                </p>
                <div className="flex items-center justify-center p-0.5 rounded border-gray-200 h-12 border gap-0">
                  <StatusButton
                    status="Completed"
                    currentStatus={state.status}
                    onClick={() =>
                      dispatch({ type: "SET_STATUS", payload: "Completed" })
                    }
                  />
                  <StatusButton
                    status="Pending"
                    currentStatus={state.status}
                    onClick={() =>
                      dispatch({ type: "SET_STATUS", payload: "pending" })
                    }
                  />
                </div>
              </div>

              {/* Move Details */}
              <div className="border border-gray-300 px-2 py-12 mb-12 md:p-4 w-full">
                {/* Move Header */}
                <div className="flex justify-between items-center">
                  <p className="lg:text-sm text-xs font-semibold">
                    Thur, Dec 32{" "}
                    <span className="text-gray-400 text-xs lg:text-sm block">
                      10:30pm to 12pm
                    </span>
                  </p>

                  {/* Actions */}
                  <div className="flex items-center">
                    <p className="text-green-500 text-xs lg:text-sm lg:font-semibold">
                      Completed
                    </p>

                    <DropdownMenu
                      open={state.openCompletion}
                      onOpenChange={(val) =>
                        dispatch({ type: "SET_OPEN_COMPLETION", payload: val })
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button aria-label="Open menu">
                          <EllipsisVertical className="text-teal-500 bg-teal-100 size-6" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onSelect={() =>
                            dispatch({ type: "TOGGLE_COMPLETE_DIALOG", payload: true })
                          }
                        >
                          <div className="flex gap-2 py-2 items-center text-sm cursor-pointer w-full">
                            <CircleCheck />
                            Mark move as completed
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onSelect={() =>
                            dispatch({ type: "TOGGLE_CANCEL_DIALOG", payload: true })
                          }
                        >
                          <div className="flex gap-2 items-center py-2 text-sm text-red-500 cursor-pointer w-full">
                            <CircleX />
                            Cancel appointment
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dialogs */}
                    <ConfirmationDialog
                      open={state.showCompleteDialog}
                      onOpenChange={(val) =>
                        dispatch({ type: "TOGGLE_COMPLETE_DIALOG", payload: val })
                      }
                      title="Mark move as completed?"
                      description="This action cannot be undone. Are you sure you want to Mark move as completed?"
                      confirmText="Yes, complete move."
                      onConfirm={handleCompleted}
                    />

                    <ConfirmationDialog
                      open={state.showCancelDialog}
                      onOpenChange={(val) =>
                        dispatch({ type: "TOGGLE_CANCEL_DIALOG", payload: val })
                      }
                      title="Cancel this move?"
                      description="This action cannot be undone. Are you sure you want to cancel this move request?"
                      confirmText="Yes, cancel move request."
                      onConfirm={handleCancel}
                    />
                  </div>
                </div>

                {/* Collapsible Move Details */}
                <Collapsible
                  open={state.isOpen}
                  onOpenChange={(val) => dispatch({ type: "SET_OPEN", payload: val })}
                >
                  <div className="py-6 w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex-1 p-0">
                        <p className="lg:text-sm text-xs font-semibold">
                          From:{" "}
                          <span className="text-gray-400 text-[10px] lg:text-sm">
                            123 Maple Street, Toronto
                          </span>
                          <span className="block gap-2">
                            To:{" "}
                            <span className="text-gray-400 text-xs lg:text-sm">
                              456 Wood Street, Toronto
                            </span>
                          </span>
                        </p>
                      </div>

                      <CollapsibleTrigger asChild>
                        <button className="border border-gray-300 rounded-md bg-white shadow-sm">
                          {state.isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </button>
                      </CollapsibleTrigger>
                    </div>
                  </div>

                  <CollapsibleContent className="w-full">
                    <div className="bg-white rounded-md">
                      {/* Desktop View */}
                      <div className="hidden lg:block">
                        <Tabs defaultValue="items" className="w-full">
                          <TabsList className="grid grid-cols-4 rounded-lg border border-gray-300 bg-white">
                            {accordionData.map(({ value, label }) => (
                              <TabsTrigger
                                key={value}
                                value={value}
                                className="w-full px-3 py-2 text-sm font-semibold rounded-md bg-white hover:bg-gray-100 transition-colors"
                              >
                                {label}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          <TabsContent value="items">
                            <ItemsTable />
                          </TabsContent>
                          {accordionData.map(({ value, content }) => (
                            <TabsContent key={value} value={value} className="mt-2 bg-white">
                              {content}
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>

                      {/* Mobile View */}
                      <div className="lg:hidden">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold">
                              Items to be moved
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                              <ItemsTable isMobile />
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="item-2">
                            <AccordionTrigger className="font-bold">
                              Accessibility & Logistics
                            </AccordionTrigger>
                            <AccordionContent>
                              {accordionData[1].content}
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="item-3">
                            <AccordionTrigger className="font-bold">
                              Movers & Assistance
                            </AccordionTrigger>
                            <AccordionContent>
                              {accordionData[2].content}
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="item-4">
                            <AccordionTrigger className="font-bold">
                              Contact Information
                            </AccordionTrigger>
                            <AccordionContent>
                              {accordionData[3].content}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}