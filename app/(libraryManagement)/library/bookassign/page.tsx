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
import { Download, MoreVertical } from "lucide-react";
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
 
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

export type AssignBook = {
  assignment_id: string;
  member_id: string;
  start_date: Date;
  end_date: Date;
  revision_status: boolean;
  extended_due_date: Date;
  book_allocation_state: boolean;
  user_name?: string;
  book_name?: string;
};

export type User = {
  user_id: string;
  user_name: string;
};

export type Book = {
  book_id: string;
  book_name: string;
};

// Main Component
export default function BookAssign() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isAssignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAssign, setSelectedAssign] = useState<AssignBook | null>(null);
 
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState("");
  const [users, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [allocatedBooks, setAllocatedBooks] = useState<AssignBook[]>([
    {
      assignment_id: "A001",
      member_id: "M001",
      start_date: new Date("2025-01-01"),
      end_date: new Date("2025-01-15"),
      revision_status: false,
      extended_due_date: new Date("2025-01-20"),
      book_allocation_state: true,
      user_name: "John Doe",
      book_name: "Red Apple",
    },
    {
      assignment_id: "A002",
      member_id: "M002",
      start_date: new Date("2025-01-05"),
      end_date: new Date("2025-01-20"),
      revision_status: true,
      extended_due_date: new Date("2025-01-25"),
      book_allocation_state: false,
      user_name: "Jane Smith",
      book_name: "Cuddle Bear",
    },
    {
      assignment_id: "A003",
      member_id: "M003",
      start_date: new Date("2025-01-10"),
      end_date: new Date("2025-01-25"),
      revision_status: false,
      extended_due_date: new Date("2025-01-30"),
      book_allocation_state: true,
      user_name: "Bob Johnson",
      book_name: "Goodnight Moon",
    },
    {
      assignment_id: "A005",
      member_id: "M005",
      start_date: new Date("2025-02-01"),
      end_date: new Date("2025-02-15"),
      revision_status: false,
      extended_due_date: new Date("2025-02-20"),
      book_allocation_state: true,
      user_name: "Chris Evans",
      book_name: "Peter Pan",
    },
    {
      assignment_id: "A006",
      member_id: "M006",
      start_date: new Date("2025-02-05"),
      end_date: new Date("2025-02-18"),
      revision_status: true,
      extended_due_date: new Date("2025-02-23"),
      book_allocation_state: false,
      user_name: "Emma Watson",
      book_name: "Alice in Wonderland",
    },
    {
      assignment_id: "A007",
      member_id: "M007",
      start_date: new Date("2025-02-10"),
      end_date: new Date("2025-02-25"),
      revision_status: false,
      extended_due_date: new Date("2025-03-01"),
      book_allocation_state: true,
      user_name: "Liam Hemsworth",
      book_name: "The Jungle Book",
    },
    {
      assignment_id: "A008",
      member_id: "M008",
      start_date: new Date("2025-02-12"),
      end_date: new Date("2025-02-28"),
      revision_status: true,
      extended_due_date: new Date("2025-03-05"),
      book_allocation_state: false,
      user_name: "Olivia Wilde",
      book_name: "Winnie the Pooh",
    },
    {
      assignment_id: "A009",
      member_id: "M009",
      start_date: new Date("2025-03-01"),
      end_date: new Date("2025-03-15"),
      revision_status: false,
      extended_due_date: new Date("2025-03-20"),
      book_allocation_state: true,
      user_name: "Sophia Turner",
      book_name: "Charlotte's Web",
    },
    {
      assignment_id: "A010",
      member_id: "M010",
      start_date: new Date("2025-03-05"),
      end_date: new Date("2025-03-20"),
      revision_status: true,
      extended_due_date: new Date("2025-03-25"),
      book_allocation_state: false,
      user_name: "Harry Styles",
      book_name: "The Cat in the Hat",
    },
    {
      assignment_id: "A011",
      member_id: "M011",
      start_date: new Date("2025-03-08"),
      end_date: new Date("2025-03-25"),
      revision_status: false,
      extended_due_date: new Date("2025-03-30"),
      book_allocation_state: true,
      user_name: "Mia Clark",
      book_name: "The Little Prince",
    },
    {
      assignment_id: "A012",
      member_id: "M012",
      start_date: new Date("2025-03-12"),
      end_date: new Date("2025-03-30"),
      revision_status: true,
      extended_due_date: new Date("2025-04-05"),
      book_allocation_state: false,
      user_name: "Ryan Reynolds",
      book_name: "Where the Wild Things Are",
    },
    {
      assignment_id: "A013",
      member_id: "M013",
      start_date: new Date("2025-03-15"),
      end_date: new Date("2025-03-31"),
      revision_status: false,
      extended_due_date: new Date("2025-04-06"),
      book_allocation_state: true,
      user_name: "Zoe Kravitz",
      book_name: "Green Eggs and Ham",
    },
    {
      assignment_id: "A014",
      member_id: "M014",
      start_date: new Date("2025-03-18"),
      end_date: new Date("2025-04-01"),
      revision_status: true,
      extended_due_date: new Date("2025-04-07"),
      book_allocation_state: false,
      user_name: "Mark Ruffalo",
      book_name: "James and the Giant Peach",
    },
    {
      assignment_id: "A004",
      member_id: "M004",
      start_date: new Date("2025-01-15"),
      end_date: new Date("2025-01-30"),
      revision_status: true,
      extended_due_date: new Date("2025-02-05"),
      book_allocation_state: false,
      user_name: "Alice Brown",
      book_name: "Madeline",
    },
  ]);
  const { toast } = useToast();

  
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to handle Edit click for Assign
  const handleAssignEditClick = (classItem: AssignBook) => {
    setSelectedAssign(classItem);
    setAssignDialogOpen(true);
    setSelectedEndDate(formatDate(classItem.end_date));
  };

  // Assign columns
  const classColumns: ColumnDef<AssignBook>[] = [
    {
      accessorKey: "assignment_id",
      header: "Assignment ID",
    },
    {
      accessorKey: "user_name",
      header: "Member",
    },
    {
      accessorKey: "book_name",
      header: "Book",
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => formatDate(row.original.start_date),
    },
    {
      accessorKey: "end_date",
      header: "End Date",
      cell: ({ row }) => formatDate(row.original.end_date),
    },
    {
      accessorKey: "revision_status",
      header: "Revision Status",
      cell: ({ row }) => (row.original.revision_status ? "Yes" : "No"),
    },
    {
      accessorKey: "extended_due_date",
      header: "Extended Due Date",
      cell: ({ row }) => formatDate(row.original.extended_due_date),
    },
    {
      accessorKey: "book_allocation_state",
      header: "Allocation State",
      cell: ({ row }) => (row.original.book_allocation_state ? "Allocated" : "Not Allocated"),
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
            <DropdownMenuItem onClick={() => handleAssignEditClick(row.original)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const classTable = useReactTable({
    data: allocatedBooks,
    columns: classColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

 
  // const handleSaveAssignChanges = async () => {
  //   if (!userId || !bookId || !selectedStartDate || !selectedEndDate) {
  //     toast({
  //       title: "Error",
  //       description: "Please fill in all fields.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.post("/apiv1/allocate_book/", {
  //       user_id: userId,
  //       book_id: bookId,
  //       start_date: selectedStartDate,
  //       end_date: selectedEndDate,
  //     });
  //     toast({
  //       title: "Success",
  //       description: response.data.detail,
  //       variant: "success",
  //     });

  //     // Resetting states after allocation
  //     setIsAssignSheetOpen(false);
  //     setUserId("");
  //     setBookId("");
  //     setSelectedStartDate("");
  //     setSelectedEndDate("");

  //     // Refresh the allocated books list
  //     const fetchAllocatedBooks = async () => {
  //       try {
  //         const response = await axiosInstance.get("/apiv1/get_all_allocated_books/");
  //         const fetchedAllocatedBooks = response.data.data.map((book: AssignBook) => ({
  //           ...book,
  //           user_name: users.find(user => user.user_id === book.member_id)?.user_name || "Unknown",
  //           book_name: books.find(bookItem => bookItem.book_id === book.book_id)?.book_name || "Unknown",
  //         }));
  //         setAllocatedBooks(fetchedAllocatedBooks);
  //       } catch (error: any) {
  //         console.error("Error fetching allocated books:", error.response?.data || error.message);
  //       }
  //     };

  //     fetchAllocatedBooks();
  //   } catch (error: any) {
  //     console.error("Error allocating book:", error.response?.data || error.message);
  //     toast({
  //       title: "Error",
  //       description: "Failed to allocate book. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <div className="p-6">
      {/* Assign Table */}
      <div>
        <h2 className="text-xl font-semibold">Book Assign</h2>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by Book..."
              value={(classTable.getColumn("book_id")?.getFilterValue() as string) ?? ""}
              onChange={(e) => classTable.getColumn("book_id")?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex justify-end mt-3 space-x-4 mb-4 ml-auto">
              <Button variant="ghost" className="h-10 w-10 p-0" aria-label="Download">
                <Download className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsAssignSheetOpen(true)} className="w-32 hover:bg-opacity-90 flex items-center space-x-2">
                <span>Assign</span>
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              {classTable.getHeaderGroups().map((headerGroup) => (
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
              {classTable.getRowModel().rows.length ? (
                classTable.getRowModel().rows.map((row) => (
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
        </div>

        {/* Assign Sheet */}
        <Sheet open={isAssignSheetOpen} onOpenChange={setIsAssignSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Assign a New Book</SheetTitle>
              <SheetDescription>Fill in the details for book assignment below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="userDropdown" className="text-left">
                Select User
              </Label>
              <Select value={userId} onValueChange={(value) => setUserId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select User</SelectLabel>
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <SelectItem key={user.user_id} value={user.user_id}>
                          {user.user_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled>No users available</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor="bookDropdown" className="text-left">
                Select Book
              </Label>
              <Select value={bookId} onValueChange={(value) => setBookId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Books</SelectLabel>
                    {books.map((book) => (
                      <SelectItem key={book.book_id} value={book.book_id}>
                        {book.book_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Start Date Input */}
              <Label htmlFor="startDate" className="text-left">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
              />

              {/* End Date Input */}
              <Label htmlFor="endDate" className="text-left">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Edit Assign Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Assign</DialogTitle>
            <DialogDescription>
              Make changes to the assignment details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* End Date Field */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="endDate" className="text-left">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setAssignDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
