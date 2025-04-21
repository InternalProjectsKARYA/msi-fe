"use client";

import React, { useState } from "react";
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

/* ------------------------------------------------------------------
   Static Data: Classes & Fee Records
   ------------------------------------------------------------------ */
const initialClasses = [
  { class_id: "C1", class_standards: "Grade 1" },
  { class_id: "C2", class_standards: "Grade 2" },
  { class_id: "C3", class_standards: "Grade 3" },
  { class_id: "C4", class_standards: "Grade 4" },
  { class_id: "C5", class_standards: "Grade 5" },
];

const initialTableData = [
  {
    class_standards: "Grade 1",
    fee_list: {
      annual_fee: "2000",
      sports_fee: "300",
      library_fee: "200",
      tuition_fee: "1000",
      activity_fee: "150",
      admission_fee: "500",
      laboratory_fee: "0",
      examination_fee: "100",
      computer_lab_fee: "200",
    },
    total_fee: 4450,
  },
  {
    class_standards: "Grade 2",
    fee_list: {
      annual_fee: "2200",
      sports_fee: "300",
      library_fee: "250",
      tuition_fee: "1200",
      activity_fee: "200",
      admission_fee: "500",
      laboratory_fee: "0",
      examination_fee: "150",
      computer_lab_fee: "200",
    },
    total_fee: 4800,
  },
  {
    class_standards: "Grade 3",
    fee_list: {
      annual_fee: "2400",
      sports_fee: "300",
      library_fee: "250",
      tuition_fee: "1400",
      activity_fee: "200",
      admission_fee: "600",
      laboratory_fee: "0",
      examination_fee: "150",
      computer_lab_fee: "200",
    },
    total_fee: 5500,
  },
  {
    class_standards: "Grade 4",
    fee_list: {
      annual_fee: "2600",
      sports_fee: "400",
      library_fee: "300",
      tuition_fee: "1500",
      activity_fee: "250",
      admission_fee: "700",
      laboratory_fee: "0",
      examination_fee: "150",
      computer_lab_fee: "250",
    },
    total_fee: 5950,
  },
  {
    class_standards: "Grade 5",
    fee_list: {
      annual_fee: "3000",
      sports_fee: "400",
      library_fee: "300",
      tuition_fee: "1700",
      activity_fee: "300",
      admission_fee: "700",
      laboratory_fee: "0",
      examination_fee: "200",
      computer_lab_fee: "300",
    },
    total_fee: 6900,
  },
  {
    class_standards: "Grade 6",
    fee_list: {
      annual_fee: "3500",
      sports_fee: "500",
      library_fee: "350",
      tuition_fee: "1900",
      activity_fee: "300",
      admission_fee: "800",
      laboratory_fee: "200",
      examination_fee: "200",
      computer_lab_fee: "300",
    },
    total_fee: 8550,
  },
  {
    class_standards: "Grade 7",
    fee_list: {
      annual_fee: "3800",
      sports_fee: "500",
      library_fee: "350",
      tuition_fee: "2100",
      activity_fee: "400",
      admission_fee: "800",
      laboratory_fee: "200",
      examination_fee: "300",
      computer_lab_fee: "400",
    },
    total_fee: 9850,
  },
  {
    class_standards: "Grade 8",
    fee_list: {
      annual_fee: "4000",
      sports_fee: "600",
      library_fee: "400",
      tuition_fee: "2300",
      activity_fee: "400",
      admission_fee: "900",
      laboratory_fee: "200",
      examination_fee: "300",
      computer_lab_fee: "400",
    },
    total_fee: 10200,
  },
  {
    class_standards: "Grade 9",
    fee_list: {
      annual_fee: "4500",
      sports_fee: "600",
      library_fee: "400",
      tuition_fee: "2500",
      activity_fee: "500",
      admission_fee: "900",
      laboratory_fee: "300",
      examination_fee: "400",
      computer_lab_fee: "500",
    },
    total_fee: 12200,
  },
  {
    class_standards: "Grade 10",
    fee_list: {
      annual_fee: "5000",
      sports_fee: "700",
      library_fee: "400",
      tuition_fee: "2700",
      activity_fee: "500",
      admission_fee: "1000",
      laboratory_fee: "300",
      examination_fee: "400",
      computer_lab_fee: "500",
    },
    total_fee: 13000,
  },
];

/* ------------------------------------------------------------------
   Fee Component
   ------------------------------------------------------------------ */
function Fee() {
  /* State: Classes, Fee Table Data */
  const [classes, setClasses] = useState(initialClasses);
  const [tableData, setTableData] = useState(initialTableData);

  /* Dialog States */
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  /* Row for editing and form fields */
  const [editRow, setEditRow] = useState<any>(null); // Use 'any' or define type as needed
  const [selectedClass, setSelectedClass] = useState("");
  const [formRows, setFormRows] = useState([{ label: "", text: "" }]);

  /* Handlers for form row changes */
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedRows = [...formRows];
    updatedRows[index][field] = value;
    setFormRows(updatedRows);
  };

  const handleAddRow = () => {
    setFormRows([...formRows, { label: "", text: "" }]);
  };

  /* Handler: Save new Fee record from Add Dialog */
  const handleSaveChanges = () => {
    // Construct fee_list object from formRows
    const feeList: any = {};
    formRows.forEach((row) => {
      if (row.label && row.text) {
        feeList[row.label] = row.text;
      }
    });

    // Create new record for the table
    const newRecord = {
      class_standards: classes.find((cls) => cls.class_id === selectedClass)
        ?.class_standards || "Unknown Class",
      fee_list: feeList,
      total_fee: 0,
    };

    // Compute total fee
    let total = 0;
    Object.values(feeList).forEach((val) => {
      const numVal = parseFloat(val as string);
      if (!isNaN(numVal)) total += numVal;
    });
    newRecord.total_fee = total;

    // Add to table
    setTableData((prev) => [...prev, newRecord]);

    // Reset form
    setShowAddDialog(false);
    setFormRows([{ label: "", text: "" }]);
    setSelectedClass("");
  };

  /* Handler: Save changes for editing a row */
  const handleEditSave = () => {
    if (!editRow) return;

    const updatedData = [...tableData];
    const index = editRow.index;
    delete editRow.index; // remove the index property before saving
    updatedData[index] = editRow;
    setTableData(updatedData);

    setShowEditDialog(false);
    setEditRow(null);
  };

  return (
    <div className="space-y-6">
 <div className="grid grid-cols-12 gap-4">
  {/* Table Section (col-span-12) */}
  <div className="col-span-12 space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Manage Fees</h2>
        <p className="text-gray-600">Add and manage fee-related details below.</p>
      </div>
      <Button onClick={() => setShowAddDialog(true)} type="button">
        Add Fee
      </Button>
    </div>

    {/* Table Container */}
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-200 ">
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
        <TableBody className="">
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
                No data available. Click &quot;Add Fee&quot; to insert records.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
</div>



      {/* Dialog for Adding Fee */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="lg:w-1/2 w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Fee</DialogTitle>
            <DialogDescription>Fill in the details to add a new fee record.</DialogDescription>
          </DialogHeader>
          {/* Class & Add Row Button */}
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

          {/* Fee Rows */}
          <div className="flex flex-col gap-6 mt-6">
            {formRows.map((row, index) => (
              <div key={index} className="flex flex-wrap lg:flex-nowrap items-center gap-6 pb-4">
                <div className="flex flex-col w-full lg:w-1/2 gap-3">
                  <Label htmlFor={`label-${index}`}>Label</Label>
                  <Input
                    id={`label-${index}`}
                    placeholder="Enter label"
                    value={row.label}
                    onChange={(e) => handleInputChange(index, "label", e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-1/2 gap-3">
                  <Label htmlFor={`text-${index}`}>Text</Label>
                  <Input
                    id={`text-${index}`}
                    placeholder="Enter text"
                    value={row.text}
                    onChange={(e) => handleInputChange(index, "text", e.target.value)}
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
          {editRow && (
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="editClassId">Class Standards</Label>
                <Input
                  id="editClassId"
                  value={editRow.class_standards || ""}
                  onChange={(e) =>
                    setEditRow({ ...editRow, class_standards: e.target.value })
                  }
                />
              </div>
              {/* Example: editing one known fee field, e.g. 'annual_fee' */}
              <div>
                <Label htmlFor="editAnnualFee">Annual Fee</Label>
                <Input
                  id="editAnnualFee"
                  value={editRow.fee_list?.annual_fee || ""}
                  onChange={(e) =>
                    setEditRow({
                      ...editRow,
                      fee_list: {
                        ...editRow.fee_list,
                        annual_fee: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* You can expand to include more fields from fee_list as needed */}
            </div>
          )}
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
