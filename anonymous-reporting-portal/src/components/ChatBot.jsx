"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackingReportSchema } from "@/schemas/trackingCodeSchema";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";


function ChatBot({  apiRoute, initialCode, senderRole }) {

    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingReply, setIsLoadingReply] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    const form = useForm({
      resolver: zodResolver(trackingReportSchema),
      defaultValues: { anonymousCode: initialCode || "" },
    });
  
    useEffect(() => {
      if (initialCode) {
        form.setValue("anonymousCode", initialCode);
        fetchReport({ anonymousCode: initialCode });
      }
    }, [initialCode]);
  
    const fetchReport = async (data) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/get-tracking-report?anonymousCode=${data.anonymousCode}`);
        if (response?.data?.success) {
          setReportData(response.data.message);
          setMessages(response.data.message.messages);
          toast.success("Report found!");
        } else {
          toast.error("Report not found or incorrect code.");
        }
      } catch (error) {
        toast.error("Error fetching report. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSendMessage = async (e) => {
        
      e.preventDefault();
      setIsLoadingReply(true);
      
      if (!newMessage.trim()) {
        toast.error("Message cannot be empty.");
        setIsLoadingReply(false);
        return;
      }
  
      try {
       
        const response = await axios.post(apiRoute, {
          anonymousCode: reportData?.anonymousCode,
          replyMessage: newMessage,
          sender: senderRole,
        });
        if (response?.data?.success) {
          setMessages([...messages, { sender: senderRole, content: newMessage, timestamp: new Date().toISOString() }]);
          setNewMessage("");
          toast.success("Message sent successfully!");
        } else {
          toast.error("Failed to send message.");
        }
      } catch (error) {
        toast.error("Error sending message. Please try again.");
      } finally {
        setIsLoadingReply(false);
      }
    };

    return (
        <div>
           <div className="flex flex-col gap-5">
          

            <div className="rounded-lg w-3/4 md:w-1/2 mx-auto mt-10">
                <form
                    onSubmit={form.handleSubmit(fetchReport)}
                
                >
                    <div className="flex items-center w-full space-x-2 relative">
                        <Input
                            type="text"
                            placeholder="Send your anonymous code here...."
                            className="input input-bordered w-full p-2 h-14 font-bold md:text-center md:text-lg"
                            {...form.register("anonymousCode")}
                        />
                        <Button
                            type="submit"
                            className="p-2 bg-blue-950 transition-colors absolute right-0 h-14"
                            aria-label="Track report"
                            disabled={isLoading}
                        >
                            {isLoading ? "Fetching Report..." : "Track Report"}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="w-3/4 md:w-1/2 mx-auto bg-white shadow-md rounded p-4 ">
             {reportData && (
                    <div>
                        <div className="bg-blue-950 w-full  flex justify-between items-center px-4 py-3 text-white rounded mb-5 ">
                            <div className="flex gap-2">
                                <span className="hidden md:block">Reporting Time : </span>
                                <span className="text-sm text-slate-300">
                                    [ {new Date(reportData.createdAt).toLocaleString()} ]
                                </span>
                            </div>
                            <p>
                                <span className="text-sm text-slate-300">
                                    {reportData.anonymousCode}
                                </span>
                            </p>
                        </div>
                </div>
                )}

                <h2 className="text-xl font-bold mb-4">Anonymous Chatbox</h2>
                <div className=" border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index}>
                             <div
                              className={` w-1/2  ${message.sender === senderRole
                                      ? "text-right relative left-1/2"
                                      : "text-left"
                                  }`}
                             >
                                <p className="text-[12px] italic opacity-50">
                                    {message.sender === "admin" ? "Admin" : `User`}
                                </p>
                                <p className="text-[12px] italic opacity-50">
                                    {new Date(message.timestamp).toLocaleString()}
                                </p>


                             </div>
                            <div
                            
                                className={`p-4 mb-2  break-words w-1/2 font-mono shadow-xl ${message.sender === senderRole
                                        ? "bg-blue-900 text-gray-100 text-right rounded-tl-xl rounded-br-3xl relative left-1/2 "
                                        : "bg-gray-200 text-left rounded-tr-3xl rounded-bl-3xl relative  "
                                    }`}
                            >
                                <p className="text-wrap">{message.content}</p>
                                
                            </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages yet. Start the conversation below.</p>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-2"
                    />
                    <Button disabled={isLoadingReply} className="p-2 bg-blue-950">
                        {isLoadingReply ? "Sending..." : "Send"}
                    </Button>
                </form>
            </div>

           </div>
        </div>
    );
}

export default ChatBot;
