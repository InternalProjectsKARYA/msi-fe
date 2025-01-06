"use client"
import React, { useEffect, useState } from "react";
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
import axiosInstance from "@/lib/axiosInstance"; // Assuming axiosInstance is properly set up for API calls


function Transport() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transportId, setTransportId] = useState("");
  const [route, setRoute] = useState("");
  const [transportFee, setTransportFee] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const fetchTransportFees = async () => {
      try {
        const response = await axiosInstance.get("/get_all_transport_fee/");
        if (response.status === 200) {
          setTableData(response.data.fees); // Set the fetched data
        }
      } catch (error) {
        console.error("Error fetching transport fees:", error);
      }
    };

    fetchTransportFees();
  }, []);

  const handleSave = async () => {
    try {
      // Prepare the data to be sent to the API
      const transportData = {
        root: route,
        transport_fee: transportFee,
      };

      // Sending data to the backend API
      const response = await axiosInstance.post("/create_transport_fee/", transportData);

      if (response.status === 201) {
        // Successfully created the transport fee, update table
        setTableData([...tableData, { ...transportData, id: `T${tableData.length + 1}` }]);
        setIsSheetOpen(false); // Close the sheet
        // Clear form fields
        setRoute("");
        setTransportFee("");
        setStatus("");
      }
    } catch (error) {
      console.error("Error creating transport fee:", error);
    }
  };

  const filteredData = tableData.filter((row) =>
    row.root.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveChanges = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Transport Fees</h2>
          <p className="text-gray-600">Add and manage transport fee details below.</p>
        </div>

        {/* Add Transport Fee Button */}
        <Button onClick={() => setIsSheetOpen(true)}>Add Transport Fee</Button>
      </div>

      {/* Card for Table */}
      <Card>
        <CardContent className="mt-5">
          {/* Search Bar */}
          <div className="flex justify-start mb-4">
            <Input
              type="text"
              placeholder="Search by route"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-1/3"
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-800">
              <TableRow>
                <TableHead>Transport ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Transport Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.transport_id}>
                  <TableCell>{row.transport_id}</TableCell>
                  <TableCell>{row.root}</TableCell>
                  <TableCell>{row.transport_fee}</TableCell>
                  <TableCell>{row.transportfee_status ? "Inactivee" : "Active"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Transport Fee Sheet */}
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
          </div>
          <SheetFooter>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Dialog for editing options */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
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
              <Label htmlFor="route" className="text-left col-span-1">
                Route
              </Label>
              <Input
                id="route"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="Enter Route"
                className="col-span-3"
              />
            </div>

            {/* Transport Fee */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="transportFee" className="text-left col-span-1">
                Transport Fee
              </Label>
              <Input
                id="transportFee"
                value={transportFee}
                onChange={(e) => setTransportFee(e.target.value)}
                placeholder="Enter Transport Fee"
                className="col-span-3"
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-left col-span-1">
                Status
              </Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Enter Status (Active/Inactive)"
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
