"use client";

import React, { useEffect, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Grid, List } from "lucide-react";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from '@/lib/axiosInstance';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";

export type Teacher = {
    id: string;
    Teacher: string;
    Class: string;
    Email: string;
    Phone: string;
    status: "Active" | "InActive";
    Subject: string;
};

export default function TeachersGridAndList() {
    const router = useRouter();
    const [selectedClass, setSelectedClass] = useState("");
 
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [isTeacherDialogOpen, setTeacherDialogOpen] = useState(false);
    const [selectedTeacherStatus, setSelectedTeacherStatus] = useState<"Active" | "InActive">("Active");
    useEffect(() => {
        AOS.init({
         
          easing: 'ease-in-out',  
        });
      }, []);

  

      const teacherTableData = [
        { id: "A1B2", Teacher: "Gautami Reddy", Class: "10th Grade", Email: "arjunr@example.com", Phone: "9876543210", Subject: "Mathematics", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
        { id: "C3D4", Teacher: "Lakshmi Menon", Class: "9th Grade", Email: "lakshmim@example.com", Phone: "9876543221", Subject: "Science", status: "Active", avatar: "https://i.pravatar.cc/150?img=33" },
   
        { id: "G7H8", Teacher: "Meera Nair", Class: "7th Grade", Email: "meeran@example.com", Phone: "9876543243", Subject: "History", status: "Active", avatar: "https://i.pravatar.cc/150?img=35" },
        { id: "I9J1", Teacher: "Priya ", Class: "6th Grade", Email: "rahuls@example.com", Phone: "9876543254", Subject: "Geography", status: "Active", avatar: "https://i.pravatar.cc/150?img=36" },
      
        { id: "M4N5", Teacher: "Vikram Rathore", Class: "10th Grade", Email: "vikramr@example.com", Phone: "9876543276", Subject: "Chemistry", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=38" },
 
        
        { id: "S1T2", Teacher: "Priya Iyer", Class: "7th Grade", Email: "priyai@example.com", Phone: "9876543211", Subject: "Art", status: "Active", avatar: "https://i.pravatar.cc/150?img=41" },
  
        { id: "W5X6", Teacher: "Deepika Patel", Class: "11th Grade", Email: "deepikap@example.com", Phone: "9876543233", Subject: "Mathematics", status: "Active", avatar: "https://i.pravatar.cc/150?img=43" },
        { id: "Y7Z8", Teacher: "Rajeev Menon", Class: "10th Grade", Email: "rajeevm@example.com", Phone: "9876543244", Subject: "Physical Education", status: "Active", avatar: "https://i.pravatar.cc/150?img=44" },
        { id: "A9B1", Teacher: "Shreya Kapoor", Class: "9th Grade", Email: "shreyak@example.com", Phone: "9876543255", Subject: "Chemistry", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=45" },
     
        { id: "E4F5", Teacher: "Pooja Mishra", Class: "7th Grade", Email: "poojam@example.com", Phone: "9876543277", Subject: "English", status: "Active", avatar: "https://i.pravatar.cc/150?img=47" },
        { id: "G6H7", Teacher: "Aditya Rao", Class: "6th Grade", Email: "adityar@example.com", Phone: "9876543288", Subject: "History", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=48" },
        { id: "I8J9", Teacher: "Nisha Singh", Class: "11th Grade", Email: "nishas@example.com", Phone: "9876543299", Subject: "Physics", status: "Active", avatar: "https://i.pravatar.cc/150?img=49" },
      
 
      ];
      
      
      
   
      

    // Define columns for table view
    const TeacherColumns: ColumnDef<Teacher>[] = [
        { id: "ID", header: "ID", cell: (info) => info.row.index + 1 },
        {
            accessorKey: "Teacher",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Teacher Name 
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt={row.getValue("Teacher")} />
                    </Avatar>
                    <span>{row.getValue("Teacher")}</span>
                </div>
            ),
        },
        {
            accessorKey: "Class",
            header: ({ column }) => (
                <Button variant="ghost">
                    Class
                </Button>
            ),
            cell: ({ row }) => row.getValue("Class"),
        },
        {
            accessorKey: "Subject",
            header: ({ column }) => (
                <Button variant="ghost">
                    Subject
                </Button>
            ),
            cell: ({ row }) => row.getValue("Subject"),
        },
        {
            accessorKey: "Email",
            header: ({ column }) => (
                <Button variant="ghost">
                    Email
                </Button>
            ),
            cell: ({ row }) => row.getValue("Email"),
        },
        {
            accessorKey: "Phone",
            header: ({ column }) => (
                <Button variant="ghost">
                    Phone
                </Button>
            ),
            cell: ({ row }) => row.getValue("Phone"),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
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
                    <DropdownMenuContent side="right" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleTeacherEditClick(row.original)}>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const classTable = useReactTable({
        data: teacherTableData,
        columns: TeacherColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters, columnVisibility },
    });

    const handleTeacherEditClick = (teacher: Teacher) => {
        setSelectedTeacherStatus(teacher.status);
        setTeacherDialogOpen(true);
    };

    return (
        <div>
            <Tabs defaultValue="grid">
                <TabsContent value="grid">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div className="w-48">
                                <CardTitle className="text-2xl font-bold">Teachers List</CardTitle>
                                <CardDescription>
                                    Manage Teacher data here.
                                </CardDescription>
                            </div>
                            <div className="flex justify-between items-center">
                                <TabsList>
                                    <TabsTrigger value="grid" className="flex items-center gap-2">
                                        <Grid className="h-5 w-5" />
                                    </TabsTrigger>
                                    <TabsTrigger value="list" className="flex items-center gap-2">
                                        <List className="h-5 w-5" />
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {teacherTableData.map((teacher, index) => (
    <Card
      key={teacher.id}
      data-aos="fade-up"
      data-aos-duration={`${300 + index * 300}`}
      className="p-4 shadow-md"
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-500">ID: {teacher.id}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => {
                  handleTeacherEditClick(teacher);
                  setTeacherDialogOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="flex flex-row gap-5">
          {/* Dynamic Avatar */}
          <Avatar className="w-16 h-16 mb-3">
            <AvatarImage src={teacher.avatar} alt={teacher.Teacher} />
          </Avatar>
          <div className="flex flex-col mt-2">
            <p className="text-lg font-semibold">{teacher.Teacher}</p>
            <p className="text-sm text-gray-500">{teacher.Class}</p>
          </div>
        </div>
        <p className="text-sm mt-2 text-gray-600">
          <strong>Email:</strong> {teacher.Email}
        </p>
        <p className="text-sm mt-2 text-gray-600">
          <strong>Phone:</strong> {teacher.Phone}
        </p>
        <Badge variant="outline" className="mt-2">
          {teacher.Subject}
        </Badge>
      </CardContent>
      <CardFooter className="mt-3 flex justify-between items-center">
        <Badge className="px-2 py-1 text-xs font-medium">{teacher.status}</Badge>
        <Button
          onClick={() => {
            router.push(`/teacher-profile/${teacher.id}`);
          }}
          variant="outline"
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>

                </TabsContent>
                <TabsContent value="list">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div className="w-48">
                                <CardTitle className="text-2xl font-bold">Teachers List</CardTitle>
                                <CardDescription>
                                    Manage Teacher data here.
                                </CardDescription>
                            </div>
                            <div className="flex justify-between items-center">
                                <TabsList>
                                    <TabsTrigger value="grid" className="flex items-center gap-2">
                                        <Grid className="h-5 w-5" />
                                    </TabsTrigger>
                                    <TabsTrigger value="list" className="flex items-center gap-2">
                                        <List className="h-5 w-5" />
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        </div>
                    </CardHeader>
                    <Card>
                        <CardContent className="space-y-2 p-0">
                            <Table>
                                <TableHeader>
                                    {classTable.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} className="bg-gray-200 text-black">
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {classTable.getRowModel().rows.length ? (
                                        classTable.getRowModel().rows.map((row, index) => (
                                            <TableRow key={row.id}
                                            data-aos="fade-up"
                                            data-aos-duration={`${300 + index * 300}`}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={TeacherColumns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                       <div className="flex items-center justify-end space-x-2 py-4">
                                <div className="flex-1 text-sm text-muted-foreground">
                                  {classTable.getFilteredSelectedRowModel().rows.length} of{" "}
                                  {classTable.getFilteredRowModel().rows.length} row(s) selected.
                                </div>
                                <div className="space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => classTable.previousPage()}
                                    disabled={!classTable.getCanPreviousPage()}
                                  >
                                    Previous
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => classTable.nextPage()}
                                    disabled={!classTable.getCanNextPage()}
                                  >
                                    Next
                                  </Button>
                                </div>
                              </div>
                </TabsContent>
            </Tabs>

            {/* Dialog for editing a Teacher */}
            <Dialog open={isTeacherDialogOpen} onOpenChange={setTeacherDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Teacher</DialogTitle>
                        <DialogDescription>
                            Make changes to the Teacher details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="Title" className="text-left">Teacher</Label>
                            <Input id="Title" placeholder="Teacher name" className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="classDropdown" className="text-left">Class</Label>
                            <Select
                                onValueChange={(value) => setSelectedClass(value)}
                                value={selectedClass}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Class</SelectLabel>
                                        <SelectItem value="1st Standard">1st Standard</SelectItem>
                                        <SelectItem value="2nd Standard">2nd Standard</SelectItem>
                                        <SelectItem value="3rd Standard">3rd Standard</SelectItem>
                                        <SelectItem value="4th Standard">4th Standard</SelectItem>
                                        <SelectItem value="5th Standard">5th Standard</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="Subject" className="text-left">Subject</Label>
                            <Input id="Subject" placeholder="Subject" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="Phone" className="text-left">Phone</Label>
                            <Input id="Phone" placeholder="Phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="Email" className="text-left">Email</Label>
                            <Input id="Email" placeholder="Email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="status" className="text-left">Status</Label>
                            <Select onValueChange={(value) => setSelectedTeacherStatus(value as "Active" | "InActive")}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="InActive">Inactive</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => setTeacherDialogOpen(false)}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
