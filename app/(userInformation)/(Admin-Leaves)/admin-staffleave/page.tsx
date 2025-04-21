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

const StaffLeaveRequests = () => {
  // Sample leave requests for staff 
  const leaveRequests = [
    {
      id: "1",
      staffId: "ST001",
      leaveType: "Sick Leave",
      from: "2024-12-01",
      to: "2024-12-02",
      days: 2,
      reason: "Flu",
      approvedBy: "HR",
      staffName: "Rajesh Kumar",
      status: "Approved",
    },
    {
      id: "2",
      staffId: "ST002",
      leaveType: "Annual Leave",
      from: "2024-12-05",
      to: "2024-12-15",
      days: 11,
      reason: "Family Function",
      approvedBy: "HR Manager",
      staffName: "Sita Rani",
      status: "Pending",
    },
    {
      id: "3",
      staffId: "ST003",
      leaveType: "Emergency Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      days: 2,
      reason: "Urgent Work",
      approvedBy: "HR",
      staffName: "Vijay Kumar",
      status: "Rejected",
    },
    {
      id: "4",
      staffId: "ST004",
      leaveType: "Casual Leave",
      from: "2024-12-12",
      to: "2024-12-14",
      days: 3,
      reason: "Personal Work",
      approvedBy: "HR Manager",
      staffName: "Priya Devi",
      status: "Approved",
    },
    {
      id: "5",
      staffId: "ST005",
      leaveType: "Sick Leave",
      from: "2024-12-01",
      to: "2024-12-02",
      days: 2,
      reason: "Flu",
      approvedBy: "HR",
      staffName: "Ravi Shankar",
      status: "Approved",
    },
    {
      id: "6",
      staffId: "ST006",
      leaveType: "Annual Leave",
      from: "2024-12-05",
      to: "2024-12-10",
      days: 6,
      reason: "Family Vacation",
      approvedBy: "Principal",
      staffName: "Lakshmi Narayan",
      status: "Pending",
    },
    {
      id: "7",
      staffId: "ST007",
      leaveType: "Emergency Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      days: 2,
      reason: "Medical Emergency",
      approvedBy: "HR",
      staffName: "Hari Prasad",
      status: "Rejected",
    },
    {
      id: "8",
      staffId: "ST008",
      leaveType: "Casual Leave",
      from: "2024-12-12",
      to: "2024-12-13",
      days: 2,
      reason: "Personal Work",
      approvedBy: "HR Manager",
      staffName: "Anjali Reddy",
      status: "Approved",
    },
    {
      id: "9",
      staffId: "ST009",
      leaveType: "Sick Leave",
      from: "2024-12-01",
      to: "2024-12-02",
      days: 2,
      reason: "Flu",
      approvedBy: "HR",
      staffName: "Karthik Venkatesh",
      status: "Approved",
    },
    {
      id: "10",
      staffId: "ST010",
      leaveType: "Annual Leave",
      from: "2024-12-05",
      to: "2024-12-10",
      days: 6,
      reason: "Family Vacation",
      approvedBy: "Principal",
      staffName: "Aishwarya Lakshmi",
      status: "Pending",
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
      <h2 className="text-lg font-semibold">Staff Leave Requests</h2>
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
              <TableHead>Staff ID</TableHead>
              <TableHead>Staff Name</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {paginatedData.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.staffId}</TableCell>
                <TableCell>{request.staffName}</TableCell>
                <TableCell>{request.leaveType}</TableCell>
                <TableCell>{request.from}</TableCell>
                <TableCell>{request.to}</TableCell>
                <TableCell>{request.days}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.approvedBy}</TableCell>
                <TableCell>
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
                <TableCell>
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

export default StaffLeaveRequests;
