"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { Printer, CreditCard } from 'lucide-react';
import Image from "next/image";
const Invoice = () => {
  return (
    <div className="container    p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">INVOICE</h1>
        <span className="text-gray-500 text-lg font-semibold">#345766</span>
      </div>
      
      <div className="flex justify-between mt-8">
        {/* Left Side - Company Information */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Image src="/logo.png" alt="Company Logo" className="w-8 h-8" /> {/* Replace with actual logo */}
            <span className="text-2xl font-bold">Smart</span>
          </div>
          <p className="text-gray-600">
            Aditya University, <br />
            Opp. Town Hall, <br />
            Sardar Patel Road, <br />
            Ahmedabad - 380015
          </p>
        </div>
        
        {/* Right Side - Customer Information */}
        <div className="text-right">
          <h2 className="text-xl font-semibold">To,</h2>
          <p className="text-lg font-bold">Jayesh Patel</p>
          <p className="text-gray-600">
            207, Prem Sagar Appt., <br />
            Near Income Tax Office, <br />
            Ashram Road, <br />
            Ahmedabad - 380057
          </p>
          <p className="text-gray-700 mt-4 flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            Invoice Date: 14th July 2017
          </p>
          <p className="text-gray-700">Course: Engineering</p>
        </div>
      </div>

      {/* Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Fees Type</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Invoice number</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Annual Fees</TableCell>
                <TableCell>Yearly</TableCell>
                <TableCell>2016-11-19</TableCell>
                <TableCell>#IN-345609865</TableCell>
                <TableCell>$100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Tuition Fees</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>2016-11-19</TableCell>
                <TableCell>#IN-345604565</TableCell>
                <TableCell>$50</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-right">
          <p>Sub - Total amount: $150</p>
          <p>Discount: $10</p>
          <p>Tax (10%): $14</p>
          <h2 className="text-2xl font-bold mt-2">Total : $164</h2>
        </CardFooter>
      </Card>

      {/* Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <Button variant="default"  >
          <CreditCard className="w-4 h-4 mr-2" /> Proceed to payment
        </Button>
        <Button variant="outline" className="text-gray-700 border-gray-300">
          <Printer className="w-4 h-4 mr-2" /> Print
        </Button>
      </div>
    </div>
  );
};

export default Invoice;
