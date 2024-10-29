'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';  // Adding icons for links
import Image from 'next/image';
import logo from '../../public/logo-anonymous.png';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const role = session?.user?.role;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/dashboard' });
  };
  return (
    <nav className="bg-blue-950 p-4 shadow-lg font-sans text-sm md:text-[16px]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="Website Logo" width={60} height={60} />
          <h1 className="text-gray-300 font-semibold tracking-wide">Anonymous Reporting <span className="tracking-[1.5rem] text-gray-400">portal</span></h1>
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
              role === 'user' && (
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
              role === 'admin' && (
                <>
                  <Link href="/manage-reports" className="text-white hover:text-gray-400">
                    Manage Reports
                  </Link>
                  <Link href="/communicateWith-user" className="text-white hover:text-gray-400">
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
                <div className="flex items-center gap-2 text-gray-300 text-sm italic">
                  <Avatar className="flex-shrink-0">
                    <AvatarImage src={user?.image} alt="User Avatar" className="rounded-full border-2 border-white-400" />
                    <AvatarFallback className="flex items-center justify-center bg-slate-400 text-black border-2 border-white-400 rounded-full">
                      {user?.role?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">
                    {user?.username || user?.email}
                  </span>
                </div>
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
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                      <FaSignInAlt className="mr-2" />
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
