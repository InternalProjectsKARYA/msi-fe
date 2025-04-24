"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_payroll.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function PayrollSection() {
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
      <div className="flex lg:flex-row md:flex-wrap items-center gap-10 lg:flex-nowrap">
        
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
          Payroll Management in a School Management System
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅The Payroll Module in a School Management System (SMS) automates and streamlines the salary processing of teaching and non-teaching staff, ensuring accuracy, compliance, and efficiency in payroll management.</li>
            <li>✅ <span className="font-bold">Automated Salary Calculation:</span> Computes salaries based on working hours, leaves, deductions, and allowances.</li>
            <li>✅ <span className="font-bold">Tax & Deductions Management:</span> Handles income tax, provident funds, and other statutory deductions.</li>
            <li>✅ <span className="font-bold">Payslip Generation: </span>Generates detailed salary slips for employees with breakdowns of earnings and deductions.</li>
            <li>✅ <span className="font-bold">Leave & Attendance Integration:</span> Syncs with the attendance system to calculate pay based on leaves and working days. </li>
            <li>✅ <span className="font-bold">Multi-Payment Methods:</span> Supports bank transfers, UPI, and other payment modes.</li>
          </ul>
        

        
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82] h-[70vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover h-[75vh]"
          />
        </div> 
        
      </div>
    </section>
  );
}
