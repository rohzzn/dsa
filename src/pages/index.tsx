import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Roadmap from '@/components/sections/Roadmap'
import Creators from '@/components/sections/Creators'
import Resources from '@/components/sections/Resources'
import Practice from '@/components/sections/Practice'
import { Map, Users, BookOpen, Code } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn Data Structures & Algorithms
          </h1>
          <p className="text-xl text-gray-600">
            Curated resources, roadmaps, and practice materials to master DSA
          </p>
        </header>

        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="creators" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Creators
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            <Roadmap />
          </TabsContent>

          <TabsContent value="creators">
            <Creators />
          </TabsContent>

          <TabsContent value="resources">
            <Resources />
          </TabsContent>

          <TabsContent value="practice">
            <Practice />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}