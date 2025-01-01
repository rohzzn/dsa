import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Video, Code, Globe, ChevronRight } from 'lucide-react';

// Mock data structure for courses
const courses = [
  {
    title: "Data Structures Fundamentals",
    platform: "Coursera",
    instructor: "Princeton University",
    level: "Beginner",
    duration: "6 weeks",
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs"],
    url: "https://www.coursera.org/learn/data-structures",
    category: "Data Structures"
  },
  {
    title: "Algorithms Specialization",
    platform: "Coursera",
    instructor: "Stanford University",
    level: "Intermediate",
    duration: "4 months",
    topics: ["Divide & Conquer", "Graph Algorithms", "Dynamic Programming"],
    url: "https://www.coursera.org/specializations/algorithms",
    category: "Algorithms"
  },
  {
    title: "Advanced Algorithms",
    platform: "edX",
    instructor: "MIT",
    level: "Advanced",
    duration: "12 weeks",
    topics: ["Network Flow", "Linear Programming", "NP-Completeness"],
    url: "https://www.edx.org/learn/algorithms",
    category: "Algorithms"
  }
];

const resources = [
  {
    title: "Visualgo",
    description: "Interactive visualizations of data structures and algorithms",
    type: "Interactive",
    url: "https://visualgo.net/",
    category: "Tools"
  },
  {
    title: "GeeksforGeeks DSA",
    description: "Comprehensive DSA tutorials and practice problems",
    type: "Tutorial",
    url: "https://www.geeksforgeeks.org/data-structures/",
    category: "Learning"
  },
  {
    title: "CLRS Book",
    description: "Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein",
    type: "Book",
    url: "https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition",
    category: "Books"
  }
];

const LearningPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'interactive':
        return <Code className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const filterCourses = (category: string) => {
    if (category === "all") return courses;
    return courses.filter(course => course.category === category);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Learn Data Structures & Algorithms</h1>
        <p className="text-lg opacity-90">Access curated courses, tutorials, and resources to master DSA concepts</p>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {course.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Platform: {course.platform}</p>
                      <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => window.open(course.url, '_blank')}
                      className="w-full"
                    >
                      View Course <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {getIcon(resource.type)}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{resource.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {resource.type}
                      </span>
                    </div>
                    <Button 
                      onClick={() => window.open(resource.url, '_blank')}
                      className="w-full"
                    >
                      Access Resource <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPage;