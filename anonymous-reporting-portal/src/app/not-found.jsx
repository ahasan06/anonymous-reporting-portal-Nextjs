
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="flex flex-col items-center shadow-xl  rounded-lg p-10">
      <FaExclamationTriangle size={80} color="#f56565" />
      <h1 className="text-4xl md:text-6xl font-bold text-primary mt-4">404</h1>
      <p className="text-black text-lg md:text-xl mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <li className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-accent-dark transition duration-300">
          Go Back Home
        </li>
      </Link>
      </div>
    </div>
  )
}

export default Notfound