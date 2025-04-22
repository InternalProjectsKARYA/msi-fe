"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_admin.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function FeaturesSection() {
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
    <section className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
          Elevate School Management with NeuroPi
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Leverage neuroscience for enhanced assessments: Tailor evaluations to student needs using brain-based insights</li>
            <li>✅ Automate daily operations: Seamlessly handle attendance, admissions, and schedules.</li>
            <li>✅ Simplify finances: Streamline fee collection and track budgets with ease.</li>
            <li>✅ Connect everyone: Enable real-time communication for staff, parents, and students.</li>
            <li>✅ Empower educators: Provide tools for lesson planning and student progress tracking.</li>
            <li>✅ Unify multi-campus control: Manage all locations from one intuitive platform.</li>
          </ul>
          


        </div>

        {/* Right Content (Image) */}
        <div className="md:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82] h-[60vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover "
          />
        </div> 
      </div>
    </section>
  );
}
