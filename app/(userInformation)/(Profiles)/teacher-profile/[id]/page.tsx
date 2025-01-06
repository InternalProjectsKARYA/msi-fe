"use client"
import Image from "next/image";
import student1 from '../../../../../public/student3.jpg'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentData from "../../../studentData/page";
import TeacherData from "../../../teacherData/page";
import TeacherAttendance from "../../../teacherattendance/page";
import TimeTable from "../../../teacher-timetable/page";
// import { BooksTakenGrid } from "@/app/(libraryManagement)/library/bookstaken/page";
import StudentLeaves from "../../../leaves/page";
import StudentLeaveRequests from "../../../(Admin-Leaves)/admin-studentleave/page";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";

const TeacherProfile = () => {
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
        <Card className="flex font-sans">
      <div className="flex-none w-48 relative">
        <Image
          src={student1}
          alt="Classic Utility Jacket"
          className="absolute inset-0 w-full h-full  rounded"
          loading="lazy"
          width={192}
          height={192}
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
        <h1 className="flex-auto text-lg font-semibold text-slate-900">
        {profileData.first_name} {profileData.last_name}
          <p className="text-sm text-slate-400">Mathematics Teacher</p>
        </h1>


          <Button
            
            variant={"default"}
            >
              Edit
            </Button>
          
        </div>
        <div className="flex items-baseline  mb-4   border-b border-slate-200">
        <div className="    text-sm font-medium  mt-5 text-slate-700 ">
            Perfomance :
          </div>
          <div className="space-x-2 flex   text-sm font-semibold text-slate-700">
            {["A", "A+", "A++" ].map((size) => (
              <label key={size}>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value={size}
                  defaultChecked={size === "xs"}
                />
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  {size.toUpperCase()}
                </div>
              </label>
            ))}
          </div>
        </div>
        
          <div className="   mb-3    ">
            <Button
              
              type="submit"
            >
              Active
            </Button>
          
          </div>
        
       
<p className="text-sm text-slate-700">
  Empowering teachers with free resources and tools for the classroom.
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
    <TeacherData   />
    </div>
  </TabsContent>
  <TabsContent value="Attendance">
   <TeacherAttendance />
  </TabsContent>
  <TabsContent value="Leaves">
   <StudentLeaves />
  </TabsContent>
  <TabsContent value="Routine">
  <div className="mt-3">
  <TimeTable />
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

export default TeacherProfile;
