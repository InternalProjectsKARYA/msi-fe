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

 

import { PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button"

const weeklyData = [
  { week: "Mon", Students: 60 },
  { week: "Tue 2", Students: 45 },
  { week: "Wed 3", Students: 50 },
  { week: "Thur 4", Students: 55 },
  { week: "Fri 5", Students: 35 },
  { week: "Sat 6", Students: 25 },
  { week: "Sunday 7 ", Students: 25 },
];

const monthlyData = [
  { month: "January", Students: 186 },
  { month: "February", Students: 305 },
  { month: "March", Students: 237 },
  { month: "April", Students: 73 },
  { month: "May", Students: 209 },
  { month: "June", Students: 150 },
  { month: "July", Students: 214 },
  { month: "Aug", Students: 186 },
  { month: "Sept", Students: 305 },
  { month: "Oct", Students: 237 },
  { month: "Nov", Students: 73 },
  { month: "Dec", Students: 209 },
 
];

const pieChartData = [
  { name: "Incomplete", value: 40, color: "#F87171" },
  { name: "Completed", value: 30, color: "#6366F1" },
  { name: "In progress", value: 20, color: "#3B82F6" },
];
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

const attendanceEvents = [
  {
    title: "On Time",
    start: new Date(2025, 1, 20, 9, 0), // Feb 20, 9:00 AM
    end: new Date(2025, 1, 20, 9, 30),
    status: "ontime",
  },
  {
    title: "Late",
    start: new Date(2025, 1, 21, 9, 30), // Feb 21, 9:30 AM
    end: new Date(2025, 1, 21, 10, 0),
    status: "late",
  },
  {
    title: "Absent",
    start: new Date(2025, 1, 22, 9, 0), // Feb 22
    end: new Date(2025, 1, 22, 17, 0),
    status: "absent",
  },
];

const CustomEvent = ({ event }) => {
  const statusColors = {
    ontime: "text-green-500 ",
    late: "text-red-500 ",
    absent: "text-gray-400 ",
  };

  return (
    <div className={` rounded ${statusColors[event.status]}`}>
      {event.title}
    </div>
  );
};
export default  function StudentAttendance() {
  const [filter, setFilter] = React.useState("Monthly"); // Toggle between "Weekly" and "Monthly"
 
  const data = filter === "Weekly" ? weeklyData : monthlyData;
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState("month");
 
 
  return (
    <>
    <div className="space-y-4">
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Bar Chart Section */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Students Attendance</CardTitle>
                  <CardDescription>
                    {filter === "Weekly" ? "Weekly Overview" : "January - June 2024"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
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
                <ChartContainer
                  config={
                    filter === "Weekly"
                      ? { Students: { label: "Students" } }
                      : { Students: { label: "Students" } }
                  }
                >
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
                    <Bar dataKey="Students" fill="hsl(var(--chart-1))" radius={5} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  {filter === "Weekly"
                    ? "Showing total students for the last 4 weeks."
                    : "Showing total students for the last 6 months."}
                </div>
              </CardFooter>
            </Card>

            {/* Metrics Section */}
            <div className="col-span-1 space-y-4">
              <Card className="flex items-center">
                <CardHeader className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-200 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
                      <CardDescription>
                        Time dedicated to learning this week.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                </CardContent>
              </Card>

              <Card className="flex items-center">
                <CardHeader className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-200 p-3 rounded-full">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">Overall Result</CardTitle>
                      <CardDescription>
                        Cumulative score across all tasks and activities.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">220</div>
                </CardContent>
              </Card>

              <Card className="flex items-center">
                <CardHeader className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-200 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">Completed</CardTitle>
                      <CardDescription>
                        Total tasks and assignments successfully completed.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">20</div>
                </CardContent>
              </Card>

              <Card className="flex items-center">
                <CardHeader className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 p-3 rounded-full">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                      <CardDescription>
                        The total number of courses enrolled in.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22</div>
                </CardContent>
              </Card>
            </div>

            {/* Pie Chart Section */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Overview of progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-around">
                  <div className="relative w-48 h-48 flex justify-center items-center">
                    <PieChart width={180} height={180}>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={5}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="absolute text-center">
                      <h4 className="text-2xl font-bold text-gray-800">22</h4>
                      <p className="text-sm text-gray-500">Total Progress</p>
                    </div>
                  </div>
                  <div className="space-y-3 mt-4">
                    {pieChartData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm"
                      >
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-sm font-medium text-gray-700">
                          {item.name}: <span className="font-bold">{item.value}%</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Calendar Section */}
      <Card className="col-span-1 lg:col-span-3 space-y-6">
        <CardHeader>
          <CardTitle>Early & Lates</CardTitle>
          <CardDescription>
            View all the Early & Late logins, logouts in this calendar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: "75vh" }}>
            <Calendar
              localizer={localizer}
              events={attendanceEvents}
              startAccessor="start"
              endAccessor="end"
              className="bg-[#fbe9ea] rounded"
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
  </>
  )
}

