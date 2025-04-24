"use client"
import Image from "next/image";
import img from "../../../public/modify/NEURO_chat.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";




export default function CommunicationSection() {
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
          Communication in a School Management System
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅Effective communication is a crucial feature of a School Management System (SMS) that bridges the gap between teachers, students, parents, and administrators.</li>
            <li>✅ The system provides multiple channels for seamless interaction, including instant messaging, email notifications, in-app announcements, and push notifications.</li>
            <li>✅ <span className="font-bold">Encrypted Collaboration Tools: </span>Ensure safe group discussions and planning with advanced security for all users.</li>
            <li>✅ <span className="font-bold">Secure Real-Time Messaging: </span> Foster trust and timely support with instant, private communication between teachers, parents, and students.</li>
            <li>✅ <span className="font-bold">Multimedia Engagement: </span>Enhance learning and emotional connection by sharing photos, videos, and interactive content.</li>
            <li>✅ <span className="font-bold">Centralized Communication Hub:</span> Streamline all interactions in one secure platform for efficiency and accessibility.</li>
          </ul>
        

        
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2 flex justify-center hidden md:block relative bg-[#e9f5fc82] h-[70vh]">
          <Image 
            src={img} // Make sure to put your image in the public folder or use a proper path
            ref={firstImageRef}
            alt="Dashboard UI"
            className="rounded-lg object-cover h-[80vh]"
          />
        </div> 
        
      </div>
    </section>
  );
}
