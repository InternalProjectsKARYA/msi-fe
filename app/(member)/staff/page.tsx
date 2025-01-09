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
import { Select, SelectContent, SelectGroup, SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select";
 


// Define data types and sample data
export type Staff = {
  id: string;
  Staff: string;
  Department: string;
  Doj: string;
  Email: string;
  Phone: string;
  status: "Active" | "InActive";
  Reporting: string;
};

export default function StaffsGridAndList() {
 
  const [selectedClass, setSelectedClass] = useState("");
  const [isStaffDialogOpen, setStaffDialogOpen] = useState(false);
  const [isStaffSheetOpen, setIsStaffSheetOpen] = useState(false);
 
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const staffTableData = [
    { id: "S001", Staff: "Amit Kumar", Department: "Administration", Email: "amit.kumar@example.com", Phone: "9123456789", status: "Active", avatar: "https://i.pravatar.cc/150?img=51" },
    { id: "S002", Staff: "Priya Sharma", Department: "Finance", Email: "priya.sharma@example.com", Phone: "9876543210", status: "Active", avatar: "https://i.pravatar.cc/150?img=52" },
    { id: "S003", Staff: "Rahul Verma", Department: "IT Support", Email: "rahul.verma@example.com", Phone: "9234567891", status: "Active", avatar: "https://i.pravatar.cc/150?img=53" },
    { id: "S004", Staff: "Anjali Mehta", Department: "Human Resources", Email: "anjali.mehta@example.com", Phone: "9354678912", status: "Active", avatar: "https://i.pravatar.cc/150?img=54" },
    { id: "S005", Staff: "Ramesh Gupta", Department: "Security", Email: "ramesh.gupta@example.com", Phone: "9445567893", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=55" },
    { id: "S006", Staff: "Sneha Patel", Department: "Library", Email: "sneha.patel@example.com", Phone: "9556678914", status: "Active", avatar: "https://i.pravatar.cc/150?img=56" },
    { id: "S007", Staff: "Vikram Das", Department: "Transport", Email: "vikram.das@example.com", Phone: "9667789123", status: "Active", avatar: "https://i.pravatar.cc/150?img=57" },
    { id: "S008", Staff: "Pooja Iyer", Department: "Cafeteria", Email: "pooja.iyer@example.com", Phone: "9778891234", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=58" },
    { id: "S009", Staff: "Arun Malhotra", Department: "Maintenance", Email: "arun.malhotra@example.com", Phone: "9889912345", status: "Active", avatar: "https://i.pravatar.cc/150?img=59" },
    { id: "S010", Staff: "Neha Jain", Department: "Counseling", Email: "neha.jain@example.com", Phone: "9991023456", status: "Active", avatar: "https://i.pravatar.cc/150?img=60" },
    { id: "S011", Staff: "Manish Bansal", Department: "Administration", Email: "manish.bansal@example.com", Phone: "9123456780", status: "Active", avatar: "https://i.pravatar.cc/150?img=61" },
    { id: "S012", Staff: "Megha Pillai", Department: "IT Support", Email: "megha.pillai@example.com", Phone: "9234567890", status: "Active", avatar: "https://i.pravatar.cc/150?img=62" },
    { id: "S013", Staff: "Ishaan Kulkarni", Department: "Security", Email: "ishaan.kulkarni@example.com", Phone: "9345678901", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=63" },
    { id: "S014", Staff: "Riya Saxena", Department: "Human Resources", Email: "riya.saxena@example.com", Phone: "9456789012", status: "Active", avatar: "https://i.pravatar.cc/150?img=64" },
    { id: "S015", Staff: "Arjun Das", Department: "Transport", Email: "arjun.das@example.com", Phone: "9567890123", status: "Active", avatar: "https://i.pravatar.cc/150?img=65" },
  ];
  
 



  
  useEffect(() => {
    AOS.init({
     
      easing: 'ease-in-out',  
    });
  }, []);
  // Define columns for table view
  const StaffColumns: ColumnDef<Staff>[] = [
    { id: "ID", header: " ID", cell: (info) => info.row.index + 1 },
  
  
    {
      accessorKey: "Staff",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name 
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt={row.getValue("Staff")} />
          </Avatar>
          <span>{row.getValue("Staff")}</span>
        </div>
      ),
    },
    {
      accessorKey: "Department",
      header: ({ column }) => (
        <Button variant="ghost" >
          Department 
        </Button>
      ),
      cell: ({ row }) => row.getValue("Department"),
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
      accessorKey: "Reporting",
      header: ({ column }) => (
        <Button variant="ghost" >
          Reporting To
        </Button>
      ),
      cell: ({ row }) => row.getValue("Reporting"),
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
    {
      accessorKey: "DOJ",
      header: ({ column }) => (
        <Button variant="ghost" >
          Date of join  
        </Button>
      ),
      cell: ({ row }) => row.getValue("DOJ"),
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
            <DropdownMenuItem onClick={() => handleStaffEditClick(row.original)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const [selectedStaffStatus, setSelectedStaffStatus] = useState<"Active" | "InActive">("Active");

  const handleStaffEditClick = (classItem: Staff) => {
   
    setSelectedStaffStatus(classItem.status);
    setStaffDialogOpen(true);
  };
 
  const classTable = useReactTable({
    data: staffTableData,
    columns: StaffColumns,
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
                    <CardTitle className="text-2xl font-bold">Staffs List</CardTitle>
                  <CardDescription>
                    Manage staff data here.
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
                {/* <div className="">
 
<Button onClick={() => setIsStaffSheetOpen(true)}>Add Staff</Button>
                </div> */}
              
              </div>
            </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffTableData.map((staff, index) => (
            <Card
              key={staff.id}
              data-aos="zoom-in"
              data-aos-duration={`${300 + index * 300}`}
              className="p-4 shadow-md"
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-500">{staff.id}</span>
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
                          handleStaffEditClick(staff);
                          setStaffDialogOpen(true);
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
                    <AvatarImage src={staff.avatar} alt={staff.Staff} />
                  </Avatar>
                  <div className="flex flex-col mt-2">
                    <p className="text-lg font-semibold">{staff.Staff}</p>
                    <p className="text-sm text-gray-500">{staff.Department}</p>
                  </div>
                </div>

                <p className="text-sm mt-2 text-gray-600">
                  <strong>Email:</strong> {staff.Email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {staff.Phone}
                </p>
              </CardContent>
              <CardFooter className="mt-3 flex justify-between items-center">
                <Badge className="px-2 py-1 text-xs font-medium">{staff.status}</Badge>
                <Button variant="outline" size="sm">
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
                <div className="flex   ">
                    <div className="w-48">
                    <CardTitle className="text-2xl font-bold">Staffs List</CardTitle>
                  <CardDescription>
                    Manage staff data here.
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
                      <TableCell colSpan={StaffColumns.length} className="h-24 text-center">
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

{/* Dialog for editing a staff */}
<Dialog open={isStaffDialogOpen} onOpenChange={setStaffDialogOpen}>
  <DialogContent className="sm:max-w-[825px]">
    <DialogHeader>
      <DialogTitle>Edit Staff</DialogTitle>
      <DialogDescription>
        Make changes to the Staff details here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-6 py-4">
      {/* Left Column */}
      <div className="space-y-4">
   
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="staffName" className="text-left">Staff</Label>
          <Input id="staffName" placeholder="Staff name" className="col-span-3" />
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
          <Label htmlFor="parentName" className="text-left">Reporting</Label>
          <Input id="parentName" placeholder="Reporting name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="status" className="text-left">Status</Label>
          <Select onValueChange={(value) => setSelectedStaffStatus(value as "Active" | "InActive")}>
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

      {/* Right Column */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="classDropdown" className="text-left">Department</Label>
          <Select onValueChange={(value) => setSelectedClass(value)} value={selectedClass}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select Department" />
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
          <Label htmlFor="parentContact" className="text-left">Reporting</Label>
          <Input id="parentContact" placeholder="Reporting" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="phone" className="text-left">Phone</Label>
          <Input id="phone" placeholder="Phone" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="email" className="text-left">Email</Label>
          <Input id="email" placeholder="Email" className="col-span-3" />
        </div>
  
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" onClick={() => setStaffDialogOpen(false)}>
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


    
    </div>
  );
}
