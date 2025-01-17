"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import TeachersGridAndList from "../teacher/page";
import StudentsGridAndList from "../student/page";
import StaffsGridAndList from "../staff/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 

export type Role = {
  role_id: string;
  role_name: string;
};


export default function User() {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRole] = useState<Role[]>([]);
  const [roleId, setRoleId] = useState("");
 

 

  const handleAddUser = async () => {
    setIsAddMemberDialogOpen(false)
    // Add your user creation logic here
  }
  return (
    <>
 <Tabs defaultValue="Student" className="">
        <div className="flex flex-wrap justify-between">
          <TabsList className="grid grid-cols-3 gap-2 w-1/2 md:w-2/3">
            <TabsTrigger value="Student">Student</TabsTrigger>
            <TabsTrigger value="Teacher">Teaching Staff</TabsTrigger>
            <TabsTrigger value="Staff">Non-Teaching Staff</TabsTrigger>
          </TabsList>
          <div className="">
            <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddMemberDialogOpen(true)}>Add Member</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Member</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new member below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-left">
                      Name
                    </Label>
                    <Input
                      id="Name"
                      placeholder="Name"
                      className="col-span-3"
                 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-left">
                      Email ID
                    </Label>
                    <Input
                      id="email"
                      placeholder="Email"
                      className="col-span-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-left">
                      Phone No
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Phone"
                      className="col-span-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-left">
                      Select Role
                    </Label>
                    <Select value={roleId} onValueChange={(value) => setRoleId(value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roles.map((role) => (
                            <SelectItem key={role.role_id} value={role.role_id}>
                              {role.role_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddUser}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="Teacher">
          <TeachersGridAndList />
        </TabsContent>
        <TabsContent value="Student">
          <StudentsGridAndList />
        </TabsContent>
        <TabsContent value="Staff">
          <StaffsGridAndList />
        </TabsContent>
      </Tabs>
    </>
  );
}
