"use client";

import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Generate random data for 8 weeks
const generateWeeklyData = () => {
  const subjects = ["PSED", "CLL", "PSRN", "KUW", "EAD", "PD"];
  return subjects.map(subject => ({
    subject,
    performance: Math.floor(Math.random() * 300) + 100 // Random value between 100 and 400
  }));
};

const weeklyData = Array.from({ length: 8 }, (_, i) => ({
  week: `Week ${i + 1}`,
  data: generateWeeklyData()
}));


const chartData = [
  { month: "PSED", desktop: 186, mobile: 80, tablet: 150, smartTV: 90, console: 70, wearable: 40, iot: 20, other: 10 },
  { month: "CLL", desktop: 305, mobile: 200, tablet: 180, smartTV: 110, console: 85, wearable: 55, iot: 30, other: 15 },
  { month: "PSRN", desktop: 237, mobile: 120, tablet: 160, smartTV: 95, console: 75, wearable: 45, iot: 25, other: 12 },
  { month: "KUW", desktop: 273, mobile: 190, tablet: 200, smartTV: 120, console: 90, wearable: 60, iot: 35, other: 18 },
  { month: "EAD", desktop: 209, mobile: 130, tablet: 170, smartTV: 100, console: 80, wearable: 50, iot: 28, other: 14 },
  { month: "PD", desktop: 214, mobile: 140, tablet: 190, smartTV: 115, console: 88, wearable: 58, iot: 32, other: 16 },
]

const chartConfigoverall = {
  desktop: { label: "week 1", color: "hsl(var(--chart-1))" },
  mobile: { label: "week 2", color: "hsl(var(--chart-2))" },
  tablet: { label: "week 3", color: "hsl(var(--chart-3))" },
  smartTV: { label: "week 4", color: "hsl(var(--chart-4))" },
  console: { label: "week 5", color: "hsl(var(--chart-5))" },
  wearable: { label: "week 6", color: "hsl(var(--chart-2))" },
  iot: { label: "week 7", color: "hsl(var(--chart-1))" },
  other: { label: "week 8", color: "hsl(var(--chart-2))" },
 
} satisfies ChartConfig


const chartConfig = {
  performance: {
    label: "Performance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function WeeklyPerformanceCharts() {
  const router = useRouter();

  const handleCardClick = (weekNumber: number) => {
    router.push(`/day-details/${weekNumber}`);
  };

  return (
    <>

<div className="mb-5 grid grid-cols-12">
  <Card className="col-span-12">
    <CardHeader>
      <CardTitle>Overall Term Details</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfigoverall} className="h-[400px] w-full">
        <ResponsiveContainer width=" 100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(chartConfigoverall).map(([key, config]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</div>

   
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   
   {weeklyData.map((week, index) => (
     <Card 
       key={week.week} 
       className="shadow-md rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300"
       onClick={() => handleCardClick(index + 1)}
     >
       <CardHeader>
         <CardTitle>{week.week}</CardTitle>
         <CardDescription>Performance for {week.week}</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="h-[200px]">
           <ChartContainer config={chartConfig}>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart
                 data={week.data}
                 margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
               >
                 <CartesianGrid vertical={false} />
                 <XAxis
                   dataKey="subject"
                   tickLine={false}
                   axisLine={false}
                   tickMargin={8}
                 />
                 <ChartTooltip
                   cursor={false}
                   content={<ChartTooltipContent indicator="line" />}
                 />
                 <Line
                   dataKey="performance"
                   type="natural"
                   stroke="var(--color-performance)"
                   strokeWidth={2}
                   dot={{ fill: "var(--color-performance)" }}
                   activeDot={{ r: 6 }}
                 >
                   <LabelList
                     dataKey="performance"
                     position="top"
                     offset={12}
                     className="fill-foreground"
                     fontSize={12}
                   />
                 </Line>
               </LineChart>
             </ResponsiveContainer>
           </ChartContainer>
         </div>
       </CardContent>
     </Card>
   ))}
 </div></>
  
  );
}

