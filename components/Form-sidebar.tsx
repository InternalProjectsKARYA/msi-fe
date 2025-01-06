"use client";
import React, { useState, useMemo, useEffect } from "react";
import { FiSettings, FiGrid, FiUserCheck, FiLock, FiCalendar, FiBookOpen, FiSun, FiFileText } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";
import Image from 'next/image';
import Logo from '../public/Website-Logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bell, BookDown, CalendarClock, CalendarCog, Clock, FileVideo, Hand, Handshake, Home, MailCheck, Users } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthContext } from "@/lib/AuthProvider";
import useThemeStore from "./ThemeContext";
 
 
interface User {
  user_name: string;
  email_id: string;
  // You can add more fields if needed, like `last_name`, `avatar`, etc.
}
 
 
 
 
// HRMS Navbar Items
const NavsidebarbarItems = () => {
 
 
 
 
 
  const items = [
    {
     
      items: [
       
       
        { label: "Dental Form", href: "/oral-health",  },
        { label: "Health Form", href: "/healthexamination",  },
       
      ],
    },
  ];
 
 
 
  //student and teacher role
 
// library role
 
 
 
// accounts role
 
 
 
// admin role
 
 
 
  return items;
};
 
 
export function FormSidebar() {
  const pathname = usePathname();
  const navbarItems = NavsidebarbarItems();
  const { Id } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const {themeColors} = useThemeStore();
 
  const toggleSubmenu = (label) => setOpenSubmenu((prev) => (prev === label ? null : label));
 
 
 
 
  return (
    <Sidebar collapsible="icon">
     
      <SidebarContent style={{ backgroundColor: themeColors.sidebarBackground }}>
        {navbarItems.map((section) => (
          <SidebarGroup key={section.sectionLabel}>
            <SidebarGroupLabel>{section.sectionLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    {item.hasSubmenu ? (
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className={`flex items-center gap-3 rounded-lg   text-muted-foreground transition-all hover:text-primary ${
                            pathname === item.href ? "bg-muted text-primary" : ""
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg   text-muted-foreground transition-all hover:text-primary ${
                            pathname === item.href ? "bg-muted text-primary" : ""
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
 
                    {item.hasSubmenu && openSubmenu === item.label && (
                      <div className="ml-2 transition-all space-y-1 bg-gray-100 dark:bg-gray-800 rounded">
                        <SidebarMenu>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuItem key={subItem.label}>
                              <SidebarMenuButton asChild>
                                <Link
                                  href={subItem.href}
                                  className={`flex items-center gap-2 rounded-lg   py-0 text-muted-foreground transition-all hover:text-primary ${
                                    pathname === subItem.href ? "bg-muted text-primary" : ""
                                  }`}
                                >
                                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                  <span className="ml-3 ">{subItem.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
     
    </Sidebar>
  );
}