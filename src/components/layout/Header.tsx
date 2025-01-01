import React from 'react'
import Link from 'next/link'
const Header: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            DSA 
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/roadmap" className="text-gray-600 hover:text-blue-600 font-medium">
              Roadmap
            </Link>
            <Link href="/creators" className="text-gray-600 hover:text-blue-600 font-medium">
              Creators
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-blue-600 font-medium">
              Resources
            </Link>
            <Link href="/practice" className="text-gray-600 hover:text-blue-600 font-medium">
              Practice
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Header