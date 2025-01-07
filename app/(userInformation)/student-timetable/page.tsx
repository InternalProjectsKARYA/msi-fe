"use client"

import React from 'react'
import { Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const ScheduleCard = ({ time, subject, student, bgColor }) => {
  const router = useRouter()

  return (
<Card
  className={`${bgColor} hover:shadow-md transition-shadow cursor-pointer`}
  onClick={() => router.push(`/student-assessment-new/${subject.toLowerCase()}`)}
>
  <CardContent className="p-3">
    {/* Time Section */}
    <div className="flex items-center space-x-2 text-gray-700">
      <Clock size={14} />
      <span className="text-xs">{time}</span>
    </div>

    {/* Avatar and Details Section */}
    <div className="flex items-center mt-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        {/* <AvatarFallback>CN</AvatarFallback> */}
      </Avatar>
      <div className="ml-3">
        <div className="text-xs text-gray-500">{student}</div>
        <div className="text-sm font-semibold text-gray-800">{subject}</div>
      </div>
    </div>
  </CardContent>
</Card>

  )
}

const StudentTimeTable = () => {
  const scheduleData = [
    // Monday
    { day: "Monday", time: "09:00 - 09:45", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Monday", time: "09:45 - 10:30", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Monday", time: "10:30 - 11:15", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Monday", time: "11:15 - 12:00", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Monday", time: "12:00 - 12:45", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Monday", time: "01:30 - 02:15", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Monday", time: "02:15 - 03:00", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Tuesday
    { day: "Tuesday", time: "09:00 - 09:45", subject: "Spanish", student: "Erickson", bgColor: "bg-blue-50", avatarUrl: "/images/erickson.png" },
    { day: "Tuesday", time: "09:45 - 10:30", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Tuesday", time: "10:30 - 11:15", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Tuesday", time: "11:15 - 12:00", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Tuesday", time: "12:00 - 12:45", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Tuesday", time: "01:30 - 02:15", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Tuesday", time: "02:15 - 03:00", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Wednesday
    { day: "Wednesday", time: "09:00 - 09:45", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Wednesday", time: "09:45 - 10:30", subject: "Science", student: "Morgan", bgColor: "bg-blue-50", avatarUrl: "/images/morgan.png" },
    { day: "Wednesday", time: "10:30 - 11:15", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Wednesday", time: "11:15 - 12:00", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Wednesday", time: "12:00 - 12:45", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Wednesday", time: "01:30 - 02:15", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
    { day: "Wednesday", time: "02:15 - 03:00", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
  
    // Thursday
    { day: "Thursday", time: "09:00 - 09:45", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
    { day: "Thursday", time: "09:45 - 10:30", subject: "Computer", student: "Daniel", bgColor: "bg-green-50", avatarUrl: "/images/daniel.png" },
    { day: "Thursday", time: "10:30 - 11:15", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Thursday", time: "11:15 - 12:00", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Thursday", time: "12:00 - 12:45", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Thursday", time: "01:30 - 02:15", subject: "Biology", student: "Morgan", bgColor: "bg-pink-50", avatarUrl: "/images/morgan.png" },
    { day: "Thursday", time: "02:15 - 03:00", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  
    // Friday
    { day: "Friday", time: "09:00 - 09:45", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Friday", time: "09:45 - 10:30", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Friday", time: "10:30 - 11:15", subject: "Science", student: "Morgan", bgColor: "bg-green-50", avatarUrl: "/images/morgan.png" },
    { day: "Friday", time: "11:15 - 12:00", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Friday", time: "12:00 - 12:45", subject: "Biology", student: "Daniel", bgColor: "bg-pink-50", avatarUrl: "/images/daniel.png" },
    { day: "Friday", time: "01:30 - 02:15", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
    { day: "Friday", time: "02:15 - 03:00", subject: "Physics", student: "Teresa", bgColor: "bg-yellow-50", avatarUrl: "/images/teresa.png" },
  
    // Saturday
    { day: "Saturday", time: "09:00 - 09:45", subject: "English", student: "Hellana", bgColor: "bg-blue-50", avatarUrl: "/images/hellana.png" },
    { day: "Saturday", time: "09:45 - 10:30", subject: "Maths", student: "Jacquelin", bgColor: "bg-red-50", avatarUrl: "/images/jacquelin.png" },
    { day: "Saturday", time: "10:30 - 11:15", subject: "Spanish", student: "Erickson", bgColor: "bg-yellow-50", avatarUrl: "/images/erickson.png" },
    { day: "Saturday", time: "11:15 - 12:00", subject: "Science", student: "Morgan", bgColor: "bg-green-50", avatarUrl: "/images/morgan.png" },
    { day: "Saturday", time: "12:00 - 12:45", subject: "Chemistry", student: "Aaron", bgColor: "bg-purple-50", avatarUrl: "/images/aaron.png" },
    { day: "Saturday", time: "01:30 - 02:15", subject: "Biology", student: "Daniel", bgColor: "bg-pink-50", avatarUrl: "/images/daniel.png" },
    { day: "Saturday", time: "02:15 - 03:00", subject: "History", student: "Alice", bgColor: "bg-indigo-50", avatarUrl: "/images/alice.png" },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const groupedSchedule = days.map((day) => ({
    day,
    schedule: scheduleData.filter((item) => item.day === day),
  }))

  return (
    <Card className="w-full min-h-screen flex flex-col">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-semibold">Class Schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="grid grid-cols-6 gap-4 text-center font-semibold text-gray-700 bg-gray-100 p-3 sticky top-0 z-10">
          {days.map((day) => (
            <div key={day} className="text-sm">{day}</div>
          ))}
        </div>
        <ScrollArea className=" ">
          <div className="grid grid-cols-6 gap-4 mt-4">
            {groupedSchedule.map(({ day, schedule }) => (
              <div key={day} className="space-y-4">
                {schedule.map((item, index) => (
                  <ScheduleCard
                    key={index}
                    time={item.time}
                    subject={item.subject}
                    student={item.student}
                    bgColor={item.bgColor}
                    avatarUrl={item.avatarUrl}
                  />
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default StudentTimeTable

