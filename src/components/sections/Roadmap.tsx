import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckSquare, Code, Brain, Zap, Target, Network, Laptop, Database, Layers, Timer,  Book, Youtube } from 'lucide-react';

const roadmapData = {
  steps: [
    {
      title: "Step 0: Prerequisites",
      icon: <Laptop className="w-6 h-6 text-gray-600" />,
      description: "Setup your coding environment and basics",
      difficulty: "Beginner",
      timeNeeded: "1 week",
      topics: [
        {
          name: "Environment Setup",
          resources: [
            { name: "VS Code Setup", type: "video", link: "https://www.youtube.com/watch?v=MJFpqzFCMpE" },
            { name: "Git Basics", type: "video", link: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
          ],
          problems: [
            { name: "Hello World", difficulty: "Easy", link: "https://leetcode.com/problems/concatenation-of-array/" },
            { name: "Basic I/O", difficulty: "Easy", link: "https://leetcode.com/problems/running-sum-of-1d-array/" }
          ]
        },
        {
          name: "Language Basics",
          resources: [
            { name: "Python for DSA", type: "video", link: "https://www.youtube.com/watch?v=kQDxmjfkIKY" },
            { name: "Java for DSA", type: "video", link: "https://www.youtube.com/watch?v=rZ41y93P2Qo" }
          ],
          problems: [
            { name: "String Methods", difficulty: "Easy", link: "https://leetcode.com/problems/defanging-an-ip-address/" },
            { name: "Array Methods", difficulty: "Easy", link: "https://leetcode.com/problems/shuffle-the-array/" }
          ]
        }
      ]
    },
    {
      title: "Step 1: Programming Basics",
      icon: <Code className="w-6 h-6 text-blue-600" />,
      description: "Build your foundation with these essential concepts",
      difficulty: "Beginner",
      timeNeeded: "2-3 weeks",
      topics: [
        {
          name: "Time & Space Complexity",
          resources: [
            { name: "Big-O Notation Guide", type: "video", link: "https://www.youtube.com/watch?v=D6xkbGLQesk" },
            { name: "14 Patterns", type: "article", link: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns" },
            { name: "Complexity Quiz", type: "practice", link: "https://leetcode.com/explore/learn/card/recursion-i/" }
          ],
          problems: [
            { name: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
            { name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" }
          ]
        },
        {
          name: "Arrays & Basic Math",
          resources: [
            { name: "Array Techniques", type: "video", link: "https://www.youtube.com/watch?v=EnC8kmHh5Mc" }
          ],
          problems: [
            { name: "Plus One", difficulty: "Easy", link: "https://leetcode.com/problems/plus-one/" },
            { name: "Maximum Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" }
          ]
        }
      ]
    },
    {
      title: "Step 2: Basic Data Structures",
      icon: <Database className="w-6 h-6 text-purple-600" />,
      description: "Master the fundamental building blocks",
      difficulty: "Beginner-Intermediate",
      timeNeeded: "3-4 weeks",
      topics: [
        {
          name: "Arrays & Strings",
          resources: [
            { name: "Sliding Window", type: "video", link: "https://www.youtube.com/watch?v=MK-NZ4hN7rs" },
            { name: "Two Pointers", type: "video", link: "https://www.youtube.com/watch?v=IJn--XoiLno" }
          ],
          problems: [
            { name: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
            { name: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
            { name: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" }
          ]
        },
        {
          name: "Hashing",
          resources: [
            { name: "Hash Table Guide", type: "video", link: "https://www.youtube.com/watch?v=jalSiaIi8j4" }
          ],
          problems: [
            { name: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },
            { name: "Top K Frequent", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/" }
          ]
        }
      ]
    },
    {
      title: "Step 3: Core Data Structures",
      icon: <Layers className="w-6 h-6 text-indigo-600" />,
      description: "Learn essential data structures used in interviews",
      difficulty: "Intermediate",
      timeNeeded: "4-5 weeks",
      topics: [
        {
          name: "Linked Lists",
          resources: [
            { name: "Linked List Patterns", type: "video", link: "https://www.youtube.com/watch?v=0zM8n8bHGdQ" }
          ],
          problems: [
            { name: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" },
            { name: "Middle of Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/middle-of-the-linked-list/" },
            { name: "LRU Cache", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/" }
          ]
        },
        {
          name: "Trees",
          resources: [
            { name: "Tree Traversal Guide", type: "video", link: "https://www.youtube.com/watch?v=fAAZixBzIAI" }
          ],
          problems: [
            { name: "Maximum Depth", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
            { name: "Level Order", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" }
          ]
        }
      ]
    },
    {
      title: "Step 4: Advanced Patterns",
      icon: <Brain className="w-6 h-6 text-green-600" />,
      description: "Master common algorithmic patterns",
      difficulty: "Intermediate-Advanced",
      timeNeeded: "4-6 weeks",
      topics: [
        {
          name: "Dynamic Programming",
          resources: [
            { name: "DP Patterns", type: "video", link: "https://www.youtube.com/watch?v=oBt53YbR9Kk" }
          ],
          problems: [
            { name: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" },
            { name: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/" },
            { name: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/" }
          ]
        },
        {
          name: "Graphs",
          resources: [
            { name: "Graph Algorithms", type: "video", link: "https://www.youtube.com/watch?v=09_LlHjoEiY" }
          ],
          problems: [
            { name: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
            { name: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" }
          ]
        }
      ]
    },
    {
      title: "Step 5: Advanced Data Structures",
      icon: <Network className="w-6 h-6 text-pink-600" />,
      description: "Master complex data structures used in advanced problems",
      difficulty: "Advanced",
      timeNeeded: "4-5 weeks",
      topics: [
        {
          name: "Advanced Trees",
          resources: [
            { name: "Red Black Trees", type: "video", link: "https://www.youtube.com/watch?v=qvZGUFHWChY" },
            { name: "Segment Trees", type: "video", link: "https://www.youtube.com/watch?v=ZBHKZF5w4YU" }
          ],
          problems: [
            { name: "Range Sum Query", difficulty: "Medium", link: "https://leetcode.com/problems/range-sum-query-mutable/" },
            { name: "Binary Lifting", difficulty: "Hard", link: "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/" }
          ]
        },
        {
          name: "Advanced Heaps",
          resources: [
            { name: "Priority Queue Patterns", type: "video", link: "https://www.youtube.com/watch?v=hgFj1tOE_Ys" }
          ],
          problems: [
            { name: "Merge K Lists", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
            { name: "Find Median", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/" }
          ]
        }
      ]
    },
    {
      title: "Step 6: Advanced Algorithms",
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      description: "Learn complex algorithmic techniques",
      difficulty: "Advanced",
      timeNeeded: "5-6 weeks",
      topics: [
        {
          name: "String Algorithms",
          resources: [
            { name: "KMP Algorithm", type: "video", link: "https://www.youtube.com/watch?v=JoF0Z7nVSrA" },
            { name: "Rabin Karp", type: "video", link: "https://www.youtube.com/watch?v=qQ8vS2btsxI" }
          ],
          problems: [
            { name: "String Matching", difficulty: "Medium", link: "https://leetcode.com/problems/implement-strstr/" },
            { name: "Longest Palindrome", difficulty: "Hard", link: "https://leetcode.com/problems/longest-palindromic-substring/" }
          ]
        },
        {
          name: "Advanced Graph",
          resources: [
            { name: "Network Flow", type: "video", link: "https://www.youtube.com/watch?v=oHy3ddI9X3o" }
          ],
          problems: [
            { name: "Critical Connections", difficulty: "Hard", link: "https://leetcode.com/problems/critical-connections-in-a-network/" },
            { name: "Bus Routes", difficulty: "Hard", link: "https://leetcode.com/problems/bus-routes/" }
          ]
        }
      ]
    },
    {
      title: "Step 7: Dynamic Programming Advanced",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      description: "Master advanced DP patterns and techniques",
      difficulty: "Advanced",
      timeNeeded: "6-8 weeks",
      topics: [
        {
          name: "DP Patterns",
          resources: [
            { name: "MCM Pattern", type: "video", link: "https://www.youtube.com/watch?v=vRVfmbCFW7Y" },
            { name: "Bitmask DP", type: "video", link: "https://www.youtube.com/watch?v=jqJ5s077OKo" }
          ],
          problems: [
            { name: "Burst Balloons", difficulty: "Hard", link: "https://leetcode.com/problems/burst-balloons/" },
            { name: "Regular Expression", difficulty: "Hard", link: "https://leetcode.com/problems/regular-expression-matching/" }
          ]
        },
        {
          name: "Advanced DP",
          resources: [
            { name: "Tree DP", type: "video", link: "https://www.youtube.com/watch?v=QG0hE0R_ng4" }
          ],
          problems: [
            { name: "Longest Increasing Path", difficulty: "Hard", link: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
            { name: "Cherry Pickup II", difficulty: "Hard", link: "https://leetcode.com/problems/cherry-pickup-ii/" }
          ]
        }
      ]
    },
    {
      title: "Step 8: Interview Preparation",
      icon: <Target className="w-6 h-6 text-green-600" />,
      description: "Final preparation and interview patterns",
      difficulty: "Mixed",
      timeNeeded: "4-6 weeks",
      topics: [
        {
          name: "System Design",
          resources: [
            { name: "System Design Primer", type: "article", link: "https://github.com/donnemartin/system-design-primer" },
            { name: "Design Patterns", type: "video", link: "https://www.youtube.com/watch?v=v9ejT8FO-7I" }
          ],
          problems: [
            { name: "LRU Cache", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/" },
            { name: "Design Twitter", difficulty: "Hard", link: "https://leetcode.com/problems/design-twitter/" }
          ]
        },
        {
          name: "Mock Interviews",
          resources: [
            { name: "Interview Tips", type: "video", link: "https://www.youtube.com/watch?v=yi0OxmUX5sQ" }
          ],
          problems: [
            { name: "Common Problems", difficulty: "Mixed", link: "https://leetcode.com/problem-list/top-interview-questions/" },
            { name: "Company Questions", difficulty: "Mixed", link: "https://leetcode.com/problemset/all/?listId=wpwgkgt" }
          ]
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
        <h1 className="text-3xl font-bold mb-4">Complete DSA Roadmap</h1>
        <p className="text-lg opacity-90">
          A practical guide with curated problems and resources
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Timer className="w-5 h-5" />, text: "3-4 months commitment" },
          { icon: <Target className="w-5 h-5" />, text: "75+ handpicked problems" },
          { icon: <Youtube className="w-5 h-5" />, text: "Curated video resources" },
          { icon: <Book className="w-5 h-5" />, text: "Progressive difficulty" }
        ].map((item, i) => (
          <Card key={i} className="bg-gray-50">
            <CardContent className="p-4 flex items-center space-x-2">
              <div className="text-blue-600">{item.icon}</div>
              <span className="text-sm font-medium">{item.text}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Steps Section */}
      <div className="space-y-6">
        {roadmapData.steps.map((step, index) => (
          <Card key={index} className="border-2 hover:border-blue-100 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {step.icon}
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-sm">
                  <span className="text-purple-600 font-medium">{step.difficulty}</span>
                  <span className="text-gray-500">{step.timeNeeded}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {step.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                      {topic.name}
                    </h3>
                    
                    {/* Resources */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Learning Resources:</h4>
                      {topic.resources.map((resource, idx) => (
                        <a key={idx} href={resource.link} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                          {resource.type === 'video' && <Youtube className="w-4 h-4" />}
                          {resource.type === 'article' && <Book className="w-4 h-4" />}
                          {resource.type === 'practice' && <Target className="w-4 h-4" />}
                          <span className="hover:underline">{resource.name}</span>
                        </a>
                      ))}
                    </div>

                    {/* Problems */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Practice Problems:</h4>
                      {topic.problems.map((problem, idx) => (
                        <a key={idx} href={problem.link} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600">
                          <span className="hover:underline">{problem.name}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium
                            ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'}`}>
                            {problem.difficulty}
                          </span>
                        </a>
                      ))}
                    </div>
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
          <h3 className="font-semibold text-lg mb-4 text-blue-800">Study Tips:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Solve problems without looking at solutions first</span>
              </li>
              <li className="flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Watch concept videos before starting a new topic</span>
              </li>
            </ul>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Review solutions even for correctly solved problems</span>
              </li>
              <li className="flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Practice similar problems to reinforce patterns</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapPage;