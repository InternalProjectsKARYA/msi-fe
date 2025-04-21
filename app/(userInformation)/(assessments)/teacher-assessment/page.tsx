"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export type AssessmentDetails = {
  id: string;
  student: string;
  subject: string;
  marks: string;
  status: "Completed" | "Pending";
};

// Static data for the table
const assessmentData: AssessmentDetails[] = [
  { id: "1", student: "John Doe", subject: "Math", marks: "85", status: "Completed" },
  { id: "2", student: "Jane Smith", subject: "Science", marks: "78", status: "Completed" },
  { id: "3", student: "Sam Wilson", subject: "History", marks: "92", status: "Completed" },
  { id: "4", student: "Alice Brown", subject: "English", marks: "--", status: "Pending" },
  { id: "5", student: "Mark Davis", subject: "Physics", marks: "74", status: "Completed" },
  { id: "6", student: "Sophia Lee", subject: "Biology", marks: "--", status: "Pending" },
  { id: "7", student: "Chris Evans", subject: "Chemistry", marks: "69", status: "Completed" },
  { id: "8", student: "Emma Watson", subject: "Geography", marks: "91", status: "Completed" },
  { id: "9", student: "Liam Johnson", subject: "Economics", marks: "--", status: "Pending" },
  { id: "10", student: "Olivia Martinez", subject: "Art", marks: "83", status: "Completed" },
];

export default function StudentAssessmentTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter data based on search input
  const filteredData = assessmentData.filter((assessment) =>
    assessment.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnDef<AssessmentDetails>[] = [
    {
      id: "Sno",
      header: "S. No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "id",
      header: "Assessment ID",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="underline"
          onClick={() => router.push(`/exam-valuation/${row.getValue("id")}`)}
        >
          {row.getValue("id")}
        </Button>
      ),
    },
    {
      accessorKey: "student",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Button
          variant="link"
          className="underline"
          onClick={() => router.push(`/exam-valuation/${row.original.id}`)}
        >
          {row.getValue("student")}
        </Button>
      ),
    },
    {
      accessorKey: "subject",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Subject <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("subject"),
    },
    {
      accessorKey: "marks",
      header: "Marks",
      cell: ({ row }) => row.getValue("marks"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded font-medium text-xs ${
            row.getValue("status") === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("status")}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnVisibility },
  });

  return (
    <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12">
      <h2 className="text-xl font-semibold mb-4">Student Assessment Details</h2>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Assessments</CardTitle>
              <CardDescription>
                Track the progress and performance of your students across various subjects.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full mb-4">
            <Input
              placeholder="Search by student name..."
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className=" bg-gray-200">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody >
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
  
  );
}
