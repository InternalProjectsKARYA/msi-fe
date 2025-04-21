import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header/page';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 h-full flex flex-col">
      <Header />
        <div className="flex-1">{children}    </div> 
        {/* <Footer />   */}
  


      </main>
      
     
    </SidebarProvider>
    
  );
}

