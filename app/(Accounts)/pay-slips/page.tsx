"use client";

import * as React from "react";
import { CalendarIcon, ChevronsUpDown, Download, MoreHorizontal, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

const payrollData = Array.from({ length: 15 }, (_, idx) => ({
  id: idx + 1,
  name: "John Doe",
  position: "Math Teacher",
  salary: 45000 + idx * 1000,
  deductions: 5000 + idx * 200,
  netPay: 40000 + idx * 800,
  paymentDate: `2023-${(idx % 12) + 1}-01`,
  month: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ][idx % 12],
}));

export default function SchoolPayrollComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage] = React.useState(10); // Rows per page
  const [open, setOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState<string | null>(null);

  const filteredData = payrollData.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
<div className="space-y-6">
  <h2 className="text-2xl font-semibold tracking-tight">Payslip Management</h2>

  {/* Search and Year Picker */}
  <div className="flex flex-col sm:flex-row justify-between gap-4">
    {/* Teacher Info */}
    <div className="rounded-md">
      <h3 className="text-lg font-semibold">Teacher: John Doe</h3>
      <p className="text-sm text-gray-600">Position: Math Teacher</p>
    </div>

    {/* Year Picker & Generate Report */}
    <div className="space-x-4 flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full sm:w-64 justify-start text-left font-normal",
              !selectedYear && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="font-semibold">Year :</span>{" "}
            {selectedYear ? selectedYear : "Pick a year"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 " align="start">
          <div className="grid grid-cols-2 gap-2 p-2">
            {years.map((year) => (
              <button
                key={year}
                className="px-4 py-2 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => {
                  setSelectedYear(year.toString());
                  setOpen(false);
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button variant={"outline"} className="">
        <Download className="h-4 w-4 mr-2" />
        Generate Report
      </Button>
    </div>
  </div>

  {/* Main Grid: Salary Table & Deductions Card */}
  <div className="grid grid-cols-12 gap-4">
    {/* Salary Table (col-span-8) */}
    <div className="col-span-12 lg:col-span-8">
      <Card className="rounded-md w-full">
        <h3 className="text-lg font-semibold p-4">Salary Details</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-black">Month</TableHead>
              <TableHead className="text-black">Salary</TableHead>
              <TableHead className="text-right text-black">Net Pay</TableHead>
              <TableHead className="text-right text-black">Payment Date</TableHead>
              <TableHead className="text-right text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {paginatedData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.month}</TableCell>
                <TableCell>${staff.salary.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  ${staff.netPay.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{staff.paymentDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div>
                        <p className="text-sm font-medium p-2">Actions</p>
                        <DropdownMenuItem className="hover:bg-gray-50 rounded-md px-3 py-2">
                          View Deductions
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>

    {/* Deductions Card (col-span-4) */}
    <div className="col-span-12 lg:col-span-4">
      <Card className="rounded-md w-full p-6 ">
        <h3 className="text-lg font-semibold">Deductions for May</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Salary deductions for the month of May.
        </p>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="text-sm font-medium">Late Attendance</p>
            <p className="text-xs text-muted-foreground">
              Deduction applied for arriving late on multiple occasions.
            </p>
          </div>
          <p className="text-sm font-medium text-red-500">-$1,200</p>
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="text-sm font-medium">Unapproved Leave</p>
            <p className="text-xs text-muted-foreground">
              Salary adjustment for unapproved leave taken during the month.
            </p>
          </div>
          <p className="text-sm font-medium text-red-500">-$2,200</p>
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="text-sm font-medium">Lost Teaching Materials</p>
            <p className="text-xs text-muted-foreground">
              Replacement cost for teaching materials lost during the term.
            </p>
          </div>
          <p className="text-sm font-medium text-red-500">-$800</p>
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="text-sm font-medium">Missed Parent-Teacher Meetings</p>
            <p className="text-xs text-muted-foreground">
              Penalty for missing mandatory parent-teacher meetings.
            </p>
          </div>
          <p className="text-sm font-medium text-red-500">-$1,000</p>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">Delayed Submission of Reports</p>
            <p className="text-xs text-muted-foreground">
              Fine imposed for late submission of academic reports.
            </p>
          </div>
          <p className="text-sm font-medium text-red-500">-$500</p>
        </div>
      </Card>
    </div>
  </div>

  {/* Pagination */}
  <div className="flex items-center justify-between mt-4">
    <div className="text-sm text-gray-700">
      Showing{" "}
      {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)}{" "}
      to {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
      {filteredData.length} entries
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-[#dbeafe] hover:bg-[#bfdbfe] transition-colors w-20" 
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
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-[#fecdd3] hover:bg-[#fda4af] transition-colors w-20"
      >
        Next
      </Button>
    </div>
  </div>
</div>

  );
}
