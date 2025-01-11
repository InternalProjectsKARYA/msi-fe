"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const initialAssessments = [
  { id: "1", title: "Math Unit Test", date: "24 May 2024", description: "A quick evaluation of algebra and geometry concepts.", status: "Pending" },
  { id: "2", title: "Science Quiz", date: "12 May 2024", description: "A fun and engaging test on basic physics and chemistry.", status: "Completed" },
  { id: "3", title: "History Final Exam", date: "10 May 2024", description: "Comprehensive assessment of ancient and modern history topics.", status: "Pending" },
  { id: "4", title: "English Literature Project", date: "28 Apr 2024", description: "Evaluation of understanding of key literary works and analysis.", status: "Completed" },
  { id: "5", title: "Physics Practical", date: "23 Apr 2024", description: "Hands-on lab test on mechanics and thermodynamics experiments.", status: "Pending" },
  { id: "6", title: "Environmental Science Assignment", date: "21 Apr 2024", description: "Research and analysis of sustainable practices and policies.", status: "Completed" },
  { id: "7", title: "Computer Science Lab Test", date: "11 Mar 2024", description: "Practical test on coding and algorithms using Python.", status: "Pending" },
];

export default function StudentAssessment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assessments, setAssessments] = useState(initialAssessments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const router = useRouter();

  const filteredAssessments = assessments.filter((assessment) =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
    setIsDialogOpen(true);
  };

  const handleStartAssessment = () => {
    router.push(`/studenttest/${selectedAssessment.id}`);
  };

  return (
    <div>
      <div className="flex">
      <div>
      <h2 className="text-xl font-semibold">Assessments</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage and keep track of all the latest assessments for your organization.
      </p>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Filter by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      </div>

      <div className=" ">
 
  {/* <div className="  ">
  <div className=" w-full   overflow-hidden" >
    <video
      className="w-full h-[140]  "
      src="/videos/pencil.mp4"
      autoPlay
      loop
      muted
      playsInline
      
    >
      <track kind="captions" />
      Your browser does not support the video tag.
    </video>
  </div>
  
  </div> */}

 
</div>
      </div>
    
    




 
    

      {/* Assessments List */}
      <div className="space-y-4   ">
        {filteredAssessments.map((assessment) => (
          <Card
            key={assessment.id}
            className="flex items-center p-4 shadow-sm cursor-pointer justify-between"
            onClick={() => handleAssessmentClick(assessment)}
          >
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-600" />
              <CardContent className="flex-1">
                <CardTitle className="font-semibold text-md">{assessment.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {assessment.description}
                </CardDescription>
                <CardDescription className="text-xs text-gray-400">
                  Scheduled on: {assessment.date}
                </CardDescription>
              </CardContent>
            </div>
            <div
              className={`px-3  py-1 rounded-md font-semibold text-sm ${
                assessment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {assessment.status}
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog for Assessment */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAssessment?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            By clicking the button below, you will start the assessment. Make sure you are prepared before beginning.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartAssessment}>Start Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
