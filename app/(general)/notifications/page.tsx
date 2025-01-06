"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MoreVertical, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Tiptap from '@/components/Tiptap';
import "./notifications.css";
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";


export default function NoticeBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [isEventDialogOpen, setisEventDialogOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [value, setValue] = useState('');// State to hold Tiptap value
  const [Error, setError] = useState('');
  const [fetchedAnnouncements, setFetchedAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    user_id: "YpR3z0",
    event_title: "",
    event_category: "",
    event_start_date: "",
    event_end_date: "",
    event_start_time: "",
    event_end_time: "",
    event_description: "",
    attachment_url: null,
    event_for: ["All"],
  });


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get(`/events`);
        setFetchedAnnouncements(response.data.data);
      } catch (error) {
        console.error("Error fetching announcements:", error.response ? error.response.data : error.message);
      }
    };
    fetchAnnouncements();
  }, []);


  const filteredAnnouncements = fetchedAnnouncements.filter((announcement) =>
    announcement.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAnnouncement = async () => {
    try {
      if (!newAnnouncement.event_title || !editorValue.trim()) {
        setError("Title and description are required.");
        return;
      }

      const payload = {
        ...newAnnouncement,
        event_description: editorValue,
        event_for: newAnnouncement.event_for,
      };

      const response = await axiosInstance.post("/event", payload);

      toast({
        title: "Success",
        description: "Announcement added successfully!",
        variant: "default",
      });

      // Refresh announcements list
      const updatedAnnouncements = await axiosInstance.get("/get_all_announcements/");
      setFetchedAnnouncements(updatedAnnouncements.data.data);

      // Reset form
      setNewAnnouncement({
        user_id: "",
        event_title: "",
        event_category: "",
        event_start_date: "",
        event_end_date: "",
        event_start_time: "",
        event_end_time: "",
        event_description: "",
        attachment_url: null,
        event_for: ["All"],
      });
      setEditorValue("");
      setisEventDialogOpen(false);
    } catch (error) {
      console.error("Error adding announcement:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: "Failed to add announcement.",
        variant: "destructive",
      });
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setNewAnnouncement({ ...newAnnouncement, event_description: value });
  };



  // const handleEditorChange = (value: string) => {
  //   setEditorValue(value); // Update state when editor content changes
  //   setNewAnnouncement({ ...newAnnouncement, message: editorValue })
  //   if (isEmptyContent(value)) {
  //     setError("Content cannot be empty."); // Show error if editor content is empty
  //   } else {
  //     setError(""); // Clear error if there is content
  //   }
  // };
  const isEmptyContent = (value: string) => {
    const strippedContent = value.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags and trim whitespace
    return strippedContent === ""; // If there's no meaningful content, return true
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if editor value is empty or contains only empty tags
    if (isEmptyContent(editorValue)) {
      setError("Content cannot be empty.");
      return; // Prevent form submission if the editor is empty
    }
    setValue(editorValue);
    setEditorValue('')
  };


  return (
    <div className='p-5'>
      <h2 className="text-xl font-semibold">Announcements</h2>
      <p className="text-sm text-gray-500 mb-4">Manage and keep track of all the latest announcements for your organization.</p>

      <div className="flex items-center ">
        <Input
          placeholder="Filter by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
          <Button onClick={() => setisEventDialogOpen(true)} className="hover:bg-opacity-90 flex items-center space-x-2">
            <span>Add Announcement</span>
          </Button>
        </div>
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
                    checked={newAnnouncement.event_for.includes("All")}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_for: ["All"] })}
                    className="form-radio cursor-pointer"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="role_3"
                    checked={newAnnouncement.event_for.includes("role_3")}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_for: ["role_3"] })}
                    className="form-radio cursor-pointer"
                  />
                  <span>Teachers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="role_4"
                    checked={newAnnouncement.event_for.includes("role_4")}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_for: ["role_4"] })}
                    className="form-radio cursor-pointer"
                  />
                  <span>Students</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="role_6"
                    checked={newAnnouncement.event_for.includes("role_6")}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_for: ["role_6"] })}
                    className="form-radio cursor-pointer"
                  />
                  <span>Staffs</span>
                </label>
              </div>
            </div>


            {/* Event Title */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="announcementTitle" className="text-left">Event Title</Label>
              <Input
                id="announcementTitle"
                type="text"
                placeholder="Enter Title"
                value={newAnnouncement.event_title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_title: e.target.value })}
                className="col-span-3"
              />
            </div>

            {/* Event Category */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="eventCategory" className="text-left">Event Category</Label>
              <Input
                id="announcementTitle"
                name=''
                type="text"
                placeholder="Event Category"
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_title: e.target.value })}
                className="col-span-3"
              />
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="startDate" className="text-left">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newAnnouncement.event_start_date}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_start_date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="endDate" className="text-left">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newAnnouncement.event_end_date}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_end_date: e.target.value })}
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
                  value={newAnnouncement.event_start_time}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_start_time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="endTime" className="text-left">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newAnnouncement.event_end_time}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, event_end_time: e.target.value })}
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
              <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg notificationstyling">

                <Tiptap description={editorValue} onChange={handleEditorChange} />


              </div>

            </div>

            {/* Attachment */}
            <div>
              <Label className="text-left mb-2 block">Attachment</Label>
              <div className="border border-gray-200 rounded-md p-3">
                <p className="text-xs text-gray-500 mb-2">Upload size of 4MB, Accepted Format PDF</p>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </Button>
                {/* {newAnnouncement.attachment && (
                  <p className="text-sm mt-2">{newAnnouncement.attachment.name}</p>
                )} */}
              </div>
            </div>

          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setisEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddAnnouncement}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.event_id} className="flex items-center px-4 shadow-sm bg-gray-50">
            <Checkbox className="mr-4" />
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-600" />
              <CardContent className="flex-1  items-center">
                <CardTitle className="font-semibold text-md  pt-2 ">{announcement.event_title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">Added on: {new Date(announcement.created_tstamp).toLocaleDateString()}</CardDescription>
              </CardContent>
              {/* Display HTML content */}

              <div
                className="announcement-message"
                dangerouslySetInnerHTML={{
                  __html: announcement.event_description,
                }}
              />


              <DropdownMenu>
                <div className='flex justify-end'>
                  <DropdownMenuTrigger asChild >
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {filteredAnnouncements.length} of {fetchedAnnouncements.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
