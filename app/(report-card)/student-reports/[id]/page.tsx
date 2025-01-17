'use client'

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface StudentDetails {
  name: string
  classNumber: string
  batchYear: string
  classTeacher: string
  finalGrade: string
  profilePic: string
}

interface SubjectMark {
  subject: string
  marks: number
  benchmark: {
    lower: number
    upper: number
  }
}

interface ActivityGrade {
  name: string
  grade: string
  percentage: number
}

const studentDetails: StudentDetails = {
  name: "Neha Verma",
  classNumber: "191",
  batchYear: "2020-2023",
  classTeacher: "Jennifer",
  finalGrade: "B",
  profilePic: "/placeholder.svg"
}

const subjectMarks: SubjectMark[] = [
  { subject: "English", marks: 85, benchmark: { lower: 86, upper: 85 } },
  { subject: "Maths", marks: 78, benchmark: { lower: 78, upper: 78 } },
  { subject: "Science", marks: 65, benchmark: { lower: 65, upper: 65 } },
  { subject: "History", marks: 52, benchmark: { lower: 52, upper: 52 } },
  { subject: "Hindi", marks: 75, benchmark: { lower: 75, upper: 75 } },
]

const activityGrades: ActivityGrade[] = [
  { name: "Participation", grade: "A", percentage: 92 },
  { name: "Rest and Civility", grade: "B", percentage: 85 },
  { name: "Neat and Orderly", grade: "A+", percentage: 95 },
  { name: "Communication", grade: "B+", percentage: 88 },
  { name: "Perseverance", grade: "B", percentage: 85 },
]

const historicalData = {
  labels: ['1 Term', '2 Term', '3 Term', '4 Term', '5 Term'],
  datasets: [
    {
      label: 'Performance',
      data: [75, 82, 78, 85, 88],
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
    },
  },
}

export default function StudentDashboard() {
  return (
    <div className="    space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Student Details Card */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Image
                src={studentDetails.profilePic || "/placeholder.svg"}
                alt={studentDetails.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">Student Name: {studentDetails.name}</h2>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Class Number: {studentDetails.classNumber}</p>
                  <p>Batch Year: {studentDetails.batchYear}</p>
                  <p>Class Teacher: {studentDetails.classTeacher}</p>
                  <p>Final Grade: {studentDetails.finalGrade}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Final Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">82%</span>
              </div>
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-primary stroke-2 fill-none"
                  cx="50"
                  cy="50"
                  r="45"
                  strokeDasharray={`${82 * 2.83} ${100 * 2.83}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="mt-4 text-5xl font-bold text-primary">B</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Marks Table */}
        <Card>
          <CardHeader>
            <CardTitle>Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left">Subjects</th>
                    <th className="pb-2 text-right">Marks</th>
                    <th className="pb-2 text-right">Lower</th>
                    <th className="pb-2 text-right">Upper</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectMarks.map((mark) => (
                    <tr key={mark.subject} className="border-b">
                      <td className="py-2">{mark.subject}</td>
                      <td className="py-2 text-right">{mark.marks}</td>
                      <td className="py-2 text-right">{mark.benchmark.lower}</td>
                      <td className="py-2 text-right">{mark.benchmark.upper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Historical Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={historicalData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      {/* Activities & Conduct */}
      <Card>
        <CardHeader>
          <CardTitle>Activities & Conduct</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityGrades.map((activity) => (
              <div key={activity.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{activity.name}</span>
                  <span className="text-sm font-bold">{activity.grade}</span>
                </div>
                <Progress value={activity.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <div className="text-center">
              <div className="font-semibold">A+</div>
              <div className="text-sm text-muted-foreground">100.00</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">A</div>
              <div className="text-sm text-muted-foreground">95.91</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">B+</div>
              <div className="text-sm text-muted-foreground">90.86</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">B</div>
              <div className="text-sm text-muted-foreground">85.81</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">C</div>
              <div className="text-sm text-muted-foreground">80.76</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">D</div>
              <div className="text-sm text-muted-foreground">75 Below</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

