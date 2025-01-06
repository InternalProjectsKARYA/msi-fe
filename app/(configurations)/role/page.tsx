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
import { ArrowUpDown, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
 
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
export type Roles = {
  role_id: string;
  role_name: string;
  role_status: boolean;
};

// Main Component
export default function Role() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Roles[]>([]);
  const [roleName, setRoleName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_roles/`);
        setRoles(response.data.roles);
      } catch (error: any) {
        console.error("Error fetching roles:", error.response ? error.response.data : error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleEditClick = (role: Roles) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleEditRole = async () => {
    if (selectedRole) {
      try {
        // Create the data object to send to the backend
        const updatedRoleData = {
          role_name: selectedRole.role_name,
          role_status: selectedRole.role_status,
        };

        // Send PUT request to update role
        const response = await axiosInstance.put(`/update_role/?role_id=${selectedRole.role_id}`,
          updatedRoleData,
        );

        if (response.status === 200) {
          // Update role in state
          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role.role_id === selectedRole.role_id
                ? { ...role, ...updatedRoleData }
                : role
            )
          );

          toast({
            title: 'Success',
            description: 'Role updated successfully.',
            variant: 'default',
          });
          setIsDialogOpen(false); // Close the dialog
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while updating the role.',
          variant: 'destructive',
        });
        console.error(error);
      }
    }
  };


  const columns: ColumnDef<Roles>[] = [
    {
      id: "sno",
      header: "S.NO",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "role_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("role_name"),
    },
    {
      accessorKey: "role_status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("role_status") ? "Inactive" : "Active"}
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
    data: roles,
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

  const handleRole = async () => {
    try {
      const response = await axiosInstance.post('/create_role/', {
        role_name: roleName,
      });

      if (response.status === 200) {
        const newRole: Roles = {
          role_id: response.data.role_id,
          role_name: roleName,
          role_status: false,
        };

        setRoles((prevRoles) => [...prevRoles, newRole]); // Add new role to state

        toast({
          title: 'Success',
          description: 'Role created successfully.',
          variant: 'default',
        });

        setIsSheetOpen(false);
        setRoleName('');
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
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by role"
            value={(table.getColumn("role_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("role_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
            <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
              <Download className="h-5 w-5" />
            </Button>
            <Button onClick={() => setIsSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
              <span>Add role</span>
            </Button>
          </div>
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
            <SheetTitle>Add a new role</SheetTitle>
            <SheetDescription>Fill in the details for the new role below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="role" className="text-left">Role</Label>
              <Input
                id="role"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="col-span-3"
              />

            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleRole}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Dialog for editing profile */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit role</DialogTitle>
            <DialogDescription>
              Make changes to the role and status here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="editRole" className="text-left">Role</Label>
              <Input
                id="editRole"
                value={selectedRole?.role_name || ''}
                onChange={(e) => setSelectedRole(prev => ({ ...prev!, role_name: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="editStatus" className="text-left">Status</Label>
              <Select
                value={selectedRole?.role_status ? "Inactive" : "Active"} 
                onValueChange={(value) => setSelectedRole(prev => ({ ...prev!, role_status: value === "Inactive" }))} 
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
            <Button type="submit" onClick={handleEditRole}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>


  );
}
