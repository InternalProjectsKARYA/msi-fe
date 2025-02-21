"use client";
import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import LessonPlanPage from "../../lessonPlan/page";

const SubjectSlots = () => {
  const router = useRouter();

  const [activeBatch, setActiveBatch] = useState<"batch1" | "batch2" | "batch3">("batch1");

  // Separate state for each batch
  const [batchData, setBatchData] = useState({
    batch1: { punchIn: null, punchOut: null, timeLeft: 20 * 60, timerActive: false },
    batch2: { punchIn: null, punchOut: null, timeLeft: 20 * 60, timerActive: false },
    batch3: { punchIn: null, punchOut: null, timeLeft: 20 * 60, timerActive: false },
  });

  const handleAssessment = () => {
    router.push('/assesment-new');
  };

  const handleBatchClick = (batch: "batch1" | "batch2" | "batch3") => {
    setActiveBatch(batch);
  };

  // Handles Clock In for the selected batch
  const handlePunchIn = () => {
    setBatchData((prev) => ({
      ...prev,
      [activeBatch]: {
        ...prev[activeBatch],
        punchIn: new Date().toLocaleTimeString(),
        punchOut: null,
        timerActive: true,
        timeLeft: 20 * 60,
      },
    }));
  };

  // Handles Clock Out for the selected batch
  const handlePunchOut = () => {
    setBatchData((prev) => ({
      ...prev,
      [activeBatch]: {
        ...prev[activeBatch],
        punchOut: new Date().toLocaleTimeString(),
        timerActive: false,
      },
    }));
  };

  // Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (batchData[activeBatch].timerActive && batchData[activeBatch].timeLeft > 0) {
      timer = setInterval(() => {
        setBatchData((prev) => ({
          ...prev,
          [activeBatch]: {
            ...prev[activeBatch],
            timeLeft: prev[activeBatch].timeLeft - 1,
          },
        }));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [batchData, activeBatch]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* ✅ HEADER */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Lesson Plan & Time Tracking</h1>
        <p className="text-gray-600 mt-2">
          Manage different subject batches with dedicated time tracking for each. Track assessments and lesson plans in real-time.
        </p>
      </div>

      {/* ✅ BATCH & SEARCH */}
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
        <div>
          <Button onClick={handleAssessment}>Do Assessment</Button>
        </div>
      </div>

      {/* ✅ CONTENT */}
      <div className="grid grid-cols-4 gap-6">
        {/* ✅ LESSON PLAN */}
        <div className="col-span-3">
          <LessonPlanPage />
        </div>

        {/* ✅ CLOCK IN/OUT FOR EACH BATCH */}
        <div className="col-span-1">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">Time Tracking - {activeBatch.toUpperCase()}</CardTitle>
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                {/* ✅ Timer Display */}
                <div className="relative w-48 h-48 flex justify-center items-center">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" strokeWidth="5" stroke="#ddd" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      strokeWidth="5"
                      stroke="orange"
                      strokeDasharray="283"
                      strokeDashoffset={(1 - batchData[activeBatch].timeLeft / (20 * 60)) * 283}
                      fill="none"
                      className="transition-all duration-500 ease-linear"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <Clock className="w-8 h-8 mx-auto text-primary" />
                    <h4 className="text-2xl font-bold text-gray-800 mt-2">{formatTime(batchData[activeBatch].timeLeft)}</h4>
                    <p className="text-sm text-gray-500">Time Remaining</p>
                  </div>
                </div>

                {/* ✅ Punch In/Out Buttons */}
                <div className="flex justify-center space-x-4 w-full">
                  <Button onClick={handlePunchIn} disabled={!!batchData[activeBatch].punchIn && !batchData[activeBatch].punchOut} className="flex-1">
                    <LogIn className="w-4 h-4 mr-2" />
                    Clock In
                  </Button>
                  <Button onClick={handlePunchOut} disabled={!batchData[activeBatch].punchIn || !!batchData[activeBatch].punchOut} className="flex-1">
                    <LogOut className="w-4 h-4 mr-2" />
                    Clock Out
                  </Button>
                </div>

                {/* ✅ Clock In/Out Details */}
                <div className="space-y-3 w-full">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                    <span className="text-sm font-medium text-gray-700">Clock In:</span>
                    <span className="text-sm font-bold text-gray-700">{batchData[activeBatch].punchIn || "--"}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                    <span className="text-sm font-medium text-gray-700">Clock Out:</span>
                    <span className="text-sm font-bold text-gray-700">{batchData[activeBatch].punchOut || "--"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubjectSlots;
