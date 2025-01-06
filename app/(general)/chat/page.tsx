"use client";
import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {   CardContent, CardHeader  } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

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
    { id: 5, name: "Dina Brown", lastMessage: "Have you called them?", time: "Yesterday", avatar: "https://i.pravatar.cc/150?img=26" },
    { id: 6, name: "Samuel Green", lastMessage: "Let's meet tomorrow.", time: "2:00 PM", avatar: "https://i.pravatar.cc/150?img=27" },
    { id: 7, name: "Nina Patterson", lastMessage: "Got it, thanks!", time: "10:15 AM", avatar: "https://i.pravatar.cc/150?img=28" },
    { id: 8, name: "Carlos Rivera", lastMessage: "Check the files.", time: "3:45 PM", avatar: "https://i.pravatar.cc/150?img=29" },
    { id: 9, name: "Sophia Wilson", lastMessage: "Meeting confirmed.", time: "1:30 PM", avatar: "https://i.pravatar.cc/150?img=30" },
    { id: 10, name: "Liam Miller", lastMessage: "Great job on the presentation!", time: "Yesterday", avatar: "https://i.pravatar.cc/150?img=31" },
    { id: 11, name: "Olivia Taylor", lastMessage: "Can you send the update?", time: "Just Now", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 12, name: "Ethan Harris", lastMessage: "I'll review and get back.", time: "9:45 AM", avatar: "https://i.pravatar.cc/150?img=33" },
    { id: 13, name: "Emma Martinez", lastMessage: "Lunch at 1?", time: "10:05 AM", avatar: "https://i.pravatar.cc/150?img=34" },
    { id: 14, name: "Noah Clark", lastMessage: "Please call me.", time: "Yesterday", avatar: "https://i.pravatar.cc/150?img=35" },
    { id: 15, name: "Isabella Johnson", lastMessage: "Sure, sounds good.", time: "12:50 PM", avatar: "https://i.pravatar.cc/150?img=36" },
  ];
  
  

  const [searchQuery, setSearchQuery] = useState("");

  // Filtered users and chats based on the search query
  const filteredUsers = onlineUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  const filteredRecentChats = recentChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 pl-4 border-r rounded-lg border-gray-300  dark:bg-gray-800 bg-white ">
      <h2 className="text-lg font-bold my-2">All Chats</h2>
      <Input
        placeholder="Search ..."
        className="max-w-sm mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />
      <h3 className="text-md font-semibold my-3">Online Now</h3>
      <div className="flex space-x-2 mb-4">
      {filteredUsers.map((user) => (
  <div key={user.id} className="flex flex-col items-center relative">
    <Avatar>
      <AvatarImage src={user.avatar} alt={user.name} />
    </Avatar>
    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
  </div>
))}

</div>


     

      <h3 className="flex flex-col space-y-2">Recent Chats</h3>
      <div className="flex flex-col space-y-2 overflow-y-auto h-[70vh] scrollbar-hide">
      {filteredRecentChats.map((chat, index) => (
  <div
    key={index}
    className="flex justify-between items-center p-2 border-b border-gray-200 cursor-pointer"
    onClick={() => onChatSelect(chat)}
  >
    <div className="flex items-center">
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage src={chat.avatar} alt={chat.name} />
      </Avatar>
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

const ChatArea = ({ selectedChat }) => {
  const messages = [
    { id: 1, user: "Mark Williams", time: "8:16 PM", content: "Hello @Alex, Thank you for the beautiful web design ahead schedule." },
    { id: 2, user: "Mark Williams", time: "8:16 PM", content: "https://www.youtube.com/watch?v=GCmL3mS0Psk" },
    { id: 3, user: "Alex Smith", time: "8:16 PM", content: "Please check and review the files 😊" },
    { id: 4, user: "Mark Williams", time: "8:17 PM", content: "What do you think about the design?" },
    { id: 5, user: "Alex Smith", time: "8:17 PM", content: "I think it looks great!" },
    { id: 6, user: "Mark Williams", time: "8:18 PM", content: "Glad to hear that!" },
    { id: 7, user: "Mark Williams", time: "8:19 PM", content: "Let me know if you need any changes." },
    { id: 8, user: "Alex Smith", time: "8:19 PM", content: "Will do! Thank you." },
    { id: 9, user: "Mark Williams", time: "8:20 PM", content: "You're welcome!" },
    { id: 10, user: "Mark Williams", time: "8:21 PM", content: "Talk to you later!" },
    { id: 11, user: "Alex Smith", time: "8:21 PM", content: "Bye!" },
  ];

  return (
    <div className="flex-1 flex flex-col p-2 dark:bg-gray-800 bg-white rounded-lg">
      <div className="flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <h2 className="text-xl font-bold flex gap-4">
          <Avatar className="h-12 w-12">
  <AvatarImage src={selectedChat.avatar || "https://i.pravatar.cc/150?img=23"} alt="Selected Chat" />
</Avatar>

            <div>
              {selectedChat.name}
              <p className="text-xs text-gray-600">Last seen: 10:20 PM</p> {/* Static last seen time */}
            </div>
          </h2>
          <Separator />
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden ">  
          <div className="overflow-y-auto h-full">
            {messages.map((message,index) => (
              <div key={index} className={`my-2 ${message.user === "Mark Williams" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-2 rounded-lg ${message.user === "Mark Williams" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
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
  );
};

const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState({ 
    id: 1, 
    name: "Mark Williams", 
    lastMessage: "Have you called them?", 
    time: "10:20 PM" 
  });

  return (
    <div className="flex  ">
      <ChatSidebar onChatSelect={setSelectedChat} />
      <ChatArea selectedChat={selectedChat} />
    </div>
  );
};

export default ChatComponent;





