"use client";

import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import { Grid, List } from "lucide-react"; // Import icons
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
import { Select, SelectContent, SelectGroup, SelectItem,   SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";

// Define data types and sample data
export type Student = {
  id: string;
  AdmissionNo: string;
  RollNo: string;
  Student: string;
  Class: string;
  Gender: string;
  Parent: string;
  Email: string;
  Phone: string;
  status: "Active" | "InActive";
 
};

export default function StudentsGridAndList() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("");
  const [isStudentDialogOpen, setStudentDialogOpen] = useState(false);
 
 
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  useEffect(() => {
    AOS.init({
     
      easing: 'ease-in-out',  
    });
  }, []);
  const StudentTableData = [
    { id: "NS1", Student: "Aarav Patel", Class: "Nursery", Email: "aarav.patel@example.com", Phone: "9123456789", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: "NS2", Student: "Meera Sharma", Class: "Nursery", Email: "meera.sharma@example.com", Phone: "9876543210", status: "Active", avatar: "https://i.pravatar.cc/150?img=33" },
    { id: "KG1", Student: "Rohan Gupta", Class: "Kindergarten", Email: "rohan.gupta@example.com", Phone: "9234567891", status: "Active", avatar: "https://i.pravatar.cc/150?img=34" },
    { id: "LKG1", Student: "Ananya Verma", Class: "LKG", Email: "ananya.verma@example.com", Phone: "9354678912", status: "Active", avatar: "https://i.pravatar.cc/150?img=35" },
    { id: "UKG1", Student: "Kabir Mehta", Class: "UKG", Email: "kabir.mehta@example.com", Phone: "9445567893", status: "Active", avatar: "https://i.pravatar.cc/150?img=36" },
  
    { id: "P1", Student: "Nisha Reddy", Class: "1st Grade", Email: "nisha.reddy@example.com", Phone: "9556678914", status: "Active", avatar: "https://i.pravatar.cc/150?img=37" },
    { id: "P2", Student: "Aryan Singh", Class: "2nd Grade", Email: "aryan.singh@example.com", Phone: "9667789123", status: "Active", avatar: "https://i.pravatar.cc/150?img=38" },
    { id: "P3", Student: "Diya Nair", Class: "3rd Grade", Email: "diya.nair@example.com", Phone: "9778891234", status: "Active", avatar: "https://i.pravatar.cc/150?img=39" },
    { id: "P4", Student: "Karan Malhotra", Class: "4th Grade", Email: "karan.malhotra@example.com", Phone: "9889912345", status: "Active", avatar: "https://i.pravatar.cc/150?img=40" },
    { id: "P5", Student: "Sanya Iyer", Class: "5th Grade", Email: "sanya.iyer@example.com", Phone: "9991023456", status: "Active", avatar: "https://i.pravatar.cc/150?img=41" },
  
    { id: "LKG2", Student: "Aditya Bansal", Class: "LKG", Email: "aditya.bansal@example.com", Phone: "9123456780", status: "Active", avatar: "https://i.pravatar.cc/150?img=42" },
    { id: "UKG2", Student: "Sneha Pillai", Class: "UKG", Email: "sneha.pillai@example.com", Phone: "9234567890", status: "Active", avatar: "https://i.pravatar.cc/150?img=43" },
    { id: "P6", Student: "Ishaan Kulkarni", Class: "1st Grade", Email: "ishaan.kulkarni@example.com", Phone: "9345678901", status: "Active", avatar: "https://i.pravatar.cc/150?img=44" },
    { id: "P7", Student: "Riya Saxena", Class: "2nd Grade", Email: "riya.saxena@example.com", Phone: "9456789012", status: "Active", avatar: "https://i.pravatar.cc/150?img=45" },
    { id: "P8", Student: "Arjun Das", Class: "3rd Grade", Email: "arjun.das@example.com", Phone: "9567890123", status: "Active", avatar: "https://i.pravatar.cc/150?img=46" },
  ];
  
  


 
  // Define columns for table view
  const StudentColumns: ColumnDef<Student>[] = [
    { id: "ID", header: " ID", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "AdmissionNo",
      header: ({ column }) => (
        <Button variant="ghost" >
          Admission No
        </Button>
      ),
      cell: ({ row }) => row.getValue("AdmissionNo"),
    },
    // {
    //   accessorKey: "RollNo",
    //   header: ({ column }) => (
    //     <Button variant="ghost" >
    //       Roll No
    //     </Button>
    //   ),
    //   cell: ({ row }) => row.getValue("RollNo"),
    // },
    {
      accessorKey: "Student",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Student Name  
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt={row.getValue("Student")} />
          </Avatar>
          <span>{row.getValue("Student")}</span>
        </div>
      ),
    },
    {
      accessorKey: "Class",
      header: ({ column }) => (
        <Button variant="ghost" >
          Class
        </Button>
      ),
      cell: ({ row }) => row.getValue("Class"),
    },
    {
      accessorKey: "Gender",
      header: ({ column }) => (
        <Button variant="ghost" >
          Gender
        </Button>
      ),
      cell: ({ row }) => row.getValue("Gender"),
    },
    {
      accessorKey: "Parent",
      header: ({ column }) => (
        <Button variant="ghost" >
          Parent Name
        </Button>
      ),
      cell: ({ row }) => row.getValue("Parent"),
    },
    {
      accessorKey: "Email",
      header: ({ column }) => (
        <Button variant="ghost" >
          Email
        </Button>
      ),
      cell: ({ row }) => row.getValue("Email"),
    },
    {
      accessorKey: "Phone",
      header: ({ column }) => (
        <Button variant="ghost" >
          Phone
        </Button>
      ),
      cell: ({ row }) => row.getValue("Phone"),
    },
    // {
    //   accessorKey: "DOJ",
    //   header: ({ column }) => (
    //     <Button variant="ghost" >
    //       Date of join
    //     </Button>
    //   ),
    //   cell: ({ row }) => row.getValue("DOJ"),
    // },
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
            <DropdownMenuItem onClick={() => handleStudentEditClick(row.original)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const [selectedStudentStatus, setSelectedStudentStatus] = useState<"Active" | "InActive">("Active");

  const handleStudentEditClick = (classItem: Student) => {

    setSelectedStudentStatus(classItem.status);
    setStudentDialogOpen(true);
  };

  const classTable = useReactTable({
    data: StudentTableData,
    columns: StudentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
  });
  return (
    <div className=" ">
      <Tabs defaultValue="grid">

        <TabsContent value="grid">
          <CardHeader>
            <div className="flex justify-between items-center ">
              <div className="flex   ">
                <div className="w-48">
                  <CardTitle className="text-2xl font-bold">Students List</CardTitle>
                  <CardDescription>
                    Manage Student data here.
                  </CardDescription>
                </div>


              </div>
              <div className="flex justify-between items-center ">
                <TabsList >
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
  {StudentTableData.map((student, index) => (
    <Card
      key={student.id}
      data-aos="flip-right"
      data-aos-duration={`${300 + index * 300}`}
      className="p-4 shadow-md"
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-500">{student.id}</span>
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
                  handleStudentEditClick(student);
                  setStudentDialogOpen(true);
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
          <Avatar className="w-16 h-16 mb-3">
            <AvatarImage src={student.avatar} alt={student.Student} />
          </Avatar>
          <div className="flex flex-col mt-2">
            <p className="text-lg font-semibold">{student.Student}</p>
            <p className="text-sm text-gray-500">{student.Class}</p>
          </div>
        </div>

        <p className="text-sm mt-2 text-gray-600">
          <strong>Email:</strong> {student.Email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong> {student.Phone}
        </p>
      </CardContent>
      <CardFooter className="mt-3 flex justify-between items-center">
        <Badge className="px-2 py-1 text-xs font-medium">{student.status}</Badge>
        <Button
          onClick={() => router.push(`/student-profile/${student.id}`)}
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
            <div className="flex justify-between items-center ">
              <div className="flex    ">
                <div className="w-48">
                  <CardTitle className="text-2xl font-bold">Students List</CardTitle>
                  <CardDescription>
                    Manage Student data here.
                  </CardDescription>
                </div>


              </div>
              <div className="flex justify-between items-center ">
                <TabsList >
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
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {classTable.getRowModel().rows.length ? (
                    classTable.getRowModel().rows.map((row,index) => (
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
                      <TableCell colSpan={StudentColumns.length} className="h-24 text-center">
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

      {/* Dialog for editing a student */}
      <Dialog open={isStudentDialogOpen} onOpenChange={setStudentDialogOpen}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Make changes to the Student details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="admission" className="text-left">Admission</Label>
                <Input id="admission" placeholder="Admission No" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="roll" className="text-left">Roll</Label>
                <Input id="roll" placeholder="Roll No" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="studentName" className="text-left">Student</Label>
                <Input id="studentName" placeholder="Student name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="gender" className="text-left">Gender</Label>
                <Select onValueChange={(value) => setSelectedClass(value)} value={selectedClass}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="parentName" className="text-left">Parent</Label>
                <Input id="parentName" placeholder="Parent name" className="col-span-3" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="classDropdown" className="text-left">Class</Label>
                <Select onValueChange={(value) => setSelectedClass(value)} value={selectedClass}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
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
                <Label htmlFor="parentContact" className="text-left">Parent</Label>
                <Input id="parentContact" placeholder="Parent" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="phone" className="text-left">Phone</Label>
                <Input id="phone" placeholder="Phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="email" className="text-left">Email</Label>
                <Input id="email" placeholder="Email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">Status</Label>
                <Select onValueChange={(value) => setSelectedStudentStatus(value as "Active" | "InActive")}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="InActive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setStudentDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



    </div>
  );
}
