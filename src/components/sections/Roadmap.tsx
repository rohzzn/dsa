import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { roadmapData } from '@/lib/data/roadmaps'

const Roadmap = () => {
  return (
    <div className="space-y-6">
      {roadmapData.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                  <ul className="mt-2 space-y-1">
                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <li key={subtopicIndex} className="text-gray-500">
                        • {subtopic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Roadmap