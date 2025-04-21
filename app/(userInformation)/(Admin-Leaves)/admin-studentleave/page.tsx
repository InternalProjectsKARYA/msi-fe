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

const StudentLeaveRequests = () => {
  // Sample leave requests for students
  const leaveRequests = [
    {
      id: "1",
      studentId: "S001",
      leaveType: "Medical Leave",
      from: "2024-12-01",
      to: "2024-12-02",
      days: 2,
      reason: "Fever",
      approvedBy: "Class Teacher",
      studentName: "Aarav Sharma",
      status: "Approved",
    },
    {
      id: "2",
      studentId: "S002",
      leaveType: "Family Leave",
      from: "2024-12-05",
      to: "2024-12-10",
      days: 6,
      reason: "Wedding in Family",
      approvedBy: "Principal",
      studentName: "Ananya Iyer",
      status: "Pending",
    },
    {
      id: "3",
      studentId: "S003",
      leaveType: "Emergency Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      days: 2,
      reason: "Hospital Visit",
      approvedBy: "Class Teacher",
      studentName: "Aditya Menon",
      status: "Rejected",
    },
    {
      id: "4",
      studentId: "S004",
      leaveType: "Festival Leave",
      from: "2024-12-12",
      to: "2024-12-13",
      days: 2,
      reason: "Festival Celebration",
      approvedBy: "Principal",
      studentName: "Ishita Reddy",
      status: "Approved",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
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
    <h2 className="text-lg font-semibold">Student Leave Requests</h2>
    <Input
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-xs "
    />
  </div>

  {/* Table Section */}
  <div className="col-span-12">
    <Card className="rounded-md border overflow-x-auto">
      <Table className="table-auto w-full min-w-full">
        <TableHeader> 
          <TableRow className="bg-gray-200">
            <TableHead className="whitespace-nowrap">Student ID</TableHead>
            <TableHead className="whitespace-nowrap">Student Name</TableHead>
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
        <TableBody >
          {paginatedData.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="whitespace-nowrap">{request.studentId}</TableCell>
              <TableCell className="whitespace-nowrap">{request.studentName}</TableCell>
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
                      : "bg-yellow-100 text-yellow-800"
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
    </Card>
  </div>

  {/* Pagination Section */}
  <div className="col-span-12 flex items-center justify-between mt-4">
    <div className="text-sm text-gray-700">
      Showing{" "}
      {Math.min((currentPage - 1) * entriesPerPage + 1, filteredData.length)}{" "}
      to {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
      {filteredData.length} entries
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-[#dbeafe] hover:bg-[#bfdbfe] transition-colors "
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

export default StudentLeaveRequests;
