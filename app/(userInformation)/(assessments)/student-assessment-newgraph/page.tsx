"use client"

import { useRouter } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "PSED", term1: 186, term2: 80, term3: 120 },
  { month: "CLL", term1: 305, term2: 200, term3: 250 },
  { month: "PSRN", term1: 237, term2: 120, term3: 180 },
  { month: "KUW", term1: 73, term2: 190, term3: 130 },
  { month: "EAD", term1: 209, term2: 130, term3: 170 },
  { month: "PD", term1: 214, term2: 140, term3: 200 },
]

const chartConfig = {
  term1: {
    label: "Term 1",
    color: "hsl(var(--chart-1))",
  },
  term2: {
    label: "Term 2",
    color: "hsl(var(--chart-2))",
  },
  term3: {
    label: "Term 3",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function ResponsiveTripleBarChart() {
  const router = useRouter()

  const handleBarClick = (term: string) => {
    router.push(`/week-details/${term}`)
  }

  return (
    <div className="grid grid-cols-12 gap-4">
    <Card className="col-span-12 w-full">
      <CardHeader>
        <CardTitle>Student Term Assessment</CardTitle>
        {/* <CardDescription>January - Dec 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="">
        <div>
          <ChartContainer config={chartConfig} className='h-[400px] w-full'>
            <ResponsiveContainer width="100%" height=" %">
              <BarChart data={chartData}>
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
                <Bar
                  dataKey="term1"
                  fill="var(--color-term1)"
                  radius={4}
                  onClick={() => handleBarClick('term1')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="term2"
                  fill="var(--color-term2)"
                  radius={4}
                  onClick={() => handleBarClick('term2')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="term3"
                  fill="var(--color-term3)"
                  radius={4}
                  onClick={() => handleBarClick('term3')}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  </div>
  
  )
}

