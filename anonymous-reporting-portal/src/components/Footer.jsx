import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto py-10 px-5 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* University Logo & Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/university-logo.png" // Replace with actual logo file path
            alt="University Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-lg font-semibold">University of Asia Pacific</h3>
          <address className="mt-2 text-sm text-gray-300 not-italic">
            123 University Street, City, Country <br />
            Email: contact@university.edu <br />
            Phone: +123-456-7890
          </address>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="https://www.university-website.com" className="hover:underline">
                University Website
              </Link>
            </li>
            <li>
              <Link href="https://www.university-website.com/admissions" className="hover:underline">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="https://www.university-website.com/courses" className="hover:underline">
                Courses
              </Link>
            </li>
            <li>
              <Link href="https://www.university-website.com/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <Link href="https://www.facebook.com/university" target="_blank" aria-label="University Facebook" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </Link>
            <Link href="https://www.linkedin.com/school/university" target="_blank" aria-label="University LinkedIn" className="hover:text-blue-400 transition">
              <FaLinkedinIn />
            </Link>
            <Link href="https://www.university-website.com" target="_blank" aria-label="University Website" className="hover:text-blue-300 transition">
              <FaGlobe />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-900 py-4">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-300 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} University OF Asia Pacific. All Rights Reserved.
          </p>
          <ul className="flex space-x-4 text-sm text-gray-300">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
