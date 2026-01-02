import React from "react";
import Image from "next/image";
import logo from "../public/Neuro pi_TEXT_11zon.jpg";

type CustomLogoProps = {
  height?: number;
  width?: number;
  className?: string;
};

// Match Tailwind spacing scale: 1 => 4px.
const SIZE_SCALE = 4;

const CustomLogo = ({ height = 14, width = 26, className }: CustomLogoProps) => {
  const pixelHeight = height * SIZE_SCALE;
  const pixelWidth = width * SIZE_SCALE;

  return (
    <div className={`relative ${className || ""}`} style={{ height: pixelHeight, width: pixelWidth }}>
      <Image
        src={logo}
        alt="logo"
        fill
        className="object-contain"
        sizes={`${pixelWidth}px`}
        priority
      />
    </div>
  );
};

export default CustomLogo;
