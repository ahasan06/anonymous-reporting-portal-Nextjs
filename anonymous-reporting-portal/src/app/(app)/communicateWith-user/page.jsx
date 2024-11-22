'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ChatBot from '@/components/ChatBot';
import noevidance from '../../../../public/no-evidance.webp';
import { AiOutlineMessage } from 'react-icons/ai';
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function ReportDetails() {

  const reportStatus = ['in-progress', 'resolved']
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter()

  const [isChatBotOpen, setIsChatBotOpen] = useState(false)
  const [status, setStatus] = useState('new');
  const [report, setReport] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackCode, setTrackCode] = useState(null)

  const toogleSection = () => {
    setIsChatBotOpen((prevState) => !prevState)
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const fetchReport = async (codeToFetch) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/get-tracking-report?anonymousCode=${codeToFetch}`);
      setReport(response.data.message);

    } catch (error) {
      toast.error("Failed to load report details.");

    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (code) {
      fetchReport(code)
    }
  }, [code])


  // Handle status update
  const handleStatusUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/change-report-status', {
        reportId: report._id,
        status,
      });
      toast.success(response.data.message);
      setReport(prevReport => ({
        ...prevReport,
        status: status
      }));

    } catch (error) {
      toast.error("Failed to update report status.");
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Delete Report

  const handleDeleteReport = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;
    try {
      setIsDeleteLoading(true);
      const response = await axios.delete('/api/change-report-status', {
        data: { reportId: report._id } // Set reportId in the data object for DELETE
      });
      toast.success(response.data.message);
      router.push('/page-not-found');
    } catch (error) {
      toast.error("Failed to delete report.");
    } finally {
      setIsDeleteLoading(false);
    }
  }


  // handle search 
  const handleSearch = (e) => {

    e.preventDefault();
    if (trackCode) {
      fetchReport(trackCode);
    } else {
      toast.error("Please enter a tracking code.");
    }
  };


  if (loading) return <Loader2 className="animate-spin" />;



  return (
    <div className="relative container mx-auto  min-h-screen p-8 flex flex-col justify-center">
      <div className="flex flex-col pb-10 space-y-2">
        <h1 className="text-4xl text-blue-950 md:text-5xl font-bold ">
          Specific Report Details
        </h1>
        <p className="mb-4 text-sm text-gray-600 opacity-50">
          Use the anonymous code you received to communicate with user.
        </p>

        <div className='flex'>

          <form onSubmit={handleSearch} className='flex'>
            <input
              type="text"
              className='border p-2 text-sm rounded w-64 outline-none'
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              placeholder="Enter report tracking code"
            />
            <button type='submit' className='bg-blue-950 hover:bg-blue-900 text-white px-2 w-1/2'>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row lg:space-x-10">

        <div className=" flex justify-center">
          <Image
            src={report?.evidence?.url || noevidance}
            alt="noevidance"
            height={400}
            width={400}
            className="object-cover rounded shadow-lg"
            unoptimized={!!report?.evidence?.url}
          />

        </div>

        <div className="w-full lg:w-1/2 space-y-4">


          <div>
            <h1 className="text-3xl font-bold text-blue-900 uppercase">
              {report ? report.issueType : 'Loading...'}
            </h1>

            <p className="text-gray-700 mb-8 font-medium">
              Occurrence Date: {report ? new Date(report.occurrenceDate).toLocaleDateString() : 'Loading...'}
            </p>
            <p className="text-lg font-blod ">
              Department: <span className='uppercase'>{report ? report.department : 'Loading...'}</span>
            </p>

            <p className="text-lg font-blod  mt-2">
              Status:
              <span
                className={`text-sm px-4 py-1 rounded-full mx-3 ${report
                  ? report.status === "in-progress"
                    ? "bg-yellow-500 text-white"
                    : report.status === "resolved"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  : "bg-gray-500 text-white"
                  }`}
              >

                {report ? report.status : 'Loading...'}

              </span>
            </p>

            <div className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
              <p className='text-blue-900 font-bold text-sm mb-2'>Report Details :</p>
              {report ? report.description : 'Loading...'}
            </div>

          </div>



          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <span className="text-gray-600 mr-2 font-bold">Change Status :</span>
            <select className="border border-white px-2 py-2 bg-blue-800 text-white rounded-lg w-32" value={status} onChange={handleStatusChange}>

              <option value="new">new</option>
              {
                reportStatus.map((statusOption) => (
                  <option key={statusOption} value={statusOption}> {statusOption}</option>
                ))
              }
            </select>
          </div>

          {/* Add to Cart Button */}
          <div className='md:flex items-center gap-5'>
            <button className="w-full bg-green-800 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-green-500"
              onClick={handleStatusUpdate}
              disabled={loading}
            >
              {
                isLoading ? (
                  <div className='flex items-center justify-center'>
                    Changing Status ..<Loader2 className='ml-2 h-4 w-4 animate-spin' />
                  </div>
                ) :

                  (
                    <>
                      Apply Changes
                    </>
                  )

              }
            </button>
            <button className="w-full bg-red-700 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-red-400"
              onClick={handleDeleteReport}
              disabled={loading}
            >
              {
                isDeleteLoading ? (
                  <div className='flex items-center justify-center'>
                    Deleting Report ..<Loader2 className='ml-2 h-4 w-4 animate-spin' />
                  </div>
                ) :

                  (
                    <>
                      Delete Report
                    </>
                  )
              }
            </button>
          </div>
        </div>
      </div>
      {/* ChatBot */}
      <div className="absolute right-0 bottom-0 w-full md:w-3/5 mx-auto mt-12">

        <div className="fixed right-4 bottom-4">
          <button
            onClick={toogleSection}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            <AiOutlineMessage size={24} /> {/* Chatbot icon */}
          </button>
        </div>

        {isChatBotOpen && (
          <div className="fixed right-0 translate-x-32 bottom-16 w-full md:w-3/5 mx-auto mt-12">
            <ChatBot
              apiRoute="/api/admin-reply"
              initialCode={code}
              senderRole="admin"
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default ReportDetails;
