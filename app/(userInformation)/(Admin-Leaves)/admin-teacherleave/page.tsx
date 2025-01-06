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
      reason: "Flu",
      approvedBy: "Admin",
      teacherName: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      teacherId: "T002",
      leaveType: "Annual Leave",
      from: "2024-12-05",
      to: "2024-12-10",
      days: 6,
      reason: "Family Vacation",
      approvedBy: "Principal",
      teacherName: "Jane Smith",
      status: "Pending",
    },
    {
      id: "3",
      teacherId: "T003",
      leaveType: "Emergency Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      days: 2,
      reason: "Medical Emergency",
      approvedBy: "Admin",
      teacherName: "Emily Johnson",
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
      teacherName: "Michael Brown",
      status: "Approved",
    },
    {
        id: "5",
        teacherId: "T001",
        leaveType: "Sick Leave",
        from: "2024-12-01",
        to: "2024-12-02",
        days: 2,
        reason: "Flu",
        approvedBy: "Admin",
        teacherName: "John Doe",
        status: "Approved",
      },
      {
        id: "6",
        teacherId: "T002",
        leaveType: "Annual Leave",
        from: "2024-12-05",
        to: "2024-12-10",
        days: 6,
        reason: "Family Vacation",
        approvedBy: "Principal",
        teacherName: "Jane Smith",
        status: "Pending",
      },
      {
        id: "7",
        teacherId: "T003",
        leaveType: "Emergency Leave",
        from: "2024-12-03",
        to: "2024-12-04",
        days: 2,
        reason: "Medical Emergency",
        approvedBy: "Admin",
        teacherName: "Emily Johnson",
        status: "Rejected",
      },
      {
        id: "8",
        teacherId: "T004",
        leaveType: "Casual Leave",
        from: "2024-12-12",
        to: "2024-12-13",
        days: 2,
        reason: "Personal Work",
        approvedBy: "Principal",
        teacherName: "Michael Brown",
        status: "Approved",
      },  {
        id: "9",
        teacherId: "T001",
        leaveType: "Sick Leave",
        from: "2024-12-01",
        to: "2024-12-02",
        days: 2,
        reason: "Flu",
        approvedBy: "Admin",
        teacherName: "John Doe",
        status: "Approved",
      },
      {
        id: "10",
        teacherId: "T002",
        leaveType: "Annual Leave",
        from: "2024-12-05",
        to: "2024-12-10",
        days: 6,
        reason: "Family Vacation",
        approvedBy: "Principal",
        teacherName: "Jane Smith",
        status: "Pending",
      },
      {
        id: "11",
        teacherId: "T003",
        leaveType: "Emergency Leave",
        from: "2024-12-03",
        to: "2024-12-04",
        days: 2,
        reason: "Medical Emergency",
        approvedBy: "Admin",
        teacherName: "Emily Johnson",
        status: "Rejected",
      },
      {
        id: "12",
        teacherId: "T004",
        leaveType: "Casual Leave",
        from: "2024-12-12",
        to: "2024-12-13",
        days: 2,
        reason: "Personal Work",
        approvedBy: "Principal",
        teacherName: "Michael Brown",
        status: "Approved",
      },  {
        id: "13",
        teacherId: "T001",
        leaveType: "Sick Leave",
        from: "2024-12-01",
        to: "2024-12-02",
        days: 2,
        reason: "Flu",
        approvedBy: "Admin",
        teacherName: "John Doe",
        status: "Approved",
      },
      {
        id: "14",
        teacherId: "T002",
        leaveType: "Annual Leave",
        from: "2024-12-05",
        to: "2024-12-10",
        days: 6,
        reason: "Family Vacation",
        approvedBy: "Principal",
        teacherName: "Jane Smith",
        status: "Pending",
      },
      {
        id: "15",
        teacherId: "T003",
        leaveType: "Emergency Leave",
        from: "2024-12-03",
        to: "2024-12-04",
        days: 2,
        reason: "Medical Emergency",
        approvedBy: "Admin",
        teacherName: "Emily Johnson",
        status: "Rejected",
      },
      {
        id: "16",
        teacherId: "T004",
        leaveType: "Casual Leave",
        from: "2024-12-12",
        to: "2024-12-13",
        days: 2,
        reason: "Personal Work",
        approvedBy: "Principal",
        teacherName: "Michael Brown",
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
    <div className="space-y-3">
     

      <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Teacher Leave Requests</h2>
        <Input
          placeholder="Search by name ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
     
      </div>

      <Card className="rounded-md border p-0">
        <Table>
          <TableHeader  >
            <TableRow className="bg-[#f9dddf]">
              <TableHead>Teacher ID</TableHead>
              <TableHead>Teacher</TableHead>
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
          <TableBody>
            {paginatedData.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.teacherId}</TableCell>
                <TableCell>{request.teacherName}</TableCell>
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
                        : "bg-[#c0b9cc] text-[#351c5a]"
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

      {/* Pagination */}
      <div className="flex items-center justify-between ">
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
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherAttendance;
