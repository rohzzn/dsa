import { useRouter } from 'next/router'
import { roadmapData } from '@/lib/data/roadmaps'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function TopicPage() {
  const router = useRouter()
  const { id } = router.query

  const topic = roadmapData
    .flatMap(section => section.topics)
    .find(topic => topic.title.toLowerCase().replace(/\s+/g, '-') === id)

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Topic Not Found</h1>
          <p className="text-gray-600">The requested topic could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>{topic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{topic.description}</p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Subtopics</h2>
              <ul className="space-y-2">
                {topic.subtopics.map((subtopic, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{subtopic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}