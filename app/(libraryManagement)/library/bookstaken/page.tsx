"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { format } from "date-fns"

interface Book {
  id: string
  title: string
  coverUrl: string
  takenDate: Date
  returnDate: Date
}

const books: Book[] = [
  {
    id: "1",
    title: "The Small-Town Library",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-01-25"),
    returnDate: new Date("2024-01-25"),
  },
  {
    id: "2",
    title: "Apex Time",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-01-22"),
    returnDate: new Date("2024-01-25"),
  },
  {
    id: "3",
    title: "The Cobalt Guitar",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-01-30"),
    returnDate: new Date("2024-02-10"),
  },
  {
    id: "4",
    title: "Shard and the Tomb",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-02-10"),
    returnDate: new Date("2024-02-20"),
  },
  {
    id: "5",
    title: "Shard and the Tomb 2",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-02-12"),
    returnDate: new Date("2024-02-22"),
  },
  {
    id: "6",
    title: "Plague of Fear",
    coverUrl: "/placeholder.svg?height=80&width=60",
    takenDate: new Date("2024-02-15"),
    returnDate: new Date("2024-02-25"),
  },
]

export function BooksTakenGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <Card key={book.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="h-20 w-16 relative rounded overflow-hidden">
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Book taken on</p>
                <p className="font-medium">
                  {format(book.takenDate, "dd MMM yyyy")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Date</p>
                <p className="font-medium">
                  {format(book.returnDate, "dd MMM yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

