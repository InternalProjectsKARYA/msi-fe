"use client";

const WaveDesign = () => {
  return (
    <div className="flex w-full absolute">
      {/* Geometric Shapes */}
      <div className="top-0 left-0 right-0 bottom-0 z-0">
        {/* Circles */}
        <div className="absolute top-[-20%] left-[5%] w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute top-[15%] right-[10%] w-6 h-6 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[25%] w-6 h-6 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-[5%] right-[5%] w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute top-[5%] right-[20%] w-10 h-10 border-2 border-white rounded-full"></div>
        <div className="absolute top-[-15%] left-[40%] w-12 h-12 border-2 border-white rounded-full"></div>

        {/* Triangles */}
        <div
          className="absolute top-[10%] left-[40%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-white"
        ></div>
        <div
          className="absolute bottom-[10%] left-[35%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-white"
        ></div>
        <div
          className="absolute top-[25%] right-[15%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-white"
        ></div>

        {/* Squares */}
        <div className="absolute top-[10%] left-[10%] w-6 h-6 border-2 border-white"></div>
        <div className="absolute bottom-[15%] right-[15%] w-8 h-8 border-2 border-white"></div>
        <div className="absolute bottom-[5%] left-[5%] w-4 h-4 border-2 border-white"></div>

        {/* Additional Shapes */}
        {/* Hexagon */}
        <div
          className="absolute top-[5%] left-[50%] w-10 h-10 border-2 border-white transform rotate-45"
        ></div>

        {/* Star Shape */}
        <div
          className="absolute bottom-[20%] right-[30%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-white transform rotate-45"
        ></div>
      </div>
    </div>
  );
};

export default WaveDesign;
