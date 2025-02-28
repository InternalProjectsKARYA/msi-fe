"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import FeaturesSection from "../overview/page"
import DevelopmentSection from "../learning/page"
import DevelopmentSections from "../communication/page"
import DevelopmentSectionss from "../librarys/page"
import Development from "../assessments/page"
import Developments from "../payrolls/page"
import LibraryLanding from "../librarys/page"


export default function TabsDemo() {  // ⬅ Changed to default export
  return (
    <div className="flex justify-center">
    
      <Tabs defaultValue="overview" className="w-[1200px]">
        <TabsList className="grid w-full grid-cols-6"> {/* Adjusted grid-cols */}
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger> {/* Fixed typo */}
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>
        {/* Example TabsContent */}
         <TabsContent value="overview">
          <FeaturesSection />
        </TabsContent>
         <TabsContent value="learning">
          <DevelopmentSection />
        </TabsContent>
       <TabsContent value="communication">
          <DevelopmentSections/>
        </TabsContent>
        <TabsContent value="library">
          <LibraryLanding/>
        </TabsContent>
        <TabsContent value="assessment">
          <Development/>
        </TabsContent>
        <TabsContent value="payroll">
          <Developments/>
        </TabsContent>  
      </Tabs>
    </div>
  )
}
