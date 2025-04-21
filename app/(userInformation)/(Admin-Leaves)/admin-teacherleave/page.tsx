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
import { Input } from "@/components/ui/input";
import { Edit2, Trash2 } from "lucide-react";

const AdminTeacherAttendance = () => {
  // Sample leave requests for teachers
  const leaveRequests = [
    {
      id: "1",
      teacherId: "T001",
      leaveType: "Sick Leave",
      from: "2024-12-01",
      to: "2024-12-02",
      days: 2,
      reason: "Fever",
      approvedBy: "Admin",
      teacherName: "Aadhav Sundaram",
      status: "Approved",
    },
    {
      id: "2",
      teacherId: "T002",
      leaveType: "Annual Leave",
      from: "2024-12-05",
      to: "2024-12-10",
      days: 6,
      reason: "Family Function",
      approvedBy: "Principal",
      teacherName: "Kavya Nair",
      status: "Pending",
    },
    {
      id: "3",
      teacherId: "T003",
      leaveType: "Emergency Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      days: 2,
      reason: "Personal Emergency",
      approvedBy: "Admin",
      teacherName: "Arjun Menon",
      status: "Rejected",
    },
    {
      id: "4",
      teacherId: "T004",
      leaveType: "Casual Leave",
      from: "2024-12-12",
      to: "2024-12-13",
      days: 2,
      reason: "Personal Work",
      approvedBy: "Principal",
      teacherName: "Lakshmi Krishnan",
      status: "Approved",
    },
    {
      id: "5",
      teacherId: "T005",
      leaveType: "Sick Leave",
      from: "2024-12-15",
      to: "2024-12-16",
      days: 2,
      reason: "Migraine",
      approvedBy: "Admin",
      teacherName: "Karthik Raman",
      status: "Approved",
    },
    {
      id: "6",
      teacherId: "T006",
      leaveType: "Annual Leave",
      from: "2024-12-20",
      to: "2024-12-25",
      days: 6,
      reason: "Vacation",
      approvedBy: "Principal",
      teacherName: "Meera Rajesh",
      status: "Pending",
    },
    {
      id: "7",
      teacherId: "T007",
      leaveType: "Emergency Leave",
      from: "2024-12-18",
      to: "2024-12-19",
      days: 2,
      reason: "Family Emergency",
      approvedBy: "Admin",
      teacherName: "Vijay Subramaniam",
      status: "Rejected",
    },
    {
      id: "8",
      teacherId: "T008",
      leaveType: "Casual Leave",
      from: "2024-12-27",
      to: "2024-12-28",
      days: 2,
      reason: "Personal Work",
      approvedBy: "Principal",
      teacherName: "Priya Venkatesh",
      status: "Approved",
    },
    {
      id: "9",
      teacherId: "T009",
      leaveType: "Sick Leave",
      from: "2024-12-30",
      to: "2024-12-31",
      days: 2,
      reason: "Flu",
      approvedBy: "Admin",
      teacherName: "Rahul Nambiar",
      status: "Approved",
    },
    {
      id: "10",
      teacherId: "T010",
      leaveType: "Annual Leave",
      from: "2025-01-02",
      to: "2025-01-07",
      days: 6,
      reason: "Family Trip",
      approvedBy: "Principal",
      teacherName: "Ananya Padmanabhan",
      status: "Pending",
    },
    {
      id: "11",
      teacherId: "T011",
      leaveType: "Emergency Leave",
      from: "2025-01-10",
      to: "2025-01-11",
      days: 2,
      reason: "Urgent Matter",
      approvedBy: "Admin",
      teacherName: "Siddharth Iyer",
      status: "Rejected",
    },
    {
      id: "12",
      teacherId: "T012",
      leaveType: "Casual Leave",
      from: "2025-01-15",
      to: "2025-01-16",
      days: 2,
      reason: "Personal Errand",
      approvedBy: "Principal",
      teacherName: "Divya Shankar",
      status: "Approved",
    },
    {
      id: "13",
      teacherId: "T013",
      leaveType: "Sick Leave",
      from: "2025-01-20",
      to: "2025-01-21",
      days: 2,
      reason: "Food Poisoning",
      approvedBy: "Admin",
      teacherName: "Arun Pillai",
      status: "Approved",
    },
    {
      id: "14",
      teacherId: "T014",
      leaveType: "Annual Leave",
      from: "2025-01-25",
      to: "2025-01-30",
      days: 6,
      reason: "Wedding",
      approvedBy: "Principal",
      teacherName: "Sneha Gopinath",
      status: "Pending",
    },
    {
      id: "15",
      teacherId: "T015",
      leaveType: "Emergency Leave",
      from: "2025-02-01",
      to: "2025-02-02",
      days: 2,
      reason: "Unforeseen Circumstances",
      approvedBy: "Admin",
      teacherName: "Vivek Chandran",
      status: "Rejected",
    },
    {
      id: "16",
      teacherId: "T016",
      leaveType: "Casual Leave",
      from: "2025-02-05",
      to: "2025-02-06",
      days: 2,
      reason: "Personal Appointment",
      approvedBy: "Principal",
      teacherName: "Nithya Balasubramanian",
      status: "Approved",
    },
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return leaveRequests.filter((request) =>
      Object.values(request)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(startIndex, startIndex + entriesPerPage);
  }, [currentPage, entriesPerPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="grid grid-cols-12 gap-4">
    {/* Header Section */}
    <div className="col-span-12 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Teacher Leave Requests</h2>
      <Input
        placeholder="Search by name ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-xs bg-[#c0b9cc]"
      />
    </div>
  
    {/* Table Section */}
    <div className="col-span-12">
      <Card className="rounded-md border p-0 w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="table-auto min-w-full">
            <TableHeader>
              <TableRow className="bg-[#f4b9bc]">
                <TableHead className="whitespace-nowrap">ID</TableHead>
                <TableHead className="whitespace-nowrap">Teacher</TableHead>
                <TableHead className="whitespace-nowrap">Leave Type</TableHead>
                <TableHead className="whitespace-nowrap">From</TableHead>
                <TableHead className="whitespace-nowrap">To</TableHead>
                <TableHead className="whitespace-nowrap">Days</TableHead>
                <TableHead className="whitespace-nowrap">Reason</TableHead>
                <TableHead className="whitespace-nowrap">Approved By</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#fbe9ea]">
              {paginatedData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="whitespace-nowrap">{request.teacherId}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.teacherName}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.leaveType}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.from}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.to}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.days}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.reason}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.approvedBy}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-[#c0b9cc] text-[#351c5a]"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  
    {/* Pagination Section */}
    <div className="col-span-12 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing{" "}
        {Math.min((currentPage - 1) * entriesPerPage + 1, filteredData.length)} to{" "}
        {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
        {filteredData.length} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#dbeafe] hover:bg-[#bfdbfe] transition-colors"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-[#fecdd3] hover:bg-[#fda4af] transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
  
  );
};

export default AdminTeacherAttendance;
