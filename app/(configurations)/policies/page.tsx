"use client";

import React, { useState } from 'react';
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
import { ArrowUpDown, MoreVertical , Download} from "lucide-react";
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define data type
export type Policy = {
  police_id: string;
  police_description: string;
  policy_document: string;
  status: boolean;
};

export default function Policy() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive">("Active");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Static data for policies
  const [policies, setPolicies] = useState<Policy[]>([
    { police_id: "1", police_description: "Employee Handbook", policy_document: "document1.pdf", status: true },
    { police_id: "2", police_description: "POSH", policy_document: "document2.pdf", status: false },
    { police_id: "3", police_description: "Company Policy", policy_document: "document3.pdf", status: true },
  ]);

  const handleEditClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setSelectedStatus(policy.status ? "Active" : "Inactive");
    setIsDialogOpen(true);
  };

  const columns: ColumnDef<Policy>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "police_description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Policy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("police_description"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status") ? "Inactive" : "Active"}</div>,
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
    data: policies,
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

  const handleEditSave = () => {
    if (!selectedPolicy) {
      alert("No policy selected for editing.");
      return;
    }

    const updatedPolicies = policies.map((policy) =>
      policy.police_id === selectedPolicy.police_id
        ? { ...policy, status: selectedStatus === "Inactive", police_description: selectedPolicy.police_description }
        : policy
    );
    setPolicies(updatedPolicies);
    setIsDialogOpen(false);
    setSelectedPolicy(null);
    setSelectedStatus("Active");
  };

  const handleAddPolicy = () => {
    if (!selectedPolicy?.police_description) {
      alert("Please provide a policy description.");
      return;
    }

    const newPolicy: Policy = {
      police_id: (policies.length + 1).toString(),
      police_description: selectedPolicy.police_description,
      policy_document: "new_document.pdf",
      status: false,
    };

    setPolicies((prevPolicies) => [...prevPolicies, newPolicy]);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="p-6">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by policy"
              value={(table.getColumn("police_description")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("police_description")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-[#c0b9cc]"
            />
            <DropdownMenu>
              <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
              <Download className="h-5 w-5" />
            </Button>
                <Button onClick={() => setIsSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                  <span>Add Policy</span>
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
                      <TableHead key={header.id} className="bg-[#f6dabd] text-black">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='bg-[#fcf3ea]'>
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

          <div className="flex items-center justify-end space-x-2 py-4">
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

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add a new policy</SheetTitle>
              <SheetDescription>Fill in the details for the new policy below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-left">Description</Label>
                <Input
                  id="holidayname"
                  placeholder="Enter Description"
                  value={selectedPolicy?.police_description || ""}
                  onChange={(e) => setSelectedPolicy({ ...selectedPolicy, police_description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleAddPolicy}>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Policy</DialogTitle>
              <DialogDescription>
                Make changes to the policy and status here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="policyDescription" className="text-left">Policy Description</Label>
                <Input
                  type="text"
                  id="policyDescription"
                  value={selectedPolicy?.police_description || ''}
                  onChange={(e) => setSelectedPolicy({ ...selectedPolicy, police_description: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">Status</Label>
                <Select onValueChange={(value) => setSelectedStatus(value as "Active" | "Inactive")}>
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
              <Button type="submit" onClick={handleEditSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
