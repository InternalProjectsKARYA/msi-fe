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
    <div className="space-y-6 alignitems-left text-left">
    {/* Leave Stats Section */}
    <div>
      <h2 className="text-lg font-semibold mb-4">Leaves Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Applied Leaves */}
        <Card className="p-4 bg-[#c0b9cc] text-center shadow-md">
          <div className="text-4xl font-bold">{leaveStats.totalLeaves}</div>
          <div className="text-lg font-semibold text-gray-700">Total Applied Leaves</div>
        </Card>
        {/* Teacher Leaves */}
        <Card className="p-4 bg-[#f4b9bc] text-center shadow-md">
          <div className="text-4xl font-bold">{leaveStats.teacherLeaves}</div>
          <div className="text-lg font-semibold text-gray-700">Teacher Leaves</div>
        </Card>
        {/* Student Leaves */}
        <Card className="p-4 bg-[#d5e2c5] text-center shadow-md">
          <div className="text-4xl font-bold">{leaveStats.studentLeaves}</div>
          <div className="text-lg font-semibold text-gray-700">Student Leaves</div>
        </Card>
        {/* Non-Teaching Staff Leaves */}
        <Card className="p-4 bg-[#ffebb0] text-center shadow-md">
          <div className="text-4xl font-bold">{leaveStats.nonTeachingStaffLeaves}</div>
          <div className="text-lg font-semibold text-gray-700">Non-Teaching Staff Leaves</div>
        </Card>
      </div>
    </div>
  
    {/* Tabs Section */}
    <Tabs defaultValue="Student" className="w-full">
    <TabsList className="grid grid-cols-3 gap-4 w-full sm:w-2/3  ">
    <TabsTrigger value="Teacher" className="text-left">Teaching Staff</TabsTrigger>
    <TabsTrigger value="Student" className="text-left">Student</TabsTrigger>
      
    
      <TabsTrigger value="Staff" className="text-left">Non-Teaching Staff</TabsTrigger>
    </TabsList>

    {/* Teacher Tab Content */}
    <TabsContent value="Teacher" className="pt-4">
      <AdminTeacherAttendance />
    </TabsContent>

    {/* Student Tab Content */}
    <TabsContent value="Student" className="pt-4">
      <StudentLeaveRequests />
    </TabsContent>

    {/* Staff Tab Content */}
    <TabsContent value="Staff" className="pt-4">
      <StaffLeaveRequests />
    </TabsContent>
  </Tabs>
  </div>
  
  );
};

export default LeaveManagement;
