"use client";
import { FallingTextAnimation } from "@/components/ui/falling-text-animation";
import { SparklesCore } from "@/components/ui/sparkles";
import React from "react";
 

export default function SparklesPreview() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
      <div className="md:text-2xl text-sm lg:text-3xl font-bold text-center text-white  relative z-20" >
        <FallingTextAnimation text="MySchoolITALY" /> 
      </div>
      <div className="w-[90rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-2/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/4" />

        {/* Core component */}
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
