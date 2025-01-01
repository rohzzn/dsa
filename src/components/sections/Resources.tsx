import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { resourcesData } from '@/lib/data/resources'
import { BookOpen, Video, Globe, Code } from 'lucide-react'

const Resources = () => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-blue-600" />
      case 'video':
        return <Video className="w-5 h-5 text-red-600" />
      case 'tool':
        return <Code className="w-5 h-5 text-green-600" />
      default:
        return <Globe className="w-5 h-5 text-gray-600" />
    }
  }

  const resourcesByCategory = resourcesData.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = []
    }
    acc[resource.type].push(resource)
    return acc
  }, {} as Record<string, typeof resourcesData>)

  return (
    <div className="space-y-8">
      {Object.entries(resourcesByCategory).map(([category, resources]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {getResourceIcon(resource.type)}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>Access Resource</span>
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Resources