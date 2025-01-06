'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';

const OralHealthForm = () => {
  const [formData, setFormData] = useState({
    childs_last_name: '',
    given_names: '',
    birth_date: '',
    school_name: '',
    grade: '',
    gender: 'male',
    address: '',
    parent_name: '',
    assessment_date: new Date().toISOString().split('T')[0],
    visible_caries_present: false,
    fillings_present: false,
    treatment_urgency: 'No obvious problem found',
    examiner_stamp: '',
    examiner_name: '',
    examiner_address: '',
    examiner_phone_number: '9059228311',
    examiner_signature: '',
    submission_date: new Date().toISOString().split('T')[0]
  });
  const router=useRouter()
  const searchparams=useSearchParams()
  const Reg_id=searchparams?.get('registration_number')
  const view=searchparams?.get('view')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can replace this with an API call to submit the form data
    try{
   const response= await axiosInstance.post(`/oral-health-records/?registration_id=${Reg_id}`,formData)
    
   if(response.status===200){
    router.push('/Registration')
    toast({
      title: 'Success',
      description: 'Admission enquiry created successfully!',
      variant: 'default',
    });
  }
  else{
    alert("Error: Something went wrong. Please try again.");
  }
    }
    catch(error){
      toast({
        title: 'Error',
        description: 'An error occurred while updating the daycare enrollment.',
        variant: 'destructive',
      });
    }
  };

  useEffect(()=>{
    const fetchDetails=async ()=>{
    const response= await axiosInstance.get(`/oral-health-record-details/${Reg_id}/`)

 setFormData(response.data.oral_health_record)
 
  }

fetchDetails()
  },[])
  const handleUpdateForm=async ()=>{
    try{
      const response= await axiosInstance.put(`/oral-health-records/${Reg_id}/?registration_id=${Reg_id}`,formData)
       
      if(response.status===200){
      
       toast({
         title: 'Success',
         description: 'Admission enquiry created successfully!',
         variant: 'default',
       });
     }
     else{
       alert("Error: Something went wrong. Please try again.");
     }
       }
       catch(error){
         toast({
           title: 'Error',
           description: 'An error occurred while updating the daycare enrollment.',
           variant: 'destructive',
         });
       }

  }

  return (
    <div className="max-w-4xl mx-auto p-8   relative overflow-hidden">
    {/* Decorative border */}
   
    <div className="absolute inset-0 w-full h-full  ">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="borderPattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Light Green Circle */}
            <circle cx="5" cy="5" r="3" fill="#8A2BE2" />
            {/* Medium Green Ellipse */}
            <ellipse cx="10" cy="10" rx="3" ry="7" fill="#32CD32" />
            {/* Dark Green Circle */}
            <circle cx="20" cy="20" r="5" fill="#006400" />
            {/* Violet Ellipse */}
            <ellipse cx="25" cy="10" rx="7" ry="5" fill="#91c457" />
            {/* Light Green Large Circle */}
            <circle cx="30" cy="30" r="7" fill="#90EE90" />
            {/* Darker Green Ellipse */}
            <ellipse cx="35" cy="25" rx="8" ry="6" fill="#73944d" />
          </pattern>
        </defs>
        {/* Apply the pattern to all borders */}
        <rect x="0" y="0" width="30" height="100%" fill="url(#borderPattern)" />
        <rect
          x="30"
          y="0"
          width="calc(100% - 60px)"
          height="30"
          fill="url(#borderPattern)"
        />
        <rect
          x="30"
          y="calc(100% - 30px)"
          width="calc(100% - 60px)"
          height="30"
          fill="url(#borderPattern)"
        />
        <rect
          x="calc(100% - 30px)"
          y="30"
          width="30"
          height="calc(100% - 60px)"
          fill="url(#borderPattern)"
        />
      </svg>
    </div>
    <div className="relative z-10 space-y-6 p-6">
        <h1 className='text-xl font-semibold text-center'>ORAL HEALTH ASSESSMENT FORM</h1>
        <div className='text-center'>
            <h3 className='font-bold'>SECTION 1</h3>
            <u>To be completed by the parent or the guardian</u>
        </div>
        <div className='bg-gray-100 border'>
        <div className='grid lg:grid-cols-3 grid-cols-1 p-3 gap-4 bg-white'>
            <Label className='grid gap-2'>Child's last name: <Input type='text' className='bg-white' value={formData.childs_last_name} onChange={handleChange} name='childs_last_name'/></Label>
            <Label className='grid gap-2'>Given Name: <Input type='text' className='bg-white' value={formData.given_names} onChange={handleChange} name='given_names'/></Label>
            <Label className='grid gap-2'>Birth Date: <Input type='date' className='bg-white' value={formData.birth_date} onChange={handleChange} name='birth_date'/></Label>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 p-3 gap-4 bg-gray-50'>
            <Label className='grid gap-2'>School Name: <Input type='text' className='bg-white'name='school_name' onChange={handleChange} value={formData.school_name}/></Label>
            <Label className='grid gap-2'>Grade: <Input type='text' className='bg-white' onChange={handleChange} name='grade' value={formData.grade}/></Label>
           <Label>Gender:<RadioGroup defaultValue="male" className="flex flex-row mt-5"  onValueChange={value => setFormData(prev => ({ ...prev, gender: value }))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup></Label>
        </div>
        <div className='p-3 bg-white'>
        <Label className='flex gap-4 items-center'>Address:
          <Input type='text h-8'  className='bg-white h-8'onChange={handleChange} name='address' value={formData.address}/></Label>
        </div>
        <div className="p-3 flex items-center bg-gray-50 space-x-3">
  <Label className="flex-shrink-0 whitespace-nowrap">Parent/Guardian Name:</Label>
  <Input type="text" className="flex-grow h-8 bg-white" onChange={handleChange} name='parent_name' value={formData.parent_name}/>
</div>
        </div>
        <div className='text-center'>
            <h3 className='font-semibold'>SECTION 2</h3>
           <u>To be completed by the dental professional conducting the assessment</u>
        </div>
        <div className='flex items-start justify-between gap-4 grid-cols-1 border p-3'>
            <Label className='grid '>Assessment Date:
              <Input type='date' className='bg-white w-36 mt-3'  onChange={handleChange} name='assessment_date' value={formData.assessment_date}/></Label>
            <Label>Visible caries Present: <RadioGroup value={formData.visible_caries_present} className=" mt-5 "  onValueChange={value => setFormData(prev => ({ ...prev, visible_caries_present: value }))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={true} id="male" />
            <Label htmlFor="male">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={false} id="female" />
            <Label htmlFor="female">No</Label>
          </div>
        </RadioGroup></Label>
        <Label>Filling Present: <RadioGroup defaultValue="male" className=" mt-5 " value={formData.fillings_present} onValueChange={value => setFormData(prev => ({ ...prev, fillings_present: value }))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={true} id="male" />
            <Label htmlFor="male">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={false} id="female" />
            <Label htmlFor="female">No</Label>
          </div>
        </RadioGroup></Label>
        <Label>Treatment Urgency: 
          <RadioGroup value={formData.treatment_urgency} className=" mt-5" onValueChange={value => setFormData(prev => ({ ...prev, treatment_urgency: value }))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No bvious problem found" id="male" />
            <Label htmlFor="male">No bvious problem found</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Early Dental care recomended" id="female" />
            <Label htmlFor="female">Early Dental care recomended</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Urgent Care needed" id="female" />
            <Label htmlFor="female">Urgent Care needed</Label>
          </div>
        </RadioGroup></Label>
        </div>
        <div className='mt-3'>
        <Label>Stamp or print the examinar's name,adress & phone number</Label>
    <div className="lg:w-[300px]  w-60 h-40 border-4 border-[#71a3b8] rounded flex   justify-center text-center lg:ml-10">

</div>
</div>
<Label className="flex gap-3 items-center flex-wrap font-semibold"><i>Dental professional's Name:</i>
 <Input type="text" className="w-40" value={formData.examiner_name} name='examiner_name' onChange={handleChange}/></Label>
<Label className="flex gap-3 items-center flex-wrap ml-40 font-semibold">Date:
  <Input type="date" className=" w-38" value={formData.submission_date} onChange={handleChange} name='submission_date'/></Label>
<div className="text-center">
<div className="flex justify-between">
  <Button onClick={()=>{router.push('/Registration')}}>Back To Registration</Button>
    {!view?(<Button onClick={handleSubmit}>submit</Button>):(<Button onClick={handleUpdateForm}>save</Button>)}
</div>
<h1 className="text-4xl font-bold text-[#ff6347]">
        My School <span className="text-[#4682b4]">ITALY</span>
      </h1>
</div>
<p className='text-end'>ORAL HEALTH FORM</p>
        </div>
        </div>
  )
}

export default OralHealthForm
// import React from 'react'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from '@/components/ui/button';
// const OralHealthForm = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-8   relative overflow-hidden">
//     {/* Decorative border */}
   
//     <div className="absolute inset-0 w-full h-full  ">
//       <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="borderPattern"
//             x="0"
//             y="0"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             {/* Light Green Circle */}
//             <circle cx="5" cy="5" r="3" fill="#8A2BE2" />
//             {/* Medium Green Ellipse */}
//             <ellipse cx="10" cy="10" rx="3" ry="7" fill="#32CD32" />
//             {/* Dark Green Circle */}
//             <circle cx="20" cy="20" r="5" fill="#006400" />
//             {/* Violet Ellipse */}
//             <ellipse cx="25" cy="10" rx="7" ry="5" fill="#91c457" />
//             {/* Light Green Large Circle */}
//             <circle cx="30" cy="30" r="7" fill="#90EE90" />
//             {/* Darker Green Ellipse */}
//             <ellipse cx="35" cy="25" rx="8" ry="6" fill="#73944d" />
//           </pattern>
//         </defs>
//         {/* Apply the pattern to all borders */}
//         <rect x="0" y="0" width="30" height="100%" fill="url(#borderPattern)" />
//         <rect
//           x="30"
//           y="0"
//           width="calc(100% - 60px)"
//           height="30"
//           fill="url(#borderPattern)"
//         />
//         <rect
//           x="30"
//           y="calc(100% - 30px)"
//           width="calc(100% - 60px)"
//           height="30"
//           fill="url(#borderPattern)"
//         />
//         <rect
//           x="calc(100% - 30px)"
//           y="30"
//           width="30"
//           height="calc(100% - 60px)"
//           fill="url(#borderPattern)"
//         />
//       </svg>
//     </div>
//     <div className="relative z-10 space-y-6 p-6">
//         <h1 className='text-xl font-semibold text-center'>ORAL HEALTH ASSESSMENT FORM</h1>
//         <div className='text-center'>
//             <h3 className='font-bold'>SECTION 1</h3>
//             <u>To be completed by the parent or the guardian</u>
//         </div>
//         <div className='bg-gray-100 border'>
//         <div className='grid lg:grid-cols-3 grid-cols-1 p-3 gap-4 bg-white'>
//             <Label className='grid gap-2'>Child's last name: <Input type='text' className='bg-white'/></Label>
//             <Label className='grid gap-2'>Given Name: <Input type='text' className='bg-white'/></Label>
//             <Label className='grid gap-2'>Birth Date: <Input type='date' className='bg-white'/></Label>
//         </div>
//         <div className='grid lg:grid-cols-3 grid-cols-1 p-3 gap-4 bg-gray-50'>
//             <Label className='grid gap-2'>School Name: <Input type='text' className='bg-white'/></Label>
//             <Label className='grid gap-2'>Grade: <Input type='text' className='bg-white'/></Label>
//            <Label>Gender:<RadioGroup defaultValue="male" className="flex flex-row mt-5">
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="male" id="male" />
//             <Label htmlFor="male">Male</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="female" id="female" />
//             <Label htmlFor="female">Female</Label>
//           </div>
//         </RadioGroup></Label>
//         </div>
//         <div className='p-3 bg-white'>
//         <Label className='flex gap-4 items-center'>Address:<Input type='text h-8'  className='bg-white h-8'/></Label>
//         </div>
//         <div className="p-3 flex items-center bg-gray-50 space-x-3">
//   <Label className="flex-shrink-0 whitespace-nowrap">Parent/Guardian Name:</Label>
//   <Input type="text" className="flex-grow h-8 bg-white" />
// </div>
//         </div>
//         <div className='text-center'>
//             <h3 className='font-semibold'>SECTION 2</h3>
//            <u>To be completed by the dental professional conducting the assessment</u>
//         </div>
//         <div className='flex items-start justify-between gap-4 grid-cols-1 border p-3'>
//             <Label className='grid '>Assessment Date:<Input type='date' className='bg-white w-36 mt-3'/></Label>
//             <Label>Visible caries Present: <RadioGroup defaultValue="male" className=" mt-5 ">
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="Yes" id="male" />
//             <Label htmlFor="male">Yes</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="No" id="female" />
//             <Label htmlFor="female">No</Label>
//           </div>
//         </RadioGroup></Label>
//         <Label>Filling Present: <RadioGroup defaultValue="male" className=" mt-5 ">
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="Yes" id="male" />
//             <Label htmlFor="male">Yes</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="No" id="female" />
//             <Label htmlFor="female">No</Label>
//           </div>
//         </RadioGroup></Label>
//         <Label>Treatment Urgency: <RadioGroup defaultValue="male" className=" mt-5">
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="No bvious problem found" id="male" />
//             <Label htmlFor="male">No bvious problem found</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="Early Dental care recomended" id="female" />
//             <Label htmlFor="female">Early Dental care recomended</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="Urgent Care needed" id="female" />
//             <Label htmlFor="female">Urgent Care needed</Label>
//           </div>
//         </RadioGroup></Label>
//         </div>
//         <div className='mt-3'>
//         <Label>Stamp or print the examinar's name,adress & phone number</Label>
//     <div className="lg:w-[300px]  w-60 h-40 border-4 border-[#71a3b8] rounded flex   justify-center text-center lg:ml-10">

// </div>
// </div>
// <Label className="flex gap-3 items-center flex-wrap font-semibold"><i>Dental professional's Name:</i> <Input type="text" className="w-40"/></Label>
// <Label className="flex gap-3 items-center flex-wrap ml-40 font-semibold">Date:<Input type="date" className="  w-38"/></Label>
// <div className="text-center">
// <div className="text-end">
//     <Button>submit</Button>
// </div>
// <h1 className="text-4xl font-bold text-[#ff6347]">
//         My School <span className="text-[#4682b4]">ITALY</span>
//       </h1>
// </div>
// <p className='text-end'>ORAL HEALTH FORM</p>
//         </div>
//         </div>
//   )
// }

// export default OralHealthForm