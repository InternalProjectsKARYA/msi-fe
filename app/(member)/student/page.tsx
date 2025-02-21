"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Grid, List, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export type Student = {
  id: string;
  Student: string;
  Class: string;
  Gender: string;
  Parent: string;
  Email: string;
  Phone: string;
  status: "Active" | "InActive";
  avatar: string;
};

const StudentTableData: Student[] = [
  { id: "NS1", Student: "Aarav Patel", Class: "Nursery", Email: "aarav.patel@example.com", Phone: "9123456789", status: "Active", Gender: "Male", Parent: "Rajesh Patel", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "NS2", Student: "Meera Sharma", Class: "Nursery", Email: "meera.sharma@example.com", Phone: "9876543210", status: "Active", Gender: "Female", Parent: "Suman Sharma", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "KG1", Student: "Rohan Gupta", Class: "Kindergarten", Email: "rohan.gupta@example.com", Phone: "9234567891", status: "Active", Gender: "Male", Parent: "Vikram Gupta", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "LKG1", Student: "Ananya Verma", Class: "LKG", Email: "ananya.verma@example.com", Phone: "9354678912", status: "Active", Gender: "Female", Parent: "Preeti Verma", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "UKG1", Student: "Kabir Mehta", Class: "UKG", Email: "kabir.mehta@example.com", Phone: "9445567893", status: "Active", Gender: "Male", Parent: "Anil Mehta", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "P1", Student: "Nisha Reddy", Class: "1st Grade", Email: "nisha.reddy@example.com", Phone: "9556678914", status: "Active", Gender: "Female", Parent: "Ramesh Reddy", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: "P2", Student: "Aryan Singh", Class: "2nd Grade", Email: "aryan.singh@example.com", Phone: "9667789123", status: "Active", Gender: "Male", Parent: "Manoj Singh", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "P3", Student: "Diya Nair", Class: "3rd Grade", Email: "diya.nair@example.com", Phone: "9778891234", status: "Active", Gender: "Female", Parent: "Nandita Nair", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "P4", Student: "Karan Malhotra", Class: "4th Grade", Email: "karan.malhotra@example.com", Phone: "9889912345", status: "Active", Gender: "Male", Parent: "Rohit Malhotra", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "P5", Student: "Sanya Iyer", Class: "5th Grade", Email: "sanya.iyer@example.com", Phone: "9991023456", status: "Active", Gender: "Female", Parent: "Priya Iyer", avatar: "https://i.pravatar.cc/150?img=10" },
  { id: "LKG2", Student: "Aditya Bansal", Class: "LKG", Email: "aditya.bansal@example.com", Phone: "9123456780", status: "Active", Gender: "Male", Parent: "Rajeev Bansal", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "UKG2", Student: "Sneha Pillai", Class: "UKG", Email: "sneha.pillai@example.com", Phone: "9234567890", status: "Active", Gender: "Female", Parent: "Shalini Pillai", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "P6", Student: "Ishaan Kulkarni", Class: "1st Grade", Email: "ishaan.kulkarni@example.com", Phone: "9345678901", status: "Active", Gender: "Male", Parent: "Vinay Kulkarni", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "P7", Student: "Riya Saxena", Class: "2nd Grade", Email: "riya.saxena@example.com", Phone: "9456789012", status: "Active", Gender: "Female", Parent: "Anita Saxena", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: "P8", Student: "Arjun Das", Class: "3rd Grade", Email: "arjun.das@example.com", Phone: "9567890123", status: "Active", Gender: "Male", Parent: "Ashok Das", avatar: "https://i.pravatar.cc/150?img=15" },
];

export default function StudentsGridAndList() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
    });
  }, []);

  const StudentColumns: ColumnDef<Student>[] = [
    { id: "ID", header: "ID", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "Student",
      header: "Student Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatar} alt={row.getValue("Student")} />
          </Avatar>
          <span>{row.getValue("Student")}</span>
        </div>
      ),
    },
    { accessorKey: "Class", header: "Class" },
    { accessorKey: "Gender", header: "Gender" },
    { accessorKey: "Parent", header: "Parent Name" },
    { accessorKey: "Email", header: "Email" },
    { accessorKey: "Phone", header: "Phone" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge variant={row.getValue("status") === "Active" ? "default" : "secondary"}>{row.getValue("status")}</Badge>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/student-profile/${row.original.id}`)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: StudentTableData,
    columns: StudentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="space-y-4">
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Students List</h2>
            <p className="text-muted-foreground">Manage student data here.</p>
          </div>
          <TabsList>
            <TabsTrigger value="grid">
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {StudentTableData.map((student, index) => (
              <Card
                key={student.id}
                data-aos="flip-right"
                data-aos-duration={`${300 + index * 100}`}
                className="bg-[#ebf1e3]"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuItem  className="cursor-pointer" onClick={() => router.push(`/student-profile/${student.id}`)}>
                        View Details
                      </DropdownMenuItem>
                    
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={student.avatar} alt={student.Student} />
                  </Avatar>
                  <h3 className="font-semibold text-lg">{student.Student}</h3>
                  <p className="text-sm text-muted-foreground">{student.Class}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <p className="text-sm"><strong>Email:</strong> {student.Email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {student.Phone}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <Table>
              <TableHeader className="bg-[#d5e2c5]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
              <TableBody className="bg-[#f2f6ec]">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-aos="fade-up"
                      data-aos-duration={`${300 + index * 50}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={StudentColumns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

