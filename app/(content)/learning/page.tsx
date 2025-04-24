"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_class.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";


export default function LearningSection() {
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
          Learning Module in a School Management System
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ The learning module in a School Management System (SMS) enhances the educational experience by providing a structured and interactive platform for students and teachers.</li>
            <li>✅ includes features such as digital classrooms, lesson planning, e-learning materials, assignments, and assessments to facilitate seamless knowledge transfer.</li>
            <li>✅ With integrated Learning Management System (LMS) capabilities, students can access study materials, submit homework, take online tests, and track their progress in real-time.</li>
            <li>✅ Teachers can create and manage lesson plans, conduct quizzes, and provide feedback efficiently.</li>
            <li>✅ The system also promotes collaborative learning through discussion forums, live video sessions, and AI-powered personalized learning experiences.</li>

          </ul>
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82] h-[80vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover h-[80vh] "
          />
        </div> 
        
      </div>
    </section>
  );
}
