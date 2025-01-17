"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // You can use this for the update status
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
 
import Image from 'next/image'
import backgroundImage from "../../../public/schoolitaly.c4.jpg";
 
import {  Pie, PieChart,   } from "recharts"
 
import {     BookOpenCheck,    CalendarArrowUpIcon, CalendarCheck, CalendarDays, Check, Clock,   FilePen, GraduationCapIcon, MessageCircle, ScrollText, Star, Trophy, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
 
} from "@/components/ui/chart"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import   { useRouter } from 'next/navigation';
 
import { Calendar1,ChevronDown    } from 'lucide-react'
import { GraduationCap, Users, UserCog, BookOpen } from 'lucide-react'
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 
import { toast, Toaster } from 'sonner';
 
import useThemeStore from '@/components/ThemeContext';
import BirthdayCard from '@/app/(others)/birthdaycard/page';
 
 
type Request = {
  id: string
  name: string
  avatar: string
  type: 'Emergency' | 'Regular'
  role: string
  leaveDate: string
  applyDate: string
  description: string
  fromDate: string
  toDate: string
}

 

export type Details = {
  id: string;
 name: string;
  class: string;
 section: string;
  marks: string;
 exams: string;
 status: "pass"| 'Fail'
};

interface User {
  user_name: string;
  email_id: string;
  // You can add more fields if needed, like `last_name`, `avatar`, etc.
}


const AdminDashboard = () => {
  const router = useRouter(); 
 
  const incrementNotifications = useThemeStore((state) => state.incrementNotifications);
  const [user, setUser] = useState<User | null>(null);
 
    const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Example selected category
    const [message, setMessage] = useState(''); 
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
 

  const handleSend = () => {
    console.log('Category:', selectedCategory);
    console.log('Message:', message);

    incrementNotifications(); // Call the increment function
    setIsAnnouncementDialogOpen(false);
    toast.success("Announcement sent successfully!");
  };

 
 
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    present: {
      label: "Present",
      color: "hsl(var(--green-500))", 
    },
    absent: {
      label: "Absent",
      color: "hsl(var(--red-500))",  
    },
  };
  
 
 
 

 
 
  const data = [
    {
      title: "Students",
      total: "3654",
      active: "3643",
      inactive: "11",
      badge: { color: "#79A345", value: "1.2%" },
      icon: GraduationCap
    },
    {
      title: "Teaching Staff",
      total: "284",
      active: "254",
      inactive: "30",
      badge: { color: "#da1e28", value: "1.2%" },
      icon: Users
    },
    {
      title: "Non-Teaching Staff",
      total: "162",
      active: "161",
      inactive: "02",
      badge: { color: "#ffc000", value: "1.2%" },
      icon: UserCog
    },
    {
      title: "Subjects",
      total: "82",
      active: "81",
      inactive: "01",
      badge: { color: "#0d5f82", value: "1.2%" },
      icon: BookOpen
    }
  ];
 
 

 

const performerData = {
  bestPerformers: [
    {
      name: "Harshitha K",
      subject: "Mathematics",
      grade: "A+",
      score: "98%",
      imageUrl: "/student1.jpg"
    },
    {
      name: "Harshitha K",
      subject: "Science",
      grade: "A+",
      score: "97%",
      imageUrl: "/student1.jpg"
    },
    {
      name: "Harshitha K",
      subject: "English",
      grade: "A",
      score: "95%",
      imageUrl: "/student1.jpg"
    }
  ],
  starStudents: [
    {
      name: "Muskaan MD",
      subject: "History",
      grade: "A+",
      score: "96%",
      imageUrl: "/student2.jpg"
    },
    {
      name: "Muskaan MD",
      subject: "Physics",
      grade: "A",
      score: "94%",
      imageUrl: "/student2.jpg"
    },
    {
      name: "Muskaan MD",
      subject: "Chemistry",
      grade: "A+",
      score: "97%",
      imageUrl: "/student2.jpg"
    }
  ]
}

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
  {
    event_title: "Student Meeting",
    event_start_date: "2024-12-8",
    event_start_time: "10:00 AM",
    event_end_time: "02:00 PM",
  },
];

 
 
const QuickLinks = [
  {
    title: 'Calendar',
    Icon: Calendar1,
    bg_color: 'bg-red-100',
    icon_color: 'bg-red-700',
    link: '/holidaysEvent',
  },
  {
    title: 'Result',
    Icon: GraduationCapIcon,
    bg_color: 'bg-blue-100',
    icon_color: 'bg-blue-700',
    link: '/exams',
  },
  {
    title: 'Attendance',
    Icon: CalendarArrowUpIcon,
    bg_color: 'bg-yellow-100',
    icon_color: 'bg-yellow-700',
    link: '/studentattendance',
  },
  {
    title: 'Fees',
    Icon: ScrollText,
    bg_color: 'bg-purple-100',
    icon_color: 'bg-purple-700',
    link: '/feeDetails',
  },
  {
    title: 'Leaves',
    Icon: CalendarCheck,
    bg_color: 'bg-teal-100',
    icon_color: 'bg-teal-700',
    link: '/admin-leave',
  },
  {
    title: 'Conversation',
    Icon: MessageCircle,
    bg_color: 'bg-orange-100',
    icon_color: 'bg-orange-700',
    link: '/chat',
  },
];

  const requests: Request[] = [
    {
      id: '1',
      name: 'Gautami B',
      avatar: "/teacher.avif",
      type: 'Emergency',
      role: 'Software Engineer',
      leaveDate: '2023-07-15',
      applyDate: '2023-07-10',
      description: 'Family emergency, need to travel out of state.',
      fromDate: '2023-07-15',
      toDate: '2023-07-18'
    },
    {
      id: '2',
      name: 'Amurtha V',
      avatar: "/teacherr1.avif",
      type: 'Regular',
      role: 'Product Manager',
      leaveDate: '2023-08-01',
      applyDate: '2023-07-20',
      description: 'Annual vacation.',
      fromDate: '2023-08-01',
      toDate: '2023-08-10'
    },
    // Add more sample requests as needed
  ]
  
  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request)
    setIsDialogOpen(true)
  }
  
  const handleApprove = () => {
    // Handle approve logic here
    console.log('Approved:', selectedRequest)
    setIsDialogOpen(false)
  }

 
const chartData = [
  { browser: "present", visitors: 346, fill: "var(--color-Absent)" },
  { browser: "absent", visitors: 30, fill: "var(--color-present)" },
]
const stats = [
  {
    title: "Fee Collected till date",
    amount: "4,56,640 /-",
    percentage: 1.2,
  },
  {
    title: "Students Dues",
    amount: "45,890 /-",
    percentage: 0.2,
  },
  {
    title: "Outstanding",
    amount: "4,96,684 /-",
    percentage: 1.9,
  },
];

const getBadgeClass = (percentage: number) => {
  if (percentage > 0) return "bg-green-100 text-green-800";
  if (percentage < 0) return "bg-red-100 text-red-800";
  return "bg-blue-100 text-blue-800";
};
 

/* Student Data */
const studentAttendance = [
  { title: "Emergency", count: 28 },
  { title: "Absent", count: 1 },
  { title: "Late", count: 1 },
];

// Fake "student" pie chart data
const studentChartData = [
  { browser: "Emergency", visitors: 28, fill: "hsl(var(--chart-1))" },
  { browser: "Absent", visitors: 1, fill: "hsl(var(--chart-2))" },
  { browser: "Late", visitors: 1, fill: "hsl(var(--chart-3))" },
];

/* Teacher Data */
const teacherAttendance = [
  { title: "Medical", count: 4 },
  { title: "Sick", count: 2 },
  { title: "Late", count: 5 },
];

// Fake "teacher" pie chart data
const teacherChartData = [
  { browser: "Medical", visitors: 4, fill: "hsl(var(--chart-1))" },
  { browser: "Sick", visitors: 2, fill: "hsl(var(--chart-2))" },
  { browser: "Late", visitors: 5, fill: "hsl(var(--chart-3))" },
];

/* Staff Data */
const staffAttendance = [
  { title: "Casual", count: 10 },
  { title: "Short Leave", count: 2 },
  { title: "Late", count: 3 },
];

// Fake "staff" pie chart data
const staffChartData = [
  { browser: "Casual", visitors: 10, fill: "hsl(var(--chart-1))" },
  { browser: "Short Leave", visitors: 2, fill: "hsl(var(--chart-2))" },
  { browser: "Late", visitors: 3, fill: "hsl(var(--chart-3))" },
];


const [isFirstHalf, setIsFirstHalf] = useState(true)
  


const janJunData = [
  { month: "January", desktop: 120, mobile: 80 },
  { month: "February", desktop: 140, mobile: 100 },
  { month: "March", desktop: 170, mobile: 110 },
  { month: "April", desktop: 190, mobile: 130 },
  { month: "May", desktop: 210, mobile: 150 },
  { month: "June", desktop: 230, mobile: 170 },
]
const julDecData = [
  { month: "July", desktop: 250, mobile: 190 },
  { month: "August", desktop: 270, mobile: 210 },
  { month: "September", desktop: 290, mobile: 230 },
  { month: "October", desktop: 310, mobile: 250 },
  { month: "November", desktop: 330, mobile: 270 },
  { month: "December", desktop: 350, mobile: 290 },
]
const currentData = isFirstHalf ? janJunData : julDecData
const dateRange = isFirstHalf ? "January - June 2024" : "July - December 2024"
const trendPercentage = isFirstHalf ? 5.2 : 7.8
const isTrendingUp = trendPercentage > 0

const handleChartClick = () => {
  setIsFirstHalf(!isFirstHalf)
}
const chartConfigGraph = {
  desktop: {
    label: "Teachers",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Students",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

 


  return (
 

        <div className="space-y-4 ">

          {/* Dashboard Header */}
          <CardHeader className='p-0 px-2'>
  <div className="flex justify-between items-center">
    <div className="flex flex-col whitespace-nowrap  ">
      <CardTitle className="text-2xl font-semibold truncate">
        Admin Dashboard
      </CardTitle>
      <CardDescription className="truncate">
        Access to admin
      </CardDescription>
    </div>
    <div className="w-full overflow-hidden">
      <video
        className="w-full h-[6vh]  "
        src="/videos/boybg.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          animation: "moveLeftToRight 30s linear infinite",
        }}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</CardHeader>

          <div>
  
  </div>
          <div className="relative">
  {/* Video at the Top */}


  {/* Card Content */}
  <div className="relative ">
 
    {/* <Card className="text-[#1ABE17] bg-[#e8f9e9] dark:bg-gray-800 border border-[#1ABE17] dark:border-[white] rounded-full">
      <CardHeader className="p-2 px-4">
        <div className="flex items-center">
          <CardContent className="p-0 pl-4 flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            </Avatar>
            <p className="text-sm dark:text-white">Have a good day at work</p>
          </CardContent>
        </div>
        <div className="flex flex-col items-end absolute right-10">
          <div className="text-xs text-[#1ABE17] dark:text-white pr-5 cursor-pointer">X</div>
        </div>
      </CardHeader>
    </Card> */}
  </div>

  {/* Animation Styles */}
  <style jsx>{`
    @keyframes moveLeftToRight {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translateX(50%);
      }
    }
    video {
      animation-timing-function: linear;
    }
  `}</style>
</div>



          {/* Welcome Card */}
          <Card className="text-white bg-[#351C5A] dark:bg-gray-800 relative overflow-hidden p-2">
        {/* Background Design */}
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <div className="absolute top-[-25%] left-[-1%] w-16 h-16 border-4 border-yellow-400 dark:border-white rounded-full"></div>
            <div className="absolute top-20 right-12 w-10 h-10 border-4 border-blue-400 dark:border-white rounded-full"></div>
            <div className="absolute bottom-[-20%] left-[18%] w-14 h-14 border-4 border-purple-400 dark:border-white rounded-full"></div>
            <div className="absolute bottom-[10%] right-[7%] w-12 h-12 border-4 border-red-400 dark:border-white rounded-full"></div>
            <div className="absolute bottom-[-15%] left-[20%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
            <div className="absolute top-[-20%] right-[2%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
          </div> */}
          <Image
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 "
        style={{ opacity: 0.5 }}
      />
            <CardHeader className='relative z-10  shadow-lg p-4'>
              <div className="flex flex-col sm:flex-row sm:items-center ">
              <div
  className="bg-white p-1 px-4 rounded-lg shadow-[0px_4px_20px_rgba(255,255,255,0.5),_0px_2px_10px_rgba(255,255,255,0.3),_0px_1px_5px_rgba(255,255,255,0.1)]"
>
  <h2 className="text-xl font-semibold text-black">
    Lets get started, {user?.user_name || "Admin"} !
  </h2>
  <CardContent className="p-0">
    <p className="text-sm text-black">Have a good day at work.</p>
  </CardContent>
</div>

              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-1 ">
  {data.map((item, index) => (
    <Card
      key={index}
      className={`relative overflow-hidden  ${
        item.title === "Students"
          ? "bg-[#d5e2c5] dark:bg-black  "
          : item.title === "Teaching Staff"
          ? "bg-[#f4b9bc] dark:bg-black "
          : item.title === "Non-Teaching Staff"
          ? "bg-[#ffebb0] text-white dark:bg-black "
          : item.title === "Subjects"
          ? "bg-[#b6e1f3] text-white dark:bg-black "
          :""
      }`}
    >
      <CardHeader
        className={`flex flex-row items-center justify-between pb-2 ${
          item.title === "Students"
            ? "bg-[#d5e2c5] dark:bg-black "
            : item.title === "Teaching Staff"
            ? "bg-[#f4b9bc] dark:bg-black "
            : item.title === "Non-Teaching Staff"
          ? "bg-[#ffebb0] text-white dark:bg-black "
          : item.title === "Subjects"
          ? "bg-[#b6e1f3] text-white dark:bg-black "
          :""
        }`}
      >
        <div className="flex items-center space-x-2 my-2  ">
          <div
            className="p-3 rounded-lg "
            style={{ backgroundColor: item.badge.color }}
          >
            <item.icon
              className="w-8 h-8 "
              style={{
                color:
                  item.title === "Students "
                    ? "#C8D6AB   "  
                    : item.title === "Teaching Staff"
                    ? "#E6A8B5"  
                    : item.title === "Non-Teaching Staff"
                    ? "#FFE0A6"  
                    : item.title === "Subjects"
                    ? "#B6A1C7"  
                    : "",
              }}
              ></item.icon>
          </div>
          <div>
            <h4 className="text-2xl font-bold">{item.total}</h4>
            <h3 className="text-sm font-medium">{item.title}</h3>
          </div>
        </div>
        <div
          className="mt-3 px-2 py-1 rounded-full text-sm font-semibold  "
          style={{
            color: item.badge.color,
            backgroundColor: `${item.badge.color}20`, // Light background for badge
          }}
        >
          {item.badge.value}
        </div>
      </CardHeader>
      <div className="px-5">
        <Separator />
      </div>

      <CardContent>
        <div className="space-y-2 mt-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Active</span>
              <span className="font-medium text-foreground">{item.active}</span>
            </div>
            <div className="flex justify-between">
              <span>Inactive</span>
              <span className="font-medium text-foreground">
                {item.inactive}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


          {/* Upcoming Events and Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
            
            {/* Left Column - Events and Bar Chart */}
            <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
            <Card>
            <div className="flex justify-between  bg-[#dcf0f9] dark:bg-neutral-800 p-4">
      <h1 className="text-xl font-semibold">Upcoming Events</h1>
      <Link href="/announcements">
        <Button variant="outline" size="sm">View All</Button>
      </Link>
    </div>
  <CardContent className='  '>
  
    
  {fetchedAnnouncements.slice(0, 4).map((event, index) => (
        <div
          className={`border-l-4 px-3 py-1 my-4 dark:border-l-gray-500 ${
            index % 4 === 0
              ? "border-l-blue-500 dark:border-l-gray-500"
              : index % 4 === 1
              ? "border-l-green-500 dark:border-l-gray-500"
              : index % 4 === 2
              ? "border-l-yellow-500 dark:border-l-gray-500"
              : "border-l-red-500 dark:border-l-gray-500"
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
            className={`border-b-2 mt-2    ${
              index % 4 === 0
                ? "border-blue-500 dark:border-gray-500"
                : index % 4 === 1
                ? "border-green-500 dark:border-gray-500"
                : index % 4 === 2
                ? "border-yellow-500 dark:border-gray-500"
                : "border-red-500 dark:border-gray-500"
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

 
<Card>
      <CardHeader className='p-0'>
        <div className='flex justify-between items-center mb-3 bg-[#fce7f3] dark:bg-neutral-800 p-4'>
        <CardTitle>Teacher & Student Attendance</CardTitle>
        <Button className='cursor-pointer' variant={"outline"}  onClick={handleChartClick}>{dateRange}</Button>
        </div>
     
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigGraph}>
          <BarChart accessibilityLayer data={currentData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the  6 months
        </div>
      </CardFooter>
    </Card>
            </div>

            {/* Right Column - Attendance and Carousel */}
            <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">

            <Card className="w-full ">
            <CardHeader className='p-4 bg-[#ebf1e3] dark:bg-neutral-800'>
                  <h1 className="font-semibold md:text-xl  ">Quick Announcement</h1>
              
                </CardHeader>
            
            <div className='px-4'>

            
                <Tabs defaultValue="All" className="w-full mt-2">
                  <TabsList>
                  <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                  </TabsList>
              
                </Tabs>
                

              {/* Announcement Input */}
              <div className="space-y-2 mt-4">
            
                <textarea 
                  id="announcement"
                  placeholder="Type your announcement here..."
                  className="w-full p-2 rounded-md border resize-y min-h-[100px] max-h-[200px]" 
                />
              </div>

              {/* Send Button */}
              <div className='flex justify-end mb-4'>
              <Button  onClick={() => setIsAnnouncementDialogOpen(true)}>Send</Button>
              </div>
              </div>
              </Card>

              <Card className="">
      {/* Header Section */}
      <CardHeader className="flex  flex-row justify-between p-3   bg-[#e1dde6] dark:bg-neutral-800">
        <CardTitle className="text-xl font-semibold">Leave Requests</CardTitle>
        <div className='space-x-2'>
        <Link href="/admin-leave">
  <Button variant="outline" size="sm">
    View All
  </Button>
</Link>
        <Button variant="outline" size="sm">
          Today
        </Button>
        </div>
   
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="space-y-5">
          {requests.map((request) => (
            <Card 
              key={request.id} 
              className="p-4 border-b last:border-none cursor-pointer hover:bg-accent transition-colors"  
              onClick={() => handleRequestClick(request)}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.avatar} alt={request.name} />
                    <AvatarFallback>{request.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{request.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          request.type === "Emergency"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {request.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                  
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Approve request</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                  
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel request</span>
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <div>
                  Leave: <span className="text-foreground">{request.leaveDate}</span>
                </div>
                <div>
                  Apply on: <span className="text-foreground">{request.applyDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>

    </Card>
  
    <Card className="p-0">
      <CardContent className="w-full p-0">
        <Tabs defaultValue="student" className="w-full">
          {/* Header Row */}
          <div className="flex items-center justify-between bg-[#fbeddf] dark:bg-neutral-800">
            <CardHeader>
              <CardTitle>Leaves Graph</CardTitle>
            </CardHeader>

            <TabsList>
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
          </div>

          {/* Student Tab */}
          <TabsContent value="student">
            <div className="flex flex-wrap my-4">
              {/* Left half: Attendance list */}
              <div className="w-1/2 flex flex-col gap-4 p-2">
                {studentAttendance.map((data, index) => (
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
                <ChartContainer config={chartConfig} className="w-full max-w-[250px] aspect-square">
                  <PieChart>
                    <Pie
                      data={studentChartData}
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

          {/* Teacher Tab */}
          <TabsContent value="teacher">
            <div className="flex flex-wrap my-4">
              {/* Left half: Attendance list */}
              <div className="w-1/2 flex flex-col gap-4 p-2">
                {teacherAttendance.map((data, index) => (
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
                <ChartContainer config={chartConfig} className="w-full max-w-[250px] aspect-square">
                  <PieChart>
                    <Pie
                      data={teacherChartData}
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

          {/* Staff Tab */}
          <TabsContent value="staff">
            <div className="flex flex-wrap my-4">
              {/* Left half: Attendance list */}
              <div className="w-1/2 flex flex-col gap-4 p-2">
                {staffAttendance.map((data, index) => (
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
                <ChartContainer config={chartConfig} className="w-full max-w-[250px] aspect-square">
                  <PieChart>
                    <Pie
                      data={staffChartData}
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
        <div className="flex justify-center my-4">
          <Button variant={"outline"}>View details</Button>
        </div>
      </CardContent>
    </Card>

    
            </div>
            <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
           
              {/* <div className="col-span-1 lg:col-span-4">
              <Card className="w-full p-5">
          <div className="w-full">
            <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
          </div>
        </Card>


            </div> */}

            <div>
              <BirthdayCard />
            </div>
  
    <Card>
                <CardHeader className='p-4 pl-5 bg-[#f9dddf] dark:bg-neutral-800'>
                  <h1 className="font-semibold md:text-xl">Quick Links</h1>
                </CardHeader>
              
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
                {QuickLinks.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg dark:bg-nuetral-800 ${item.bg_color} dark:bg-gray-800 w-full h-[10vh] cursor-pointer`}
                  onClick={() => router.push(item.link)}
                >
                  <div className={`flex items-center justify-center w-10 h-10 ${item.icon_color} dark:bg-gray-500  rounded-full shadow-md`}>
                    <item.Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white">{item.title}</p>
                </div>
              ))}
                </div>
              </Card>
          
                      {/* Carousel Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Best Performers Card */}
      <Card className="overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {performerData.bestPerformers.map((performer, index) => (
              <CarouselItem key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Header */}
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <h2 className="text-xl font-bold">Best Performer</h2>
                    </div>
                    
                    {/* Image */}
                    <div className="relative w-48 h-48">
                      <Image
                        src={performer.imageUrl}
                        alt={performer.name}
                        fill
                        className="object-cover rounded-full border-4 border-yellow-200"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold">{performer.name}</h3>
                      <Badge variant="secondary" className="bg-yellow-100">
                        {performer.subject}
                      </Badge>
                      <div className="flex items-center justify-center space-x-4">
                        <Badge variant="outline">Grade: {performer.grade}</Badge>
                        <Badge variant="outline">Score: {performer.score}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2" />
          <CarouselNext className="absolute right-4 top-1/2" />
        </Carousel>
      </Card>

      {/* Star Students Card */}
      <Card className="overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {performerData.starStudents.map((student, index) => (
              <CarouselItem key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Header */}
                    <div className="flex items-center space-x-2">
                      <Star className="w-6 h-6 text-purple-500" />
                      <h2 className="text-xl font-bold">Star Student</h2>
                    </div>
                    
                    {/* Image */}
                    <div className="relative w-48 h-48">
                      <Image
                        src={student.imageUrl}
                        alt={student.name}
                        fill
                        className="object-cover rounded-full border-4 border-purple-200"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <Badge variant="secondary" className="bg-purple-100">
                        {student.subject}
                      </Badge>
                      <div className="flex items-center justify-center space-x-4">
                        <Badge variant="outline">Grade: {student.grade}</Badge>
                        <Badge variant="outline">Score: {student.score}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2" />
          <CarouselNext className="absolute right-4 top-1/2" />
        </Carousel>
      </Card>


    
    </div>
  
              </div>
              
 
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const isPositive = stat.percentage > 0;

        return (
          <Card key={index} className="bg-white dark:bg-black">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold">{stat.amount}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${getBadgeClass(
                    stat.percentage
                  )}`}
                >
                  {isPositive ? "↑" : ""}
                  {Math.abs(stat.percentage)}%
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Announcement</DialogTitle>
          </DialogHeader>
       

          <div className="space-y-4 bg-white p-4   shadow-md    ">
 

  {/* Display Selected Category */}
  <div className="flex items-center space-x-2">
    <span className="font-medium text-gray-600">Category:</span>
    <span className="text-gray-800 bg-blue-100 px-2 py-1 rounded text-sm">
      {selectedCategory}
    </span>
  </div>

  {/* Display Message */}
  <div className="mt-3">
    <h3 className="font-medium text-gray-600">Message</h3>
    <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-md border">
    Please note that the school will remain closed on 25th December due to Christmas celebrations. Have a great holiday!
    </p>
  </div>

 
</div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAnnouncementDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSend}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Confirm Leave Request</DialogTitle>
            <DialogDescription>
              Please review the leave request details before approving or cancelling.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedRequest.avatar} alt={selectedRequest.name} />
                  <AvatarFallback>{selectedRequest.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedRequest.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Type:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    selectedRequest.type === "Emergency"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {selectedRequest.type}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Apply Date:</span> {selectedRequest.applyDate}
                </div>
                <div>
                  <span className="font-medium">From:</span> {selectedRequest.fromDate}
                </div>
                <div>
                  <span className="font-medium">To:</span> {selectedRequest.toDate}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-muted-foreground">{selectedRequest.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />

        </div>

    
  );
};

export default AdminDashboard;
