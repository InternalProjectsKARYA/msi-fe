"use client"

import React from 'react'
import { Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

const ScheduleCell = ({ time, subject, student, bgColor, avatarUrl }) => {
  const router = useRouter()

  return (
    <div
      className={`${bgColor} hover:shadow-md transition-shadow cursor-pointer p-2 rounded-md`}
      onClick={() => router.push(`/student-assessment-new/${subject.toLowerCase()}`)}
    >
      <div className="flex items-center space-x-2 text-gray-700">
        <Clock size={14} />
        <span className="text-xs">{time}</span>
      </div>
      <div className="flex items-center mt-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={avatarUrl} alt={student} />
        </Avatar>
        <div className="ml-2">
          <div className="text-xs text-gray-500">{student}</div>
          <div className="text-sm font-semibold text-gray-800">{subject}</div>
        </div>
      </div>
    </div>
  )
}

const StudentTimeTable = () => {
  const scheduleData = [
    // Monday
    { day: "Monday", time: "09:00 - 09:45", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Monday", time: "09:45 - 10:30", subject: "English", student: "Anjali Reddy", bgColor: "bg-blue-50", avatarUrl: "/images/anjali.png" },
    { day: "Monday", time: "10:30 - 11:15", subject: "Physics", student: "Divya Sharma", bgColor: "bg-yellow-50", avatarUrl: "/images/divya.png" },
    { day: "Monday", time: "11:15 - 12:00", subject: "Computer", student: "Vijay Kumar", bgColor: "bg-green-50", avatarUrl: "/images/vijay.png" },
    { day: "Monday", time: "12:00 - 12:45", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Monday", time: "01:30 - 02:15", subject: "Biology", student: "Priya Devi", bgColor: "bg-pink-50", avatarUrl: "/images/priya.png" },
    { day: "Monday", time: "02:15 - 03:00", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
  
    // Tuesday
    { day: "Tuesday", time: "09:00 - 09:45", subject: "Spanish", student: "Sita Lakshmi", bgColor: "bg-blue-50", avatarUrl: "/images/sita.png" },
    { day: "Tuesday", time: "09:45 - 10:30", subject: "Physics", student: "Divya Sharma", bgColor: "bg-yellow-50", avatarUrl: "/images/divya.png" },
    { day: "Tuesday", time: "10:30 - 11:15", subject: "Computer", student: "Vijay Kumar", bgColor: "bg-green-50", avatarUrl: "/images/vijay.png" },
    { day: "Tuesday", time: "11:15 - 12:00", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Tuesday", time: "12:00 - 12:45", subject: "Biology", student: "Priya Devi", bgColor: "bg-pink-50", avatarUrl: "/images/priya.png" },
    { day: "Tuesday", time: "01:30 - 02:15", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Tuesday", time: "02:15 - 03:00", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
  
    // Wednesday
    { day: "Wednesday", time: "09:00 - 09:45", subject: "Computer", student: "Vijay Kumar", bgColor: "bg-green-50", avatarUrl: "/images/vijay.png" },
    { day: "Wednesday", time: "09:45 - 10:30", subject: "Science", student: "Priya Devi", bgColor: "bg-blue-50", avatarUrl: "/images/priya.png" },
    { day: "Wednesday", time: "10:30 - 11:15", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Wednesday", time: "11:15 - 12:00", subject: "English", student: "Anjali Reddy", bgColor: "bg-blue-50", avatarUrl: "/images/anjali.png" },
    { day: "Wednesday", time: "12:00 - 12:45", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Wednesday", time: "01:30 - 02:15", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
    { day: "Wednesday", time: "02:15 - 03:00", subject: "Physics", student: "Divya Sharma", bgColor: "bg-yellow-50", avatarUrl: "/images/divya.png" },
  
    // Thursday
    { day: "Thursday", time: "09:00 - 09:45", subject: "Physics", student: "Divya Sharma", bgColor: "bg-yellow-50", avatarUrl: "/images/divya.png" },
    { day: "Thursday", time: "09:45 - 10:30", subject: "Computer", student: "Vijay Kumar", bgColor: "bg-green-50", avatarUrl: "/images/vijay.png" },
    { day: "Thursday", time: "10:30 - 11:15", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Thursday", time: "11:15 - 12:00", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Thursday", time: "12:00 - 12:45", subject: "English", student: "Anjali Reddy", bgColor: "bg-blue-50", avatarUrl: "/images/anjali.png" },
    { day: "Thursday", time: "01:30 - 02:15", subject: "Biology", student: "Priya Devi", bgColor: "bg-pink-50", avatarUrl: "/images/priya.png" },
    { day: "Thursday", time: "02:15 - 03:00", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
  
    // Friday
    { day: "Friday", time: "09:00 - 09:45", subject: "English", student: "Anjali Reddy", bgColor: "bg-blue-50", avatarUrl: "/images/anjali.png" },
    { day: "Friday", time: "09:45 - 10:30", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Friday", time: "10:30 - 11:15", subject: "Science", student: "Priya Devi", bgColor: "bg-green-50", avatarUrl: "/images/priya.png" },
    { day: "Friday", time: "11:15 - 12:00", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Friday", time: "12:00 - 12:45", subject: "Biology", student: "Vijay Kumar", bgColor: "bg-pink-50", avatarUrl: "/images/vijay.png" },
    { day: "Friday", time: "01:30 - 02:15", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
    { day: "Friday", time: "02:15 - 03:00", subject: "Physics", student: "Divya Sharma", bgColor: "bg-yellow-50", avatarUrl: "/images/divya.png" },
  
    // Saturday
    { day: "Saturday", time: "09:00 - 09:45", subject: "English", student: "Anjali Reddy", bgColor: "bg-blue-50", avatarUrl: "/images/anjali.png" },
    { day: "Saturday", time: "09:45 - 10:30", subject: "Maths", student: "Arun Kumar", bgColor: "bg-red-50", avatarUrl: "/images/arun.png" },
    { day: "Saturday", time: "10:30 - 11:15", subject: "Spanish", student: "Sita Lakshmi", bgColor: "bg-yellow-50", avatarUrl: "/images/sita.png" },
    { day: "Saturday", time: "11:15 - 12:00", subject: "Science", student: "Priya Devi", bgColor: "bg-green-50", avatarUrl: "/images/priya.png" },
    { day: "Saturday", time: "12:00 - 12:45", subject: "Chemistry", student: "Rajesh Reddy", bgColor: "bg-purple-50", avatarUrl: "/images/rajesh.png" },
    { day: "Saturday", time: "01:30 - 02:15", subject: "Biology", student: "Vijay Kumar", bgColor: "bg-pink-50", avatarUrl: "/images/vijay.png" },
    { day: "Saturday", time: "02:15 - 03:00", subject: "History", student: "Ravi Kiran", bgColor: "bg-indigo-50", avatarUrl: "/images/ravi.png" },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = [
    "09:00 - 09:45",
    "09:45 - 10:30",
    "10:30 - 11:15",
    "11:15 - 12:00",
    "12:00 - 12:45",
    "01:30 - 02:15",
    "02:15 - 03:00"
  ]

  const getScheduleForDayAndTime = (day, time) => {
    return scheduleData.find(item => item.day === day && item.time === time)
  }

  return (
<div className="grid grid-cols-12 gap-4">
 

  {/* Table Section */}
  <div className="col-span-12">
    <Card className="w-full flex flex-col">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-semibold">Class Schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <ScrollArea>
          <Table className="w-full table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100 text-center font-semibold">
                <TableHead className="w-1/12">Time</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="w-1/12">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((timeSlot) => (
                <TableRow key={timeSlot} className="border-b">
                  <TableCell className="font-medium">{timeSlot}</TableCell>
                  {days.map((day) => {
                    const schedule = getScheduleForDayAndTime(day, timeSlot)
                    return (
                      <TableCell key={`${day}-${timeSlot}`} className="p-2">
                        {schedule && (
                          <ScheduleCell
                            time={schedule.time}
                            subject={schedule.subject}
                            student={schedule.student}
                            bgColor={schedule.bgColor}
                            avatarUrl={schedule.avatarUrl}
                          />
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
</div>

  
  
  
  )
}

export default StudentTimeTable

