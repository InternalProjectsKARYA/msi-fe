"use client"
import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Ensure the loader is vertically centered */
        }

        .loader {
          display: flex;
          justify-content: space-between;
          width: 40px; /* Reduce width to minimize the gap between the circles */
        }

        .loader div {
          width: 8px;
          height: 8px;
          background-color: #ffffff; /* White color for the circles */
          border-radius: 50%;
          animation: grow-shrink 1.5s infinite;
        }

        .loader div:nth-child(1) {
          animation-delay: 0s;
        }

        .loader div:nth-child(2) {
          animation-delay: 0.3s;
        }

        .loader div:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes grow-shrink {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
