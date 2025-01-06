"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import axiosInstance from '@/lib/axiosInstance';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react'
export type Registration = {
    registration_id: string;
    registration_flag: boolean;
    registration_uploads_flag: boolean;
    health_flag: boolean;
    oral_health_flag: boolean;
    waiver_flag: boolean;
    privacy_flag: boolean;
  
};


const Page = () => {
  
  const [registrations,setRegistrations]=useState<Registration[]>([])
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();
  useEffect(()=> {
    const fetchRegistrations = async () => {
      try {
        const response = await axiosInstance.get("/registration-stages/");
        setRegistrations(response.data.registrations);
      } catch (error: any) {
        console.error("Error fetching books:", error.response ? error.response.data : error.message);
      }
    };
    fetchRegistrations()
  },[])
  console.log(registrations)


  const classColumns: ColumnDef<Registration>[] = [
    {
      accessorKey: "registration_id",
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registration ID {column.getIsSorted() === "asc" ? "↑" : "↓"}
        </div>
      ),
      cell: ({ row }) => row.getValue("registration_id"),
    },
    {
      accessorKey: "flags.registration_flag", // Use the flags object as the key for the column
      header: "Registration",
      cell: ({ row }) =>
        row.getValue("flags").registration_flag ? ( // Accessing the specific flag inside flags
          <Button className='w-20' onClick={() => router.push(`/firstform?registration_number=${ row.getValue("registration_id")}&view=True`)}>View</Button>
        ) : (
          <Button className='w-20' onClick={() => console.log("Create Registration")}>Create</Button>
        ),
    },
    {
      accessorKey: "flags.registration_uploads_flag", // Use the flags object as the key for the column
      header: "Uploads",
      cell: ({ row }) =>
        row.getValue("flags").registration_uploads_flag ? (
          <Button className='w-20' onClick={() => router.push(`/registration-uploads?registration_number=${ row.getValue("registration_id")}&view=true` )}>View</Button>
        ) : (
          <Button  className='w-20' onClick={() => router.push(`/registration-uploads?registration_number=${ row.getValue("registration_id")}`)}>Create</Button>
        ),
    },
    {
      accessorKey: "flags.privacy_flag", // Use the flags object as the key for the column
      header: "Privacy",
      cell: ({ row }) =>
        row.getValue("flags").privacy_flag ? (
          <Button className='w-20' onClick={() => router.push(`/privacyform?registration_number=${ row.getValue("registration_id")}&view=true`)}>View</Button>
        ) : (
          <Button className='w-20' onClick={() => router.push(`/privacyform?registration_number=${ row.getValue("registration_id")}`)}>Create</Button>
        ),
    },
    {
      accessorKey: "flags.oral_health_flag", // Use the flags object as the key for the column
      header: "Oral Health",
      cell: ({ row }) =>
        row.getValue("flags").oral_health_flag ? (
          <Button  className='w-20' onClick={() => router.push(`/oral-health?registration_number=${ row.getValue("registration_id")}&view=true`)}>View</Button>
        ) : (
          <Button  className='w-20' onClick={() => router.push(`/oral-health?registration_number=${ row.getValue("registration_id")}`)}>Create</Button>
        ),
    },
    {
      accessorKey: "flags.health_flag", // Use the flags object as the key for the column
      header: "Health",
      cell: ({ row }) =>
        row.getValue("flags").health_flag ? (
          <Button className='w-20' onClick={() => router.push(`/healthexamination?registration_number=${ row.getValue("registration_id")}&view=true`)}>View</Button>
        ) : (
          <Button className='w-20' onClick={() => router.push(`/healthexamination?registration_number=${ row.getValue("registration_id")}`)}>Create</Button>
        ),
    },
    {
      accessorKey: "flags", // Use the flags object as the key for the column
      header: "Waiver",
      cell: ({ row }) =>
        row.getValue("flags").waiver_flag ? (
          <Button className='w-20' onClick={() => router.push(`/waiver?registration_number=${ row.getValue("registration_id")}&view=true`)}>View</Button>
        ) : (
          <Button className='w-20' onClick={() => router.push(`/waiver?registration_number=${ row.getValue("registration_id")}`)}>Create</Button>
        ),
    },
  ];
  
   const classTable = useReactTable({
       data: registrations, // Update this to reflect the allocated books
       columns: classColumns,
       initialState: {
        sorting: [{ id: "registration_id", desc: false }], // Default sorting
      },
       getCoreRowModel: getCoreRowModel(),
       getPaginationRowModel: getPaginationRowModel(),
       getSortedRowModel: getSortedRowModel(),
       getFilteredRowModel: getFilteredRowModel(),
      //  state: { sorting, columnFilters, columnVisibility },
      //  onSortingChange: setSorting,
      //  onColumnFiltersChange: setColumnFilters,
     });
 
  return (
    <div className='p-5'>
    <div  className='text-end p-5'><Button onClick={()=>{router.push('/firstform')}}>New Registration</Button></div>
    <Table>
                <TableHeader>
                  {classTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="bg-gray-200  dark:bg-gray-800">
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
  )
}

export default Page

