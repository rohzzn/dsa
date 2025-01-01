import { NextPage } from 'next'
import Contests from '@/components/sections/Contests'

const ContestsPage: NextPage = () => {
 return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Live Coding Contests</h1>

     <Contests />
   </div>
 )
}
export default ContestsPage
