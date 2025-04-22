"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import MyImage from '../../../public/schoollogin.jpg';
import styles from './login.module.css';
import axiosInstance from '@/lib/axiosInstance';
import { useAuthContext } from '@/lib/AuthProvider';
import { useToast } from "@/components/ui/use-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loading from "@/app/(others)/loading/page";
import RunningBoy from "@/app/RunningBoy/page";
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { AuroraBackgroundDemo } from "@/app/(others-withoutlayout)/aniamtion-bg/page";
import { Checkbox } from "@/components/ui/checkbox";
import BackgroundGradientAnimationDemo from "@/app/(others)/bg-gradient/page";


export default function ForgotPassword() {
  const router = useRouter();
 
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleKeyDown = (event: { keyCode: number; preventDefault: () => void; }) => {
    if (event.keyCode === 13) {  
      event.preventDefault();  
      handleLogin();  
    }
  };

  const handleLogin = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    } else if (!password) {
      toast.error("Please enter a password");
      return;
    }
  
    // Password Check
    if (password !== "School@55") {
      toast.error("Invalid Password");
      return;
    }
  
    // Role-based authentication
    const roles: { [key: string]: string } = {
      "admin@gmail.com": "admin",
      "student@gmail.com": "student", 
      "teacher@gmail.com": "teacher",
      "librarian@gmail.com": "librarian",
      "accountant@gmail.com": "accountant",
    };
  
    const userRole = roles[email];
  
    if (!userRole) {
      toast.error("Invalid email or role not assigned");
      return;
    }
  
    // Store credentials in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", userRole);
  
    toast.success("Login Successful");
  
    // Redirect based on role
    switch (userRole) {
      case "admin":
        router.push("/admin-dashboard");
        break;
      case "student":
        router.push("/student-dashboard");
        break;
      case "teacher":
        router.push("/teacher-dashboard");
        break;
      case "librarian":
        router.push("/library");
        break;
      case "accountant":
        router.push("/feeDetails");
        break;
      default:
        router.push("/");
    }
  };
  

  return (
    <> 
        <div className="absolute inset-0 z-0">
        {/* <AuroraBackgroundDemo /> */}
        {/* <AnimatedBackground /> */}
        <BackgroundGradientAnimationDemo />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
    
     <Card className="relative z-10 flex w-full sm:w-[74%] md:w-[74%] lg:w-[74%] xl:w-[74%]   h-[70vh] sm:h-[75vh] md:h-[75vh] flex-col md:flex-row overflow-hidden">
       {/* Image Column - Hidden on mobile and tablet, visible on larger screens */}
       <div className="hidden lg:block relative w-full lg:w-[60%] h-full overflow-hidden z-50">
         <Image
           src={MyImage}
           alt="School background"
           layout="fill"
           objectFit="cover"
           className="rounded-l-lg animateSlideTop"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/0 rounded-l-lg"></div>
         <div className="absolute top-1/5 pt-5 left-1/2 transform -translate-x-1/2  flex flex-col items-center justify-center text-center space-y-4">
           <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white whitespace-nowrap animateSlideIn">
           NeuroPi
           </h1>
           <p className="text-sm lg:text-sm font-semibold text-white mt-2 animateFadeIn">
           Smart solutions for smarter schools.
           {/* Where education meets innovation. */}
</p>

         </div>
       </div>
 
       {/* Login Form - Full width on mobile and tablet, partial width on larger screens */}
       <div className="flex items-center justify-center w-full lg:w-[40%] p-3 sm:p-5 md:p-8">
       {/* <div className="absolute inset-0 z-0">
        <AuroraBackgroundDemo />
      </div> */}
         <div className={`${styles.animateSlideIn} w-full max-w-md`}>
           {/* <CardHeader className="text-center pt-3 sm:pt-4 md:pt-6 lg:hidden">
             <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl font-bold mb-2" > MyschoolITALY</h1>
             <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4">
               Sign in to access your dashboard
             </p>
           </CardHeader> */}
           {/* <div className="relative mb-[0px] z-10 flex justify-center">
                <video
                  ref={videoRef}
                  className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg"
                  muted
                  playsInline
                >
                  <source src="/videos/passwordHidden.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div> */}
           <CardContent className="p-2 sm:p-2 md:p-4">
           <div className="text-center pb-6">
  <h2 className="text-lg sm:text-xl md:text-xl lg:text-4xl font-bold mb-2 lg:block whitespace-nowrap">
    Welcome Back! 👋
  </h2>
  <p className="">Please sign in to your account</p>
 
</div>




         
             <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} onKeyDown={handleKeyDown}>
               <div className="grid w-full items-center gap-3 sm:gap-4 md:gap-4">
                 <div className="flex flex-col space-y-1 z-50">
                   <Input
                     id="email"
                     placeholder="Email address"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="z-50"
                   />
                 </div>
                 <div className="flex flex-col space-y-1 relative z-50">
                   <Input
                     id="password"
                     type={showPassword ? 'text' : 'password'}  
                     placeholder="Password "
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className=" z-50  "
                     onFocus={() => {
                 
                      videoRef.current?.play(); // Start playing the video
                    }}
                    onBlur={() => {
                   
                      if (videoRef.current) {
                        videoRef.current.pause(); // Pause the video
                        videoRef.current.currentTime = 0; // Reset to the beginning
                      }
                    }}
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}  
                     className="absolute right-3 top-2 sm:top-1 md:top-1 text-gray-500 z-50"
                   >
                     {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}  
                   </button>
                 </div>
                 <div className="flex justify-between items-center w-full mx-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="remember-me" />
        <label htmlFor="remember-me" className="text-xs sm:text-xs md:text-base">
          Remember Me
        </label>
      </div>

      <Button
        variant="link"
        className="text-right text-xs sm:text-xs md:text-base self-end"
        onClick={(e) => {
          e.preventDefault();
          router.push("/Auth/forgotpassword");
        }}
      >
        Forgot Password?
      </Button>
    </div>
               </div>
               <Button 
                 className="w-full hover:bg-opacity-90 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 md:mt-8" 
                 onClick={handleLogin}
               >
                 {loading ? <Loading /> : "LOGIN"}
               </Button>
             </form>
           </CardContent>
         </div>
       </div>
     </Card>
     <div className="    py-4 ">
     
        
        <div className="  mx-auto  ">
          <div className="flex flex-wrap space-x-6 text-xs dark:text-black text-gray-500 whitespace-nowrap  ">
            <p>* NOTE:</p>
            <p><strong>Admin:</strong> admin@gmail.com</p>
            <p><strong>Teacher:</strong> teacher@gmail.com</p>
            <p><strong>Student:</strong> student@gmail.com</p>
            <p><strong>Librarian:</strong> librarian@gmail.com</p>
            <p><strong>Accountant:</strong> accountant@gmail.com</p>
            <p><strong>🔒 Common Password:</strong> <span className="font-mono">School@55</span></p>
          </div>
        </div>
      </div>
     {/* <RunningBoy /> */}
     <Toaster />
   </div>
   </>
  
)
}

