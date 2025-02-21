"use client"

import React, { useEffect, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Grid, List, MoreVertical } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AOS from "aos"
import "aos/dist/aos.css"

export type Staff = {
  id: string
  Staff: string
  Department: string
  Gender: string
  Email: string
  Phone: string
  status: "Active" | "InActive"
  Reporting: string
  avatar: string
}

const staffTableData: Staff[] = [
  { id: "S001", Staff: "Amit Kumar", Department: "Administration", Gender: "Male", Email: "amit.kumar@example.com", Phone: "9123456789", status: "Active", Reporting: "John Doe", avatar: "https://i.pravatar.cc/150?img=51" },
  { id: "S002", Staff: "Priya Sharma", Department: "Finance", Gender: "Female", Email: "priya.sharma@example.com", Phone: "9876543210", status: "Active", Reporting: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=52" },
  { id: "S003", Staff: "Rahul Verma", Department: "IT Support", Gender: "Male", Email: "rahul.verma@example.com", Phone: "9234567891", status: "Active", Reporting: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=53" },
  { id: "S004", Staff: "Anjali Mehta", Department: "Human Resources", Gender: "Female", Email: "anjali.mehta@example.com", Phone: "9354678912", status: "Active", Reporting: "Sarah Brown", avatar: "https://i.pravatar.cc/150?img=54" },
  { id: "S005", Staff: "Ramesh Gupta", Department: "Security", Gender: "Male", Email: "ramesh.gupta@example.com", Phone: "9445567893", status: "Inactive", Reporting: "David Wilson", avatar: "https://i.pravatar.cc/150?img=55" },
  { id: "S006", Staff: "Sneha Patel", Department: "Library", Gender: "Female", Email: "sneha.patel@example.com", Phone: "9556678914", status: "Active", Reporting: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=56" },
  { id: "S007", Staff: "Vikram Das", Department: "Transport", Gender: "Male", Email: "vikram.das@example.com", Phone: "9667789123", status: "Active", Reporting: "Robert Taylor", avatar: "https://i.pravatar.cc/150?img=57" },
  { id: "S008", Staff: "Pooja Iyer", Department: "Cafeteria", Gender: "Female", Email: "pooja.iyer@example.com", Phone: "9778891234", status: "Inactive", Reporting: "Linda Anderson", avatar: "https://i.pravatar.cc/150?img=58" },
  { id: "S009", Staff: "Arun Malhotra", Department: "Maintenance", Gender: "Male", Email: "arun.malhotra@example.com", Phone: "9889912345", status: "Active", Reporting: "Michael Lee", avatar: "https://i.pravatar.cc/150?img=59" },
  { id: "S010", Staff: "Neha Jain", Department: "Counseling", Gender: "Female", Email: "neha.jain@example.com", Phone: "9991023456", status: "Active", Reporting: "Karen White", avatar: "https://i.pravatar.cc/150?img=60" },
]

export default function StaffsGridAndList() {
  const [isStaffDialogOpen, setStaffDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      once: true,
    })
  }, [])

  const StaffColumns: ColumnDef<Staff>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "Staff",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatar} alt={row.getValue("Staff")} />
          </Avatar>
          <span>{row.getValue("Staff")}</span>
        </div>
      ),
    },
    { accessorKey: "Department", header: "Department" },
    { accessorKey: "Gender", header: "Gender" },
    { accessorKey: "Reporting", header: "Reporting To" },
    { accessorKey: "Email", header: "Email" },
    { accessorKey: "Phone", header: "Phone" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("status") === "Active" ? "default" : "secondary"}>
          {row.getValue("status")}
        </Badge>
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
            <DropdownMenuItem onClick={() => handleStaffEditClick(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: staffTableData,
    columns: StaffColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleStaffEditClick = (staff: Staff) => {
    setSelectedStaff(staff)
    setStaffDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Staff List</h2>
            <p className="text-muted-foreground">Manage staff data here.</p>
          </div>
          <TabsList>
            <TabsTrigger value="grid">
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staffTableData.map((staff, index) => (
              <Card
                key={staff.id}
                data-aos="fade-up"
                data-aos-duration={`${300 + index * 100}`}
                className="bg-[#fff6d9]"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                    {staff.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStaffEditClick(staff)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={staff.avatar} alt={staff.Staff} />
                  </Avatar>
                  <h3 className="font-semibold text-lg">{staff.Staff}</h3>
                  <p className="text-sm text-muted-foreground">{staff.Department}</p>
                  <Badge variant="outline" className="mt-2">
                    {staff.Gender}
                  </Badge>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <p className="text-sm"><strong>Email:</strong> {staff.Email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {staff.Phone}</p>
                  <p className="text-sm"><strong>Reporting to:</strong> {staff.Reporting}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
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
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-aos="fade-up"
                      data-aos-duration={`${300 + index * 50}`}
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
                    <TableCell colSpan={StaffColumns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
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
        </TabsContent>
      </Tabs>

      <Dialog open={isStaffDialogOpen} onOpenChange={setStaffDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
            <DialogDescription>
              Make changes to the staff details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedStaff.Staff}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-left">
                  Department
                </Label>
                <Input
                  id="department"
                  defaultValue={selectedStaff.Department}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-left">
                  Gender
                </Label>
                <Select defaultValue={selectedStaff.Gender}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={selectedStaff.Email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-left">
                  Phone
                </Label>
                <Input
                  id="phone"
                  defaultValue={selectedStaff.Phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporting" className="text-left">
                  Reporting To
                </Label>
                <Input
                  id="reporting"
                  defaultValue={selectedStaff.Reporting}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-left">
                  Status
                </Label>
                <Select defaultValue={selectedStaff.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="InActive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={() => setStaffDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

