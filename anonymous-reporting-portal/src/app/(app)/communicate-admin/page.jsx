"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackingReportSchema } from "@/schemas/trackingCodeSchema";
import { FaSearch } from "react-icons/fa";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

function CommunicateWithAdmin() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(trackingReportSchema),
    defaultValues: {
      anonymousCode: "",
    },
  });

  // For tracking the report
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-tracking-report?anonymousCode=${data.anonymousCode}`
      );
      if (response?.data?.success) {
        setReportData(response.data.message); // Set report data
        setMessages(response.data.message.messages);
        toast.success("Report found!");
      } else {
        toast.error("Report not found or incorrect code.");
        setReportData(null);
      }
    } catch (error) {
      toast.error("Error fetching report. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission behavior
    setIsLoadingReply(true)
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }
    try {
      const response = await axios.post("/api/user-reply", {
        anonymousCode: reportData?.anonymousCode,
        replyMessage: newMessage,
      });

      if (response?.data?.success) {
        // Add new message to the list
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "user",
            content: newMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
        setNewMessage(""); // Clear input after sending
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Error sending message. Please try again.");
      console.error(error);
    } finally {
      setIsLoadingReply(false);
    }
  };

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3/4 md:w-1/2"
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
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Fetching Report..." : "Track Report"}
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-lg w-3/4 md:w-1/2 mx-auto mt-10">
        {reportData && (
          <div>
            <div className="bg-blue-950 w-full mt-10 flex justify-between items-center px-4 py-3 text-white rounded-t ">
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
      </div>

      <div className="w-3/4 md:w-1/2 mx-auto bg-white shadow-md rounded-b p-4 ">
        <h2 className="text-xl font-bold mb-4">Anonymous Chatbox</h2>
        <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded-lg ${
                  message.sender === "admin"
                    ? "bg-gray-200 text-left"
                    : "bg-blue-200 text-right"
                }`}
              >
                <p className="font-bold italic text-sm">
                  {message.sender === "admin" ? "Admin" : `You`}
                </p>
                <p>{message.content}</p>
                <p className="text-sm text-gray-500 ">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
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
          <Button  disabled={isLoadingReply} className="p-2 bg-blue-950">
            {isLoadingReply ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CommunicateWithAdmin;
