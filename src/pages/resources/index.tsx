import { NextPage } from 'next'
import Resources from '@/components/sections/Resources'

const ResourcesPage: NextPage = () => {
 return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Header Section */}
       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Resources</h1>
        <p className="text-lg opacity-90">
        Access curated tools and materials
        </p>
      </div>
     <Resources />
   </div>
 )
}

export default ResourcesPage