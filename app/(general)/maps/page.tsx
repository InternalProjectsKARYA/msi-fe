"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

const indiaGeoUrl = "/india-states.json";

const AnimatedIndiaMap = () => {
  const locations = [
    { name: "Delhi", coordinates: [77.209, 28.6139] },
    { name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] },
    { name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { name: "Hyderabad", coordinates: [78.4867, 17.3850] },
  ];

  // Create connections between cities
  const connections = locations.reduce((acc, location, index) => {
    if (index < locations.length - 1) {
      acc.push({
        from: location.coordinates,
        to: locations[index + 1].coordinates,
      });
    }
    return acc;
  }, []);

  const AnimatedLine = ({ from, to }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 1 ? 0 : prev + 0.02));
      }, 50);
      return () => clearInterval(timer);
    }, []);

    // Calculate control point for the curve
    const controlPoint = [
      (from[0] + to[0]) / 2,
      ((from[1] + to[1]) / 2) - 5 // Offset to create a curve
    ];

    // Create the path
    const curve = `M ${from[0]} ${from[1]} Q ${controlPoint[0]} ${controlPoint[1]} ${to[0]} ${to[1]}`;

    return (
      <motion.path
        d={curve}
        fill="none"
        stroke="rgba(0, 153, 255, 0.5)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    );
  };

  const DotPattern = () => (
    <pattern
      id="dotPattern"
      width={10}
      height={10}
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <circle cx={1} cy={1} r={0.5} fill="#888" fillOpacity={0.2} />
    </pattern>
  );

  return (
    <div className=" bg-white dark:bg-neutral-800 w-full min-h-screen">
      <div className="max-w-7xl mx-auto text-center mt-2">
        <motion.h1 
          className="font-bold text-4xl text-black mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          School{" "}
          <span className="text-neutral-400">
            {"Branches".split("").map((char, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        <motion.p 
          className="text-sm text-neutral-500 max-w-2xl mx-auto  py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
                Discover our school's extensive branch network across key cities, making
                education accessible to everyone.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <svg width="100%" height="100%" className="absolute inset-0">
          <DotPattern />
        </svg>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [80, 22]
          }}
        >
          <defs>
            <DotPattern />
          </defs>
          <rect
            x={0}
            y={0}
            width="100%"
            height="100%"
            fill="url(#dotPattern)"
          />
     <Geographies geography={indiaGeoUrl}>
  {({ geographies }) =>
    geographies
      ? geographies.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#f0f0f0"
            stroke="#888"
            strokeWidth={0.5}
          />
        ))
      : console.error("Failed to load geographies")
  }
</Geographies>

          {/* Render location markers */}
          {locations.map(({ name, coordinates }) => (
            <motion.g
              key={name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Marker coordinates={coordinates}>
                <circle r={4} fill="#0099ff" />
                <motion.circle
                  r={8}
                  fill="#0099ff"
                  opacity={0.3}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "8px",
                    fill: "#333",
                  }}
                >
                  {name}
                </text>
              </Marker>
            </motion.g>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default AnimatedIndiaMap;

