

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/Neuro pi_TEXT_11zon.jpg";
import backgroundImage from "../public/schoolitaly.c5.jpg";
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
  ClipboardCheck,
  DollarSign,
  FileText,
  Grid,
  BookOpen,
  UserCheck,
  Calendar,
  Sun,
  LogOut,
  MailCheck,
  MapPin,
  Shield,
  Users,
  Video,
  ChevronDown,
  ChevronRight,
  Settings,
  List,
  Briefcase,
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  CalendarClock,
  Wallet,
  BarChart2,
  Building2,
  Layers,
  ListChecks,
  IdCard,
} from "lucide-react";
import { FiBookOpen, FiCalendar, FiFileText, FiGrid, FiSun, FiUserCheck } from "react-icons/fi";
import CustomLogo from "./CustomLogo";
export function AppSidebar() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  // Define role-based menu items
  const sidebarItems: { [key: string]: SidebarGroup[] } = {
    admin: [
      {
        sectionLabel: "Main",
        items: [
          {
            label: "Admin Dashboard",
            href: "/admin-dashboard",
            icon: <BarChart className="h-4 w-4" />,
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
          { label: "Exam stats", href: "/admin-examreports", icon: <BarChart2 className="h-4 w-4" /> },
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
    ],
    student: [
      {
        sectionLabel: "Main",
        items: [
          {
            label: "Student Dashboard",
            href: "/student-dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        sectionLabel: "General",
        items: [
          { label: "Announcements", href: "/announcements", icon: <Bell className="h-4 w-4" /> },
          { label: "Conversations", href: "/chat", icon: <MailCheck className="h-4 w-4" /> },
          { label: "Holidays", href: "/holidaysEvent", icon: <CalendarDays className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "Academics",
        items: [
          { label: "Attendance", href: "/studentattendance", icon: <ClipboardCheck className="h-4 w-4" /> },
          { label: "Assessment", href: "/student-assessment-newgraph", icon: <GraduationCap className="h-4 w-4" /> },
          { label: "Leaves", href: "/leaves", icon: <UserCheck className="h-4 w-4" /> },
          { label: "Schedule", href: "/student-timetable", icon: <CalendarClock className="h-4 w-4" /> },
          { label: "CCTV", href: "/cctv-student", icon: <Video className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "Exams",
        items: [
          // { label: "Exam Stats", href: "/admin-examreports", icon: <BarChart2 className="h-4 w-4" /> },
          { label: "Report Card", href: "/report-cards", icon: <FileText className="h-4 w-4" /> },
        ],
      }
    ],
    teacher: [
      {
        sectionLabel: "Main",
        items: [
          {
            label: "Teacher Dashboard",
            href: "/teacher-dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        sectionLabel: "General",
        items: [
          { label: "Announcements", href: "/announcements", icon: <Bell className="h-4 w-4" /> },
          { label: "Conversations", href: "/chat", icon: <MailCheck className="h-4 w-4" /> },
          { label: "Holidays", href: "/holidaysEvent", icon: <CalendarDays className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "Academics",
        items: [
    
          { label: "Attendance", href: "/teacherattendance", icon: <ClipboardCheck className="h-4 w-4" /> },
          { label: "Schedule", href: "/subjects-slots", icon: <CalendarClock  className="h-4 w-4" /> },
          { label: "Leaves", href: "/leaves", icon: <UserCheck className="h-4 w-4" /> },
          { label: "Assessment", href: "/teacher-assessment", icon: <GraduationCap className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "Payroll",
        items: [
          { label: "Pay Slips", href: "/pay-slips", icon: <Wallet className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "Exams",
        items: [
          { label: "Exam stats", href: "/admin-examreports", icon: <FileText className="h-4 w-4" /> },
          { label: "Report Card", href: "/report-cards", icon: <FileText className="h-4 w-4" /> },
        ],
      },
    ],
    librarian: [
      {
        sectionLabel: "Main",
        items: [
          { label: "Library Stats", href: "/library", icon: <BarChart className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "General",
        items: [
          { label: "Announcements", href: "/announcements", icon: <Bell className="h-4 w-4" /> },
          { label: "Conversations", href: "/chat", icon: <MailCheck className="h-4 w-4" /> },
          { label: "Holidays", href: "/holidaysEvent", icon: <FiCalendar className="h-4 w-4" /> },
 
        ],
      },
      {
        sectionLabel: "Library Management",
        items: [
      
          { label: "Publisher", href: "/library/publisher", icon: <Building2 className="h-4 w-4" /> },
          { label: "Book Management", href: "/library/bookmanagement", icon: <BookOpen className="h-4 w-4" /> },
          { label: "Catalog Management", href: "/library/catalog", icon: <Layers className="h-4 w-4" /> },
          { label: "Book Assign", href: "/library/bookassign", icon: <ListChecks className="h-4 w-4" /> },
          { label: "Library Card", href: "/library/libraryCard", icon: <IdCard className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "PAYROLL",
        items: [
          { label: "Pay Slips", href: "/pay-slips", icon: <FileText className="h-4 w-4" /> },
        ],
      },
    ],
    accountant: [
      {
        sectionLabel: "Main",
        items: [
          { label: "Fee Stats", href: "/feeDetails", icon: <DollarSign className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "General",
        items: [
          { label: "Announcements", href: "/announcements", icon: <Bell className="h-4 w-4" /> },
          { label: "Conversations", href: "/chat", icon: <MailCheck className="h-4 w-4" /> },
          { label: "Holidays", href: "/holidaysEvent", icon: <FiCalendar className="h-4 w-4" /> },
    
        ],
      },
      {
        sectionLabel: "Accounts",
        items: [
     
          { label: "Fee List", href: "/feelist", icon: <List className="h-4 w-4" /> },
          { label: "Fee Management", href: "/feeManagement", icon: <Briefcase className="h-4 w-4" /> },
        ],
      },
      {
        sectionLabel: "PAYROLL",
        items: [
          { label: "Pay Slips", href: "/pay-slips", icon: <FileText className="h-4 w-4" /> },
        ],
      },
    ],
  };

  // Dynamically render the sidebar content
  const renderSidebarContent = () => {
    const pathname = usePathname();
    const userSections = sidebarItems[userRole || ""] || [];
    return userSections.map((section) => (
      <SidebarGroup key={section.sectionLabel}>
      <SidebarGroupLabel>{section.sectionLabel}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => {
            const isActive = pathname === item.href 
            const isSubmenuActive = item.subItems?.some((subItem) =>
              pathname.startsWith(subItem.href || "")
            );
  
            return (
              <SidebarMenuItem key={item.label}>
                {item.hasSubmenu ? (
                  <>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`flex items-center justify-between w-full text-[#14134e] gap-3 rounded-lg transition-all 
                           `}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
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
  
                    {/* ✅ Ensure submenu stays open after clicking sub-item */}
                    {openSubmenu === item.label && (
                      <div className="ml-4 mt-2 space-y-2 overflow-hidden">
                        <SidebarMenu>
                          {item.subItems?.map((subItem) => {
                            const isActiveSubItem = pathname.startsWith(subItem.href || "");
  
                            return (
                              <SidebarMenuItem key={subItem.label}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={subItem.href || "#"}
                                    className={`flex items-center gap-3 rounded-lg py-1 transition-all 
                                      ${isActiveSubItem ? "bg-orange-400 text-white" : "text-[#14134e] hover:text-primary"}`}
                                  >
                                    {subItem.icon}
                                    <span>{subItem.label}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </div>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href || "#"}
                      className={`flex items-center gap-3 rounded-lg transition-all dark:text-white
                        ${isActive ? "bg-orange-400 text-white" : "text-[#14134e] hover:text-primary"}`}
                    >
                      {item.icon}
                      <span className="dark:text-white">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    ));
  };

  return (
    <Sidebar collapsible="icon" className="bg-[radial-gradient(circle_at_center,_#c2e9fb,_white)] dark:bg-none">
      <div className="  z-50   flex justify-center items-center">
      {/* <Image src={Logo} alt="Logo" className="h-14 w-40 " /> */}
      <div className=" my-4">
      <CustomLogo height={20} width={40} />
      </div>
      </div>
  
      <SidebarContent >
        {/* <Image src={backgroundImage} alt="Background" className="absolute inset-0 w-full z-0 h-full object-cover opacity-25" /> */}
        {renderSidebarContent()}
      </SidebarContent>
    </Sidebar>
  );
}
