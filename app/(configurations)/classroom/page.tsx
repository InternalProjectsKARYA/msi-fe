"use client";

import React, { useEffect, useState } from 'react';
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
import { ArrowUpDown, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
 
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle  } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

export type ClassType = {
  class_id: string;
  class_standards: string;
  section_name: string;
  status: boolean;
};



// Main Component
export default function Section() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "InActive">("Active");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState<any[]>([]); // Initialize as an array
  const [selectedSection, setSelectedSection] = useState(""); // New state for selected section

  const [newClass, setNewClass] = useState("");
  const [newStatus, setNewStatus] = useState<"Active" | "InActive">("Active");
  const [newSection, setNewSection] = useState("");


  const [classrooms, setClassRooms] = useState([]);
  // Function to handle Edit click in the dropdown menu
  const handleEditClick = (classItem: ClassType) => {
    setSelectedClass(classItem.class_standards);
    setSelectedSection(classItem.section_name); // Set the selected section
    setSelectedStatus(classItem.status ? "Active" : "InActive"); // Set the selected status
    setIsDialogOpen(true); // Open the dialog
  };

  // State for managing the table data
  const [tableData, setTableData] = useState<ClassType[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_class/`);
        setStandards(response.data.classes);  // Set the fetched array into state
      } catch (error: any) {
        console.error("Error fetching classes:", error.response ? error.response.data : error.message);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_section/`);
        if (Array.isArray(response.data.sections)) {
          setSections(response.data.sections);  // Correctly set to an array
        } else {
          console.error("Fetched sections is not an array:", response.data.sections);
          setSections([]); // Reset to an empty array if not an array
        }
      } catch (error: any) {
        console.error("Error fetching sections:", error.response ? error.response.data : error.message);
        setSections([]); // Reset to an empty array in case of error
      }
    };
    fetchSections();
  }, []);


  useEffect(() => {
    const fetchClassRooms = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_classrooms/`);
        setClassRooms(response.data.classrooms);  // Set the fetched array into state
      } catch (error: any) {
        console.error("Error fetching classrooms:", error.response ? error.response.data : error.message);
      }
    };
    fetchClassRooms();
  }, []);


  // Column Definitions
  const columns: ColumnDef<ClassType>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "class_standards",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("class_standards"),
    },
    {
      accessorKey: "section_name",  // Corrected to lowercase "section_name"
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Section
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("section_name"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status") ? "Inactive" : "Active"}</div>,
    },
    {
      id: "actions",
      header: "Status",
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
            <DropdownMenuItem onClick={() => handleEditClick(row.original)} className="cursor-pointer">
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  const table = useReactTable({
    data: classrooms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
     
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

  });


  const handleAddClassroom = async () => {
    const classroomData = {
      class_id: selectedClass,
      section_id: selectedSection,
    };

    try {
      const response = await axiosInstance.post("/create_classroom/", classroomData);
      toast({
        title: "Success!",
        description: response.data.message,
        variant: "default",
      });
      setTableData((prevData) => [
        ...prevData,
        {
          class_id: response.data.classroom_id, // Assuming your response includes this
          class_standards: selectedClass,
          section_name: selectedSection,
          status: newStatus === "Active", // Store as boolean
        },
      ]);
      setIsSheetOpen(false); // Close the sheet
      setNewClass(""); // Clear the form input
      setNewStatus("Active"); // Reset status
      setSelectedSection(""); // Reset section
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.response ? error.response.data.detail : "An error occurred",
        variant: "destructive",
      });
    }
  };

  // const handleSaveChanges = () => {
  //   const newEntry: ClassType = {
  //     class_id: selectedClass, // Replace with appropriate value if needed
  //     class_standards: newClass, // Set from the input
  //     section_name: newSection, // Ensure section is set from newSection
  //     status: newStatus === "Active", // Store as boolean
  //   };

  //   setTableData((prevData) => [...prevData, newEntry]);  // Add new entry to table data
  //   setIsSheetOpen(false);  // Close the sheet
  //   setNewClass("");  // Clear the form input
  //   setNewStatus("Active");  // Reset status
  // };



  return (

    <div className="p-6">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by class room"
            value={(table.getColumn("class_standards")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("class_standards")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>

            <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                <Download className="h-5 w-5" />
              </Button>

              <Button onClick={() => setIsSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">

                <span>Add classroom </span>
              </Button>
            </div>

            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Component */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new section</SheetTitle>
            <SheetDescription>Fill in the details for the new section below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="class" className="text-left">
                Class
              </Label>
              <Select onValueChange={(value) => setSelectedClass(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {standards && standards.map((item: any) => (
                      <SelectItem key={item.class_id} value={item.class_id}>
                        {item.class_standards}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="section" className="text-left">
                Section
              </Label>
              <Select onValueChange={(value) => setSelectedSection(value)}> {/* Updated to set selectedSection */}
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Section</SelectLabel>
                    {Array.isArray(sections) && sections.map((item: any) => (
                      <SelectItem key={item.section_id} value={item.section_id}>
                        {item.section_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleAddClassroom}>Add Classroom</Button>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div>

        {/* Dialog for editing profile */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Class Room</DialogTitle>
              <DialogDescription>
                Make changes to the Class Room and status here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="section" className="text-left">
                  section
                </Label>
                <Input
                  id="section"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">
                  Class
                </Label>
                <Select onValueChange={(value) => setSelectedStatus(value as "Active" | "InActive")}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Class</SelectLabel>
                      <SelectItem value="1st Standard">1st Standard</SelectItem>
                      <SelectItem value="2nd Standard">2nd Standard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">
                  Status
                </Label>
                <Select onValueChange={(value) => setSelectedStatus(value as "Active" | "InActive")}>
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
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
