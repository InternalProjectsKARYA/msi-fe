"use client";

import { useRouter } from "next/navigation";
import React from "react";
import ReactPlayer from "react-player";

// 🔹 Define CCTV URLs at the top
const cctvCameras = [
  { id: 1, name: "CCTV 1", url: "http://your-cctv-ip-1/live-stream-url" },
  { id: 2, name: "CCTV 2", url: "http://your-cctv-ip-2/live-stream-url" },
  { id: 3, name: "CCTV 3", url: "http://your-cctv-ip-3/live-stream-url" },
  { id: 4, name: "CCTV 4", url: "http://your-cctv-ip-4/live-stream-url" },
  { id: 5, name: "CCTV 5", url: "http://your-cctv-ip-5/live-stream-url" },
  { id: 6, name: "CCTV 6", url: "http://your-cctv-ip-6/live-stream-url" },
  { id: 7, name: "CCTV 7", url: "http://your-cctv-ip-7/live-stream-url" },
  { id: 8, name: "CCTV 8", url: "http://your-cctv-ip-8/live-stream-url" },
  { id: 9, name: "CCTV 9", url: "http://your-cctv-ip-9/live-stream-url" },
  { id: 10, name: "CCTV 10", url: "http://your-cctv-ip-10/live-stream-url" },
  { id: 11, name: "CCTV 11", url: "http://your-cctv-ip-11/live-stream-url" },
  { id: 12, name: "CCTV 12", url: "http://your-cctv-ip-12/live-stream-url" },
  { id: 13, name: "CCTV 13", url: "http://your-cctv-ip-13/live-stream-url" },
  { id: 14, name: "CCTV 14", url: "http://your-cctv-ip-14/live-stream-url" },
  { id: 15, name: "CCTV 15", url: "http://your-cctv-ip-15/live-stream-url" },
];


export default function MultiCCTV() {
  const router = useRouter();

  // 🟢 Function to handle navigation to CCTV-specific page
  const handleCCTVClick = (id: number) => {
    router.push(`/cctv-specific/${id}`);
  };

  return (
    <div className="p-6 bg-gray-300">
      <h1 className="text-black text-3xl font-bold text-center mb-6">
        CCTV Monitoring
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cctvCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-black p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleCCTVClick(camera.id)}
          >
            <h2 className="text-white text-lg font-semibold mb-2">{camera.name}</h2>
            <ReactPlayer
              url={camera.url}
              playing
              controls
              width="100%"
              height="200px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}