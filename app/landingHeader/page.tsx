"use client";

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import ImageHeader from '../../public/NEURO_admin.png'
import ImageHeadetwo from '../../public/NEURO_assment.png'
import { useEffect, useRef } from "react"
import gsap from "gsap";

export default function BrightwheelHero() {
    const firstImageRef = useRef<HTMLImageElement | null>(null);
  const secondImageRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    // Floating animation for first image (faster)
    gsap.to(firstImageRef.current, {
      y: -15, // Move up more
      duration: 1.5, // Faster animation
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  
    // Floating animation for second image (faster)
    gsap.to(secondImageRef.current, {
      y: 15, // Move down more
      duration: 1.5, // Faster animation
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
  
  return (
<div className="bg-gradient-to-r from-[#00c9ea] via-[#0072ff] to-[#00c9ea] min-h-screen">

 

      {/* Hero Section */}
      <div className="container mx-auto px-10 pt-12 pb-20 md:pt-16 md:pb-24 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-xl">
          <p className="text-[#014357] font-medium mb-2">#1 Neuro Science based School Management System</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 whitespace-nowrap">
           Welcome to NeuroPi
          </h1>
          <p className="text-white text-xl mb-6">Innovative tools to streamline your day</p>
          

          <div className="space-y-4 mb-6">
            <p className="text-[#014357]  text-md font-semibold mb-4">Let's begin. What's your role?</p>

            <Link
              href="#"
              className="flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#014357" strokeWidth="2" />
                    <path d="M12 8V16M8 12H16" stroke="#014357" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-gray-800"> I want NeuroPi for my school</span>
              </div>
              <ArrowRight className="text-indigo-600" />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L12 15L21 9M5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20Z"
                      stroke="#014357"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-800">My school already uses NeuroPi</span>
              </div>
              <ArrowRight className="text-indigo-600" />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13M16 3.13C17.7699 3.58317 19.0078 5.17797 19.0078 7.005C19.0078 8.83203 17.7699 10.4268 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                      stroke="#014357"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-800"> I am a parent or student</span>
              </div>
              <ArrowRight className="text-indigo-600" />
            </Link>
          </div>

          <p className="text-[#014357]  font-semibold">
          Already use NeuroPi? {" "}
            <Link href="/Auth/login" className="text-white underline font-bold">
            Join your school
            </Link>
          </p>
        </div>

        <div className="hidden md:block relative">
      {/* First Image - Floating Up */}
      <Image
        ref={firstImageRef}
        src={ImageHeader}
        alt="NeuroPi app screenshot"
        className="object-cover h-[60vh] w-auto"
      />

      {/* Overlapping Second Image - Floating Down */}
      <Image
        ref={secondImageRef}
        src={ImageHeadetwo}
        alt="NeuroPi app screenshot"
        className="absolute bottom-[-30%] right-0 object-cover h-[50vh] w-auto z-10"
      />
    </div>

      </div>

 
    </div>
  )
}

