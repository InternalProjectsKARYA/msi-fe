"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Fee from "./fee/page";
import Transport from "./transport/page";
 

export default function feeManagement() {
 
  return (
    <>
      <Tabs defaultValue="Fee" className="   ">
        <TabsList className="grid w-64  bg-gray-200  grid-cols-2">
          <TabsTrigger value="Fee">Fee</TabsTrigger>
          <TabsTrigger value="Transport">Transport</TabsTrigger>
        </TabsList>
        <TabsContent value="Fee">
          <Fee />
        </TabsContent>
        <TabsContent value="Transport">
          <Transport />
        </TabsContent>
      </Tabs>

  
    </>
  );
}
