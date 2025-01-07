"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  Dot,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart Data and Configurations
const chartDataTerm1 = [
  { subject: "PSED", term: 186 },
  { subject: "CLL", term: 105 },
  { subject: "PSRN", term: 237 },
  { subject: "KUW", term: 303 },
  { subject: "EAD", term: 209 },
  { subject: "PD", term: 214 },
];

const chartDataTerm2 = [
  { subject: "PSED", term: 250 },
  { subject: "CLL", term: 400 },
  { subject: "PSRN", term: 310 },
  { subject: "KUW", term: 90 },
  { subject: "EAD", term: 300 },
  { subject: "PD", term: 280 },
];

const chartDataTerm3 = [
  { subject: "PSED", term: 100 },
  { subject: "CLL", term: 170 },
  { subject: "PSRN", term: 290 },
  { subject: "KUW", term: 200 },
  { subject: "EAD", term: 310 },
  { subject: "PD", term: 240 },
];

const chartConfigTerms = {
  term: {
    label: "Term",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Main Component
export default function CombinedGraphs() {
  return (
    <div className="flex gap-4">
      {/* Chart 1: Term 1 */}
      <Card className="w-full md:w-1/3 shadow-md rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Term 1</CardTitle>
          <CardDescription>Performance for Term 1</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigTerms}>
            <LineChart
              accessibilityLayer
              data={chartDataTerm1}
              margin={{ top: 24, left: 24, right: 24 }}
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
                dataKey="term"
                type="natural"
                stroke="var(--color-term)"
                strokeWidth={2}
                dot={{ fill: "var(--color-term)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this term <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing term performance across subjects.
          </div>
        </CardFooter>
      </Card>

      {/* Chart 2: Term 2 */}
      <Card className="w-full md:w-1/3 shadow-md rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Term 2</CardTitle>
          <CardDescription>Performance for Term 2</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigTerms}>
            <LineChart
              accessibilityLayer
              data={chartDataTerm2}
              margin={{ top: 24, left: 24, right: 24 }}
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
                dataKey="term"
                type="natural"
                stroke="var(--color-term)"
                strokeWidth={2}
                dot={{ fill: "var(--color-term)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 8.1% this term <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing term performance across subjects.
          </div>
        </CardFooter>
      </Card>

      {/* Chart 3: Term 3 */}
      <Card className="w-full md:w-1/3 shadow-md rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Term 3</CardTitle>
          <CardDescription>Performance for Term 3</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigTerms}>
            <LineChart
              accessibilityLayer
              data={chartDataTerm3}
              margin={{ top: 24, left: 24, right: 24 }}
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
                dataKey="term"
                type="natural"
                stroke="var(--color-term)"
                strokeWidth={2}
                dot={{ fill: "var(--color-term)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 3.7% this term <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing term performance across subjects.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
