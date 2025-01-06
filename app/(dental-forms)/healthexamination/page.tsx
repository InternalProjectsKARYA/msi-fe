"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useThemeStore from "@/components/ThemeContext";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { date } from "zod";
import axiosInstance from "@/lib/axiosInstance";

const DecorativeBorder = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="borderPattern"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="5" cy="5" r="3" fill="#8A2BE2" />
        <ellipse cx="10" cy="10" rx="3" ry="7" fill="#32CD32" />
        <circle cx="20" cy="20" r="5" fill="#006400" />
        <ellipse cx="25" cy="10" rx="7" ry="5" fill="#91c457" />
        <circle cx="30" cy="30" r="7" fill="#90EE90" />
        <ellipse cx="35" cy="25" rx="8" ry="6" fill="#73944d" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="30" height="100%" fill="url(#borderPattern)" />
    <rect x="30" y="0" width="calc(100% - 60px)" height="30" fill="url(#borderPattern)" />
    <rect x="30" y="calc(100% - 30px)" width="calc(100% - 60px)" height="30" fill="url(#borderPattern)" />
    <rect x="calc(100% - 30px)" y="0" width="30" height="calc(100% - 0px)" fill="url(#borderPattern)" />
  </svg>
);

export default function HealthExamForm() {
  const router = useRouter();

  const { healthFormData, setHealthFormData } = useThemeStore();

  const [healthLocalData, setHealthLocalData] = useState({
    "child_info": {
      "childs_name": "string",
      "birth_date": date,
      "grade": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "pincode": "048052",
      "phone": "6461637079",
      "medi_call": "string"
    },
    "health_exam": {
      "date_of_exam": "2024-12-17",
      "is_child_new": "str",
      "established_to_your_care": "str",
      "health_and_developmental_history": "string",
      "physical_examination": "string",
      "height": 1,
      "weight": 1,
      "blood_pressure": "91/954",
      "blood_test_for_anaemia": "string",
      "blood_test_for_lead": true,
      "blood_test_result": "string",
      "urine_test": true,
      "dental_assessment": "string",
      "dental_assessment_result":"string",
      "exposure_to_secondhand_smoke": true
    },
    "vision_screen": {
      "vision": "string",
      "right_eye": "20/90",
      "left_eye": "20/61",
      "eye_muscle_testing": "string",
      "referred": true,
      "student_should_wear_eyeglasses": true
    },
    "audiometry": {
      "audio": "string",
      "right_1000": 120,
      "right_2000": 120,
      "right_3000": 120,
      "right_4000": 120,
      "left_1000": 120,
      "left_2000": 120,
      "left_3000": 120,
      "left_4000": 120,
      "referred": true
    },
  
    "additional_info": {
      "conditions_concern_school": true,
      "conditions_explanation": "string",
      "restrictions_on_physical_activities": true,
      "restrictions_explanation": "string",
      "child_takes_medications": true,
      "medications_explanation": "string"
    },
  });

  const searchparams=useSearchParams()
  const Reg_id=searchparams?.get('registration_number')
  const view=searchparams?.get('view')
  const handleSelectChange = (name, value) => {
    const keys = name.split(".");
    setHealthLocalData((prev) => {
      let updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;  // Just assign the value directly
      return updated;
    });
  };


  


  const handleInputChange = (e) => {
    let { name, value, type, checked } = e.target;
    const keys = name.split(".");
  
    // Check if the value is a date and format it
    if (name.includes("date")) {
      const date = new Date(value);
      if (!isNaN(date)) {
        value = format(date, 'yyyy-MM-dd'); // Format date as 'yyyy-MM-dd'
      }
    }
  
    setHealthLocalData((prev) => {
      let updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
      return updated;
    });
  };
  const handleRadioChange = (name, value) => {
    const keys = name.split(".");
    setHealthLocalData((prev) => {
      let updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  
  const handleNextClick = () => {
    setHealthFormData(healthLocalData);
    if(view){
    router.push(`/health-exam/?registration_number=${Reg_id}&view=true`);
    }
    else{
      router.push(`/health-exam/?registration_number=${Reg_id}`);
    }
  };

  useEffect(()=>{
    if(healthFormData){
    setHealthLocalData(healthFormData)
    }else{
    if(view){
    const fetchDetails=async()=>{
      const response=await axiosInstance.get(`/health-record-details/${Reg_id}/`)
      console.log(response)
setHealthLocalData(response.data.health_record)
    }
    fetchDetails()
  }
}
  },[])

  return (
    <div className="relative max-w-4xl mx-auto p-8 space-y-6">
      <DecorativeBorder />

      <div className="relative z-10 p-6 bg-white space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#ff6347]">
            My School <span className="text-[#4682b4]">ITALY</span>
          </h1>
          <p className="text-[#4682b4] text-lg">
            A Neuroscientific European Preschool with Daycare
          </p>
          <h2 className="text-2xl font-semibold">HEALTH EXAMINATION FOR SCHOOL ENTRY</h2>
        </div>

        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Label className="grid gap-2">
              Child's Name:
              <Input
                type="text"
                name="child_info.childs_name"
                value={healthLocalData.child_info.childs_name}
                onChange={handleInputChange}
              />
            </Label>
            <Label className="grid gap-2">
              Grade:
              <RadioGroup
            defaultValue={healthLocalData.child_info.grade}
            onValueChange={(value) => handleRadioChange("child_info.grade", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="playround" />
              <Label>playround</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nursery" />
              <Label>Nursery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="K1" />
              <Label>K1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="K2" />
              <Label>K2</Label>
            </div>
          </RadioGroup>
            </Label>
          </div>

          {/* Address and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Label className="grid gap-2">
              Address:
              <Input
                type="text"
                name="child_info.address"
                value={healthLocalData.child_info.address}
                onChange={handleInputChange}
              />
            </Label>
            <Label className="grid gap-2">
              Phone:
              <Input
                type="text"
                name="child_info.phone"
                value={healthLocalData.child_info.phone}
                onChange={handleInputChange}
              />
            </Label>
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Label className="grid gap-2">
              Birthdate:
              <Input
                type="date"
                name="child_info.birth_date"
                value={healthLocalData.child_info.birth_date}
                onChange={handleInputChange}
              />
            </Label>
            <Label className="grid gap-2">
              Medi-Call #:
              <Input
                type="text"
                name="child_info.medi_call"
                value={healthLocalData.child_info.medi_call}
                onChange={handleInputChange}
              />
            </Label>
          </div>

          {/* More fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <Label className="grid gap-2">
    City:
    <Input
      type="text"
      name="child_info.city"
      value={healthLocalData.child_info.city}
      onChange={handleInputChange}
    />
  </Label>
  <Label className="grid gap-2">
    State:
    <Input
      type="text"
      name="state"
      value={healthLocalData.child_info.state}
      onChange={handleInputChange}
    />
  </Label>
  <Label className="grid gap-2">
    Pin Code:
    <Input
      type="text"
      name="child_info.pincode"
      value={healthLocalData.child_info.pincode}
      onChange={handleInputChange}
    />
  </Label>
          </div>

          <Separator />

          {/* Health Examination Section */}
          <div className="space-y-4">
           
            <div  >
  <h3 className="py-4">
    <span className="text-lg font-semibold">HEALTH EXAMINATION MUST INCLUDE AREAS NOTED IN BOLD.</span>{" "}
    <span>(please check if done and note results as appropriate)</span>
  </h3>
  <div className="">
    {/* Date of Exam and "Is the child new?" */}
    <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2 sm:space-y-0">
      <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
        <span className="mt-1">Date of Exam:</span>
        <Input
          type="date"
          name="health_exam.date_of_exam"
          value={healthLocalData.health_exam.date_of_exam}
          onChange={handleInputChange}
          className="w-full sm:w-36 h-6"
        />
      </Label>
      <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
        <span className="mt-1">Is the child</span>
        <Input
          type="text"
          name="health_exam.is_child_new"
          value={healthLocalData.health_exam.is_child_new}
          onChange={handleInputChange}
          className="w-full sm:w-12 h-6"
        />
        <span className="mt-1"> new?</span>
      </Label>
      <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
        <Input
          type="text"
          name="health_exam.established_to_your_care"
          value={healthLocalData.health_exam.established_to_your_care}
          onChange={handleInputChange}
          className="w-full sm:w-28 h-6"
        />
        <span className="mt-1">Established to your care?</span>
      </Label>
    </div>
  </div>


  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
  {/* Left Section (Health and Development History) */}
  <div className="flex flex-col w-full gap-4">
    <Label className="grid gap-2">
      Health and Development History
      <Select value={healthLocalData.health_exam.health_and_developmental_history}
       onValueChange={(value) => handleSelectChange("health_exam.health_and_developmental_history", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </Label>
  </div>

  {/* Right Section (Health and Development History Section with Height, Weight, B/P) */}
  <Label className="grid gap-2">
    Urine Test
    <Select value={healthLocalData.health_exam.urine_test}
     onValueChange={(value) => handleSelectChange( "health_exam.urine_test", value )}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
         
          <SelectItem value={true}>Yes</SelectItem>
          <SelectItem value={false}>No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </Label>
 
</div>

<div className="w-full  grid  grid-cols-3 gap-4 mt-3">
  <Label className="grid gap-2 col-span-1">
    Physical Examination
    <Select
    value={healthLocalData.health_exam.physical_examination}
     onValueChange={(value) => handleSelectChange( "health_exam.physical_examination", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Label>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 w-full col-span-2">
    <Label className="grid gap-2 flex flex-row">
      <span className="mt-1">Height:</span>
      <Input
        type="text"
        name="health_exam.height"
        value={healthLocalData.health_exam.height}
        onChange={handleInputChange}
        className="w-16 h-6"
      />
    </Label>
    <Label className="grid gap-2 flex flex-row">
      <span className="mt-1">Weight:</span>
      <Input
        type="text"
        name="health_exam.weight"
        value={healthLocalData.health_exam.weight}
        onChange={handleInputChange}
        className="w-16 h-6"
      />
    </Label>
    <Label className="grid gap-2 flex flex-row">
      <span className="mt-1">B/P:</span>
      <Input
        type="text"
        name="health_exam.blood_pressure"
        value={healthLocalData.health_exam.blood_pressure}
        onChange={handleInputChange}
        className="w-20 h-6"
      />
    </Label>
  </div>
  
</div>
<div className="w-full grid lg:grid-cols-3  grid-cols-1 gap-4 mt-3">
<Label className="grid gap-2  ">
    Blood Test for Anaemia
    <Select  
    value={healthLocalData.health_exam.blood_test_for_anaemia}
    onValueChange={(value) => handleSelectChange( "health_exam.blood_test_for_anaemia", value )}>
      <SelectTrigger >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="Yes">No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Label>
  <Label className="grid gap-2 flex items-center space-y-2 col-span-2 mt-4">
  Blood Test for Lead:
  <RadioGroup
            value={healthLocalData.health_exam.blood_test_for_lead}
            onValueChange={(value) => handleRadioChange("health_exam.blood_test_for_lead", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={true} />
              <Label>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={false} />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
 <Label className="ml-4">Result</Label>
  <Input
    type="text"
    name="health_exam.blood_test_result"
    value={healthLocalData.health_exam.blood_test_result}
    onChange={handleInputChange}
    className="w-18"
  />
</Label>
</div>
<div className="space-y-4 mt-3">
  {/* Urine Test Label */}
 
    {/* Dental Assessment Section */}
    <div className="grid grid-cols-2 space-y-3 space-x-2">
      <Label className="grid gap-2  space-x-2">
        Dental Assessment:
        <Select 
        value={healthLocalData.health_exam.dental_assessment}
         onValueChange={(value) => handleSelectChange( "health_exam.dental_assessment", value )}>
      <SelectTrigger className="w-2/3">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        
        
      </Label>
      <Label className="flex items-center gap-2"> Result:
      <RadioGroup
          value={healthLocalData.health_exam.dental_assessment_result}
            onValueChange={(value) => handleRadioChange("health_exam.dental_assessment", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Normal' />
              <Label>Normal</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Possible Carries' />
              <Label>Possible Carries</Label>
            </div>
           
          </RadioGroup>
          </Label>
    </div>


  {/* Exposure to Secondhand Smoke */}
  <div className="flex flex-wrap justify-between">
    <div className="flex items-center space-x-2">
      <Label className="grid gap-2 flex items-center space-x-2">
        Exposure to secondhand smoke:
        <RadioGroup
            value={healthLocalData.health_exam.exposure_to_secondhand_smoke}
            onValueChange={(value) => handleRadioChange("health_exam.exposure_to_secondhand_smoke", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={true} />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={false} />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
          </Label>
      </div>
    </div>
  </div>
</div>
<div className="my-4">
  <Separator />
</div>
<div className="">
  <Label className="mb-3">
    Vision
    </Label>
    <div>
    <Select value={healthLocalData.vision_screen.vision}  onValueChange={(value) => handleSelectChange( "vision_screen.vision", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Yes</SelectItem>
          <SelectItem value="banana">No</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


  <div className="flex mt-3 gap-4 ">
    
      <Label className="grid gap-2 flex flex-wrap">
        <span className="mt-1">Right: 20/</span>
        <Input
          type="text"
          name="vision_screen.right_eye"
          value={healthLocalData.vision_screen.right_eye}
          onChange={handleInputChange}
          className="w-16 h-6"
        />
      </Label>
      <Label className="grid gap-2 flex flex-wrap">
        <span className="mt-1">Left: 20/</span>
        <Input
          type="text"
          name="vision_screen.left_eye"
          value={healthLocalData.vision_screen.left_eye}
          onChange={handleInputChange}
          className="w-16 h-6"
        />
      </Label>
    

    <Label className="grid gap-2 flex items-center space-x-2">
      Eye muscle testing:
      <RadioGroup
            value={healthLocalData.vision_screen.eye_muscle_testing}
            onValueChange={(value) => handleRadioChange("vision_screen.eye_muscle_testing", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Normal' />
              <Label>Normal</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Abnormal' />
              <Label>Abnormal</Label>
            </div>
           
          </RadioGroup>
    </Label>
  </div>
</div>


<div className="flex flex-wrap justify-between">
  <div className="flex items-center space-x-2">
    <Label className="grid gap-2 flex items-center space-x-2">
      Referred ?
      <RadioGroup
            value={healthLocalData.vision_screen.referred}
            onValueChange={(value) => handleRadioChange("vision_screen.referred", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={true} />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={false} />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
          </Label>
  </div>
  <div className="flex items-center space-x-2">
    <Label className="grid gap-2 flex items-center space-x-2">
      Student should wear eyeglasses:
      </Label>
    
      <RadioGroup
            value={healthLocalData.vision_screen.student_should_wear_eyeglasses}
            onValueChange={(value) => handleRadioChange("vision_screen.student_should_wear_eyeglasses", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Yes' />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='No' />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
  
  </div>
</div>

<div className="my-4">
  <Separator />
</div>
</div>
{/* Audiometry Screening Section */}
<div className="space-y-4">
  <Label className="grid gap-2">
    Audiometry Screening
    <Input
      type="text"
      name="audiometry.audio"
      value={healthLocalData.audiometry.audio}
      onChange={handleInputChange}
      className="w-64"
    />
  </Label>

  {/* Audiometry Table */}
  <table className="min-w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-1 text-left">Audio</th>
        <th className="p-1 text-left">Right</th>
        <th className="p-1 text-left">Left</th>
      </tr>
    </thead>
    <tbody>
      {/* Row for 1000 Hz */}
      <tr>
        <td className="p-1">1000 Hz</td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.right_1000"
            value={healthLocalData.audiometry.right_1000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.left_1000"
            value={healthLocalData.audiometry.left_1000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
      </tr>
      {/* Row for 2000 Hz */}
      <tr>
        <td className="p-1">2000 Hz</td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.right_2000"
            value={healthLocalData.audiometry.right_2000 }
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.left_2000"
            value={healthLocalData.audiometry.left_2000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
      </tr>
      {/* Row for 3000 Hz */}
      <tr>
        <td className="p-1">3000 Hz</td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.right_3000"
            value={healthLocalData.audiometry.right_3000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.left_3000"
            value={healthLocalData.audiometry.left_3000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
      </tr>
      {/* Row for 4000 Hz */}
      <tr>
        <td className="p-1">4000 Hz</td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.right_4000"
            value={healthLocalData.audiometry.right_4000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
        <td className="p-1">
          <Input
            type="text"
            name="audiometry.left_4000"
            value={healthLocalData.audiometry.left_4000}
            onChange={handleInputChange}
            className="w-24"
          />
        </td>
      </tr>
    </tbody>
  </table>

  {/* Referred Checkbox Section */}
  <div className="flex items-center space-x-4">
    <Label>Referred?</Label>
  <RadioGroup
            value={healthLocalData.audiometry.referred}
            onValueChange={(value) => handleRadioChange("audiometry.referred", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Yes' />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='No' />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
  
  </div>
</div>

<div className="my-4">
  <Separator />
</div>

<div className="space-y-4">
  <h3 className="text-lg font-semibold py-2">
    ADDITIONAL INFORMATION FROM THE HEALTH EXAMINER:
  </h3>
  <div className="grid grid-cols-1 gap-4">
    <div className="flex items-center space-x-4">
      <Label className="flex items-center space-x-2">
        Does this child have any conditions that might concern the school?
        </Label>
        <RadioGroup
            value={healthLocalData.additional_info.conditions_concern_school}
            onValueChange={(value) => handleRadioChange("additional_info.conditions_concern_school", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Yes' />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='No' />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
    </div>
    <div className="flex items-center space-x-4">
      <Label className="flex items-center space-x-2">
        If yes, explain condition(s) and recommendations for follow-up:
        <Input
          type="text"
          name="additional_info.conditions_explanation"
          value={healthLocalData.additional_info.conditions_explanation}
          onChange={handleInputChange}
          className="w-64 ml-2"
        />
      </Label>
    </div>
    <div className="flex items-center space-x-4">
      <Label className="flex items-center space-x-2">
        Are there any restrictions on physical activities?
        </Label>
        <RadioGroup
            value={healthLocalData.additional_info.restrictions_on_physical_activities}
            onValueChange={(value) => handleRadioChange("additional_info.restrictions_on_physical_activities", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Yes' />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='No' />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
      
    </div>
    <div className="flex items-center space-x-4">
      <Label className="flex items-center space-x-2">
        If yes, explain:
        <Input
          type="text"
          name="restrictions_explanation"
          value={healthLocalData.additional_info.restrictions_explanation}
          onChange={handleInputChange}
          className="w-64 ml-2"
        />
      </Label>
    </div>
    <div className="flex items-center space-x-4">
      <Label className="flex items-center space-x-2">
        Does this child take any medications?
        </Label>
        <RadioGroup
            value={healthLocalData.additional_info.child_takes_medications}
            onValueChange={(value) => handleRadioChange("additional_info.child_takes_medications", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='Yes' />
              <Label>Yes</Label>
            </div>
           
            <div className="flex items-center space-x-2">
              <RadioGroupItem value='No' />
              <Label>No</Label>
            </div>
           
          </RadioGroup>
      
      
    </div>
     <div>
              <Label className="font-bold">If yes, explain:</Label>
              <Label>
                <i className="font-regular">
                  (If the child must take the medication at school, please request and complete a medication form)
                </i>
                <Input
                  type="text"
                  name="additional_info.medications_explanation"
                value={healthLocalData.additional_info.medications_explanation}
                  onChange={handleInputChange}
                  className="bg-white mt-2"
                />
              </Label>
            </div>
  </div>
</div>

          </div>
          {/* Upload Button */}
          <div className="flex justify-end">
            <Button onClick={()=>{router.push('/Registration')}}>Back To Registration</Button>
            <Button variant="default" onClick={handleNextClick}>
              Next
            </Button>
            
            </div>
        </div>
      </div>
    
    
  );
}


// "use client";

// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import useThemeStore from "@/components/ThemeContext";
// import { useRouter } from "next/navigation";

// const DecorativeBorder = () => (
//   <svg
//     className="absolute inset-0 w-full h-full"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <defs>
//       <pattern
//         id="borderPattern"
//         x="0"
//         y="0"
//         width="40"
//         height="40"
//         patternUnits="userSpaceOnUse"
//       >
//         <circle cx="5" cy="5" r="3" fill="#8A2BE2" />
//         <ellipse cx="10" cy="10" rx="3" ry="7" fill="#32CD32" />
//         <circle cx="20" cy="20" r="5" fill="#006400" />
//         <ellipse cx="25" cy="10" rx="7" ry="5" fill="#91c457" />
//         <circle cx="30" cy="30" r="7" fill="#90EE90" />
//         <ellipse cx="35" cy="25" rx="8" ry="6" fill="#73944d" />
//       </pattern>
//     </defs>
//     <rect x="0" y="0" width="30" height="100%" fill="url(#borderPattern)" />
//     <rect x="30" y="0" width="calc(100% - 60px)" height="30" fill="url(#borderPattern)" />
//     <rect x="30" y="calc(100% - 30px)" width="calc(100% - 60px)" height="30" fill="url(#borderPattern)" />
//     <rect x="calc(100% - 30px)" y="0" width="30" height="calc(100% - 0px)" fill="url(#borderPattern)" />
//   </svg>
// );

// export default function HealthExamForm() {
//   const router = useRouter();

//   const { healthFormData, setHealthFormData } = useThemeStore();

//   const [healthLocalData, setHealthLocalData] = useState({
//     childName: "",
//     gradePlayground: false,
//     gradeNursery: false,
//     gradeK1: false,
//     gradeK2: false,
//     address: "",
//     phone: "",
//     birthdate: "",
//     mediCallNumber: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     healthHistory: "",
//     height: "",
//     weight: "",
//     bp: "",
//     physicalExam: "",
//     bloodTestAnaemia: "",
//     bloodTestLead: false,
//     bloodTestLeadResult: "",
//     urineTest: "",
//     dentalAssessmentNormal: false,
//     dentalAssessmentCaries: false,
//     secondhandSmoke: false,
//     vision: "",
//     visionRight: "",
//     visionLeft: "",
//     audiometryScreening: "",
//     conditions: "",
//     followUp: "",
//     restrictions: false,
//     restrictionsDetails: "",
//     medications: false,
//     medicationDetails: "",
//     dateOfExam:'',
//     isChildNew:'',
//     establishedCare:'',
//     eyeMuscleTestingAbnormal:'',
//     eyeMuscleTestingNormal:'',
//     physicalExamination:'',
//     bloodTestLeadNo:'',
//     bloodTestLeadYes:'',
//     exposureToSmokeNo:'',
//     exposureToSmokeYes:'',
//     referredNo:'',
//     referredYes:'',
//     wearEyeglassesNo:'',
//     wearEyeglassesYes:'',
    
//     audio1000Right:'',
//     audio2000Right:'',
//     audio1000Left:'',
//     audio3000Right:'',
//     audio2000Left:'',
//     audio3000Left:'',
//     audio4000Right:'',
//     audio4000Left:'',
//     audiometryReferredNo:'',
//     audiometryReferredYes:'',
//     conditionsConcernNo:'',
//     conditionsConcernYes:'',
//     conditionsExplanation:'',
//     physicalRestrictionsNo:'',
//     physicalRestrictionsYes:'',
//     physicalRestrictionsExplanation:'',
//     medicationsNo:'',
//     medicationsYes:'',
//   });



//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setHealthLocalData((prevData) => ({
//       ...prevData,
//       [name]: newValue,
//     }));

//     setHealthFormData({ [name]: newValue });
//   };

//   const handleNextClick = () => {
//     setHealthFormData(healthLocalData);
//     router.push("/health-exam");
//   };

//   return (
//     <div className="relative max-w-4xl mx-auto p-8 space-y-6">
//       <DecorativeBorder />

//       <div className="relative z-10 p-6 bg-white space-y-6">
//         <div className="text-center space-y-2">
//           <h1 className="text-4xl font-bold text-[#ff6347]">
//             My School <span className="text-[#4682b4]">ITALY</span>
//           </h1>
//           <p className="text-[#4682b4] text-lg">
//             A Neuroscientific European Preschool with Daycare
//           </p>
//           <h2 className="text-2xl font-semibold">HEALTH EXAMINATION FOR SCHOOL ENTRY</h2>
//         </div>

//         <div className="space-y-4">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <Label className="grid gap-2">
//               Child's Name:
//               <Input
//                 type="text"
//                 name="childName"
//                 value={healthLocalData.childName}
//                 onChange={handleInputChange}
//               />
//             </Label>
//             <Label className="grid gap-2">
//               Grade:
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="checkbox"
//                     name="gradePlayground"
//                     checked={healthLocalData.gradePlayground}
//                     onChange={handleInputChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm">Playground</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="checkbox"
//                     name="gradeNursery"
//                     checked={healthLocalData.gradeNursery}
//                     onChange={handleInputChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm">Nursery</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="checkbox"
//                     name="gradeK1"
//                     checked={healthLocalData.gradeK1}
//                     onChange={handleInputChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm">K1</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="checkbox"
//                     name="gradeK2"
//                     checked={healthLocalData.gradeK2}
//                     onChange={handleInputChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm">K2</span>
//                 </div>
//               </div>
//             </Label>
//           </div>

//           {/* Address and Phone */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <Label className="grid gap-2">
//               Address:
//               <Input
//                 type="text"
//                 name="address"
//                 value={healthLocalData.address}
//                 onChange={handleInputChange}
//               />
//             </Label>
//             <Label className="grid gap-2">
//               Phone:
//               <Input
//                 type="text"
//                 name="phone"
//                 value={healthLocalData.phone}
//                 onChange={handleInputChange}
//               />
//             </Label>
//           </div>

//           {/* Other Fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <Label className="grid gap-2">
//               Birthdate:
//               <Input
//                 type="date"
//                 name="birthdate"
//                 value={healthLocalData.birthdate}
//                 onChange={handleInputChange}
//               />
//             </Label>
//             <Label className="grid gap-2">
//               Medi-Call #:
//               <Input
//                 type="text"
//                 name="mediCallNumber"
//                 value={healthLocalData.mediCallNumber}
//                 onChange={handleInputChange}
//               />
//             </Label>
//           </div>

//           {/* More fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//   <Label className="grid gap-2">
//     City:
//     <Input
//       type="text"
//       name="city"
//       value={healthLocalData.city}
//       onChange={handleInputChange}
//     />
//   </Label>
//   <Label className="grid gap-2">
//     State:
//     <Input
//       type="text"
//       name="state"
//       value={healthLocalData.state}
//       onChange={handleInputChange}
//     />
//   </Label>
//   <Label className="grid gap-2">
//     Pin Code:
//     <Input
//       type="text"
//       name="pinCode"
//       value={healthLocalData.pinCode}
//       onChange={handleInputChange}
//     />
//   </Label>
//           </div>

//           <Separator />

//           {/* Health Examination Section */}
//           <div className="space-y-4">
           
//             <div  >
//   <h3 className="py-4">
//     <span className="text-lg font-semibold">HEALTH EXAMINATION MUST INCLUDE AREAS NOTED IN BOLD.</span>{" "}
//     <span>(please check if done and note results as appropriate)</span>
//   </h3>
//   <div className="">
//     {/* Date of Exam and "Is the child new?" */}
//     <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2 sm:space-y-0">
//       <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
//         <span className="mt-1">Date of Exam:</span>
//         <Input
//           type="date"
//           name="dateOfExam"
//           value={healthLocalData.dateOfExam}
//           onChange={handleInputChange}
//           className="w-full sm:w-36 h-6"
//         />
//       </Label>
//       <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
//         <span className="mt-1">Is the child</span>
//         <Input
//           type="text"
//           name="isChildNew"
//           value={healthLocalData.isChildNew}
//           onChange={handleInputChange}
//           className="w-full sm:w-12 h-6"
//         />
//         <span className="mt-1"> new?</span>
//       </Label>
//       <Label className="flex gap-2 whitespace-nowrap w-full sm:w-auto">
//         <Input
//           type="text"
//           name="establishedCare"
//           value={healthLocalData.establishedCare}
//           onChange={handleInputChange}
//           className="w-full sm:w-28 h-6"
//         />
//         <span className="mt-1">Established to your care?</span>
//       </Label>
//     </div>
//   </div>


//   <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//   {/* Left Section (Health and Development History) */}
//   <div className="flex flex-col w-full gap-4">
//     <Label className="grid gap-2">
//       Health and Development History
//       <Input
//         type="text"
//         name="healthHistory"
//         value={healthLocalData.healthHistory}
//         onChange={handleInputChange}
//         className="w-full"
//       />
//     </Label>
//   </div>

//   {/* Right Section (Health and Development History Section with Height, Weight, B/P) */}
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 w-full">
//     <Label className="grid gap-2 flex flex-row">
//       <span className="mt-1">Height:</span>
//       <Input
//         type="text"
//         name="height"
//         value={healthLocalData.height}
//         onChange={handleInputChange}
//         className="w-16 h-6"
//       />
//     </Label>
//     <Label className="grid gap-2 flex flex-row">
//       <span className="mt-1">Weight:</span>
//       <Input
//         type="text"
//         name="weight"
//         value={healthLocalData.weight}
//         onChange={handleInputChange}
//         className="w-16 h-6"
//       />
//     </Label>
//     <Label className="grid gap-2 flex flex-row">
//       <span className="mt-1">B/P:</span>
//       <Input
//         type="text"
//         name="bp"
//         value={healthLocalData.bp}
//         onChange={handleInputChange}
//         className="w-16 h-6"
//       />
//     </Label>
//   </div>
// </div>

// <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//   <Label className="grid gap-2">
//     Physical Examination
//     <Input
//       type="text"
//       name="physicalExamination"
//       value={healthLocalData.physicalExamination}
//       onChange={handleInputChange}
//       className="w-full"
//     />
//   </Label>
//   <Label className="grid gap-2">
//     Blood Test for Anaemia
//     <Input
//       type="text"
//       name="bloodTestAnaemia"
//       value={healthLocalData.bloodTestAnaemia}
//       onChange={handleInputChange}
//       className="w-full"
//     />
//   </Label>
// </div>

// <Label className="grid gap-2 flex items-center space-y-2">
//   Blood Test for Lead:
//   <Input
//     type="checkbox"
//     name="bloodTestLeadNo"
//     checked={healthLocalData.bloodTestLeadNo}
//     onChange={handleInputChange}
//     className="w-4 h-4"
//   />
//   <span>No</span>
//   <Input
//     type="checkbox"
//     name="bloodTestLeadYes"
//     checked={healthLocalData.bloodTestLeadYes}
//     onChange={handleInputChange}
//     className="w-4 h-4"
//   />
//   <span>Yes</span>
//   <span className="ml-3">Result</span>
//   <Input
//     type="text"
//     name="bloodTestLeadResult"
//     value={healthLocalData.bloodTestLeadResult}
//     onChange={handleInputChange}
//     className="w-22 h-6"
//   />
// </Label>

// <div className="space-y-4">
//   {/* Urine Test Label */}
//   <div className="flex items-center space-x-4">
//     <Label className="grid gap-2">
//       Urine Test:
//       <Input
//         type="text"
//         name="urineTest"
//         value={healthLocalData.urineTest}
//         onChange={handleInputChange}
//       />
//     </Label>

//     {/* Dental Assessment Section */}
//     <div className="flex flex-col space-y-2">
//       <Label className="grid gap-2 flex items-center space-x-2">
//         Dental Assessment:
//         <div className="flex items-center space-x-2">
//           <Input
//             type="checkbox"
//             name="dentalAssessmentNormal"
//             checked={healthLocalData.dentalAssessmentNormal}
//             onChange={handleInputChange}
//             className="w-4 h-4"
//           />
//           <span>Normal</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Input
//             type="checkbox"
//             name="dentalAssessmentCaries"
//             checked={healthLocalData.dentalAssessmentCaries}
//             onChange={handleInputChange}
//             className="w-4 h-4"
//           />
//           <span>Possible caries</span>
//         </div>
//       </Label>
//     </div>
//   </div>

//   {/* Exposure to Secondhand Smoke */}
//   <div className="flex flex-wrap justify-between">
//     <div className="flex items-center space-x-2">
//       <Label className="grid gap-2 flex items-center space-x-2">
//         Exposure to secondhand smoke:
//         <Input
//           type="checkbox"
//           name="exposureToSmokeNo"
//           checked={healthLocalData.exposureToSmokeNo}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>No</span>
//       </Label>
//       <div className="flex items-center space-x-2">
//         <Input
//           type="checkbox"
//           name="exposureToSmokeYes"
//           checked={healthLocalData.exposureToSmokeYes}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Yes</span>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="flex items-center space-x-4">
//   <Label className="grid gap-2">
//     Vision
//     <Input
//       type="text"
//       name="vision"
//       value={healthLocalData.vision}
//       onChange={handleInputChange}
//     />
//   </Label>

//   <div className="flex flex-col space-y-3">
//     <div className="flex gap-20">
//       <Label className="grid gap-2 flex flex-wrap">
//         <span className="mt-1">Right: 20/</span>
//         <Input
//           type="text"
//           name="visionRight"
//           value={healthLocalData.visionRight}
//           onChange={handleInputChange}
//           className="w-16 h-6"
//         />
//       </Label>
//       <Label className="grid gap-2 flex flex-wrap">
//         <span className="mt-1">Left: 20/</span>
//         <Input
//           type="text"
//           name="visionLeft"
//           value={healthLocalData.visionLeft}
//           onChange={handleInputChange}
//           className="w-16 h-6"
//         />
//       </Label>
//     </div>

//     <Label className="grid gap-2 flex items-center space-x-2">
//       Eye muscle testing:
//       <div className="flex items-center space-x-2">
//         <Input
//           type="checkbox"
//           name="eyeMuscleTestingNormal"
//           checked={healthLocalData.eyeMuscleTestingNormal}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Normal</span>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Input
//           type="checkbox"
//           name="eyeMuscleTestingAbnormal"
//           checked={healthLocalData.eyeMuscleTestingAbnormal}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Abnormal</span>
//       </div>
//     </Label>
//   </div>
// </div>


// <div className="flex flex-wrap justify-between">
//   <div className="flex items-center space-x-2">
//     <Label className="grid gap-2 flex items-center space-x-2">
//       Referred ?
//       <Input
//         type="checkbox"
//         name="referredNo"
//         checked={healthLocalData.referredNo}
//         onChange={handleInputChange}
//         className="w-4 h-4"
//       />
//       <span>No</span>
//     </Label>
//     <Label className="flex items-center space-x-2">
//       <Input
//         type="checkbox"
//         name="referredYes"
//         checked={healthLocalData.referredYes}
//         onChange={handleInputChange}
//         className="w-4 h-4"
//       />
//       <span>Yes</span>
//     </Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <Label className="grid gap-2 flex items-center space-x-2">
//       Student should wear eyeglasses:
//       <span>No</span>
//       <Input
//         type="checkbox"
//         name="wearEyeglassesNo"
//         checked={healthLocalData.wearEyeglassesNo}
//         onChange={handleInputChange}
//         className="w-4 h-4"
//       />
//     </Label>
//     <div className="flex items-center space-x-2">
//       <span>Yes</span>
//       <Input
//         type="checkbox"
//         name="wearEyeglassesYes"
//         checked={healthLocalData.wearEyeglassesYes}
//         onChange={handleInputChange}
//         className="w-4 h-4"
//       />
//     </div>
//   </div>
// </div>

// <div className="my-4">
//   <Separator />
// </div>
// </div>
// {/* Audiometry Screening Section */}
// <div className="space-y-4">
//   <Label className="grid gap-2">
//     Audiometry Screening
//     <Input
//       type="text"
//       name="audiometryScreening"
//       value={healthLocalData.audiometryScreening}
//       onChange={handleInputChange}
//       className="w-64"
//     />
//   </Label>

//   {/* Audiometry Table */}
//   <table className="min-w-full table-auto border-collapse">
//     <thead>
//       <tr className="bg-gray-100">
//         <th className="p-1 text-left">Audio</th>
//         <th className="p-1 text-left">Right</th>
//         <th className="p-1 text-left">Left</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* Row for 1000 Hz */}
//       <tr>
//         <td className="p-1">1000 Hz</td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio1000Right"
//             value={healthLocalData.audio1000Right}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio1000Left"
//             value={healthLocalData.audio1000Left}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//       </tr>
//       {/* Row for 2000 Hz */}
//       <tr>
//         <td className="p-1">2000 Hz</td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio2000Right"
//             value={healthLocalData.audio2000Right}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio2000Left"
//             value={healthLocalData.audio2000Left}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//       </tr>
//       {/* Row for 3000 Hz */}
//       <tr>
//         <td className="p-1">3000 Hz</td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio3000Right"
//             value={healthLocalData.audio3000Right}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio3000Left"
//             value={healthLocalData.audio3000Left}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//       </tr>
//       {/* Row for 4000 Hz */}
//       <tr>
//         <td className="p-1">4000 Hz</td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio4000Right"
//             value={healthLocalData.audio4000Right}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//         <td className="p-1">
//           <Input
//             type="text"
//             name="audio4000Left"
//             value={healthLocalData.audio4000Left}
//             onChange={handleInputChange}
//             className="w-24"
//           />
//         </td>
//       </tr>
//     </tbody>
//   </table>

//   {/* Referred Checkbox Section */}
//   <div className="flex items-center space-x-4">
//     <Label className="flex items-center space-x-2">
//       Referred?
//       <Input
//         type="checkbox"
//         name="audiometryReferredNo"
//         checked={healthLocalData.audiometryReferredNo}
//         onChange={handleInputChange}
//         className="w-4 h-4 ml-3"
//       />
//       <span>No</span>
//     </Label>
//     <Label className="flex items-center space-x-2">
//       <Input
//         type="checkbox"
//         name="audiometryReferredYes"
//         checked={healthLocalData.audiometryReferredYes}
//         onChange={handleInputChange}
//         className="w-4 h-4"
//       />
//       <span>Yes</span>
//     </Label>
//   </div>
// </div>

// <div className="my-4">
//   <Separator />
// </div>

// <div className="space-y-4">
//   <h3 className="text-lg font-semibold py-2">
//     ADDITIONAL INFORMATION FROM THE HEALTH EXAMINER:
//   </h3>
//   <div className="grid grid-cols-1 gap-4">
//     <div className="flex items-center space-x-4">
//       <Label className="flex items-center space-x-2">
//         Does this child have any conditions that might concern the school?
//         <Input
//           type="radio"
//           name="conditionsConcernNo"
//           checked={healthLocalData.conditionsConcernNo}
//           onChange={handleInputChange}
//           className="w-4 h-4 ml-3"
//         />
//         <span>No</span>
//       </Label>
//       <Label className="flex items-center space-x-2">
//         <Input
//           type="radio"
//           name="conditionsConcernYes"
//           checked={healthLocalData.conditionsConcernYes}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Yes</span>
//       </Label>
//     </div>
//     <div className="flex items-center space-x-4">
//       <Label className="flex items-center space-x-2">
//         If yes, explain condition(s) and recommendations for follow-up:
//         <Input
//           type="text"
//           name="conditionsExplanation"
//           value={healthLocalData.conditionsExplanation}
//           onChange={handleInputChange}
//           className="w-64 ml-2"
//         />
//       </Label>
//     </div>
//     <div className="flex items-center space-x-4">
//       <Label className="flex items-center space-x-2">
//         Are there any restrictions on physical activities?
//         <Input
//           type="radio"
//           name="physicalRestrictionsNo"
//           checked={healthLocalData.physicalRestrictionsNo}
//           onChange={handleInputChange}
//           className="w-4 h-4 ml-3"
//         />
//         <span>No</span>
//       </Label>
//       <Label className="flex items-center space-x-2">
//         <Input
//           type="radio"
//           name="physicalRestrictionsYes"
//           checked={healthLocalData.physicalRestrictionsYes}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Yes</span>
//       </Label>
//     </div>
//     <div className="flex items-center space-x-4">
//       <Label className="flex items-center space-x-2">
//         If yes, explain:
//         <Input
//           type="text"
//           name="physicalRestrictionsExplanation"
//           value={healthLocalData.physicalRestrictionsExplanation}
//           onChange={handleInputChange}
//           className="w-64 ml-2"
//         />
//       </Label>
//     </div>
//     <div className="flex items-center space-x-4">
//       <Label className="flex items-center space-x-2">
//         Does this child take any medications?
//         <Input
//           type="radio"
//           name="medicationsNo"
//           checked={healthLocalData.medicationsNo}
//           onChange={handleInputChange}
//           className="w-4 h-4 ml-3"
//         />
//         <span>No</span>
//       </Label>
//       <Label className="flex items-center space-x-2">
//         <Input
//           type="radio"
//           name="medicationsYes"
//           checked={healthLocalData.medicationsYes}
//           onChange={handleInputChange}
//           className="w-4 h-4"
//         />
//         <span>Yes</span>
//       </Label>
      
//     </div>
//      <div>
//               <Label className="font-bold">If yes, explain:</Label>
//               <Label>
//                 <i className="font-regular">
//                   (If the child must take the medication at school, please request and complete a medication form)
//                 </i>
//                 <Input
//                   type="text"
//                   name="explainReason"
                
//                   onChange={handleInputChange}
//                   className="bg-white mt-2"
//                 />
//               </Label>
//             </div>
//   </div>
// </div>

//           </div>
//           {/* Upload Button */}
//           <div className="flex justify-end">
//             <Button variant="default" onClick={handleNextClick}>
//               Next
//             </Button>
//             </div>
//         </div>
//       </div>
//       </div>
    
//   );
// }
