"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, ArrowUpDown, Users, Calendar, GraduationCap, UserIcon as Male } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Pie, PieChart, Cell } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Data constants
const gradeDistribution = [
  { grade: "Term 1", value: 457, percentage: 13.2, color: "#3b82f6" },
  { grade: "Term 2", value: 769, percentage: 22.2, color: "#06b6d4" },
  { grade: "Term 3", value: 1000, percentage: 28.9, color: "#a855f7" },
  { grade: "Term 4", value: 553, percentage: 16.0, color: "#2dd4bf" },
  { grade: "Term 5", value: 678, percentage: 19.6, color: "#fbbf24" },
]

const examinationResults = [
  { subject: "Maths", pass: 85, average: 70, fail: 45 },
  { subject: "English", pass: 75, average: 82, fail: 38 },
  { subject: "Mandarin", pass: 70, average: 65, fail: 55 },
  { subject: "Science", pass: 65, average: 72, fail: 40 },
  { subject: "Arts", pass: 90, average: 68, fail: 42 },
  { subject: "Exercise", pass: 72, average: 58, fail: 35 },
]
const topPerformers = [
    {
      name: "Kinara Zuri",
      score: "87.9%",
      grade: "3",
      gpa: "5",
      attendance: "77.3%",
      category: "Best in Marks",
      classroom: "Room A1",  // Added classroom info
      bgColor: "bg-green-100",
      bg:'bg-[#fcf3ea]',
    },
    {
      name: "Lea Jabulani",
      score: "89.3%",
      grade: "4",
      gpa: "4",
      attendance: "75.3%",
      category: "Best in Attendance",
      classroom: "Room B2",  // Added classroom info
      bgColor: "bg-orange-100",
      
      bg:'bg-[#e8f5fb]',
    },
    {
      name: "Conny Niang",
      score: "79.3%",
      grade: "5",
      gpa: "3",
      attendance: "80.2%",
      category: "Most Improved in Marks",
      classroom: "Room C3",  // Added classroom info
      bgColor: "bg-pink-100",
      
      bg:'bg-[#ffebb0]',
    },
    {
      name: "Yao Ming",
      score: "82.5%",
      grade: "1",
      gpa: "5",
      attendance: "88.8%",
      category: "Most Improved in Attendance",
      classroom: "Room D4",  // Added classroom info
      bgColor: "bg-yellow-100",
      
      bg:'bg-[#b6e1f3]',
    },
  ];
  
const metrics = [
  {
    title: "Student Count",
    value: "3,457",
    trend: "+4.5%",
    icon: Users,
    trendColor: "text-purple-600",
    iconBg: "bg-purple-100",
    bg:'bg-[#c0b9cc]'
  },
  {
    title: "Student Exam Attendance",
    value: "83.7%",
    trend: "+1.2%",
    icon: Calendar,
    trendColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
      bg:'bg-[#ffc000]'
  },
  {
    title: "Exam Average",
    value: "77.2%",
    trend: "+7.2%",
    icon: GraduationCap,
    trendColor: "text-blue-600",
    iconBg: "bg-blue-100",
      bg:'bg-[#159ed9]'
  },
]
const studentDetails = [
  {
    name: "Luka Magic",
    marks: "73.7%",
    grade: "5",
    gpa: "77.3%",
    attendance: "GPA",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yXaDkFqkxbcbjXKTqZ7hCCRp8rTMNS.png",
    bgColor: "bg-red-100",
  },
  {
    name: "Bianca Shangwe",
    marks: "63.7%",
    grade: "2",
    gpa: "67.7%",
    attendance: "GPA",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yXaDkFqkxbcbjXKTqZ7hCCRp8rTMNS.png",
    bgColor: "bg-gray-100",
  },
  {
    name: "Alpha Kenya",
    marks: "83.1%",
    grade: "5",
    gpa: "79.6%",
    attendance: "GPA",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yXaDkFqkxbcbjXKTqZ7hCCRp8rTMNS.png",
    bgColor: "bg-green-100",
  },
]
const averageScores = [
  { subject: "English", score: 94.5, color: "#7c3aed" },
  { subject: "Maths", score: 81.9, color: "#a855f7" },
  { subject: "Science", score: 69.4, color: "#38bdf8" },
]
// Previous component definitions remain the same...

const GradeDistributionChart = () => (
    <Card className="bg-white shadow-lg rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <CardTitle className="text-lg font-semibold">Student Count</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue="1">
            <SelectTrigger className="w-36 bg-[#f6dabd]">
              <SelectValue placeholder="ClassRoom 1" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6dabd]">
              {[1, 2, 3, 4, 5].map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  ClassRoom {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
       
        </div>
      </CardHeader>
      <CardContent>
      <div className="flex items-center  h-[30vh] space-x-8">
  {/* Left: Pie Chart */}
  <div className="w-1/2 flex justify-center items-center">
    <PieChart width={200} height={200}>
      <Pie
        data={gradeDistribution}
        dataKey="value"
        nameKey="grade"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={2}
      >
        {gradeDistribution.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-semibold text-xl"
      >
        28.9%
      </text>
    </PieChart>
  </div>

  {/* Right: Grade Distribution */}
  <div className="w-1/2 flex flex-col justify-around space-y-4">
  {gradeDistribution.map((grade, index) => (
    <div key={`grade-${index}`} className="flex items-center space-x-10">
      <div className="flex items-center space-x-2">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: grade.color }}
        />
        <span className="text-sm font-medium">{grade.grade}</span>
      </div>
      <div className="flex items-left  space-x-4">
        <span className="text-sm font-medium w-14">{grade.percentage}%</span>
        <span className="text-sm text-gray-500 w-12">{grade.value}</span>
      </div>
    </div>
  ))}
</div>

</div>

      </CardContent>
    </Card>
  );
  

  const PerformerCard = ({ performer }) => (
    <Card className={`${performer.bg} shadow-sm rounded-lg`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Avatar with background color */}
          <div className={`rounded-full ${performer.bgColor} p-1`}>
            <Avatar className="w-16 h-16">
              <AvatarImage src={performer.avatar} alt={performer.name} />
              <AvatarFallback>{performer.name[0]}</AvatarFallback>
            </Avatar>
          </div>
  
          {/* Student Details */}
          <div className="flex-1">
            <div className="text-lg font-semibold mb-1">{performer.name}</div>
            
            {/* Classroom Info */}
            <div className="text-sm text-gray-500 mb-2">Classroom: {performer.classroom}</div>
  
           
          </div>
  
          {/* Score Display */}
          <div className={`flex items-center justify-center w-16 h-16 rounded  ${performer.bg}`}>
            <div className=" font-semibold text-center">{performer.score}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  

const StudentDetailCard = ({ student }) => (
  <Card className="bg-white shadow-sm ">
    <CardContent className="p-4 ">
      <div className="flex flex-col  items-center gap-2">
        <div className={`rounded-full ${student.bgColor} p-1`}>
          <Avatar className="w-16 h-16">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center">
          <div className="font-medium">{student.name}</div>
          <div className="text-sm text-gray-500 mt-1">
            {student.marks} {student.grade} {student.gpa}
          </div>
          <div className="text-sm text-gray-500">Marks GPA Attend</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const CircularProgress = ({ value, color, subject }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle cx="48" cy="48" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle
          cx="48"
          cy="48"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{value}%</span>
      </div>
    </div>
    <div className="mt-2 text-sm font-medium">{subject}</div>
  </div>
)

const ExaminationResultsChart = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Examination Results</CardTitle>
      <div className="flex items-center gap-2">
        <Select defaultValue="1">
          <SelectTrigger className="w-24 bg-[#c0b9cc]">
            <SelectValue placeholder="Term 1" />
          </SelectTrigger>
          <SelectContent className="bg-[#c0b9cc]">
            {[1, 2, 3, 4, 5].map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                Term {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
     
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[25vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={examinationResults}>
            <Bar dataKey="pass" fill="#4ade80" radius={[4, 4, 0, 0]} />
            <Bar dataKey="average" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fail" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
)

export default function StudentDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="  mx-auto space-y-6">
        {/* Filters */}
        <CardHeader className="flex flex-row items-center justify-between border-b p-2">
      <CardTitle className="text-lg font-semibold">Students Report Details</CardTitle>
      </CardHeader>
        <div className="grid grid-cols-2 gap-4 max-w-xs ">
          <Select>
            <SelectTrigger  className="bg-[#c0b9cc]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#c0b9cc]">
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger  className="bg-[#ffebb0]">
              <SelectValue placeholder="Select ClassRoom" />
            </SelectTrigger>
            <SelectContent className="bg-[#ffebb0]">
              {[1, 2, 3, 4, 5].map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  ClassRoom {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  {/* Top Performers Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={index}>
              <div className="text-sm font-medium mb-2">{performer.category}</div>
              <PerformerCard performer={performer} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6">
  <div className="col-span-1 md:col-span-6 space-y-4">
    <GradeDistributionChart />
    <ExaminationResultsChart />
  </div>
  <div className="col-span-1 md:col-span-6 space-y-4">
      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <Card key={index} className={metric.bg}>
              <CardContent className="p-6">
                <div className="flex items-center flex-wrap justify-between">
                  <div className={`${metric.iconBg} p-3 rounded-lg`}>
                    <metric.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className={`text-sm font-medium ${metric.trendColor}`}>{metric.trend}</div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-gray-500">{metric.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      {/* Student Details */}
      <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Details</CardTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="1">
                <SelectTrigger className="w-24 bg-[#f4b9bc]">
                  <SelectValue placeholder="Term 1" />
                </SelectTrigger>
                <SelectContent className="bg-[#f4b9bc]">
                  {[1, 2, 3, 4, 5].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Term {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowUpDown className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 ">
              {studentDetails.map((student, index) => (
                <div className=" ">
                    <StudentDetailCard key={index} student={student} />
                    </div>
                
              ))}
            </div>
          </CardContent>
        </Card>

    {/* Average Score */}
    <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Average Score</CardTitle>
            <Select defaultValue="1">
          <SelectTrigger className="w-24 bg-[#d5e2c5]">
            <SelectValue placeholder="Term 1" />
          </SelectTrigger>
          <SelectContent className="bg-[#d5e2c5]">
            {[1, 2, 3, 4, 5].map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                Term {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {averageScores.map((score, index) => (
                <CircularProgress key={index} value={score.score} color={score.color} subject={score.subject} />
              ))}
            </div>
          </CardContent>
        </Card>
    </div>

</div>
      </div>
    </div>
  )
}

