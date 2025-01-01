import { NextPage } from 'next'
import Creators from '@/components/sections/Creators'

const CreatorsPage: NextPage = () => {
 return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <h1 className="text-3xl font-bold text-gray-900 mb-8">Top DSA Creators</h1>
     <Creators />
   </div>
 )
}
export default CreatorsPage
