"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ClassType = {
  class_id: string;
  class_standards: string;
  section_name: string;
  status: boolean;
};

// Static Data
const staticStandards = [
  { class_id: "1", class_standards: "1st Standard" },
  { class_id: "2", class_standards: "2nd Standard" },
];

const staticSections = [
  { section_id: "1", section_name: "A" },
  { section_id: "2", section_name: "B" },
];

const staticClassrooms: ClassType[] = [
  { class_id: "1", class_standards: "1st Standard", section_name: "A", status: true },
  { class_id: "2", class_standards: "2nd Standard", section_name: "B", status: false },
];

// Main Component
export default function Section() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [newStatus, setNewStatus] = useState<"Active" | "InActive">("Active");

  const [tableData, setTableData] = useState<ClassType[]>(staticClassrooms);

  // Handle Add Classroom
  const handleAddClassroom = () => {
    const newClassroom: ClassType = {
      class_id: selectedClass,
      class_standards: staticStandards.find((item) => item.class_id === selectedClass)?.class_standards || "",
      section_name: staticSections.find((item) => item.section_id === selectedSection)?.section_name || "",
      status: newStatus === "Active",
    };
    setTableData((prev) => [...prev, newClassroom]);
    setIsSheetOpen(false);
    setSelectedClass("");
    setSelectedSection("");
    setNewStatus("Active");
  };

  const columns: ColumnDef<ClassType>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
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
      accessorKey: "section_name",
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
      cell: ({ row }) => <div className="capitalize">{row.getValue("status") ? "Active" : "Inactive"}</div>,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
  });

  return (
    <div className="p-6">
      <div className="flex items-center py-4">

        <Input
          placeholder="Filter by class room"
          value={(table.getColumn("class_standards")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("class_standards")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
          <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
            <Download className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="w-32 hover:bg-opacity-90 flex items-center space-x-2"
          >
            <span> Add Classroom</span>
          </Button>
        </div>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-200 text-black" >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
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
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new section</SheetTitle>
            <SheetDescription>Fill in the details for the new section below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="class" className="text-left">
                Class
              </Label>
              <Select onValueChange={setSelectedClass}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {staticStandards.map((item) => (
                      <SelectItem key={item.class_id} value={item.class_id}>
                        {item.class_standards}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="section" className="text-left">
                Section
              </Label>
              <Select onValueChange={setSelectedSection}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Section</SelectLabel>
                    {staticSections.map((item) => (
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
    </div>
  );
}
