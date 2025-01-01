import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, Play, ExternalLink, Bookmark, GraduationCap } from 'lucide-react';

const learningContent = {
  professionalCourses: [
    {
      title: "Data Structures Fundamentals",
      platform: "Coursera",
      instructor: "Princeton University",
      level: "Beginner",
      duration: "6 weeks",
      isPaid: true,
      price: "$49/month",
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs"],
      url: "https://www.coursera.org/learn/data-structures",
      description: "Essential data structures concepts with hands-on practice"
    },
    {
      title: "Algorithms Specialization",
      platform: "Coursera",
      instructor: "Stanford University",
      level: "Intermediate",
      duration: "4 months",
      isPaid: true,
      price: "$49/month",
      topics: ["Divide & Conquer", "Graph Algorithms", "Dynamic Programming", "Advanced Algorithms"],
      url: "https://www.coursera.org/specializations/algorithms",
      description: "Deep dive into algorithmic techniques and problem solving"
    },
    {
      title: "Advanced Algorithms",
      platform: "edX",
      instructor: "MIT",
      level: "Advanced",
      duration: "12 weeks",
      isPaid: true,
      price: "Free (Certificate: $149)",
      topics: ["Network Flow", "Linear Programming", "NP-Completeness"],
      url: "https://www.edx.org/learn/algorithms",
      description: "Advanced algorithmic concepts and theoretical foundations"
    }
  ],
  freeCourses: [
    {
      title: "Complete DSA Bootcamp",
      instructor: "Kunal Kushwaha",
      platform: "YouTube",
      description: "Comprehensive DSA course covering all important topics with Java",
      duration: "40+ hours",
      language: "Java",
      url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
      topics: ["Arrays", "LinkedList", "Trees", "Graphs", "DP"]
    },
    {
      title: "DSA in Java + Placement Course",
      instructor: "Apna College",
      platform: "YouTube",
      description: "Data structures & algorithms course with placement preparation",
      duration: "60+ hours",
      language: "Java",
      url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
      topics: ["Basic DSA", "Advanced DSA", "Practice"]
    },
    {
      title: "Complete Python + DSA Course",
      instructor: "Love Babbar",
      platform: "YouTube",
      description: "Complete DSA coverage with Python implementation",
      duration: "35+ hours",
      language: "Python",
      url: "https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA",
      topics: ["Python Basics", "DSA Concepts", "Problem Solving"]
    }
  ],
  topicPlaylists: [
    {
      title: "Algorithms Course",
      creator: "Abdul Bari",
      description: "In-depth algorithms explanations with visualizations",
      videos: 80,
      speciality: "Visual explanations of complex algorithms",
      url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O"
    },
    {
      title: "Data Structures & Algorithms",
      creator: "William Fiset",
      description: "Code-focused DSA implementations with detailed explanations",
      videos: 100,
      speciality: "Implementation focused with code examples",
      url: "https://www.youtube.com/watch?v=RBSGKlAvoiM&list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu"
    },
    {
      title: "Dynamic Programming Playlist",
      creator: "Aditya Verma",
      description: "Comprehensive DP pattern-based learning",
      videos: 55,
      speciality: "Pattern-based DP problem solving",
      url: "https://www.youtube.com/watch?v=nqowUJzG-iM&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go"
    },
    {
      title: "Graph Algorithms",
      creator: "Striver",
      description: "Complete graph algorithms coverage",
      videos: 40,
      speciality: "Graph concepts and problems",
      url: "https://www.youtube.com/watch?v=YTtptkEOE3k&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw"
    }
  ]
};

const LearningPage = () => {
  return (
    <div className="space-y-12">
         {/* Header Section */}
         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Learning</h1>
        <p className="text-lg opacity-90">
        Access curated learning and resources
        </p>
      </div>
      {/* Professional Courses Section */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Professional Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.professionalCourses.map((course, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all">
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
                    <p className="text-gray-600 mb-2">{course.description}</p>
                    <p className="text-sm text-gray-500">Platform: {course.platform}</p>
                    <p className="text-sm text-gray-500">Duration: {course.duration}</p>
                    <p className="text-sm font-medium text-blue-600">{course.price}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Button 
                    onClick={() => window.open(course.url, '_blank')}
                    className="w-full"
                  >
                    View Course <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Free Complete Courses Section */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Play className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Free Complete Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.freeCourses.map((course, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">{course.description}</p>
                    <p className="text-sm text-gray-500">By {course.instructor}</p>
                    <p className="text-sm text-gray-500">Duration: {course.duration}</p>
                    <p className="text-sm text-gray-500">Language: {course.language}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Button 
                    onClick={() => window.open(course.url, '_blank')}
                    className="w-full"
                  >
                    Watch Course <Youtube className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Topic-wise Playlists Section */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Bookmark className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Topic-wise Playlists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.topicPlaylists.map((playlist, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg">{playlist.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">{playlist.description}</p>
                    <p className="text-sm text-gray-500">By {playlist.creator}</p>
                    <p className="text-sm text-gray-500">{playlist.videos} videos</p>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      {playlist.speciality}
                    </span>
                  </div>
                  <Button 
                    onClick={() => window.open(playlist.url, '_blank')}
                    className="w-full"
                  >
                    Watch Playlist <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningPage;