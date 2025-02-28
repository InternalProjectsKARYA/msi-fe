"use client";
 
import React, { useEffect,useState, useRef } from "react";
import { Book, Calendar, GraduationCap, Languages, Menu, Users, Utensils, X } from "lucide-react";
import Image from "next/image";
import MyImage from "../../public/student1.jpg";
import { Link } from "react-scroll";
import BookImage from "../../public/student1.jpg";
import BookImageSecond from '../../public/landingiamge.webp';
import MiddleImage from '../../public/student1.jpg';
import { MapPin, Phone, Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import AOS from 'aos';
import Logo from '../../public/header.png';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import 'aos/dist/aos.css';
import BrightwheelHero from "../landingHeader/page";
import TabsDemo from "../(content)/tabs/page";
import { BrainCircuit, Clock, Library, Wallet } from "lucide-react";
 
const teachers = [
  {
    id: 1,
    image: "/full-body.avif",  
    name: "Sharma",
    title: "Founder",
  },
  {
    id: 2,
    image: "/teacherr1.avif",
    name: "Pooja Singh",
    title: "Director",
   
  },
  {
    id: 3,
    image: "/positive-.avif",  
    name: "Neha Gupta",
    title: "Chairman",
  },
  {
    id: 4,
    image: "/full-body.avif",  
    name: "Sharma",
    title: "Founder",
  },
  {
    id: 5,
    image: "/teacherr1.avif",
    name: "Pooja Singh",
    title: "Director",
   
  },
  {
    id: 6,
    image: "/positive-.avif",  
    name: "Neha Gupta",
    title: "Chairman",
  },
 
];

const servicesData = [
  {
    icon: <GraduationCap className="h-8 w-8 text-[#00D122]" />,
  
    title: "Special Education",
    description:
      "Providing personalized learning paths to help students with unique needs excel academically.",
  },
  {
    icon: <Languages className="h-8 w-8 text-[#00D122]" />,
 
    title: "Language Lessons",
    description:
      "Language classes for global communication and cultural understanding.",
  },
  {
    icon: <Utensils className="h-8 w-8 text-[#00D122]" />,
   
    title: "Meals Provided",
    description:
      "Nutritious meals for students to ensure a healthy learning environment.",
  },
  {
    icon: <Book className="h-8 w-8 text-[#00D122]" />,
    
    title: "Bookmarks",
    description:
      "Providing essential academic materials and curated content for better learning.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-[#00D122]" />,
    
    title: "Full Day Sessions",
    description:
      "Engaging sessions to ensure students make the most of their school hours.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#00D122]" />,
    
    title: "Personalized Teaching",
    description:
      "Enhance learning experiences with personalized teaching tailored to each student's unique needs.",
  },
];
const cardData = [
  {
    icon: <BrainCircuit size={32} className="text-[#00c9ea]" />, // Neuroscience icon
    title: "Neuroscience-Based Assessments",
    description: "Harness the power of brain science with neuroscience-based assessments designed to measure cognitive abilities, decision-making, and behavioral patterns.",
  },
  {
    icon: <Clock size={32} className="text-[#00c9ea]" />, // Clock icon for time-saving
    title: "Easy to Use & Save Time",
    description: "Our intuitive, all-in-one solution simplifies tasks and streamlines workflows, helping you save valuable time.",
  },
  {
    icon: <Library size={32} className="text-[#00c9ea]" />, // Library icon
    title: "Automatic Class & Library Management",
    description: "Streamline your development process with automatic class and library management. Eliminate manual dependency handling, reduce errors, and ensure seamless integration of required modules.",
  },
  {
    icon: <Wallet size={32} className="text-[#00c9ea]" />, // Wallet icon for payroll
    title: "Automatic Payroll Processing",
    description: "Simplify payroll management with an automated system that ensures accurate salary calculations, tax deductions, and timely payments.",
  },
];

 
const LandingPage = () => {
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const mapRef = useRef(null);
 
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
 
        // Initialize the map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 14,
        });
 
        // Add a marker at the user's location
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: "You are here!",
        });
      }
    );
  }, []);
 
  const handleLoginClick = () => {
    router.push("/Auth/login");  
  };
  useEffect(() => {
    AOS.init({
      easing: 'ease-in-out',
      duration: 1500,
    });
  }, []);
 
  const [showForm, setShowForm] = useState(false);

  const handleLoginClicked = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted");
    setShowForm(false); // Close form on submit
  };
  return (
    <>
<div className="container-fluid w-full overflow-hidden">
  <div className="sticky top-0 left-0 w-full flex items-center justify-between bg-white shadow-md py-2 px-6 z-50">

      
        
      <Image
        src={Logo}
        className="  "
        alt="Logo"
        width={140}  
      
      />
     
    
     <div className="  ">
        {/* Desktop Navigation */}
        <nav    className="hidden md:flex space-x-6 items-center   z-50 " style={{ color: "white" }}>
          <Link to="home" 
           activeClass="border-b-2 text-[#00D122] border-[#00D122]" 
          className="hover:text-[#00D122] text-m text-black font-semibold transition duration-500">
            Home
          </Link>
     
  
  {/* <Link 
  to="About" 
  smooth={true} 
  duration={1000}    
  spy={true}
  activeClass="border-b-2 text-[#00D122] border-[#00D122]"  
  className="cursor-pointer hover:text-[#00D122] text-m text-black font-semibold transition duration-500"
>
  About
</Link> */}
<Link 
  to="Services" 
  smooth={true} 
  duration={1000} 
  spy={true}
  activeClass="border-b-2 text-[#00D122] border-[#00D122]"  
  className="cursor-pointer hover:text-[#00D122] text-black text-m font-semibold transition duration-200 "
>
  Our Services
</Link>
<Link 
  to="Contact" 
  smooth={true} 
  duration={1000} 
  spy={true}
  activeClass="border-b-2 text-[#00D122] border-[#00D122]"  
  className="cursor-pointer hover:text-[#00D122]  text-black text-m font-semibold transition duration-200"
>
  Contact Us
</Link>

          {/* Login Button */}
        
          <Button
            // onClick={handleLoginClick}
             
           
            onClick={handleLoginClick}
            className="text-m font-semibold bg-[#00D122] hover:bg-[#029300]"
          >
             Login
          </Button>
        
        </nav>
 
        {/* Mobile Menu Button */}
       
        <Button
          className="md:hidden flex items-center justify-center text-gray-200 hover:text-gray-400 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      

         {/* Mobile Navigation */}
         {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-800 border-t w-full border-gray-700">
          <ul className="flex flex-col items-center py-4 space-y-4" style={{ color: "white" }}>
            <li>
              <Link
                
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300  text-white text-lg transition"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 text-white text-lg transition"
              >
                About Us
              </Link>
            </li> */}
            <li>
              <Link
                href="/admissions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white text-lg transition"
              >
                Admissions
              </Link>
            </li>
            {/* Login Button in Mobile View */}
            <li>
             
              <Button
               
                // onClick={() => {
                //   setIsMobileMenuOpen(false);
                //   handleLoginClick();
                // }}
                className="px-6 py-2    transition duration-200 text-sm font-medium bg-[#00D122] hover:bg-[#029300]"
                onClick={handleLoginClick}
              >
                Login
            
              </Button>
            </li>
          </ul>
        </nav>
      )}
      </div>
       
     </div>
 
      <BrightwheelHero />
  
      {/* <header
        className="relative min-h-screen bg-cover bg-[#00c9ea]  bg-center"
        style={{ backgroundImage: `url(${MyImage.src})` }}
      >
      
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/10"></div>
 
        
        <div className=" fixed right-0  top-0 px-20   w-full  text-white z-50 shadow-2xl p-2 bg-white backdrop-blur-md ">
      <div className="  flex items-center justify-between  my-2  sticky top-0  ">
      
        
  <Image
    src={Logo}
    className="  "
    alt="Logo"
    width={100}  
  
  />
 

 
   
 </div>
 

    </div>
 
       
        <div className="absolute inset-0 flex flex-col  mt-[14%] items-start text-left z-10 px-6 sm:px-12 max-w-7xl mx-auto ">
          <div  className="relative"  >
          <h1 className="text-6xl sm:text-7xl font-bold text-white drop-shadow-md ">
            Welcome to NeuroPi
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
            A place where excellence meets education. Join us to build a brighter future for your child.
          </p>
          </div>
       
          <div className="mt-6 flex gap-4 ">
            
              <Button  variant="default" className="px-6 py-3   text-sm font-medium rounded   transition bg-[#00D122] hover:bg-[#029300]"    onClick={handleLoginClicked}>
        
              Enquiry
              </Button>
         
            
              {showForm&& ( <div
   className="absolute flex items-center justify-end top-1/3 right-0 transform -translate-y-1/2 z-50"
      onClick={handleFormClose}  
    >
      <Card
        className="relative w-[400px] bg-white shadow-lg rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}  
      >
    
        <button
         onClick={handleFormClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <CardHeader className="text-center">
          <CardTitle className="text-xl">Enquiry Form</CardTitle>
          <CardDescription>We will get in touch with you shortly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="text" placeholder="1234567890" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" type="text" placeholder="City, Country" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" type="text" placeholder="Enter your message" required />
              </div>
              
            </div>
            <Button type="submit" className="w-full bg-[#00c9ea] hover:bg-[#00c9ea] mt-5">
               Submit
              </Button>
          </form>
        </CardContent>
      </Card>
    </div>)}
          </div>
        </div>
      </header> */}
 
      {/* Cards Section */}
      <section className=" py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
  {cardData.map((card, index) => (
    <div
      data-aos="fade-down"
      data-aos-duration={`${300 + index * 300}`}
      key={index}
      className="bg-white text-center rounded-lg shadow-lg p-6 dark:text-black flex flex-col items-center"
    >
      {/* Centered Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full   mb-4">
        {card.icon}
      </div>

      {/* Card Content */}
      <h3 className="text-xl font-semibold mb-2 dark:text-black">{card.title}</h3>
      <p className="text-sm dark:text-black">{card.description}</p>
    </div>
  ))}
</div>

      </section>
 
 <div id='About'>
 
      {/* <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
  
      <div data-aos='fade-right' className="flex-1">
        <Image
          src={BookImage}
          alt="Students studying"
          className="w-full h-[400px] object-contain"
          priority
        />
      </div>
 
    
      <div className="flex-1 text-center md:text-left" data-aos='fade-left'>
        <h5 className="text-lg font-medium text-gray-600 mb-2 dark:text-white">About Our School</h5>
        <div className="h-[2px] w-36 bg-[#00c9ea] mb-4 mx-auto md:mx-0"></div>
     
        <h2 className="text-4xl font-bold text-[#014357] mb-4 dark:text-white">
          NeuroPi is a <span className="text-[#00D122]">trusted & leading institution.</span>
       
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
          NeuroPi School is dedicated to providing top-notch education with an emphasis on
          NeuroPi School is dedicated to providing top-notch education with an emphasis on
          holistic development. Our skilled educators and well-structured curriculum aim to nurture
          creativity, critical thinking, and excellence. Join us to shape your child's bright future.
        </p>
        <Button type={"button"}  className="bg-[#00c9ea] hover:bg-[#014357]">
     
          Learn More
    
        </Button>
      </div>
    </section> */}
 
    <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col md:flex-row items-center gap-12" >
   
      <div className="flex-1 text-center md:text-left" data-aos='fade-right'>
        <h5 className="text-lg font-medium text-gray-600 mb-2 dark:text-white">About NeuroPi</h5>
        <div className="h-[2px] w-44 bg-[#00c9ea] mb-4 mx-auto md:mx-0"></div>
  
        <h2 className="text-4xl font-bold text-[#014357] mb-4 dark:text-white">
          A Place Where <span className="text-[#00D122] ">Excellence Meets Education.</span>
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
          NeuroPi School is committed to providing exceptional education that nurtures
          NeuroPi School is committed to providing exceptional education that nurtures
          creativity, critical thinking, and leadership qualities. With state-of-the-art facilities
          and experienced faculty, we aim to empower every student to achieve academic and personal success.
        </p>
        <Button   className="bg-[#00c9ea] hover:bg-[#014357]">
      
          Discover More
      
        </Button>
      </div>
  
      <div className="flex-1" data-aos='fade-left'>
        <Image
          src={BookImageSecond}
          alt="Students learning in school"
          className="w-full h-[400px] object-contain"
          priority
        />
      </div>
    </section>
   
 
   {/* <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
 
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#014357] mb-2 dark:text-white">Our Teachers</h2>
        <div className="h-[2px] w-52 bg-[#00c9ea] mx-auto mb-4"></div>
     
        <p className="text-gray-600 mb-6 dark:text-white">
          Meet the incredible faculty members shaping the future of our students.
        </p>
      </div>
  
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        className="py-6"
      >
        {teachers.map((teacher,index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={teacher.image}
                alt={"teacher"}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.title}</p>
               
         
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  
      <div className="text-center mt-8">
       
        <Button  variant={"default"} className="px-6 py-3    font-medium text-sm    transition bg-[#00c9ea] hover:bg-[#014357]" >
          All Teachers
        </Button>
       
      </div>
    </section> */}
 
    </div>
    <div className="flex flex-col items-center justify-center text-center my-12 mx-auto">
  <h1 className="text-3xl font-bold text-gray-800">
    Your Complete Childcare Software System
  </h1>
  {/* Bottom Border */}
  <div className="h-[2px] w-[40%] bg-[#00c9ea] mt-2 rounded-full"></div>
</div>

 <TabsDemo />
    <section className="py-16 bg-white" id="Services">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#014357] mb-4 dark:text-black">Our Services</h2>
        <div className="h-[2px] w-48 bg-[#00c9ea] mb-3 mx-auto"></div>
 
        <p className="text-gray-600 mb-12">
          Explore the services we offer to help our students achieve excellence.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-10 space-y-10">
            {servicesData.slice(0, 3).map((service, index) => (
              <div key={index} data-aos='fade-down'data-aos-duration={`${300 + index * 300}`} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
 
          {/* Center Image */}
          <div className="flex justify-center">
            <Image
              src={MiddleImage}
              alt="Graduation"
              className="rounded-lg  "
            />
          </div>
 
          {/* Right Column */}
          <div className="flex flex-col gap-10 space-y-10"  >
            {servicesData.slice(3).map((service, index) => (
              <div key={index} data-aos='fade-down'data-aos-duration={`${300 + index * 300}`} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
 
 
    <section className="py-16" id="Contact">
  <div className="max-w-7xl mx-auto px-6 sm:px-12">
    {/* Title */}
    <div className="text-center mb-12">
      <h2 className="text-4xl text-[#014357] font-bold">Connect With Us</h2>
      <div className="h-[2px] w-72 bg-[#00c9ea] mx-auto my-4"></div>

      <p className="text-gray-600 dark:text-white">
        Feel free to get in touch with us for any queries or information.
      </p>
    </div>

    {/* Contact Info */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Address Card */}
      <div className="bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg rounded-xl space-y-5 text-center hover:scale-105 transition duration-300">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12  bg-[#000000] text-white flex items-center justify-center rounded-full shadow-md">
            <MapPin size={28} />
          </div>
        </div>
        <span className="text-2xl font-semibold pb-4">Address</span>
        <p className="text-gray-800  font-semibold text-lg">100 Feet Road, Madhapur, Hyderabad</p>
      </div>

      {/* Phone Card */}
      <div className="bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg space-y-5 rounded-xl text-center hover:scale-105 transition duration-300">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12  bg-[#000000] text-white flex items-center justify-center rounded-full shadow-md">
            <Phone size={28} />
          </div>
        </div>
        <span className="text-2xl font-semibold pb-4">Phone</span>
        <p className="text-gray-800  font-semibold text-lg">+91 91770 24333</p>
      </div>

      {/* Email Card */}
      <div className="bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg space-y-5 rounded-xl text-center hover:scale-105 transition duration-300">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 bg-[#000000] text-white flex items-center justify-center rounded-full shadow-md">
            <Mail size={28} />
          </div>
        </div>
        <span className="text-2xl font-semibold pb-4">Email</span>
        <p className="text-gray-800 font-semibold text-lg">Info@karyahub.com</p>
      </div>
    </div>
  </div>
</section>
    {/* <section className="relative w-full h-[40vh] mb-5 pb-5 max-w-7xl mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289013.4512351236!2d78.24323585499164!3d17.412608637322133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ae058f89a5%3A0xdcb857c29158809e!2sKaryahub%20Solutions%20Private%20Limited!5e1!3m2!1sen!2sin!4v1740745400625!5m2!1sen!2sin" 
      
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="NeuroPi Solutions Location"
      ></iframe>
    </section> */}
 
    <footer className="bg-[#014357] text-white py-3">
     
 
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-2">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © NEUROPI 2025.Powered By KARYAHUB SOLUTIONS. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">N</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">E</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">U</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">R</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">O</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">P</a>
            <a href="#" className="text-[#00D122] text-lg hover:text-red-700 transition">I</a> 
          </div>
        </div>
      </div>
    </footer>
    </div>
    </>
  );
};
 
export default LandingPage;
 
 