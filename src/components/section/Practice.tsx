import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Code, Trophy, BookOpen } from 'lucide-react'

const Practice = () => {
  const platforms = [
    {
      name: 'LeetCode',
      description: 'Practice coding problems with varying difficulty levels',
      features: ['Problem categories', 'Difficulty levels', 'Discussion forums'],
      url: 'https://leetcode.com',
      icon: <Code className="w-6 h-6" />
    },
    {
      name: 'HackerRank',
      description: 'Practice through structured tutorials and challenges',
      features: ['Skill certificates', 'Interview prep', 'Company challenges'],
      url: 'https://hackerrank.com',
      icon: <Trophy className="w-6 h-6" />
    },
    {
      name: 'GeeksforGeeks',
      description: 'Comprehensive DSA practice platform with tutorials',
      features: ['Topic-wise practice', 'Company questions', 'Articles'],
      url: 'https://geeksforgeeks.org',
      icon: <BookOpen className="w-6 h-6" />
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                {platform.icon}
                <CardTitle>{platform.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{platform.description}</p>
              <ul className="space-y-2 mb-4">
                {platform.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => window.open(platform.url, '_blank')}
                className="w-full"
              >
                Start Practicing
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Practice