// src/components/Resources.tsx

import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../ui/card'
import { resourcesData } from '@/lib/data/resources'
import {
  BookOpen,
  Globe,
  Code,
  ClipboardList,
  Users,
} from 'lucide-react'

const Resources: React.FC = () => {
  // State to manage selected category
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Extract unique categories from resourcesData
  const categories = Array.from(
    new Set(resourcesData.map((resource) => resource.type))
  ).sort()

  // Function to handle category selection
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value)
  }

  // Function to get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-blue-600" />
      case 'tool':
        return <Code className="w-5 h-5 text-green-600" />
      case 'website':
        return <Globe className="w-5 h-5 text-purple-600" />
      case 'course':
        return <Code className="w-5 h-5 text-yellow-600" />
      case 'interactive':
        return <ClipboardList className="w-5 h-5 text-pink-600" />
      case 'cheatsheet':
        return <ClipboardList className="w-5 h-5 text-indigo-600" />
      case 'community':
        return <Users className="w-5 h-5 text-red-600" />
      default:
        return <Globe className="w-5 h-5 text-gray-600" />
    }
  }

  // Filter resources based on selected category
  const filteredResources =
    selectedCategory === 'All'
      ? resourcesData
      : resourcesData.filter(
          (resource) => resource.type === selectedCategory
        )

  // Group filtered resources by category (type)
  const resourcesByCategory = filteredResources.reduce<
    Record<string, typeof filteredResources>
  >((acc, resource) => {
    const category = resource.type
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(resource)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex justify-end">
        <label htmlFor="category" className="mr-2 font-semibold">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Resources */}
      {selectedCategory === 'All'
        ? categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByCategory[category].map(
                  (resource, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          {getResourceIcon(resource.type)}
                          <CardTitle className="text-lg">
                            {resource.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {resource.description}
                        </p>
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
                  )
                )}
              </div>
            </div>
          ))
        : (
          <div key={selectedCategory}>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesByCategory[selectedCategory]?.map(
                (resource, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        {getResourceIcon(resource.type)}
                        <CardTitle className="text-lg">
                          {resource.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {resource.description}
                      </p>
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
                )
              )}
            </div>
          </div>
        )}
    </div>
  )
}

export default Resources
