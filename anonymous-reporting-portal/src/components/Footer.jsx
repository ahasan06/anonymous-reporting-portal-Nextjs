import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto py-10 px-5 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* University Logo & Info */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/university-logo.png" // Replace with actual logo file path
            alt="University Logo"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-lg font-semibold">University Name</h3>
          <p className="mt-2 text-sm text-gray-300">
            123 University Street, City, Country <br />
            Email: contact@university.edu <br />
            Phone: +123-456-7890
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.university-website.com"
                className="hover:underline text-gray-300"
              >
                University Website
              </a>
            </li>
            <li>
              <a
                href="https://www.university-website.com/admissions"
                className="hover:underline text-gray-300"
              >
                Admissions
              </a>
            </li>
            <li>
              <a
                href="https://www.university-website.com/courses"
                className="hover:underline text-gray-300"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="https://www.university-website.com/contact"
                className="hover:underline text-gray-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/university"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="University Facebook"
              className="hover:text-blue-500 transition"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/university"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="University LinkedIn"
              className="hover:text-blue-400 transition"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://www.university-website.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="University Website"
              className="hover:text-blue-300 transition"
            >
              <i className="fas fa-globe text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-900 py-4">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} University Name. All Rights Reserved.
          </p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-300 text-sm hover:underline"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="text-gray-300 text-sm hover:underline"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
