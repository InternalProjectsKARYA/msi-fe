"use client";
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon as Calendar1, ChevronDown, Search } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type Attendance = {
  teacherId: string;
  name: string;
  subject: string;
  department: string;
  attendance: "Present" | "Late" | "Absent" | "Holiday" | "Halfday";
};

const TeacherAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Static attendance data for teachers
  const attendanceData: Attendance[] = [
    { teacherId: "T001", name: "Mr. John Smith", subject: "Mathematics", department: "Science", attendance: "Present" },
    { teacherId: "T002", name: "Ms. Emma Brown", subject: "English", department: "Languages", attendance: "Late" },
    { teacherId: "T003", name: "Mrs. Sarah White", subject: "Physics", department: "Science", attendance: "Holiday" },
    { teacherId: "T004", name: "Mr. Michael Johnson", subject: "Chemistry", department: "Science", attendance: "Present" },
    { teacherId: "T005", name: "Ms. Lisa Green", subject: "History", department: "Social Studies", attendance: "Absent" },
    { teacherId: "T006", name: "Mr. Paul Walker", subject: "Biology", department: "Science", attendance: "Halfday" },
    { teacherId: "T007", name: "Mrs. Emily Davis", subject: "Geography", department: "Social Studies", attendance: "Present" },
    { teacherId: "T008", name: "Mr. Richard Lewis", subject: "Physical Education", department: "Sports", attendance: "Holiday" },
    { teacherId: "T009", name: "Ms. Jessica Taylor", subject: "Art", department: "Arts", attendance: "Absent" },
    { teacherId: "T010", name: "Mr. Robert Clark", subject: "Computer Science", department: "Technology", attendance: "Present" },
  ];

  const filteredData = useMemo(() => {
    return attendanceData
      .filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .filter((item) => (filterDepartment ? item.department === filterDepartment : true));
  }, [searchTerm, filterDepartment]);

  const columns: ColumnDef<Attendance>[] = [
    { id: "checkbox", header: () => <input type="checkbox" />, cell: () => <input type="checkbox" />, size: 50 },
    { accessorKey: "teacherId", header: "Teacher ID" },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt={row.getValue("name")} />
          </Avatar>
          <span>{row.getValue("name")}</span>
        </div>
      ),
    },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "department", header: "Department" },
    {
      accessorKey: "attendance",
      header: "Attendance",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {["Present", "Late", "Absent", "Holiday", "Halfday"].map((status) => (
            <label key={status} className="flex items-center space-x-1">
              <input
                type="radio"
                name={`attendance-${row.id}`}
                value={status}
                checked={row.getValue("attendance") === status}
                readOnly
              />
              <span
                className={`${
                  status === "Present"
                    ? "text-green-500"
                    : status === "Late"
                    ? "text-orange-500"
                    : status === "Absent"
                    ? "text-red-500"
                    : status === "Holiday"
                    ? "text-blue-500"
                    : "text-black"
                }`}
              >
                {status}
              </span>
            </label>
          ))}
        </div>
      ),
    },
  ];

  const tableInstance = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between w-full px-5 py-3 border-b">
          <p className="text-lg font-semibold">Teacher Attendance List</p>
          <div className="flex flex-wrap  items-center gap-2">
            <div>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
              </div>
              <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filter by Department <ChevronDown className="  h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterDepartment("")}>All Departments</DropdownMenuItem>
                {Array.from(new Set(attendanceData.map((item) => item.department))).map((dept) => (
                  <DropdownMenuItem key={dept} onClick={() => setFilterDepartment(dept)}>
                    {dept}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-200 text-black text-left">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableInstance.getRowModel().rows.length ? (
              tableInstance.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {tableInstance.getState().pagination.pageIndex * 10 + 1} to{" "}
          {Math.min((tableInstance.getState().pagination.pageIndex + 1) * 10, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
