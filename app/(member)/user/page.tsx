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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

export type Role = {
  role_id: string;
  role_name: string;
};


export default function User() {
  const [isUserSheetOpen, setIsUserSheetOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRole] = useState<Role[]>([]);
  const [roleId, setRoleId] = useState("");
 

 

  const handleAddUser = async () => {
    setIsUserSheetOpen(false); 
 
  };
  return (
    <>
      <Tabs defaultValue="Teacher" className=" ">
        <div className="right-10 absolute">
          <Button onClick={() => setIsUserSheetOpen(true)}>Add Member</Button>
        </div>
        <TabsList className="grid w-[20%] bg-gray-200 grid-cols-3">
          <TabsTrigger value="Teacher">Teacher</TabsTrigger>
          <TabsTrigger value="Student">Student</TabsTrigger>
          <TabsTrigger value="Staff">Staff</TabsTrigger>
        </TabsList>

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

      {/* Sheet for adding a member */}
      <Sheet open={isUserSheetOpen} onOpenChange={setIsUserSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Member</SheetTitle>
            <SheetDescription>Fill in the details for the new member below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="email" className="text-left">Email ID</Label>
              <Input 
                id="email" 
                placeholder="Email" 
                className="col-span-3" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="phone" className="text-left">Phone No</Label>
              <Input 
                id="phone" 
                placeholder="Phone" 
                className="col-span-3" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-4 items-center">
            <Label htmlFor="phone" className="text-left">Select Role</Label>
            <div className="col-span-3">
            <Select value={roleId} onValueChange={(value) => setRoleId(value)}>
              <SelectTrigger>
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
            
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" onClick={handleAddUser}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
