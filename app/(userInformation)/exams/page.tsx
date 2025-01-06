"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for chart and stats
const subjects = ["Biology", "Chemistry", "Physics", "Mathematics"];

const chartData = [
  { test: "Unit Test 1", score: 28 },
  { test: "Unit Test 2", score: 32 },
  { test: "Unit Test 3", score: 30 },
  { test: "Quarterly", score: 34 },
  { test: "Half Yearly", score: 36 },
  { test: "Pre-Final 1", score: 38 },
  { test: "Pre-Final 2", score: 37 },
  { test: "Pre-Final 3", score: 39 },
  { test: "Annual", score: 40 },
];

const syllabusCoverage = 83;
const assignmentPerformance = {
  id: "Homework_032",
  status: "Evaluation Complete",
  submissionDate: "30 Aug 2024, 3:40 PM",
  grade: "A+",
};
const datesToRemember = [
  { date: 19, label: "Assignments Due", color: "text-blue-600" },
  { date: 21, label: "Exam Dates", color: "text-red-600" },
  { date: 23, label: "Fees Due", color: "text-yellow-600" },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ExamPerformanceDashboard() {
  const [selectedSubject, setSelectedSubject] = React.useState("Biology");

  return (
    <div className="w-full   space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="w-6 h-6" />
            Exam Performance  
          </CardTitle>
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Exam Performance Chart */}
          <Card className="col-span-full lg:col-span-3 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Exam Performance - {selectedSubject}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                40/40 (+1 from previous)
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-score)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-score)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="test"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => `${value}`}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-score)"
                    fillOpacity={1}
                    fill="url(#scoreFill)"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Assignment Performance */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Latest Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">ID:</span> {assignmentPerformance.id}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Submitted:</span>{" "}
                  {assignmentPerformance.submissionDate}
                </p>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  {assignmentPerformance.status}
                </Badge>
              </div>
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-600 text-white p-6 text-3xl font-bold">
                  {assignmentPerformance.grade}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Syllabus Coverage */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Syllabus Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold">{syllabusCoverage}%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Current: Life Processes
                </p>
                <p className="text-sm text-muted-foreground">
                  by Mr. Jai Krishnan
                </p>
              </div>
              <Progress value={syllabusCoverage} className="h-2" />
            </CardContent>
          </Card>

          {/* Dates to Remember */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Dates to Remember
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datesToRemember.map((date, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${date.color.replace('text-', 'bg-')} bg-opacity-20 flex items-center justify-center font-semibold`}>
                        {date.date}
                      </div>
                      <p className={`text-sm ${date.color}`}>{date.label}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

