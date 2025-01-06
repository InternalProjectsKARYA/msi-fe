"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent,   CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import backgroundImage from "../../../public/schoolitaly.c4.jpg";
import Image from 'next/image'
import physics from '../../../public/Physics.webp'
import maths from '../../../public/maths.jpg'
import chemistry from '../../../public/Chemistry.jpg'
import english from '../../../public/English.jpg'
import Link from 'next/link';
import { useAuthContext } from "@/lib/AuthProvider";  
import axiosInstance from "@/lib/axiosInstance";  
 
import {       CalendarArrowUpIcon, CalendarDays, Clock,  GraduationCapIcon, Mail, MessageCircle, ScrollText, Sun, Trophy, Users } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
import { Calendar1,ChevronDown ,Bus ,BookOpen ,Salad ,Receipt,  ChevronRight   } from 'lucide-react'
 
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



const StudentDashboard = () => {
 
 
  const { Id } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/get_user/?user_id=${Id}`);
        setUser(response.data.user); // Store user data
      } catch (error: any) {
        console.error("Error fetching user details:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserDetails();
  }, [Id]);

 

  const homeWorkstudent=[{subject:'Physics',content:'Write About theory Of Pendulum',name:'Balaji Rao',due:'15 jan 2024',color:' text-blue-500',image:physics},
    {subject:'Chemistry',content:'cahnge of elements',name:'Lavanya Gopal',due:'15 jan 2024',color:' text-green-500',image:chemistry},
    {subject:'Maths',content:'problem to solve apge 21',name:'Harika Reddy',due:'15 jan 2024',color:' text-red-500',image:maths},
    {subject:'English',content:'Vocabulary inroduction',name:'Rahul Varma',due:'15 jan 2024',color:' text-yellow-500',image:english}
  ]
 // Sample fees reminder data
 
const NoticeBoardstudent=[{type:' new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus,date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'}] 
  // Sample data for leave statuses
const leaveStatusDatastudent = [
  { type: "Emergency Leave", date: "15 Jun 2024", status: "Pending", color: "bg-blue-400", iconBg: "bg-red-100", iconColor: "text-red-500" },
  { type: "Medical Leave", date: "15 Jun 2024", status: "Approved", color: "bg-green-400", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
  { type: "Medical Leave", date: "16 Jun 2024", status: "Declined", color: "bg-red-400", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
  { type: "Fever", date: "16 Jun 2024", status: "Approved", color: "bg-green-400", iconBg: "bg-red-100", iconColor: "text-red-500" },
  { type: "Casual Leave", date: "16 Jun 2024", status: "Declined", color: "bg-red-400", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
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

 

  const TodaysClasses = [
    {
      time: "09:00 - 09:45",
      className: "Class V, B",
      teacherName: "John Doe",
      subject: "Mathematics",
      avatar: "JD",
    },
    {
      time: "10:00 - 10:45",
      className: "Class IV, C",
      teacherName: "Jane Smith",
      subject: "Biology",
      avatar: "JS",
    },
    {
      time: "11:30 - 12:15",
      className: "Class III, A",
      teacherName: "Bob Johnson",
      subject: "Physics",
      avatar: "BJ",
    },
    {
      time: "01:30 - 02:15",
      className: "Class VI, D",
      teacherName: "Alice Brown",
      subject: "Chemistry",
      avatar: "AB",
    },
    {
      time: "02:30 - 03:15",
      className: "Class VII, E",
      teacherName: "Charlie Davis",
      subject: "English",
      avatar: "CD",
    },
  ];
  
  

  return (
  
<div className="space-y-6">

  {/* Dashboard Header */}
  <CardHeader className="p-0 px-2">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <CardTitle className="text-2xl font-semibold">Student Dashboard</CardTitle>
        <CardDescription>Access to Student</CardDescription>
      </div>
    </div>
  </CardHeader> 

 

  {/* Profile and Quick Actions */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Profile Card */}
  <Card className="text-white bg-[#351C5A] dark:bg-gray-800 relative overflow-hidden p-4 shadow-md rounded-lg">
    <Image
      src={backgroundImage}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ opacity: 0.5 }}
    />
    <CardHeader className="relative z-10 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="bg-white py-3 px-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-black">
            Let's get started, {user?.user_name || "Student"}!
          </h2>
          <CardContent className="p-0">
            <p className="text-sm text-black">Have a good day at work.</p>
          </CardContent>
        </div>
      </div>
    </CardHeader>
  </Card>

  {/* Info Cards Section */}
  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Apply Leave and Raise a Request Section */}
    <div className="md:col-span-1 flex flex-col gap-4">
      <Card className="flex justify-between items-center border p-4 h-[60px]  bg-[#d5e2c5] rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <Calendar1 className="w-5 h-5" />
          <p className="text-sm font-medium">Apply Leave</p>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Card>
      <Card className="flex justify-between items-center border p-4 h-[60px] rounded-lg  bg-[#ffebb0] shadow-sm">
        <div className="flex items-center space-x-2">
          <Calendar1 className="w-5 h-5" />
          <p className="text-sm font-medium">Raise a Request</p>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Card>
    </div>

    {/* Medical Leaves and Casual Leaves Section */}
    <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
      <Card className="p-4 w-full rounded-lg shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Calendar1 className="w-8 h-8 border p-1 rounded-full" />
          </div>
          <p className="font-semibold text-base">Medical Leaves</p>
        </div>
        <div className="flex justify-between text-sm mt-4">
          <p>
            Used: <span className="font-medium">05</span>
          </p>
          <p>
            Available: <span className="font-medium">10</span>
          </p>
        </div>
      </Card>

      <Card className="p-4 w-full rounded-lg shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Calendar1 className="w-8 h-8 border p-1 rounded-full" />
          </div>
          <p className="font-semibold text-base">Casual Leaves</p>
        </div>
        <div className="flex justify-between text-sm mt-4">
          <p>
            Used: <span className="font-medium">05</span>
          </p>
          <p>
            Available: <span className="font-medium">10</span>
          </p>
        </div>
      </Card>
    </div>
  </div>
</div>

  <div  className='relative my-5 '>

        {/* Quick Actions */}
        <div className="col-span-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {[
        { icon: ScrollText, label: 'Pay Fees', color: 'bg-blue-700' },
        { icon: GraduationCapIcon, label: 'Exam Result', color: 'bg-green-700' },
        { icon: Calendar1, label: 'Calendar', color: 'bg-yellow-700' },
        { icon: CalendarArrowUpIcon, label: 'Attendance', color: 'bg-red-700' },
      ].map((action, index) => (
        <Card className="flex items-center p-5" key={index}>
          <div className="flex items-center space-x-4">
            <div className={`h-8 w-8 flex items-center justify-center border ${action.color}`}>
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <p className="font-semibold text-lg">{action.label}</p>
          </div>
        </Card>
      ))}
    </div>
  <Card className="w-full   mx-auto my-8">
      <CardHeader className="  bg-[#d1fae5] p-4">
        <CardTitle className="text-xl font-semibold">Todays Classes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
         <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50" />
                 <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-50" />
            <CarouselContent className="-ml-2 md:-ml-4">
              
            {TodaysClasses.map((classItem, index) => (
  <CarouselItem
    key={index}
    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
  >
    <div className="p-4 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${classItem.avatar}`}
            alt={classItem.teacherName}
          />
          <AvatarFallback>{classItem.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{classItem.className}</h3>
          <p className="text-sm text-muted-foreground">
            {classItem.teacherName} - {classItem.subject}
          </p>
        </div>
      </div>

      {/* Class Details Section */}
      <div className="mt-4">
        <div className="flex justify-around">
          <p className="text-sm text-muted-foreground">Time:</p>
          <p className="text-sm font-semibold">{classItem.time}</p>
        </div>
        <div className="flex justify-around mt-2">
          <p className="text-sm text-muted-foreground">Subject:</p>
          <p className="text-sm font-semibold">{classItem.subject}</p>
        </div>
        <div className="flex justify-around mt-2">
          <p className="text-sm text-muted-foreground">Teacher:</p>
          <p className="text-sm font-semibold">{classItem.teacherName}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="w-[calc(50%-0.25rem)]"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-[calc(50%-0.25rem)]"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>
      </div>
    </div>
  </CarouselItem>
))}

            </CarouselContent>
         
          </Carousel>
        </div>
      </CardContent>
    </Card>

    
</div>
  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
    {/* Left Column: Upcoming Events */}
    <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
            <Card>
            <div className="flex justify-between   bg-[#fce7f3] p-4">
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
              <p className="text-left text-lg font-semibold my-3">{event.event_title}</p>
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
      {/* Attendance and Leave Status */}
      <Card className="p-0">
        <div className="flex justify-between p-4 items-center bg-[#dcf0f9] mb-4 ">
          <h2 className="text-xl font-semibold">Leave Status</h2>
          <Button variant="ghost" className="p-0 border-none">
            <span className="sr-only">Open menu</span>
            <Calendar1 />This month <ChevronDown />
          </Button>
        </div>
      
        <div className="space-y-4 mt-4 px-5">
        {leaveStatusDatastudent.map((leave, index) => (
  <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
    <div className={`flex items-center justify-center w-10 h-10 ${leave.iconBg} rounded-full`}>
      <Clock className={`w-5 h-5 ${leave.iconColor}`} />
    </div>
    <div className="flex-grow ml-4">
      <h3 className="text-base font-medium">{leave.type}</h3>
      <p className="text-xs text-gray-500">Date: {leave.date}</p>
    </div>
    <span className={`px-3 py-1 text-white rounded ${leave.color} text-xs`}>{leave.status}</span>
  </div>
))}

        </div>
      </Card>
      {/* Calendar */}
      {/* <Card className="w-full p-5">
        <Calendar    className="w-full" />
      </Card> */}
        <Card >
            <div className='flex items-center justify-between w-full p-4   bg-[#fef3c7]'>
                      <p className='text-lg font-semibold '>Home Works</p>
                      <div>
                      <DropdownMenu>
      <DropdownMenuTrigger asChild ><Button variant="ghost"  className='p-0 border-none'>
            <span className="sr-only">Open menu</span>
            <Calendar1 />All Subject <ChevronDown/>
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
      <DropdownMenuItem>Physics</DropdownMenuItem>
      <DropdownMenuItem>
          Chemistry
        </DropdownMenuItem>
        <DropdownMenuItem>Maths</DropdownMenuItem>
      </DropdownMenuContent>        
    </DropdownMenu>
    </div>
     </div>
          <div className='px-5'>
          {homeWorkstudent.map((data, index) => (
  <div key={index}>
    <div className="py-3 flex items-center space-x-2">
      <Image src={data.image} alt="Home Work Image" className="h-16 w-16 rounded" />
      <div>
        <p className={`${data.color} text-sm`}>{data.subject}</p>
        <p className="text-base font-medium">{data.content}</p>
        <div className="flex space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p className="text-sm">{data.name}</p>
          <Separator orientation="vertical" />
          <p className="text-gray-500 text-sm">due by: {data.due}</p>
        </div>
      </div>
    </div>
    <Separator />
  </div>
))}

                   
                  </div>
          </Card>
    </div>
  </div>
  {/* Footer Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Homework Card */}
  
    {/* Fees Reminder */}
    {/* <Card >
          <div className='flex items-center justify-between w-full   p-4 border-b'>
                      <p className='text-base font-semibold'>Fees Reminder</p>
                      <Button className='' variant="secondary">View All</Button>
                  </div>
                  <div className='p-5'>
                  {FeesReminderstudent.map((data, index) => (
  <div className="flex justify-between py-2 border-b" key={index}>
    <div className="flex space-x-2 items-center">
      <div className={`w-10 h-10 rounded-full ${data.bg_color} flex items-center justify-center`}>
        <data.icon className={`w-4 h-4 ${data.text_color}`} />
      </div>
      <div>
        <p className="font-medium">{data.type}</p>
        <p className="text-sm text-gray-500">{data.fee}</p>
      </div>
    </div>
    <div>
      <p>Last Day</p>
      <p className="text-sm text-gray-500">{data.date}</p>
    </div>
  </div>
))}

                  </div>      
    </Card> */}

   
    <Card className="col-span-1">
<div className='flex items-center justify-between w-full  p-4  bg-[#ecfccb]'>
                      <p className='text-base font-semibold'>Notice board</p>
                      <Button variant="outline">View All</Button>
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
  <div className="grid grid-cols-1 gap-4  ">
   
  </div>
</div>
  )};
export default StudentDashboard;
