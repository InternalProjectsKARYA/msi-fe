"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

/* ------------------- ChatSidebar ------------------- */
const ChatSidebar = ({ onChatSelect }) => {
  const onlineUsers = [
    { id: 1, name: "Mark Williams", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 2, name: "Elizabeth Sosa", avatar: "https://i.pravatar.cc/150?img=25" },
    { id: 3, name: "Michael Howard", avatar: "https://i.pravatar.cc/150?img=33" },
  ];

  const recentChats = [
    { id: 1, name: "Horace Keene", lastMessage: "Have you called them?", time: "Just Now", avatar: "https://i.pravatar.cc/150?img=22" },
    { id: 2, name: "Hollis Tran", lastMessage: "Video", time: "Yesterday", avatar: "https://i.pravatar.cc/150?img=23" },
    { id: 3, name: "James Albert", lastMessage: "Project Tools.doc", time: "10:20 PM", avatar: "https://i.pravatar.cc/150?img=24" },
    { id: 4, name: "Debra Jones", lastMessage: "Audio", time: "12:30 PM", avatar: "https://i.pravatar.cc/150?img=25" },
    // ... more
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Filtered users and chats based on the search query
  const filteredUsers = onlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredRecentChats = recentChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border-r rounded-lg border-gray-300  bg-[#fbe9ea] p-4 h-full">
      <h2 className="text-lg font-bold mb-3">All Chats</h2>
      <Input
        placeholder="Search ..."
        className="max-w-sm mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h3 className="text-md font-semibold my-3">Online Now</h3>
      <div className="flex space-x-2 mb-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex flex-col items-center relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-full w-8 h-8"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Recent Chats</h3>
      <div className="flex flex-col space-y-2 overflow-y-auto h-[65vh] scrollbar-hide">
        {filteredRecentChats.map((chat, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-200 cursor-pointer"
            onClick={() => onChatSelect(chat)}
          >
            <div className="flex items-center">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="rounded-full w-8 h-8 mr-2"
              />
              <div>
                <span className="font-medium">{chat.name}</span>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------- ChatArea ------------------- */
const ChatArea = ({ selectedChat, onBack }) => {
  const messages = [
    { id: 1, user: "Mark Williams", time: "8:16 PM", content: "Hello @Alex, Thanks for the new web design..." },
    { id: 2, user: "Mark Williams", time: "8:16 PM", content: "https://www.youtube.com/watch?v=GCmL3mS0Psk" },
    { id: 3, user: "Alex Smith", time: "8:16 PM", content: "Please check & review the files 😊" },
    // ... more
  ];

  return (

    
<>
     <Button
              variant="outline"
              className=" mb-2"
              onClick={onBack}
            >
              Back
              </Button>
    <div className="flex-1 flex flex-col p-2  bg-[#fff6d9] rounded-lg h-full">
      <div className="flex-grow flex flex-col overflow-hidden">
        <CardHeader className="flex items-center justify-between">
          {/* On small screens, show a back button */}
          <div className="flex items-center">
           
            <h2 className="text-xl font-bold flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={selectedChat.avatar || "https://i.pravatar.cc/150?img=23"}
                  alt="Selected Chat"
                />
              </Avatar>
              <div>
                {selectedChat.name}
                <p className="text-xs text-gray-600">Last seen: 10:20 PM</p>
              </div>
            </h2>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden">
          <div className="overflow-y-auto h-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 ${
                  message.user === "Mark Williams" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.user === "Mark Williams"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 ml-1">{message.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
        />
        <Button className="ml-2">Send</Button>
      </div>
    </div>
    </>
  );
};

/* ------------------- ChatComponent ------------------- */
const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // We'll track window width or use a media query.
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const isMobile = windowWidth < 1024;

  // Load first chat by default on large screens
  React.useEffect(() => {
    if (!isMobile && !selectedChat) {
      // Example "first chat" from the recentChats
      // Make sure ChatSidebar's recentChats data is accessible or replicate the first chat details
      setSelectedChat({
        id: 1,
        name: "Horace Keene",
        lastMessage: "Have you called them?",
        time: "Just Now",
        avatar: "https://i.pravatar.cc/150?img=22",
      });
    }
  }, [isMobile, selectedChat]);

  const handleBack = () => setSelectedChat(null);

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Large screens: show both, small screens: conditionally show one */}
      {isMobile ? (
        selectedChat ? (
          // Only ChatArea if a chat is selected
          <div className="col-span-12 h-full flex flex-col">
            <ChatArea selectedChat={selectedChat} onBack={handleBack} />
          </div>
        ) : (
          // Only Sidebar if no chat selected
          <div className="col-span-12 h-full">
            <ChatSidebar onChatSelect={setSelectedChat} />
          </div>
        )
      ) : (
        // On large screens
        <>
          <div className="col-span-4 h-full">
            <ChatSidebar onChatSelect={setSelectedChat} />
          </div>
          <div className="col-span-8 h-full flex flex-col">
            {selectedChat ? (
              <ChatArea selectedChat={selectedChat} onBack={handleBack} />
            ) : (
              <div className="flex items-center justify-center text-gray-500 h-full">
                <p>Select a chat to begin</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
