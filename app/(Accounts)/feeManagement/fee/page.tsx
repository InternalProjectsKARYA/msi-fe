"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

function Fee() {
  const [selectedClass, setSelectedClass] = useState("");

  const [formRows, setFormRows] = useState([{ label: "", text: "" }]);
  const [tableData, setTableData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRow, setEditRow] = useState(null);
 // const [outputJson, setOutputJson] = useState(null);
  const [classes, setClasses] = useState([]);

  // Fetch classes from the API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/get_all_class/');
        setClasses(response.data.classes); // Assuming classes are in the 'classes' field
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    

    const fetchFeeDetails = async () => {
      try {
        const response = await axiosInstance.get("/get_all_fee/");
        setTableData(response.data.classrooms); // Set table data from response
      } catch (error) {
        console.error("Error fetching fee details:", error);
      }
    };



    fetchClasses();
    fetchFeeDetails();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...formRows];
    updatedRows[index][field] = value;
    setFormRows(updatedRows);
  };

  const handleAddRow = () => {
    setFormRows([...formRows, { label: "", text: "" }]);
  };

  const handleSaveChanges = async () => {
    const feeList = {};
    formRows.forEach((row) => {
      if (row.label && row.text) {
        feeList[row.label] = row.text; // Map label as key and text as value
      }
    });

    const jsonData = {
      class_id: selectedClass,
      fee_list: feeList,
    };

    try {
      const response = await axiosInstance.post('/create_fee/', jsonData);
      setShowAddDialog(false);
      //setOutputJson(response.data);
      console.log('Fee created:', response.data);
    } catch (error) {
      console.error("Error creating fee:", error);
    }
  };

  const handleEditSave = () => {
    const updatedData = [...tableData];
    updatedData[editRow.index] = editRow;
    setTableData(updatedData);
    setShowEditDialog(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Fees</h2>
          <p className="text-gray-600">Add and manage fee-related details below.</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} type="button">
          Add Fee
        </Button>
      </div>

      {/* Table for Fee Records */}
      {/* <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200 dark-gray-900">
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Total Fee</TableHead>
              <TableHead>Fee Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.class_standards}</TableCell>
                  <TableCell>{data.total_fee}</TableCell>
                  <TableCell>{data.fee_status ? "Paid" : "Unpaid"}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditRow({ ...data, index });
                        setShowEditDialog(true);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available. Click "Add Fee" to insert records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div> */}


<div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200 dark:bg-gray-800">
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Annual Fee</TableHead>
              <TableHead>Sports Fee</TableHead>
              <TableHead>Library Fee</TableHead>
              <TableHead>Tuition Fee</TableHead>
              <TableHead>Activity Fee</TableHead>
              <TableHead>Admission Fee</TableHead>
              <TableHead>Laboratory Fee</TableHead>
              <TableHead>Examination Fee</TableHead>
              <TableHead>Computer Lab Fee</TableHead>
              <TableHead>Total Fee</TableHead>
             
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.class_standards}</TableCell>
                  <TableCell>{data.fee_list?.annual_fee}</TableCell>
                  <TableCell>{data.fee_list?.sports_fee}</TableCell>
                  <TableCell>{data.fee_list?.library_fee}</TableCell>
                  <TableCell>{data.fee_list?.tuition_fee}</TableCell>
                  <TableCell>{data.fee_list?.activity_fee}</TableCell>
                  <TableCell>{data.fee_list?.admission_fee}</TableCell>
                  <TableCell>{data.fee_list?.laboratory_fee}</TableCell>
                  <TableCell>{data.fee_list?.examination_fee}</TableCell>
                  <TableCell>{data.fee_list?.computer_lab_fee}</TableCell>
                  <TableCell>{data.total_fee}</TableCell>
                 
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditRow({ ...data, index });
                        setShowEditDialog(true);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center">
                  No data available. Click "Add Fee" to insert records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    

      {/* Display JSON Data Below Table */}
      {/* {outputJson && (
        <pre className="mt-6 bg-gray-50 p-4 rounded-md">
          {JSON.stringify(outputJson, null, 2)}
        </pre>
      )} */}

      {/* Dialog for Adding Fee */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="lg:w-1/2 w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Fee</DialogTitle>
            <DialogDescription>Fill in the details to add a new fee record.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-10 mt-5">
            <div className="flex items-center w-full lg:w-1/2">
              <Label htmlFor="classDropdown" className="w-20">
                Class
              </Label>
              <Select
                onValueChange={(value) => setSelectedClass(value)}
                value={selectedClass}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.class_id} value={classItem.class_id}>
                        {classItem.class_standards}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddRow} variant="secondary" className="self-start">
              + Add Row
            </Button>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {formRows.map((row, index) => (
              <div key={index} className="flex flex-row items-center gap-6 pb-4">
                <div className="flex flex-col w-1/2 gap-3">
                  <Label htmlFor={`label-${index}`}>Label</Label>
                  <Input
                    id={`label-${index}`}
                    placeholder="Enter label"
                    value={row.label}
                    onChange={(e) => handleInputChange(index, "label", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col w-1/2 gap-3">
                  <Label htmlFor={`text-${index}`}>Text</Label>
                  <Input
                    id={`text-${index}`}
                    placeholder="Enter text"
                    value={row.text}
                    onChange={(e) => handleInputChange(index, "text", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Editing Fee */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fee</DialogTitle>
            <DialogDescription>Modify the selected fee record.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <Label htmlFor="editClassId">Class</Label>
              <Input
                id="editClassId"
                value={editRow?.class_id || ""}
                onChange={(e) => setEditRow({ ...editRow, class_id: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editFee">Fee</Label>
              <Input
                id="editFee"
                value={editRow?.fee || ""}
                onChange={(e) => setEditRow({ ...editRow, fee: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editDetails">Details</Label>
              <Input
                id="editDetails"
                value={editRow?.details || ""}
                onChange={(e) => setEditRow({ ...editRow, details: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Fee;
