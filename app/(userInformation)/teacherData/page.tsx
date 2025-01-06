

 "use client";

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
 
 
 
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Banknote, Building2, Download, GraduationCap,  MapPin,  } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeacherData = () => {
  return (
    <div className="space-y-6">
      
   {/* Teachers Information */}
   <Card className="p-3">
        <CardContent className='p-2 gap-2 grid'>
          <CardTitle className="text-lg font-semibold  mb-2">Teacher Information</CardTitle>
          
        
         
<Separator />
<CardContent className=" p-0  mt-1 my-2 ">
  <div className="flex flex-col space-y-4">
   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex items-center space-x-2">
        <div className="flex flex-col">
        <span className="font-semibold text-gray-700">Father</span>
          <span className="  ">VV Reddy</span>
          
        </div>
      </div>
      <div className="flex flex-col">
      <span className="font-semibold text-gray-700 ">Mother</span>
          <span className="text-gray-600">V Amrutha</span>
     
        </div>
        <div className="flex flex-col">
        <span className="font-semibold text-gray-700 ">DOB</span>
          <span className="  text-gray-700">23-09-444</span>
       
        </div>
    </div>

   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  
 
  <div className="flex items-center space-x-2">
  
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700">Marital Status:</span>
      <span className="text-gray-600">Single</span>    
    </div>
  </div>
 
  <div className="flex items-center space-x-2">
  
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700">Qualification:</span>
      <span className="text-gray-600">Bachelor's Degree</span>    
    </div>
  </div>

 
  <div className="flex items-center space-x-2">
 
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700">Experience:</span>
      <span className="text-gray-600">5 years</span>  
    </div>
  </div>
</div>


  
  </div>
</CardContent>


      

     
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
              <span className="text-gray-700 font-medium">Resume.pdf</span>
            </div>
            <Button variant="ghost">
              <Download className="h-5 w-5 text-gray-600" />
            </Button>
          </CardContent>
          <CardContent className="flex items-center justify-between  px-2 py-1  rounded border">
            <div className="flex items-center space-x-3 ml-2">
              <span className="text-gray-700 font-medium">JoiningLetter.pdf</span>
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
  <Separator  />
        <CardContent className='mt-5 p-0 grid gap-5 '>
         
        <div className="flex items-center space-x-3">
            <MapPin className="text-gray-500" size={18}/>
            <div className="flex flex-col">
              <Label className="font-medium">Present Address</Label>
              <span className="text-gray-700">123 Main St, Cityville</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="text-gray-500" size={18}/>
            <div className="flex flex-col">
              <Label className="font-medium">Permanent Address</Label>
              <span className="text-gray-700">456 Elm St, Townsville</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-5">
  <CardTitle className="text-lg font-semibold px-2 mb-2">Bank Details</CardTitle>
  <Separator />
  <CardContent className="p-0 mt-5 grid gap-5">

    <div className="flex items-center space-x-3">
      <Banknote className="text-gray-500" size={16} />
      <div className="flex flex-col">
        <Label className="font-medium">Bank Name</Label>
        <span className="text-gray-700">Bank of America</span>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <Building2 className="text-gray-500" size={16} />
      <div className="flex flex-col">
        <Label className="font-medium">Branch</Label>
        <span className="text-gray-700">Cincinnati</span>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <MapPin className="text-gray-500" size={16} />
      <div className="flex flex-col">
        <Label className="font-medium">IFSC</Label>
        <span className="text-gray-700">BOA83209832</span>
      </div>
    </div>

  </CardContent>
</Card>

   {/* Previous School Details */}
   <Card className="p-5      ">
      <CardTitle className="text-lg font-semibold px-2  mb-2">Previous School Details</CardTitle>
      <Separator  />
        <CardContent className='p-0 mt-5 grid gap-5'>
        
       
          

          <div className="flex items-center space-x-3">
            <MapPin className="text-gray-500" size={16}/>
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

export default TeacherData;
