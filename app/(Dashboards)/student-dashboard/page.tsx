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
import physics from '../../../public/Physics.webp'
import maths from '../../../public/maths.jpg'
import chemistry from '../../../public/Chemistry.jpg'
import english from '../../../public/English.jpg'
import Image from 'next/image'
import { useAuthContext } from "@/lib/AuthProvider";  
import axiosInstance from "@/lib/axiosInstance";  
 
import {       CalendarArrowUpIcon, CalendarDays, Clock,  GraduationCapIcon, Mail, MessageCircle, ScrollText } from 'lucide-react';
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
const Schedulesstudent=[
    {
      event:"parent,Techers Meeting",
      data:'15 July 2024',
      // icon:UserRoundPen
    },{
      event:"parent,Techers Meeting",
      data:'15 July 2024',
      // icon:UserRoundPen
    },{
      event:"Vacation Meeting",
      data:'7-july-2024',
      // icon:UserRoundPen
    }
  ]

 

 

  const TeachersSN = [
    { name: "John Doe", subject: "Mathematics", avatar: "JD" },
    { name: "Jane Smith", subject: "Biology", avatar: "JS" },
    { name: "Bob Johnson", subject: "Physics", avatar: "BJ" },
    { name: "Alice Brown", subject: "Chemistry", avatar: "AB" },
    { name: "Charlie Davis", subject: "English", avatar: "CD" },
    { name: "Eva Wilson", subject: "History", avatar: "EW" },
  ]
  

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

  {/* Admin Welcome Message Card */}
  <Card className="text-[#1ABE17] bg-[#e8f9e9] dark:bg-gray-800 border border-[#1ABE17] dark:border-white rounded-full">
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
        <div className="text-xs text-[#1ABE17] dark:text-white pr-5">X</div>
      </div>
    </CardHeader>
  </Card>

  {/* Profile and Quick Actions */}
  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
    {/* Profile Card */}
    <Card className="text-white bg-[#365082] dark:bg-gray-800 relative overflow-hidden p-5 col-span-1">

    <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
    <div className="absolute top-[-25%] left-[-5%] w-16 h-16 border-4 border-yellow-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-20%] right-[36%] w-14 h-14 border-4 border-purple-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-18%] right-[30%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
  </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 pl-5">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          </Avatar>
          <div>
           
            <p className="text-lg font-semibold">{user?.user_name}</p>
            <p className="text-sm text-gray-400">Class: IIIC | Roll No: 36547</p>
          </div>
        </div>
        <Button  variant={"secondary"}>Edit Profile</Button>
      </div>
    </Card>

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
  </div>
  <div  className='relative my-5 '>
  <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold">Class Faculties</CardTitle>
      </CardHeader>
      <CardContent className="p-6  px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {TeachersSN.map((faculty, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-4 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${faculty.avatar}`} alt={faculty.name} />
                      <AvatarFallback>{faculty.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{faculty.name}</h3>
                      <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm" className="w-[calc(50%-0.25rem)]">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="w-[calc(50%-0.25rem)]">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="hidden md:flex -right-12 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </CardContent>
    </Card>
</div>
  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-5">
    {/* Left Column: Upcoming Events */}
    <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
      <Card>
        <CardContent>
          <div className="flex justify-between py-5">
            <h1 className="text-xl font-semibold">Upcoming Events</h1>
           
          </div>
          <Separator className="mb-2" />
          {Schedulesstudent.map((data, index) => (
            <div className="border-l-4 p-3 my-4" key={index}>
              <div className="flex gap-4 m-2">
                <div className="text-sm">
                  <p className="text-center">{data.event}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarDays className="w-3" />
                    {data.data}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex my-3 justify-between">
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-3 mr-2" /> 9:10AM-10:15AM
                </p>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, idx) => (
                    <Avatar className="h-[30px] w-[30px]" key={idx}>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Leave Status</h2>
          <Button variant="ghost" className="p-0 border-none">
            <span className="sr-only">Open menu</span>
            <Calendar1 />This month <ChevronDown />
          </Button>
        </div>
        <Separator />
        <div className="space-y-4 mt-4">
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
            <div className='flex items-center justify-between w-full p-4  border-b'>
                      <p className='text-lg font-semibold'>Home Works</p>
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
<div className='flex items-center justify-between w-full  p-4 border-b'>
                      <p className='text-base font-semibold'>Notice board</p>
                      <Button variant="secondary">View All</Button>
                  </div>
                  <div className='p-5'>
                  {NoticeBoardstudent.map((data, index) => (
  <div className="flex justify-between py-3 border-b items-center" key={index}>
    <div className="flex space-x-2 items-center">
      <div className={`w-8 h-8 rounded-full ${data.bg_color} flex items-center justify-center`}>
        <data.icon className={`w-3 h-3 ${data.text_color}`} />
      </div>
      <div>
        <p className="font-medium">{data.type}</p>
        <span className="flex text-sm text-gray-500 items-center gap-2">
          <Calendar1 className="w-4 h-4" /> Added On: {data.date}
        </span>
      </div>
    </div>
    <div>
      <ChevronRight className="w-4 h-4" />
    </div>
  </div>
))}

                   </div>
                   </Card>
  </div>
  <div className="grid grid-cols-1 gap-4  ">
   
  </div>
</div>
  )};
export default StudentDashboard;
