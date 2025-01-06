"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FiCheck, FiX, FiEye, FiEyeOff } from "react-icons/fi";
 
import {
   
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
 

export default function SetPassword() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showTooltip, setShowTooltip] = React.useState(false);

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
  const handleResetPassword = () => {
    if (password === confirmPassword && requirements.every(checkRequirement)) {
      router.push('/Auth/login'); // Navigate only if passwords match and validation passes
    }
  };

  return (
    <div className="flex items-center justify-left mt-5 relative">
      <div className="flex p-10 relative z-10 w-[35%]">
        <div className="w-full">
          <CardHeader className="flex justify-center text-left pt-5 ">
            <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-sm text-gray-400">
  You can change your password here. Remember that it should contain at least 8 characters, at least one upper and lower case letter, and at least one number & special character.
</CardDescription>

          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="flex flex-col gap-4 mt-5 ">
                {/* Password Input with Tooltip */}
                <div className="flex flex-col space-y-4 ">
                  <div className="relative flex-1">
                    <Input
                      id="old-password"
                      placeholder="Old password"
                      type={showPassword ? "text" : "password"}
                      className="border rounded-md p-2 pr-10 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>

                  <div className="relative flex-1">
                    <Input
                      id="new-password"
                      placeholder="Create new password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setShowTooltip(true)}
                      onBlur={() => setShowTooltip(false)}
                      className={`border rounded-md p-2 pr-10 ${errors.newPassword || password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {password && (
                      <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500">
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

                {/* Confirm Password Input with Icon */}
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
                                   {/* Tooltip for Password Requirements Positioned to Right of div */}
      {showTooltip && (
        <div className="          ">
          <ul className="text-sm space-y-1">
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

              <CardFooter className="flex     space-y-2 mt-10 p-0">
                <Button type="submit" className=" ">
                  Reset Password
                </Button>
              
              </CardFooter>
            </form>
          </CardContent>
        </div>
      </div>

    
    </div>
  );
}
