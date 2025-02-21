// components/EventCalendar.js
"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CardContent,
  CardHeader,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import axiosInstance from "@/lib/axiosInstance";
 

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ date, onNavigate, onView }) => {
  const displayDate = moment(date).format("MMMM YYYY");

  return (
    <div className="flex items-center gap-2 justify-between mb-5 overflow-x-auto">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Button onClick={() => onNavigate("PREV")} type="button" className="text-xs px-2 py-1 bg-[#a4171e]">
          Previous
        </Button>
        <Button onClick={() => onNavigate("TODAY")} className="text-xs px-2 py-1  bg-[#6d933e]">
          Today
        </Button>
        <Button onClick={() => onNavigate("NEXT")} className="text-xs px-2 py-1 bg-[#e1872b]">
          Next
        </Button>
      </div>
      <h3 className="text-lg font-bold whitespace-nowrap">{displayDate}</h3>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Button onClick={() => onView("month")} className="text-xs px-2 py-1 bg-[#a4171e]">
          Month
        </Button>
        <Button onClick={() => onView("week")} className="text-xs px-2 py-1 bg-[#6d933e]">
          Week
        </Button>
        <Button onClick={() => onView("day")} className="text-xs px-2 py-1 bg-[#e1872b]">
          Day
        </Button>
      </div>
    </div>
  );
};

const EventCalendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [isHolidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

 
  const [userRole, setUserRole] = useState<string | null>(null);
 

  useEffect(() => {
    // Retrieve the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);
  
  

  const handleAddEvent = () => setHolidayDialogOpen(true);

  const createHoliday = async () => {
    setHolidayDialogOpen(false);
    
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
      <Card className="col-span-1 lg:col-span-12 space-y-6">
        <div className="flex flex-wrap items-center p-4 gap-4 justify-between bg-[#f4b9bc]">
          <div>
            <CardHeader className="p-0">
              <h2 className="text-xl font-bold">Holidays</h2>
              <CardDescription className="text-sm text-gray-600">
             
                  View and manage all holidays and events in this calendar.
            
              </CardDescription>
            </CardHeader>
          </div>
          
          {userRole === "admin" && (
        <Button onClick={handleAddEvent} className="btn w-32 bg-[#da1e28]">
        Add Holiday
      </Button>
      )}
        </div>
        <CardContent>
          <div style={{ height: "75vh", marginTop: "10px" }}>
          <Calendar
  localizer={localizer}
  events={holidays}
  startAccessor="start"
  endAccessor="end"
  className="dark:bg-gray-800 rounded"
  style={{ height: "100%", padding: "10px" }}
  views={["month", "week", "day"]}
  view={view}
  date={currentDate}
  components={{
    toolbar: (props) => <CustomToolbar {...props} date={currentDate} />,
  }}
  onNavigate={(newDate) => setCurrentDate(newDate)}
  onView={setView}
  eventPropGetter={(event) => {
    // Array of cool background colors (light blues, purples, greens)
    const coolColors = [
      "#ADD8E6", // Light Blue
      "#87CEEB", // Sky Blue
     
      "#00CED1", // Dark Turquoise
      "#48D1CC", // Medium Turquoise
      "#AFEEEE", // Pale Turquoise
      "#B0E0E6", // Powder Blue
      
      "#66CDAA", // Medium Aquamarine
     
     
      "#8FBC8F", // Dark Sea Green
    ];

    // Pick a random cool color from the array
    const backgroundColor =
      coolColors[Math.floor(Math.random() * coolColors.length)];

    return {
      style: {
        backgroundColor, 
        color: "#000000",  
        borderRadius: "0px",  
       display:'flex',
       justifyContent:'center',
       
        fontWeight: "500", 
      },
    };
  }}
/>


          </div>
        </CardContent>
      </Card>

      {/* <Card className="col-span-1 lg:col-span-4">
        <CardHeader className="mt-5">
          <h2 className="text-lg font-bold">Events</h2>
          <CardDescription className="text-sm text-gray-600">
            
              Stay updated with the latest events and notifications.
           
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center p-3 dark:bg-gray-900 rounded-lg border-l-4 border-${notification.color}-500 `}
              >
                <span className="text-xl mr-2">{notification.icon}</span>
                <div className="flex flex-col flex-grow">
                  <span className="font-semibold">{notification.title}</span>
                  <span className="text-gray-500">{notification.time}</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                </Avatar>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      <Dialog open={isHolidayDialogOpen} onOpenChange={setHolidayDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Holiday</DialogTitle>
            <DialogDescription>
              Provide details for the new holiday here.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5">
  <Label className="mb-2 block">Holiday For</Label>
  <div className="flex space-x-4">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="eventFor"  
        value="role_3"
        className="form-radio cursor-pointer"
      />
      <span>Teachers</span>
    </label>
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="eventFor"  
        value="role_4"
        className="form-radio cursor-pointer"
      />
      <span>Students</span>
    </label>
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="eventFor"  
        value="All"
        className="form-radio cursor-pointer"
      />
      <span>Both</span>
    </label>
  </div>
</div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="holidayName" className="text-left">
                Holiday
              </Label>
              <Input
                id="holidayName"
                placeholder="Holiday name"
                value={holidayName}
                onChange={(e) => setHolidayName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="holidayDate" className="text-left">
                Date
              </Label>
              <Input
                id="holidayDate"
                type="date"
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createHoliday}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
