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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AOS from "aos"
import "aos/dist/aos.css"
import { useRouter } from "next/navigation"

export type Teacher = {
  id: string
  Teacher: string
  Class: string
  Email: string
  Phone: string
  status: "Active" | "InActive"
  Subject: string
  avatar: string
}

const teacherTableData: Teacher[] = [
  { id: "A1B2", Teacher: "Gautami Reddy", Class: "10th Grade", Email: "arjunr@example.com", Phone: "9876543210", Subject: "Mathematics", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "C3D4", Teacher: "Lakshmi Menon", Class: "9th Grade", Email: "lakshmim@example.com", Phone: "9876543221", Subject: "Science", status: "Active", avatar: "https://i.pravatar.cc/150?img=33" },
  { id: "G7H8", Teacher: "Meera Nair", Class: "7th Grade", Email: "meeran@example.com", Phone: "9876543243", Subject: "History", status: "Active", avatar: "https://i.pravatar.cc/150?img=35" },
  { id: "I9J1", Teacher: "Priya ", Class: "6th Grade", Email: "rahuls@example.com", Phone: "9876543254", Subject: "Geography", status: "Active", avatar: "https://i.pravatar.cc/150?img=36" },
  { id: "M4N5", Teacher: "Vikram Rathore", Class: "10th Grade", Email: "vikramr@example.com", Phone: "9876543276", Subject: "Chemistry", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=38" },
  { id: "S1T2", Teacher: "Priya Iyer", Class: "7th Grade", Email: "priyai@example.com", Phone: "9876543211", Subject: "Art", status: "Active", avatar: "https://i.pravatar.cc/150?img=41" },
  { id: "W5X6", Teacher: "Deepika Patel", Class: "11th Grade", Email: "deepikap@example.com", Phone: "9876543233", Subject: "Mathematics", status: "Active", avatar: "https://i.pravatar.cc/150?img=43" },
  { id: "Y7Z8", Teacher: "Rajeev Menon", Class: "10th Grade", Email: "rajeevm@example.com", Phone: "9876543244", Subject: "Physical Education", status: "Active", avatar: "https://i.pravatar.cc/150?img=44" },
  { id: "A9B1", Teacher: "Shreya Kapoor", Class: "9th Grade", Email: "shreyak@example.com", Phone: "9876543255", Subject: "Chemistry", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=45" },
  { id: "E4F5", Teacher: "Pooja Mishra", Class: "7th Grade", Email: "poojam@example.com", Phone: "9876543277", Subject: "English", status: "Active", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "G6H7", Teacher: "Aditya Rao", Class: "6th Grade", Email: "adityar@example.com", Phone: "9876543288", Subject: "History", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=48" },
  { id: "I8J9", Teacher: "Nisha Singh", Class: "11th Grade", Email: "nishas@example.com", Phone: "9876543299", Subject: "Physics", status: "Active", avatar: "https://i.pravatar.cc/150?img=49" },
]

export default function TeachersGridAndList() {
  const router = useRouter()
  const [selectedClass, setSelectedClass] = useState("")
  const [isTeacherDialogOpen, setTeacherDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      once: true,
    })
  }, [])

  const TeacherColumns: ColumnDef<Teacher>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "Teacher",
      header: "Teacher Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatar} alt={row.getValue("Teacher")} />
          </Avatar>
          <span>{row.getValue("Teacher")}</span>
        </div>
      ),
    },
    { accessorKey: "Class", header: "Class" },
    { accessorKey: "Subject", header: "Subject" },
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
            <DropdownMenuItem onClick={() => handleTeacherEditClick(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/teacher-profile/${row.original.id}`)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: teacherTableData,
    columns: TeacherColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleTeacherEditClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setTeacherDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Teachers List</h2>
            <p className="text-muted-foreground">Manage teacher data here.</p>
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
            {teacherTableData.map((teacher, index) => (
              <Card
                key={teacher.id}
                data-aos="fade-up"
                data-aos-duration={`${300 + index * 100}`}
                className="bg-[#f9dddf]"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                    {teacher.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleTeacherEditClick(teacher)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/teacher-profile/${teacher.id}`)}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={teacher.avatar} alt={teacher.Teacher} />
                  </Avatar>
                  <h3 className="font-semibold text-lg">{teacher.Teacher}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.Class}</p>
                  <Badge variant="outline" className="mt-2">
                    {teacher.Subject}
                  </Badge>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <p className="text-sm"><strong>Email:</strong> {teacher.Email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {teacher.Phone}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <Table>
              <TableHeader className="bg-[#f4b9bc]">
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
              <TableBody className="bg-[#fbe9ea]">
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
                    <TableCell colSpan={TeacherColumns.length} className="h-24 text-center">
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

      <Dialog open={isTeacherDialogOpen} onOpenChange={setTeacherDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Make changes to the teacher details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedTeacher.Teacher}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-left">
                  Class
                </Label>
                <Select defaultValue={selectedTeacher.Class}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6th Grade">6th Grade</SelectItem>
                    <SelectItem value="7th Grade">7th Grade</SelectItem>
                    <SelectItem value="8th Grade">8th Grade</SelectItem>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-left">
                  Subject
                </Label>
                <Input
                  id="subject"
                  defaultValue={selectedTeacher.Subject}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={selectedTeacher.Email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-left">
                  Phone
                </Label>
                <Input
                  id="phone"
                  defaultValue={selectedTeacher.Phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-left">
                  Status
                </Label>
                <Select defaultValue={selectedTeacher.status}>
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
            <Button type="submit" onClick={() => setTeacherDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

