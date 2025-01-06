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
import { ArrowUpDown, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
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
  SheetClose,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

// Define data types
export type ClassType = {
  class_id: string;
  class_standards: string;
  status: boolean;
};

export type Section = {
  section_id: string;
  section_name: string;
  status: boolean;
};

// Main Component
export default function ClassAndSectionTables() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isClassSheetOpen, setIsClassSheetOpen] = useState(false);
  
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [isSectionSheetOpen, setIsSectionSheetOpen] = useState(false);

  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
const [editingSection, setEditingSection] = useState<Section | null>(null);

// Edit handlers
const handleEditClass = (classItem: ClassType) => {
  setEditingClass(classItem);
  setIsClassDialogOpen(true);
};

const handleEditSection = (sectionItem: Section) => {
  setEditingSection(sectionItem);
  setIsSectionDialogOpen(true);
};

// Reset state when dialogs are closed
const resetEditingState = () => {
  setEditingClass(null);
  setEditingSection(null);
};



  const [classTableData, setClassTableData] = useState<ClassType[]>([
    { class_id: "1", class_standards: "1st Grade", status: true },
    { class_id: "2", class_standards: "2nd Grade", status: false },
  ]);

  const [sectionTableData, setSectionTableData] = useState<Section[]>([
    { section_id: "A", section_name: "Shakthi", status: true },
    { section_id: "B", section_name: "Sahithi", status: false },
  ]);







  const classColumns: ColumnDef<ClassType>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "class_standards",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Class
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("class_standards"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (row.getValue("status") ? "Inactive" : "Active"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditClass(row.original)}>
            Edit
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const sectionColumns: ColumnDef<Section>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "section_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Section
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("section_name"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (row.getValue("status") ? "Inactive" : "Active"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditSection(row.original)}>
            Edit
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  const classTable = useReactTable({
    data: classTableData,
    columns: classColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  const sectionTable = useReactTable({
    data: sectionTableData,
    columns: sectionColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });



  return (
    <div className="p-6">
      {/* Class Table */}
      <div>
        <h2 className="text-xl font-semibold">Class Table</h2>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by class"
              value={(classTable.getColumn("class_standards")?.getFilterValue() as string) ?? ""}
              onChange={(e) => classTable.getColumn("class_standards")?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                <Download className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsClassSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                <span>Add Class</span>
              </Button>
            </div>
          </div>

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
                classTable.getRowModel().rows.map((row) => (
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
                  <TableCell colSpan={classColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Sheet open={isClassSheetOpen} onOpenChange={setIsClassSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add a new Class</SheetTitle>
              <SheetDescription>Fill in the details for the new class below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="class" className="text-left">Class</Label>
                <Input id="class" placeholder="Enter class name" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Section Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Section Table</h2>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by section"
              value={(sectionTable.getColumn("section_name")?.getFilterValue() as string) ?? ""}
              onChange={(e) => sectionTable.getColumn("section_name")?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                <Download className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsSectionSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                <span>Add Section</span>
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              {sectionTable.getHeaderGroups().map((headerGroup) => (
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
              {sectionTable.getRowModel().rows.length ? (
                sectionTable.getRowModel().rows.map((row) => (
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
                  <TableCell colSpan={sectionColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Sheet open={isSectionSheetOpen} onOpenChange={setIsSectionSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add a new Section</SheetTitle>
              <SheetDescription>Fill in the details for the new section below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="section" className="text-left">Section</Label>
                <Input id="section" placeholder="Enter section name"  className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Class Edit Dialog */}
      <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Make changes to the class and status here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="class" className="text-left">Class</Label>
              <Input
                id="class"
                
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-left">Status</Label>
              <Select >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Section Edit Dialog */}
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>
              Make changes to the section and status here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="section" className="text-left">Section</Label>
              <Input
                id="section"
              
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-left">Status</Label>
              <Select >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
