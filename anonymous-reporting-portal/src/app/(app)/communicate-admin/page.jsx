import React from "react";
import { FaSearch } from "react-icons/fa";
import ChatBot from "@/components/ChatBot";

function CommunicateWithAdmin() {
  
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative bg-gradient-to-r from-gray-200 via-blue- to-gray-500 h-64 border-b border-blue-950">
        <div className="flex flex-col items-center h-full justify-center gap-2 text-center">
          <FaSearch className="text-4xl text-blue-950 mb-4" />
          <h1 className="text-4xl text-blue-950 md:text-5xl font-bold ">
            Communicate with admin
          </h1>
          <p className="mb-4 text-sm font-bold text-gray-600">
            Use the anonymous code you received to communicate with admin.
          </p>
        </div>

        <div  className ="absolute top-1/2 translate-y-14 left-1/2 -translate-x-1/2  w-full ">
        <ChatBot
         apiRoute="/api/user-reply"
         senderRole="user"
        />
        </div>
        
      </div>

     

     
    </div>
  );
}

export default CommunicateWithAdmin;
