"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent,   CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // You can use this for the update status
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import {  Pie, PieChart,   } from "recharts"
 
import {        CalendarDays, Clock,   } from 'lucide-react';
 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
 
} from "@/components/ui/chart"
 
 
 
import  { useRouter } from 'next/navigation';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar1,ChevronDown, Bus  , ChevronRight   } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "@/components/ui/table"
import { Progress } from '@/components/ui/progress';
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

const TeacherDashboard = () => {
  const router = useRouter(); 
 
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


 
 
const NoticeBoard=[{type:' new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus,date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'},
  {type:'new Syllabus Instructions',icon:Bus, date:'15 jun 2024',bg_color:'bg-blue-100', text_color:'text-blue-500'}]
 

  const Schedules=[
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
      title: "Total Teaching Staff",
      total: "3654",
      active: "3643",
      inactive: "11",
      badge: { color: "yellow", value: "1.2%" },
    },
    {
      title: "Total Students",
      total: "12,345",
      active: "12,300",
      inactive: "45",
      badge: { color: "green", value: "4.5%" },
    },
    {
      title: "Total Non-Teaching Staff",
      total: "567",
      active: "560",
      inactive: "7",
      badge: { color: "red", value: "-0.5%" },
    },
    {
      title: "Total Classes",
      total: "123",
      active: "120",
      inactive: "3",
      badge: { color: "blue", value: "2.0%" },
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
  {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 
  <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-6">
   
    <div className="col-span-5">
      <Card className="flex justify-between text-white relative bg-[#365082] p-6 rounded-lg shadow-lg">
       
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
          <div className="absolute top-[-15%] left-[-5%] w-16 h-16 border-4 border-yellow-400 dark:border-white rounded-full"></div>
          <div className="absolute bottom-[-15%] right-[16%] w-14 h-14 border-4 border-purple-400 dark:border-white rounded-full"></div>
          <div className="absolute bottom-[-15%] right-[10%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
        </div>

 
        <div className="relative z-10 flex items-center space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          </Avatar>

          <div>
            <h3 className="text-xl font-semibold">Welcome Back, {user?.user_name}</h3>
            <Button className="mt-2  " variant="secondary" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>
    </div>

  
    <div className="col-span-3">
    <Card className="flex flex-row">
   
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[130px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={30}
              strokeWidth={5}
            >
              
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-center justify-center ">
        <h2 className='font-semibold text-xl'>Syllabus</h2>
      <p className="text-green-500">Completed: 95%</p>
      <p className="text-red-500">Pending: 5%</p>
      </CardFooter>
    </Card>
    </div>
  </div>

 
  <div className="lg:col-span-4">
  <Card>
        <CardContent>
          <div className="flex justify-between py-5">
            <h1 className="text-xl font-semibold">Upcoming Events</h1>
            <Button variant="secondary">Add New</Button>
          </div>
          <Separator className="mb-2" />
          {Schedules.map((data, index) => (
            <div className="border-l-4 p-3 my-4" key={index}>
              <div className="flex gap-4">
                <p className="text-sm">{data.event}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <CalendarDays className="w-3 mr-2" />  
                </p>
              </div>
              <Separator />
              <div className="flex justify-between mt-3">
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 mr-2" /> 9:10AM-10:15AM
                </p>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, idx) => (
                    <Avatar className="h-6 w-6" key={idx}>
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
</div> */}

  {/* Welcome Message */}
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
  {/* Profile and Stats Section */}
  <div className="grid grid-cols-1 relative lg:grid-cols-3 gap-4">
    {/* Profile Card */}


    <Card className="flex justify-between text-white relative    bg-[#365082] p-6 rounded-lg shadow-lg">
  {/* Decorative Circles */}
  <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
    <div className="absolute top-[-15%] left-[-5%] w-16 h-16 border-4 border-yellow-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-15%] right-[16%] w-14 h-14 border-4 border-purple-400 dark:border-white rounded-full"></div>
    <div className="absolute bottom-[-15%] right-[10%] w-16 h-16 border-4 border-green-400 dark:border-white rounded-full"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 flex items-center space-x-6">
    <Avatar className="w-20 h-20">
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
    </Avatar>

    <div>
      <h3 className="text-xl font-semibold text-white">Welcome Back, {user?.user_name || "Teacher"}</h3>
      <Button className="mt-2     " variant="secondary" onClick={handleEditProfile}>
        Edit Profile
      </Button>
    </div>
  </div>
</Card>


    {/* Info Cards */}
    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {data.map((item, index) => (
    <Card key={index}>
      <CardHeader>
        <h3 className="text-xl font-semibold">{item.title}</h3>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <h4 className="text-xl">{item.total}</h4>
          <p className="text-sm">Active: {item.active}</p>
          <p className="text-sm">Inactive: {item.inactive}</p>
        </div>
        <Badge color={item.badge.color}>{item.badge.value}</Badge>
      </CardContent>
    </Card>
  ))}
    </div>
  </div>

  {/* Lessons and Syllabus */}
  <Card className='w-full'>
    <CardHeader>
    <div className='flex justify-between w-full'>
   <div className='text-lg font-semibold'>Lesson/Syllabus</div>
   <div>View all</div>
    </div>
    </CardHeader>
    <Separator/>
    <CardContent className='p-5'>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, idx) => (
      <Card key={idx} className='p-5'>
        
       <div>
        <p className='px-2 py-1 bg-gray-100 my-2 text-center dark:text-black'>Class V,B</p>
        <p className='text-lg font-semibold my-2'>inroduction to physics on Tech </p>
        <Progress value={75} className='my-2'/>
        <Separator/>
        <div className='flex justify-between mt-2'>
          <p>Reschedule</p>
          <p>share</p>
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
    <div className="col-span-1 lg:col-span-4 space-y-6">
      <Card>
        <CardContent>
          <div className="flex justify-between py-5">
            <h1 className="text-xl font-semibold">Upcoming Events</h1>
            <Button variant="secondary">Add New</Button>
          </div>
          <Separator className="mb-2" />
          {Schedules.map((data, index) => (
            <div className="border-l-4 p-3 my-4" key={index}>
              <div className="flex gap-4">
                <p className="text-sm">{data.event}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <CalendarDays className="w-3 mr-2" />  
                </p>
              </div>
              <Separator />
              <div className="flex justify-between mt-3">
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 mr-2" /> 9:10AM-10:15AM
                </p>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, idx) => (
                    <Avatar className="h-6 w-6" key={idx}>
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
      {/* Attendance */}
      <Card className="w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          {Attendence.map((data, index) => (
            <div
              className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded items-center h-[70px]"
              key={index}
            >
              <div>
                <p className="text-center">{data.count}</p>
                <p>{data.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ChartContainer config={chartConfig} className="w-full max-w-[250px] aspect-square">
            <PieChart>
              <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={65} strokeWidth={10} />
            </PieChart>
          </ChartContainer>
        </div>
        <Button variant="secondary" className="mt-4">View Details</Button>
      </Card>

      {/* Calendar */}
      {/* <Card className="w-full p-5">
        <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
      </Card> */}
        <Card className="col-span-1">
  <div className='flex items-center justify-between w-full  p-4 border-b'>
                        <p className='text-base font-semibold'>Notice board</p>
                        <Button variant="secondary">
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
