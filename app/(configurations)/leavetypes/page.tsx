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
import { ArrowUpDown, ChevronDown, MoreVertical, Download } from "lucide-react";
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

export type LeaveTypes = {
  leave_id: string;
  leave_name: string;
  leave_max: number | "undefined";
  status: boolean;
};

export default function LeaveTypeSettings() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const [leaveName, setLeaveName] = useState("");
  const [leaveMax, setLeaveMax] = useState<number>(0);
  const [selectedLeave, setSelectedLeave] = useState<LeaveTypes | null>(null);

  const [leaves, setLeaves] = useState<LeaveTypes[]>([
    { leave_id: "1", leave_name: "Casual Leave", leave_max: 12, status: true },
    { leave_id: "2", leave_name: "Sick Leave", leave_max: 12, status: true },
    { leave_id: "3", leave_name: "Compensatory Off", leave_max: "undefined", status: false },
  ]);

  const handleAddLeave = () => {
    const newLeave: LeaveTypes = {
      leave_id: String(leaves.length + 1),
      leave_name: leaveName,
      leave_max: leaveMax,
      status: true,
    };
    setLeaves([...leaves, newLeave]);
    setLeaveName("");
    setLeaveMax(0);
    setIsSheetOpen(false);
  };

  const handleEditLeave = () => {
    if (selectedLeave) {
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leave_id === selectedLeave.leave_id ? selectedLeave : leave
        )
      );
      setIsLeaveDialogOpen(false);
    }
  };

  const handleEditClick = (leave: LeaveTypes) => {
    setSelectedLeave(leave);
    setIsLeaveDialogOpen(true);
  };

  const columns: ColumnDef<LeaveTypes>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "leave_name",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Leave Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("leave_name"),
    },
    {
      accessorKey: "leave_max",
      header: "Leave Max",
      cell: ({ row }) => row.getValue("leave_max"),
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
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditClick(row.original)}>
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
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="p-6">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by leave type"
            value={(table.getColumn("leave_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("leave_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-[#d5e2c5]"
          />


          <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
            <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
              <Download className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsSheetOpen(true)}
              className="w-32 hover:bg-opacity-90 flex items-center space-x-2"
            >
              <span>Add Leave Type</span>
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-[#f4b9bc] text-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-[#fbe9ea]">
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
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Leave Type</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Label>Leave Name</Label>
            <Input value={leaveName} onChange={(e) => setLeaveName(e.target.value)} />
            <Label>Leave Max</Label>
            <Input
              type="number"
              value={leaveMax}
              onChange={(e) => setLeaveMax(Number(e.target.value))}
            />
          </div>
          <SheetFooter>
            <Button onClick={handleAddLeave}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Leave Name</Label>
            <Input
              value={selectedLeave?.leave_name || ""}
              onChange={(e) =>
                setSelectedLeave((prev) => ({ ...prev!, leave_name: e.target.value }))
              }
            />
            <Label>Leave Max</Label>
            <Input
              type="number"
              value={selectedLeave?.leave_max || ""}
              onChange={(e) =>
                setSelectedLeave((prev) => ({
                  ...prev!,
                  leave_max: Number(e.target.value),
                }))
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditLeave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
