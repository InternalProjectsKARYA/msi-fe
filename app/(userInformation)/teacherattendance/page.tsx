"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { BookOpen, CheckCircle, Clock, Search, TrendingUp, Trophy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import { Progress } from "@/components/ui/progress"
import {   LogIn, LogOut } from 'lucide-react'
 

import { PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button"
import DigitalClock from "@/components/digilocker"

const weeklyData = [
  { week: "Mon", Teachers: 60 },
  { week: "Tue 2", Teachers: 45 },
  { week: "Wed 3", Teachers: 50 },
  { week: "Thur 4", Teachers: 55 },
  { week: "Fri 5", Teachers: 35 },
  { week: "Sat 6", Teachers: 25 },
  { week: "Sunday 7 ", Teachers: 25 },
];

const monthlyData = [
  { month: "January", Teachers: 186 },
  { month: "February", Teachers: 305 },
  { month: "March", Teachers: 237 },
  { month: "April", Teachers: 73 },
  { month: "May", Teachers: 209 },
  { month: "June", Teachers: 150 },
  { month: "July", Teachers: 214 },
  { month: "Aug", Teachers: 186 },
  { month: "Sept", Teachers: 305 },
  { month: "Oct", Teachers: 237 },
  { month: "Nov", Teachers: 73 },
  { month: "Dec", Teachers: 209 },
 
];

interface TimeEntry {
  punchIn: Date | null
  punchOut: Date | null
}
const CustomToolbar = ({ date, onNavigate, onView }) => {
  const displayDate = moment(date).format("MMMM YYYY");

  return (
    <div className="flex items-center gap-2 justify-between mb-5 overflow-x-auto">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Button onClick={() => onNavigate("PREV")} type="button" className="text-xs px-2 py-1">
          Previous
        </Button>
        <Button onClick={() => onNavigate("TODAY")} className="text-xs px-2 py-1">
          Today
        </Button>
        <Button onClick={() => onNavigate("NEXT")} className="text-xs px-2 py-1">
          Next
        </Button>
      </div>
      <h3 className="text-lg font-bold whitespace-nowrap">{displayDate}</h3>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Button onClick={() => onView("month")} className="text-xs px-2 py-1">
          Month
        </Button>
        <Button onClick={() => onView("week")} className="text-xs px-2 py-1">
          Week
        </Button>
        <Button onClick={() => onView("day")} className="text-xs px-2 py-1">
          Day
        </Button>
      </div>
    </div>
  );
};

const events = [
  {
    title: "Late",
    start: new Date(2024, 11, 3),
    end: new Date(2024, 11, 3),
    status: "Late",
    color: "#FFD8A8", // Lightened orange
  },
  {
    title: "On Time",
    start: new Date(2024, 11, 9),
    end: new Date(2024, 11, 9),
    status: "On Time",
    color: "#B6E7B0", // Lightened green
  },
  {
    title: "Absent",
    start: new Date(2024, 11, 5),
    end: new Date(2024, 11, 5),
    status: "Absent",
    color: "#FFA07A", // Lightened red
  },
  {
    title: "Holiday",
    start: new Date(2024, 11, 6),
    end: new Date(2024, 11, 6),
    status: "Holiday",
    color: "#A3C6D9", // Lightened blue
  },
];


const CustomEvent = ({ event }) => (
  <div
    className="flex items-center justify-center w-full h-full text-white font-bold  "
    style={{ backgroundColor: event.color }}
  >
    {event.status}
  </div>
);
export default  function TeacherAttendance() {
  const [filter, setFilter] = React.useState("Monthly");  
 
  const data = filter === "Weekly" ? weeklyData : monthlyData;
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState("month");
  const [currentEntry, setCurrentEntry] = React.useState<TimeEntry>({ punchIn: null, punchOut: null })
  const [totalHours, setTotalHours] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (currentEntry.punchIn && !currentEntry.punchOut) {
        const now = new Date()
        const elapsed = (now.getTime() - currentEntry.punchIn.getTime()) / (1000 * 60 * 60)
        setTotalHours(elapsed)
        setProgress(Math.min((elapsed / 8) * 100, 100)) // Assuming 8-hour workday
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentEntry])

  const handlePunchIn = () => {
    setCurrentEntry({ punchIn: new Date(), punchOut: null })
  }

  const handlePunchOut = () => {
    if (currentEntry.punchIn) {
      setCurrentEntry({ ...currentEntry, punchOut: new Date() })
    }
  }

  const formatTime = (date: Date | null) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'
  }
 
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 ">
     
        <Tabs defaultValue="weekly" className="space-y-4">
      
          <TabsContent value="weekly" className="space-y-4">
         
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           {/* Bar Chart */}
           <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Teachers Attendance</CardTitle>
          <CardDescription>{filter === "Weekly" ? "Weekly Overview" : "January - June 2024"}</CardDescription>
        </div>
        <div className="flex gap-2 ">
          <Button
            variant={filter === "Weekly" ? "default" : "outline"}
            onClick={() => setFilter("Weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={filter === "Monthly" ? "default" : "outline"}
            onClick={() => setFilter("Monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
      <ChartContainer config={filter === "Weekly" ? { Teachers: { label: "Teachers" } } : { Teachers: { label: "Teachers"  } }}>

          <BarChart data={data} width={500} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={filter === "Weekly" ? "week" : "month"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Teachers" fill="hsl(var(--chart-1))" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {filter === "Weekly"
            ? "Showing total Teachers for the last 4 weeks."
            : "Showing total Teachers for the last 6 months."}
        </div>
      </CardFooter>
    </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
  <Card className="flex items-center">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-200 p-3 rounded-full">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
          <p className="text-sm text-muted-foreground">Time dedicated to learning this week.</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex justify-end">42</div>
    </CardContent>
  </Card>

  <Card className="flex items-center">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-200 p-3 rounded-full">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <CardTitle className="text-sm font-medium">Overall Result</CardTitle>
          <p className="text-sm text-muted-foreground">Cumulative score across all tasks and activities.</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex justify-end">220</div>
    </CardContent>
  </Card>

  <Card className="flex items-center">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center space-x-4">
        <div className="bg-green-200 p-3 rounded-full">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <p className="text-sm text-muted-foreground">Total tasks and assignments successfully completed.</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex justify-end">20</div>
    </CardContent>
  </Card>

  <Card className="flex items-center">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-200 p-3 rounded-full">
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <p className="text-sm text-muted-foreground">The total number of courses enrolled in.</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex justify-end">22</div>
    </CardContent>
  </Card>
</div>





<Card className="w-full ">
      <CardHeader>
        <div className="flex justify-between  ">
        <CardTitle className="text-xl font-semibold text-gray-800">Time Tracking</CardTitle>
        <div className=""  >
          <DigitalClock />
          </div>
        </div>
      
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48 flex justify-center items-center">
            <Progress
              value={progress}
              className="w-48 h-48 -rotate-90"
          
            />
            <div className="absolute text-center">
              <Clock className="w-8 h-8 mx-auto text-primary" />
              <h4 className="text-2xl font-bold text-gray-800 mt-2">
                {totalHours.toFixed(2)}
              </h4>
              <p className="text-sm text-gray-500">Hours Worked</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 w-full">
            <Button
              onClick={handlePunchIn}
              disabled={!!currentEntry.punchIn && !currentEntry.punchOut}
              className="flex-1"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Punch In
            </Button>
            <Button
              onClick={handlePunchOut}
              disabled={!currentEntry.punchIn || !!currentEntry.punchOut}
              className="flex-1"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Punch Out
            </Button>
          </div>

          <div className="space-y-3 w-full">
            <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Punch In:</span>
              <span className="text-sm font-bold text-gray-700">{formatTime(currentEntry.punchIn)}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Punch Out:</span>
              <span className="text-sm font-bold text-gray-700">{formatTime(currentEntry.punchOut)}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Total Hours:</span>
              <span className="text-sm font-bold text-gray-700">{totalHours.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

            
            </div>
  
          </TabsContent>
        </Tabs>

        <div>

        <Card className="col-span-1 lg:col-span-8 space-y-6">
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardHeader>
              <h2 className="text-xl font-bold">Early & Lates</h2>
              <CardDescription className="text-sm text-gray-600">
              
                  View all the Early & Late logins , logouts in this calendar.
               
              </CardDescription>
            </CardHeader>
          </div>
       
        </div>
        <CardContent>
          <div style={{ height: "75vh", marginTop: "10px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              className="dark:bg-gray-800  "
              style={{ height: "100%", padding: "10px" }}
              views={["month", "week", "day"]}
              view={view}
              date={currentDate}
              components={{
                toolbar: (props) => <CustomToolbar {...props} date={currentDate} />,
                event: CustomEvent,
              }}
              onNavigate={(newDate) => setCurrentDate(newDate)}
              onView={setView}
            />
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}

