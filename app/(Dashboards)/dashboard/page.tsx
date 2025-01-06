"use client";
 
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

const Dashboard = () => {
  {
    return (
      <div className="space-y-3">
        {/* Header Skeleton */}
        <Skeleton className="h-12 w-full" />

        {/* Welcome Card Skeleton */}
        <Card className="h-32">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
        </Card>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="p-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </Card>
          ))}
        </div>

        {/* Events and Bar Chart Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-1 lg:col-span-4">
            <Card className="h-64 p-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full mt-2" />
            </Card>
          </div>

          <div className="col-span-1 lg:col-span-8">
            <Card className="h-64 p-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-40 w-full mt-2" />
            </Card>
          </div>
        </div>

        {/* Leave Status and Carousel Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-64 p-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full mt-4" />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full mt-2" />
            ))}
          </Card>
          <Card className="h-64 p-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-40 w-full mt-2" />
          </Card>
        </div>
      </div>
    );
  }
 
  return  
};

export default Dashboard;

