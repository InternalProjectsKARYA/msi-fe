"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Gift } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const wishesData = [
  {
    dateCategory: "Today",
    wishes: [
      {
        name: "Muskaan Md",
        occasion: "Today's her Birthday",
        imageUrl: "/placeholder.svg",
        variant: "bg-amber-100",
        pattern: "gift",
      },
      {
        name: "Charlotte Sim",
        occasion: "Today's Work Anniversary",
        imageUrl: "/placeholder.svg",
        variant: "bg-emerald-100",
        pattern: "gift",
      },
      {
        name: "Shivam anuja",
        occasion: "Today's her Birthday",
        imageUrl: "/placeholder.svg",
        variant: "bg-pink-100",
        pattern: "gift",
      },
      {
        name: "Charlotte Sim",
        occasion: "Today's Work Anniversary",
        imageUrl: "/placeholder.svg",
        variant: "bg-emerald-100",
        pattern: "gift",
      },
    ],
  },
  {
    dateCategory: "Yesterday",
    wishes: [
      {
        name: "Shivam anuja",
        occasion: "Work Anniversary - 12 Jan",
        imageUrl: "/placeholder.svg",
        variant: "bg-pink-100",
        pattern: "gift",
      },
      {
        name: "Shivam anuja",
        occasion: "Work Anniversary - 12 Jan",
        imageUrl: "/placeholder.svg",
        variant: "bg-pink-100",
        pattern: "gift",
      },
 
    ],
  },
  {
    dateCategory: "Earlier This Month",
    wishes: [
      {
        name: "Charlotte Sim",
        occasion: "Work Anniversary - 10 Jan",
        imageUrl: "/placeholder.svg",
        variant: "bg-amber-100",
        pattern: "gift",
      },
    ],
  },
]

// Confetti component for decorative elements
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: -20,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: `calc(${Math.random() * 100}vw - 20px)`,
            y: `calc(${Math.random() * 100}vh - 20px)`,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          <div
            className={`w-2 h-2 rounded-sm rotate-${Math.random() * 360} ${
              ["bg-blue-400", "bg-red-400", "bg-yellow-400", "bg-green-400"][Math.floor(Math.random() * 4)]
            }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

const WishCard = ({ name, occasion, imageUrl, variant, pattern }) => {
  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 3h2v2H3V3zm4 0h2v2H7V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3z' fill='rgba(0,0,0,0.1)'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
  }

  return (
    <motion.div
      className="flex bg-white rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-16 relative ${variant}`} style={patternStyle}>
        <Gift className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500/20" />
      </div>
      <div className="flex items-center justify-between flex-1 p-4">
        <div className="flex items-center gap-4">
          <div className="relative rounded-full overflow-hidden border-2 border-gray-100">
          <Avatar className=" w-14 h-14">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{occasion}</p>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Send Wish</button>
      </div>
    </motion.div>
  )
}

export default function WishesDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  ">
        <div className="bg-white rounded-xl shadow-sm p-8 relative overflow-hidden">
          <Confetti />

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-2xl font-semibold text-gray-900">Birthdays & Anniversaries</h1>
           
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {wishesData.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                  {section.dateCategory}
                </div>
                <div className="grid gap-3">
                  {section.wishes.map((wish, index) => (
                    <WishCard key={index} {...wish} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

