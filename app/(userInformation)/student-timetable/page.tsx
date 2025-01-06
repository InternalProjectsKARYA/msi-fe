import React from 'react';
import { Clock } from 'lucide-react'; // Assuming you're using Lucide icons
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
 

const ScheduleCard = ({ time, subject, student, bgColor }) => (
  <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
    <div className="flex items-center space-x-2 text-gray-700">
      <Clock size={16} />
      <span className="text-sm">{time}</span>
    </div>
    <div className="mt-2 text-sm font-semibold">Subject: {subject}</div>
    <div className="flex items-center mt-3">
    <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              </Avatar>
      <span className="ml-2 text-sm">{student}</span>
    </div>
  </div>
);

const StudentTimeTable = () => {
  // Sample data for each schedule card
  const scheduleData = [
    // Monday
    { day: "Monday", time: "09:00 - 09:45 AM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Monday", time: "09:45 - 10:30 AM", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Monday", time: "10:30 - 11:15 AM", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Monday", time: "11:15 - 12:00 PM", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Monday", time: "12:00 - 12:45 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Monday", time: "01:30 - 02:15 PM", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Monday", time: "02:15 - 03:00 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Tuesday
    { day: "Tuesday", time: "09:00 - 09:45 AM", subject: "Spanish", student: "Erickson", bgColor: "bg-blue-50", avatarUrl: "/images/erickson.png" },
    { day: "Tuesday", time: "09:45 - 10:30 AM", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Tuesday", time: "10:30 - 11:15 AM", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Tuesday", time: "11:15 - 12:00 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Tuesday", time: "12:00 - 12:45 PM", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Tuesday", time: "01:30 - 02:15 PM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Tuesday", time: "02:15 - 03:00 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Wednesday
    { day: "Wednesday", time: "09:00 - 09:45 AM", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Wednesday", time: "09:45 - 10:30 AM", subject: "Science", student: "Morgan", bgColor: "bg-blue-50", avatarUrl: "/images/morgan.png" },
    { day: "Wednesday", time: "10:30 - 11:15 AM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Wednesday", time: "11:15 - 12:00 PM", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Wednesday", time: "12:00 - 12:45 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Wednesday", time: "01:30 - 02:15 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
    { day: "Wednesday", time: "02:15 - 03:00 PM", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
  
    // Thursday
    { day: "Thursday", time: "09:00 - 09:45 AM", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Thursday", time: "09:45 - 10:30 AM", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Thursday", time: "10:30 - 11:15 AM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Thursday", time: "11:15 - 12:00 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Thursday", time: "12:00 - 12:45 PM", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Thursday", time: "01:30 - 02:15 PM", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Thursday", time: "02:15 - 03:00 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Friday
    { day: "Friday", time: "09:00 - 09:45 AM", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Friday", time: "09:45 - 10:30 AM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Friday", time: "10:30 - 11:15 AM", subject: "Science", student: "Morgan", bgColor: "bg-green-50", avatarUrl: "/images/morgan.png" },
    { day: "Friday", time: "11:15 - 12:00 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Friday", time: "12:00 - 12:45 PM", subject: "Biology", student: "Daniel", bgColor: "bg-pink-50", avatarUrl: "/images/daniel.png" },
    { day: "Friday", time: "01:30 - 02:15 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
    { day: "Friday", time: "02:15 - 03:00 PM", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
  
    // Saturday
    { day: "Saturday", time: "09:00 - 09:45 AM", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Saturday", time: "09:45 - 10:30 AM", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Saturday", time: "10:30 - 11:15 AM", subject: "Spanish", student: "Erickson", bgColor: "bg-yellow-50", avatarUrl: "/images/erickson.png" },
    { day: "Saturday", time: "11:15 - 12:00 PM", subject: "Science", student: "Morgan", bgColor: "bg-green-50", avatarUrl: "/images/morgan.png" },
    { day: "Saturday", time: "12:00 - 12:45 PM", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Saturday", time: "01:30 - 02:15 PM", subject: "Biology", student: "Daniel", bgColor: "bg-pink-50", avatarUrl: "/images/daniel.png" },
    { day: "Saturday", time: "02:15 - 03:00 PM", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
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
 
 
      <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-700   border rounded p-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-4 mt-4 dark:text-black">
        {groupedSchedule.map(({ day, schedule }) => (
          <div key={day} className="space-y-4 ">
            {schedule.map(({ time, subject, student, bgColor, avatarUrl }, index) => (
              <ScheduleCard
                key={index}
                time={time}
                subject={subject}
                student={student}
                bgColor={bgColor}
                avatarUrl={avatarUrl}

              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StudentTimeTable;
