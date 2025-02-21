"use client"

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const announcements = [
  {
    event_id: 1,
    event_title: "School Annual Day",
    created_tstamp: "2023-05-15T10:00:00Z",
    event_description:
      "Join us for our annual day celebration filled with performances and awards.",
    avatar: "https://i.pravatar.cc/150?img=1",
    bg:"bg-[#fcf3ea]"
  
  },
  {
    event_id: 2,
    event_title: "Parent-Teacher Meeting",
    created_tstamp: "2023-05-20T14:30:00Z",
    event_description:
      "Discuss your child's progress with their teachers in our quarterly meeting.",
    avatar: "https://i.pravatar.cc/150?img=2",
     bg:"bg-[#e8f5fb]"
  },
  {
    event_id: 3,
    event_title: "Science Fair",
    created_tstamp: "2023-06-01T09:00:00Z",
    event_description:
      "Explore innovative projects at our annual science fair. Open to all grades.",
    avatar: "https://i.pravatar.cc/150?img=3",
     bg:"bg-[#ebe8ef]"
  },
  {
    event_id: 4,
    event_title: "Sports Day",
    created_tstamp: "2023-06-10T08:00:00Z",
    event_description:
      "Cheer for your house in various athletic events during our sports day.",
    avatar: "https://i.pravatar.cc/150?img=4",
     bg:"bg-[#fff9e6]"
  },
  {
    event_id: 5,
    event_title: "Book Fair",
    created_tstamp: "2023-06-15T11:00:00Z",
    event_description:
      "Discover new worlds at our annual book fair. Special discounts for students!",
    avatar: "https://i.pravatar.cc/150?img=5",
     bg:"bg-[#fbe9ea]"
  },
  {
    event_id: 6,
    event_title: "Career Guidance Seminar",
    created_tstamp: "2023-06-25T13:00:00Z",
    event_description:
      "Learn about various career paths from industry experts. For grades 9-12.",
    avatar: "https://i.pravatar.cc/150?img=6",
     bg:"bg-[#f2f6ec]"
  },
  {
    event_id: 7,
    event_title: "Art Exhibition",
    created_tstamp: "2023-07-05T10:30:00Z",
    event_description:
      "Admire the creativity of our students at the annual art exhibition.",
    avatar: "https://i.pravatar.cc/150?img=7",
     bg:"bg-[#fcf3ea]"
  },
  {
    event_id: 8,
    event_title: "Environmental Awareness Day",
    created_tstamp: "2023-07-15T09:30:00Z",
    event_description:
      "Participate in eco-friendly activities and learn about sustainability.",
    avatar: "https://i.pravatar.cc/150?img=8",
     bg:"bg-[#e8f5fb]"
  },
  {
    event_id: 9,
    event_title: "Music Concert",
    created_tstamp: "2023-07-25T18:00:00Z",
    event_description:
      "Enjoy performances by our talented music students and special guests.",
    avatar: "https://i.pravatar.cc/150?img=9",
     bg:"bg-[#ebe8ef]"
  },
  {
    event_id: 10,
    event_title: "Graduation Ceremony",
    created_tstamp: "2023-08-01T16:00:00Z",
    event_description:
      "Celebrate the achievements of our graduating class of 2023.",
    avatar: "https://i.pravatar.cc/150?img=10",
     bg:"bg-[#fff9e6]"
  },
];

export default function AnnouncementsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const [isEventDialogOpen, setisEventDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [userRole, setUserRole] = useState<string | null>(null);
 

  useEffect(() => {
    // Retrieve the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Card className="space-y-6   p-5">
      <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="text-blue-600  " />
            Events & Announcements
          </CardTitle>
          <CardDescription>
            Detailed description of Announcements
          </CardDescription>
             {/* Action Buttons */}
             <div className="mt-4 sm:mt-0 sm:ml-4 flex  justify-end space-x-2">
             {userRole === "admin" || userRole ==="teacher"  && (
        <Button onClick={() => setisEventDialogOpen(true)}>Add Events</Button>
      )}
              </div>
        </CardHeader>

        {/* Announcements List */}
        <div className="space-y-4">
          {currentAnnouncements.map((announcement) => (
            <Card
              key={announcement.event_id}
              className={`flex flex-col sm:flex-row items-start sm:items-center p-3 px-4 shadow-md ${announcement.bg} rounded-lg border border-gray-200 dark:bg-gray-800`}
            >
              <div className="flex items-center sm:mr-4 mb-3 sm:mb-0">
                <Avatar>
                  <AvatarImage
                    src={announcement.avatar}
                    className="h-[6vh] rounded"
                    alt={`Avatar for ${announcement.event_title}`}
                  />
                  <AvatarFallback>
                    {announcement.event_title.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Announcement Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-600 h-5 w-5" />
                  <h3 className="font-semibold text-lg">
                    {announcement.event_title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Added on: {new Date(announcement.created_tstamp).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="mt-2 text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: announcement.event_description,
                  }}
                />
              </div>

           
            </Card>
          ))}
        </div>

        <Dialog open={isEventDialogOpen} onOpenChange={setisEventDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>New Event</DialogTitle>
            <DialogDescription>Add details for the new event here.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Event For */}
            <div>
  <Label className="mb-2 block">Event For</Label>
  <div className="flex space-x-4">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        value="All"
        
        className="form-radio cursor-pointer"
      />
      <span>All</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="radio"
        value="role_3"
       
        className="form-radio cursor-pointer"
      />
      <span>Teachers</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="radio"
        value="role_4"
    
        className="form-radio cursor-pointer"
      />
      <span>Students</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="radio"
        value="role_6"
        
        className="form-radio cursor-pointer"
      />
      <span>Staffs</span>
    </label>
  </div>
</div>





            <div className="grid grid-cols-2 gap-6">
  {/* Left Column */}
  <div className="flex flex-col space-y-2">
    {/* Event Title */}
    <div>
      <Label
        htmlFor="announcementTitle"
        className="text-left mb-1 block text-sm font-medium text-gray-700"
      >
        Event Title
      </Label>
      <Input
        id="announcementTitle"
        type="text"
        placeholder="Enter Title"
       
        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Event Category */}
    <div>
      <Label
        htmlFor="eventCategory"
        className="text-left mb-1 block text-sm font-medium text-gray-700"
      >
        Event Category
      </Label>
      <Input
        id="eventCategory"
        type="text"
        placeholder="Event Category"
        
        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Right Column */}
  <div>
    {/* Attachment */}
    <div>
  <Label className="text-left mb-1 block text-sm font-medium text-gray-700">
    Attachment
  </Label>
  <div className="border border-gray-300 rounded-md p-5 bg-gray-50">
    <p className="text-xs text-gray-500 mb-3">
      Upload size of 4MB, Accepted Format PDF
    </p>
    <Input
      type="file"
     
      
   
      id="fileUpload"
    />
 
 
  </div>
</div>

  </div>
</div>

        

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="startDate" className="text-left">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="endDate" className="text-left">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
              
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Start Time & End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-4 items-center ">
                <Label htmlFor="startTime" className="text-left ">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                 
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="endTime" className="text-left">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  
                  className="col-span-3"
                />
              </div>
            </div>



            {/* Message */}
            <div className="flex flex-col">
              <div className="grid grid-cols-4 items-start">
                <Label htmlFor="announcementMessage" className="text-left my-2 col-span-1">
                  Message
                </Label>
              </div>
              <div className="w-full max-w-xl bg-white    notificationstyling">

              


              </div>

            </div>

            {/* Attachment */}
          

          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setisEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setisEventDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50 bg-[#b6e1f3]" : "bg-[#b6e1f3]"
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={
                  currentPage === totalPages ? "pointer-events-none opacity-50 bg-[#159ED9]" : "bg-[#159ED9]"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </>
  );
}
