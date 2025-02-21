"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
 
import { Toaster, toast } from "sonner";

export default function LessonPlanPage() {
  const router = useRouter();

  // Static lesson plan data
  const lessonPlanData = {
    class_standards: "NURSERY",
    terms: "2023-24 WEEK: 4",
    day: "MONDAY",
    date: "3rd JULY",
    lesson: "EAT YOUR BEANS DAY",
    topic: [
      "LETTER ‘D’",
      "Trace Uppercase ‘D’",
      "Concept of 4",
      "Action Song: Right & Left",
      "Nursery Rhyme: Ding Dong Bell",
    ],
    mainAreasCovered: "CLL & PSED",
    subAreas: {
      CLL: ["B4", "D5"],
      PSED: ["A1"],
    },
    materialNeeded: {
      flashCard: "Letter flashcard – D",
      story: "‘D’ story from the English Nursery Book",
      worksheets: "Dog & doll coloring, tracing & number work worksheets: 1, 2, 3 & 4",
      craft: "Dog craft",
    },
    formativeAssessment:
      "Students will be assessed based on their completed worksheets for the letter D, as well as their participation in class discussions during the reading of 'The Ugly Duckling'.",
    classManagement:
      "Teachers will make at least 7 flashcards with the uppercase Letter D and stick pictures of a dog, a doll, a duck, a doughnut, a dice, a dolphin, and a drum. " +
      "Teachers will make posters with a Dolch word and stick it in the classroom: DOWN. The whole week will focus on reinforcing this.",
    procedure: [
      { timing: "15 Min", stage: "PHYSICAL WARM UP", interaction: "T-Ss", procedure: "T. & Ss Listen to the NR & AS and T. Dance with Ss." },
      { timing: "20 Min", stage: "MOTOR SKILLS", interaction: "Ss", procedure: "T. helps Ss in making the Duck Craft." },
      { timing: "-", stage: "SNACK BREAK", interaction: "-", procedure: "-" },
      {
        timing: "35 Min",
        stage: "WARM UP",
        interaction: "T-Ss",
        procedure:
          "T. shows a flashcard for the letter D and drills it a few times. " +
          "T. teaches a few easy words starting with D, with particular reference to the Dolch words – do. " +
          "T. drills the objects with sound starting with Letter D a few times.",
      },
      {
        timing: "45 Min",
        stage: "ROLL ON",
        interaction: "T-Ss",
        procedure:
          "T. reads the story of D and asks students to listen for the letter D and to find the D objects in their books – duck – with particular attention to Dolch words: do... (second reading may be necessary). " +
          "Students are provided with crayons and color the dog & doll worksheets. They will also practice TRACING D: WS-2.",
      },
      { timing: "45 Min", stage: "FREER PRACTICE", interaction: "Ss-Ss", procedure: "Ss are introduced to number 4 using the worksheets: 3 & 4." },
    ],
    assessment: [
      "Put ‘A’ at the ‘Expected’ level of development.",
      "Put ‘B’ at the ‘Emerging’ level of development (in other words, they haven’t quite reached it yet).",
      "Put ‘A+’ at the ‘Exceeding’ the expected level of development.",
    ],
    goals: [
      "✔ CLL(B4): Links sounds to letters, naming and sounding letters of the alphabet.",
      "✔ CLL(D5): Holds a pencil and uses it effectively to form recognizable letters, most of which are correctly formed.",
      "✔ PSED(A1): Shows an interest in classroom activities through observation or participation.",
    ],
  };

  return (
    <div className="  bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 py-4">
      <Card className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <CardHeader className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{lessonPlanData.class_standards}</h2>
              <div className="flex gap-2 mt-3">
                <span className="bg-indigo-100 px-4 py-1 rounded-full text-indigo-800 text-sm font-semibold">{lessonPlanData.day}</span>
                <span className="bg-purple-100 px-4 py-1 rounded-full text-purple-800 text-sm font-semibold">{lessonPlanData.date}</span>
                <span className="bg-blue-100 px-4 py-1 rounded-full text-blue-800 text-sm font-semibold">{lessonPlanData.lesson}</span>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900">{lessonPlanData.terms}</h2>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8 h-[60vh] overflow-y-auto">
          <section>
            <h3 className="text-lg font-semibold text-gray-800">TOPIC:</h3>
            <ul className="list-disc ml-6 text-gray-700">{lessonPlanData.topic.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800">MAIN AREAS COVERED:</h3>
            <p className="text-gray-700">{lessonPlanData.mainAreasCovered}</p>
            <p className="text-gray-600 mt-2">Sub-areas: {Object.entries(lessonPlanData.subAreas).map(([k, v]) => `${k}[${v.join(", ")}]`).join(", ")}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800">MATERIAL NEEDED:</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {Object.values(lessonPlanData.materialNeeded).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800">FORMATIVE ASSESSMENT:</h3>
            <p className="text-gray-700">{lessonPlanData.formativeAssessment}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800">CLASS MANAGEMENT:</h3>
            <p className="text-gray-700">{lessonPlanData.classManagement}</p>
          </section>

          <section>
    <h3 className="text-lg font-semibold text-gray-800">PROCEDURE:</h3>
    <div className=" "> {/* Table height & scrolling */}
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-indigo-100 text-gray-900">
          <tr>
            <th className="p-3 border">Timing</th>
            <th className="p-3 border">Stage</th>
            <th className="p-3 border">Interaction</th>
            <th className="p-3 border">Procedure</th>
          </tr>
        </thead>
        <tbody>
          {lessonPlanData.procedure.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="p-3 border">{row.timing}</td>
              <td className="p-3 border">{row.stage}</td>
              <td className="p-3 border">{row.interaction}</td>
              <td className="p-3 border">{row.procedure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  {/* Assessment */}
  <section>
    <h3 className="text-lg font-semibold text-gray-800">ASSESSMENT:</h3>
    <ul className="list-disc ml-6 text-gray-700">{lessonPlanData.assessment.map((item, index) => <li key={index}>{item}</li>)}</ul>
  </section>

  {/* Goals */}
  <section>
    <h3 className="text-lg font-semibold text-gray-800">GOALS:</h3>
    <ul className="list-disc ml-6 text-gray-700">{lessonPlanData.goals.map((goal, index) => <li key={index}>{goal}</li>)}</ul>
  </section>
 
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
