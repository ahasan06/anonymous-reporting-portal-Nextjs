import React from 'react';
import { BiUserVoice } from 'react-icons/bi';
import { MdTrackChanges } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import Link from "next/link";
import Image from 'next/image';
import bgimage from '../../../../public/bg-image.jpg';
import bgLowerImage from '../../../../public/bglowerimage.jpg';

const features = [
  {
    title: "Anonymous Reporting",
    description: "Submit reports without revealing your identity",
    Icon: BiUserVoice
  },
  {
    title: "Track Reports",
    description: "Stay updated on your report's progress",
    Icon: MdTrackChanges
  },
  {
    title: "Secure Communication",
    description: "Engage safely with administrators",
    Icon: FiLock
  }
];

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section container h-auto md:h-[40rem] w-full flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden mx-auto py-10 md:py-0">
        {/* Left Side: Text Content */}
        <div className="relative z-10 text-center md:text-left text-neutral-50 p-4 w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-950 to-neutral-600">
            Anonymous Reporting System
          </h1>
          <p className="mt-4  max-w-xl md:max-w-lg mx-auto md:mx-0 text-black font-semibold">
            Submit reports without revealing your identity. Our system ensures your privacy and confidentiality, empowering users to communicate issues securely without any risk of identification.
          </p>
          <Link href="/submit-report" className="mt-6 inline-block bg-slate-700 text-white px-4 py-3 rounded-lg shadow-inner shadow-slate-50 hover:shadow-none">
            Submit Report
          </Link>
        </div>

        {/* Right Side: Hero Image */}
        <div className="hero-image w-full h-1/2 md:w-1/2  flex justify-center md:justify-end">
          <Image
            src={bgimage}
            alt="Hero Background"
            className="w-full h-full object-cover shadow border-2 border-black"
          />
        </div>
      </section>


      {/* Carousel Placeholder */}
      <section className="bg-blue-500 text-white py-16 text-center flex items-center justify-center bg-gradient-to-b from-blue-950 to-neutral-900">
        <h2 className="text-xl max-w-lg font-semibold mb-4">
          Empower change and voice concerns anonymously to build safer communities, protect privacy, and foster open communication.
        </h2>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white flex flex-col items-center p-6 rounded-lg shadow-md w-64">
              <div className="text-blue-500 text-6xl mb-4">
                <feature.Icon />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Make a Difference?</h2>
        <p className="mb-8">Join our platform to report and resolve issues anonymously</p>
        <Link href="/sign-up" className="inline-block bg-slate-700 text-white px-4 py-3 rounded-lg shadow-inner shadow-slate-50 hover:shadow-none">
            Signup now
          </Link>
      </section>
    </div>
  );
}

export default Home;
