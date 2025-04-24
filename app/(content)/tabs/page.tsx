"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import OverviewSection from "../overview/page"
import LearningSection from "../learning/page"
import CommunicationSection from "../communication/page"
import DevelopmentSectionss from "../librarys/page"
import AssessmentSection from "../assessments/page"
import PayrollSection from "../payrolls/page"
import LibrarySection from "../librarys/page"


export default function TabsDemo() {  // ⬅ Changed to default export
  return (
    <div className="flex justify-center">
    
      <Tabs defaultValue="overview" className="w-[1200px] md:w-[690px] lg:w-[1200px]">
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
          <OverviewSection />
        </TabsContent>
         <TabsContent value="learning">
          <LearningSection />
        </TabsContent>
       <TabsContent value="communication">
          <CommunicationSection/>
        </TabsContent>
        <TabsContent value="library">
          <LibrarySection/>
        </TabsContent>
        <TabsContent value="assessment">
          <AssessmentSection/>
        </TabsContent>
        <TabsContent value="payroll">
          <PayrollSection/>
        </TabsContent>  
      </Tabs>
    </div>
  )
}
