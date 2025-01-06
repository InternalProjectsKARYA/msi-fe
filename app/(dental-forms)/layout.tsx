import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'; // Adjust the import path
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header/page';
import ThemeCustomizer from '../themesettings/page';
import { FormSidebar } from '@/components/Form-sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      
      <FormSidebar/>
      <div className="flex flex-col h-screen w-full">
      <header className=' z-50 sticky bg-white dark:bg-black dark:shadow top-0'>
        <div className='text-center p-5'>
      <h1 className="text-4xl font-bold text-[#ff6347]">
            My School <span className="text-[#4682b4]">ITALY</span>
          </h1>
          </div>
        </header>
        <Separator />
        <main className="flex-1 overflow-y-auto w-full    dark:bg-gray-800">
          {children}  
        </main>
        
       
      </div>
      {/*<ThemeCustomizer /> */}
    </SidebarProvider>
  );
}
