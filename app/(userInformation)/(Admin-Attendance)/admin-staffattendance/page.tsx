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
import { CalendarIcon as Calendar1, ChevronDown, Search } from 'lucide-react';
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
  staffId: string;
  name: string;
  role: string;
  department: string;
  attendance: "Present" | "Late" | "Absent" | "Holiday" | "Halfday";
};

const StaffAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Static attendance data for staff
  const attendanceData: Attendance[] = [
    { staffId: "S001", name: "Mr. Mark Evans", role: "Office Clerk", department: "Administration", attendance: "Present" },
    { staffId: "S002", name: "Ms. Laura Adams", role: "Lab Assistant", department: "Science", attendance: "Late" },
    { staffId: "S003", name: "Mr. James Turner", role: "IT Support", department: "Technology", attendance: "Holiday" },
    { staffId: "S004", name: "Mrs. Linda Green", role: "Accountant", department: "Finance", attendance: "Present" },
    { staffId: "S005", name: "Ms. Sarah White", role: "Receptionist", department: "Administration", attendance: "Absent" },
    { staffId: "S006", name: "Mr. Paul Johnson", role: "Security Guard", department: "Security", attendance: "Halfday" },
    { staffId: "S007", name: "Mrs. Emily Brown", role: "HR Manager", department: "Human Resources", attendance: "Present" },
    { staffId: "S008", name: "Mr. Richard Hall", role: "Driver", department: "Transport", attendance: "Holiday" },
    { staffId: "S009", name: "Ms. Emma Lewis", role: "Nurse", department: "Health", attendance: "Absent" },
    { staffId: "S010", name: "Mr. John Scott", role: "Custodian", department: "Maintenance", attendance: "Present" },
    { staffId: "S011", name: "Mr. Paul Johnson", role: "Security Guard", department: "Security", attendance: "Halfday" },
    { staffId: "S012", name: "Mrs. Emily Brown", role: "HR Manager", department: "Human Resources", attendance: "Present" },
    { staffId: "S013", name: "Mr. Richard Hall", role: "Driver", department: "Transport", attendance: "Holiday" },
    { staffId: "S014", name: "Ms. Emma Lewis", role: "Nurse", department: "Health", attendance: "Absent" },
    { staffId: "S015", name: "Mr. John Scott", role: "Custodian", department: "Maintenance", attendance: "Present" },
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
    { accessorKey: "staffId", header: "Staff ID" },
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
    { accessorKey: "role", header: "Role" },
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
          <p className="text-lg font-semibold">Staff Attendance List</p>
          <div className="flex flex-wrap items-center gap-2">
            <div>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm "
            />
            </div>
            <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" >
                  Filter by Department <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterDepartment("")}>All Departments</DropdownMenuItem>
                {Array.from(new Set(attendanceData.map(item => item.department))).map((dept) => (
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
          <TableBody className="bg-white">
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
            className="bg-[#dbeafe] hover:bg-[#bfdbfe] transition-colors w-20" 
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
           className="bg-[#fecdd3] hover:bg-[#fda4af] transition-colors w-20"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;

