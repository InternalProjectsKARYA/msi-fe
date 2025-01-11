"use client";

import React  from "react";
 
 
 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
 
import StudentAttendance from "../admin-studentattendance/page";
import TeacherAttendance from "../admin-teacherattendance/page";
import StaffAttendance from "../admin-staffattendance/page";
import ChartDashboard from "../graph/page";
 
 
 

 


export default function AdminAttendance() {
 

 

 

 
  return (
    <>
      <Tabs defaultValue="Graph" className=" ">
       
      <TabsList className="grid w-2/1 sm:w-1/2 gap-3 grid-cols-4">
  <TabsTrigger value="Graph" className="text-center">
    Graph
  </TabsTrigger>
  <TabsTrigger value="Student" className="text-center">
    Student
  </TabsTrigger>
  <TabsTrigger value="Teacher" className="text-center">
    Teaching Staff
  </TabsTrigger>

  <TabsTrigger value="Staff" className="text-center">
    Non-Teaching Staff
  </TabsTrigger>
</TabsList>

        <TabsContent value="Graph">
        <ChartDashboard />
        </TabsContent>
        <TabsContent value="Teacher">
        <TeacherAttendance />
        </TabsContent>
        <TabsContent value="Student">
      <StudentAttendance />
        </TabsContent>
        <TabsContent value="Staff">
    <StaffAttendance />
        </TabsContent>
      </Tabs>

    
    </>
  );
}
