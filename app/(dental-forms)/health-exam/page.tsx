"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import useThemeStore from "@/components/ThemeContext"; // Import useThemeStore
import { format } from 'date-fns';
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from '@/components/ui/use-toast';
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
export default function HealthSecondForm() {
  const { healthFormData, setHealthFormData } = useThemeStore(); // Access state from the store
  
  const [healthLocalData, setHealthLocalData] = useState({
    "immunizations": {
      "polio": [
        "string","","","",""
      ],
      "dtp_dtap": [
        "string","","","",""
      ],
      "dt_td": [
        "string","","","",""
      ],
      "hib_meningitis": [
         "string","","","",""
      ],
      "mmr": [
        "string","","","",""
      ],
      "hepatitis_b": [
         "string","","","",""
      ],
      "varicella": [
         "string","","","",""
      ],
      "other": [
        "string","","","",""
      ],
      "exemption_reason": "string",
      "exemption_expiration_date": "string"
    },
    "tb_skin_test": {
      "tb_assessment_completed": 'string',
      
      "induration_mm": 0,
      "test_result": "string",
      "overall_result": "string"
      
    },
    
    "examiner_details": {
      "date": "string",
      "examiner_signature": "string",
      "examiner_name": "string",
      "examiner_address": "string",
      "examiner_phone_number": "2231626787",
      "examiner_stamp": "string"
    }})
  const router = useRouter();
  const searchparams=useSearchParams()
  const Reg_id=searchparams?.get('registration_number')
  const view=searchparams?.get('view')
  const toast=useToast()

   useEffect(() => {
      setHealthLocalData((prevData) => ({ ...prevData, ...healthFormData }));
    }, [healthFormData]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split("."); // Split the name into keys for nested access
    const newValue = type === "checkbox" ? checked : value;
  
    setHealthLocalData((prev) => {
      // Deep clone the previous state
      const updated = { ...prev };
      let nested = updated;
  
      // Traverse to the second-to-last key
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nested[keys[i]]) {
          nested[keys[i]] = {}; // Initialize if undefined
        }
        nested = nested[keys[i]];
      }
  
      // Update the final key with the new value
      nested[keys[keys.length - 1]] = newValue;
      return updated;
    });
  };
  
  const handleArrayChange = (field, index, value) => {
    setHealthLocalData((prevData) => {
      const updatedArray = [...prevData.immunizations[field]];
      updatedArray[index] = value;
      return {
        ...prevData,
        immunizations: {
          ...prevData.immunizations,
          [field]: updatedArray,
        },
      };
    });
  };

  const handleRadioChange = (path, value) => {
    const keys = path.split("."); // Split the path for nested keys
    if (name.includes("date")) {
      const date = new Date(value);
      if (!isNaN(date)) {
        value = format(date, 'yyyy-MM-dd'); // Custom format (e.g., '2024-12-19')
      }
    }  
    setHealthLocalData((prev) => {
      const updated = { ...prev };
      let nested = updated;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nested[keys[i]]) {
          nested[keys[i]] = {}; // Initialize if undefined
        }
        nested = nested[keys[i]];
      }
  
      nested[keys[keys.length - 1]] = value; // Set the selected radio value
      return updated;
    });    
  };
  
  const handleBackClick = () => {
    setHealthFormData(healthLocalData);
    if(view){
    router.push(`/healthexamination/?registration_number=${Reg_id}&view=true`);
    }
    else{
      router.push(`/healthexamination/?registration_number=${Reg_id} `);
    }
  };

  const handleSubmit = async () => {
  console.log(healthLocalData)
    setHealthFormData(healthLocalData);
  try{
    const response=await axiosInstance.post(`/health-records/?registration_id=${Reg_id}`,healthLocalData)
    if (response.status === 200) {
      router.push('/Registration')
      toast({
        title: 'Success',
        description: 'health form submitted successfully!',
        variant: 'default',
      });
    } 
  }
  catch (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  }
  };
  
   const handelUpdateForm=async ()=>{
    try{
      const response=await axiosInstance.put(`/health-records/${Reg_id}/?registration_id=${Reg_id}`,healthLocalData)
      console.log(response)
    }
     catch(error){
      console.log(error)
     }
   }
  return (
    <div className=" max-w-6xl mx-auto p-5  relative overflow-hidden">
         <DecorativeBorder />
      {/* Decorative border */}
      <div className="absolute inset-0 w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
          {/* Border decoration */}
        </svg>
      </div>
      <div className="relative z-10 space-y-6 p-6">
        

        <h3 className="text-lg font-semibold">ENTER IMMUNISATION DATES</h3>
        <table className="w-full table-auto ">
          <tbody>
          {[
              { label: "Polio (OPV or IPV)", field: "polio" },
              { label: "DTP/DtaP", field: "dtp_dtap" },
              { label: "DT/Td", field: "dt_td" },
              { label: "HIB Meningitis", field: "hib_meningitis" },
              { label: "MMR", field: "mmr" },
              { label: "Hepatitis B", field: "hepatitis_b" },
              { label: "Varicella", field: "varicella" },
              { label: "Other", field: "other" },
            ].map(({ label, field }, rowIndex) => (
              <tr key={field} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
                <td className=" py-2 border">{label}</td>
                {healthLocalData.immunizations[field].map((date, index) => (
                  <td key={index} className=" py-2 border">
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Label>
          If any required immunisation was not given, list the reason:
          <Input
            type="text"
            name="immunizations.exemption_reason"
            value={healthLocalData.immunizations.exemption_reason}
            onChange={handleInputChange}
          />
        </Label>

        <Label className="flex gap-3 items-center flex-wrap">
          Exemption Expiration Date:
          <Input
            type="date"
            name="immunizations.exemption_expiration_date"
            value={healthLocalData.immunizations.exemption_expiration_date}
            onChange={handleInputChange}
            className="w-38"
          />
        </Label>

        <hr />
        <Label>
          TB skin test (PPD or clearance) is required for school entry regardless of BCG
        </Label>
        <Label className="flex gap-3 items-center flex-wrap">
          <Input
            type="text"
            name="tb_skin_test.tb_assessment_completed"
            value={healthLocalData.tb_skin_test.tb_assessment_completed}
            onChange={handleInputChange}
            className="w-20 h-8"
          />
          TB assessment completed, not at risk, deferred PPD
        </Label>

        <Label className="flex gap-3 items-center flex-wrap">
          Induration
          <Input
            type="text"
            name="tb_skin_test.induration_mm"
            value={healthLocalData.tb_skin_test.induration_mm}
            onChange={handleInputChange}
            className="w-20 h-6"
          />
          mm
        </Label>

        <Label className="flex items-center gap-4">
          Result:
          <RadioGroup
            defaultValue={healthLocalData.tb_skin_test.test_result}
            onValueChange={(value) => handleRadioChange("tb_skin_test.test_result", value)}
          
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Positive" />
              <Label>Positive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Negative" />
              <Label>Negative</Label>
            </div>
          </RadioGroup>
        </Label>
        <Label>Chest X-Ray required if positive</Label>
        <div>
          <Separator/>
        </div>
        
        <div className="grid grid-cols-2">
        <Label className="flex gap-3 items-center flex-wrap">
          Date:
          <Input
            type="date"
            name="examiner_details.date"
            value={healthLocalData.examiner_details.date}
            onChange={handleInputChange}
            className="w-56"
          />
        </Label>
        <RadioGroup
            defaultValue={healthLocalData.tb_skin_test.overall_result}
            onValueChange={(value) => handleRadioChange("tb_skin_test.test_result", value)}
            className="flex flex-row"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Normal" />
              <Label>Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Abnormal" />
              <Label>Abnormal</Label>
            </div>
          </RadioGroup>
        </div>
        <Label className="flex gap-3 items-center flex-wrap">
          Examiner's Name:
          <Input
            type="text"
            name="examiner_details.examiner_signature"
            value={healthLocalData.examiner_details.examiner_signature}
            onChange={handleInputChange}
            className="w-56"
          />
        </Label>
        <div>
          <Label>Stamp or print the examiner's name,address & phone number</Label>
          
          <div className="w-80 h-40 border-4 border-[#71a3b8]  flex   justify-center text-center ml-16 mt-3">
              </div>
        </div>

        <div className="flex justify-between cursor-pointer">
          <Button type="button" variant="outline" onClick={handleBackClick}>
            Back
          </Button>
         {!view? (<Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>):(<Button onClick={handelUpdateForm}>save</Button>)}
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#ff6347]">
            My School <span className="text-[#4682b4]">ITALY</span>
          </h1>
        </div>
        <p className="text-end">HEALTH EXAM FORM</p>
      </div>
    </div>
  );
}
