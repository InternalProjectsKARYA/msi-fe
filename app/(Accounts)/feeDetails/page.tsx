"use client";
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';  
import {   FaBook, FaChalkboardTeacher, FaBookReader, FaUsers } from 'react-icons/fa';  
import { Separator } from '@/components/ui/separator';
 
import {
    Table,
    TableBody,
   
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';

const FeeDetails = () => {
    
    const FeeDetails = [
        {
          bookId: "B001",
          bookName: "JavaScript for Beginners",
          description: "A complete guide to JavaScript  ",
           DatePaid: "08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
          bookId: "B002",
          bookName: "React in Action",
          description: "Learn React with practical examples.",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Online Request",
          type: "assigned",
        },
        {
          bookId: "B003",
          bookName: "Python Basics",
          description: "Introduction to Python programming.",
           DatePaid: " 08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
            bookId: "B003",
            bookName: "Python Basics",
            description: "Introduction to Python programming.",
             DatePaid: " 08-9-2024",
             enddate: "08-9-2024",
            method: "In-house",
            type: "recentlyAdded",
          },
        {
          bookId: "B004",
          bookName: "Advanced CSS",
          description: "Master CSS for modern web design.",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Library App",
          type: "assigned",
        },
        {
          bookId: "B005",
          bookName: "Learning Java",
          description: "Comprehensive guide ",
           DatePaid: " 08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
          bookId: "B006",
          bookName: "Understanding Node.js",
          description: "A deep dive into Node.js and server-side  ",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Library App",
          type: "assigned",
        },
        {
          bookId: "B007",
          bookName: "Introduction to HTML",
          description: "Basic principles of HTML  ",
           DatePaid: "08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "assigned",
        },
        {
          bookId: "B001",
          bookName: "JavaScript for Beginners",
          description: "A complete guide to JavaScript  ",
           DatePaid: "08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
          bookId: "B002",
          bookName: "React in Action",
          description: "Learn React with practical examples.",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Online Request",
          type: "assigned",
        },
        {
          bookId: "B003",
          bookName: "Python Basics",
          description: "Introduction to Python programming.",
           DatePaid: " 08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
            bookId: "B003",
            bookName: "Python Basics",
            description: "Introduction to Python programming.",
             DatePaid: " 08-9-2024",
             enddate: "08-9-2024",
            method: "In-house",
            type: "recentlyAdded",
          },
          {
            bookId: "B006",
            bookName: "Understanding Node.js",
            description: "A deep dive into Node.js and server-side  ",
             DatePaid: "09-7-2024",
             enddate: "08-9-2024",
            method: "Library App",
            type: "assigned",
          },
          {
            bookId: "B006",
            bookName: "Understanding Node.js",
            description: "A deep dive into Node.js and server-side  ",
             DatePaid: "09-7-2024",
             enddate: "08-9-2024",
            method: "Library App",
            type: "assigned",
          },
        {
          bookId: "B004",
          bookName: "Advanced CSS",
          description: "Master CSS for modern web design.",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Library App",
          type: "assigned",
        },
        {
          bookId: "B005",
          bookName: "Learning Java",
          description: "Comprehensive guide ",
           DatePaid: " 08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
        {
          bookId: "B005",
          bookName: "Learning Java",
          description: "Comprehensive guide ",
           DatePaid: " 08-9-2024",
           enddate: "08-9-2024",
          method: "In-house",
          type: "recentlyAdded",
        },
     
        {
          bookId: "B006",
          bookName: "Understanding Node.js",
          description: "A deep dive into Node.js and server-side  ",
           DatePaid: "09-7-2024",
           enddate: "08-9-2024",
          method: "Library App",
          type: "assigned",
        },
    
        
      ];
      
      const recentlyAddedFeeDetails = FeeDetails.filter((item) => item.type === "recentlyAdded");
      const addedFeeDetails = FeeDetails.filter((item) => item.type === "assigned");
      
      
  return (
  
  <>
 
    <div className="space-y-6  ">
      {/* Info Cards for Students, Teachers, etc */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Total Students Card */}
        <Card className="  shadow-lg rounded-md ">
          <CardHeader className="p-5">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-row items-center p-4 rounded bg-[#79a345d1]">
              <FaBook className=" text-3xl text-[#f2f6ec]" />
              </div>
              <h3 className="font-bold text-xl">Total students</h3>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">3654</h4>
              <p className="text-sm">Active: 3643</p>
              <p className="text-sm">Inactive: 11</p>
            </div>
            <div>
              <Badge color="red">1.2%</Badge>
            </div>
          </CardContent>
        </Card>

   

        {/* Authors Card */}
        <Card className="  shadow-lg rounded-md ">
          <CardHeader className="p-5">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-row items-center p-4 bg-[#da1e27b6] rounded">
                <FaBookReader className=" text-3xl text-[#fbe9ea]" /> {/* Book reader icon */}
              </div>
              <h3 className="font-bold text-xl">Paid</h3>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">154</h4>
              <p className="text-sm">Active: 143</p>
              <p className="text-sm">Inactive: 11</p>
            </div>
            <div>
              <Badge color="green">1.2%</Badge>
            </div>
          </CardContent>
        </Card>

     {/* Publishers Card */}
     <Card className="  shadow-lg rounded-md ">
          <CardHeader className="p-5">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-row items-center p-4 rounded bg-[#ffbf00c6]">
                <FaBook className=" text-3xl text-[#fff9e6]" /> {/* Book icon */}
              </div>
              <h3 className="font-bold text-xl">Due</h3>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">2454</h4>
              <p className="text-sm">Active: 2043</p>
              <p className="text-sm">Inactive: 191</p>
            </div>
            <div>
              <Badge color="blue">1.2%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Catalog Card */}
        <Card className="  shadow-lg rounded-md ">
          <CardHeader className="p-5">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex    items-center p-4 rounded bg-[#159ed9a9]">
                <FaChalkboardTeacher className=" text-3xl text-[#e8f5fb]" /> {/* Teacher icon */}
              </div>
              <h3 className="font-bold text-xl">Upcoming dues</h3>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">254</h4>
              <p className="text-sm">Active: 163</p>
              <p className="text-sm">Inactive: 81</p>
            </div>
            <div>
              <Badge color="purple">1.2%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Book Assign Card */}
        <Card className="  shadow-lg rounded-md ">
          <CardHeader className="p-5">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-row items-center p-4 rounded bg-[#351c5aa6]">
                <FaUsers className=" text-3xl text-[#ebe8ef]" /> {/* Users icon */}
              </div>
              <h3 className="font-bold text-xl">Pending</h3>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">964</h4>
              <p className="text-sm">Active: 743</p>
              <p className="text-sm">Inactive: 191</p>
            </div>
            <div>
              <Badge color="pink">1.2%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      

    </div>
    <div className="flex  gap-5 grid grid-cols-1 lg:grid-cols-2   mt-5">
  {/* Recently Added Books */}
  <Card>
    <CardHeader className="p-3 px-4 text-xl font-bold  ">Recently paid </CardHeader>
  
<div className='p-4 ' >
<Table>
  <TableHeader  className='bg-gray-200'>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead className="w-[200px]">Student Name</TableHead>
      <TableHead className="w-[300px]">Amount</TableHead>
      <TableHead className="text-right">Date paid</TableHead>
     
    </TableRow>
  </TableHeader>
  <TableBody className=''>
    {recentlyAddedFeeDetails.map((item,index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{item.bookId}</TableCell>
        <TableCell>{item.bookName}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell  className="text-right whitespace-nowrap">{item. DatePaid}</TableCell>
     
      </TableRow>
    ))}
  </TableBody>
  
  {/* Table Footer with Border Button */}
  <TableFooter>
    <TableRow>
      
        
     
    </TableRow>
  </TableFooter>
</Table>
<Button className="  left-0  mt-5   py-2 px-4 rounded-lg  ">
          View Details
        </Button>

</div>
   
   
  </Card>

  {/* Assigned Books */}
  <Card>
    <CardHeader className="p-3 px-4 text-xl font-bold  ">Pending dues</CardHeader>
    <div className='p-4'>
    <Table>
      <TableHeader  className='bg-gray-200'>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[200px]">Student name</TableHead>
          <TableHead className="w-[300px]">Amount</TableHead>
          <TableHead className="text-right">Last date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=''>
        {addedFeeDetails.map((item,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.bookId}</TableCell>
            <TableCell>{item.bookName}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell  className="text-right whitespace-nowrap">{item. DatePaid}</TableCell>
    
          </TableRow>
        ))}
      </TableBody>
        
  {/* Table Footer with Border Button */}
  <TableFooter>
    <TableRow>
      
       
     
    </TableRow>
  </TableFooter>
    </Table>
    <Button className="  left-0  mt-5   py-2 px-4 rounded-lg  ">
          View Details
        </Button>
    </div>

  </Card>
</div>

      </>
  );
};

export default FeeDetails;
