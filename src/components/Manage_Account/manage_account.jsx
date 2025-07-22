"use client";

import { ChevronRight, User2, Calendar1Icon, CreditCardIcon, ShieldCheckIcon, PhoneCallIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";


const iconMap = {
  User2,
  Calendar1Icon,
  ShieldCheckIcon,
  CreditCardIcon,
  PhoneCallIcon
};

const ManageAccount = ({ icon = "User2", header, text, link }) => {
  const router = useRouter();
  const Icon = iconMap[icon] || User2;

  const handleClick = () => {
    router.push(link);
  };

  return (
    <div className="pt-4" >
      <div className="px-6 py-5 md:py-2 border border-gray-200 rounded-xl space-y-2 h-40 md:h-44">
        <Icon size={24} />
        
        <div className="flex items-center justify-between">
          <p className="text-black font-semibold text-sm my-2">{header}</p>
          <div onClick={handleClick} className="cursor-pointer text-sm">
            <ChevronRight size={16} />
          </div>
        </div>

        <p className="text-gray-600 text-xs pr-4 md:leading-relaxed text-justify">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ManageAccount;