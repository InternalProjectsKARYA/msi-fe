// "use client";
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import React, { useState, useRef } from 'react';
// import { Paperclip, SendIcon,CircleX  } from 'lucide-react';
 
 
// const AiChat = () => {
   
//     const [Text, setText] = useState('');
//     const [data, setdata] = useState([]);
//     const [isimageCorrect,setimageCorrect]=useState(false)
//     const [imagePreview, setImagePreview] = useState(null);
//     const fileInputRef = useRef(null);
 
//     // Handler for form submission (message send)
   
 
//     // Trigger file input when the icon is clicked
//     const handleIconClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };
 
//     // Handle the file input change (file selection)
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const isImage = file.type.startsWith("image/");
//             if (isImage) {
//                 // Create a preview URL for the image and store it
//                 const imageUrl = URL.createObjectURL(file);
//                 setImagePreview(imageUrl);
             
//                 setimageCorrect(true)
//                 event.target.value=null
//                // Store the actual file for further use if needed
//             } else {
//                 alert("Please select a valid image file.");
//             }
//         }
//     };
//     const handleKeyDown = (event) => {
//         console.log("Key pressed:", event.key);
//         if (event.key === "Enter" && !event.shiftKey) {
//             event.preventDefault();
//             if (Text.trim() || imagePreview) {
//                 handleSubmit(event);
//             }
//         }
//     };
   
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (Text.trim() || imagePreview) {
//             setdata([...data, { message: Text.trim(), image: imagePreview }]);
//             setText('');
//             setImagePreview(null);
//             setimageCorrect(false);
//         }
//     };
   
 
//     return (
//         <div className="flex items-center justify-center p-5 h-screen">
//         <Card className="w-full mx-auto flex flex-col h-full">
//           <div className="w-4/5 mx-auto flex flex-col h-full">
//             {/* Card Header for the Chat Title */}
//             <CardHeader className="text-2xl font-semibold pb-2">
//               Chat
//             </CardHeader>
      
//             {/* Card Content for displaying messages */}
//             <CardContent className="flex-1 h-full overflow-y-auto">
//               <ScrollArea className="scroll-smooth h-full">
//                 {data.map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-full flex justify-start mb-3 pr-8"
//                   >
//                     <div className="rounded-lg px-4 py-2 text-sm sm:text-base border max-w-full break-words whitespace-pre-wrap shadow">
//                       {/* Display text message */}
//                       <p style={{ whiteSpace: "pre-wrap" }}>{item.message}</p>
//                       {/* Display image if it exists */}
//                       {item.image && (
//                         <img
//                           src={item.image}
//                           alt="Preview"
//                           className="mt-2 max-w-full h-auto rounded"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </ScrollArea>
//             </CardContent>
      
//             {/* Card Footer with message input and send button */}
//             <CardFooter className="relative">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex w-full items-center space-x-2"
//               >
//                 <div className="relative flex-1">
//                   <textarea
//                     placeholder="Enter your message"
//                     className="w-full p-2 pl-16 border rounded-lg resize-none"
//                     value={Text}
//                     onChange={(e) => setText(e.target.value)}
//                     onKeyDown={handleKeyDown} // Capture Enter key
//                     rows={1}
//                   />
//                   {/* Hidden file input for image upload */}
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                   <Paperclip
//                     className="absolute left-3 top-3 w-5 h-5 text-gray-500 cursor-pointer transform -rotate-45"
//                     onClick={handleIconClick}
//                   />
//                 </div>
      
//                 <Button type="submit" className="p-3 mb-2">
//                   <SendIcon className="text-xl" />
//                 </Button>
//               </form>
      
//               {/* Display image preview if an image is selected */}
//               {isimageCorrect && imagePreview && (
//                 <div className="mt-2 ">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-10 h-10 object-cover rounded-lg border border-gray-300 absolute right-20 top-5"
//                   />
//                   <CircleX
//                     className="absolute w-4 h-4 top-3 right-20 cursor-pointer"
//                     onClick={() => {
//                       setimageCorrect(false);
//                       setImagePreview(null);
//                     }}
//                   />
//                 </div>
//               )}
//             </CardFooter>
//           </div>
//         </Card>
//       </div>
      
//     );
// };
 
// export default AiChat;

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, Globe, Mic } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = React.useState<
    { id: string; role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [height, setHeight] = React.useState("0%");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      };
      setMessages((prev) => [...prev, userMessage]);

      // Clear input
      setInput("");

      // Add bot response from OpenAI API
      const botResponse = await fetchBotResponse(input);
      if (botResponse) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "bot", content: botResponse },
        ]);
      }

      increaseHeight();
    }
  };

  const fetchBotResponse = async (userInput: string): Promise<string | null> => {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, 
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: userInput,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      return data.choices[0]?.text.trim() || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "An error occurred while fetching the response.";
    }
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Add your voice recording logic here
  };

  const increaseHeight = () => {
    let currentHeight = 0;
    const interval = setInterval(() => {
      currentHeight += 5;
      setHeight(`${currentHeight}%`);
      if (currentHeight >= 80) {
        clearInterval(interval);
      }
    }, 30); // Gradual height increase (every 30ms)
  };

  return (
    <div className="h-screen flex items-center">
      <Card
        className="w-full max-w-2xl mx-auto transition-all duration-300 mt-[-2%]"
        style={{
          height: messages.length > 0 ? height : "auto",
        }}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {messages.length === 0 ? "What can I help with?" : "Chat"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 h-full flex flex-col justify-end">
          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`p-2 my-1 rounded ${
                      message.role === "user"
                        ? "bg-gray-50 text-black"
                        : "bg-blue-100 text-black"
                    }`}
                  >
                    <strong>
                      {message.role === "user" ? "User:" : "Bot:"}
                    </strong>{" "}
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Message Input */}
          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-center w-full space-x-2"
          >
            <div className="flex items-center space-x-2 absolute left-3 top-1/2 transform -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Browse web</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              placeholder="Message ChatGPT"
              value={input}
              onChange={handleInputChange}
              className="pl-24 pr-12 flex-1"
            />
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${isRecording ? "text-red-500" : ""}`}
                      onClick={handleRecord}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isRecording ? "Stop recording" : "Start recording"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button type="submit" variant={"default"} className="ml-4">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
