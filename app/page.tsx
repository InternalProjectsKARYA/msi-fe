"use client";
 
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";


const CountdownEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [showCircle, setShowCircle] = useState(true);
  const particles = useRef<any[]>([]);
  
  // Audio refs for countdown sounds
  const threeSound = useRef<HTMLAudioElement | null>(null);
  const twoSound = useRef<HTMLAudioElement | null>(null);
  const oneSound = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
    router.push('/myschoolitaly')
    }, 6000);
  }, []);

  const baseColor = "#ffffff";
  const activeColor = "#ffffff";
  const countdownColor = "#ffffff";  

  const randomNumBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  class Particle {
    rFriction: number;
    rAlpha: number;
    r: number;
    angleFriction: number;
    angleAlpha: number;
    angle: number;
    opacity: number;
    x: number = 0;
    y: number = 0;

    constructor() {
      this.rFriction = randomNumBetween(0.95, 1.01);
      this.rAlpha = randomNumBetween(0, 5);
      this.r = window.innerHeight / 4;

      this.angleFriction = randomNumBetween(0.97, 0.99);
      this.angleAlpha = randomNumBetween(1, 2);
      this.angle = randomNumBetween(0, 360);

      this.opacity = randomNumBetween(0.1, 1);
    }

    update() {
      this.rAlpha *= this.rFriction;
      this.r += this.rAlpha;

      this.angleAlpha *= this.angleFriction;
      this.angle += this.angleAlpha;

      this.x = window.innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
      this.y = window.innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

      this.opacity -= 0.003;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
      ctx.closePath();
    }
  }

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
  };

  const createRing = () => {
    for (let i = 0; i < 1000; i++) { // Increased particle count
      particles.current.push(new Particle());
    }
  };

  const renderParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let now, delta;
    let then = Date.now();
    const interval = 1000 / 60;

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < interval) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        particles.current[i].update();
        particles.current[i].draw(ctx);
        if (particles.current[i].opacity < 0) particles.current.splice(i, 1);
      }

      then = now - (delta % interval);
    };

    requestAnimationFrame(frame);
  };

  const countStart = () => {
    if (isCounting) return;
    setIsCounting(true);
    setShowCircle(true);
    
    // Start with full circle (0 offset)
    setProgress(100);
    
    // Animate the progress from 100 to 0 over 3 seconds
    gsap.fromTo(
      "#progress-indicator",
      { strokeDashoffset: 0 },
      {
        strokeDashoffset: 879.65,
        duration: 3,
        ease: "linear"
      }
    );

    const texts = document.querySelectorAll("#countdown span");
    
    // Enhanced animation options with straight appearance (no rotation)
    const countDownOption = { 
      opacity: 1, 
      scale: 1, 
      duration: 0.6, 
      ease: "elastic.out(1, 0.5)" // More bouncy animation
    };

    // First number animation - straight appearance
    gsap.fromTo(texts[0], 
      { opacity: 0, scale: 7 }, 
      {
        ...countDownOption,
        onStart: () => {
          // Play the "three" sound
          if (threeSound.current) {
            threeSound.current.currentTime = 0;
            threeSound.current.play().catch(e => console.log("Audio play error:", e));
          }
        },
      }
    );

    // Second number animation - straight appearance
    gsap.fromTo(texts[1], 
      { opacity: 0, scale: 7 }, 
      {
        ...countDownOption,
        delay: 1,
        onStart: () => {
          gsap.to(texts[0], { opacity: 0, scale: 0.5, duration: 0.3 });
          // Play the "two" sound
          if (twoSound.current) {
            twoSound.current.currentTime = 0;
            twoSound.current.play().catch(e => console.log("Audio play error:", e));
          }
        },
      }
    );

    // Third number animation - straight appearance
    gsap.fromTo(texts[2], 
      { opacity: 0, scale: 7 }, 
      {
        ...countDownOption,
        delay: 2,
        onStart: () => {
          gsap.to(texts[1], { opacity: 0, scale: 0.5, duration: 0.3 });
          // Play the "one" sound
          if (oneSound.current) {
            oneSound.current.currentTime = 0;
            oneSound.current.play().catch(e => console.log("Audio play error:", e));
          }
        },
      }
    );

    // Final explosion animation
    gsap.to("#ring", {
      duration: 1,
      delay: 3,
      scale: 1.2,
      opacity: 0,
      onStart: () => {
        createRing();
        gsap.to(texts[2], { opacity: 0, scale: 0.5, duration: 0.3 });
      },
      onComplete: () => {
        setShowCircle(false);
        setIsCounting(false);
      },
    });
  };

  useEffect(() => {
    initCanvas();
    renderParticles();
    
    // Auto-start the countdown
    setTimeout(() => {
      countStart();
    }, 500);

    window.addEventListener("resize", initCanvas);
    window.addEventListener("click", countStart);

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("click", countStart);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* SVG Circular Progress Bar - Larger size */}
      {showCircle && (
        <svg id="ring" className="absolute" width="300" height="300">
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke={baseColor}
            strokeWidth="4"
            strokeOpacity="0.2"
            fill="none"
          />
          
          {/* Animated progress circle */}
          <circle
            id="progress-indicator"
            cx="150"
            cy="150"
            r="140"
            stroke={isCounting ? activeColor : baseColor}
            strokeWidth="15"
            fill="none"
            strokeDasharray="879.65"
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90, 150, 150)"
            className="transition-all duration-100"
          />
        </svg>
      )}

      {/* Countdown Numbers - Larger size */}
      <div id="countdown" className="absolute flex items-center justify-center">
        <span className="absolute text-9xl font-bold opacity-0 scale-150" style={{ color: countdownColor }}>3</span>
        <span className="absolute text-9xl font-bold opacity-0 scale-150" style={{ color: countdownColor }}>2</span>
        <span className="absolute text-9xl font-bold opacity-0 scale-150" style={{ color: countdownColor }}>1</span>
      </div>
    </div>
  );
};

export default CountdownEffect;