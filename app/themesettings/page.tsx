// // components/ThemeCustomizer.js
// "use client";
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
// import { Separator } from '@/components/ui/separator';
// import { Card } from '@/components/ui/card';
// import { Settings } from 'lucide-react';
// import useThemeStore from '@/components/ThemeContext';

// const ThemeCustomizer = () => {
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const { themeColors, updateThemeColor, resetTheme } = useThemeStore();

//   const primaryColors = [
//     '240 5.9% 10%',  
//     '340 75% 55%',  
      
    
//     '50 89% 60%',     
//     '200 100% 50%',   
//     '300 75% 60%',   
    
  
    
//     '30 100% 50%',    
//     '210 60% 60%',    
//     '0 80% 70%',     
//     '160 100% 37%',   
    
//     '120 30% 80%'     
//   ]
 
//   // Sidebar background color options
//   const sidebarBackgroundOptions = [
//     { bg_color: 'bg-blue-300', colorValue: '#d1ecf1' },
//     { bg_color: 'bg-yellow-300', colorValue: '#fff3cd' },
//     { bg_color: 'bg-teal-300', colorValue: '#d4edda' },
//     { bg_color: 'bg-red-300', colorValue: '#f8d7da' },
//     { bg_color: 'bg-sky-300', colorValue: '#d1e7dd' },
//   ];
//   // Function to calculate a lighter or duller shade for the secondary color
//   const calculateSecondaryColor = (primaryHsl) => {
//     const [hue, saturation, lightness] = primaryHsl.split(' ').map(parseFloat);
//     const secondarySaturation = Math.max(saturation - 20, 0); // reduce saturation
//     const secondaryLightness = Math.min(lightness + 20, 300); // increase lightness
//     return `${hue} ${secondarySaturation}% ${secondaryLightness}%`;
//   };

//   // Function to apply primary and calculated secondary theme colors to CSS variables
//   const applyThemeColors = () => {
//     const primary = themeColors.primary;
//     const secondary = calculateSecondaryColor(primary);
     
//     document.documentElement.style.setProperty('--primary', primary);
//     document.documentElement.style.setProperty('--primary-foreground', themeColors.primaryForeground);
//     document.documentElement.style.setProperty('--secondary', secondary);
//     document.documentElement.style.setProperty('--secondary-foreground', themeColors.secondaryForeground);
//   };

//   return (
//     <div>
//       <Button
//       onClick={() => setIsSheetOpen(true)}
//       className="fixed bottom-12 right-4 p-3 h-10 rounded-full  text-white shadow-lg"
//     >
//       <Settings className="w-5 h-5 animate-spin" />
//     </Button>

//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>Theme Customizer</SheetTitle>
//             <SheetDescription>Choose your themes & layouts.</SheetDescription>
//           </SheetHeader>
//           <Separator />
//           <div className=' '>
 
//           <Card className="mt-4 p-4">
//             <h3 className="text-md font-semibold">Color Mode</h3>
//             <div className="flex space-x-4 mt-5">
//               <Button
//                 variant="outline"
//                 onClick={() => updateThemeColor('topBarColor', '#ffffff')}
//                 className={`flex-1 ${themeColors.topBarColor === '#ffffff' ? 'border-blue-500' : ''}`}
//               >
//                 Light Mode
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => updateThemeColor('topBarColor', '#343a40')}
//                 className={`flex-1 ${themeColors.topBarColor === '#343a40' ? 'border-blue-500' : ''}`}
//               >
//                 Dark Mode
//               </Button>
//             </div>
//           </Card>
   

       
//           <Card className="mt-4 p-4">
//             <h3 className="text-md font-semibold mb-2">Sidebar</h3>
//             <div className="grid grid-cols-6 gap-2 mt-5">
//               {sidebarBackgroundOptions.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => updateThemeColor('sidebarBackground', item.colorValue)}
//                   className={`flex items-center justify-center ${item.bg_color} w-[4vh] h-[8vh] rounded-md cursor-pointer transition-all ${
//                     themeColors.sidebarBackground === item.colorValue ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
//                   }`}
//                 >
//                   {themeColors.sidebarBackground === item.colorValue && <span className="text-blue-500">✔️</span>}
//                 </div>
//               ))}
//             </div>
//           </Card>

     
//           <Card className="mt-4 p-4">
//   <h3 className="text-md font-semibold mb-2">Button Color</h3>
//   <div className="grid grid-cols-5 gap-4 mt-5"> 
//     {primaryColors.map((color) => (
//       <div
//         key={color}
//         onClick={() => updateThemeColor('primary', color)}
//         className={`w-10 h-10 rounded-full cursor-pointer transition-all flex items-center justify-center ${
//           themeColors.primary === color ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
//         }`}
//         style={{ backgroundColor: `hsl(${color})` }}
//       >
//         {themeColors.primary === color && <span className="text-blue-500">✔️</span>}
//       </div>
//     ))}
//   </div>
// </Card>
//           </div>



//           <SheetFooter className="flex items-center justify-between mt-4">
//             <SheetClose asChild>
//               <Button variant="secondary" onClick={resetTheme} className="w-full">
//                 Reset
//               </Button>
//             </SheetClose>
//             <SheetClose asChild>
//               <Button type="button" onClick={applyThemeColors} className="w-full">
//                 Apply
//               </Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default ThemeCustomizer;





"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Settings, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiGrid, FiUserCheck, FiSun, FiFileText } from "react-icons/fi";

const ThemeCustomizer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "CONFIGURATIONS", href: "#"   },
    { label: "Config", href: "/config", icon: <Settings className="h-4 w-4" /> },
    { label: "Class Settings", href: "/class", icon: <FiBookOpen className="h-4 w-4" /> },
    { label: "Class Rooms", href: "/classroom", icon: <FiGrid className="h-4 w-4" /> },
    { label: "Role", href: "/role", icon: <FiUserCheck className="h-4 w-4" /> },
    { label: "Permissions", href: "/permission", icon: <Shield className="h-4 w-4" /> },
    { label: "Leave Types", href: "/leavetypes", icon: <ClipboardCheck className="h-4 w-4" /> },
    { label: "Holidays", href: "/holidays", icon: <FiSun className="h-4 w-4" /> },
    { label: "Policies", href: "/policies", icon: <FiFileText className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-12 right-4 p-3 h-10 rounded-full text-white shadow-lg  "
      >
        <Settings className={`w-5 h-5 ${isMenuOpen ? "" : "animate-spin"}`} />
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-24 right-8 bg-white shadow-lg rounded-md p-4 z-50"
          >
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeCustomizer;
