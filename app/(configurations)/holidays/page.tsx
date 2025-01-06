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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";
 

// Define data type
export type Holidays = {
  holiday_id: string;
  holiday_name: string;
  holiday_date: string;
  status: boolean;
};

// Main Component
export default function Holidays() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidays, setHolidays] = useState<Holidays[]>([]);
  const { toast } = useToast();

  const [selectedHoliday, setSelectedHoliday] = useState<Holidays | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_holidays/`);
        setHolidays(response.data.holidays);  // Set the fetched array into state
      } catch (error: any) {
        console.error("Error fetching holidays:", error.response ? error.response.data : error.message);
      }
    };
    fetchHolidays();
  }, []);


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;

    // Convert from yyyy-mm-dd to dd/mm/yyyy
    const formattedDate = inputDate.split('-').reverse().join('/');
    setHolidayDate(formattedDate);
  };



  const handleEditDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;

    // No need to reformat the date for the input field. It will handle yyyy-mm-dd format.
    setHolidayDate(inputDate);  // Keep the format as yyyy-mm-dd for the input
  };

  const columns: ColumnDef<Holidays>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "holiday_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Holiday Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("holiday_name"),
    },
    {
      accessorKey: "holiday_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Holiday Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("holiday_date"),
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
    data: holidays,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  const handleSaveHoliday = async () => {
    if (holidayName && holidayDate) {
      try {
        const newHoliday: Holidays = {

          holiday_name: holidayName,
          holiday_date: holidayDate,
          status: false, // Default to active
        };

        const response = await axiosInstance.post('/create_holidays/', newHoliday);
        if (response.status === 200) {
          setHolidays((prev) => [...prev, newHoliday]);
          toast({
            title: 'Success',
            description: 'Holiday created successfully.',
            variant: 'default',
          });
          setIsSheetOpen(false);
          setHolidayName('');
          setHolidayDate('');
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + (error.message || 'Unknown error.'),
          variant: 'destructive',
        });
      }
    }
  };

  const handleEditClick = (holiday: Holidays) => {
    setSelectedHoliday(holiday);
    setHolidayName(holiday.holiday_name);
    setHolidayDate(holiday.holiday_date);
    setIsDialogOpen(true); // Open the dialog
  };

  // Corrected handleSaveChanges function
  const handleSaveChanges = async () => {
    if (!selectedHoliday || !selectedHoliday.holiday_id) {
      toast({
        title: 'Error',
        description: 'Holiday ID is missing. Cannot update holiday.',
        variant: 'destructive',
      });
      return;  // Prevent further execution if holiday_id is missing
    }

    const updatedHoliday = {
      holiday_name: holidayName,
      holiday_date: holidayDate.split('/').reverse().join('-'),  // Make sure this is in yyyy-mm-dd format
      status: holidayName.toLowerCase() === "active", // Adjust logic based on your status options
      holiday_id: selectedHoliday.holiday_id,  // Ensure holiday_id is passed
    };

    try {
      const response = await axiosInstance.put(`/update_holidays/?holiday_id=${selectedHoliday.holiday_id}`, updatedHoliday);

      if (response.status === 200) {
        setHolidays((prev) =>
          prev.map((hol) => (hol.holiday_id === updatedHoliday.holiday_id ? { ...hol, ...updatedHoliday } : hol))
        );
        toast({
          title: 'Success',
          description: 'Holiday updated successfully.',
          variant: 'default',
        });
        setIsDialogOpen(false);
        setSelectedHoliday(null);
        setHolidayName('');
        setHolidayDate('');
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
    <>
      <div className="p-6">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by holiday"
              value={(table.getColumn("holiday_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("holiday_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
                <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                  <Download className="h-5 w-5" />
                </Button>
                <Button onClick={() => setIsSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                  <span>Add Holidays</span>
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
                      <TableHead key={header.id} className='bg-gray-200 text-black'>
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
              <SheetTitle>Add a new holiday</SheetTitle>
              <SheetDescription>Fill in the details for the new holiday below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="holidayname" className="text-left">Holiday Name</Label>
                <Input id="holidayname" placeholder="Enter Holiday name"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="holidaydate" className="text-left">Holiday Date</Label>
                <Input
                  type="date"
                  id="holidaydate"
                  value={holidayDate}
                  onChange={handleDateChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSaveHoliday}>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Dialog for editing holiday */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Holiday</DialogTitle>
              <DialogDescription>
                Make changes to the holiday details below and click save to update.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="holiday_name" className="text-left">Holiday Name</Label>
                <Input
                  id="holiday_name"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="holiday_date" className="text-left">Holiday Date</Label>
                <Input
                  type="date"
                  id="holiday_date"
                  value={holidayDate}
                  onChange={handleEditDateChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">Status</Label>
                <Select
                  value={selectedHoliday?.status ? "Active" : "Inactive"}
                  onValueChange={(value) => {
                    setSelectedHoliday({
                      ...selectedHoliday!,
                      status: value === "Active", // Toggle the status based on the selection
                    });
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Status" />
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
              <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </>
  );
}
