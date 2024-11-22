'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaShieldAlt, FaClipboard } from 'react-icons/fa';

// Correctly import images
import homepageImage from '../../../../public/home-page.jpg';
import submitReportImage from '../../../../public/submit-report.jpg';
import trackReportImage from '../../../../public/report-details.jpg';
import adminComImage from '../../../../public/admin-communication.jpg';

const AboutPage = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageClick = (src) => {
        setSelectedImg(src); // Function to set the clicked image for modal view
    };

    const handleClose = () => {
        setSelectedImg(null); // Function to close the modal
    };

    return (
        <>
            <Head>
                <title>Anonymous Reporting System - About</title>
            </Head>
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-8">
                <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white">
                        <h1 className="text-5xl font-extrabold mb-2">Anonymous Reporting System</h1>
                        <p className="text-lg opacity-90">
                            A secure, confidential platform to address sensitive university issues.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="p-10 md:p-12 space-y-8">
                        {/* Overview Section */}
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FaShieldAlt className="mr-3 text-blue-500" /> Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                The Anonymous Reporting System provides a secure and confidential platform for university
                                students and staff to report sensitive issues like harassment, bullying, and discrimination.
                                By ensuring anonymity, the system promotes transparency and protection for reporters, fostering
                                a safe campus environment. This system includes a public homepage, a private administrator dashboard,
                                and an anonymous report submission page.
                            </p>
                        </section>

                        {/* User Guide Section */}
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FaClipboard className="mr-3 text-blue-500" /> User Guide
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-6">
                                    <div onClick={() => handleImageClick(homepageImage)} className="cursor-pointer">
                                        <Image src={homepageImage} alt="Homepage" width={200} height={130} className="rounded-xl" />
                                    </div>
                                    <div>
                                        <strong>Visit the Homepage:</strong> Start on the homepage to learn about the purpose of the system.
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div onClick={() => handleImageClick(submitReportImage)} className="cursor-pointer">
                                        <Image src={submitReportImage} alt="Submit Report" width={200} height={130} className="rounded-xl" />
                                    </div>
                                    <div>
                                        <strong>Submit an Anonymous Report:</strong> Click on the “Submit Report” button to access the anonymous report submission page.
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div onClick={() => handleImageClick(trackReportImage)} className="cursor-pointer">
                                        <Image src={trackReportImage} alt="Track Report" width={200} height={130} className="rounded-xl" />
                                    </div>
                                    <div>
                                        <strong>Track Report Status:</strong> After submitting a report, you can check the status using a unique tracking code.
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div onClick={() => handleImageClick(adminComImage)} className="cursor-pointer">
                                        <Image src={adminComImage} alt="Admin Communication" width={200} height={130} className="rounded-xl" />
                                    </div>
                                    <div>
                                        <strong>Administrator Communication:</strong> Details on how administrators can interact with reporters and manage reports.
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Modal for Full-Screen Image View */}
                {selectedImg && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
                        <div className="relative max-w-3xl max-h-full p-4">
                            <Image src={selectedImg} alt="Full View"  />
                            <button onClick={handleClose} className="absolute -top-10 right-1/2   p-2 text-white cursor-pointer text-4xl">
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AboutPage;