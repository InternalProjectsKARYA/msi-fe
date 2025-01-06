"use client";

import React  from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
 
import { useParams } from "next/navigation";
// Define data type outside the component
export type PaymentRecord = {
  month: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Unpaid";
  refId: string;
  mode: string;
  datePaid: string;
};

// Static data for payment records
const paymentData: PaymentRecord[] = [
  { month: "January", dueDate: "2023-01-15", amount: 5000, status: "Paid", refId: "REF12345", mode: "Online", datePaid: "2023-01-10" },
  { month: "February", dueDate: "2023-02-15", amount: 5000, status: "Unpaid", refId: "REF12346", mode: "Online", datePaid: "" },
  { month: "March", dueDate: "2023-03-15", amount: 5000, status: "Paid", refId: "REF12347", mode: "Cash", datePaid: "2023-03-12" },
  { month: "April", dueDate: "2023-04-15", amount: 5000, status: "Unpaid", refId: "REF12348", mode: "Cheque", datePaid: "" },
  { month: "May", dueDate: "2023-05-15", amount: 5000, status: "Paid", refId: "REF12349", mode: "Online", datePaid: "2023-05-10" },
  { month: "June", dueDate: "2023-06-15", amount: 5000, status: "Unpaid", refId: "REF12350", mode: "Cash", datePaid: "" },
  { month: "July", dueDate: "2023-07-15", amount: 5000, status: "Paid", refId: "REF12351", mode: "Cheque", datePaid: "2023-07-10" },
  { month: "August", dueDate: "2023-08-15", amount: 5000, status: "Paid", refId: "REF12352", mode: "Online", datePaid: "2023-08-10" },
  { month: "September", dueDate: "2023-09-15", amount: 5000, status: "Unpaid", refId: "REF12353", mode: "Cash", datePaid: "" },
  { month: "October", dueDate: "2023-10-15", amount: 5000, status: "Paid", refId: "REF12354", mode: "Online", datePaid: "2023-10-10" },
];

export default function StudentFee() {
 

  const columns: ColumnDef<PaymentRecord>[] = [
    { accessorKey: "month", header: "Month" },
    { accessorKey: "dueDate", header: "Due Date" },
    { accessorKey: "amount", header: "Amount" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
      
            <span
              className={`flex items-center space-x-2 px-2 py-1 rounded ${
                row.getValue("status") === "Paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
             
   
              <span
                className={`w-1 h-1 rounded-full ${
                  row.getValue("status") === "Paid" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
        
               <span>{row.getValue("status")}</span>
          
            </span>
          </div>
        ),
      },
      
    { accessorKey: "refId", header: "Ref ID" },
    { accessorKey: "mode", header: "Mode" },
    { accessorKey: "datePaid", header: "Date Paid" },
  ];
  const params = useParams();
  const studentID = params?.id; 
  const table = useReactTable({
    data: paymentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      {/* Student Info Section */}
      <div className="mb-4 flex flex-col items-start space-y-1">
        <span className="text-lg font-semibold">Student ID: {studentID}</span>
        <span className="text-lg font-semibold">Name:  </span>
      </div>

      {/* Payment Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-200 text-black">
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
    </div>
  );
}
