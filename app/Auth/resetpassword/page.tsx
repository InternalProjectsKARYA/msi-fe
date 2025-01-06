"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FiCheck, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MyImage from '../../../public/forgot3.jpg';
import axiosInstance from '@/lib/axiosInstance';
import { useToast } from "@/components/ui/use-toast";

export default function SetPassword() {
  const router = useRouter();
  const { toast } = useToast();
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [email, setEmail] = React.useState('');

  // Password validation rules
  const requirements = [
    { label: "At least one lowercase letter", test: /[a-z]/ },
    { label: "At least one uppercase letter", test: /[A-Z]/ },
    { label: "At least one number", test: /[0-9]/ },
    { label: "Minimum 8 characters", test: /.{8,}/ },
  ];

  // Function to check if a requirement is met
  const checkRequirement = (requirement) => requirement.test.test(password);

 

  // Submit handler
  const handleResetPassword = async () => {
    if (password === confirmPassword && requirements.every(checkRequirement)) {
      try {
        const response = await axiosInstance.put(`/reset_password?email=${encodeURIComponent(email)}`, {
          new_password: password,
          confirm_password: confirmPassword,
        });

        if (response.status === 200) {
          toast({
            title: 'Success',
            description: 'Password reset successful. Please log in.',
            variant: 'default',
          });
          router.push('/Auth/login');
        } else {
          toast({
            title: 'Info',
            description: 'Unexpected status code: ' + response.status,
            variant: 'default',
          });
        }
      } catch (error:any) {
        toast({
          title: 'Error',
          description: 'An error occurred: ' + (error.response?.data?.message || error.message),
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Passwords do not match or requirements are not met.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex p-6">
        <div>
          <Image src={MyImage} alt="Forgot password image" className="mt-5" width={450} height={250} />
        </div>
        <div className="flex items-left justify-left w-[400px]">
          <div className="w-full">
            <CardHeader className="flex justify-center text-center pt-5 mb-2">
              <CardTitle className="text-3xl font-bold">New Password</CardTitle>
              <CardDescription className="bg-green-100 text-sm p-4">
                Please enter the new password.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(handleResetPassword)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center space-x-4">
                    <div className="relative flex-1">
                      <Input
                        id="new-password"
                        placeholder="New password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowTooltip(true)}
                        onBlur={() => setShowTooltip(false)}
                        className={`border rounded-md p-2 pr-10 ${errors.newPassword || password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {password && (
                        <span className="absolute right-10 top-1/3 text-gray-500">
                          {requirements.every(checkRequirement) ? <FiCheck className="text-green-500" /> : <FiX className="text-red-500" />}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5 relative">
                    <Input
                      id="confirm-password"
                      placeholder="Confirm password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`border rounded-md p-2 pr-10 ${errors.confirmPassword || password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {confirmPassword && (
                      <span className="absolute right-10 top-1/3 transform -translate-y-1/2 text-gray-500">
                        {password === confirmPassword ? <FiCheck className="text-green-500" /> : <FiX className="text-red-500" />}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>

                  {showTooltip && (
                    <div className="text-sm space-y-1">
                      <ul>
                        {requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            {checkRequirement(requirement) ? (
                              <FiCheck className="text-green-500" />
                            ) : (
                              <FiX className="text-red-500" />
                            )}
                            <span className={checkRequirement(requirement) ? "text-green-600" : "text-red-600"}>
                              {requirement.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <CardFooter className="flex flex-col justify-between space-y-2 mt-10 p-0">
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                  {/* <Button variant="link" className="text-center text-xs" onClick={() => router.push('/Auth/login')}>
                    Back to Sign in
                  </Button> */}
                </CardFooter>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
