"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent,   CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // You can use this for the update status
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import backgroundImage from "../../../public/schoolitaly.c4.jpg";
import Image from 'next/image'
import {   Pie, PieChart,   } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {        BookOpen, CalendarDays, ChevronLeft, Clock, GraduationCap, Sun, Trophy, Users,   } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
 
} from "@/components/ui/chart"
 
 
 
import  { useRouter } from 'next/navigation';
 
import { Calendar1,ChevronDown, Bus  , ChevronRight   } from 'lucide-react'
 
import { Progress } from '@/components/ui/progress';
import { useAuthContext } from "@/lib/AuthProvider";  
import axiosInstance from "@/lib/axiosInstance";  
import { ScrollBar } from '@/components/ui/scroll-area';
 

export type Details = {
  id: string;
 name: string;
  class: string;
 section: string;
  marks: string;
 exams: string;
 status: "pass"| 'fail'
};


interface User {
  user_name: string;
  email_id: string;
  // You can add more fields if needed, like `last_name`, `avatar`, etc.
}

const TeacherDashboard = () => {
  const router = useRouter(); 
  
  const [user, setUser] = useState<User | null>(null);
 
  const fetchedAnnouncements = [
    {
      event_title: "School Annual Day",
      event_start_date: "2024-12-20",
      event_start_time: "10:00 AM",
      event_end_time: "01:00 PM",
    },
    {
      event_title: "Parent-Teacher Meeting",
      event_start_date: "2024-12-15",
      event_start_time: "09:00 AM",
      event_end_time: "12:00 PM",
    },
    {
      event_title: "Science Exhibition",
      event_start_date: "2024-12-18",
      event_start_time: "11:00 AM",
      event_end_time: "02:00 PM",
    },
 
  ];

 
 
  const NoticeBoard = [
    {
      type: "Exam Schedule Released",
      icon: CalendarDays,
      date: "10 Jun 2024",
      bg_color: "bg-green-100",
      text_color: "text-green-500",
    },
    {
      type: "New Syllabus Instructions",
      icon: BookOpen,
      date: "15 Jun 2024",
      bg_color: "bg-blue-100",
      text_color: "text-blue-500",
    },
    {
      type: "Holiday Notification",
      icon: Sun,
      date: "20 Jun 2024",
      bg_color: "bg-yellow-100",
      text_color: "text-yellow-500",
    },
    {
      type: "Parent-Teacher Meeting",
      icon: Users,
      date: "25 Jun 2024",
      bg_color: "bg-red-100",
      text_color: "text-red-500",
    },
    {
      type: "Sports Day Announcement",
      icon: Trophy,
      date: "30 Jun 2024",
      bg_color: "bg-purple-100",
      text_color: "text-purple-500",
    },
  ];
  
  const classes = [
    {
      time: "09:00 - 09:45",
      className: "Class V, B",
      variant: "red",
    },
    {
      time: "09:00 - 09:45",
      className: "Class IV, C",
      variant: "red",
    },
    {
      time: "11:30 - 12:50",
      className: "Class V, B",
      variant: "blue",
    },
    {
      time: "01:30 - 02:15",
      className: "Class V, B",
      variant: "blue",
    },
    {
      time: "10:00 - 10:45",
      className: "Class VI, A",
      variant: "green",
    },
    {
      time: "11:00 - 11:45",
      className: "Class III, D",
      variant: "orange",
    },
    {
      time: "12:00 - 12:45",
      className: "Class VII, C",
      variant: "purple",
    },
    {
      time: "01:00 - 01:45",
      className: "Class IX, B",
      variant: "yellow",
    },
    {
      time: "02:00 - 02:45",
      className: "Class VIII, A",
      variant: "pink",
    },
    {
      time: "03:00 - 03:45",
      className: "Class V, D",
      variant: "blue",
    },
    {
      time: "09:30 - 10:15",
      className: "Class IV, A",
      variant: "red",
    },
    {
      time: "10:30 - 11:15",
      className: "Class VI, D",
      variant: "blue",
    },
    {
      time: "12:15 - 01:00",
      className: "Class X, A",
      variant: "green",
    },
    {
      time: "01:15 - 02:00",
      className: "Class XI, C",
      variant: "purple",
    },
  ];
  
  const chartColors = {
    completed: "hsl(var(--chart-1))", // Reusable color variable for "Completed"
    pending: "hsl(var(--chart-2))",   // Reusable color variable for "Pending"
  };
  
  


const chartData = [
  { browser: "present", visitors: 346, fill: "var(--color-Absent)" },
  { browser: "absent", visitors: 30, fill: "var(--color-present)" },
]

const Attendence = [
  {
    title: 'Emergency',
    count: 28
  },
  {
    title: 'Absent',
    count: 1
  },
  {
    title: 'Late',
    count: 1
  }
]

const data = [
  {
    title: "Total Students",
    total: "12,345",
    active: "12,300",
    inactive: "45",
    badge: { color: "#79A345", value: "4.5%" },
    icon: GraduationCap,
  },
  {
    title: "Total Classes",
    total: "123",
    active: "120",
    inactive: "3",
    badge: { color: "#0d5f82", value: "2.0%" },
    icon: BookOpen,
  },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  present: {
    label: "present",
    color: "hsl(var(--chart-1))",
  },
  Absent: {
    label: "absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

 
 

const handleEditProfile =() => {
    router.push("/profile");
}
 
  return (
  

<div className="space-y-6">

  {/* Dashboard Header */}
  <CardHeader className='p-0 px-2'>
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <CardTitle className="text-2xl font-semibold">Teacher Dashboard</CardTitle>
        <CardDescription>Access to Teacher</CardDescription>
      </div>
    </div>
  </CardHeader>
 

  
  {/* Profile and Stats Section */}
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
  {/* Profile Card */}
  <Card className="text-white bg-[#351C5A] dark:bg-gray-800 relative overflow-hidden p-2 col-span-2">
    <Image
      src={backgroundImage}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ opacity: 0.5 }}
    />
    <CardHeader className="relative z-10 shadow-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="bg-white py-3 px-4 rounded-lg shadow-[0px_4px_20px_rgba(255,255,255,0.5),_0px_2px_10px_rgba(255,255,255,0.3),_0px_1px_5px_rgba(255,255,255,0.1)]">
          <h2 className="text-xl font-semibold text-black">
            Lets get started, {user?.user_name || "Teacher"}!
          </h2>
          <CardContent className="p-0">
            <p className="text-sm text-black">Have a good day at work.</p>
          </CardContent>
        </div>
      </div>
    </CardHeader>
  </Card>

  <Card className="flex flex-col md:flex-row items-center justify-center gap-4 p-0  shadow-md rounded-lg bg-card text-card-foreground w-full max-w-sm mx-auto">
  {/* Chart Section */}
  <CardContent className="flex flex-col justify-center items-center w-full p-0">
    <CardHeader className="p-0">
      <CardTitle className="text-lg font-semibold text-center">Syllabus</CardTitle>
    </CardHeader>
    <ChartContainer
      config={{
        completed: { color: chartColors.completed },
        pending: { color: chartColors.pending },
      }}
      className="aspect-square h-[20vh] w-auto p-0"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={[
            { name: "Completed", value: 95, fill: chartColors.completed },
            { name: "Pending", value: 5, fill: chartColors.pending },
          ]}
          dataKey="value"
          innerRadius={35}
          outerRadius={55}
          strokeWidth={3}
        />
      </PieChart>
    </ChartContainer>
  </CardContent>
</Card>



  {/* Info Cards */}
  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
  {data.map((item, index) => (
    <Card
      key={index}
      className={`relative overflow-hidden  ${
        item.title === "Total Students"
          ? "bg-[#d5e2c5] dark:bg-black"
          : item.title === "Total Classes"
          ? "bg-[#b6e1f3] dark:bg-black text-white"
          : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div className="flex items-center space-x-2 my-2">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: item.badge.color }}
          >
            <item.icon className="w-8 h-8" style={{ color: "#FFFFFF" }} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{item.total}</h3>
            <h4 className="text-sm font-medium">{item.title}</h4>
          </div>
        </div>
        <div
          className="mt-3 px-2 py-1 rounded-full text-sm font-semibold"
          style={{
            color: item.badge.color,
            backgroundColor: `${item.badge.color}20`,
          }}
        >
          {item.badge.value}
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-2 mt-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Active</span>
              <span className="font-medium text-foreground">{item.active}</span>
            </div>
            <div className="flex justify-between">
              <span>Inactive</span>
              <span className="font-medium text-foreground">{item.inactive}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
</div>

<div className="grid grid-cols-12 gap-4">
  <Card className="col-span-12 w-full overflow-hidden">
    <div className="px-6 py-4 flex items-center justify-between bg-[#fce7f3] dark:bg-neutral-800">
      <h2 className="text-xl font-semibold">Today's Class</h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ChevronLeft className="h-4 w-4 cursor-pointer" />
        <span>16 May 2024</span>
        <ChevronRight className="h-4 w-4 cursor-pointer" />
      </div>
    </div>

    <div className="p-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-2">
          {classes.map((classItem, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/6 p-2"
            >
              <Card className="p-4 border-0 shadow-md">
                <div
                  className={`inline-flex px-3 py-1 rounded-md text-white text-sm mb-3 
                    ${
                      classItem.variant === "red"
                        ? "bg-red-500"
                        : classItem.variant === "blue"
                        ? "bg-blue-500"
                        : classItem.variant === "green"
                        ? "bg-green-500"
                        : classItem.variant === "orange"
                        ? "bg-orange-500"
                        : classItem.variant === "purple"
                        ? "bg-purple-500"
                        : "bg-yellow-500"
                    }`}
                >
                  {classItem.time}
                </div>
                <div className="font-medium">{classItem.className}</div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 top-1/4 translate-y-1/2 translate-x-1/2" />
      </Carousel>
    </div>
  </Card>
</div>





  {/* Lessons and Syllabus */}
  <Card className='w-full'>
    <CardHeader className='bg-[#d1fae5] dark:bg-neutral-800 p-4 px-5'>
    <div className='flex justify-between w-full'>
   <div className='text-lg font-semibold'>Lesson/Syllabus</div>
   <Button variant="outline">View all</Button>
    </div>
    </CardHeader>
    
    <CardContent className='p-5'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    {
      className: "Class V, B",
      title: "Introduction to Physics on Tech",
      progress: 75,
    },
    {
      className: "Class IV, A",
      title: "Basics of Mathematics",
      progress: 60,
    },
    {
      className: "Class VI, C",
      title: "Understanding Biology",
      progress: 85,
    },
    {
      className: "Class VII, D",
      title: "World History Overview",
      progress: 90,
    },
  ].map((item, idx) => (
    <Card key={idx} className="p-5">
      <div>
        {/* Class Info */}
        <p className="px-2 py-1 bg-gray-50 my-2 text-center dark:text-black">
          {item.className}
        </p>
        {/* Class Title */}
        <p className="text-lg font-semibold my-2">{item.title}</p>
        {/* Progress Bar */}
        <Progress value={item.progress} className="my-2" />
        <Separator />
        {/* Actions */}
        <div className="flex justify-between mt-2">
          <p className="cursor-pointer hover:text-blue-500">Reschedule</p>
          <p className="cursor-pointer hover:text-blue-500">Share</p>
        </div>
      </div>
    </Card>
  ))}
</div>

  </CardContent>
  </Card>
 
  {/* Upcoming Events and Attendance */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
    {/* Left Column */}
    <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
            <Card>
            <div className="flex justify-between  bg-[#dcf0f9] dark:bg-neutral-800 p-5">
      <h1 className="text-xl font-semibold">Upcoming Events</h1>
      <Link href="/announcements">
        <Button variant="outline" size="sm">View All</Button>
      </Link>
    </div>
  <CardContent className='  '>
  
    
  {fetchedAnnouncements.slice(0, 4).map((event, index) => (
        <div
          className={`border-l-4 px-3 py-1 my-2 ${
            index % 4 === 0
              ? "border-l-blue-500"
              : index % 4 === 1
              ? "border-l-green-500"
              : index % 4 === 2
              ? "border-l-yellow-500"
              : "border-l-red-500"
          }`}
          key={index}
        >
          <div className="flex gap-4">
            <div className="text-sm">
              <p className="text-left text-lg font-semibold">{event.event_title}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <CalendarDays className="w-3 mr-1" />
                {new Date(event.event_start_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div 
            className={`border-b-2 mt-2 ${
              index % 4 === 0
                ? "border-blue-500"
                : index % 4 === 1
                ? "border-green-500"
                : index % 4 === 2
                ? "border-yellow-500"
                : "border-red-500"
            }`}
          />
          <div className="flex my-2 justify-between">
            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="w-3 mr-2" />
              {event.event_start_time || "N/A"} - {event.event_end_time || "N/A"}
            </p>
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, idx) => (
                <Avatar className="h-[30px] w-[30px]" key={idx}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              ))}
            </div>
          </div>
     
        </div>
      ))}
  
    
  </CardContent>
</Card>

 
 
            </div>

    {/* Right Column */}
    <div className="col-span-1 lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Attendance */}
      <Card  className='p-0'>
         
         <CardContent className="w-full  p-0 ">
         <Tabs defaultValue="student" className="w-full">
           <div className='flex items-center justify-between bg-[#fbeddf] dark:bg-neutral-800 px-5'>
           <CardHeader className=' p-4 '>
           <CardTitle>Leaves Graph</CardTitle>
           <CardDescription>
             Please review the leaves.
           </CardDescription>
         </CardHeader >

         <TabsList >
                   <TabsTrigger value="student">Student</TabsTrigger>
                   <TabsTrigger value="teacher">Teacher</TabsTrigger>
                   <TabsTrigger value="staff">Staff</TabsTrigger>
                 </TabsList>
           </div>
                
                 <TabsContent value="student">
                 <div className="flex my-4">
 {/* Left half: Attendance list */}
 <div className="w-1/2 flex flex-col gap-4 p-4">
   {Attendence.map((data, index) => (
     <div
       className="flex justify-center bg-gray-50 dark:bg-gray-800 rounded items-center h-[70px]"
       key={index}
     >
       <div>
         <p className="text-center">{data.count}</p>
         <p>{data.title}</p>
       </div>
     </div>
   ))}
 </div>

 {/* Right half: Pie chart */}
 <div className="w-1/2 flex justify-center items-center">
   <ChartContainer
     config={chartConfig}
     className="w-full max-w-[250px] aspect-square"
   >
     <PieChart>
       <Pie
         data={chartData}
         dataKey="visitors"
         nameKey="browser"
         innerRadius={65}
         strokeWidth={10}
       />
     </PieChart>
   </ChartContainer>
 </div>
</div>

                 </TabsContent>
               </Tabs>
               <div className='flex justify-center my-4'>
               <Button variant={"outline"}>View details</Button>
               </div>
         </CardContent>
         
             
             </Card>

  
        <Card className="col-span-1">
  <div className='flex items-center justify-between w-full  p-5 bg-[#dcfce7] dark:bg-neutral-800'>
                        <p className='text-base font-semibold'>Notice board</p>
                        <Button variant="outline" className='text-xs'>
                        View All
      </Button>
                    </div>
                    <div className='p-5'>
                      {
                        NoticeBoard.map((data,index)=>{
                          return(
                            <div className=' flex justify-between py-3 border-b items-center' key={index}>
                            <div className='flex space-x-2 items-center'>
                              <div className={`w-8 h-8 rounded-full ${data.bg_color} flex items-center justify-center`}>
                                   <data.icon className={`w-3 h-3 ${data.text_color}`}/>
                              </div>
                              <div>
                                <p className='font-medium '>{data.type}</p>
                               <span className='flex text-sm text-gray-500 items-center gap-2'><Calendar1 className='w-4 h-4'/> Added On :{data.date}</span>
                              </div>
                              <div></div>
                            </div>
                            <div>
                              <ChevronRight className='w-4 h-4'/>
                            </div>
                          </div>
                          )
                        })
                      }
                     

                    </div>
  </Card>
    </div>
  </div>



</div>
 
  );
};

export default TeacherDashboard;
