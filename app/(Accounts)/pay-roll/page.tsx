"use client";

import * as React from "react";
import { CalendarIcon, ChevronsUpDown, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const payrollData = [
  { id: 1, name: "John Doe", position: "Math Teacher", salary: 45000, deductions: 5000, netPay: 40000, paymentDate: "2023-05-01" },
  { id: 2, name: "Jane Smith", position: "English Teacher", salary: 42000, deductions: 4500, netPay: 37500, paymentDate: "2023-05-01" },
  { id: 3, name: "Mike Johnson", position: "Admin Assistant", salary: 35000, deductions: 3000, netPay: 32000, paymentDate: "2023-05-01" },
  { id: 4, name: "Sarah Williams", position: "Counselor", salary: 50000, deductions: 6000, netPay: 44000, paymentDate: "2023-05-01" },
  { id: 5, name: "Robert Brown", position: "IT Support", salary: 40000, deductions: 4000, netPay: 36000, paymentDate: "2023-05-01" },
  { id: 6, name: "John Doe", position: "Math Teacher", salary: 45000, deductions: 5000, netPay: 40000, paymentDate: "2023-05-01" },
  { id: 7, name: "Jane Smith", position: "English Teacher", salary: 42000, deductions: 4500, netPay: 37500, paymentDate: "2023-05-01" },
  { id: 8, name: "Mike Johnson", position: "Admin Assistant", salary: 35000, deductions: 3000, netPay: 32000, paymentDate: "2023-05-01" },
  { id: 9, name: "Sarah Williams", position: "Counselor", salary: 50000, deductions: 6000, netPay: 44000, paymentDate: "2023-05-01" },
  { id: 10, name: "Robert Brown", position: "IT Support", salary: 40000, deductions: 4000, netPay: 36000, paymentDate: "2023-05-01" },
  { id: 11, name: "John Doe", position: "Math Teacher", salary: 45000, deductions: 5000, netPay: 40000, paymentDate: "2023-05-01" },
  { id: 12, name: "Jane Smith", position: "English Teacher", salary: 42000, deductions: 4500, netPay: 37500, paymentDate: "2023-05-01" },
  { id: 13, name: "Mike Johnson", position: "Admin Assistant", salary: 35000, deductions: 3000, netPay: 32000, paymentDate: "2023-05-01" },
  { id: 14, name: "Sarah Williams", position: "Counselor", salary: 50000, deductions: 6000, netPay: 44000, paymentDate: "2023-05-01" },
  { id: 15, name: "Robert Brown", position: "IT Support", salary: 40000, deductions: 4000, netPay: 36000, paymentDate: "2023-05-01" },
];

export default function SchoolPayrollComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage] = React.useState(10); // Rows per page
  const [open, setOpen] = React.useState(false) 
 
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);
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
    <h2 className="text-2xl font-semibold tracking-tight">Payroll Management</h2>
  
    {/* Search and Filters Section */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Search Input and Total Button */}
      <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="sm:w-72 "
        />
        <Button variant="outline" >
          Total: $53,32,000 /-
        </Button>
      </div>
  
      {/* Month Picker and Generate Report */}
      <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 justify-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full sm:w-64 justify-start text-left font-normal  ${
                !selectedMonth && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedMonth ? selectedMonth : <span>Pick a month</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <div className="grid grid-cols-2 gap-2 p-2">
              {months.map((month) => (
                <button
                  key={month}
                  className="px-4 py-2 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => {
                    setSelectedMonth(month);
                    setOpen(false);
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" >
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  
    {/* Table Section */}
    <Card className="rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead className="text-right">Deductions</TableHead>
            <TableHead className="text-right">Net Pay</TableHead>
            <TableHead className="text-right">Payment Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {paginatedData.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.position}</TableCell>
              <TableCell className="text-right">${staff.salary.toLocaleString()}</TableCell>
              <TableCell className="text-right">${staff.deductions.toLocaleString()}</TableCell>
              <TableCell className="text-right">${staff.netPay.toLocaleString()}</TableCell>
              <TableCell className="text-right">{staff.paymentDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  
    {/* Pagination Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
      <div className="text-sm text-gray-700">
        Showing{" "}
        {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)}{" "}
        to {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
        {filteredData.length} entries
      </div>
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <Button
          variant="outline"
          size="sm"
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
          size="sm"
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
