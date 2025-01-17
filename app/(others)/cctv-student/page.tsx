"use client";

import React from "react";
import ReactPlayer from "react-player";
 
const CCTV_URL = "http://your-cctv-ip/live-stream-url";  

export default function FullScreenCCTV() {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full h-full">
        <h1 className=" flex items-center justify-center my-2  text-black text-2xl font-bold">
          🎥 CCTV Live Monitoring
        </h1>
        <ReactPlayer
          url={CCTV_URL}
          playing
          controls
          width="100%"
          height="80vh"
          className="object-cover"
        />
      </div>
    </div>
  );
}
