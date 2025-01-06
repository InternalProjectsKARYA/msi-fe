"use client"

import * as React from "react"
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Area, AreaChart, Dot, ResponsiveContainer, YAxis } from "recharts"
import Image from 'next/image'
import backgroundImage from "../../../../public/Frames-01.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Pie Chart Data
const pieChartData = [
  { browser: "Science ", Teachers: 275, fill: "var(--color-Science )" },
  { browser: "Mathamatics", Teachers: 200, fill: "var(--color-Mathamatics)" },
  { browser: "English", Teachers: 287, fill: "var(--color-English)" },
  { browser: "Social", Teachers: 173, fill: "var(--color-Social)" },
  { browser: "other", Teachers: 190, fill: "var(--color-other)" },
]

const pieChartConfig = {
  Teachers: {
    label: "  Teachers",
  },
  Science : {
    label: "Science ",
    color: "hsl(var(--chart-1))",
  },
  Mathamatics: {
    label: "Mathamatics",
    color: "hsl(var(--chart-2))",
  },
  English: {
    label: "English",
    color: "hsl(var(--chart-3))",
  },
  Social: {
    label: "Social",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// Bar Chart Data
const barChartData = [
  { month: "January", Teachers: 186   },
  { month: "February", Teachers: 305  },
  { month: "March", Teachers: 237  },
  { month: "April", Teachers: 73 },
  { month: "May", Teachers: 209 },
  { month: "June", Teachers: 214  },
]

const barChartConfig = {
  Teachers: {
    label: "Student",
    color: "hsl(var(--chart-1))",
  },
 
} satisfies ChartConfig

// Line Chart Data
const lineChartData = [
  { browser: "Science ", Teachers: 5, fill: "var(--color-Science )" },
  { browser: "Mathamatics", Teachers: 3, fill: "var(--color-Mathamatics)" },
  { browser: "English", Teachers: 7, fill: "var(--color-English)" },
  { browser: "Social", Teachers: 9, fill: "var(--color-Social)" },
  { browser: "other", Teachers: 11, fill: "var(--color-other)" },
]

const lineChartConfig = {
  Teachers: {
    label: "  Teachers",
    color: "hsl(var(--chart-2))",
  },
  Science : {
    label: "Science ",
    color: "hsl(var(--chart-1))",
  },
  Mathamatics: {
    label: "Mathamatics",
    color: "hsl(var(--chart-2))",
  },
  English: {
    label: "English",
    color: "hsl(var(--chart-3))",
  },
  Social: {
    label: "Social",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// Area Chart Data
const chartData = [
  { date: "2024-04-01", Teachers: 222, NonTeaching: 40, Students: 150 },
  { date: "2024-04-02", Teachers: 97, NonTeaching: 60,Students: 180 },
  { date: "2024-04-03", Teachers: 167, NonTeaching: 68,Students: 120 },
  // ... (include all the data points from the original component)
  { date: "2024-06-30", Teachers: 446,NonTeaching: 42, Students: 400 },
]

 
  

const areaChartConfig = {
    Teachers: {
      label: "Teachers",
      color: "hsl(var(--chart-3))",
    },
    NonTeaching: {
      label: "NonTeaching",
      color: "hsl(var(--chart-1))",
    },
    Students: {
      label: "Students",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig


export function ChartDashboard() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const totalVisitors = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.Teachers, 0)
  }, [])

 

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date("2024-06-30")
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }, [timeRange])
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Pie Chart */}
        <Card className="flex flex-col">
     
          <CardHeader className="items-center pb-0">
    
            <CardTitle> Teachers Attendance</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
    
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="Teachers"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                                Teachers
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total Teachers for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Students Attendance</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="Teachers" fill="var(--color-Teachers)" radius={5} />
               
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total Students for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Non-Teaching staff Attendance</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig}>
              <LineChart
                accessibilityLayer
                data={lineChartData}
                margin={{
                  top: 24,
                  left: 24,
                  right: 24,
                }}
              >
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      nameKey="Teachers"
                      hideLabel
                    />
                  }
                />
                <Line
                  dataKey="Teachers"
                  type="natural"
                  stroke="var(--color-Teachers)"
                  strokeWidth={2}
                  dot={({ payload, ...props }) => (
                    <Dot
                      key={payload.browser}
                      r={5}
                      cx={props.cx}
                      cy={props.cy}
                      fill={payload.fill}
                      stroke={payload.fill}
                    />
                  )}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total Non-Teaching for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Area Chart */}
      <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Overall Members Graph</CardTitle>
          <CardDescription>
            Showing total members for the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={areaChartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillTeachers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-Teachers)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-Teachers)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillNonTeaching" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-NonTeaching)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-NonTeaching)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-Students)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-Students)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                type="natural"
                dataKey="Students"
                stackId="1"
                stroke="var(--color-Students)"
                fill="url(#fillStudents)"
              />
              <Area
                type="natural"
                dataKey="NonTeaching"
                stackId="1"
                stroke="var(--color-NonTeaching)"
                fill="url(#fillNonTeaching)"
              />
              <Area
                type="natural"
                dataKey="Teachers"
                stackId="1"
                stroke="var(--color-Teachers)"
                fill="url(#fillTeachers)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  )
}
