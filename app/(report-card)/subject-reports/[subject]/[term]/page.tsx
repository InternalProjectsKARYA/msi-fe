"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 🟢 **Donut Chart Data** for each test
const testChartsData = [
  {
    title: "Test 1 Performance",
    period: "First Evaluation",
    trend: { value: 5.2, direction: "up" },
    percentage: 90,
    colors: ["#4F46E5", "#E5E7EB"],
  },
  {
    title: "Test 2 Performance",
    period: "Second Evaluation",
    trend: { value: 3.8, direction: "up" },
    percentage: 85,
    colors: ["#F59E0B", "#E5E7EB"],
  },
  {
    title: "Test 3 Performance",
    period: "Third Evaluation",
    trend: { value: -1.2, direction: "down" },
    percentage: 78,
    colors: ["#EF4444", "#E5E7EB"],
  },
  {
    title: "Quarterly Exam",
    period: "Mid Year",
    trend: { value: 4.5, direction: "up" },
    percentage: 92,
    colors: ["#2563EB", "#E5E7EB"],
  },
  {
    title: "Half Yearly Exam",
    period: "Six-Month Review",
    trend: { value: 6.0, direction: "up" },
    percentage: 88,
    colors: ["#059669", "#E5E7EB"],
  },
  {
    title: "Annual Exam",
    period: "Final Year",
    trend: { value: 95, direction: "up" },
    percentage: 95,
    colors: ["#14B8A6", "#E5E7EB"],
  },
];

// 🟢 **Donut Chart Card Component**
function DonutChartCard({ data: chartInfo }: { data: typeof testChartsData[0] }) {
  const { percentage, colors } = chartInfo;
  const totalData = [
    { name: "Achieved", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const TrendIcon =
    chartInfo.trend.direction === "up"
      ? TrendingUp
      : chartInfo.trend.direction === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    chartInfo.trend.direction === "up"
      ? "text-green-500"
      : chartInfo.trend.direction === "down"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <Card className="flex flex-col shadow-lg rounded-xl bg-muted/10">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold">{chartInfo.title}</CardTitle>
        <CardDescription className="text-xs">{chartInfo.period}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip />
            <Pie
              data={totalData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={4}
              startAngle={90}
              endAngle={-270}
            >
              {totalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-xs">
        <div className="flex justify-center items-center text-2xl font-bold text-primary">
          {percentage}%
        </div>
        <div className={`flex items-center gap-1 font-medium leading-none ${trendColor}`}>
          {chartInfo.trend.direction === "up"
            ? "Up"
            : chartInfo.trend.direction === "down"
            ? "Down"
            : "Neutral"}{" "}
          by {chartInfo.trend.value}%
          <TrendIcon className="h-3 w-3" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total {chartInfo.period.toLowerCase()} Performance
        </div>
      </CardFooter>
    </Card>
  );
}

// 🟢 **Dashboard Component**
export default function StudentReportsDashboard() {
  const { subject, term } = useParams() as { subject?: string; term?: string };

  return (
    <>
      <div className="  space-y-4">
        <h1 className="text-2xl font-bold text-primary">
          📘 {subject?.toUpperCase() ?? "Subject"} - {term?.toUpperCase() ?? "Term"} Report
        </h1>
        <p className="text-muted-foreground">
          Detailed performance for {subject ?? "N/A"} in {term ?? "N/A"}.
        </p>
      </div>

      {/* 🟢 Grid Layout for Donut Charts */}
      <div className="  grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {testChartsData.map((chart, index) => (
          <DonutChartCard key={index} data={chart} />
        ))}
      </div>
    </>
  );
}
