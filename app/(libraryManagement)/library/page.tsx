"use client";
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaBook, FaChalkboardTeacher, FaBookReader, FaUsers } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
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

export type Book = {
  book_id: string;
  book_name: string;
  user_name: string;
  book_author: string;
  publisher_name: string;
  start_date: string;
  end_date: string;
};

const WelcomeCard = () => {
  const staticData = {
    publishers: { active_count: 50, inactive_count: 10 },
    authors: { active_count: 100, inactive_count: 20 },
    totalBooks: { active_count: 1000, inactive_count: 200 },
    catalog: { active_count: 80, inactive_count: 15 },
    bookAssign: { booked_count: 500, relieved_count: 300 },
  };

  const recentlyAddedBooks: Book[] = [
    { book_id: "1", book_name: "To Kill a Mockingbird", book_author: "Harper Lee", publisher_name: "J. B. Lippincott & Co."},
    { book_id: "2", book_name: "1984", book_author: "George Orwell", publisher_name: "Secker & Warburg"  },
    { book_id: "3", book_name: "The Great Gatsby", book_author: "F. Scott Fitzgerald", publisher_name: "Charles Scribner's Sons"},
    { book_id: "4", book_name: "Pride and Prejudice", book_author: "Jane Austen", publisher_name: "T. Egerton, Whitehall"},
    { book_id: "5", book_name: "The Catcher in the Rye", book_author: "J.D. Salinger", publisher_name: "Little, Brown and Company"},
    { book_id: "6", book_name: "Moby-Dick", book_author: "Herman Melville", publisher_name: "Harper & Brothers"},
    { book_id: "7", book_name: "The Hobbit", book_author: "J.R.R. Tolkien", publisher_name: "George Allen & Unwin"},
    { book_id: "8", book_name: "Fahrenheit 451", book_author: "Ray Bradbury", publisher_name: "Ballantine Books"},
    { book_id: "9", book_name: "Jane Eyre", book_author: "Charlotte Brontë", publisher_name: "Smith, Elder & Co."},
    { book_id: "10", book_name: "The Odyssey", book_author: "Homer", publisher_name: "Ancient Greek Publication"},
  ];

  const assignedBooks: Book[] = [
    { book_id: "1", book_name: "To Kill a Mockingbird", user_name: "John Doe", book_author: "", publisher_name: "", start_date: "2023-01-01", end_date: "2023-02-01" },
    { book_id: "2", book_name: "1984", user_name: "Jane Smith", book_author: "", publisher_name: "", start_date: "2023-01-05", end_date: "2023-02-05" },
    { book_id: "3", book_name: "The Great Gatsby", user_name: "Alice Johnson", book_author: "", publisher_name: "", start_date: "2023-01-10", end_date: "2023-02-10" },
    { book_id: "4", book_name: "Pride and Prejudice", user_name: "Bob Williams", book_author: "", publisher_name: "", start_date: "2023-01-15", end_date: "2023-02-15" },
    { book_id: "5", book_name: "The Catcher in the Rye", user_name: "Charlie Brown", book_author: "", publisher_name: "", start_date: "2023-01-20", end_date: "2023-02-20" },
    { book_id: "6", book_name: "Moby-Dick", user_name: "Diana Clark", book_author: "", publisher_name: "", start_date: "2023-01-25", end_date: "2023-02-25" },
    { book_id: "7", book_name: "The Hobbit", user_name: "Edward Davis", book_author: "", publisher_name: "", start_date: "2023-02-01", end_date: "2023-03-01" },
    { book_id: "8", book_name: "Fahrenheit 451", user_name: "Fiona Evans", book_author: "", publisher_name: "", start_date: "2023-02-05", end_date: "2023-03-05" },
    { book_id: "9", book_name: "Jane Eyre", user_name: "George Foster", book_author: "", publisher_name: "", start_date: "2023-02-10", end_date: "2023-03-10" },
    { book_id: "10", book_name: "The Odyssey", user_name: "Hannah Green", book_author: "", publisher_name: "", start_date: "2023-02-15", end_date: "2023-03-15" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div>
        <div className="space-y-6">
          {/* Info Cards for Students, Teachers, etc */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Publishers Card */}
            <Card className="shadow-lg rounded-md">
              <CardHeader className="p-5">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-row items-center">
                    <FaBook className="ml-4 text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl">Publishers</h3>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-wrap items-center justify-between mt-2">
                <div>
                  <h4 className="text-2xl font-bold">{staticData.publishers.active_count + staticData.publishers.inactive_count}</h4>
                  <p className="text-sm">Active: {staticData.publishers.active_count}</p>
                  <p className="text-sm">Inactive: {staticData.publishers.inactive_count}</p>
                </div>
                <div>
                  <Badge color="blue">1.2%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Authors Card */}
            <Card className="shadow-lg rounded-md">
              <CardHeader className="p-5">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-row items-center">
                    <FaBookReader className="ml-4 text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl">Authors</h3>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-wrap items-center justify-between mt-2">
                <div>
                  <h4 className="text-2xl font-bold">{staticData.authors.active_count + staticData.authors.inactive_count}</h4>
                  <p className="text-sm">Active: {staticData.authors.active_count}</p>
                  <p className="text-sm">Inactive: {staticData.authors.inactive_count}</p>
                </div>
                <div>
                  <Badge color="green">1.2%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Total Books Card */}
            <Card className="shadow-lg rounded-md">
              <CardHeader className="p-5">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-row items-center">
                    <FaBook className="ml-4 text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl">Total Books</h3>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-wrap items-center justify-between mt-2">
                <div>
                  <h4 className="text-2xl font-bold">{staticData.totalBooks.active_count + staticData.totalBooks.inactive_count}</h4>
                  <p className="text-sm">Active: {staticData.totalBooks.active_count}</p>
                  <p className="text-sm">Inactive: {staticData.totalBooks.inactive_count}</p>
                </div>
                <div>
                  <Badge color="red">1.2%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Catalog Card */}
            <Card className="shadow-lg rounded-md">
              <CardHeader className="p-5">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-row items-center">
                    <FaChalkboardTeacher className="ml-4 text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl">Catalog</h3>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-wrap items-center justify-between mt-2">
                <div>
                  <h4 className="text-2xl font-bold">{staticData.catalog.active_count + staticData.catalog.inactive_count}</h4>
                  <p className="text-sm">Active: {staticData.catalog.active_count}</p>
                  <p className="text-sm">Inactive: {staticData.catalog.inactive_count}</p>
                </div>
                <div>
                  <Badge color="purple">1.2%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Book Assign Card */}
            <Card className="shadow-lg rounded-md">
              <CardHeader className="p-5">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-row items-center">
                    <FaUsers className="ml-4 text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl">Book Assign</h3>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-wrap items-center justify-between mt-2">
                <div>
                  <h4 className="text-2xl font-bold">{staticData.bookAssign.booked_count + staticData.bookAssign.relieved_count}</h4>
                  <p className="text-sm">Active: {staticData.bookAssign.booked_count}</p>
                  <p className="text-sm">Inactive: {staticData.bookAssign.relieved_count}</p>
                </div>
                <div>
                  <Badge color="pink">1.2%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex gap-5 grid grid-cols-1 lg:grid-cols-2 mt-5">
          {/* Recently Added Books */}
          <Card>
            <CardHeader className="p-3 px-4 text-xl font-bold">Recently added books</CardHeader>
            <div className='p-4'>
              <Table>
                <TableHeader className='bg-gray-200 dark:bg-gray-800'>
                  <TableRow>
                    <TableHead className="w-[100px]">S. No</TableHead>
                    <TableHead className="w-[200px]">Book Name</TableHead>
                    <TableHead className="w-[300px]">Author Name</TableHead>
                    <TableHead className="w-[300px]">Publisher Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyAddedBooks.map((item, index) => (
                    <TableRow key={item.book_id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item.book_name}</TableCell>
                      <TableCell>{item.book_author}</TableCell>
                      <TableCell>{item.publisher_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                  </TableRow>
                </TableFooter>
              </Table>
              <Button className="left-0 mt-5 py-2 px-4 rounded-lg">
                <Link href="/library/bookmanagement">
                  View Details
                </Link>
              </Button>
            </div>
          </Card>

          {/* Assigned Books */}
          <Card>
            <CardHeader className="p-3 px-4 text-xl font-bold">Books assigned to students</CardHeader>
            <div className='p-4'>
              <Table>
                <TableHeader className='bg-gray-200 dark:bg-gray-800'>
                  <TableRow>
                    <TableHead className="w-[100px]">S. No</TableHead>
                    <TableHead className="w-[200px]">Book name</TableHead>
                    <TableHead className="w-[300px]">Assigned to</TableHead>
                    <TableHead className="text-right">Start date</TableHead>
                    <TableHead className="text-right">End date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedBooks.map((item, index) => (
                    <TableRow key={item.book_id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item.book_name}</TableCell>
                      <TableCell>{item.user_name}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">{formatDate(item.start_date)}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">{formatDate(item.end_date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                  </TableRow>
                </TableFooter>
              </Table>
              <Button className="left-0 mt-5 py-2 px-4 rounded-lg">
                <Link href="/library/bookassign">
                  View Details
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;

