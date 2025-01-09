"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; // Ensure this points to your Axios setup
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
import { ArrowUpDown, MoreVertical } from "lucide-react";
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
import { useRouter } from "next/navigation";

// Define data types
export type Details = {
  id: string;
  user: string;
  status: "Active" | "Inactive";
};

// Main Component
export default function LibraryCard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [classTableData, setClassTableData] = useState<Details[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // New Data to Add (Example)
  const newData: Details[] = [
    {
      id: "card_1",
      user: "Hwazkr",
      status: "Active",
    },
    {
      id: "card_2",
      user: "Psaxqu",
      status: "Inactive",
    },
    {
      id: "card_3",
      user: "Uetskw",
      status: "Active",
    },
    {
      id: "card_4",
      user: "Bkrjdi",
      status: "Active",
    },
    {
      id: "card_5",
      user: "Vnzxkr",
      status: "Inactive",
    },
    {
      id: "card_6",
      user: "Gtwfji",
      status: "Active",
    },
    {
      id: "card_7",
      user: "Mheczo",
      status: "Inactive",
    },
    {
      id: "card_8",
      user: "Zxtpqi",
      status: "Active",
    },
    {
      id: "card_9",
      user: "Uqynwe",
      status: "Inactive",
    },
    {
      id: "card_10",
      user: "Kaqjzp",
      status: "Active",
    },
    {
      id: "card_11",
      user: "Fgrptl",
      status: "Inactive",
    },
    {
      id: "card_12",
      user: "Jlhxzw",
      status: "Active",
    },
    {
      id: "card_13",
      user: "Yqwlsc",
      status: "Inactive",
    },
    {
      id: "card_14",
      user: "Cbmwvn",
      status: "Active",
    },
    {
      id: "card_15",
      user: "Lrcpdk",
      status: "Inactive",
    },
  ];
  

  // Fetch data from API
  // useEffect(() => {
  //   const fetchLibraryCards = async () => {
  //     try {
  //       const response = await axiosInstance.get("/get_all_library_cards/");
  //       const data = response.data.map((item: any) => ({
  //         id: item.library_card_no,
  //         user: item.user_id, // Adjust if needed
  //         status: item.library_card_status === "Active" ? "Active" : "Inactive",
  //       }));

  //       // Adding additional records to existing data
  //       setClassTableData([...data, ...newData]); // Merging old data with new data
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching library cards:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchLibraryCards();
  // }, []);

  // Class columns
  const classColumns: ColumnDef<Details>[] = [
    {
      id: "Sno",
      header: "S. No",
      cell: ({ row }) => (
        <Button variant="link" onClick={() => navigateToDetails(row.original.user)}>
          {row.index + 1}
        </Button>
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Library Card Id <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "user",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User Id <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("user"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
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
            <DropdownMenuItem onClick={() => handleClassEditClick(row.original)}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const classTable = useReactTable({
    data: newData,
    columns: classColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
  });

  const handleClassEditClick = (classItem: Details) => {
    // Handle edit logic if necessary
  };

  const navigateToDetails = (id: string) => {
    router.push(`/library/libraryCardDetails/${id}`);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
  <div className="space-y-6">
  {/* Title Section */}
  <h2 className="text-xl font-semibold">Library Cards</h2>

  {/* Search Bar */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
    <div className="col-span-12 lg:col-span-6">
      <Input
        placeholder="Filter by name..."
        value={(classTable.getColumn("user")?.getFilterValue() as string) ?? ""}
        onChange={(e) => classTable.getColumn("user")?.setFilterValue(e.target.value)}
        className="w-full sm:max-w-sm"
      />
    </div>
  </div>

  {/* Table Section */}
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12">
      <Table>
        <TableHeader>
          {classTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="bg-gray-200 dark:bg-gray-800"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
              <TableCell
                colSpan={classColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
</div>

  );
}
