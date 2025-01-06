"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {  Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useRouter, useSearchParams } from "next/navigation";

// Mock Data
const initialData = [
  { name: "Alice", wip: 3, done: 7, total: 10 },
  { name: "Bob", wip: 5, done: 5, total: 10 },
  { name: "Charlie", wip: 2, done: 8, total: 10 },
  { name: "Diana", wip: 4, done: 6, total: 10 },
  { name: "Eve", wip: 3, done: 7, total: 10 },
  { name: "Frank", wip: 5, done: 5, total: 10 },
  { name: "Grace", wip: 2, done: 8, total: 10 },
  { name: "Hank", wip: 4, done: 6, total: 10 },
  { name: "Ivy", wip: 5, done: 5, total: 10 },
  { name: "Jack", wip: 3, done: 7, total: 10 },
  { name: "Ken", wip: 4, done: 6, total: 10 },
];

const COLORS = ["#0088FE", "#00C49F"];

export default function TableData() {
  const [search, setSearch] = useState("");
  const [data] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedName = searchParams.get("name");

  const handleNameClick = (name: string) => {
    router.push(`?name=${name}`);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalWip = filteredData.reduce((sum, row) => sum + row.wip, 0);
  const totalDone = filteredData.reduce((sum, row) => sum + row.done, 0);
  const totalTotal = filteredData.reduce((sum, row) => sum + row.total, 0);

  const personData = data.find((row) => row.name === selectedName);
  const pieChartData = personData
    ? [
        { name: "WIP", value: personData.wip },
        { name: "Done", value: personData.done },
      ]
    : [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="w-full p-0">
      <CardHeader >
        <CardTitle className="text-xl font-bold">Task Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-start mb-4 w-96">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex space-x-10">
          {/* Table */}
          <div className="flex-1">
            <Card>
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-left">Name</TableHead>
                  <TableHead className="text-right">WIP</TableHead>
                  <TableHead className="text-right">Done</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className="cursor-pointer text-blue-500 underline"
                      onClick={() => handleNameClick(row.name)}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className="text-right">{row.wip}</TableCell>
                    <TableCell className="text-right">{row.done}</TableCell>
                    <TableCell className="text-right">{row.total}</TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{totalWip}</TableCell>
                  <TableCell className="text-right font-bold">{totalDone}</TableCell>
                  <TableCell className="text-right font-bold">{totalTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </Card>
          

            {/* Pagination */}
            <div className="flex justify-end space-x-4 items-center mt-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Pie Chart */}
          {selectedName && (
            <div className="ml-8 w-1/4 flex   justify-center ">
              <div>
              <CardHeader className="p-0 flex items-center">
                <CardTitle className="text-lg font-semibold">
                    {selectedName}'s Work Progress
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 ">
                    A breakdown of work in progress (WIP) and completed tasks for {selectedName}.
                </p>
                </CardHeader>

                <CardContent>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
