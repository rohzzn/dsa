import { NextPage } from 'next'
import Roadmap from '@/components/sections/Roadmap'

const RoadmapPage: NextPage = () => {
 return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <h1 className="text-3xl font-bold text-gray-900 mb-8">DSA Roadmap</h1>
     <Roadmap />
   </div>
 )
}

export default RoadmapPage
