"use client"

import * as React from "react"
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

type Student = {
  id: number
  name: string
  cll: string
  psrn: string
  ead: string
}

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "S.No",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name of Student",
  },
  {
    accessorKey: "cll",
    header: "Grade (CLL[B4])",
  },
  {
    accessorKey: "psrn",
    header: "Grade (PSRN[C3])",
  },
  {
    accessorKey: "ead",
    header: "Grade (EAD[C3])",
  },
]

const initialData: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  cll: "",
  psrn: "",
  ead: "",
}))

export default function StudentGradesTable() {
      const router = useRouter();
  const [data, setData] = React.useState(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  const handleInputChange = (rowIndex: number, columnId: string, value: string) => {
    setData(prevData => 
      prevData.map((row, index) => 
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    )
  }

  const handleSubmit = () => {
    router.push('/subjects-slots');  
    
  }

  return (
    <div className="w-full   mx-auto space-y-4">
        <div>
            <h3 className="font-bold"><u>GOALS:</u></h3>
            <div className="flex">
            <span className="font-semibold">CLL[B4]:</span><p>  &nbsp; Links sounds letters, naming and sounding letters of the alphabets.</p>
            </div>
            <div className="flex"><span className="font-semibold">PSRN[C3]:</span><p>&nbsp;Describe the shapes in simple models, pictures and patterns.</p></div>
            <div className="flex"><span className="font-semibold">EAD[C3]:</span><p>&nbsp;Tries to capture experiences, using a variety of different media.</p></div>
        </div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center font-bold py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
                    {cell.column.id === "id" ? (
                      <div className="text-center">{cell.getValue() as number}</div>
                    ) : cell.column.id === "name" ? (
                      <Input
                        value={(cell.getValue() as string) || ""}
                        onChange={(e) => handleInputChange(row.index, cell.column.id, e.target.value)}
                        className="w-full"
                        placeholder="Enter student name"
                        disabled
                      />
                    ) : (
                      <Input
                        value={(cell.getValue() as string) || ""}
                        onChange={(e) => handleInputChange(row.index, cell.column.id, e.target.value)}
                        className="w-full text-center"
                        placeholder="Grade"
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {initialData.length} students
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="px-6 py-2">Submit</Button>
      </div>
    </div>
  )
}

