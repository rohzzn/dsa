import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckSquare, Code, Brain, Zap, Target } from 'lucide-react';

const roadmapData = {
  // Based on Striver's A2Z DSA Sheet structure
  steps: [
    {
      title: "Step 1: Learn the basics",
      icon: <Code className="w-6 h-6 text-blue-600" />,
      description: "Master the fundamental concepts before diving deep",
      topics: [
        {
          name: "Basic Math",
          subtopics: ["Count digits", "Reverse number", "Armstrong numbers", "Print divisors", "Prime numbers", "GCD/LCM"]
        },
        {
          name: "Basic Recursion",
          subtopics: ["Print N times", "Sum of N numbers", "Factorial", "Reverse array", "Palindrome check"]
        },
        {
          name: "Basic Hashing",
          subtopics: ["Frequency counting", "High/Low frequency", "Pre/Post processing"]
        },
        {
          name: "Basic Time Complexity",
          subtopics: ["Best/Average/Worst cases", "Big O notation", "Space complexity"]
        }
      ]
    },
    {
      title: "Step 2: Learn Important Sorting Techniques",
      icon: <Target className="w-6 h-6 text-purple-600" />,
      description: "Master all sorting algorithms and their applications",
      topics: [
        {
          name: "Sorting-1",
          subtopics: ["Selection Sort", "Bubble Sort", "Insertion Sort"]
        },
        {
          name: "Sorting-2",
          subtopics: ["Merge Sort", "Quick Sort", "Quick Select"]
        }
      ]
    },
    {
      title: "Step 3: Master Arrays",
      icon: <Brain className="w-6 h-6 text-green-600" />,
      description: "Arrays form the foundation of data structures",
      topics: [
        {
          name: "Easy Problems",
          subtopics: ["Reverse array", "Remove duplicates", "Left rotate", "Linear Search", "Missing number"]
        },
        {
          name: "Medium Problems",
          subtopics: ["Two Sum", "Sort Colors", "Majority Element", "Maximum Subarray", "Next Permutation"]
        },
        {
          name: "Hard Problems",
          subtopics: ["Pascal Triangle", "Majority Element II", "3-Sum", "4-Sum", "Largest Subarray with 0 sum"]
        }
      ]
    },
    {
      title: "Step 4: Binary Search",
      icon: <Target className="w-6 h-6 text-yellow-600" />,
      description: "Master this essential searching paradigm",
      topics: [
        {
          name: "BS on 1D Arrays",
          subtopics: ["Basic Implementation", "Lower/Upper Bound", "Search Insert Position"]
        },
        {
          name: "BS on Answers",
          subtopics: ["Nth Root", "Median of 2 Sorted Arrays", "Aggressive Cows"]
        }
      ]
    },
    {
      title: "Step 5: Linked List",
      icon: <CheckSquare className="w-6 h-6 text-red-600" />,
      description: "Understanding linked structures and their operations",
      topics: [
        {
          name: "Learn 1D Linked List",
          subtopics: ["Implementation", "Insertion", "Deletion", "Traversal"]
        },
        {
          name: "Learn Doubly Linked List",
          subtopics: ["Implementation", "All Operations"]
        },
        {
          name: "Medium Problems",
          subtopics: ["Reverse LL", "Middle of LL", "Delete/Add nodes"]
        },
        {
          name: "Hard Problems",
          subtopics: ["Rotate LL", "Clone with Random Pointer", "LRU Cache"]
        }
      ]
    },
    {
      title: "Step 6: Recursion and Backtracking",
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      description: "Master the art of recursive thinking",
      topics: [
        {
          name: "Get Started",
          subtopics: ["Parameterized/Functional", "Multiple Recursion Calls"]
        },
        {
          name: "Subsequences Pattern",
          subtopics: ["All Subsequences", "All Permutations", "Unique Combinations"]
        },
        {
          name: "Hard Recursion",
          subtopics: ["N Queens", "Sudoku Solver", "Palindrome Partitioning"]
        }
      ]
    }
  ]
};

const RoadmapPage = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Roadmap</h1>
        <p className="text-lg opacity-90">
          A structured path to master Data Structures & Algorithms
        </p>
      </div>

      {/* Steps Section */}
      <div className="space-y-6">
        {roadmapData.steps.map((step, index) => (
          <Card key={index} className="border-2 hover:border-blue-100 transition-all">
            <CardHeader>
              <div className="flex items-center space-x-3">
                {step.icon}
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </div>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {step.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                      {topic.name}
                    </h3>
                    <ul className="space-y-2">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <li key={subtopicIndex} className="text-gray-600 ml-6 list-disc">
                          {subtopic}
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

      {/* Tips Section */}
      <Card className="border-2 border-blue-100 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-blue-800">Pro Tips:</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Follow the steps in order - each builds upon the previous
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Practice problems from each topic before moving on
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Implement everything you learn - practice is key
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Revise concepts regularly and maintain a revision table
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapPage;