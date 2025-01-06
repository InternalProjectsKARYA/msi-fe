
"use client"
import Image from "next/image";
import student1 from '../../../../../public/student1.jpg'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
import TeacherData from "../../../teacherData/page";
import TeacherAttendance from "../../../teacherattendance/page";
import TimeTable from "../../../teacher-timetable/page";
// import { BooksTakenGrid } from "@/app/(libraryManagement)/library/bookstaken/page";
import StudentLeaves from "../../../leaves/page";
import StudentData from "../../../studentData/page";
import StudentAttendance from "../../../studentattendance/page";
import StudentTimeTable from "../../../student-timetable/page";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
 
 
const performance = ['A','A+','A++']


const StudentProfile = () => {
    const [selectedSize, setSelectedSize] = React.useState('XS')
    const params = useParams();
    const Id = params?.id;
    const [profileData, setProfileData] = useState({
      first_name: "",
      last_name: "",
    });
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axiosInstance.get(`/get_profile/${Id}`);
          const { data } = response.data;
          setProfileData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
          });
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      fetchProfileData();
    }, [Id]);
  return (
    <>
      
    <Card className="flex p-6 font-mono">
      
      <div className="flex-none w-48 relative z-10" >
        <Image
          src={student1}
          alt="Classic Utility Jacket"
          className="absolute inset-0 w-full h-full  rounded"
          loading="lazy"
          width={192}
          height={192}
        />
      </div>
      
      <form className="flex-auto pl-6">
      <div className="relative flex flex-wrap rounded-full items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
  <div className="flex flex-row justify-between w-full z-10">
    <h1 className="flex-auto text-lg text-white font-semibold">
    {profileData.first_name} {profileData.last_name}
      <p className="text-sm text-slate-400">IX Standard</p>
    </h1>
    <div className="flex items-center">
      <Button variant="default">
        Edit
      </Button>
    </div>
  </div>
</div>

        <div className="flex items-baseline my-3  ">
          <div className="space-x-3 flex text-sm font-medium">
            <p className="mt-2 font-semibold">Performance:</p>
            {performance.map((performance) => (
                
              <label key={performance}>
                
                <input
                  className="sr-only peer"
                  name="performance"
                  type="radio"
                  value={performance}
                  checked={selectedSize === performance}
                  onChange={() => setSelectedSize(performance)}
                />
                <div className={`relative w-10 h-10 flex items-center justify-center rounded text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400 ${selectedSize === performance ? 'bg-black text-white' : ''}`}>
                 {performance}
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-2  text-sm font-medium border-t ">
        <div className="   mb-3  mt-5  ">
            <Button
              
              type="submit"
            >
              Active
            </Button>
          
          </div>
      
        </div>
        <p className="text-xs leading-6 text-slate-500">
          Free shipping on all continental US orders.
        </p>
      </form>
    </Card>
  

<div className="col-span-9 mt-5 flex flex-col space-y-6">
<Tabs defaultValue="Personal">
  <TabsList className="grid grid-cols-5 lg:w-[600px]">
    <TabsTrigger value="Personal"  >Personal Info</TabsTrigger>
    <TabsTrigger value="Attendance"  >Attendance</TabsTrigger>
    <TabsTrigger value="Leaves"  >Leaves</TabsTrigger>
    <TabsTrigger value="Routine"  >Routine</TabsTrigger>
    {/* <TabsTrigger value="BooksTakenGrid"  >Library</TabsTrigger> */}
  </TabsList>

  <TabsContent value="Personal">
    <div className="mt-3">
    <StudentData id={undefined}  />
    </div>
  </TabsContent>
  <TabsContent value="Attendance">
   <StudentAttendance />
  </TabsContent>
  <TabsContent value="Leaves">
   <StudentLeaves />
  </TabsContent>
  <TabsContent value="Routine">
  <div className="mt-3">
  <StudentTimeTable />
  </div>
  </TabsContent>
  {/* <TabsContent value="BooksTakenGrid">
  <BooksTakenGrid />
  </TabsContent> */}
 
</Tabs>
</div>
    </>

  );
};

export default StudentProfile;
