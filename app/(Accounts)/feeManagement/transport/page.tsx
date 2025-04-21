"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

// -------------- 10 Static Data Items --------------
const initialTransportData = [
  {
    transport_id: "TR001",
    root: "Route A",
    transport_fee: "300",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR002",
    root: "Route B",
    transport_fee: "400",
    transportfee_status: "Inactive",
  },
  {
    transport_id: "TR003",
    root: "Route C",
    transport_fee: "350",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR004",
    root: "Route D",
    transport_fee: "500",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR005",
    root: "Route E",
    transport_fee: "450",
    transportfee_status: "Inactive",
  },
  {
    transport_id: "TR006",
    root: "Route F",
    transport_fee: "350",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR007",
    root: "Route G",
    transport_fee: "600",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR008",
    root: "Route H",
    transport_fee: "380",
    transportfee_status: "Inactive",
  },
  {
    transport_id: "TR009",
    root: "Route I",
    transport_fee: "420",
    transportfee_status: "Active",
  },
  {
    transport_id: "TR010",
    root: "Route J",
    transport_fee: "390",
    transportfee_status: "Active",
  },
];

function Transport() {
  // States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState(initialTransportData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form fields for Add
  const [route, setRoute] = useState("");
  const [transportFee, setTransportFee] = useState("");
  const [status, setStatus] = useState("Active");

  // Form fields for Edit
  const [transportId, setTransportId] = useState("");
  const [editRoute, setEditRoute] = useState("");
  const [editFee, setEditFee] = useState("");
  const [editStatus, setEditStatus] = useState("Active");

  // Filtered data based on search
  const filteredData = tableData.filter((row) =>
    row.root.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler: Save new transport record
  const handleSave = () => {
    const newRecord = {
      transport_id: `TR${tableData.length + 1}`,
      root: route,
      transport_fee: transportFee,
      transportfee_status: status || "Active",
    };

    setTableData((prev) => [...prev, newRecord]);
    setIsSheetOpen(false);

    // Reset fields
    setRoute("");
    setTransportFee("");
    setStatus("Active");
  };

  // Handler: Save changes in Dialog
  const handleSaveChanges = () => {
    // Update the record in tableData
    const updatedTableData = tableData.map((item) =>
      item.transport_id === transportId
        ? {
            ...item,
            root: editRoute,
            transport_fee: editFee,
            transportfee_status: editStatus,
          }
        : item
    );
    setTableData(updatedTableData);
    setIsDialogOpen(false);
  };

  // Handler: Click edit row
  const handleEditClick = (row: any) => {
    setTransportId(row.transport_id);
    setEditRoute(row.root);
    setEditFee(row.transport_fee);
    setEditStatus(row.transportfee_status || "Active");
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Button */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="text-xl font-semibold">Manage Transport Fees</h2>
          <p className="text-gray-600">Add and manage transport fee details below.</p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex justify-start lg:justify-end">
          <Button onClick={() => setIsSheetOpen(true)}>Add Transport Fee</Button>
        </div>
      </div>

      {/* Card for Table */}
      <div className="grid grid-cols-12">

      
      <Card className="col-span-12">
        <CardContent className="mt-5">
          {/* Search Bar */}
          <div className="flex justify-start mb-4">
            <Input
              type="text"
              placeholder="Search by route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-1/3"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-200 ">
                <TableRow>
                  <TableHead>Transport ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Transport Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.transport_id}>
                      <TableCell>{row.transport_id}</TableCell>
                      <TableCell>{row.root}</TableCell>
                      <TableCell>{row.transport_fee}</TableCell>
                      <TableCell>{row.transportfee_status}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditClick(row)}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No data available. Click &quot;Add Transport Fee&quot; to insert records.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
      {/* Sheet for Adding Transport Fee */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Transport Fee</SheetTitle>
            <SheetDescription>
              Fill in the details below to add a new transport fee.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="route" className="text-left">
                Route
              </Label>
              <Input
                id="route"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="Enter route"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transportFee" className="text-left">
                Fee
              </Label>
              <Input
                id="transportFee"
                value={transportFee}
                onChange={(e) => setTransportFee(e.target.value)}
                placeholder="Enter transport fee"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Active / Inactive"
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Dialog for Editing Transport Fee */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transport Fee</DialogTitle>
            <DialogDescription>
              Modify the row details below and click save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Transport ID */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="transportId" className="text-left col-span-1">
                Transport ID
              </Label>
              <Input
                id="transportId"
                value={transportId}
                onChange={(e) => setTransportId(e.target.value)}
                placeholder="Enter Transport ID"
                className="col-span-3"
              />
            </div>

            {/* Route */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="editRoute" className="text-left col-span-1">
                Route
              </Label>
              <Input
                id="editRoute"
                value={editRoute}
                onChange={(e) => setEditRoute(e.target.value)}
                placeholder="Enter Route"
                className="col-span-3"
              />
            </div>

            {/* Transport Fee */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="editFee" className="text-left col-span-1">
                Transport Fee
              </Label>
              <Input
                id="editFee"
                value={editFee}
                onChange={(e) => setEditFee(e.target.value)}
                placeholder="Enter Transport Fee"
                className="col-span-3"
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="editStatus" className="text-left col-span-1">
                Status
              </Label>
              <Input
                id="editStatus"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                placeholder="Active / Inactive"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Transport;
