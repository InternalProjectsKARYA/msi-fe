"use client";
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
 
import Footer from '@/components/Footer';
import Header from '@/components/header/page';
import RunningBoy from '../RunningBoy/page';
import ThemeCustomizer from '../themesettings/page';
 

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
    
    
          <AppSidebar />
    
        <div className="flex-1 h-full flex flex-col">
        <header className=' z-50 sticky bg-white dark:bg-black dark:shadow top-0'>
        <Header />
        </header>
          <main className="flex-1   p-5   dark:bg-neutral-800">
            {children}
          </main>
          <div className="">
            <Footer />
          </div>
          
            {/* <RunningBoy  /> */}
           
        </div>
     
      {/*<ThemeCustomizer /> */}
    </SidebarProvider>
  );
}
 