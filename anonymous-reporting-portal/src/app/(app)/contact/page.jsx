'use client'   
 import React, { useState } from 'react';
import Head from 'next/head';
import { FaEnvelope, FaPhone, FaUser, FaPaperPlane, FaArrowCircleDown } from 'react-icons/fa';

function ContactPage() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle the state of showMore between true and false
  };

  return (
    <>
      <Head>
        <title>Contact Us - UAP</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
          <div className="bg-blue-600 text-white p-4 md:w-1/3">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <FaUser className="mr-2" /> Contact Details
            </h2>
            <div className="mb-3">
              <p className="flex items-center"><FaEnvelope className="mr-2" /> 21101006@uap-bd.edu</p>
              <p className="flex items-center"><FaPhone className="mr-2" /> 01944898393</p>
            </div>
            <div className="mb-3">
              <p className="flex items-center"><FaEnvelope className="mr-2" /> 21101008@uap-bd.edu</p>
              <p className="flex items-center"><FaPhone className="mr-2" /> 01880904002</p>
            </div>
            {showMore && (
              <div className="mt-4">
                <p>More information available upon request. Please contact us using the details provided or via the message form.</p>
              </div>
            )}
            <button onClick={toggleShowMore} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <FaArrowCircleDown className="mr-2" />
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <div className="p-6 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-gray-700">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your Name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-700">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your Email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="message" className="text-gray-700">Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Your Message" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
              </div>
              <button type="submit" className="flex justify-center items-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;


