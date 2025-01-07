import React, { ReactNode } from 'react';
import { SidebarProvider  } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
 
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header/page';
import ThemeCustomizer from '../themesettings/page';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <div className="flex flex-col h-screen w-full">
      <header className=' z-50 sticky bg-white dark:bg-black dark:shadow top-0'>
        <Header />
        </header>
        <Separator />
        <main className="flex-1 overflow-y-auto w-full p-5  bg-gray-50 dark:bg-neutral-800  dark:bg-gray-800">
          {children}  
        </main>
        
        {/* <footer className="p-4 bg-gray-200 w-full">
          <Footer />
        </footer> */}
      </div>
      {/*<ThemeCustomizer /> */}
    </SidebarProvider>
  );
}
