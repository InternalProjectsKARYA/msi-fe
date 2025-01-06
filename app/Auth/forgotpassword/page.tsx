"use client";
import * as React from "react";
import * as z from "zod"; // Import Zod
 
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';  // note: 'next/navigation' for app directory routing
import { Input } from "@/components/ui/input";
import MyImage from '../../../public/password2.png'; 
// import MyImage1 from '../../public/sclnew.jpg';
import { FiCheck, FiX } from "react-icons/fi";

// Inline email validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();

  // UseForm setup with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange", // Enables live validation
  });

  const emailValue = watch("email"); // Watch the email input

  const handleContinue = () => {
    if (isValid) { // Only push if the form is valid
      router.push('/Auth/resetpassword');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 justify-center  ">
        <div style={ {marginLeft:'-30%'}}> 
  <video
          className=" h-40  "
          src="/videos/pencil.mp4" // Path to your video
          autoPlay
          loop
          muted
          playsInline
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
  </div>
      <Card className="flex   p-5">
      <div>
      <Image src={MyImage} alt="Description of the image" width={400} height={200} />
    </div>

    <div className="flex items-left justify-left w-[400px]">
    <div className="flex items-center justify-center">
          <div className={` w-full`}>
            <CardHeader className="text-left">
              <h1 className="text-4xl font-bold">Forgot your <br /> Password?</h1>
              <CardDescription>
                Enter the email address associated with your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(handleContinue)}>
                <div className="grid w-full items-center gap-4 relative">
                  <div className="flex flex-col space-y-1.5 relative">
                    <Input
                      id="email"
                      placeholder="Enter email address"
                      {...register("email")}
                      className={`${errors.email ? 'border-red-500' : 'border-gray-300'} border rounded-md p-2 pr-10`}  
                    />
               
                    {emailValue && (  
                      errors.email ? (
                        <FiX className="absolute right-3 top-1/3 transform -translate-y-1/2 text-red-500" />
                      ) : (
                        <FiCheck className="absolute right-3 top-1/3 transform -translate-y-1/2 text-green-500" />
                      )
                    )}
                  </div>
                </div>

                {/* Continue Button as submit button */}
                <CardFooter className="flex flex-col justify-between space-y-2 mt-4 p-0">
                  <Button type="submit" className="w-full hover:bg-opacity-90"  >
                    Continue
                  </Button>
                  <Button variant="link" className="text-center text-xs" onClick={() => router.push('/Auth/login')}>
                    Back to Sign in
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </div>
        </div>
        </div>
      </Card>
    </div>
  );
}