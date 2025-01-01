import { NextPage } from 'next'
import Resources from '@/components/sections/Resources'

const ResourcesPage: NextPage = () => {
 return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <h1 className="text-3xl font-bold text-gray-900 mb-8">Learning Resources</h1>
     <Resources />
   </div>
 )
}

export default ResourcesPage