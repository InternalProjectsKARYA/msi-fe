"use client";

import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [activeBatch, setActiveBatch] = useState<"batch1" | "batch2" | "batch3" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [punchInTime, setPunchInTime] = useState<string | null>(null);
  const [punchOutTime, setPunchOutTime] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  const itemsPerPage = 10;

  const handleBatchClick = (batch: "batch1" | "batch2" | "batch3") => {
    setActiveBatch(batch);
    setCurrentPage(1); // Reset pagination when switching batches
  };

  const handlePunchIn = () => {
    if (!punchInTime) {
      setPunchInTime(new Date().toLocaleTimeString());
      setPunchOutTime(null);
      setTimerActive(true);
    }
  };

  const handlePunchOut = () => {
    if (punchInTime && !punchOutTime) {
      setPunchOutTime(new Date().toLocaleTimeString());
      setTimerActive(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const mockData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: `2024-12-${27 + i}`,
    class: `Class ${Math.floor(Math.random() * 5) + 1}`,
    lessons: `Lesson ${i + 1}`,
    status: i % 2 === 0 ? "Completed" : "Pending",
  }));

  const pageCount = Math.ceil(mockData.length / itemsPerPage);

  const currentData = mockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className=" space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
      </div>

      {/* Search & Batches */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Input type="text" placeholder="Search by class..." className="w-64" />
          <Button
            variant={activeBatch === "batch1" ? "default" : "outline"}
            onClick={() => handleBatchClick("batch1")}
          >
            Batch 1
          </Button>
          <Button
            variant={activeBatch === "batch2" ? "default" : "outline"}
            onClick={() => handleBatchClick("batch2")}
          >
            Batch 2
          </Button>
          <Button
            variant={activeBatch === "batch3" ? "default" : "outline"}
            onClick={() => handleBatchClick("batch3")}
          >
            Batch 3
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Table */}
        <div className="col-span-3">
          <Card>
            <Table>
              <TableHeader >
                <TableRow className="bg-gray-200">
                  <TableHead>S.No</TableHead>
               
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
              
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.lessons}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <Button onClick={handleNextPage} disabled={currentPage === pageCount}>
              Next
            </Button>
          </div>
        </div>

        {/* Clock In/Out Card */}
        <div className="col-span-1">
          {activeBatch && (
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Time Tracking
                  </CardTitle>
                  <div>
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-48 h-48 flex justify-center items-center">
                    <Progress value={(timeLeft / (20 * 60)) * 100} className="w-48 h-48 -rotate-90" />
                    <div className="absolute text-center">
                      <Clock className="w-8 h-8 mx-auto text-primary" />
                      <h4 className="text-2xl font-bold text-gray-800 mt-2">
                        {formatTime(timeLeft)}
                      </h4>
                      <p className="text-sm text-gray-500">Time Remaining</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 w-full">
                    <Button
                      onClick={handlePunchIn}
                      disabled={!!punchInTime && !punchOutTime}
                      className="flex-1"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Clock In
                    </Button>
                    <Button
                      onClick={handlePunchOut}
                      disabled={!punchInTime || !!punchOutTime}
                      className="flex-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Clock Out
                    </Button>
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-sm font-medium text-gray-700">Clock In:</span>
                      <span className="text-sm font-bold text-gray-700">
                        {punchInTime || "--"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-sm font-medium text-gray-700">Clock Out:</span>
                      <span className="text-sm font-bold text-gray-700">
                        {punchOutTime || "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
