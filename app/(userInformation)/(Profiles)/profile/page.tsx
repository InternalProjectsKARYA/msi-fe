"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
 
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Smartphone  } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Edit, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentData from "../../studentData/page";
import TeacherData from "../../teacherData/page";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthContext } from "@/lib/AuthProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";


export default function Profile() {
  const router = useRouter();
  const { Id } = useAuthContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [classrooms, setClassRooms] = useState([]);
  const [transports, setTransports] = useState([]);
  const [file, setFile] = useState([]);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    father_contact_number: "",
    mother_contact_number: "",
    guardian_contact_number: "",
    present_address: "",
    permanent_address: "",
    guardian_address: "",
    gender: "",
    classroom_id: "",
    transport_id: "",
    isParent: false,  // Add default value
    isGuardian: false,  // Add default value

  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(`/get_profile/${Id}`);
        const { data } = response.data;
        setProfileData({
          ...data,
          name: `${data.first_name} ${data.last_name}` || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchClassRooms = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_classrooms/`);
        setClassRooms(response.data.classrooms); // Set the fetched array into state
      } catch (error: any) {
        console.error(
          "Error fetching classrooms:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchTransports = async () => {
      try {
        const response = await axiosInstance.get(`/get_all_transport_fee/`);
        setTransports(response.data.fees);
      } catch (error: any) {
        console.error(
          "Error fetching transport fees:",
          error.response ? error.response.data : error.message
        );

      }

    };

    fetchProfileData();
    fetchClassRooms();
    fetchTransports();
  }, [Id]);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleProfileSave = async () => {
    try {
      // Structure the profile data
      const profilePayload = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        gender: profileData.gender,
        date_of_birth: profileData.date_of_birth, // Ensure this is in the correct format
        classroom_id: profileData.classroom_id,
        transport_id: profileData.transport_id,
        father_name: profileData.father_name,
        mother_name: profileData.mother_name,
        guardian_name: profileData.guardian_name,
        father_contact_number: profileData.father_contact_number,
        mother_contact_number: profileData.mother_contact_number,
        guardian_contact_number: profileData.guardian_contact_number,
        present_address: profileData.present_address,
        permanent_address: sameAddress ? profileData.present_address : profileData.permanent_address,
        guardian_address: profileData.guardian_address,
      };

      const response = await axiosInstance.put(
        `/update_profile/${Id}`,
        profilePayload
      );

      if (response.status === 201) {
        console.log("Profile updated successfully", response.data.message);
        toast({ title: "Success", description: "Profile updated successfully" });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        `/upload-profile-image/${Id}/student`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        console.log("Profile picture uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddressCheckboxChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setProfileData((prevData) => ({
        ...prevData,
        permanent_address: prevData.present_address,
      }));
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-3">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleEditClick}
              className="text-gray-600"
            >
              <Edit />
              <span className="font-bold">Edit</span>
            </Button>
            <Button onClick={() => router.push("/resetpassword")}>
              Reset Password
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section */}
          <div className="col-span-3 space-y-6">
            <Card className="p-5">
              <CardContent className="p-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative mt-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
                    >
                      <PencilIcon className="w-4 h-4 text-gray-600" />
                    </label>
                    <Input id="profilePicture" type="file" className="hidden" onChange={handleFileChange} />
                  </div>

                  <div className="ml-6 space-y-2">
                    <p className="text-lg font-semibold">{profileData.name}</p>
                    <p className="text-sm text-gray-500">
                      Admission ID: {profileData.enrollment_id}
                    </p>
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      {profileData.login_status ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>
                <Separator className="my-5" />
                <CardTitle className="text-lg font-semibold">Basic Details</CardTitle>
                <div className="mt-4 space-y-4">
                  {/* Fields */}
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Roll No</Label>
                    <span className="text-gray-700">182U1A0176</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">First Name</Label>
                    <span className="text-gray-700">{profileData.first_name}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Last Name</Label>
                    <span className="text-gray-700">{profileData.last_name}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Gender</Label>
                    <span className="text-gray-700">{profileData.gender}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Date Of Birth</Label>
                    <span className="text-gray-700">
                      {formatDate(profileData.date_of_birth)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Class</Label>
                    <span className="text-gray-700">{profileData.class_name}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Section</Label>
                    <span className="text-gray-700">{profileData.section_name}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Transport Route</Label>
                    <span className="text-gray-700">{profileData.transport_route}</span>
                  </div>
                  {/* <div className="flex flex-wrap items-center space-x-4">
                    <Label className="w-24 font-medium">Religion</Label>
                    <span className="text-gray-700">Hindu</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card className="p-5">
              <CardTitle className="text-lg font-semibold px-1 mb-2">
                Primary Contact Info
              </CardTitle>
              <Separator />
              <CardContent className="p-0">
                <div className="mt-5 grid gap-3">
                  <div className="flex flex-wrap items-center space-x-4">
                    <Mail size={16} color="currentColor" />
                    <Label className="w-24 font-medium">Email Address</Label>
                    <span className="text-gray-700">{profileData.email}</span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4">
                    <Smartphone size={16} color="currentColor" />
                    <Label className="w-24 font-medium">Mobile</Label>
                    <span className="text-gray-700">{profileData.mobile}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="col-span-9 flex flex-col space-y-6">
            <Tabs defaultValue="Student">
              <TabsList className="grid grid-cols-2 lg:w-[600px]">
                <TabsTrigger value="Student" Id={Id}>Student Details</TabsTrigger>
                <TabsTrigger value="Teacher" Id={Id}>Teacher Details</TabsTrigger>
              </TabsList>

              <TabsContent value="Student">
                <div className="mt-3">
                  <StudentData Id={Id} /> {/* Pass Id to StudentData */}
                </div>
              </TabsContent>
              <TabsContent value="Teacher">
                <TeacherData Id={Id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Dialog for Editing Profile */}


        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-auto max-w-full">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-8 py-4">

              {/* Personal Details Section */}

              <div className="w-full">
                <CardTitle className="text-lg font-semibold">Personal Details</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "first_name", label: "First Name" },
                    { id: "last_name", label: "Last Name" },
                    { id: "email", label: "Email Address", type: "email" },
                    { id: "mobile", label: "Mobile", type: "tel" },
                    // { id: "roll", label: "Roll No" },
                    // { id: "religion", label: "Religion" },
                  ].map(({ id, label, type = "text" }) => (
                    <div key={id} className="flex items-center space-x-4">
                      <Label htmlFor={id} className="w-48 font-medium">
                        {label}
                      </Label>
                      <Input
                        id={id}
                        type={type}
                        value={profileData[id] || ""}
                        onChange={(e) =>
                          setProfileData({ ...profileData, [id]: e.target.value })
                        }
                      />
                    </div>
                  ))}

                  {/* Gender and DOB Fields beside each other */}
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="gender" className="w-48 font-medium">
                      Gender
                    </Label>
                    <select
                      id="gender"
                      value={profileData.gender || ""}
                      onChange={(e) =>
                        setProfileData({ ...profileData, gender: e.target.value })
                      }
                      className="p-2 border rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <Label htmlFor="date_of_birth" className="w-48 font-medium">
                      DOB
                    </Label>
                    <input
                      type="date"
                      id="date_of_birth"
                      value={profileData.date_of_birth || ""}
                      onChange={(e) =>
                        setProfileData({ ...profileData, date_of_birth: e.target.value })
                      }
                      className="p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>



              {/* Family Details Section */}
              <div className="w-full mt-6">
                <CardTitle className="text-lg font-semibold">Family Details</CardTitle>
                <div className="flex flex-col space-y-4">
                  {/* Parent or Guardian Checkbox */}
                  {/* Parent Checkbox */}
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        id="isParent"
                        checked={!!profileData.isParent}
                        onChange={(e) =>
                          setProfileData({ ...profileData, isParent: e.target.checked, isGuardian: false })
                        }
                        className="h-4 w-4" // Small size
                      />
                      <Label htmlFor="isParent" className="font-medium text-sm">Parent</Label>
                    </div>

                    {/* Guardian Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        id="isGuardian"
                        checked={!!profileData.isGuardian}
                        onChange={(e) =>
                          setProfileData({ ...profileData, isGuardian: e.target.checked, isParent: false })
                        }
                        className="h-4 w-4" // Small size
                      />
                      <Label htmlFor="isGuardian" className="font-medium text-sm">Guardian</Label>
                    </div>
                  </div>
                  {/* Display Parent or Guardian Details */}
                  {profileData.isParent && (
                    <>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="father_name" className="w-48 font-medium">Father Name</Label>
                        <Input
                          id="father_name"
                          value={profileData.father_name || ""}
                          onChange={(e) => setProfileData({ ...profileData, father_name: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="father_contact_number" className="w-48 font-medium">Father Contact</Label>
                        <Input
                          id="father_contact_number"
                          value={profileData.father_contact_number || ""}
                          onChange={(e) => setProfileData({ ...profileData, father_contact_number: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="mother_name" className="w-48 font-medium">Mother Name</Label>
                        <Input
                          id="mother_name"
                          value={profileData.mother_name || ""}
                          onChange={(e) => setProfileData({ ...profileData, mother_name: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="mother_contact_number" className="w-48 font-medium">Mother Contact</Label>
                        <Input
                          id="mother_contact_number"
                          value={profileData.mother_contact_number || ""}
                          onChange={(e) => setProfileData({ ...profileData, mother_contact_number: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {profileData.isGuardian && (
                    <>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="guardian_name" className="w-48 font-medium">Guardian Name</Label>
                        <Input
                          id="guardian_name"
                          value={profileData.guardian_name || ""}
                          onChange={(e) => setProfileData({ ...profileData, guardian_name: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Label htmlFor="guardian_contact_number" className="w-48 font-medium">Guardian Contact</Label>
                        <Input
                          id="guardian_contact_number"
                          value={profileData.guardian_contact_number || ""}
                          onChange={(e) => setProfileData({ ...profileData, guardian_contact_number: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Address Details Section */}
              <div className="w-full mt-6">
                <CardTitle className="text-lg font-semibold">Address Details</CardTitle>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="present_address" className="w-48 font-medium">
                      Present Address
                    </Label>
                    <Input
                      id="present_address"
                      value={profileData.present_address || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Label htmlFor="permanent_address" className="w-48 font-medium">
                      Permanent Address
                    </Label>
                    <Input
                      id="permanent_address"
                      value={profileData.permanent_address || ""}
                      onChange={handleInputChange}
                      disabled={sameAddress} // Disable when checkbox is checked
                    />
                  </div>

                  {/* Same Address Checkbox */}
                  <div className="flex items-center space-x-4 mt-4">
                    <Input
                      type="checkbox"
                      id="sameAddress"
                      checked={sameAddress}
                      onChange={handleAddressCheckboxChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="sameAddress" className="font-medium text-sm">
                      Same as Present Address
                    </Label>
                  </div>
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="w-full mt-6">
                <CardTitle className="text-lg font-semibold">Curriculum</CardTitle>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="classroom_id" className="w-48 font-medium">
                      Classroom
                    </Label>
                    <Select
                      value={profileData.classroom_id || ""}
                      onValueChange={(value) =>
                        setProfileData((prevData) => ({
                          ...prevData,
                          classroom_id: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Classroom" />
                      </SelectTrigger>
                      <SelectContent>
                        {classrooms.length > 0
                          ? classrooms.map((classroom) => (
                            <SelectItem key={classroom.classroom_id} value={classroom.classroom_id}>
                              {`${classroom.class_standards} - ${classroom.section_name}`}
                            </SelectItem>
                          ))
                          : <SelectItem value="">No Classrooms Available</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Label htmlFor="transport_id" className="w-48 font-medium">
                      Transport
                    </Label>
                    <Select
                      value={profileData.transport_id}
                      onValueChange={(value) =>
                        setProfileData((prevData) => ({
                          ...prevData,
                          transport_id: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Transport" />
                      </SelectTrigger>
                      <SelectContent>
                        {transports.map((transport) => (
                          <SelectItem key={transport.transport_id} value={transport.transport_id}>
                            {`${transport.root} - ₹${transport.transport_fee}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </div>
    </>
  );

}
