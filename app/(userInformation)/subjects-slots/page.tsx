"use client";

import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { toast, Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

// Updated Subject data with specific names and dull colors
const subjects = [
  { name: "Mathematics", color: "bg-slate-200" },
  { name: "Physics", color: "bg-green-100" },
  { name: "English Literature", color: "bg-blue-100" },
  { name: "World History", color: "bg-yellow-100" },
  { name: "Geography", color: "bg-teal-100" },
  { name: "Fine Arts", color: "bg-pink-100" },
  { name: "Music Theory", color: "bg-purple-100" },
  { name: "Physical Education", color: "bg-orange-100" },
  { name: "Computer Science", color: "bg-cyan-100" },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];

const TimetableCreator = () => {
  const router = useRouter();
  const [timetable, setTimetable] = useState<{
    [key: string]: { subject: string; color: string };
  }>({});
  const [activatedRows, setActivatedRows] = useState<{ [key: string]: boolean }>({});
  const timetableRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const initialTimetable: { [key: string]: { subject: string; color: string } } = {};
    weekDays.forEach((day) => {
      timeSlots.forEach((slot) => {
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        initialTimetable[`${day}-${slot}`] = { subject: randomSubject.name, color: randomSubject.color };
      });
    });
    setTimetable(initialTimetable);
  }, []);

  const handleSwap = (sourceDay: string, sourceSlot: string, targetDay: string, targetSlot: string) => {
    setTimetable((prev) => {
      const newTimetable = { ...prev };
      const temp = newTimetable[`${sourceDay}-${sourceSlot}`];
      newTimetable[`${sourceDay}-${sourceSlot}`] = newTimetable[`${targetDay}-${targetSlot}`];
      newTimetable[`${targetDay}-${targetSlot}`] = temp;
      return newTimetable;
    });
  };

  const handleDownload = async () => {
    if (timetableRef.current) {
      const image = await toPng(timetableRef.current, {
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = image;
      link.download = `Timetable.png`;
      link.click();
    }
  };

  const TimeSlot = ({
    day,
    timeSlot,
    subjectData,
    isDraggable,
  }: {
    day: string;
    timeSlot: string;
    subjectData: { subject: string; color: string };
    isDraggable: boolean;
  }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "subject",
      item: { day, timeSlot },
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "subject",
      canDrop: () => isDraggable,
      drop: (item: { day: string; timeSlot: string }) => {
        if (item.day !== day || item.timeSlot !== timeSlot) {
          handleSwap(item.day, item.timeSlot, day, timeSlot);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`border p-1 h-14 flex items-center justify-center ${isDraggable ? "cursor-move" : "cursor-pointer"} ${
          isOver ? "ring-2 ring-blue-500" : ""
        } ${isDragging ? "opacity-50" : ""} ${subjectData.color}`}
        
        onClick={() => {
       
            router.push(
              `/subjects-slots-view/${encodeURIComponent(subjectData.subject)} }`
            );
        
        }}
      >
        <span className="text-black font-semibold text-sm text-center ">
          {subjectData.subject}
        </span>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <h1 className="text-2xl font-bold">ClassRoom Timetable Planner</h1>
            <p className="text-gray-600">Drag and drop to change the subject slots</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleDownload}>Download Timetable</Button>
          </div>
        </div>

        <div ref={timetableRef} className="bg-white p-4   shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-left font-semibold">Time Slots</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="p-2 border font-semibold text-center ">
                    {slot}
                  </th>
                ))}
                <th className="p-2 border font-semibold text-center">Activate Row</th>
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day) => (
                <tr key={day}>
                  <td className="p-2 border font-semibold text-sm">{day}</td>
                  {timeSlots.map((slot) => (
                    <td key={`${day}-${slot}`} className="p-0 border">
                      <TimeSlot
                        day={day}
                        timeSlot={slot}
                        subjectData={timetable[`${day}-${slot}`] || subjects[0]}
                        isDraggable={!!activatedRows[day]}
                      />
                    </td>
                  ))}
                  <td className="p-2 border text-center">
                    <Switch
                      checked={!!activatedRows[day]}
                      onCheckedChange={(checked) => {
                        setActivatedRows((prev) => ({ ...prev, [day]: checked }));
                        toast.success(`${day} ${checked ? "slots are editable now!" : "slots are saved"}`);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-10">
            <Button  >Save Timetable</Button>
          </div>
      </div>
  
      <Toaster />
    </DndProvider>
  );
};

export default TimetableCreator;
