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
  DropdownMenuLabel,
  DropdownMenuItem,
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
export type Permissions = {
  permission_id: string;
  permission_name: string;
  permission_status: boolean;
};

// Main Component
export default function Section() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [permissions, setPermissions] = useState<Permissions[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permissions | null>(null);
  const [permissionName, setPermissionName] = useState('');
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_permissions/`);
        setPermissions(response.data.permissions);
      } catch (error: any) {
        console.error("Error fetching permissions:", error.response ? error.response.data : error.message);
      }
    };
    fetchPermissions();
  }, []);

  // Function to handle Edit click in the dropdown menu
  const handleEditClick = (permission: Permissions) => {
    setSelectedPermission(permission);
    setIsDialogOpen(true); // Open the dialog
  };

  // Column Definitions
  const columns: ColumnDef<Permissions>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "permission_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Permission
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("permission_name"),
    },
    {
      accessorKey: "permission_status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("permission_status") ? "Inactive" : "Active"}</div>
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
    data: permissions,
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


  const handlePermission = async () => {
    try {
      const response = await axiosInstance.post('/create_permission/', {
        permission_name: permissionName,
      });

      if (response.status === 200) {
        const newPermission: Permissions = {
          permission_id: response.data.permission_id, // Assuming the backend returns the created permission's ID
          permission_name: permissionName,
          permission_status: false, // Set default status or according to your logic
        };

        setPermissions((prevPermissions) => [...prevPermissions, newPermission]); // Add new permission to state

        toast({
          title: 'Success',
          description: 'Permission created successfully.',
          variant: 'default',
        });

        setIsSheetOpen(false); // Close the sheet after successful addition
        setPermissionName(''); // Clear input
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + (error.message || 'Unknown error.'),
        variant: 'destructive',
      });
    }
  };


  const handleEditPermission = async () => {
    if (selectedPermission) {
      try {
        // Create the data object to send to the backend
        const updatedPermissionData = {
          permission_name: selectedPermission.permission_name,
          permission_status: selectedPermission.permission_status,
        };

        // Send PUT request to update permission
        const response = await axiosInstance.put(`/update_permission/?permission_id=${selectedPermission.permission_id}`,
          updatedPermissionData,
        );

        if (response.status === 200) {
          // Update permission in state
          setPermissions((prevPermissions) =>
            prevPermissions.map((permission) =>
              permission.permission_id === selectedPermission.permission_id
                ? { ...permission, ...updatedPermissionData }
                : permission
            )
          );

          toast({
            title: 'Success',
            description: 'Permission updated successfully.',
            variant: 'default',
          });
          setIsDialogOpen(false); // Close the dialog
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while updating the permission.',
          variant: 'destructive',
        });
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by Permission"
              value={(table.getColumn("permission_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("permission_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
                <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                  <Download className="h-5 w-5" />
                </Button>
                <Button onClick={() => setIsSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                  <span>Add Permission</span>
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
              <SheetTitle>Add a new permission</SheetTitle>
              <SheetDescription>Fill in the details for the new permission below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">Permission Name</Label>
                <Input
                  id="name"
                  placeholder="Enter permission name"
                  value={permissionName}
                  onChange={(e) => setPermissionName(e.target.value)}
                  className="col-span-3"
                />
              </div>

            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handlePermission}>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Dialog for editing permission */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Permission</DialogTitle>
              <DialogDescription>
                Make changes to the permission details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center ">
                <Label htmlFor="editPermission" className="text-left">Permission Name</Label>
                <Input
                  id="editPermission"
                  value={selectedPermission?.permission_name || ''}
                  onChange={(e) => setSelectedPermission(prev => ({ ...prev!, permission_name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center ">
                <Label htmlFor="editStatus" className="text-left">Status</Label>
                <Select value={selectedPermission?.permission_status ? "Active" : "InActive"} onValueChange={(value) => setSelectedPermission(prev => ({ ...prev!, permission_status: value === "Active" } as Permissions))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="InActive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEditPermission}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
