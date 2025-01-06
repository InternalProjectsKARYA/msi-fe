"use client";

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, GraduationCap, Mail, MapPin, PencilIcon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentDataProps {
  id: string; // Assuming `id` is always a string
}

const StudentData: React.FC<StudentDataProps> = ({ id }) => {
  const profileData = {
    father_name: "V Ramana Reddy",
    mother_name: "V Amrutha",
    guardian_name: "Guardian Name",
    father_contact_number: "9878887688",
    mother_contact_number: "9878887689",
    guardian_contact_number: "9878887690",
    present_address: "Nellore",
    permanent_address: "Nellore",
  };

  return (
    <div className="space-y-6">
      {/* Parents Information */}
      <Card className="p-3">
        <CardContent className="p-2 gap-2 grid">
          <CardTitle className="text-lg font-semibold mb-4">Parents Information</CardTitle>

          {/* Father Information */}
          <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="Father's Avatar" />
              </Avatar>
              <label
                htmlFor="profilePictureFather"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureFather" type="file" className="hidden" />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-s">{profileData.father_name}</span>
                <span className="text-gray-600 text-xs">(Father)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">{profileData.father_contact_number}</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Mother Information */}
          <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="Mother's Avatar" />
              </Avatar>
              <label
                htmlFor="profilePictureMother"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureMother" type="file" className="hidden" />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-s">{profileData.mother_name}</span>
                <span className="text-gray-600 text-xs">(Mother)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">{profileData.mother_contact_number}</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Guardian Information */}
          <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="Guardian's Avatar" />
              </Avatar>
              <label
                htmlFor="profilePictureGuardian"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureGuardian" type="file" className="hidden" />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-s">{profileData.guardian_name}</span>
                <span className="text-gray-600 text-xs">(Guardian)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">{profileData.guardian_contact_number}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentData;
