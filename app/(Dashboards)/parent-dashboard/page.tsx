"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent,  CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
 
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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

 
 
import { Calendar1,ChevronDown, Bus ,BookOpen ,Salad ,Receipt,  ChevronRight, CalendarDays, Clock   } from 'lucide-react'
 
import { useAuthContext } from "@/lib/AuthProvider"; 
import axiosInstance from "@/lib/axiosInstance"; 

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


const ParentDashboard = () => {

   
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

 
// Sample homeWorkParent data
 
const homeWorkParent=[{subject:'Physics',content:'Write About theory Of Pendulum',name:'Balaji Rao',due:'15 jan 2024',color:' text-blue-500',image:physics},
  {subject:'Chemistry',content:'cahnge of elements',name:'Lavanya Gopal',due:'15 jan 2024',color:' text-green-500',image:chemistry},
  {subject:'Maths',content:'problem to solve apge 21',name:'Harika Reddy',due:'15 jan 2024',color:' text-red-500',image:maths},
  {subject:'English',content:'Vocabulary inroduction',name:'Rahul Varma',due:'15 jan 2024',color:' text-yellow-500',image:english}
]
 // Sample fees reminder data
  const FeesReminderParent=[{type:'Transport fee',icon:Bus, fee:'1000',date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
    {type:'Book Fee',icon:BookOpen, fee:'1000',date:'15 jun 2024',bg_color:'bg-green-100', text_color:'text-green-900'},
    {type:'Exam Fees',icon:Receipt, fee:'1000',date:'15 jun 2024',bg_color:'bg-red-100', text_color:'text-red-500'},
    {type:'Mess Fees',icon:Salad, fee:'1000',date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
    {type:'Hostel Fees',icon:Receipt, fee:'1000',date:'15 jun 2024',bg_color:'bg-red-100', text_color:'text-red-500'}
  ]
 
const NoticeBoardParent=[{type:' new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus,date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'}]
 
 

 
const leaveStatusDataParent = [
  { type: "Emergency Leave", date: "15 Jun 2024", status: "Pending", color: "bg-blue-400", iconBg: "bg-red-100", iconColor: "text-red-500" },
 
  { type: "Medical Leave", date: "16 Jun 2024", status: "Approved", color: " bg-green-400", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
  { type: "Fever", date: "16 Jun 2024", status: "Approved", color: "bg-green-400", iconBg: "bg-red-100", iconColor: "text-red-500" },
  { type: "Casual", date: "16 Jun 2024", status: "Declined", color: "bg-red-400", iconBg: " bg-red-100", iconColor: "text-red-500" },
];
 
 

 

 

 

 
  const SchedulesParent=[
    {
      event:"parent,Techers Meeting",
      data:'15 July 2024',
      // icon:UserRoundPen
    },{
      event:"parent,Techers Meeting",
      data:'15 July 2024',
      // icon:UserRoundPen
    }, 
  ]
 


 

 

 
 

 
  return (
 

<div className="space-y-3  ">

  {/* Dashboard Header */}
  <CardHeader className='p-0 px-2'>
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <CardTitle className="text-2xl font-semibold">Parent Dashboard</CardTitle>
        <CardDescription>Access to Parent</CardDescription>
      </div>
    </div>
  </CardHeader>

  {/* Admin Welcome Message Card */}
  <Card className="text-[#1ABE17] bg-[#e8f9e9] dark:bg-gray-800  border border-[#1ABE17] dark:border-[white] rounded-full">
    <CardHeader className='p-2 px-4'>
      <div className="flex items-center">
        <CardContent className='p-0 pl-4 flex items-center space-x-2'>
        <Avatar className="w-8 h-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    </Avatar>
          <p className="text-sm dark:text-white">Have a good day at work</p>
        </CardContent>
      </div>
      <div className="flex flex-col items-end absolute right-10">
        <div className="text-xs text-[#1ABE17] dark:text-white  pr-5">X</div>
      </div>
    </CardHeader>
  </Card>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
  {/* Welcome Card */}
  <Card className="col-span-1 lg:col-span-4 flex items-center space-x-4 text-white bg-[#365082] dark:bg-gray-800 relative overflow-hidden p-4">
  <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
    <div className="absolute top-[-15%] left-[-5%] w-16 h-16 border-4 border-yellow-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-15%] right-[16%] w-14 h-14 border-4 border-purple-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-15%] right-[10%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
  </div>
    {/* Background Design */}
    <Avatar className="w-20 h-20">
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
    </Avatar>
    <div>
      <p className="text-lg font-semibold">Harika Reddy</p>
      <p className="text-sm">Added on: 25 March 2024 | Child: Janet</p>
    </div>
  </Card>

{/* Info Cards Section */}
<div className="col-span-1 lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-4">
  {/* Apply Leave and Raise a Request Section */}
  <div className="flex flex-col gap-4 col-span-1 lg:col-span-3">
    <Card className="flex justify-between items-center border p-4 h-[60px]">
      <div className="flex items-center space-x-2">
        <Calendar1 className="w-5 h-5" />
        <p className="text-sm font-medium">Apply Leave</p>
      </div>
      <ChevronRight className="w-5 h-5" />
    </Card>
    <Card className="flex justify-between items-center border p-4 h-[60px]">
      <div className="flex items-center space-x-2">
        <Calendar1 className="w-5 h-5" />
        <p className="text-sm font-medium">Raise a Request</p>
      </div>
      <ChevronRight className="w-5 h-5" />
    </Card>
  </div>

  {/* Medical Leaves and Casual Leaves Section */}
  <div className="flex gap-4 col-span-1 lg:col-span-5">
    <Card className="p-4 w-full">
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

    <Card className="p-4 w-full">
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


 
  {/* Upcoming Events and Bar Chart */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-5">
    
    {/* Left Column - Events and Bar Chart */}
    <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
      <Card>
        <CardContent>
          <div className="flex justify-between py-5">
            <h1 className='text-xl font-semibold'>Upcoming Events</h1>
            <Button variant="secondary">Add new</Button>
          </div>
          <Separator className='mb-2'/>
          {SchedulesParent.map((data, index) => (
  <div key={`schedule-${index}`} className="border-l-4 p-3 my-4">
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
          <Avatar className="h-[30px] w-[30px]" key={`avatar-${idx}`}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        ))}
      </div>
    </div>
  </div>
))}

        </CardContent>
      </Card>
{/* notice board card */}
<Card className="col-span-1">
<div className='flex items-center justify-between w-full  p-4 border-b'>
           <p className='text-base font-semibold'>Notice board</p>
           <Button variant="secondary">
           View All
</Button>
       </div>
       <div className='p-5'>
       {NoticeBoardParent.map((data, index) => (
  <div key={`notice-${index}`} className="flex justify-between py-3 border-b items-center">
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
    <ChevronRight className="w-4 h-4" />
  </div>
))}


        

       </div>
</Card>
      
    </div>

    {/* Right Column - Attendance and Carousel */}
   
    <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
   
      {/* <div className="col-span-1 lg:col-span-4">
      <Card className="w-full p-5">
  <div className="w-full">
    <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
  </div>
</Card>


    </div> */}


    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leave Status</h2>
        <Button variant="ghost"  className='p-0 border-none'>
              <span className="sr-only">Open menu</span>
              <Calendar1 />This month <ChevronDown/>
            </Button>
      </div>
      <Separator />
      <div className="space-y-4 mt-4">
      {leaveStatusDataParent.map((leave, index) => (
  <div key={`leave-${index}`} className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
    <div className={`flex items-center justify-center w-10 h-10 ${leave.iconBg} rounded-full`}>
      <Clock className={`w-5 h-5 ${leave.iconColor}`} />
    </div>
    <div className="flex-grow ml-4">
      <h3 className="text-base font-medium">{leave.type}</h3>
      <p className="text-xs text-gray-500">Date: {leave.date}</p>
    </div>
    <span className={`px-3 py-1 text-white rounded ${leave.color} text-xs`}>
      {leave.status}
    </span>
  </div>
))}

      </div>
    </Card>

 {/* Fees Reminder Card */}
 <Card>
<div className='flex items-center justify-between w-full   p-4 border-b'>
           <p className='text-base font-semibold'>Fees Reminder</p>
           <Button className='' variant="secondary">
           View All
</Button>
       </div>
       <div className='p-5'>
       {FeesReminderParent.map((data, index) => (
  <div key={`fees-${index}`} className="flex justify-between py-2 border-b">
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
      <p className="">Last Day</p>
      <p className="text-sm text-gray-500">{data.date}</p>
    </div>
  </div>
))}

        

       </div>
</Card>     





      </div>

      <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
 
 

 
      
 {/* homeWorkParent Card */}
<Card>
 
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
       {homeWorkParent.map((data, index) => (
  <div key={`homeWorkParent-${index}`} className="py-3 flex items-center space-x-2">
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
))}

        
       </div>
</Card>



</div>

  </div>


 
   
</div>

   
  );
};

export default ParentDashboard;
