"use client"

import React, { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronLeft, ChevronRight, Download, MoreVertical } from 'lucide-react'
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type BookEntry = {
  id: string
  bookName: string
  class: string
  startDate: string
  endDate: string
  status: "Active" | "Inactive"
}

const bookEntries: BookEntry[] = [
  { id: "BE001", bookName: "To Kill a Mockingbird", class: "9th Standard", startDate: "2023-01-01", endDate: "2023-02-01", status: "Active" },
  { id: "BE002", bookName: "1984", class: "10th Standard", startDate: "2023-01-15", endDate: "2023-02-15", status: "Active" },
  { id: "BE003", bookName: "The Great Gatsby", class: "11th Standard", startDate: "2023-02-01", endDate: "2023-03-01", status: "Inactive" },
  { id: "BE004", bookName: "Pride and Prejudice", class: "12th Standard", startDate: "2023-02-15", endDate: "2023-03-15", status: "Active" },
  { id: "BE005", bookName: "The Catcher in the Rye", class: "10th Standard", startDate: "2023-03-01", endDate: "2023-04-01", status: "Active" },
  { id: "BE006", bookName: "Lord of the Flies", class: "9th Standard", startDate: "2023-03-15", endDate: "2023-04-15", status: "Inactive" },
  { id: "BE007", bookName: "The Hobbit", class: "8th Standard", startDate: "2023-04-01", endDate: "2023-05-01", status: "Active" },
  { id: "BE008", bookName: "Animal Farm", class: "11th Standard", startDate: "2023-04-15", endDate: "2023-05-15", status: "Active" },
  { id: "BE009", bookName: "Brave New World", class: "12th Standard", startDate: "2023-05-01", endDate: "2023-06-01", status: "Active" },
  { id: "BE010", bookName: "The Giver", class: "8th Standard", startDate: "2023-05-15", endDate: "2023-06-15", status: "Inactive" },
]

export default function LibraryCardDetails() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [bookData, setBookData] = useState<BookEntry[]>(bookEntries)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null)
  // const [newBookName, setNewBookName] = useState("")
  // const [newClass, setNewClass] = useState("8th Standard")
  // const [newStartDate, setNewStartDate] = useState("")
  // const [newEndDate, setNewEndDate] = useState("")
  // const [newStatus, setNewStatus] = useState<"Active" | "Inactive">("Active")

  const params = useParams()
  const cardId = params?.id as string

  const columns: ColumnDef<BookEntry>[] = [
    {
      accessorKey: "bookName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Book Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "class",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Class <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          End Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className={`capitalize ${row.getValue("status") === "Active" ? "text-green-600" : "text-red-600"}`}>
          {row.getValue("status")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditClick(row.original)}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: bookData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleEditClick = (book: BookEntry) => {
    setSelectedBook(book)
    setIsEditDialogOpen(true)
  }

  // const handleAddBook = (newBook: BookEntry) => {
  //   setBookData((prevData) => [...prevData, newBook])
  //   // setIsAddSheetOpen(false)
  //   // Reset form fields
  //   setNewBookName("")
  //   setNewClass("8th Standard")
  //   setNewStartDate("")
  //   setNewEndDate("")
  //   setNewStatus("Active")
  // }

  return (
    <div className=" ">
      <h2 className="text-2xl font-bold mb-4">Library Card Details</h2>
      <h3 className="text-xl mb-6">Card ID: <strong>{cardId}</strong></h3>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by book name..."
          value={(table.getColumn("bookName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("bookName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-[#b6e1f3]"
        />
        <Button variant="outline" className="ml-auto mr-2" onClick={() => {}}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        {/* <Button onClick={() => setIsAddSheetOpen(true)}>Add Book</Button> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#ffebb0]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
          <TableBody className="bg-[#fff9e6]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book Entry</DialogTitle>
            <DialogDescription>
              Make changes to the book entry here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bookName" className="text-right">
                  Book Name
                </Label>
                <Input
                  id="bookName"
                  defaultValue={selectedBook.bookName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <Select defaultValue={selectedBook.class}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="8th Standard">8th Standard</SelectItem>
                      <SelectItem value="9th Standard">9th Standard</SelectItem>
                      <SelectItem value="10th Standard">10th Standard</SelectItem>
                      <SelectItem value="11th Standard">11th Standard</SelectItem>
                      <SelectItem value="12th Standard">12th Standard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  defaultValue={selectedBook.startDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={selectedBook.endDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedBook.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Book</SheetTitle>
            <SheetDescription>Add a new book to the library card. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newBookName" className="text-right">
                Book Name
              </Label>
              <Input
                id="newBookName"
                value={newBookName}
                onChange={(e) => setNewBookName(e.target.value)}
                placeholder="Enter book name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newClass" className="text-right">
                Class
              </Label>
              <Select value={newClass} onValueChange={setNewClass}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="8th Standard">8th Standard</SelectItem>
                    <SelectItem value="9th Standard">9th Standard</SelectItem>
                    <SelectItem value="10th Standard">10th Standard</SelectItem>
                    <SelectItem value="11th Standard">11th Standard</SelectItem>
                    <SelectItem value="12th Standard">12th Standard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newStartDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="newStartDate"
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEndDate" className="text-right">
                End Date
              </Label>
              <Input
                id="newEndDate"
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newStatus" className="text-right">
                Status
              </Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => handleAddBook({
                id: `BE${bookData.length + 1}`.padStart(5, '0'),
                bookName: newBookName,
                class: newClass,
                startDate: newStartDate,
                endDate: newEndDate,
                status: newStatus as "Active" | "Inactive"
              })}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet> */}
    </div>
  )
}

