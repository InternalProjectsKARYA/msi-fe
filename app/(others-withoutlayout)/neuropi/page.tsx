"use client";
import { FallingTextAnimation } from "@/components/ui/falling-text-animation";
import { SparklesCore } from "@/components/ui/sparkles";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SparklesPreview() {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const router = useRouter();
  useEffect(()=> {
     setTimeout(() => {
       router.push("/landingPage");
     }, 6500);
  },[])
  useEffect(() => {
    setTimeout(()=> {
      if (textRef.current) {
        const letters = textRef.current.querySelectorAll("span"); // Select each letter
        gsap.fromTo(
          letters,
          { opacity: 0, y: 10 }, // Start position
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05, // Delay between each letter
          }
        );
      }
    },1000)

  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center   overflow-hidden">
            <div className="relative w-80 h-60 mt-10">
        <Image
          src="/whitelogo.png"  
          alt="NeuroPi Logo"
          layout="fill"
          objectFit="contain"  
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:text-2xl text-sm lg:text-3xl font-bold text-center text-white relative z-20">
        <FallingTextAnimation text="NEUROPI" />

        {/* Letter-by-letter Animation */}
        <span ref={textRef} className="text-2xl font-bold text-white">
          {Array.from("Let's join NeuroPi for a revolutionary journey").map((letter, index) => (
            <span key={index} className="inline-block opacity-0">
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </div>

      <div className="w-[90rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-2/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/4" />

        {/* Sparkles Effect */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
