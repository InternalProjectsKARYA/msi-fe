"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const sampleQuestion = {
  question:
    "In mathematics, the area of a triangle is a fundamental concept that is widely used in geometry and practical applications such as construction and design. " +
    "The area of a triangle depends on its base and height, which are perpendicular to each other. For example, if you are given the measurements of a triangle " +
    "with a base of 10 units and a height of 5 units, you can calculate the area using a specific formula. This question assesses your understanding of this " +
    "formula, which is crucial for solving geometric problems and analyzing two-dimensional shapes in various contexts. Can you identify the correct formula for " +
    "calculating the area of a triangle from the options provided below?",
  options: [
    "a) base * height",
    "b) 1/2 * base * height",
    "c) length * width",
    "d) side * side",
  ],
};

export default function AssessmentPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting!");
      return;
    }

    // Show dialog
    setIsDialogOpen(true);

    // Navigate automatically after 3 seconds
    setTimeout(() => {
      router.push("/student-assessment");
    }, 3000);
  };

  const handleDialogClose = () => {
    router.push("/student-assessment");
  };

  return (
    <div className="p-6 m-6">
      <h2 className="text-xl font-semibold ml-5">Online Assessment</h2>
      <p className="text-sm text-gray-500 mb-4 ml-5">
        Complete the assessment carefully. Ensure you answer all questions before submitting.
      </p>

      {/* Assessment Question */}
      <Card className="mb-6 p-6">
        <CardContent>
          <CardTitle className="font-semibold mb-5 text-lg">{sampleQuestion.question}</CardTitle>
          <CardDescription>
            <div className="space-y-4 mt-4">
              {sampleQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="options"
                    value={option}
                    onChange={() => setSelectedOption(option)}
                    className="cursor-pointer w-4 h-4"
                  />
                  <label htmlFor={`option-${index}`} className="cursor-pointer text-lg text-black">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </CardDescription>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button type="button" onClick={handleSubmit}>
          Submit Assessment
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assessment Completed</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-left">
            Your assessment is completed. Please wait for results.
          </p>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Thank You</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
