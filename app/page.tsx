"use client";
 
import React, { useEffect,useState, useRef } from "react";
import { Book, Calendar, GraduationCap, Languages, Menu, Users, Utensils, X } from "lucide-react";
import Image from "next/image";
import MyImage from "../public/school2.jpg";
import Link from "next/link";
import BookImage from "../public/student3.jpg";
import BookImageSecond from '../public/student1.jpg';
import MiddleImage from '../public/student1.jpg'
 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import AOS from 'aos';
import Logo from '../public/logoitaly.jpeg';
 
import 'aos/dist/aos.css';
import { Button } from "@/components/ui/button";
 
 
// Menu items
 
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
    icon: <GraduationCap className="h-8 w-8 text-orange-500" />,
  
    title: "Special Education",
    description:
      "Providing personalized learning paths to help students with unique needs excel academically.",
  },
  {
    icon: <Languages className="h-8 w-8 text-orange-500" />,
 
    title: "Language Lessons",
    description:
      "Language classes for global communication and cultural understanding.",
  },
  {
    icon: <Utensils className="h-8 w-8 text-orange-500" />,
   
    title: "Meals Provided",
    description:
      "Nutritious meals for students to ensure a healthy learning environment.",
  },
  {
    icon: <Book className="h-8 w-8 text-orange-500" />,
    
    title: "Bookmarks",
    description:
      "Providing essential academic materials and curated content for better learning.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-orange-500" />,
    
    title: "Full Day Sessions",
    description:
      "Engaging sessions to ensure students make the most of their school hours.",
  },
  {
    icon: <Users className="h-8 w-8 text-orange-500" />,
    
    title: "Meet a Volunteer",
    description:
      "Connect with professionals and alumni for mentoring and guidance.",
  },
];
const cardData = [
  {
    icon: "📚",
    title: "Free Online Course",
    description: "Education is the best way to make a beautiful and wonderful country.",
  },
  {
    icon: "🎓",
    title: "Best University Teachers",
    description: "Education is the best way to make a beautiful and wonderful country.",
  },
  {
    icon: "🏛️",
    title: "Awesome Environment",
    description: "Education is the best way to make a beautiful and wonderful country.",
  },
];
 
const Navbar = () => {
 
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
 
  return (
    <>
      <header
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${MyImage.src})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/50"></div>
 
        {/* Topbar */}
        <div className="fixed top-0 left-0 w-full text-white z-50 shadow-md p-2 bg-neutral-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4 text-2xl font-bold tracking-wide">
 
  <Image
    src={Logo}
    className="  "
    alt="Logo"
    width={150} // Adjust width for better alignment
    height={120} // Adjust height for better alignment
  />
   {/* <span className="text-white dark:text-white text-2xl">My School Italy</span> */}
</Link>
 
 
        {/* Desktop Navigation */}
        <nav    className="hidden md:flex space-x-6 items-center" style={{ color: "white" }}>
          <Link href="/" className="hover:text-gray-300 text-m font-semibold transition duration-200">
            Home
          </Link>
          <Link href="/" className="hover:text-gray-300 text-m font-semibold transition duration-200">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-300 text-m font-semibold transition duration-200">
            Admissions
          </Link>
 
          {/* Login Button */}
        
          <Button
            onClick={handleLoginClick}
            variant={"default"}
           
          
            className="text-m font-semibold"
          >
            Login
          </Button>
        
        </nav>
 
        {/* Mobile Menu Button */}
       
        <Button
          className="md:hidden flex items-center justify-center text-gray-200 hover:text-gray-400 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      
      </div>
 
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col items-center py-4 space-y-4" style={{ color: "white" }}>
            <li>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300  text-white text-lg transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 text-white text-lg transition"
              >
                About Us
              </Link>
            </li>
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
               variant={"secondary"}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLoginClick();
                }}
                className="px-6 py-2    transition duration-200 text-sm font-medium"
               
              >
                Login
            
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
 
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start text-left z-10 px-6 sm:px-12 max-w-7xl mx-auto">
          <div    >
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md ">
            Welcome to My School Italy
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
            A place where excellence meets education. Join us to build a brighter future for your child.
          </p>
          </div>
       
          <div className="mt-6 flex gap-4">
            <Link href="">
              <Button  variant="default" className="px-6 py-3   text-sm font-medium rounded   transition">
        
                Apply Now
              </Button>
           
            </Link>
            <Link href="">
              <Button variant={"outline"}>
              
                Learn More
              </Button>
             
            </Link>
          </div>
        </div>
      </header>
 
      {/* Cards Section */}
      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {cardData.map((card, index) => (
            <div
              data-aos='fade-down' data-aos-duration={`${300 + index * 300}`}
              key={index}
              className="bg-gray-50   text-center rounded-lg shadow-lg p-6 dark:text-black"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-black">{card.title}</h3>
              <p className="text-sm dark:text-black">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
 
 
 
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* Left Image Section */}
      <div data-aos='fade-right' className="flex-1">
        <Image
          src={BookImage}
          alt="Students studying"
          className="w-full h-[400px] object-contain"
          priority
        />
      </div>
 
      {/* Right Text Section */}
      <div className="flex-1 text-center md:text-left" data-aos='fade-left'>
        <h5 className="text-lg font-medium text-gray-600 mb-2 dark:text-white">About Our School</h5>
        <div className="h-[2px] w-36 bg-orange-500 mb-4 mx-auto md:mx-0"></div>
     
        <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
          My School Italy is a <span className="text-orange-500">trusted & leading institution.</span>
       
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
          My School Italy School is dedicated to providing top-notch education with an emphasis on
          My School Italy School is dedicated to providing top-notch education with an emphasis on
          holistic development. Our skilled educators and well-structured curriculum aim to nurture
          creativity, critical thinking, and excellence. Join us to shape your child's bright future.
        </p>
        <Button type={"button"}  >
     
          Learn More
    
        </Button>
      </div>
    </section>
 
    <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* Left Text Section */}
      <div className="flex-1 text-center md:text-left" data-aos='fade-right'>
        <h5 className="text-lg font-medium text-gray-600 mb-2 dark:text-white">About My School Italy</h5>
        <div className="h-[2px] w-44 bg-orange-500 mb-4 mx-auto md:mx-0"></div>
  
        <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
          A Place Where <span className="text-orange-500 ">Excellence Meets Education.</span>
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
          My School Italy School is committed to providing exceptional education that nurtures
          My School Italy School is committed to providing exceptional education that nurtures
          creativity, critical thinking, and leadership qualities. With state-of-the-art facilities
          and experienced faculty, we aim to empower every student to achieve academic and personal success.
        </p>
        <Button  >
      
          Discover More
      
        </Button>
      </div>
 
      {/* Right Image Section */}
      <div className="flex-1" data-aos='fade-left'>
        <Image
          src={BookImageSecond}
          alt="Students learning in school"
          className="w-full h-[400px] object-contain"
          priority
        />
      </div>
    </section>
   
 
   <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">Our Teachers</h2>
        <div className="h-[2px] w-52 bg-orange-500 mx-auto mb-4"></div>
     
        <p className="text-gray-600 mb-6 dark:text-white">
          Meet the incredible faculty members shaping the future of our students.
        </p>
      </div>
 
      {/* Carousel */}
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
 
      {/* View All Button */}
      <div className="text-center mt-8">
       
        <Button  variant={"default"} className="px-6 py-3    font-medium text-sm    transition">
          All Teachers
        </Button>
       
      </div>
    </section>
 
 
 
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 dark:text-black">Our Services</h2>
        <div className="h-[2px] w-48 bg-orange-500 mb-8 mx-auto"></div>
 
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
              className="rounded-lg shadow-lg"
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
 
 
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact With Us</h2>
          <div className="h-[2px] w-72 bg-orange-500 mx-auto my-4"></div>
    
          <p className="text-gray-600 dark:text-white">
            Feel free to get in touch with us for any queries or information.
          </p>
        </div>
 
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Address */}
          <div className="bg-white p-6 shadow-md rounded-md text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full">
                <span className="text-xl text-gray-700">📍</span>
              </div>
            </div>
            <p className="text-gray-800 font-medium">Road-12, Block-D, Ulipur Kurigram, Dhaka</p>
          </div>
 
          {/* Phone */}
          <div className="bg-white p-6 shadow-md rounded-md text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full">
                <span className="text-xl text-gray-700">📞</span>
              </div>
            </div>
            <p className="text-gray-800 font-medium">+088 078 968 745</p>
     
          </div>
 
          {/* Email */}
          <div className="bg-white p-6 shadow-md rounded-md text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full">
                <span className="text-xl text-gray-700">📧</span>
              </div>
            </div>
       
            <p className="text-gray-800 font-medium">exam@gmail.com</p>
          </div>
        </div>
 
        {/* Contact Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="col-span-1 w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {/* Comments */}
          <textarea
            placeholder="Your Comments"
            rows="4"
            className="col-span-1 md:col-span-2 w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="col-span-1 w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {/* Website */}
          <input
            type="text"
            placeholder="Website"
            className="col-span-1 w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 text-center">
          
            <Button
             variant={"default"}
              className="     "
           
            >
              Send Message
        
            </Button>
          </div>
        </form>
      </div>
    </section>
    <section className="relative w-full h-[40vh] mb-5 pb-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90510355335!2d78.24323639274954!3d17.412608636694827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ae058f89a5%3A0xdcb857c29158809e!2sMy School Italy%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1732021118898!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="My School Italy Solutions Location"
      ></iframe>
    </section>
 
    <footer className="bg-blue-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Candidate Info */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "white" }}>Candidate Info</h3>
          <p className="text-gray-300 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore mag.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-orange-500 mr-2">📍</span> Road-7, House-62, Dhaka.
           
            </li>
            <li className="flex items-center">
              <span className="text-orange-500 mr-2">📞</span> +770 698 784 235
          
            </li>
            <li className="flex items-center">
              <span className="text-orange-500 mr-2">📧</span> exam@gmail.com
           
            </li>
          </ul>
        </div>
 
        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "white" }}>Quick Link</h3>
          <ul className="space-y-2">
            <li>
             
              <a href="#" className="hover:text-orange-500 transition">
                Search Engine Optimization
              </a>
            </li>
            <li>
             
              <a href="#" className="hover:text-orange-500 transition">
                Pay Per Click Management
              </a>
            </li>
            <li>
            
              <a href="#" className="hover:text-orange-500 transition">
                Real Time Analytics
              </a>
            </li>
            <li>
          
              <a href="#" className="hover:text-orange-500 transition">
                Free SEO Analysis
              </a>
            </li>
            <li>
              
              <a href="#" className="hover:text-orange-500 transition">
                Company & Contact Info
              </a>
            </li>
          </ul>
        </div>
 
        {/* Popular Post */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "white" }}>Popular Post</h3>
          <ul className="space-y-4">
            <li className="flex space-x-4">
              {/* <Image src="/placeholder.jpg" alt="Post Thumbnail" className="w-16 h-16 object-cover rounded" /> */}
              <div>
               
                <a href="#" className="block text-white hover:text-orange-500 font-medium">
                  3 Ways to Transform Your Blog Into
                </a>
                <p className="text-gray-400 text-sm">October 16, 2024</p>
              </div>
            </li>
            <li className="flex space-x-4">
              {/* <Image src="/placeholder.jpg" alt="Post Thumbnail" className="w-16 h-16 object-cover rounded" /> */}
              <div>
                
                <a href="#" className="block text-white hover:text-orange-500 font-medium">
                  How Important Is Design To Business
                </a>
                <p className="text-gray-400 text-sm">October 16, 2024</p>
              </div>
            </li>
            <li className="flex space-x-4">
              {/* <Image src="/placeholder.jpg" alt="Post Thumbnail" className="w-16 h-16 object-cover rounded" /> */}
              <div>
                
                <a href="#" className="block text-white hover:text-orange-500 font-medium">
                  Your Small Business Web Design Solution
                </a>
                <p className="text-gray-400 text-sm">October 16, 2024</p>
              </div>
            </li>
          </ul>
        </div>
 
        {/* Help Link */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "white" }}>Help Link</h3>
          <ul className="space-y-2">
            <li>
             
              <a href="#" className="hover:text-orange-500 transition">
                Search Engine Optimization
              </a>
            </li>
            <li>
            
              <a href="#" className="hover:text-orange-500 transition">
                Pay Per Click Management
              </a>
            </li>
            <li>
              
              <a href="#" className="hover:text-orange-500 transition">
                Real Time Analytics
              </a>
            </li>
            <li>
            
              <a href="#" className="hover:text-orange-500 transition">
                Free SEO Analysis
              </a>
            </li>
            <li>
              
              <a href="#" className="hover:text-orange-500 transition">
                Company & Contact Info
              </a>
            </li>
          </ul>
        </div>
      </div>
 
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © Eduzone 2024. All Rights Reserved.
          </p>
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">F</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">X</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">L</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">P</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">T</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">F</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">X</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">L</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">P</a>
            <a href="#" className="text-orange-500 text-lg hover:text-red-700 transition">T</a>
          </div> */}
        </div>
      </div>
    </footer>
    </>
  );
};
 
export default Navbar;
 
 