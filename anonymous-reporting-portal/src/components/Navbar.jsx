'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';  // Adding icons for links
import Image from 'next/image';
import logo from '../../public/logo.jpg';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const role = session?.user?.role;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignInClick = () => {
    setLoading(true);
  };
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/dashboard' });
};
  return (
    <nav className="bg-gray-900 p-4 shadow-lg font-sans">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="Website Logo" width={45} height={45} />
          <h1 className="text-white text-2xl font-semibold tracking-wide">Visionary</h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-5/6">
          {/* Left side navigation */}
          <div className="text-gray-300 flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center hover:text-white transition duration-300">
              <FaHome className="mr-1" /> Home
            </Link>
            <Link href="/about" className="flex items-center hover:text-white transition duration-300">
              <FaInfoCircle className="mr-1" /> About
            </Link>
            <Link href="/contact" className="flex items-center hover:text-white transition duration-300">
              <FaEnvelope className="mr-1" /> Contact
            </Link>
          </div>
          {/* user navigation*/}
          <div className="flex items-center space-x-6">
          {
            role ==='user'&&(
            <>
            <Link href="/submit-report" className="text-white hover:text-gray-400">
              Submit a Report
            </Link>
            <Link href="/track-report" className="text-white hover:text-gray-400">
              Track Report
            </Link>
            <Link href="/communicate-admin" className="text-white hover:text-gray-400">
              Admin Communication
            </Link>
              </>
            )
          }
          {
            role ==='admin'&&(
            <>
            <Link href="/manage-reports" className="text-white hover:text-gray-400">
              Manage Reports
            </Link>
            <Link href="/reply-report" className="text-white hover:text-gray-400">
              Reply to Reports
            </Link>
            <Link href="/user-management" className="text-white hover:text-gray-400">
              User Management
            </Link>
              </>
            )
          }
            {/* Login/Signup Section */}
            {session ? (
              <>
                <span className="text-gray-300 text-sm italic">
                  Hello, {user?.username || user?.email}
                </span>
                <Button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    onClick={handleSignInClick}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaSignInAlt className="mr-2" />
                    )}
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="relative md:hidden mt-4 space-y-4 bg-gray-800 text-white p-4 rounded-md shadow-lg">
          <div className="absolute right-5">
            <p className="text-sm italic text-slate-300">

              <span className="pr-2">{user?.role}</span>

              {

                user?.username || user?.email
              }

            </p>
          </div>
          <div>

            <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link href="/about" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              <FaInfoCircle className="mr-2" /> About
            </Link>
            <Link href="/contact" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              <FaEnvelope className="mr-2" /> Contact
            </Link>
            <Link href="/submit-report" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              Submit a Report
            </Link>
            <Link href="/track-report" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              Track Report
            </Link>
            <Link href="/communicate-admin" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
              Admin Communication
            </Link>
            {session ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >

                Logout
              </Button>
            ) : (
              <div className=" flex flex-col gap-5">
                <Link href="/sign-in">
                  <Button
                    onClick={handleSignInClick}
                    className="w-full flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaSignInAlt className="mr-2" />
                    )}
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
