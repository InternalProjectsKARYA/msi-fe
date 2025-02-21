"use client";

import React, { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export type Publishers = {
  publisher_id: string;
  publisher_name: string;
  status: boolean;
};

// Main Component
export default function Publisher() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isPublisherDialogOpen, setPublisherDialogOpen] = useState(false);
  const [publishers, setPublishers] = useState<Publishers[]>([
    { publisher_id: "PUB001", publisher_name: "Pearson Education", status: true },
    { publisher_id: "PUB002", publisher_name: "McGraw Hill", status: false },
    { publisher_id: "PUB003", publisher_name: "Scholastic", status: true },
    { publisher_id: "PUB004", publisher_name: "Penguin Random House", status: true },
    { publisher_id: "PUB005", publisher_name: "Hachette Livre", status: false },
    { publisher_id: "PUB006", publisher_name: "HarperCollins", status: true },
    { publisher_id: "PUB007", publisher_name: "Simon & Schuster", status: false },
    { publisher_id: "PUB008", publisher_name: "Macmillan Publishers", status: true },
    { publisher_id: "PUB009", publisher_name: "Oxford University Press", status: true },
    { publisher_id: "PUB010", publisher_name: "Wiley", status: false },
  ]);
  const [publisherName, setPublisherName] = useState('');
  const { toast } = useToast();
  const [isPublisherSheetOpen, setIsPublisherSheetOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState<Publishers | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive">("Active");

  const handlePublisher = async () => {
    setIsPublisherSheetOpen(false);
  };

  const handlePublisherEditClick = (publisher: Publishers) => {
    setSelectedPublisher(publisher);
    setSelectedStatus(publisher.status ? "Inactive" : "Active");
    setPublisherDialogOpen(true);
  };

  const updatePublisher = async (publisherId: string) => {
    setPublisherDialogOpen(false);
  };

  const classColumns: ColumnDef<Publishers>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "publisher_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Publisher <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("publisher_name"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status") ? "Inactive" : "Active"}</div>
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
            <DropdownMenuItem onClick={() => handlePublisherEditClick(row.original)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: publishers,
    columns: classColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  return (
    <div className="p-6">
      <div>
        <h2 className="text-xl font-semibold">Publisher</h2>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by Publisher..."
              value={(table.getColumn("publisher_name")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("publisher_name")?.setFilterValue(e.target.value)}
              className="max-w-sm bg-[#d5e2c5]"
            />
            <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                <Download className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsPublisherSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                <span>Add Publisher</span>
              </Button>
            </div>
          </div>
<Card>
<Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-[#f4b9bc] dark:bg-gray-800">
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
                  <TableCell colSpan={classColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
</Card>
        
        </div>

        <Sheet open={isPublisherSheetOpen} onOpenChange={setIsPublisherSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Publisher Details</SheetTitle>
              <SheetDescription>Fill in the details for the Publisher below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="Publisher" className="text-left">Publisher</Label>
                <Input
                  id="Publisher"
                  value={publisherName}
                  placeholder="Publisher"
                  onChange={(e) => setPublisherName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handlePublisher}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Dialog open={isPublisherDialogOpen} onOpenChange={setPublisherDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Publisher Details</DialogTitle>
              <DialogDescription>
                Make changes to the Publisher details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="Publisher" className="text-left">Publisher</Label>
                <Input
                  id="Publisher"
                  value={selectedPublisher?.publisher_name ?? ""}
                  placeholder="Publisher"
                  onChange={(e) => setSelectedPublisher(prev => prev ? { ...prev, publisher_name: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="status" className="text-left">Status</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as "Active" | "Inactive")}
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
              <Button
                type="submit"
                onClick={() => {
                  if (selectedPublisher) {
                    updatePublisher(selectedPublisher.publisher_id);
                  } else {
                    toast({
                      title: 'Error',
                      description: 'No publisher selected.',
                      variant: 'destructive',
                    });
                  }
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
