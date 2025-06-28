"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import dashimg from "../assets/images/Dashboard.svg";
import dashimginActive from "../assets/images/DashboardInactive.svg";
import logo from "../assets/images/Group 10.png"
import reqimg from "../assets/images/RequestMove.svg"
import reqimgActive from "../assets/images/RequestMoveActive.svg"
import quotationimg from "../assets/images/QuotationActive.svg"
import quotationimgInactive from "../assets/images/Quotation.svg"
import manageuserinActive from "../assets/images/Manageaccount.svg"
import manageuserActive from "../assets/images/ManageAccountActive.svg"
import logout from "../assets/images/Logout.svg"
import { useSidebar } from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Ayo Ogunbanwo",
    email: "luli@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (active) => (
      <Image
        src={active ? dashimg : dashimginActive}
        alt="Dashboard"
        width={15}
        height={15}
        className="size-4"
      />
    ),
  },

  {
    title: "Request a move",
    url: "/request-move",
    icon: (active) => (
      <Image
        src={active ? quotationimg : quotationimgInactive}
        alt="QuotationIcon"
        width={15}
        height={15}
        className="size-4"
      />
    ),
  },

  {
    title: "Quotations",
    url: "/quotations",
    icon: (active) => (
      <Image
        src={active ? reqimgActive : reqimg}
        alt="RequestIcon"
        width={15}
        height={15}
        className="size-4"
      />
    ),
  },

  {
    title: "Manage account",
    url: "/dashboard/manage-account",
    icon: (active) => (
      <Image
        src={active ? manageuserActive : manageuserinActive}
        alt="userIcon"
        width={15}
        height={15}
        className="size-4"
      />
    ),
  },

  {
    title: "Sign out",
    url: "/dashboard/logout",
    icon: (active) => (
      <Image
        src={active ? logout : logout}
        alt="logoutIcon"
        width={15}
        height={15}
        className="size-4"
      />
    ),
  },
  

];



export function AppSidebar(props) {
  const pathname = usePathname();

  const { setOpenMobile, isMobile, setOpen } = useSidebar();

  const handleLeMobileClose = (url, forceMobileFalse = false) => {
    if (forceMobileFalse) {
      return;
    } 
    // Normal behavior - close mobile sidebar when clicking links
    if (isMobile) {
      setOpenMobile(false);
    }
  };





  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={logo} alt="logo" height={30} width={30} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-teal-500 font-extrabold">Truckit</span>
               
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      data-active={isActive}
                      className="transition-colors hover:bg-sidebar-accent"
                    >
                      <Link href={item.url} 
                      onClick={() => handleLeMobileClose(item.url, false)}
                      className="flex items-center gap-3">
                        <div className="flex items-center justify-center min-w-[1.5rem]">
                          {item.icon(isActive)}
                        </div>
                        <span
                          className={clsx(
                            "truncate",
                            isActive ? "font-medium" : "font-normal"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
