import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
 ;
import Header from '@/components/header/page';
import ThemeCustomizer from '../themesettings/page';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 h-full flex flex-col ">
      <header className=' z-50 sticky bg-white dark:bg-black dark:shadow top-0'>
        <Header />
        </header>
        <div className="flex-1 p-5 ">{children}    </div> 
        {/* <Footer />   */}
  


      </main>
      
      {/*<ThemeCustomizer /> */}
    </SidebarProvider>
    
  );
}

