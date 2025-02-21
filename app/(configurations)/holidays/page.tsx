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
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical, Download } from "lucide-react";
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

export type Holidays = {
  holiday_id: string;
  holiday_name: string;
  holiday_date: string;
  status: boolean;
};

export default function Holidays() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [holidays, setHolidays] = useState<Holidays[]>([
    { holiday_id: "1", holiday_name: "New Year", holiday_date: "01-01-2025", status: true },
    { holiday_id: "2", holiday_name: "Bhogi", holiday_date: "13-01-2025", status: true },
    { holiday_id: "3", holiday_name: "Sankranthi", holiday_date: "14-01-2025", status: false },
    { holiday_id: "4", holiday_name: "Republic Day", holiday_date: "26-01-2025", status: true },
  ]);

  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [selectedHoliday, setSelectedHoliday] = useState<Holidays | null>(null);

  const handleAddHoliday = () => {
    const newHoliday: Holidays = {
      holiday_id: String(holidays.length + 1),
      holiday_name: holidayName,
      holiday_date: holidayDate,
      status: true,
    };
    setHolidays([...holidays, newHoliday]);
    setHolidayName("");
    setHolidayDate("");
    setIsSheetOpen(false);
  };

  const handleEditHoliday = () => {
    if (selectedHoliday) {
      setHolidays((prev) =>
        prev.map((holiday) =>
          holiday.holiday_id === selectedHoliday.holiday_id
            ? { ...selectedHoliday }
            : holiday
        )
      );
      setIsDialogOpen(false);
    }
  };

  const handleEditClick = (holiday: Holidays) => {
    setSelectedHoliday(holiday);
    setHolidayName(holiday.holiday_name);
    setHolidayDate(holiday.holiday_date);
    setIsDialogOpen(true);
  };

  const columns: ColumnDef<Holidays>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "holiday_name",
      header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Holiday Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
      ),
      cell: ({ row }) => row.getValue("holiday_name"),
    },
    {
      accessorKey: "holiday_date",
      header: "Holiday Date",
      cell: ({ row }) => row.getValue("holiday_date"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status") ? "Active" : "Inactive"}</div>
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
            <DropdownMenuItem
              onClick={() => handleEditClick(row.original)}
              className="cursor-pointer"
            >
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
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="p-6">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by holiday"
            value={(table.getColumn("holiday_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("holiday_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-[#b6e1f3]"
          />

          <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
            <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
              <Download className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsSheetOpen(true)}
              className="w-32 hover:bg-opacity-90 flex items-center space-x-2"
            >
              <span>Add Holiday</span>
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-[#d5e2c5] text-black">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-[#f2f6ec]">
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Holiday Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a New Holiday</SheetTitle>
            <SheetDescription>Fill in the details below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="holiday_name">Holiday Name</Label>
            <Input
              id="holiday_name"
              placeholder="Enter holiday name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
            />
            <Label htmlFor="holiday_date">Holiday Date</Label>
            <Input
              id="holiday_date"
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
            />
          </div>
          <SheetFooter>
            <Button onClick={handleAddHoliday}>Add Holiday</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Holiday Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Holiday</DialogTitle>
            <DialogDescription>Update the holiday details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="edit_holiday_name">Holiday Name</Label>
            <Input
              id="edit_holiday_name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
            />
            <Label htmlFor="edit_holiday_date">Holiday Date</Label>
            <Input
              id="edit_holiday_date"
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditHoliday}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
