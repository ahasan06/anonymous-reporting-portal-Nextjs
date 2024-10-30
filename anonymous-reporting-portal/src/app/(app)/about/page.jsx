// src/components/AboutPage.js
import React from 'react';
import { FaShieldAlt, FaUserSecret, FaLock, FaUsers, FaHome, FaEdit, FaSignInAlt, FaClipboard } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-8">
            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
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

                    {/* Project Goals Section */}
                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaUserSecret className="mr-3 text-blue-500" /> Project Goals
                        </h2>
                        <ul className="space-y-4 text-gray-600 text-lg">
                            <li className="flex items-start">
                                <FaLock className="text-blue-500 mr-3 mt-1" />
                                <span>Provide a secure platform for reporting sensitive issues with complete confidentiality.</span>
                            </li>
                            <li className="flex items-start">
                                <FaUserSecret className="text-blue-500 mr-3 mt-1" />
                                <span>Ensure total anonymity to encourage transparency and protect users from retaliation.</span>
                            </li>
                            <li className="flex items-start">
                                <FaUsers className="text-blue-500 mr-3 mt-1" />
                                <span>Offer a dashboard for admins to securely manage reports with role-based access control.</span>
                            </li>
                            <li className="flex items-start">
                                <FaShieldAlt className="text-blue-500 mr-3 mt-1" />
                                <span>Implement robust authentication and encryption to safeguard data and evidence.</span>
                            </li>
                        </ul>
                    </section>

                    {/* User Guide Section */}
                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaClipboard className="mr-3 text-blue-500" /> User Guide
                        </h2>
                        <ul className="space-y-6 text-gray-600 text-lg">
                            <li className="flex items-start">
                                <FaHome className="text-blue-500 mr-3 mt-1" />
                                <div>
                                    <strong>Visit the Homepage:</strong> Start on the homepage to learn about the purpose of the system. The homepage provides access to anonymous report submission and a login option for authorized staff.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaEdit className="text-blue-500 mr-3 mt-1" />
                                <div>
                                    <strong>Submit an Anonymous Report:</strong> Click on the “Submit Report” button to access the anonymous report submission page. You can select the issue type, provide a detailed description, and optionally attach evidence (e.g., images, documents). Your identity will remain completely anonymous.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaSignInAlt className="text-blue-500 mr-3 mt-1" />
                                <div>
                                    <strong>Administrator Login:</strong> Authorized staff can log in through the login button on the homepage. After logging in, administrators can view, manage, and respond to submitted reports on the dashboard.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaClipboard className="text-blue-500 mr-3 mt-1" />
                                <div>
                                    <strong>Track Report Status:</strong> After submitting a report, you may receive a unique tracking code. This code allows you to check the status of your report without logging in, maintaining anonymity.
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
