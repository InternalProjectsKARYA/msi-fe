import React from 'react';
import { Clock } from 'lucide-react'; // Assuming you're using Lucide icons
 
import { Card, CardTitle } from '@/components/ui/card';
 

const ScheduleCard = ({ time, ClassRoom,   bgColor, RoomNo }) => (
  <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
    <div className="flex items-center space-x-2 text-gray-700">
      <Clock size={16} />
      <span className="text-sm">{time}</span>
    </div>
    <div className="mt-2 text-sm font-semibold">ClassRoom: {ClassRoom}</div>
    <div className="flex items-center mt-3">
   
      <span className="  text-sm font-semibold">Room no: {RoomNo}</span>
    </div>
  </div>
);

const TimeTable = () => {
  // Sample data for each schedule card
  const scheduleData = [
    // Monday
    { day: "Monday", time: "09:00 - 09:45 AM", ClassRoom: "VII(B)", bgColor: "bg-red-50", RoomNo: "102" },
    { day: "Monday", time: "09:45 - 10:30 AM", ClassRoom: "III(C)", bgColor: "bg-orange-50", RoomNo: "102" },
    { day: "Monday", time: "10:30 - 11:15 AM", ClassRoom: "XI(A)", bgColor: "bg-amber-50", RoomNo: "102" },
    { day: "Monday", time: "11:15 - 12:00 PM", ClassRoom: "X(B)", bgColor: "bg-yellow-50", RoomNo: "102" },
    { day: "Monday", time: "12:00 - 12:45 PM", ClassRoom: "V(B)", bgColor: "bg-lime-50", RoomNo: "102" },
    { day: "Monday", time: "01:30 - 02:15 PM", ClassRoom: "I(B)", bgColor: "bg-green-50", RoomNo: "102" },
    { day: "Monday", time: "02:15 - 03:00 PM", ClassRoom: "I(A)", bgColor: "bg-teal-50", RoomNo: "102" },
  
    // Tuesday
    { day: "Tuesday", time: "09:00 - 09:45 AM", ClassRoom: "III(C)", bgColor: "bg-cyan-50", RoomNo: "102" },
    { day: "Tuesday", time: "09:45 - 10:30 AM", ClassRoom: "X(B)", bgColor: "bg-sky-50", RoomNo: "102" },
    { day: "Tuesday", time: "10:30 - 11:15 AM", ClassRoom: "XI(A)", bgColor: "bg-blue-50", RoomNo: "102" },
    { day: "Tuesday", time: "11:15 - 12:00 PM", ClassRoom: "V(B)", bgColor: "bg-indigo-50", RoomNo: "102" },
    { day: "Tuesday", time: "12:00 - 12:45 PM", ClassRoom: "VII(B)", bgColor: "bg-purple-50", RoomNo: "102" },
    { day: "Tuesday", time: "01:30 - 02:15 PM", ClassRoom: "I(A)", bgColor: "bg-pink-50", RoomNo: "102" },
    { day: "Tuesday", time: "02:15 - 03:00 PM", ClassRoom: "I(B)", bgColor: "bg-rose-50", RoomNo: "102" },
  
    // Wednesday
    { day: "Wednesday", time: "09:00 - 09:45 AM", ClassRoom: "I(A)", bgColor: "bg-red-50", RoomNo: "102" },
    { day: "Wednesday", time: "09:45 - 10:30 AM", ClassRoom: "III(C)", bgColor: "bg-orange-50", RoomNo: "102" },
    { day: "Wednesday", time: "10:30 - 11:15 AM", ClassRoom: "V(B)", bgColor: "bg-amber-50", RoomNo: "102" },
    { day: "Wednesday", time: "11:15 - 12:00 PM", ClassRoom: "III(C)", bgColor: "bg-yellow-50", RoomNo: "102" },
    { day: "Wednesday", time: "12:00 - 12:45 PM", ClassRoom: "I(B)", bgColor: "bg-lime-50", RoomNo: "102" },
    { day: "Wednesday", time: "01:30 - 02:15 PM", ClassRoom: "XI(A)", bgColor: "bg-green-50", RoomNo: "102" },
    { day: "Wednesday", time: "02:15 - 03:00 PM", ClassRoom: "X(B)", bgColor: "bg-teal-50", RoomNo: "102" },
  
    // Thursday
    { day: "Thursday", time: "09:00 - 09:45 AM", ClassRoom: "VII(B)", bgColor: "bg-cyan-50", RoomNo: "102" },
    { day: "Thursday", time: "09:45 - 10:30 AM", ClassRoom: "X(B)", bgColor: "bg-sky-50", RoomNo: "102" },
    { day: "Thursday", time: "10:30 - 11:15 AM", ClassRoom: "XI(A)", bgColor: "bg-blue-50", RoomNo: "102" },
    { day: "Thursday", time: "11:15 - 12:00 PM", ClassRoom: "V(B)", bgColor: "bg-indigo-50", RoomNo: "102" },
    { day: "Thursday", time: "12:00 - 12:45 PM", ClassRoom: "I(B)", bgColor: "bg-purple-50", RoomNo: "102" },
    { day: "Thursday", time: "01:30 - 02:15 PM", ClassRoom: "III(C)", bgColor: "bg-pink-50", RoomNo: "102" },
    { day: "Thursday", time: "02:15 - 03:00 PM", ClassRoom: "I(A)", bgColor: "bg-rose-50", RoomNo: "102" },
  
    // Friday
    { day: "Friday", time: "09:00 - 09:45 AM", ClassRoom: "I(A)", bgColor: "bg-red-50", RoomNo: "102" },
    { day: "Friday", time: "09:45 - 10:30 AM", ClassRoom: "III(C)", bgColor: "bg-orange-50", RoomNo: "102" },
    { day: "Friday", time: "10:30 - 11:15 AM", ClassRoom: "I(B)", bgColor: "bg-amber-50", RoomNo: "102" },
    { day: "Friday", time: "11:15 - 12:00 PM", ClassRoom: "III(C)", bgColor: "bg-yellow-50", RoomNo: "102" },
    { day: "Friday", time: "12:00 - 12:45 PM", ClassRoom: "V(B)", bgColor: "bg-lime-50", RoomNo: "102" },
    { day: "Friday", time: "01:30 - 02:15 PM", ClassRoom: "XI(A)", bgColor: "bg-green-50", RoomNo: "102" },
    { day: "Friday", time: "02:15 - 03:00 PM", ClassRoom: "X(B)", bgColor: "bg-teal-50", RoomNo: "102" },
  
    // Saturday
    { day: "Saturday", time: "09:00 - 09:45 AM", ClassRoom: "III(C)", bgColor: "bg-cyan-50", RoomNo: "102" },
    { day: "Saturday", time: "09:45 - 10:30 AM", ClassRoom: "I(A)", bgColor: "bg-sky-50", RoomNo: "102" },
    { day: "Saturday", time: "10:30 - 11:15 AM", ClassRoom: "XI(A)", bgColor: "bg-blue-50", RoomNo: "102" },
    { day: "Saturday", time: "11:15 - 12:00 PM", ClassRoom: "X(B)", bgColor: "bg-indigo-50", RoomNo: "102" },
    { day: "Saturday", time: "12:00 - 12:45 PM", ClassRoom: "VII(B)", bgColor: "bg-purple-50", RoomNo: "102" },
    { day: "Saturday", time: "01:30 - 02:15 PM", ClassRoom: "V(B)", bgColor: "bg-pink-50", RoomNo: "102" },
    { day: "Saturday", time: "02:15 - 03:00 PM", ClassRoom: "I(B)", bgColor: "bg-rose-50", RoomNo: "102" },
  ];
  
  

  // Group data by days
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const groupedSchedule = days.map((day) => ({
    day,
    schedule: scheduleData.filter((item) => item.day === day),
  }));

  return (
    <Card className="p-6">
         <CardTitle className="text-2xl font-semi-bold px-1 mb-2 ">Schedule </CardTitle>
 
 
      <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-700   border rounded p-2 ">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-4 mt-4 dark:text-black">
        {groupedSchedule.map(({ day, schedule }) => (
          <div key={day} className="space-y-4 ">
            {schedule.map(({ time, ClassRoom,   bgColor, RoomNo }, index) => (
              <ScheduleCard
              
                key={index}
                time={time}
                ClassRoom={ClassRoom}
               
                bgColor={bgColor}
                RoomNo={RoomNo}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TimeTable;
