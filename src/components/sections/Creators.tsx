import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { creatorsData } from '@/lib/data/creators'
import { Youtube, Globe, Github } from 'lucide-react'

const Creators = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-600" />
      case 'github':
        return <Github className="w-5 h-5 text-gray-900" />
      default:
        return <Globe className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creatorsData.map((creator, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {getPlatformIcon(creator.platform)}
              <CardTitle className="text-lg">{creator.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">{creator.description}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Platform:</span>
                <span>{creator.platform}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Topics:</span>
                <span>{creator.topics.join(', ')}</span>
              </div>
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Visit Channel</span>
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Creators