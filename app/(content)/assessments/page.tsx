"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_assment.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";


export default function AssessmentSection() {
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
          Assessment in a School Management System
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅The Assessment Module in a School Management System (SMS) enables schools to efficiently evaluate student performance through automated tests, quizzes, assignments, and grading systems.</li>
            <li>✅ It simplifies the assessment process for teachers while providing students with clear progress tracking.</li>
            <li>✅ <span className="font-bold">Online & Offline Assessments:</span> Supports various formats like MCQs, descriptive tests, and project-based evaluations.</li>
            <li>✅ <span className="font-bold">Automated Grading System:</span> Instantly evaluates objective questions, reducing manual effort. </li>
            <li>✅ <span className="font-bold">Customizable Question Banks:</span> Teachers can create and manage question sets for different subjects and difficulty levels.</li>
          </ul>
        

        
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82]  h-[60vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover h-[65vh]"
          />
        </div> 
        
      </div>
    </section>
  );
}
