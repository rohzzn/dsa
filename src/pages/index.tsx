import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function Home() {
 const sections = [
   {
     title: 'Roadmap',
     description: 'Follow a structured path to master DSA concepts',
     link: '/roadmap',
     bgColor: 'bg-blue-50',
     textColor: 'text-blue-600'
   },
   {
     title: 'Contests',
     description: 'Solve problems and improve your skills',
     link: '/contests',
     bgColor: 'bg-green-50', 
     textColor: 'text-green-600'
   },
   {
     title: 'Resources',
     description: 'Access curated learning materials',
     link: '/resources',
     bgColor: 'bg-purple-50',
     textColor: 'text-purple-600'  
   },
   {
     title: 'Creators',
     description: 'Learn from top DSA educators',
     link: '/creators',
     bgColor: 'bg-orange-50',
     textColor: 'text-orange-600'
   }
 ]

 return (
   <div className="min-h-screen bg-gray-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <header className="text-center mb-16">
         <h1 className="text-5xl font-bold text-gray-900 mb-4">
           Learn Data Structures & Algorithms
         </h1>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Curated resources, roadmaps, and practice materials to master DSA concepts from beginner to advanced
         </p>
       </header>

       <div className="grid md:grid-cols-2 gap-8">
         {sections.map((section, index) => (
           <Link href={section.link} key={index}>
             <Card className={`${section.bgColor} p-8 hover:shadow-lg transition-shadow`}>
               <h2 className={`text-2xl font-semibold ${section.textColor} mb-2`}>
                 {section.title}
               </h2>
               <p className="text-gray-600">{section.description}</p>
             </Card>
           </Link>
         ))}
       </div>
     </div>
   </div>
 )
}