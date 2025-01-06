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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from "next/navigation";
import axiosInstance from '@/lib/axiosInstance';

// Define data type
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

const FeeDetails = () => {
  const [Fee, setFee] = useState<Fee[]>([]);
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);
  const [isPayFeeDialogOpen, setIsPayFeeDialogOpen] = useState(false);
  const [editedFee, setEditedFee] = useState<Fee | null>(selectedFee);

  const fetchFeeData = async () => {
    try {
      const response = await axiosInstance.get('/get_all_student_fee_details/');
      const fetchedFees = response.data.student_fees.map((fee: any) => ({
        adminNo: fee.admission_id,
        rollNo: fee.roll_id,
        studentName: fee.user_name,
        classRoom: fee.class_name,
        section: fee.section,  // Assuming section is present in the API response
        amount: fee.student_total_fee,
        due: fee.student_due_amount,
        lastDate: fee.studentfee_tstamp,  // Assuming the timestamp is being returned as the last date
        status: fee.studentfee_status,
      }));
      setFee(fetchedFees);
    } catch (error) {
      console.error("Error fetching student fee data", error);
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, []);

  const router = useRouter();

  const handleInputChange = (field: keyof Fee, value: string | number) => {
    setEditedFee(prev => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleStudentClick = (adminNo: string) => {
    router.push(`/studentFee/${adminNo}`); // Fixed path string
  };

  // Column Definitions
  const columns: ColumnDef<Fee>[] = [
    {
      accessorKey: "adminNo",
      header: "Admin No",
      cell: ({ row }) => (
        <Button variant="link">
          {row.original.adminNo}
        </Button>
      ),
    },

    {
      accessorKey: "rollNo",
      header: "Roll No",
      cell: ({ row }) => (
        <Button variant="link">
          {row.original.rollNo}
        </Button>
      ),
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
      cell: ({ row }) => (
        <Button variant="link">
          {row.original.studentName}
        </Button>
      ),
    },
    { accessorKey: "classRoom", header: "Class room" },

    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "due", header: "Due" },
    { accessorKey: "lastDate", header: "Last Date" },
    {
      accessorKey: "View",
      header: "View",
      cell: ({ row }) => (
        <Button variant="outline" className='p-2 text-xs' onClick={() => handleStudentClick(row.original.adminNo)}>
          View Details
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("status") === "Unpaid" ? "Unpaid" : "Paid"}
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
            <DropdownMenuItem   className="cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem   className="cursor-pointer">
              Pay Fee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  const table = useReactTable({
    data: Fee,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSaveChanges = () => {
    if (selectedFee) {
      const updatedFee: Fee = { ...selectedFee };
      setFee((prevData) => prevData.map((fee) => (fee.adminNo === updatedFee.adminNo ? updatedFee : fee)));
      setIsFeeDialogOpen(false);
    }
  };

  // const [paymentDue, setPaymentDue] = useState<string>(selectedFee?.due.toString() || '');
  // const [paymentAmount, setPaymentAmount] = useState<string>(selectedFee?.due.toString() || '');
  // const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]); 

  const handlePayFee = () => {
    setIsPayFeeDialogOpen(false);
  };

  return (
    <>
      <div className="p-6">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by admin no..."
              value={(table.getColumn("adminNo")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("adminNo")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
               
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
                      <TableHead key={header.id} className="bg-gray-200 dark:bg-gray-800">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

        <Dialog open={isFeeDialogOpen} onOpenChange={setIsFeeDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Fee Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="adminNo">Admin No</Label>
                <Input
                  id="adminNo"
                  value={editedFee?.adminNo || ''}
                  onChange={(e) => handleInputChange("adminNo", e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="rollNo">Roll No</Label>
                <Input
                  id="rollNo"
                  value={editedFee?.rollNo || ''}
                  onChange={(e) => handleInputChange("rollNo", e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={editedFee?.studentName || ''}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="classRoom">Class</Label>
                <Input
                  id="classRoom"
                  value={editedFee?.classRoom || ''}
                  onChange={(e) => handleInputChange("classRoom", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={editedFee?.section || ''}
                  onChange={(e) => handleInputChange("section", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={editedFee?.amount || ''}
                  onChange={(e) => handleInputChange("amount", Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="duefee">Due</Label>
                <Input
                  id="duefee"
                  type="number"
                  value={editedFee?.due || ''}
                  onChange={(e) => handleInputChange("due", Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="lastDate">Last Date</Label>
                <Input
                  id="lastDate"
                  type="date"
                  value={editedFee?.lastDate || ''}
                  onChange={(e) => handleInputChange("lastDate", e.target.value)}
                  className="col-span-3"
                />
              </div>
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

        {/* Dialog for paying Fee */}
        <Dialog open={isPayFeeDialogOpen} onOpenChange={setIsPayFeeDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Pay Fee Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-row gap-8">
                {/* Left Column */}
                <div className="w-1/2 space-y-4">
                  <div className="grid grid-cols-4 items-center">
                    <Label>Admin No</Label>
                    <Input
                      value={selectedFee?.adminNo || ''}
                      readOnly
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label>Student Name</Label>
                    <Input
                      value={selectedFee?.studentName || ''}
                      readOnly
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label>Class</Label>
                    <Input
                      value={selectedFee?.classRoom || ''}
                      readOnly
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label>Mode</Label>
                    <Select
  
>
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
                <div className="w-1/2 space-y-4">
                  <div className="grid grid-cols-4 items-center">
                    <Label>Roll No</Label>
                    <Input
                      value={selectedFee?.rollNo || ''}
                      readOnly
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label>Amount</Label>
                    <Input
                      value={selectedFee?.amount || ''}
                      readOnly
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label>Section</Label>
                    <Input
                      value={selectedFee?.section || ''}
                      readOnly
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="due">Due</Label>
                    <Input
                      id="due"
                      type="number"
                      value={selectedFee?.due || ''}
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
      </div>
    </>
  );
};

export default FeeDetails;











