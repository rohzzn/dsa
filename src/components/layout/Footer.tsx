import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Learn
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/roadmap" className="text-gray-500 hover:text-gray-900">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-gray-500 hover:text-gray-900">
                  Practice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Community
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/creators" className="text-gray-500 hover:text-gray-900">
                  Creators
                </Link>
              </li>
              <li>
                <Link href="/discord" className="text-gray-500 hover:text-gray-900">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/books" className="text-gray-500 hover:text-gray-900">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-500 hover:text-gray-900">
                  Videos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} DSA.gay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer