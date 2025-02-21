// // components/EventCalendar.js
// "use client";
// import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//   CardContent,
//   CardHeader,
//   CardDescription,
//   Card,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import axiosInstance from "@/lib/axiosInstance";
 

// const localizer = momentLocalizer(moment);

// const CustomToolbar = ({ date, onNavigate, onView }) => {
//   const displayDate = moment(date).format("MMMM YYYY");

//   return (
//     <div className="flex items-center gap-2 justify-between mb-5 overflow-x-auto">
//       <div className="flex items-center space-x-2 whitespace-nowrap">
//         <Button onClick={() => onNavigate("PREV")} type="button" className="text-xs px-2 py-1 bg-[#a4171e]">
//           Previous
//         </Button>
//         <Button onClick={() => onNavigate("TODAY")} className="text-xs px-2 py-1  bg-[#6d933e]">
//           Today
//         </Button>
//         <Button onClick={() => onNavigate("NEXT")} className="text-xs px-2 py-1 bg-[#e1872b]">
//           Next
//         </Button>
//       </div>
//       <h3 className="text-lg font-bold whitespace-nowrap">{displayDate}</h3>
//       <div className="flex items-center space-x-2 whitespace-nowrap">
//         <Button onClick={() => onView("month")} className="text-xs px-2 py-1 bg-[#a4171e]">
//           Month
//         </Button>
//         <Button onClick={() => onView("week")} className="text-xs px-2 py-1 bg-[#6d933e]">
//           Week
//         </Button>
//         <Button onClick={() => onView("day")} className="text-xs px-2 py-1 bg-[#e1872b]">
//           Day
//         </Button>
//       </div>
//     </div>
//   );
// };

// const EventCalendar = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [view, setView] = useState("month");
//   const [isHolidayDialogOpen, setHolidayDialogOpen] = useState(false);
//   const [holidayName, setHolidayName] = useState("");
//   const [selectedEndDate, setSelectedEndDate] = useState("");

 

  
  

//   const handleAddEvent = () => setHolidayDialogOpen(true);

//   const createHoliday = async () => {
//     setHolidayDialogOpen(false);
    
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
//       <Card className="col-span-1 lg:col-span-12 space-y-6">
//         <div className="flex flex-wrap items-center p-4 gap-4 justify-between bg-[#f4b9bc]">
//           <div>
//             <CardHeader className="p-0">
//               <h2 className="text-xl font-bold">Holidays</h2>
//               <CardDescription className="text-sm text-gray-600">
             
//                   View and manage all holidays and events in this calendar.
            
//               </CardDescription>
//             </CardHeader>
//           </div>
//           <Button onClick={handleAddEvent} className="btn w-32 bg-[#da1e28]">
//             Add Holiday
//           </Button>
//         </div>
//         <CardContent>
//           <div style={{ height: "75vh", marginTop: "10px" }} className="">
//           <Calendar
//   localizer={localizer}
//   events={holidays}
//   startAccessor="start"
//   endAccessor="end"
//   className=" bg-[#e8f5fb] rounded"
//   style={{ height: "100%", padding: "10px" }}
//   views={["month", "week", "day"]}
//   view={view}
//   date={currentDate}
//   components={{
//     toolbar: (props) => <CustomToolbar {...props} date={currentDate} />,
//   }}
//   onNavigate={(newDate) => setCurrentDate(newDate)}
//   onView={setView}
//   eventPropGetter={(event) => {
//     // Array of cool background colors (light blues, purples, greens)
//     const coolColors = [

//  // Sky Blue
     
//       "#00CED1", // Dark Turquoise
//       "#48D1CC", // Medium Turquoise
//       "#AFEEEE", // Pale Turquoise
//       "#B0E0E6", // Powder Blue
      
//       "#66CDAA", // Medium Aquamarine
     
     
//       "#8FBC8F", // Dark Sea Green
//     ];

//     // Pick a random cool color from the array
//     const backgroundColor =
//       coolColors[Math.floor(Math.random() * coolColors.length)];

//     return {
//       style: {
//         backgroundColor, 
//         color: "#000000",  
//         borderRadius: "0px",  
//        display:'flex',
//        justifyContent:'center',
       
//         fontWeight: "500", 
//       },
//     };
//   }}
// />

//           </div>
//         </CardContent>
//       </Card>

      
      

//       <Dialog open={isHolidayDialogOpen} onOpenChange={setHolidayDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add Holiday</DialogTitle>
//             <DialogDescription>
//               Provide details for the new holiday here.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="mt-5">
//   <Label className="mb-2 block">Holiday For</Label>
//   <div className="flex space-x-4">
//     <label className="flex items-center space-x-2">
//       <input
//         type="radio"
//         name="eventFor"  
//         value="role_3"
//         className="form-radio cursor-pointer"
//       />
//       <span>Teachers</span>
//     </label>
//     <label className="flex items-center space-x-2">
//       <input
//         type="radio"
//         name="eventFor"  
//         value="role_4"
//         className="form-radio cursor-pointer"
//       />
//       <span>Students</span>
//     </label>
//     <label className="flex items-center space-x-2">
//       <input
//         type="radio"
//         name="eventFor"  
//         value="All"
//         className="form-radio cursor-pointer"
//       />
//       <span>Both</span>
//     </label>
//   </div>
// </div>

//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center">
//               <Label htmlFor="holidayName" className="text-left">
//                 Holiday
//               </Label>
//               <Input
//                 id="holidayName"
//                 placeholder="Holiday name"
//                 value={holidayName}
//                 onChange={(e) => setHolidayName(e.target.value)}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center">
//               <Label htmlFor="holidayDate" className="text-left">
//                 Date
//               </Label>
//               <Input
//                 id="holidayDate"
//                 type="date"
//                 value={selectedEndDate}
//                 onChange={(e) => setSelectedEndDate(e.target.value)}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" onClick={createHoliday}>
//               Save changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default EventCalendar;

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

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ date, onNavigate, onView }) => {
  const displayDate = moment(date).format("MMMM YYYY");

  return (
    <div className="flex items-center gap-2 justify-between mb-5 overflow-x-auto">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Button onClick={() => onNavigate("PREV")} className="text-xs px-2 py-1 bg-[#a4171e]">
          Previous
        </Button>
        <Button onClick={() => onNavigate("TODAY")} className="text-xs px-2 py-1 bg-[#6d933e]">
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
              className="bg-[#e8f5fb] rounded"
              style={{ height: "100%", padding: "10px" }}
              views={["month", "week", "day"]}
              view={view}
              date={currentDate}
              components={{
                toolbar: (props) => <CustomToolbar {...props} date={currentDate} />,
              }}
              onNavigate={(newDate) => setCurrentDate(newDate)}
              onView={setView}
              dayPropGetter={(date) => {
                if (moment(date).isSame(moment(), "day")) {
                  return {
                    style: {
                      backgroundColor: "#fbe9ea", // Gold color for today
                      color: "#000",
                    },
                  };
                }
              }}
            
              eventPropGetter={(event) => {
                const coolColors = [
                  "#e1872b", // Dark Turquoise
                  "#159ed9", // Medium Turquoise
                  "#c0b9cc", // Pale Turquoise
                  "#ffc000", // Powder Blue
                  "#da1e28", // Medium Aquamarine
                  "#8FBC8F", // Dark Sea Green
                ];

                const backgroundColor =
                  coolColors[Math.floor(Math.random() * coolColors.length)];

                // Check if the event is today
                const isToday = moment(event.start).isSame(moment(), "day");

                return {
                  style: {
                    backgroundColor: isToday ? "#FFD700" : backgroundColor, // Highlight today with gold
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                  },
                };
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isHolidayDialogOpen} onOpenChange={setHolidayDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Holiday</DialogTitle>
            <DialogDescription>
              Provide details for the new holiday here.
            </DialogDescription>
          </DialogHeader>
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
            <Button type="submit" onClick={() => setHolidayDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
