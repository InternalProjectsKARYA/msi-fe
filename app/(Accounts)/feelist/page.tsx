"use client";

import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {   MoreVertical } from "lucide-react";
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
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from "next/navigation";
import axiosInstance from '@/lib/axiosInstance';
export type Fee = {
  adminNo: string;
  rollNo: string;
  studentName: string;
  classRoom: string;
  section: string;
  amount: number;
  due: number;
  lastDate: string;
  status: "Paid" | "Unpaid";
};

/* ------------------ Main Component ------------------ */
const FeeDetails = () => {
  /* ------------- State for Fee Data ------------- */
  const [feeData, setFeeData] = useState<Fee[]>([
    {
      adminNo: "ADM001",
      rollNo: "RL001",
      studentName: "Arjun Singh",
      classRoom: "10A",
      section: "A",
      amount: 5000,
      due: 1000,
      lastDate: "2024-07-15",
      status: "Unpaid",
    },
    {
      adminNo: "ADM002",
      rollNo: "RL002",
      studentName: "Diya Sharma",
      classRoom: "10B",
      section: "B",
      amount: 3000,
      due: 0,
      lastDate: "2024-07-20",
      status: "Paid",
    },
    {
      adminNo: "ADM003",
      rollNo: "RL003",
      studentName: "Rahul Verma",
      classRoom: "9C",
      section: "C",
      amount: 4000,
      due: 2000,
      lastDate: "2024-07-25",
      status: "Unpaid",
    },
    {
      adminNo: "ADM004",
      rollNo: "RL004",
      studentName: "Sneha Kapoor",
      classRoom: "8A",
      section: "A",
      amount: 2800,
      due: 0,
      lastDate: "2024-07-10",
      status: "Paid",
    },
    {
      adminNo: "ADM005",
      rollNo: "RL005",
      studentName: "Vikram Das",
      classRoom: "11B",
      section: "B",
      amount: 6000,
      due: 6000,
      lastDate: "2024-08-01",
      status: "Unpaid",
    },
    {
      adminNo: "ADM006",
      rollNo: "RL006",
      studentName: "Priya Gupta",
      classRoom: "12A",
      section: "A",
      amount: 7500,
      due: 500,
      lastDate: "2024-07-30",
      status: "Unpaid",
    },
    {
      adminNo: "ADM007",
      rollNo: "RL007",
      studentName: "Rohan Malhotra",
      classRoom: "12B",
      section: "B",
      amount: 8200,
      due: 0,
      lastDate: "2024-07-22",
      status: "Paid",
    },
    {
      adminNo: "ADM008",
      rollNo: "RL008",
      studentName: "Sara Khan",
      classRoom: "9A",
      section: "A",
      amount: 4500,
      due: 4500,
      lastDate: "2024-08-05",
      status: "Unpaid",
    },
    {
      adminNo: "ADM009",
      rollNo: "RL009",
      studentName: "Kunal Roy",
      classRoom: "10C",
      section: "C",
      amount: 3800,
      due: 800,
      lastDate: "2024-07-18",
      status: "Unpaid",
    },
    {
      adminNo: "ADM010",
      rollNo: "RL010",
      studentName: "Esha Mehta",
      classRoom: "11A",
      section: "A",
      amount: 5600,
      due: 5600,
      lastDate: "2024-07-25",
      status: "Unpaid",
    },
  ]);

  /* ------------- States for Table Behavior ------------- */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  /* ------------- States for Fee Editing ------------- */
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [editedFee, setEditedFee] = useState<Fee | null>(null);

  /* ------------- States for Dialog Modals ------------- */
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);
  const [isPayFeeDialogOpen, setIsPayFeeDialogOpen] = useState(false);

  /* ------------- Next.js Router ------------- */
  const router = useRouter();

  /* ------------- Handler: Input Changes on Edit Fee ------------- */
  const handleInputChange = (field: keyof Fee, value: string | number) => {
    setEditedFee((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  /* ------------- Handler: Navigate to Detailed Student Fee Page ------------- */
  const handleStudentClick = (adminNo: string) => {
    router.push(`/studentFee/${adminNo}`);
  };

  /* ------------- Column Definitions ------------- */
  const columns: ColumnDef<Fee>[] = [
    {
      accessorKey: "adminNo",
      header: "Admin No",
   
    },
    {
      accessorKey: "rollNo",
      header: "Roll No",
    
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
    
    },
    {
      accessorKey: "classRoom",
      header: "Class room",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "due",
      header: "Due",
    },
    {
      accessorKey: "lastDate",
      header: "Last Date",
    },
    {
      accessorKey: "View",
      header: "View",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="p-2 text-xs"
          onClick={() => handleStudentClick(row.original.adminNo)}
        >
          View Details
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.status === "Unpaid" ? "Unpaid" : "Paid"}
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setSelectedFee(row.original);
                setEditedFee(row.original);
                setIsFeeDialogOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setSelectedFee(row.original);
                // Potentially set additional states if needed
                setIsPayFeeDialogOpen(true);
              }}
            >
              Pay Fee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  /* ------------- React Table Initialization ------------- */
  const table = useReactTable({
    data: feeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  /* ------------- Save Changes for Fee Editing ------------- */
  const handleSaveChanges = () => {
    if (editedFee) {
      setFeeData((prev) =>
        prev.map((fee) => (fee.adminNo === editedFee.adminNo ? editedFee : fee))
      );
      setIsFeeDialogOpen(false);
    }
  };

  /* ------------- Handler: Pay Fee ------------- */
  const handlePayFee = () => {
    // Payment logic goes here
    setIsPayFeeDialogOpen(false);
  };

  return (
    <>
    <div className="space-y-6">
  {/* Grid Layout for Search and Table */}
  <div className="grid grid-cols-1   gap-4">
    {/* Search Section */}
    <div className="col-span-12 lg:col-span-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by admin no..."
          value={(table.getColumn("adminNo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("adminNo")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
      </div>
    </div>

    {/* Table Section */}
    <div className="col-span-12 lg:col-span-8 space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-200 dark:bg-gray-800"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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

      {/* Pagination Section */}
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
</div>


      {/* Dialog: Edit Fee */}
      <Dialog open={isFeeDialogOpen} onOpenChange={setIsFeeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Fee Details</DialogTitle>
            <DialogDescription>Make changes to fee details here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Admin No (Disabled) */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="adminNo">Admin No</Label>
              <Input
                id="adminNo"
                value={editedFee?.adminNo || ""}
                onChange={(e) => handleInputChange("adminNo", e.target.value)}
                className="col-span-3"
                disabled
              />
            </div>

            {/* Roll No (Disabled) */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="rollNo">Roll No</Label>
              <Input
                id="rollNo"
                value={editedFee?.rollNo || ""}
                onChange={(e) => handleInputChange("rollNo", e.target.value)}
                className="col-span-3"
                disabled
              />
            </div>

            {/* Student Name */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={editedFee?.studentName || ""}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Class */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="classRoom">Class</Label>
              <Input
                id="classRoom"
                value={editedFee?.classRoom || ""}
                onChange={(e) => handleInputChange("classRoom", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Section */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                value={editedFee?.section || ""}
                onChange={(e) => handleInputChange("section", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Amount */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={editedFee?.amount || ""}
                onChange={(e) => handleInputChange("amount", Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            {/* Due */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="duefee">Due</Label>
              <Input
                id="duefee"
                type="number"
                value={editedFee?.due || ""}
                onChange={(e) => handleInputChange("due", Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            {/* Last Date */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="lastDate">Last Date</Label>
              <Input
                id="lastDate"
                type="date"
                value={editedFee?.lastDate || ""}
                onChange={(e) => handleInputChange("lastDate", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Status (Paid/Unpaid) */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editedFee?.status || ""}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Pay Fee */}
      <Dialog open={isPayFeeDialogOpen} onOpenChange={setIsPayFeeDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Pay Fee Details</DialogTitle>
            <DialogDescription>
              Provide payment information for the selected fee record.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="lg:w-1/2 space-y-4">
                <div className="grid grid-cols-4 items-center">
                  <Label>Admin No</Label>
                  <Input
                    value={selectedFee?.adminNo || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label>Student Name</Label>
                  <Input
                    value={selectedFee?.studentName || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label>Class</Label>
                  <Input
                    value={selectedFee?.classRoom || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label>Mode</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:w-1/2 space-y-4">
                <div className="grid grid-cols-4 items-center">
                  <Label>Roll No</Label>
                  <Input
                    value={selectedFee?.rollNo || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label>Amount</Label>
                  <Input
                    value={selectedFee?.amount || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label>Section</Label>
                  <Input
                    value={selectedFee?.section || ""}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="due">Due</Label>
                  <Input
                    id="due"
                    type="number"
                    value={selectedFee?.due || ""}
                    onChange={(e) => handleInputChange("due", Number(e.target.value))}
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={handlePayFee}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeeDetails;