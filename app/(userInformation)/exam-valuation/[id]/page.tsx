"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";

// Sample question for valuation
const sampleQuestion = {
  question:
    "In mathematics, the area of a triangle is a fundamental concept that is widely used in geometry and practical applications such as construction and design. " +
    "The area of a triangle depends on its base and height, which are perpendicular to each other. For example, if you are given the measurements of a triangle " +
    "with a base of 10 units and a height of 5 units, you can calculate the area using a specific formula. Can you identify the correct formula for calculating " +
    "the area of a triangle from the options provided below?",
  options: [
    { id: "a", value: "base * height" },
    { id: "b", value: "1/2 * base * height" },
    { id: "c", value: "length * width" },
    { id: "d", value: "side * side" },
  ],
  studentAnswer: "a) base * height", // Example of student's answer
  studentName: "John Doe",
  class: "10th Grade",
  subject: "Mathematics",
  testName: "Unit Test 1",
  assessmentId: "A1234",
};

export default function TeacherValuation() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleValuation = (status: boolean) => {
    setIsCorrect(status);
  };

  const handleDone = () => {
    // Show dialog
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    router.push("/teacher-assessment");
  };

  return (
    <div >
      <h2 className="text-xl font-semibold  ">Student Exam Valuation</h2>
      <p className="text-sm text-gray-500 mb-4">
        Evaluate the answers submitted by the student and provide feedback.
      </p>
   {/* Student Details */}
   <div className="mb-6 grid grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded-md shadow-sm">
            <p className="text-sm font-medium text-gray-800">
              <strong>Name:</strong> {sampleQuestion.studentName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Assessment ID:</strong> {sampleQuestion.assessmentId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Subject:</strong> {sampleQuestion.subject}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Test Name:</strong> {sampleQuestion.testName}
            </p>
          </div>
      {/* Valuation Card */}
      <Card className="mb-6 p-6">
        <CardContent>
       

          {/* Question */}
          <CardTitle className="font-semibold mb-5 text-lg">
            {sampleQuestion.question}
          </CardTitle>
          <CardDescription>
            <div className="space-y-4 mt-4">
              {sampleQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 rounded-md ${
                    option.value === sampleQuestion.studentAnswer
                      ? "bg-yellow-100"
                      : "bg-gray-100"
                  }`}
                >
                  <span className="text-black text-lg">{option.value}</span>
                  {option.value === sampleQuestion.studentAnswer && (
                    <span className="text-yellow-800">Student's Answer</span>
                  )}
                </div>
              ))}
            </div>
          </CardDescription>
        </CardContent>
      </Card>

      {/* Valuation Buttons */}
      <div className="flex justify-between items-center mt-6">
        {/* Left Section: Valuation Buttons */}
        <div className="flex space-x-4">
          <Button
            variant={isCorrect === true ? "default" : "outline"}
            onClick={() => handleValuation(true)}
            className="flex items-center space-x-2"
          >
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Right</span>
          </Button>
          <Button
            variant={isCorrect === false ? "default" : "outline"}
            onClick={() => handleValuation(false)}
            className="flex items-center space-x-2"
          >
            <XCircle className="h-5 w-5 text-red-600" />
            <span>Wrong</span>
          </Button>
        </div>

        {/* Right Section: Done Button */}
        <div>
          <Button type="button" onClick={handleDone}>
            Submit
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Valuation Completed</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-left m-3">
            Valuation of the student <strong>{sampleQuestion.studentName}</strong> from{" "}
            <strong>{sampleQuestion.class}</strong> for the subject{" "}
            <strong>{sampleQuestion.subject}</strong> and test name{" "}
            <strong>{sampleQuestion.testName}</strong> (Assessment ID:{" "}
            <strong>{sampleQuestion.assessmentId}</strong>) has been completed. Thank you!
          </p>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
