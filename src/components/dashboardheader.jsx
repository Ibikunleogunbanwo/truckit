import React from 'react'
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from './ui/sidebar'

const DashboardHeader = ({ sectionLink = "#", sectionTitle = "" }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 mt-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block font-montserrat">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              {sectionLink !== "#" ? (
                <BreadcrumbLink href={sectionLink}>{sectionTitle}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{sectionTitle}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default DashboardHeader