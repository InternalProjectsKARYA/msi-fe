'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Student {
  id: string
  name: string
  class: string
  rollNo: string
  profilePic: string
  grades: {
    test1: string
    test2: string
    test3: string
    quarterly: string
    halfYearly: string
    annually: string
  }
}

const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      class: '10A',
      rollNo: '1001',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'A+', test3: 'A', quarterly: 'A+', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '2',
      name: 'Bob Smith',
      class: '10A',
      rollNo: '1002',
      profilePic: '/placeholder.svg',
      grades: { test1: 'B+', test2: 'A', test3: 'A+', quarterly: 'A', halfYearly: 'A+', annually: 'A' }
    },
    {
      id: '3',
      name: 'Charlie Brown',
      class: '10B',
      rollNo: '1003',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A+', test2: 'A++', test3: 'A+', quarterly: 'A++', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '4',
      name: 'Diana Ross',
      class: '10B',
      rollNo: '1004',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'B+', test3: 'A', quarterly: 'A', halfYearly: 'A+', annually: 'A' }
    },
    {
      id: '5',
      name: 'Ethan Hunt',
      class: '10C',
      rollNo: '1005',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A++', test2: 'A+', test3: 'A++', quarterly: 'A++', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '6',
      name: 'Fiona Apple',
      class: '10C',
      rollNo: '1006',
      profilePic: '/placeholder.svg',
      grades: { test1: 'B', test2: 'B+', test3: 'A', quarterly: 'B+', halfYearly: 'A', annually: 'A' }
    },
    {
      id: '7',
      name: 'George Michael',
      class: '10A',
      rollNo: '1007',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'A', test3: 'A+', quarterly: 'A', halfYearly: 'A+', annually: 'A+' }
    },
    {
      id: '8',
      name: 'Hannah Montana',
      class: '10B',
      rollNo: '1008',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A+', test2: 'A', test3: 'A', quarterly: 'A+', halfYearly: 'A', annually: 'A+' }
    },
    {
      id: '9',
      name: 'Ian McKellen',
      class: '10C',
      rollNo: '1009',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'A++', test3: 'A+', quarterly: 'A++', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '10',
      name: 'Julia Roberts',
      class: '10A',
      rollNo: '1010',
      profilePic: '/placeholder.svg',
      grades: { test1: 'B+', test2: 'A', test3: 'A', quarterly: 'A', halfYearly: 'A+', annually: 'A' }
    },
    {
      id: '11',
      name: 'Kevin Bacon',
      class: '10B',
      rollNo: '1011',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'A', test3: 'A+', quarterly: 'A', halfYearly: 'A+', annually: 'A+' }
    },
    {
      id: '12',
      name: 'Lana Del Rey',
      class: '10C',
      rollNo: '1012',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A++', test2: 'A++', test3: 'A++', quarterly: 'A++', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '13',
      name: 'Michael Jordan',
      class: '10A',
      rollNo: '1013',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A+', test2: 'A', test3: 'A+', quarterly: 'A+', halfYearly: 'A++', annually: 'A++' }
    },
    {
      id: '14',
      name: 'Nancy Drew',
      class: '10B',
      rollNo: '1014',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A', test2: 'B+', test3: 'A', quarterly: 'A', halfYearly: 'A', annually: 'A+' }
    },
    {
      id: '15',
      name: 'Oscar Wilde',
      class: '10C',
      rollNo: '1015',
      profilePic: '/placeholder.svg',
      grades: { test1: 'A++', test2: 'A+', test3: 'A++', quarterly: 'A++', halfYearly: 'A++', annually: 'A++' }
    }
  ]
  export type Subject = {
    subject_id: string;
    subject_name: string;
  };
const ITEMS_PER_PAGE = 10

export default function AdvancedStudentResultsTable() {
  const router = useRouter()
    const [isAddExamReportDialogOpen, setIsAddExamReportDialogOpen] = useState(false);
    const [studentRollNumber, setStudentRollNumber] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [examSubjects, setExamSubjects] = useState<Subject[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
  
    const handleAddExamReport = async () => {
      setIsAddExamReportDialogOpen(false);
      // Exam report submission logic here
    };
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      (!selectedClass || student.class === selectedClass) &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [selectedClass, searchQuery])

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)

  const currentStudents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredStudents.slice(start, start + ITEMS_PER_PAGE)
  }, [currentPage, filteredStudents])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedClass, searchQuery])

  const handleTestClick = (studentId: string, testName: string) => {
    router.push(`/students/${studentId}/tests/${testName}`)
  }
  const [userRole, setUserRole] = useState<string | null>(null);
  

  useEffect(() => {
    // Retrieve the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);
  const calculateOverallPercentage = (grades: Student["grades"]) => {
    const gradeMapping: { [key: string]: number } = {
      "A++": 95, "A+": 90, "A": 85, "B+": 80, "B": 75, "C": 65, "D": 55, "F": 40
    }

    const gradeValues = Object.values(grades).map(grade => gradeMapping[grade] || 0)
    const average = gradeValues.reduce((acc, curr) => acc + curr, 0) / gradeValues.length

    return Math.round(average) + "%"
  }

  return (
    <div className="space-y-4">
         <div  >
        <CardHeader className="p-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">Exam Report Cards</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Manage student exam reports and teacher evaluations here.
              </CardDescription>
            </div>
            <Dialog open={isAddExamReportDialogOpen} onOpenChange={setIsAddExamReportDialogOpen}>
              <DialogTrigger asChild>
               
                {userRole === "admin" || userRole ==="teacher"  && (
         <Button onClick={() => setIsAddExamReportDialogOpen(true)}>
          Add Exam Report
       </Button>
      )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add Exam Report</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the student's exam report below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentName" className="text-left">Student Name</Label>
                    <Input id="studentName" placeholder="Enter Student Name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentRollNumber" className="text-left">Roll Number</Label>
                    <Input
                      id="studentRollNumber"
                      placeholder="Enter Roll Number"
                      className="col-span-3"
                      value={studentRollNumber}
                      onChange={(e) => setStudentRollNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentEmail" className="text-left">Student Email</Label>
                    <Input
                      id="studentEmail"
                      placeholder="Enter Email"
                      className="col-span-3"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="examSubject" className="text-left">Select Subject</Label>
                    <Select value={selectedSubjectId} onValueChange={(value) => setSelectedSubjectId(value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {examSubjects.map((subject) => (
                            <SelectItem key={subject.subject_id} value={subject.subject_id}>
                              {subject.subject_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="marksObtained" className="text-left">Marks Obtained</Label>
                    <Input id="marksObtained" placeholder="Enter Marks" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalMarks" className="text-left">Total Marks</Label>
                    <Input id="totalMarks" placeholder="Enter Total Marks" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="examStatus" className="text-left">Exam Status</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Passed">Passed</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                          <SelectItem value="Reappearing">Reappearing</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddExamReport}>
                    Save Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </div>
      <div className="flex items-center justify-between">
        {/* <h2 className="text-xl font-bold">Student Results</h2> */}
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value) => setSelectedClass(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10A">Class 10A</SelectItem>
              <SelectItem value="10B">Class 10B</SelectItem>
              <SelectItem value="10C">Class 10C</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[200px]"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className='bg-gray-200'>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Test 1</TableHead>
              <TableHead>Test 2</TableHead>
              <TableHead>Test 3</TableHead>
              <TableHead>Quarterly</TableHead>
              <TableHead>Half Yearly</TableHead>
              <TableHead>Annually</TableHead>
              <TableHead>Overall %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
  <Link href={`/student-reports/${student.rollNo}`} className="flex flex-row items-center space-x-2 hover:text-primary">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt={student.name} />
      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div>
      <div className="font-medium">{student.name}</div>
    </div>
  </Link>
</TableCell>
                <TableCell>{student.class}</TableCell>
                {Object.entries(student.grades).map(([testName, grade]) => (
                  <TableCell 
                    key={testName} 
                    className="cursor-pointer  hover:bg-gray-100"
                    onClick={() => handleTestClick(student.id, testName)}
                  >
                    {grade}
                  </TableCell>
                ))}
                <TableCell className="font-bold text-left">
                  {calculateOverallPercentage(student.grades)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div>
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length} students
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
