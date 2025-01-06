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
import { ArrowUpDown, ChevronDown, Download, MoreVertical  } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle  } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axiosInstance from '@/lib/axiosInstance';

// Define data type
export type Policy = {
  police_id: string; // Added to handle the unique ID for editing
  police_description: string;
  policy_document: string;
  status: boolean;
};

// Main Component
export default function Policy() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive">("Active");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);

  // Function to handle Edit click in the dropdown menu
  const handleEditClick = (policy: Policy) => {
    setSelectedPolicy(policy); // Set the selected policy for editing
    setSelectedStatus(policy.status ? "Active" : "Inactive"); // Set the selected status
    setIsDialogOpen(true); // Open the dialog
  };

  // State for managing the table data
  const [tableData, setTableData] = useState<Policy[]>([]);

  // State for managing form input values in the sheet
  const [newPolicy, setNewPolicy] = useState("");
  const [newStatus, setNewStatus] = useState<"Active" | "InActive">("Active");
  const [policyFile, setPolicyFile] = useState<File | null>(null);

  // Column Definitions
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

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_policy/`);
        setPolicies(response.data.policies); // Set the fetched array into state
      } catch (error: any) {
        console.error("Error fetching policies:", error.response ? error.response.data : error.message);
      }
    };
    fetchPolicies();
  }, []);

  // Handler to save new policy data
  const handleEditSave = async () => {
    if (!selectedPolicy) {
      alert("No policy selected for editing.");
      return;
    }
  
    const formData = new FormData();
    formData.append("police_description", selectedPolicy.police_description);
  
    // Append the file if it's present
    if (policyFile) {
      formData.append("file", policyFile);
    } else {
      alert("Please select a policy file.");
      return;
    }
  
    // Invert the logic for is_active: Active = false, InActive = true
    formData.append("is_active", (selectedStatus === "Inactive" ? true : false).toString());
  
    try {
      await axiosInstance.put(`/update_policy/${selectedPolicy.police_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update local state
      setPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.police_id === selectedPolicy.police_id
            ? { ...policy, status: selectedStatus === "Inactive", policy_document: selectedPolicy.policy_document }
            : policy
        )
      );
      setIsDialogOpen(false); // Close the dialog
      setSelectedPolicy(null); // Clear selected policy
      setSelectedStatus("Active"); // Reset selected status
      setPolicyFile(null); // Clear file input
    } catch (error) {
      console.error("Error updating policy:", error);
      alert("Failed to update policy. Please try again.");
    }
  };
  


  const handleAddPolicy = async () => {
    if (!newPolicy || !policyFile) {
      alert("Please provide both a policy description and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("police_description", newPolicy);
    formData.append("file", policyFile);

    try {
      const response = await axiosInstance.post("/create_policy/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming response is successful, update the table data
      const newEntry: Policy = {
        police_id: response.data.policy_id, // Assuming this is returned from the API
        police_description: newPolicy,
        policy_document: response.data.policy_document, // Assuming this is returned from the API
        status: false, // Set to true or false based on your needs
      };

      setTableData((prevData) => [...prevData, newEntry]); // Add new entry to table data
      setIsSheetOpen(false); // Close the sheet
      setNewPolicy(""); // Clear the form input
      setNewStatus("Active");
      setPolicyFile(null); // Clear the file input
    } catch (error) {
      console.error("Error creating policy:", error);
      alert("Failed to create policy. Please try again.");
    }
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
              className="max-w-sm"
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
                {table && table.getRowModel() && table.getRowModel().rows.length > 0 ? (
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
              <SheetTitle>Add a new policy</SheetTitle>
              <SheetDescription>Fill in the details for the new policy below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-left">Description</Label>
                <Input
                  id="holidayname"
                  placeholder="Enter Description"
                  value={newPolicy}
                  onChange={(e) => setNewPolicy(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="policyFile" className="text-left">Policy File</Label>
                <Input
                  type="file"
                  id="policyFile"
                  onChange={(e) => setPolicyFile(e.target.files ? e.target.files[0] : null)}
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

        {/* Dialog for editing profile */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Policy</DialogTitle>
              <DialogDescription>
                Make changes to the policy and status here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Policy Description Input */}
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="policyDescription" className="text-left">Policy Description</Label>
                <Input
                  type="text"
                  id="policyDescription"
                  value={selectedPolicy?.police_description || ''}
                  onChange={(e) => setSelectedPolicy({
                    ...selectedPolicy!,
                    police_description: e.target.value,
                  })}
                  className="col-span-3"
                />
              </div>

              {/* Policy File Input */}
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="policyFile" className="text-left">Policy File</Label>
                <Input
                  type="file"
                  id="policyFile"
                  onChange={(e) => setPolicyFile(e.target.files ? e.target.files[0] : null)} // Handle file change
                  className="col-span-3"
                />
              </div>

              {/* Status Select */}
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
