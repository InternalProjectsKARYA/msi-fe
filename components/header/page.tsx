"use client"
import React, { useState, useEffect } from "react";
import { SidebarTrigger } from '../ui/sidebar'
import DynamicBreadcrumb from '../DynamicBreadcrumb'
import { ModeToggle } from '@/app/toggleMode/page'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import backgroundImage from "../../public/Welcome Banner-01.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Badge, Bell, Calendar, Calendar1, Clock, LogOut, Paperclip, Tag, User, Users   } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
//  import { User  } from "@/components/types/user";
import {   useRouter } from "next/navigation";
// import useThemeStore from '../ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "@/lib/axiosInstance";
import { useAuthContext } from "@/lib/AuthProvider";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { format } from "path";
import useThemeStore from "../ThemeContext";
 
 

interface UserType {
  user_name: string;
  email_id: string;
}

interface EventData {
  event_id: number;
  user_id: string;
  event_title: string;
  event_category: string;
  event_start_date: string;
  event_end_date: string;
  event_start_time: string | null;
  event_end_time: string | null;
  event_for: string[];
  event_description: string;
  attachment_url: string | null;
  event_status: boolean;
  created_tstamp: string;
  updated_tstamp: string | null;
  user_name: string;
}

const Header: React.FC = () => {
  const { Id } = useAuthContext();
  const notification = useThemeStore((state) => state.notifications);
 
  const router = useRouter();
 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    setUserRole(role);
    setUserEmail(email);
  }, []);
 

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUserRole(null);
    setUserEmail(null);
    router.push("/Auth/login");
  };
  

  const handleProfile = () => {
    router.push('/profile');
  };

  const openDialog = (event: EventData) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
  const [notifications, setNotifications] = useState<EventData[]>([]);
 // Add static data inside the useEffect for notifications
 useEffect(() => {
  const staticNotifications = [
    {
      event_id: 1,
      user_id: "user123",
      event_title: "School Annual Day",
      event_category: "Event",
      event_start_date: "2024-12-20",
      event_end_date: "2024-12-20",
      event_start_time: "10:00 AM",
      event_end_time: "01:00 PM",
      event_for: ["Students", "Teachers"],
      event_description: "Join us for the School Annual Day celebrations!",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-01T10:00:00Z",
      updated_tstamp: null,
      user_name: "Admin",
    },
    {
      event_id: 2,
      user_id: "user124",
      event_title: "Parent-Teacher Meeting",
      event_category: "Meeting",
      event_start_date: "2024-12-15",
      event_end_date: "2024-12-15",
      event_start_time: "09:00 AM",
      event_end_time: "12:00 PM",
      event_for: ["Parents", "Teachers"],
      event_description: "Discuss your child's progress with their teachers.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-05T11:00:00Z",
      updated_tstamp: null,
      user_name: "Admin",
    },
    {
      event_id: 3,
      user_id: "user125",
      event_title: "Science Exhibition",
      event_category: "Exhibition",
      event_start_date: "2024-12-18",
      event_end_date: "2024-12-18",
      event_start_time: "11:00 AM",
      event_end_time: "02:00 PM",
      event_for: ["Students", "Parents"],
      event_description: "Explore innovative projects created by students.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-03T09:00:00Z",
      updated_tstamp: null,
      user_name: "Teacher",
    },
    {
      event_id: 4,
      user_id: "user126",
      event_title: "Sports Day",
      event_category: "Sports",
      event_start_date: "2024-12-22",
      event_end_date: "2024-12-22",
      event_start_time: "08:00 AM",
      event_end_time: "05:00 PM",
      event_for: ["Students", "Teachers"],
      event_description: "Compete in a variety of sports and activities.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-06T08:00:00Z",
      updated_tstamp: null,
      user_name: "Coach",
    },
    {
      event_id: 5,
      user_id: "user127",
      event_title: "Art Competition",
      event_category: "Competition",
      event_start_date: "2024-12-19",
      event_end_date: "2024-12-19",
      event_start_time: "10:00 AM",
      event_end_time: "12:00 PM",
      event_for: ["Students"],
      event_description: "Showcase your artistic talents in this competition.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-07T10:30:00Z",
      updated_tstamp: null,
      user_name: "Art Teacher",
    },
    {
      event_id: 6,
      user_id: "user128",
      event_title: "Math Olympiad",
      event_category: "Competition",
      event_start_date: "2024-12-21",
      event_end_date: "2024-12-21",
      event_start_time: "09:00 AM",
      event_end_time: "11:00 AM",
      event_for: ["Students"],
      event_description: "Test your mathematical skills and compete for prizes.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-10T11:00:00Z",
      updated_tstamp: null,
      user_name: "Math Department",
    },
    {
      event_id: 7,
      user_id: "user129",
      event_title: "Christmas Carnival",
      event_category: "Festival",
      event_start_date: "2024-12-25",
      event_end_date: "2024-12-25",
      event_start_time: "04:00 PM",
      event_end_time: "09:00 PM",
      event_for: ["Students", "Parents", "Teachers"],
      event_description: "Celebrate Christmas with fun games and food stalls.",
      attachment_url: null,
      event_status: true,
      created_tstamp: "2024-12-15T14:00:00Z",
      updated_tstamp: null,
      user_name: "Admin",
    },
  ];

  setNotifications(staticNotifications);
}, []);



  const formatDate = (date: string) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };

  const formatTime = (time: string | null) => {
    if (!time) return '';
    return format(new Date(`2000-01-01T${time}`), 'h:mm a');
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 py-3.5  bg-gradient-to-r from-[#b6e1f3] to-[#159ED9] dark:from-neutral-800 dark:to-neutral-700 shadow w-full z-10 
  
      ">
        
        {/*     */}
        <div className='flex items-center'>
          <SidebarTrigger />
          <DynamicBreadcrumb />
        </div>
        {/* <Image
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 "
        style={{ opacity: 0.5 }}
      /> */}
        <div className='flex items-center gap-2 ml-auto'>
          <div className='flex gap-2'>
            {/* <Input
              placeholder="ask..."
              className="max-w-sm h-8 bg-white"
            /> */}
            <Button onClick={() => router.push("/ai-chat")} className='h-8'>Ask AI</Button>
          </div>
          <ModeToggle />
 
          <DropdownMenu>
            <DropdownMenuTrigger  asChild>
            <div className="relative">
                <Button variant="outline" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Bell style={{color:'#DA1E28'}}/>
                  {notification > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    >
                        {notification}
                    </span>
                  )}
                </Button>
              </div>
       
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-5 p-4 w-[300px] lg:w-[400px]" align="end">
              <DropdownMenuLabel className="flex items-center justify-between w-full">
                <div>
                  <p className="text-lg">Notifications ({notifications.length})</p>
                </div>
                <div className="flex gap-2 items-center " >
                 
                  <Link href="/announcements" className="flex-grow text-xs">
                    <Button>View All</Button>
                  </Link>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="h-[30vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {notifications.length > 0 ? (
                  notifications.map((event) => (
                    <DropdownMenuItem
                      key={event.event_id}
                      className="space-y-3 border-b flex cursor-pointer"
                      onClick={() => openDialog(event)}
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Notification Avatar" />
                      </Avatar>
                      <div>
                        <p className="font-medium">{event.event_title}</p>
                        <p className="text-sm text-gray-500">
                          {event.event_description.replace(/<\/?[^>]+(>|$)/g, "").length > 45
                            ? `${event.event_description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 45)}...`
                            : event.event_description.replace(/<\/?[^>]+(>|$)/g, "")}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(event.created_tstamp).toLocaleString()}</p>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-2">No notifications available.</p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 dark:text-white h-8 p-2 bg-white dark:bg-neutral-900">
               
                  <div className="flex items-center space-x-2 dark:text-white">
                    <span className="hidden text-black dark:text-white lg:block text-sm font-medium">
                    <p className="font-medium">{userRole ? userRole.toUpperCase() : "User"}</p>
                   
                    </span>
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                       
                      />
                    </Avatar>
                  </div>
               
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-3">
              
                <DropdownMenuLabel className="flex items-center dark:text-white gap-3 p-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      
                    />
                  </Avatar>
                  <div>
                  <p className="font-medium">{userRole ? userRole.toUpperCase() : "User"}</p>
                  <p className="text-sm text-gray-500">{userEmail || "No Email Found"}</p>

                  </div>
                </DropdownMenuLabel>
           
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile} className="flex items-center space-x-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader >
            <div className="flex gap-4  items-center">
            <Calendar className="w-5 h-5 text-gray-500  " />
            <DialogTitle className="text-2xl font-bold">{selectedEvent?.event_title || "Untitled Event"}</DialogTitle>
            </div>
        
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
             
              <span>
                {selectedEvent && formatDate(selectedEvent.event_start_date)}
                {selectedEvent && selectedEvent.event_end_date !== selectedEvent.event_start_date && 
                  ` - ${formatDate(selectedEvent.event_end_date)}`}
              </span>
            </div>
            {selectedEvent && (selectedEvent.event_start_time || selectedEvent.event_end_time) && (
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>
                  {formatTime(selectedEvent.event_start_time)}
                  {selectedEvent.event_end_time && ` - ${formatTime(selectedEvent.event_end_time)}`}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* <Users className="w-5 h-5 text-gray-500" /> */}
              {/* <span>{selectedEvent?.event_for.join(', ') || "All"}</span> */}
            </div>
            {selectedEvent?.event_category && (
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-gray-500" />
                <Badge variant="secondary">{selectedEvent.event_category}</Badge>
              </div>
            )}
            {/* <Separator /> */}
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedEvent?.event_description || "No description provided." }} />
            </div>
            {selectedEvent?.attachment_url && (
  <div className="flex items-center space-x-2">
    <Paperclip className="w-5 h-5 text-gray-500" />
    <a 
      href={selectedEvent.attachment_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:underline truncate"
      title={selectedEvent.attachment_url}
    >
      {selectedEvent.attachment_url.split('/').pop()} {/* Display the file name */}
    </a>
  </div>
)}

            <Separator />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Created by {selectedEvent?.user_name}</span>
              </div>
              {/* <span>ID: {selectedEvent?.event_id}</span> */}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Created: {selectedEvent && format(new Date(selectedEvent.created_tstamp), 'PPpp')}</span>
              {selectedEvent?.updated_tstamp && (
                <span>Updated: {format(new Date(selectedEvent.updated_tstamp), 'PPpp')}</span>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

 