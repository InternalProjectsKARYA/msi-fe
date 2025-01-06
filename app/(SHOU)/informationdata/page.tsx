"use client";

import React  from "react";
 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GraphViewData from "../graphdata/page";
import TableData from "../tabledata/page";
 
 
 

export default function User() {
 

 
  return (
    <>
      <Tabs defaultValue="Graph" className=" ">
     
        <TabsList className="grid w-[20%] bg-gray-200 grid-cols-2">
          <TabsTrigger value="Graph">Graph</TabsTrigger>
          <TabsTrigger value="Table">Table</TabsTrigger>
       
        </TabsList>

        <TabsContent value="Graph">
      <GraphViewData />
        </TabsContent>
        <TabsContent value="Table">
     <TableData />
        </TabsContent>
    
      </Tabs>

  
    </>
  );
}
