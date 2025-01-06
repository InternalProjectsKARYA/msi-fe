"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, GraduationCap, Mail, MapPin, PencilIcon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';


const StudentData = ({ id }) => {
  const [fatherFile, setFatherFile] = useState(null);
  const [motherFile, setMotherFile] = useState(null);
  const [guardianFile, setGuardianFile] = useState(null);

  const [profileData, setProfileData] = useState({

    father_name: "",
    mother_name: "",
    guardian_name: "",
    father_contact_number: "",
    mother_contact_number: "",
    guardian_contact_number: "",
    present_address: "",
    permanent_address: "",
    guardian_address: "",


  });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(`/get_profile/${id}`);
        const { data } = response.data;
        setProfileData({
          ...data,
          name: `${data.first_name} ${data.last_name}` || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };


    fetchProfileData();
  }, [id]);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (type === "father") {
      setFatherFile(file);
      uploadImage(file, "father");
    } else if (type === "mother") {
      setMotherFile(file);
      uploadImage(file, "mother");
    } else if (type === "guardian") {
      setGuardianFile(file);
      uploadImage(file, "guardian");
    }
  };

  const uploadImage = async (file: File, type: string) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        `/upload-profile-image/${id}/${type}`, // Dynamically pass the image type (father, mother, or guardian)
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(`${type} profile picture uploaded successfully`);
      }
    } catch (error) {
      console.error(`Error uploading ${type} profile picture:`, error);
    }
  };




  return (
    <div className="space-y-6">

      {/* Parents Information */}
      <Card className="p-3">
        <CardContent className='p-2 gap-2 grid'>
          <CardTitle className="text-lg font-semibold  mb-4">Parents Information</CardTitle>

          {/* Father Information */}
          <CardContent className="flex items-center  gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              </Avatar>
              <label
                htmlFor="profilePictureFather"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureFather" type="file" className="hidden"  onChange={(e) => handleFileChange(e, "father")} />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4  ">
                <span className="font-semibold text-s">{profileData.father_name}</span>
                <span className="text-gray-600 text-xs">(Father)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">{profileData.father_contact_number}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">email@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Mother Information */}
          <CardContent className="flex items-center  gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              </Avatar>
              <label
                htmlFor="profilePictureMother"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureMother" type="file" className="hidden"  onChange={(e) => handleFileChange(e, "mother")}/>
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4  ">
                <span className="font-semibold text-s">{profileData.mother_name}</span>
                <span className="text-gray-600 text-xs">(Mother)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">mother_contact_number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">email@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Guardian Information */}
          <CardContent className="flex items-center  gap-5 space-x-4 p-2 rounded border">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              </Avatar>
              <label
                htmlFor="profilePictureGuardian"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
              >
                <PencilIcon className="w-2 h-2 text-gray-600" />
              </label>
              <Input id="profilePictureGuardian" type="file" className="hidden"  onChange={(e) => handleFileChange(e, "guardian")} />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center space-x-4  ">
                <span className="font-semibold text-s">{profileData.guardian_name}</span>
                <span className="text-gray-600 text-xs">(Gaurdian)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">gaurdian_contact_number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-500" size={14} />
                  <span className="text-gray-700 text-s">email@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Father Information */}
          {profileData.father_name && profileData.father_contact_number && (
            <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <label
                  htmlFor="profilePictureFather"
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
                >
                  <PencilIcon className="w-2 h-2 text-gray-600" />
                </label>
                <Input id="profilePictureFather" type="file" className="hidden" onChange={(e) => handleFileChange(e, "father")} />
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
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-500" size={14} />
                    <span className="text-gray-700 text-s">email@gmail.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Mother Information */}
          {profileData.mother_name && profileData.mother_contact_number && (
            <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <label
                  htmlFor="profilePictureMother"
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
                >
                  <PencilIcon className="w-2 h-2 text-gray-600" />
                </label>
                <Input id="profilePictureMother" type="file" className="hidden" onChange={(e) => handleFileChange(e, "mother")} />
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
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-500" size={14} />
                    <span className="text-gray-700 text-s">email@gmail.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Guardian Information */}
          {profileData.guardian_name && profileData.guardian_contact_number && (
            <CardContent className="flex items-center gap-5 space-x-4 p-2 rounded border">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <label
                  htmlFor="profilePictureGuardian"
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
                >
                  <PencilIcon className="w-2 h-2 text-gray-600" />
                </label>
                <Input id="profilePictureGuardian" type="file" className="hidden" onChange={(e) => handleFileChange(e, "guardian")} />
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
                  <div className="flex items-center space-x-2">
                    <Mail className="text-gray-500" size={14} />
                    <span className="text-gray-700 text-s">email@gmail.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

        </CardContent>
      </Card>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
        {/* Documents */}
        <Card className="p-5">
          <CardTitle className="text-lg font-semibold px-2 mb-2">Documents</CardTitle>
          <Separator />
          <CardContent className='mt-5 p-0 '>

            <CardContent className="flex items-center justify-between px-2 py-1 rounded border mb-4">
              <div className="flex items-center space-x-5 ml-2">
                <span className="text-gray-700 font-medium">BirthCertificate.pdf</span>
              </div>
              <Button variant="ghost">
                <Download className="h-5 w-5 text-gray-600" />
              </Button>
            </CardContent>
            <CardContent className="flex items-center justify-between  px-2 py-1  rounded border">
              <div className="flex items-center space-x-3 ml-2">
                <span className="text-gray-700 font-medium">Transfer Certificate.pdf</span>
              </div>
              <Button variant="ghost">
                <Download className="h-5 w-5 text-gray-600" />
              </Button>
            </CardContent>
          </CardContent>
        </Card>
        {/* Address Information */}
        <Card className="p-5">
          <CardTitle className="text-lg font-semibold   px-2 mb-2">Address Information</CardTitle>
          <Separator />
          <CardContent className='mt-5 p-0 grid gap-5 '>

            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" size={18} />
              <div className="flex flex-col">
                <Label className="font-medium">Present Address</Label>
                <span className="text-gray-700">{profileData.present_address}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" size={18} />
              <div className="flex flex-col">
                <Label className="font-medium">Permanent Address</Label>
                <span className="text-gray-700">{profileData.permanent_address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Previous School Details */}
        <Card className="p-5      ">
          <CardTitle className="text-lg font-semibold px-2  mb-2">Previous School Details</CardTitle>
          <Separator />
          <CardContent className='p-0 mt-5 grid gap-5'>

            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" size={16} />
              <div className="flex flex-col">
                <Label className="font-medium">Previous School Name</Label>
                <span className="text-gray-700">Oxford Matriculation, USA</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GraduationCap size={18} color="currentColor" />
              <div className="flex flex-col">
                <Label className="font-medium">School Address</Label>
                <span className="text-gray-700">1852 Barnes Avenue, Cincinnati, OH 45202</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default StudentData;
