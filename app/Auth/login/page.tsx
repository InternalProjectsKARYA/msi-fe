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
import MyImage from '../../../public/sclnew.jpg';
import styles from './login.module.css';
import axiosInstance from '@/lib/axiosInstance';
import { useAuthContext } from '@/lib/AuthProvider';
import { useToast } from "@/components/ui/use-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loading from "@/app/loading/page";
import RunningBoy from "@/app/RunningBoy/page";
import { toast } from 'sonner';
import { Toaster } from 'sonner';


export default function ForgotPassword() {
  const router = useRouter();
 

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
      toast.error('Please enter your email');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    router.push('/admin-dashboard');
    toast.success('Login Successful');
    setLoading(false); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <Card className="relative z-10 flex w-[60%] h-[60vh] flex-col md:flex-row">
        {/* Image Column */}
        <div className="w-full md:w-[60%] h-full overflow-hidden">
          <Image
            src={MyImage}
            alt="Description of the image"
            layout="fit"
            className="w-full h-full rounded animateSlideTop"
            style={{ borderRadius: '10px' }}
          />
          <div className={`${styles.animateSlideIn} w-full md:w-[60%] absolute top-10 md:top-10 lg:top-10 flex flex-col items-center justify-start text-center`}>
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-white">
              Welcome to School Portal
            </h1>
            <p className="text-lg md:text-lg lg:text-2xl font-semibold text-white mt-2">
              Sign in to access your dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center w-full md:w-[40%] p-3 md:p-5">
          <div className={`${styles.animateSlideIn} w-full`}>
            <CardHeader className="text-center pt-3 md:pt-4">
              <h1 className="text-xl md:text-3xl font-bold mb-2">Login</h1>
            </CardHeader>

            <CardContent className="p-2 md:p-4">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} onKeyDown={handleKeyDown}>
                <div className="grid w-full items-center gap-3 md:gap-4">
                  <div className="flex flex-col space-y-1">
                    <Input
                      id="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}  
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}  
                      className="absolute right-3 top-1 text-gray-500"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}  
                    </button>
                    <Button
                      variant="link"
                      className="text-right text-xs md:text-sm self-end"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/Auth/forgotpassword');
                      }}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </div>
                <Button className="w-full hover:bg-opacity-90 py-2 text-sm md:text-base py-4 mt-4" onClick={handleLogin}>
                  {loading ? <Loading /> : "Continue"}
                </Button>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
      <RunningBoy />
      <Toaster />
    </div>
  );
}
