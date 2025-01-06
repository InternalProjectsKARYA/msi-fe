"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminTeacherAttendance from "../admin-teacherleave/page";
import StudentLeaveRequests from "../admin-studentleave/page";
import StaffLeaveRequests from "../admin-staffleave/page";

interface LeaveStats {
  teacherLeaves: number;
  studentLeaves: number;
  nonTeachingStaffLeaves: number;
  totalLeaves: number;
}

interface LeaveRequest {
  id: string;
  leaveType: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  approvedBy: string;
  candidateName: string;
  status: "Approved" | "Rejected" | "Pending";
}

const LeaveManagement = () => {
  // Sample data
  const leaveStats: LeaveStats = {
    teacherLeaves: 3,
    studentLeaves: 15,
    nonTeachingStaffLeaves: 7,
    totalLeaves: 25,
  };

   

  return (
    <div className="space-y-6">
      {/* Leave Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Leaves Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#c0b9cc]">
            <div className="text-4xl font-bold">{leaveStats.totalLeaves}</div>
            <div className="text-lg font-semibold  text-gray-600">Total Applied Leaves</div>
          </Card>
          <Card className="p-4 bg-[#f4b9bc]">
            <div className="text-4xl font-bold">{leaveStats.teacherLeaves}</div>
            <div className="text-lg font-semibold text-gray-600">Teachers Leaves</div>
          </Card>
          <Card className="p-4 bg-[#d5e2c5]">
            <div className="text-4xl font-bold">{leaveStats.studentLeaves}</div>
            <div className="text-lg font-semibold text-gray-600">Students Leaves</div>
          </Card>
          <Card className="p-4 bg-[#ffebb0]">
            <div className="text-4xl font-bold">{leaveStats.nonTeachingStaffLeaves}</div>
            <div className="text-lg font-semibold text-gray-600">Non-Teaching Staff Leaves</div>
          </Card>
        
        </div>
      </div>
      <Tabs defaultValue="Teacher" className="">
       
       <TabsList className="grid w-[20%] bg-gray-200 grid-cols-3">
      
         <TabsTrigger value="Teacher">Teacher</TabsTrigger>
         <TabsTrigger value="Student">Student</TabsTrigger>
         <TabsTrigger value="Staff">Staff</TabsTrigger>
       </TabsList>
     
       <TabsContent value="Teacher">
  <AdminTeacherAttendance />
       </TabsContent>
       <TabsContent value="Student">
 <StudentLeaveRequests />
       </TabsContent>
       <TabsContent value="Staff">
 <StaffLeaveRequests />
       </TabsContent>
     </Tabs>
     
    
    </div>
  );
};

export default LeaveManagement;
