"use client";

import React, { useState } from "react";

interface RunningBoyProps {
  className?: string;
}

const RunningBoy: React.FC<RunningBoyProps> = ({ className }) => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setError("Failed to load video. Please try again later.");
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`fixed bottom-0 w-full h-[10vh] overflow-hidden ${className}`}>
      <video
        className="absolute h-full w-full"
        src="/videos/boybg.webm" 
        autoPlay
        loop
        muted
        playsInline
        onError={handleError}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          animation: "moveLeftToRight 20s linear infinite",
        }}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      <style jsx>{`
        @keyframes moveLeftToRight {
          from {
            transform: translateX(-50%); /* Start fully off-screen to the left */
          }
          to {
            transform: translateX(50%); /* End fully off-screen to the right */
          }
        }

        video {
          animation-timing-function: linear; /* Ensures constant speed */
        }
      `}</style>
    </div>
  );
};

export default RunningBoy;
