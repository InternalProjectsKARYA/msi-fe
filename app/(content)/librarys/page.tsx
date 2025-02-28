"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_libriy.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function LibraryLanding() {
    const firstImageRef = useRef<HTMLImageElement | null>(null);
    //const secondImageRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
      // Floating animation for first image (faster)
      gsap.to(firstImageRef.current, {
        y: -15, // Move up more
        duration: 1.5, // Faster animation
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
  },[]);
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
          Library Management in a School Management System
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅The Library Management Module in a School Management System (SMS) helps schools efficiently organize and manage their library resources.</li>
            <li>✅ It automates book cataloging, borrowing, returning, and tracking to streamline operations and enhance accessibility for students and staff.</li>
            <li>✅ <span className="font-bold">Digital Catalog:</span>Digital Catalog: Maintains a searchable database of books, journals, and e-books.</li>
            <li>✅<span className="font-bold">Book Issuing & Returns:</span> Tracks issued books, due dates, and overdue fines.</li>
            <li>✅<span className="font-bold">Student & Staff Access:</span> Allows users to check availability, reserve books, and view borrowing history.</li>
          </ul>
        

        
        </div>

        {/* Right Content (Image) */}
        <div className="md:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82]  h-[60vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover h-[70vh]"
          />
        </div> 
        
      </div>
    </section>
  );
}
