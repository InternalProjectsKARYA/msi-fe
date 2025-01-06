"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  TooltipProvider, 
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from '@/components/ui/switch';
import { Toaster } from '@/components/ui/sonner';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const WeekdaysDropdown = ({ value, onChange }) => (
  <select className="dropdown border border-gray-300 rounded p-2" value={value} onChange={onChange}>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
);

const OptionalDay = ({ value, onChange }) => (
  <select className="dropdown border border-gray-300 rounded p-2" value={value} onChange={onChange}>
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
    <option value="4">Fourth</option>
    <option value="5">Fifth</option>
  </select>
);

const Config = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Static form data replacing API integration
  const [formData, setFormData] = useState({
    plain_password: "MySchoolItaly@123",
    school_name: "My School Itay",
    school_email: "info@myschoolitaly.com",
    school_contact: "+91 9876534321",
    days_180_flag: false,
    school_logo: null,
    prefix_id: "SCH",
    leavesettings: { weekoffType: ["Saturday", "Sunday"], customDays: ["1", "Saturday", "3", "Saturday", "2"] },
  });

  const [showOption1, setShowOption1] = useState(true);
  const [showOption2, setShowOption2] = useState(false);

  const customDays = formData.leavesettings.customDays || [];

  // Weekday change function for both default and customizable settings
  const handleWeekdayChange = (index, value) => {
    setFormData((prevData) => {
      const updatedDays = [...prevData.leavesettings.customDays];
      updatedDays[index] = value; // Set the day for the specific index
      return {
        ...prevData,
        leavesettings: {
          ...prevData.leavesettings,
          customDays: updatedDays, // Update customDays array with new day value
        },
      };
    });
  };

  // Modify this function for weekoffType when setting default settings
  const handleWeekdayDefaultChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      leavesettings: {
        ...prevData.leavesettings,
        [field]: value,  // Update the specific field in the leavesettings
      },
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setFormData((prevData) => ({ ...prevData, school_logo: file }));
    }
  };

  const handleSubmit = () => {
    // Replace API call with static data submission logic
    console.log("Form Data Submitted: ", formData);
    toast("Settings Saved", { description: "Your configuration has been updated." });
  };

  return (
    <main className="flex grid grid-cols-1 lg:grid-cols-1">
      <TooltipProvider>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">

                <div className="flex flex-1 flex-wrap gap-10">
                  <div className="flex flex-col gap-y-4">
                    {/* 180 Days Flag */}
                    <div className="flex items-center gap-x-4 mt-4">
                      <Label className="w-36 font-medium whitespace-nowrap">180 days flag</Label>
                      <Switch
                        checked={formData.days_180_flag}
                        onCheckedChange={(checked) => setFormData({ ...formData, days_180_flag: checked })}
                      />
                    </div>

                    {/* Logo Upload with Input */}
                    <div className="flex items-center gap-x-4">
                      <Label className="w-36 font-medium whitespace-nowrap">Logo</Label>
                      <Input type="file" onChange={handleImageUpload} className="w-64" />
                    </div>

                    {/* Prefix Field */}
                    <div className="flex items-center gap-x-4">
                      <Label className="w-36 font-medium whitespace-nowrap">Prefix</Label>
                      <Input
                        type="text"
                        value={formData.prefix_id}
                        onChange={(e) => setFormData({ ...formData, prefix_id: e.target.value })}
                        className="w-64"
                      />
                    </div>
                  </div>

                  <div className="relative w-80 h-40 mt-4">
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Uploaded Preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md border"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Leave request: </span>
                  <Switch
                    checked={formData.days_180_flag}
                    onCheckedChange={(checked) => setFormData({ ...formData, days_180_flag: checked })}
                    className={`${
                      formData.days_180_flag ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  <span className="font-semibold">
                    {formData.days_180_flag ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-10">
                  <div className="flex flex-row items-center space-x-4">
                    <Label htmlFor="DefaultPassword" className="w-32 md:w-48 font-medium whitespace-nowrap">
                      Default Password
                    </Label>
                    <Input
                      id="DefaultPassword"
                      value={formData.plain_password}
                      onChange={(e) => setFormData({ ...formData, plain_password: e.target.value })}
                      className="w-64 lg:w-full"
                    />
                  </div>

                  <div className="flex flex-row items-center space-x-4">
                    <Label htmlFor="schoolName" className="w-32 md:w-48 font-medium whitespace-nowrap">
                      School Name
                    </Label>
                    <Input
                      id="schoolName"
                      value={formData.school_name}
                      onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                      className="w-64 lg:w-full"
                    />
                  </div>

                  <div className="flex flex-row items-center space-x-4">
                    <Label htmlFor="SchoolMail" className="w-32 md:w-48 font-medium whitespace-nowrap">
                      School Mail
                    </Label>
                    <Input
                      id="SchoolMail"
                      value={formData.school_email}
                      onChange={(e) => setFormData({ ...formData, school_email: e.target.value })}
                      className="w-64 lg:w-full"
                    />
                  </div>

                  <div className="flex flex-row items-center space-x-4">
                    <Label htmlFor="SchoolContact" className="w-32 md:w-48 font-medium whitespace-nowrap">
                      School Contact
                    </Label>
                    <Input
                      id="SchoolContact"
                      value={formData.school_contact}
                      onChange={(e) => setFormData({ ...formData, school_contact: e.target.value })}
                      className="w-64 lg:w-full"
                    />
                  </div>
                </div>

                <div className='pt-4'>
                  <Separator />
                </div>

                <div>
                  <CardHeader className='px-0'>
                    <CardTitle>Weekoff Settings</CardTitle>
                    <CardDescription>Manage predefined weekoff settings</CardDescription>
                  </CardHeader>
                  <CardContent className='px-0'>
                    <div className="grid flex flex-wrap grid-cols-12 lg:grid-cols-12 gap-4">
                      <div className="flex items-center gap-2 col-span-3 lg:col-span-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={showOption1}
                            onChange={() => { setShowOption1(true); setShowOption2(false); }}
                          />
                          Default
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-3 lg:col-span-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={showOption2}
                            onChange={() => { setShowOption2(true); setShowOption1(false); }}
                          />
                          Customizable
                        </label>
                      </div>
                    </div>

                    <div className='grid flex grid-cols-1 lg:grid-cols-12'>
                      {showOption1 && (
                        <div className="flex items-center gap-2">
                          Every
                          <WeekdaysDropdown
                            value={formData.leavesettings.weekoffType[0] || ""}
                            onChange={(e) => handleWeekdayDefaultChange("weekoffType", [e.target.value, formData.leavesettings.weekoffType[1]])}
                          />{' - '}
                          <WeekdaysDropdown
                            value={formData.leavesettings.weekoffType[1] || ""}
                            onChange={(e) => handleWeekdayDefaultChange("weekoffType", [formData.leavesettings.weekoffType[0], e.target.value])}
                          />
                        </div>
                      )}
                      {showOption2 && (
                        <div className="flex flex-wrap items-center gap-2">
                          Every
                          <OptionalDay
                            value={customDays[0] || ''}
                            onChange={(e) => handleWeekdayDefaultChange(0, e.target.value)}
                          />{' - '}
                          <WeekdaysDropdown
                            value={customDays[1] || ''}
                            onChange={(e) => handleWeekdayChange(1, e.target.value)}
                          />{' AND '}
                          <OptionalDay
                            value={customDays[2] || ''}
                            onChange={(e) => handleWeekdayDefaultChange(2, e.target.value)}
                          />{' - '}
                          <WeekdaysDropdown
                            value={customDays[3] || ''}
                            onChange={(e) => handleWeekdayChange(3, e.target.value)}
                          />{'+'}
                          <WeekdaysDropdown
                            value={customDays[4] || ''}
                            onChange={(e) => handleWeekdayChange(4, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button onClick={handleSubmit}>Submit</Button>
            <Toaster />
          </CardFooter>
        </Card>
      </TooltipProvider>
    </main>
  );
};

export default Config;
