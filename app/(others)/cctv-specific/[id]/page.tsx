"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactPlayer from "react-player";
import { ArrowLeft } from 'lucide-react';

// 🔹 CCTV Camera URLs (Map for Easy Retrieval)
const cctvCameraUrls: { [key: string]: string } = {
  "1": "http://your-cctv-ip-1/live-stream-url",
  "2": "http://your-cctv-ip-2/live-stream-url",
  "3": "http://your-cctv-ip-3/live-stream-url",
  "4": "http://your-cctv-ip-4/live-stream-url",
  "5": "http://your-cctv-ip-5/live-stream-url",
};

export default function CCTVSpecific() {
  const { id } = useParams();

  // 🔹 Get URL based on ID (Fallback if not found)
  const cctvUrl = cctvCameraUrls[id as string] || "http://default-cctv-stream-url";

  return (
    <div className=" bg-gray-300 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link href="/cctv" className="inline-flex items-center text-black  ">
            <ArrowLeft className="mr-2" size={20} />
            Back to CCTV List
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-black">🎥 CCTV {id} Live Monitoring</h1>
        <div className="bg-black rounded-lg overflow-hidden shadow-lg">
          <ReactPlayer
            url={cctvUrl}
            playing
            controls
            width="100%"
            height="80vh"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

