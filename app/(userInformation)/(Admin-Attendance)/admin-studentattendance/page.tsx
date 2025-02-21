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
  studentId: string;
  name: string;
  class: string;
  section: string;
  attendance: "Present" | "Late" | "Absent" | "Holiday" | "Halfday";
};

const StudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Static attendance data for students
  const attendanceData: Attendance[] = [
    { studentId: "ST001", name: "John Doe", class: "VII", section: "A", attendance: "Present" },
    { studentId: "ST002", name: "Jane Smith", class: "VI", section: "B", attendance: "Late" },
    { studentId: "ST003", name: "Emily Johnson", class: "VIII", section: "A", attendance: "Holiday" },
    { studentId: "ST004", name: "Michael Brown", class: "V", section: "C", attendance: "Present" },
    { studentId: "ST005", name: "Sophia Davis", class: "IV", section: "B", attendance: "Absent" },
    { studentId: "ST006", name: "Daniel Garcia", class: "III", section: "A", attendance: "Halfday" },
    { studentId: "ST007", name: "Olivia Miller", class: "VII", section: "C", attendance: "Present" },
    { studentId: "ST008", name: "James Wilson", class: "II", section: "A", attendance: "Holiday" },
    { studentId: "ST009", name: "Ava Moore", class: "I", section: "B", attendance: "Absent" },
    { studentId: "ST010", name: "Lucas Taylor", class: "V", section: "A", attendance: "Present" },
    { studentId: "ST001", name: "John Doe", class: "VII", section: "A", attendance: "Present" },
    { studentId: "ST002", name: "Jane Smith", class: "VI", section: "B", attendance: "Late" },
    { studentId: "ST003", name: "Emily Johnson", class: "VIII", section: "A", attendance: "Holiday" },
    { studentId: "ST004", name: "Michael Brown", class: "V", section: "C", attendance: "Present" },
    { studentId: "ST005", name: "Sophia Davis", class: "IV", section: "B", attendance: "Absent" },
    { studentId: "ST006", name: "Daniel Garcia", class: "III", section: "A", attendance: "Halfday" },
    { studentId: "ST007", name: "Olivia Miller", class: "VII", section: "C", attendance: "Present" },
    { studentId: "ST008", name: "James Wilson", class: "II", section: "A", attendance: "Holiday" },
    { studentId: "ST009", name: "Ava Moore", class: "I", section: "B", attendance: "Absent" },
    { studentId: "ST010", name: "Lucas Taylor", class: "V", section: "A", attendance: "Present" },
    { studentId: "ST001", name: "John Doe", class: "VII", section: "A", attendance: "Present" },
    { studentId: "ST002", name: "Jane Smith", class: "VI", section: "B", attendance: "Late" },
    { studentId: "ST003", name: "Emily Johnson", class: "VIII", section: "A", attendance: "Holiday" },
    { studentId: "ST004", name: "Michael Brown", class: "V", section: "C", attendance: "Present" },
    { studentId: "ST005", name: "Sophia Davis", class: "IV", section: "B", attendance: "Absent" },
    { studentId: "ST006", name: "Daniel Garcia", class: "III", section: "A", attendance: "Halfday" },
    { studentId: "ST007", name: "Olivia Miller", class: "VII", section: "C", attendance: "Present" },
    { studentId: "ST008", name: "James Wilson", class: "II", section: "A", attendance: "Holiday" },
    { studentId: "ST009", name: "Ava Moore", class: "I", section: "B", attendance: "Absent" },
    { studentId: "ST010", name: "Lucas Taylor", class: "V", section: "A", attendance: "Present" },
  ];

  const filteredData = useMemo(() => {
    return attendanceData
      .filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .filter((item) => (filterClass ? item.class === filterClass : true));
  }, [searchTerm, filterClass]);

  const columns: ColumnDef<Attendance>[] = [
    { id: "checkbox", header: () => <input type="checkbox" />, cell: () => <input type="checkbox" />, size: 50 },
    { accessorKey: "studentId", header: "Student ID" },
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
    { accessorKey: "class", header: "Class" },
    { accessorKey: "section", header: "Section" },
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
        <div className="flex flex-wrap  items-center justify-between w-full px-5 py-3 border-b">
          <p className="text-lg font-semibold">Student Attendance List</p>
          <div className="flex flex-wrap items-center gap-2">
            <div>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-[#fff6d9]"
            />
           </div>
           <div>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#dcf0f9]">
                  Filter by Class <ChevronDown className="  h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterClass("")}>All Classes</DropdownMenuItem>
                {Array.from(new Set(attendanceData.map((item) => item.class))).map((cls) => (
                  <DropdownMenuItem key={cls} onClick={() => setFilterClass(cls)}>
                    Class {cls}
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
                  <TableHead key={header.id} className="bg-[#d5e2c5] text-black text-left">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-[#f2f6ec]">
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
            className="bg-[#b6e1f3]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
            className="bg-[#159ED9]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
