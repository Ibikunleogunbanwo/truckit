import DashboardHeader from "@/components/dashboardheader";
import React from "react";
import ManageAccount from "@/components/Manage_Account/manage_account";

const page = () => {
  return (
    <div className="h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full">
        <DashboardHeader />
      </div>
      
      {/* Main Content - Add top padding to account for fixed header */}
      <div className="pt-16 sm:pt-20 pb-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Page Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Manage Account
            </h1>
            <p className="text-xs sm:text-xs text-gray-600 mt-3">
              Update your account settings and preferences
            </p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <ManageAccount
              icon="User2"
              header="Personal Information"
              link="/account/personal-info"
              text="Update your details for seamless booking. Edit name, phone, email, and profile picture."
            />

            <ManageAccount
              icon="CreditCardIcon"
              header="Payment & Billing"
              link="/account/payment"
              text="Manage payment methods, set defaults, and track transactions and invoices."
            />

            <ManageAccount
              icon="ShieldCheckIcon"
              header="Security & Privacy"
              link="/account/privacy"
              text="Change password, manage privacy settings, and request account deletion if needed."
            />

            <ManageAccount
              icon="Calendar1Icon"
              header="Booking History"
              link="/account/bookings"
              text="View past moves with details, driver info, and mover records."
            />

            <ManageAccount
              icon="PhoneCallIcon"
              header="Help & Support"
              link="/account/support"
              text="Access FAQs, contact support, and review Terms of Service and Privacy Policy."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;