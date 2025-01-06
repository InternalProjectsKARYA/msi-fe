"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, Label, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";

const pieChartData = [
  { subject: "Science", information: 275, fill: "hsl(var(--chart-1))" },
  { subject: "Mathematics", information: 200, fill: "hsl(var(--chart-2))" },
  { subject: "English", information: 287, fill: "hsl(var(--chart-3))" },
  { subject: "Social", information: 173, fill: "hsl(var(--chart-4))" },
  { subject: "Other", information: 190, fill: "hsl(var(--chart-5))" },
];

const totalinformation = pieChartData.reduce((sum, item) => sum + item.information, 0);

const pieChartConfig = {
  information: {
    label: "information",
  },
  Science: {
    label: "Science",
    color: "hsl(var(--chart-1))",
  },
  Mathematics: {
    label: "Mathematics",
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
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const GraphViewData = () => {
  return (
    <div className="flex flex-col ">
      {/* Header Section */}
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Graph Data
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          January - June 2024
        </CardDescription>
      </CardHeader>

      {/* Chart Section */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="information"
              nameKey="subject"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={2}
              fillOpacity={0.8}
              blendStroke
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
                        className="fill-gray-900 text-center"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-900 text-3xl font-bold"
                        >
                          {totalinformation}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-gray-500 text-sm"
                        >
                          Total information
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          Trending up by 5.2% this month
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-gray-500">
          Showing total information for the last 6 months.
        </div>
      </CardFooter>
    </div>
  );
};

export default GraphViewData;
