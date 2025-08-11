import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
const Header: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Learn Dsa Dev 
          </Link>
          <nav className="flex items-center space-x-8">
            <SignedIn>
              <Link href="/roadmap" className="text-gray-600 hover:text-blue-600 font-medium">Roadmap</Link>
              <Link href="/learn" className="text-gray-600 hover:text-blue-600 font-medium">Learn</Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 font-medium">Resources</Link>
              <Link href="/contests" className="text-gray-600 hover:text-blue-600 font-medium">Contests</Link>
              <UserButton afterSignOutUrl="/" afterMultiSessionSingleSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4">
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
                <Link href="/sign-up" className="text-gray-700 hover:text-blue-700 font-semibold">Create account</Link>
              </div>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Header