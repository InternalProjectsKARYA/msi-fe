"use client";

import React, { useState } from "react";
import {
  FiSettings,
  FiGrid,
  FiUserCheck,
  FiCalendar,
  FiBookOpen,
  FiSun,
  FiFileText,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import backgroundImage from "../public/schoolitaly.c5.jpg";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logoitaly.jpeg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart,
  Bell,
  Book,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  DollarSign,
  FileText,
  Home,
  List,
  LogOut,
  MailCheck,
  MapPin,
  Settings,
  Shield,
  UserCheck,
  Users,
  Video,
} from "lucide-react";

interface NavbarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  hasSubmenu?: boolean;
  subItems?: NavbarItem[];
}

interface SidebarSection {
  sectionLabel: string;
  items: NavbarItem[];
}

 

export function AppSidebar() {
 
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
   

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  const navbarItems: SidebarSection[] = [
    {
      sectionLabel: "Main",
      items: [
        {
          label: "Dashboards",
          icon: <FiGrid className="h-4 w-4" />, // Updated main icon
          hasSubmenu: true,
          subItems: [
            {
              label: "Admin Dashboard",
              href: "/admin-dashboard",
              icon: <BarChart className="h-4 w-4" />, // Updated icon
            },
            {
              label: "Teacher Dashboard",
              href: "/teacher-dashboard",
              icon: <ClipboardCheck className="h-4 w-4" />, // Updated icon
            },
            {
              label: "Student Dashboard",
              href: "/student-dashboard",
              icon: <Users className="h-4 w-4" />, // Updated icon
            },
            // {
            //   label: "Parent Dashboard",
            //   href: "/parent-dashboard",
            //   icon: <UserCheck className="h-4 w-4" />, // Updated icon
            // },
          ],
        },
      ],
    },
    {
      sectionLabel: "General",
      items: [
        { label: "Announcements", href: "/announcements", icon: <Bell className="h-4 w-4" /> },
        { label: "Conversations", href: "/chat", icon: <MailCheck className="h-4 w-4" /> },
        { label: "Holidays", href: "/holidaysEvent", icon: <FiCalendar className="h-4 w-4" /> },
        { label: "Attendance", href: "/admin-attendance", icon: <ClipboardCheck className="h-4 w-4" /> },
        { label: "Leaves", href: "/admin-leave", icon: <LogOut className="h-4 w-4" /> },
        { label: "CCTV", href: "/cctv", icon: <Video  className="h-4 w-4" /> },
      ],
    },
    {
      sectionLabel: "USERS",
      items: [
        {
          label: "Student",
          icon: <Users className="h-4 w-4" />,
          hasSubmenu: true,
          subItems: [
            { label: "Attendance", href: "/studentattendance" },
            { label: "Assessment", href: "/student-assessment-newgraph" },
            { label: "Leaves", href: "/leaves" },
            { label: "Schedule", href: "/student-timetable" },
            { label: "CCTV", href: "/cctv-student", icon: <Video  className="h-4 w-4" /> },
          ],
        },
        {
          label: "Teacher",
          icon: <UserCheck className="h-4 w-4" />,
          hasSubmenu: true,
          subItems: [
            // { label: "Schedule", href: "/teacher-timetable" },
            {
              label: "Holidays",
              href: "/holidaysEvent",
             
            },
            { label: "Attendance", href: "/teacherattendance" },
            { label: "Schedule", href: "/subjects-slots" },
            { label: "Leaves", href: "/leaves" },
            { label: "Assessment", href: "/teacher-assessment" },
          ],
        },
      ],
    },
    {
      sectionLabel: "Organization",
      items: [
        { label: "Members", href: "/user", icon: <Users className="h-4 w-4" /> },
        { label: "Payroll", href: "/pay-roll", icon: <FileText className="h-4 w-4" /> },
        { label: "School branches", href: "/maps", icon: <MapPin className="h-4 w-4" /> },
        // { label: "Forms", href: "/Registration", icon: <Users className="h-4 w-4" /> },
      ],
    },
    {
      sectionLabel: "Library Management",
      items: [
        { label: "Library Stats", href: "/library", icon: <BarChart className="h-4 w-4" /> },
        {
          label: "Book Management",
          hasSubmenu: true,
          subItems: [
            { label: "Publisher", href: "/library/publisher" },
            { label: "Book Management", href: "/library/bookmanagement" },
            { label: "Catalog Management", href: "/library/catalog" },
            { label: "Book Assign", href: "/library/bookassign" },
            { label: "Library Card", href: "/library/libraryCard" },
          ],
        },
      ],
    },
    {
      sectionLabel: "Accounts",
      items: [
        { label: "Fee Stats", href: "/feeDetails", icon: <DollarSign className="h-4 w-4" /> },
        { label: "Fee List", href: "/feelist", icon: <List className="h-4 w-4" /> },
        { label: "Fee Management", href: "/feeManagement", icon: <Briefcase className="h-4 w-4" /> },
      ],
    },
    {
      sectionLabel: "Exams",
      items: [
        { label: "Exam stats", href: "/admin-examreports", icon: <FileText className="h-4 w-4" /> },
        // { label: "Exam Management", href: "/exams", icon: <FileText className="h-4 w-4" /> },
        { label: "Report Card", href: "/report-cards", icon: <FileText className="h-4 w-4" /> },
      ],
    },
    {
      sectionLabel: "PAYROLL",
      items: [
        { label: "Pay Slips", href: "/pay-slips", icon: <FileText className="h-4 w-4" /> },
      ],
    },
    {
      sectionLabel: "CONFIGURATIONS",
      items: [
        { label: "Config", href: "/config", icon: <Settings className="h-4 w-4" /> },
        { label: "Class Settings", href: "/class", icon: <FiBookOpen className="h-4 w-4" /> },
        { label: "Class Rooms", href: "/classroom", icon: <FiGrid className="h-4 w-4" /> },
        { label: "Role", href: "/role", icon: <FiUserCheck className="h-4 w-4" /> },
        { label: "Permissions", href: "/permission", icon: <Shield className="h-4 w-4" /> },
        { label: "Leave Types", href: "/leavetypes", icon: <ClipboardCheck className="h-4 w-4" /> },
        { label: "Holidays", href: "/holidays", icon: <FiSun className="h-4 w-4" /> },
        { label: "Policies", href: "/policies", icon: <FiFileText className="h-4 w-4" /> },
      ],
    },
  ];
  

  const renderSidebarContent = () => {
    return navbarItems.map((section) => (
      <SidebarGroup key={section.sectionLabel}>
        <SidebarGroupLabel>{section.sectionLabel}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {section.items.map((item) => (
              <SidebarMenuItem key={item.label}>
                {item.hasSubmenu ? (
                  <>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center justify-between w-full gap-3 rounded-lg dark:text-white text-[#14134e] hover:text-primary transition-all"
                      >
                        <div className="flex items-center gap-3 dark:text-white">
                          {item.icon}
                          <span className="dark:text-white">{item.label}</span>
                        </div>
                        <span
                          className={`transition-transform duration-300 ease-in-out ${
                            openSubmenu === item.label ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          {openSubmenu === item.label ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </SidebarMenuButton>
                    {openSubmenu === item.label && (
                      <div className="ml-4 mt-2 space-y-2 overflow-hidden dark:text-white">
                        <SidebarMenu>
                          {item.subItems?.map((subItem) => (
                            <SidebarMenuItem key={subItem.label}>
                              <SidebarMenuButton asChild>
                                <Link
                                  href={subItem.href || "#"}
                                  className="flex items-center gap-3 rounded-lg py-1 text-[#14134e] hover:text-primary"
                                >
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </div>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href || "#"}
                      className="flex items-center gap-3 rounded-lg text-[#14134e] hover:text-primary"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ));
  };

  return (
    <Sidebar collapsible="icon" className="">
      <Image src={Logo} alt="Logo" className="bg-[#159ED9] z-50 mb-4" />
      <SidebarContent className="">
        <Image
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 "
          style={{ opacity: 0.25 }}
        />
        {renderSidebarContent()}
      </SidebarContent>
    </Sidebar>
  );
}
