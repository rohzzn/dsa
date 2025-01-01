import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              DSA.gay
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/roadmap" className="text-gray-600 hover:text-gray-900">
              Roadmap
            </Link>
            <Link href="/creators" className="text-gray-600 hover:text-gray-900">
              Creators
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/practice" className="text-gray-600 hover:text-gray-900">
              Practice
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header