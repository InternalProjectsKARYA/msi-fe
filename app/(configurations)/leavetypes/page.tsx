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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, ChevronDown, Download,   MoreVertical } from "lucide-react";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

// Define data type
export type LeaveTypes = {
  leave_id: string;
  leave_name: string;
  leave_max: number;
  status: boolean;
};

// Main Component
export default function LeaveTypeSettings() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [leaves, setLeaves] = useState<LeaveTypes[]>([]);
  const [leaveName, setLeaveName] = useState('');
  const [leaveMax, setLeaveMax] = useState<number>(0);  // Default to 0
  const { toast } = useToast();
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveTypes | null>(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_leaves/`);
        setLeaves(response.data.leaves);  // Set the fetched array into state
      } catch (error: any) {
        console.error(
          "Error fetching leaves:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchLeaves();
  }, []);

  const handleEditClick = (leave: LeaveTypes) => {
    setSelectedLeave(leave);
    setIsLeaveDialogOpen(true); // Open the dialog
  };

  const columns: ColumnDef<LeaveTypes>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "leave_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Leave Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("leave_name"),
    },
    {
      accessorKey: "leave_max",
      header: ({ column }) => (
        <Button variant="ghost">
          Leave Max
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("leave_max"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("status") ? "Inactive" : "Active"}
        </div>
      ),
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
            <DropdownMenuItem onClick={() => handleEditClick(row.original)} className="cursor-pointer">
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: leaves,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  const handleEditLeaveType = async () => {
    if (selectedLeave) {
      const leaveMaxInt = Number(selectedLeave.leave_max);  // Ensure number type
      if (isNaN(leaveMaxInt) || leaveMaxInt < 0) {
        toast({
          title: 'Error',
          description: 'Leave Max should be a non-negative integer.',
          variant: 'destructive',
        });
        return;
      }

      try {
        const updatedLeaveTypeData = {
          leave_name: selectedLeave.leave_name,
          leave_max: leaveMaxInt,  // Send as number
          status: selectedLeave.status,
        };

        const response = await axiosInstance.put(`/update_leaves/?leave_id=${selectedLeave.leave_id}`, updatedLeaveTypeData);

        if (response.status === 200) {
          setLeaves((prevLeaveTypes) =>
            prevLeaveTypes.map((leave) =>
              leave.leave_id === selectedLeave.leave_id
                ? { ...leave, ...updatedLeaveTypeData }
                : leave
            )
          );

          toast({
            title: 'Success',
            description: 'Leave Type updated successfully.',
            variant: 'default',
          });
          setIsLeaveDialogOpen(false);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while updating the leave.',
          variant: 'destructive',
        });
        console.error(error);
      }
    }
  };


  const handleLeave = async () => {
    if (isNaN(leaveMax) || leaveMax < 0) {
      toast({
        title: 'Error',
        description: 'Leave Max cannot be negative or non-integer.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axiosInstance.post('/create_leaves/', {
        leave_name: leaveName,
        leave_max: leaveMax,  // Send as number
      });

      if (response.status === 200) {
        const newLeave: LeaveTypes = {
          leave_id: response.data.leave_id,
          leave_name: leaveName,
          leave_max: leaveMax,  // Ensure number is passed
          status: false, // Initially inactive (false)
        };

        setLeaves((prevLeaves) => [...prevLeaves, newLeave]);

        toast({
          title: 'Success',
          description: 'Leave created successfully.',
          variant: 'default',
        });

        setIsSheetOpen(false);
        setLeaveName('');
        setLeaveMax(0);  // Reset to number
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + (error.message || 'Unknown error.'),
        variant: 'destructive',
      });
    }
  };


  return (
   
      <div className="p-6">
        {/* Button aligned to the right above the table */}
        <div className="flex justify-end space-x-4 mb-4">
          {/* Download Button with Icon Only */}
          <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
            <Download className="h-5 w-5" />
          </Button>

          {/* Add Class Button with Icon */}
          <Button onClick={() => setIsSheetOpen(true)} className=" hover:bg-opacity-90 flex items-center space-x-2">

            <span>Add Leave Type</span>
          </Button>
        </div>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by Leave"
              value={(table.getColumn("leave_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("leave_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
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
                      <TableHead key={header.id} className='bg-gray-200 text-black    '>
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
          </div>
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
        {/* Sheet Component */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Leave Settings</SheetTitle>
              <SheetDescription>Fill in the details for the new Leave Settings.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leavetype" className="text-left">Leave Type</Label>
                <Input id="leavetype" placeholder="Enter Leave name" value={leaveName}
                  onChange={(e) => setLeaveName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leavemax" className="text-left">Leave Max</Label>
                <Input
                  id="leavemax"
                  type="number"
                  min="0"  // Prevents the user from typing a negative number
                  placeholder="Enter leave max"
                  value={leaveMax || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {  // Ensure that only non-negative values are set
                      setLeaveMax(value);
                    }
                  }}
                  className="col-span-3"
                />


              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleLeave}>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Leave Type</DialogTitle>
              <DialogDescription>
                Make changes to the leave details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center ">
                <Label htmlFor="editLeave" className="text-left">Leave Name</Label>
                <Input
                  id="editPermission"
                  value={selectedLeave?.leave_name || ''}
                  onChange={(e) => setSelectedLeave(prev => ({ ...prev!, leave_name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="editLeaveMax" className="text-left">Leave Max</Label>
                <Input
                  id="editLeaveMax"
                  type="number"
                  min="0"
                  placeholder="Enter leave max"
                  value={selectedLeave?.leave_max || ''}  // Use empty string if null
                  onChange={(e) =>
                    setSelectedLeave(prev => ({
                      ...prev!,
                      leave_max: Number(e.target.value),  // Convert to number
                    }))
                  }
                  className="col-span-3"
                />
              </div>



              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="editStatus" className="text-left">Status</Label>
                <Select
                  value={selectedLeave?.status ? "Inactive" : "Active"}
                  onValueChange={(value) => setSelectedLeave(prev => ({
                    ...prev!,
                    status: value === "Inactive" // When "Inactive" is selected, set status to true
                  }))}
                >
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
              <Button type="submit" onClick={handleEditLeaveType}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    
  );
}
