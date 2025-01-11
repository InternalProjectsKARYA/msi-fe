"use client";

import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const subjects = ["PSED", "CLL", "PSRN", "KUW", "EAD", "PD"];

const generateDailyData = () => {
  return days.map(day => ({
    day,
    ...subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: Math.floor(Math.random() * 300) + 100
    }), {})
  }));
};

const dailyData = generateDailyData();

const chartConfig = {
  PSED: { label: "PSED", color: "hsl(var(--chart-1))" },
  CLL: { label: "CLL", color: "hsl(var(--chart-2))" },
  PSRN: { label: "PSRN", color: "hsl(var(--chart-3))" },
  KUW: { label: "KUW", color: "hsl(var(--chart-4))" },
  EAD: { label: "EAD", color: "hsl(var(--chart-5))" },
  PD: { label: "PD", color: "hsl(var(--chart-6))" },
};

export default function DailyPerformanceCharts() {
  const router = useRouter();

  const handleDayClick = (day: string) => {
    router.push(`/day-details/${day.toLowerCase()}`);
  };

  return (
<div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100 ">
      Day wise performance
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <Card className="w-full shadow-md rounded-lg  ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Day wise performance </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Performance for all subjects across the week
            </CardDescription>
          </CardHeader>
          <CardContent  >
            <div  >
              <ChartContainer config={chartConfig} className='h-[30vh] w-full'>
                <ResponsiveContainer width="100%" height="30%">
                  <BarChart
                    data={dailyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {subjects.map((subject) => (
                      <Bar
                        key={subject}
                        dataKey={subject}
                        fill={`var(--color-${subject})`}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <Card 
              key={day} 
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer shadow-md rounded-lg"
              onClick={() => handleDayClick(day)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{day}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  Daily subject performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[dailyData.find(d => d.day === day)]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        {subjects.map((subject) => (
                          <Bar
                            key={subject}
                            dataKey={subject}
                            fill={`var(--color-${subject})`}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

  );
}

