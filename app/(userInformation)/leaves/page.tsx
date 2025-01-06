
"use client";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isBefore } from "date-fns";
 
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/lib/AuthProvider";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useFeatureFlags } from "@/context/FeatureFlagProvider";
 
interface LeaveStats {
  teacherLeaves: number;
  studentLeaves: number;
  nonTeachingStaffLeaves: number;
  totalLeaves: number;
}
function StudentLeaves() {
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);
  const { flags } = useFeatureFlags();
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isFromDateOpen, setFromDateOpen] = useState(false);
  const [isToDateOpen, setToDateOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [leaveDescription, setLeaveDescription] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const leaveData = [
    { id: 1, name: "John Doe", leaveType: "Sick Leave", from: "2024-12-01", to: "2024-12-03", days: 3, status: "Approved" },
    { id: 2, name: "Jane Smith", leaveType: "Annual Leave", from: "2024-12-05", to: "2024-12-10", days: 6, status: "Pending" },
    { id: 3, name: "Michael Brown", leaveType: "Casual Leave", from: "2024-11-15", to: "2024-11-16", days: 2, status: "Rejected" },
    { id: 4, name: "Emily Johnson", leaveType: "Maternity Leave", from: "2024-10-01", to: "2024-12-01", days: 60, status: "Approved" },
    { id: 5, name: "Chris Green", leaveType: "Sick Leave", from: "2024-12-01", to: "2024-12-02", days: 2, status: "Approved" },
    { id: 6, name: "Anna White", leaveType: "Annual Leave", from: "2024-12-12", to: "2024-12-15", days: 4, status: "Pending" },
    { id: 7, name: "David Miller", leaveType: "Paternity Leave", from: "2024-11-20", to: "2024-11-25", days: 6, status: "Approved" },
    { id: 8, name: "Sophia Taylor", leaveType: "Casual Leave", from: "2024-12-08", to: "2024-12-09", days: 2, status: "Rejected" },
    { id: 9, name: "James Wilson", leaveType: "Annual Leave", from: "2024-12-20", to: "2024-12-31", days: 12, status: "Pending" },
    { id: 10, name: "Olivia Martinez", leaveType: "Sick Leave", from: "2024-12-14", to: "2024-12-16", days: 3, status: "Approved" },
    { id: 11, name: "Liam Harris", leaveType: "Casual Leave", from: "2024-11-30", to: "2024-12-02", days: 3, status: "Approved" },
    { id: 12, name: "Mia Clark", leaveType: "Annual Leave", from: "2024-11-01", to: "2024-11-05", days: 5, status: "Rejected" },
    { id: 13, name: "Noah Hall", leaveType: "Sick Leave", from: "2024-12-22", to: "2024-12-24", days: 3, status: "Pending" },
    { id: 14, name: "Ella Young", leaveType: "Maternity Leave", from: "2024-09-01", to: "2024-12-01", days: 90, status: "Approved" },
    { id: 15, name: "Ethan Adams", leaveType: "Casual Leave", from: "2024-12-18", to: "2024-12-19", days: 2, status: "Approved" },
  ];
    
  const filteredData = leaveData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const { userId, isAuthenticated } = useAuthContext();
  const { toast } = useToast();
  const leaveStats: LeaveStats = {
    teacherLeaves: 3,
    studentLeaves: 15,
    nonTeachingStaffLeaves: 7,
    totalLeaves: 25,
  };
 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.users_fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (employee: any) => {
    if (!selectedEmployees.some((emp) => emp.users_id === employee.users_id)) {
      setSelectedEmployees((prevSelected) => [...prevSelected, employee]);
    }
    setSearchTerm(""); // Clear search after selection
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setSelectedEmployees(
      selectedEmployees.filter((emp) => emp.users_id !== employeeId)
    );
  };
  return (
    <>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3 ">
  {/* Statistics Section */}
  <div className="col-span-3">
    {/* <h2 className="text-lg font-semibold mb-4">Leaves</h2> */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-red-50 dark:bg-neutral-900 text-center">
        <div className="text-4xl font-bold">{leaveStats.totalLeaves}</div>
        <div className="text-lg font-semibold text-gray-600">Sick Leaves</div>
      </Card>
      <Card className="p-4 bg-green-50 dark:bg-neutral-900 text-center">
        <div className="text-4xl font-bold">{leaveStats.teacherLeaves}</div>
        <div className="text-lg font-semibold text-gray-600">Casual Leaves</div>
      </Card>
      <Card className="p-4 bg-blue-50 dark:bg-neutral-900  text-center">
        <div className="text-4xl font-bold">{leaveStats.studentLeaves}</div>
        <div className="text-lg font-semibold text-gray-600">Cultural/Co-curricular Leave</div>
      </Card>
      <Card className="p-4 bg-purple-50 dark:bg-neutral-900 text-center">
        <div className="text-4xl font-bold">{leaveStats.nonTeachingStaffLeaves}</div>
        <div className="text-lg font-semibold text-gray-600">Exam Preparation Leaves</div>
      </Card>
    </div>
  </div>

  {/* Submit Leave Request Section */}
  {/* {flags.showSpecialCard &&  */}
<Card className="col-span-1 md:col-span-1   shadow-xl rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Submit Leave Request</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Leave Type</label>
        <select
          value={selectedLeaveType || ""}
          onChange={(e) => setSelectedLeaveType(e.target.value)}
          className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled >
            Select Leave Type
          </option>
          {leaveTypes.map((type) => (
            <option key={type.leavetype_id} value={type.leavetype_id}>
              {type.leavetype_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white ">From Date</label>
        <input
          type="text"
          readOnly
          value={fromDate ? format(fromDate, "yyyy-MM-dd") : ""}
          onClick={() => setFromDateOpen(!isFromDateOpen)}
          className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 cursor-pointer p-2"
          placeholder="Select from date"
        />
        {isFromDateOpen && (
          <DayPicker
            mode="single"
            selected={fromDate}
            onSelect={(date) => {
              setFromDate(date);
              setFromDateOpen(false);
            }}
            disabled={(date) => isBefore(date, new Date())}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">To Date</label>
        <input
          type="text"
          readOnly
          value={toDate ? format(toDate, "yyyy-MM-dd") : ""}
          onClick={() => setToDateOpen(!isToDateOpen)}
          className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 cursor-pointer p-2"
          placeholder="Select to date"
        />
        {isToDateOpen && (
          <DayPicker
            mode="single"
            selected={toDate}
            onSelect={(date) => {
              setToDate(date);
              setToDateOpen(false);
            }}
            disabled={(date) => isBefore(date, fromDate || new Date())}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Leave Description</label>
        <textarea
          rows={3}
          value={leaveDescription}
          onChange={(e) => setLeaveDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter leave description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Notify Employees</label>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-1 block w-full rounded-lg p-2 shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search employee by name"
        />
        {searchTerm && (
          <ul className="mt-2 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <li
                key={employee.users_id}
                onClick={() => handleAddEmployee(employee)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {employee.users_fullname}
              </li>
            ))}
          </ul>
        )}
        {selectedEmployees.length > 0 && (
          <ul className="mt-4 space-y-2">
            {selectedEmployees.map((employee) => (
              <li
                key={employee.users_id}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
              >
                {employee.users_fullname}
                <CircleX
                  onClick={() => handleRemoveEmployee(employee.users_id)}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="button" className="w-full    py-3 rounded-lg font-medium">
        Submit Leave Request
      </Button>
      {statusMessage && (
        <p
          className={`mt-2 ${
            statusMessage.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  </Card>
{/* } */}

  {/* Leave Requests Section */}
  <Card className="space-y-4 col-span-1 md:col-span-2   shadow-xl rounded-lg p-6">
      {/* Search Input */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Leave Requests</h2>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>

      {/* Table */}
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader >
            <TableRow className="bg-gray-200 dark:bg-neutral-200">
              <TableHead>Name</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.from}</TableCell>
                <TableCell>{leave.to}</TableCell>
                <TableCell>{leave.days}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : leave.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {leave.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}-
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
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
    </Card>
</div>

 
    </>

   
  );
  
}

export default StudentLeaves;
