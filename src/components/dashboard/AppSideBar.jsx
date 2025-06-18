import React from 'react'
import {Home} from "lucide-react"
import { HomeIcon, InboxIcon,CalendarIcon,SearchIcon, SettingsIcon } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Link from 'next/link'

const items = [
    {
      title: "Home",
      url: "#",
      icon: HomeIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: InboxIcon,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ]


const AppSideBar = () => {
  return (
    <div className='mt-16'>
   <Sidebar variant='sidebar'>
<SidebarContent className="">
<SidebarGroup>
    <SidebarGroupContent>
        <SidebarMenu>
            {items.map(item=>
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                        <Link href={item.url} />
                        <item.icon/>
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )}
        </SidebarMenu>
    </SidebarGroupContent>
</SidebarGroup>
</SidebarContent>



<SidebarFooter>

</SidebarFooter>

   </Sidebar>  
   </div>
  )
}

export default AppSideBar
