// src/components/sections/Learning.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, Play, ExternalLink, School, Video } from 'lucide-react';

interface BaseCourse {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  url: string;
}

interface ProfessionalCourse extends BaseCourse {
  platform: string;
  instructor: string;
  level: string;
  price: string;
}

interface FreeCourse extends BaseCourse {
  instructor: string;
  platform: string;
  language: string;
}

interface TopicPlaylist extends BaseCourse {
  creator: string;
  videos: number;
  speciality: string;
}

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const learningContent = {
  professionalCourses: [
    {
      title: "Data Structures Fundamentals",
      platform: "Coursera",
      instructor: "Princeton University",
      level: "Beginner",
      duration: "6 weeks",
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
      price: "Free (Certificate: $149)",
      topics: ["Network Flow", "Linear Programming", "NP-Completeness"],
      url: "https://www.edx.org/learn/algorithms",
      description: "Advanced algorithmic concepts and theoretical foundations"
    },
    {
      title: "Data Structures and Algorithms Specialization",
      platform: "Coursera",
      instructor: "UC San Diego",
      level: "Intermediate",
      duration: "5 months",
      price: "$49/month",
      topics: ["Basic Data Structures", "Dynamic Programming", "Graph Algorithms", "String Processing"],
      url: "https://www.coursera.org/specializations/data-structures-algorithms",
      description: "Comprehensive DSA course with practical assignments"
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
    },
    {
      title: "DSA Course in Hindi",
      instructor: "CodeWithHarry",
      platform: "YouTube",
      description: "Data structures and algorithms explained in Hindi",
      duration: "30+ hours",
      language: "Java/C++",
      url: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi",
      topics: ["Data Structures", "Algorithms", "Problem Solving"]
    }
  ],
  topicPlaylists: [
    {
      title: "Algorithms Course",
      creator: "Abdul Bari",
      description: "In-depth algorithms explanations with visualizations",
      duration: "20+ hours",
      videos: 80,
      speciality: "Visual explanations of complex algorithms",
      url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O",
      topics: ["Sorting", "Searching", "Advanced Algorithms"]
    },
    {
      title: "Data Structures & Algorithms",
      creator: "William Fiset",
      description: "Code-focused DSA implementations with detailed explanations",
      duration: "25+ hours",
      videos: 100,
      speciality: "Implementation focused with code examples",
      url: "https://www.youtube.com/watch?v=RBSGKlAvoiM&list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu",
      topics: ["Data Structures", "Implementation", "Problem Solving"]
    },
    {
      title: "Dynamic Programming Playlist",
      creator: "Aditya Verma",
      description: "Comprehensive DP pattern-based learning",
      duration: "15+ hours",
      videos: 55,
      speciality: "Pattern-based DP problem solving",
      url: "https://www.youtube.com/watch?v=nqowUJzG-iM&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go",
      topics: ["Dynamic Programming", "Patterns", "Problems"]
    },
    {
      title: "Graph Algorithms",
      creator: "Striver",
      description: "Complete graph algorithms coverage",
      duration: "10+ hours",
      videos: 40,
      speciality: "Graph concepts and problems",
      url: "https://www.youtube.com/watch?v=YTtptkEOE3k&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw",
      topics: ["Graph Theory", "Algorithms", "Problems"]
    }
  ]
};

const CATEGORIES = {
  professionalCourses: 'Professional Courses',
  freeCourses: 'Free Courses',
  topicPlaylists: 'Topic Playlists',
} as const;

type CategoryType = keyof typeof CATEGORIES; // 'professionalCourses' | 'freeCourses' | 'topicPlaylists'

const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, children, icon }) => (
  <Button
    onClick={onClick}
    variant={isActive ? "default" : "outline"}
    className={`px-4 py-2 flex items-center justify-start w-full sm:w-auto rounded-md
                ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
  >
    <span className="flex items-center justify-center w-5 h-5">
      {icon}
    </span>
    <span className="ml-2 text-sm font-medium">{children}</span>
  </Button>
);

const CourseCard: React.FC<{ 
  course: ProfessionalCourse | FreeCourse | TopicPlaylist; 
  type: CategoryType 
}> = ({ course, type }) => (
  <Card className="border-2 hover:border-blue-200 transition-all h-full flex flex-col">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2 flex-grow">
          {type === 'topicPlaylists' && <Youtube className="w-5 h-5 text-red-600 flex-shrink-0" />}
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </div>
        {'level' in course && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex-shrink-0 ml-2">
            {course.level}
          </span>
        )}
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      <div className="space-y-4 flex-grow">
        <div>
          <p className="text-gray-600 mb-2">{course.description}</p>
          {'instructor' in course && <p className="text-sm text-gray-500">By {course.instructor}</p>}
          {'platform' in course && <p className="text-sm text-gray-500">Platform: {course.platform}</p>}
          <p className="text-sm text-gray-500">Duration: {course.duration}</p>
          {'language' in course && <p className="text-sm text-gray-500">Language: {course.language}</p>}
          {'price' in course && <p className="text-sm font-medium text-blue-600">{course.price}</p>}
          {'videos' in course && <p className="text-sm text-gray-500">{course.videos} videos</p>}
        </div>
        
        {course.topics && (
          <div className="flex flex-wrap gap-2">
            {course.topics.map((topic, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {'speciality' in course && (
          <span className="block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {course.speciality}
          </span>
        )}
      </div>
      
      <Button 
        onClick={() => window.open(course.url, '_blank')}
        className="w-full mt-4"
      >
        {type === 'topicPlaylists' ? 'Watch Playlist' : type === 'freeCourses' ? 'Watch Course' : 'View Course'}
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

const LearningPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('professionalCourses');

  const getContent = (category: CategoryType) => {
    switch (category) {
      case 'professionalCourses':
        return learningContent.professionalCourses;
      case 'freeCourses':
        return learningContent.freeCourses;
      case 'topicPlaylists':
        return learningContent.topicPlaylists;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Learning Resources</h1>
        <p className="text-base sm:text-lg opacity-90">
          Access curated courses and learning materials
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 px-4 sm:px-0">
        <FilterButton
          isActive={activeCategory === 'professionalCourses'}
          onClick={() => setActiveCategory('professionalCourses')}
          icon={<School className="w-5 h-5" />}
        >
          Professional Courses
        </FilterButton>
        <FilterButton
          isActive={activeCategory === 'freeCourses'}
          onClick={() => setActiveCategory('freeCourses')}
          icon={<Play className="w-5 h-5" />}
        >
          Free Courses
        </FilterButton>
        <FilterButton
          isActive={activeCategory === 'topicPlaylists'}
          onClick={() => setActiveCategory('topicPlaylists')}
          icon={<Video className="w-5 h-5" />}
        >
          Topic Playlists
        </FilterButton>
      </div>

      {/* Content Grid */}
      <div className="px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getContent(activeCategory).map((item, index) => (
            <CourseCard key={index} course={item} type={activeCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
