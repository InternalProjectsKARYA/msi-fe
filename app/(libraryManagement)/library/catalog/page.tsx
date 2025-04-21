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
import { useToast } from "@/components/ui/use-toast";

export type Catalog = {
  catelog_id: string;
  catelogtype: string;
  catelogname: string;
  purchase_date: string;
  publisher_name: string;
  status: boolean;
};

export type Publisher = {
  publisher_id: string;
  publisher_name: string;
};

export default function CatalogManagement() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([
    { catelog_id: "C001", catelogtype: "Type A", catelogname: "Catalog 1", purchase_date: "2024-12-01", publisher_name: "Publisher A", status: true },
    { catelog_id: "C002", catelogtype: "Type B", catelogname: "Catalog 2", purchase_date: "2024-11-15", publisher_name: "Publisher B", status: false },
    { catelog_id: "C003", catelogtype: "Type C", catelogname: "Catalog 3", purchase_date: "2024-10-20", publisher_name: "Publisher C", status: true },
  ]);

  const [publishers] = useState<Publisher[]>([
    { publisher_id: "P001", publisher_name: "Publisher A" },
    { publisher_id: "P002", publisher_name: "Publisher B" },
    { publisher_id: "P003", publisher_name: "Publisher C" },
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [catalogType, setCatalogType] = useState("");
  const [catalogName, setCatalogName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const { toast } = useToast();

  const openSheet = (catalog: Catalog | null = null) => {
    setSelectedCatalog(catalog);
    if (catalog) {
      setCatalogType(catalog.catelogtype);
      setCatalogName(catalog.catelogname);
      setPurchaseDate(catalog.purchase_date);
      setPublisherId(publishers.find((pub) => pub.publisher_name === catalog.publisher_name)?.publisher_id || "");
      setStatus(catalog.status ? "Active" : "Inactive");
    } else {
      resetForm();
    }
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    resetForm();
  };

  const saveCatalog = () => {
    if (selectedCatalog) {
      setCatalogs((prevCatalogs) =>
        prevCatalogs.map((catalog) =>
          catalog.catelog_id === selectedCatalog.catelog_id
            ? { ...catalog, catelogtype: catalogType, catelogname: catalogName, purchase_date: purchaseDate, publisher_name: publishers.find((pub) => pub.publisher_id === publisherId)?.publisher_name || "", status: status === "Active" }
            : catalog
        )
      );
      toast({ title: "Success", description: "Catalog updated successfully." });
    } else {
      const newCatalog: Catalog = {
        catelog_id: `C00${catalogs.length + 1}`,
        catelogtype: catalogType,
        catelogname: catalogName,
        purchase_date: purchaseDate,
        publisher_name: publishers.find((pub) => pub.publisher_id === publisherId)?.publisher_name || "",
        status: status === "Active",
      };
      setCatalogs([...catalogs, newCatalog]);
      toast({ title: "Success", description: "Catalog created successfully." });
    }
    closeSheet();
  };

  const resetForm = () => {
    setCatalogType("");
    setCatalogName("");
    setPurchaseDate("");
    setPublisherId("");
    setStatus("Active");
  };

  const catalogColumns: ColumnDef<Catalog>[] = [
    { id: "sno", header: "S.NO", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "catelogtype",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Catalog Type <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("catelogtype"),
    },
    {
      accessorKey: "catelogname",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Catalog Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("catelogname"),
    },
    {
      accessorKey: "purchase_date",
      header: "Purchase Date",
      cell: ({ row }) => row.getValue("purchase_date"),
    },
    {
      accessorKey: "publisher_name",
      header: "Publisher",
      cell: ({ row }) => row.getValue("publisher_name"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status") ? "Active" : "Inactive"}</div>,
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
    data: catalogs,
    columns: catalogColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6">
    {/* Title Section */}
    <h2 className="text-xl font-semibold">Catalog Management</h2>
  
    {/* Search Bar and Actions */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
      {/* Search Input */}
      <div className="col-span-12 lg:col-span-6">
        <Input
          placeholder="Filter by Catalog Type..."
          className="w-full sm:max-w-sm "
        />
      </div>
  
      {/* Actions */}
      <div className="col-span-12 lg:col-span-6 flex justify-end space-x-4">
        <Button variant="ghost" className="h-10 w-10 p-0">
          <Download className="h-5 w-5" />
        </Button>
        <Button onClick={() => openSheet()}>Add Catalog</Button>
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
  
    {/* Add/Edit Catalog Sheet */}
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedCatalog ? "Edit Catalog" : "Add Catalog"}</SheetTitle>
          <SheetDescription>
            Fill in the details below to {selectedCatalog ? "update" : "add"} a catalog.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <Input
            placeholder="Catalog Type"
            value={catalogType}
            onChange={(e) => setCatalogType(e.target.value)}
          />
          <Input
            placeholder="Catalog Name"
            value={catalogName}
            onChange={(e) => setCatalogName(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Purchase Date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
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
            value={status}
            onValueChange={(value) => setStatus(value as "Active" | "Inactive")}
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
          <Button onClick={saveCatalog}>{selectedCatalog ? "Update" : "Save"}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
  
  );
}
