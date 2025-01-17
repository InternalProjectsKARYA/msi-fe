"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useRouter } from "next/navigation"
import { CalendarDays, Book, Award, FileText } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartDataSubjects = [
  { subject: "Math", term1: 85, term2: 78, term3: 92 },
  { subject: "Science", term1: 75, term2: 82, term3: 88 },
  { subject: "English", term1: 90, term2: 86, term3: 93 },
  { subject: "History", term1: 70, term2: 65, term3: 80 },
  { subject: "Geography", term1: 80, term2: 85, term3: 90 },
  { subject: "Computer", term1: 95, term2: 90, term3: 98 },
]

const chartConfigSubjects = {
  term1: { label: "Term 1", color: "hsl(var(--chart-1))" },
  term2: { label: "Term 2", color: "hsl(var(--chart-2))" },
  term3: { label: "Term 3", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

const subjects = ["Biology", "Chemistry", "Physics", "Mathematics"]

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
]

const assignmentPerformance = {
  id: "Homework_032",
  status: "Evaluation Complete",
  submissionDate: "30 Aug 2024, 3:40 PM",
  grade: "A+",
}

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const testData = {
  Test1: [
    { className: "Nursery", averageScore: 72 },
    { className: "LKG", averageScore: 78 },
    { className: "UKG", averageScore: 80 },
    { className: "1A", averageScore: 85 }, { className: "1B", averageScore: 82 }, { className: "1C", averageScore: 88 },
    { className: "2A", averageScore: 79 }, { className: "2B", averageScore: 75 }, { className: "2C", averageScore: 81 },
    { className: "3A", averageScore: 84 }, { className: "3B", averageScore: 76 }, { className: "3C", averageScore: 80 },
    { className: "4A", averageScore: 87 }, { className: "4B", averageScore: 83 }, { className: "4C", averageScore: 89 },
    { className: "5A", averageScore: 90 }, { className: "5B", averageScore: 78 }, { className: "5C", averageScore: 85 },
    { className: "6A", averageScore: 77 }, { className: "6B", averageScore: 82 }, { className: "6C", averageScore: 79 },
    { className: "7A", averageScore: 86 }, { className: "7B", averageScore: 80 }, { className: "7C", averageScore: 88 },
    { className: "8A", averageScore: 84 }, { className: "8B", averageScore: 76 }, { className: "8C", averageScore: 90 },
    { className: "9A", averageScore: 92 }, { className: "9B", averageScore: 88 }, { className: "9C", averageScore: 91 },
    { className: "10A", averageScore: 95 }, { className: "10B", averageScore: 89 }, { className: "10C", averageScore: 94 },
  ],
  Test2: [
    { className: "Nursery", averageScore: 74 },
    { className: "LKG", averageScore: 79 },
    { className: "UKG", averageScore: 81 },
    { className: "1A", averageScore: 87 }, { className: "1B", averageScore: 84 }, { className: "1C", averageScore: 89 },
    { className: "2A", averageScore: 80 }, { className: "2B", averageScore: 77 }, { className: "2C", averageScore: 83 },
    { className: "3A", averageScore: 86 }, { className: "3B", averageScore: 79 }, { className: "3C", averageScore: 82 },
    { className: "4A", averageScore: 88 }, { className: "4B", averageScore: 85 }, { className: "4C", averageScore: 91 },
    { className: "10A", averageScore: 97 }, { className: "10B", averageScore: 90 }, { className: "10C", averageScore: 96 },
  ],
  Test3: [
    { className: "Nursery", averageScore: 75 },
    { className: "LKG", averageScore: 80 },
    { className: "UKG", averageScore: 82 },
    { className: "1A", averageScore: 89 }, { className: "1B", averageScore: 85 }, { className: "1C", averageScore: 90 },
    { className: "10A", averageScore: 99 }, { className: "10B", averageScore: 92 }, { className: "10C", averageScore: 97 },
  ],
  Quarterly: [
    { className: "Nursery", averageScore: 76 },
    { className: "LKG", averageScore: 82 },
    { className: "UKG", averageScore: 84 },
    { className: "1A", averageScore: 88 }, { className: "1B", averageScore: 83 }, { className: "1C", averageScore: 90 },
    { className: "10A", averageScore: 98 }, { className: "10B", averageScore: 91 }, { className: "10C", averageScore: 95 },
  ],
  HalfYearly: [
    { className: "Nursery", averageScore: 78 },
    { className: "LKG", averageScore: 83 },
    { className: "UKG", averageScore: 85 },
    { className: "1A", averageScore: 90 }, { className: "1B", averageScore: 87 }, { className: "1C", averageScore: 92 },
    { className: "10A", averageScore: 99 }, { className: "10B", averageScore: 93 }, { className: "10C", averageScore: 98 },
  ],
  Annual: [
    { className: "Nursery", averageScore: 80 },
    { className: "LKG", averageScore: 85 },
    { className: "UKG", averageScore: 87 },
    { className: "1A", averageScore: 92 }, { className: "1B", averageScore: 88 }, { className: "1C", averageScore: 95 },
    { className: "10A", averageScore: 100 }, { className: "10B", averageScore: 95 }, { className: "10C", averageScore: 99 },
  ],
}

export default function ExamPerformanceDashboard() {
  const [selectedTest, setSelectedTest] = React.useState<keyof typeof testData>("Test1")
  const [selectedSubject, setSelectedSubject] = React.useState("Biology")
  const router = useRouter()

  const currentData = testData[selectedTest]
  const sortedClasses = [...currentData].sort((a, b) => b.averageScore - a.averageScore)
  const topClass = sortedClasses[0]
  const leastClass = sortedClasses[sortedClasses.length - 1]

  const handleBarClick = (data: any, index: number, term: string) => {
    if (data && data.subject) {
      router.push(`/subject-reports/${data.subject.toLowerCase()}/${term}`)
    }
  }

  return (
    <div className="     space-y-6">
      <h1 className="text-3xl font-bold mb-6">Exam Performance Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Book className="w-5 h-5" />
              Subject Performance
            </CardTitle>
            <CardDescription>
              Comparison of three terms for each subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSubjects} className="w-full h-[40vh]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDataSubjects} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                 
                  <Bar className="cursor-pointer" dataKey="term1" fill={chartConfigSubjects.term1.color} radius={[4, 4, 0, 0]} onClick={(data, index) => handleBarClick(data, index, "term1")}>
                    <LabelList dataKey="term1" position="top" />
                  </Bar>
                  <Bar className="cursor-pointer" dataKey="term2" fill={chartConfigSubjects.term2.color} radius={[4, 4, 0, 0]} onClick={(data, index) => handleBarClick(data, index, "term2")}>
                    <LabelList dataKey="term2" position="top" />
                  </Bar>
                  <Bar className="cursor-pointer" dataKey="term3" fill={chartConfigSubjects.term3.color} radius={[4, 4, 0, 0]} onClick={(data, index) => handleBarClick(data, index, "term3")}>
                    <LabelList dataKey="term3" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Exam Performance
              </CardTitle>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              40/40 (+1 from previous)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="test" tickLine={false} axisLine={false} tickMargin={8} angle={-45} textAnchor="end" height={70} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent labelFormatter={(value) => `${value}`} indicator="dot" />} />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#scoreFill)" />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
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

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Overall Class Performance
                </CardTitle>
                <CardDescription>
                  Compare the average performance of all classes based on the selected test.
                </CardDescription>
              </div>
              <Select value={selectedTest} onValueChange={(value) => setSelectedTest(value as keyof typeof testData)}>
                <SelectTrigger className="w-[180px] mt-2 sm:mt-0">
                  <SelectValue placeholder="Select Test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Test1">Test 1</SelectItem>
                  <SelectItem value="Test2">Test 2</SelectItem>
                  <SelectItem value="Test3">Test 3</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="HalfYearly">Half-Yearly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="text-sm font-medium">Top Performing:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {topClass.className} ({topClass.averageScore}%)
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Least Performing:</span>
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  {leastClass.className} ({leastClass.averageScore}%)
                </Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="className"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip />
                <Bar dataKey="averageScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

