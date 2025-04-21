"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Book = {
  book_id: string;
  book_name: string;
  book_author: string;
  publisher_id: string;
  publisher_name: string;
  book_status: boolean;
};

export type Publisher = {
  publisher_id: string;
  publisher_name: string;
};

export default function BookAndSectionTables() {
  const [books, setBooks] = useState<Book[]>([
    { book_id: "B001", book_name: "1984", book_author: "George Orwell", publisher_id: "P001", publisher_name: "Penguin", book_status: true },
    { book_id: "B002", book_name: "Moby Dick", book_author: "Herman Melville", publisher_id: "P002", publisher_name: "HarperCollins", book_status: false },
    { book_id: "B003", book_name: "The Great Gatsby", book_author: "F. Scott Fitzgerald", publisher_id: "P003", publisher_name: "Scribner", book_status: true },
  ]);

  const [publishers] = useState<Publisher[]>([
    { publisher_id: "P001", publisher_name: "Penguin" },
    { publisher_id: "P002", publisher_name: "HarperCollins" },
    { publisher_id: "P003", publisher_name: "Scribner" },
  ]);

  const [sorting, setSorting] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [bookStatus, setBookStatus] = useState<"Active" | "Inactive">("Active");

  const openSheet = (book: Book | null = null) => {
    setSelectedBook(book);
    if (book) {
      setBookName(book.book_name);
      setBookAuthor(book.book_author);
      setPublisherId(book.publisher_id);
      setBookStatus(book.book_status ? "Active" : "Inactive");
    } else {
      resetForm();
    }
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    resetForm();
  };

  const saveBook = () => {
    if (selectedBook) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.book_id === selectedBook.book_id
            ? { ...book, book_name: bookName, book_author: bookAuthor, publisher_id: publisherId, book_status: bookStatus === "Active" }
            : book
        )
      );
    } else {
      const newBook: Book = {
        book_id: `B00${books.length + 1}`,
        book_name: bookName,
        book_author: bookAuthor,
        publisher_id: publisherId,
        publisher_name: publishers.find((p) => p.publisher_id === publisherId)?.publisher_name || "",
        book_status: bookStatus === "Active",
      };
      setBooks([...books, newBook]);
    }
    closeSheet();
  };

  const resetForm = () => {
    setBookName("");
    setBookAuthor("");
    setPublisherId("");
    setBookStatus("Active");
  };

  const bookColumns: ColumnDef<Book>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "book_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Book Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("book_name"),
    },
    {
      accessorKey: "book_author",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Author <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("book_author"),
    },
    {
      accessorKey: "publisher_name",
      header: "Publisher",
      cell: ({ row }) => row.getValue("publisher_name"),
    },
    {
      accessorKey: "book_status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("book_status") ? "Active" : "Inactive"}</div>,
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
            <DropdownMenuItem onClick={() => openSheet(row.original)}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: books,
    columns: bookColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="space-y-6">
    {/* Title Section */}
    <h2 className="text-xl font-semibold">Book Management</h2>
  
    {/* Search Bar and Actions */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
      {/* Search Input */}
      <div className="col-span-12 lg:col-span-6">
        <Input
          placeholder="Filter by Book Name..."
          className="w-full sm:max-w-sm "
        />
      </div>
  
      {/* Actions */}
      <div className="col-span-12 lg:col-span-6 flex justify-end space-x-4">
        <Button variant="ghost" className="h-10 w-10 p-0">
          <Download className="h-5 w-5" />
        </Button>
        <Button onClick={() => openSheet()}>Add Book</Button>
      </div>
    </div>
  
    {/* Table Section */}
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <Table>
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
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
  
    {/* Sheet (Add/Edit Book) */}
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedBook ? "Edit Book" : "Add Book"}</SheetTitle>
          <SheetDescription>
            Fill in the details below to {selectedBook ? "update" : "add"} a book.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <Input
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <Input
            placeholder="Author"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <Select value={publisherId} onValueChange={setPublisherId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Publisher" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Publisher</SelectLabel>
                {publishers.map((publisher) => (
                  <SelectItem key={publisher.publisher_id} value={publisher.publisher_id}>
                    {publisher.publisher_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={bookStatus}
            onValueChange={(value) => setBookStatus(value as "Active" | "Inactive")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
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
        <SheetFooter>
          <Button onClick={saveBook}>{selectedBook ? "Update" : "Save"}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
  
  
  );
}
