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
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const [notifications, setNotifications] = useState<EventData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get<{ user: UserType }>(`/get_user/?user_id=${Id}`);
        setUser(response.data.user);
      } catch (error: any) {
        console.error("Error fetching user details:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserDetails();
  }, [Id]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/events');
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem('token');
    router.push('/Auth/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const openDialog = (event: EventData) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const SkeletonDemo = () => (
    <div className="flex items-center space-x-2 dark:text-white">
      <div className="space-y-1">
        <Skeleton className="h-2 w-[120px] bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-2 w-[80px] bg-gray-300 dark:bg-gray-700" />
      </div>
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      </Avatar>
    </div>
  );

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
            <Input
              placeholder="ask..."
              className="max-w-sm h-8 bg-white"
            />
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
            <DropdownMenuContent className="mt-5 p-4 w-[300px] lg:w-[450px]" align="end">
              <DropdownMenuLabel className="flex items-center justify-between w-full">
                <div>
                  <p className="text-lg">Notifications ({notifications.length})</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" className="cursor-pointer">
                    Mark All As Read
                  </Button>
                  <Link href="/announcements" className="flex-grow">
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
                {user?.user_name ? (
                  <div className="flex items-center space-x-2 dark:text-white">
                    <span className="hidden text-black dark:text-white lg:block text-sm font-medium">
                      {user.user_name}
                    </span>
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={user.user_name}
                      />
                    </Avatar>
                  </div>
                ) : (
                  <SkeletonDemo />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-3">
              {user?.user_name ? (
                <DropdownMenuLabel className="flex items-center dark:text-white gap-3 p-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={user.user_name}
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.user_name}</p>
                    <p className="text-sm text-gray-500">{user.email_id}</p>
                  </div>
                </DropdownMenuLabel>
              ) : (
                <SkeletonDemo />
              )}
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

 