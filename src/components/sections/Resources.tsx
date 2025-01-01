import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, ExternalLink, Code, BookOpen, Video, Binary, Globe, School, Users } from 'lucide-react';

const dsaResources = [
  {
    category: 'Essential Books',
    items: [
      {
        title: 'Introduction to Algorithms (CLRS)',
        author: 'Cormen, Leiserson, Rivest, Stein',
        description: 'The definitive guide to algorithms, covering both theoretical foundations and practical implementations',
        url: 'https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition',
        tags: ['comprehensive', 'theoretical', 'academic']
      },
      {
        title: 'Algorithms by Sedgewick & Wayne',
        author: 'Robert Sedgewick, Kevin Wayne',
        description: 'Modern approach to algorithms with practical applications and Java implementations',
        url: 'https://algs4.cs.princeton.edu/home/',
        tags: ['practical', 'java']
      },
      {
        title: 'Competitive Programming Handbook',
        author: 'Antti Laaksonen',
        description: 'Free comprehensive guide for competitive programming',
        url: 'https://cses.fi/book/index.php',
        tags: ['competitive', 'free']
      },
      {
        title: 'Grokking Algorithms',
        author: 'Aditya Bhargava',
        description: 'Illustrated, beginner-friendly guide to algorithms',
        url: 'https://www.manning.com/books/grokking-algorithms',
        tags: ['beginners', 'illustrated']
      }
    ]
  },
  {
    category: 'Top Learning Platforms',
    items: [
      {
        title: "Striver's A2Z DSA Course",
        description: 'Comprehensive DSA course with structured learning path',
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
        tags: ['comprehensive', 'structured']
      },
      {
        title: 'NeetCode',
        description: 'Curated list of problems with video solutions',
        url: 'https://neetcode.io/',
        tags: ['practice', 'videos']
      },
      {
        title: 'MIT OpenCourseWare Algorithms',
        description: 'Complete algorithm course from MIT',
        url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
        tags: ['academic', 'free']
      }
    ]
  },
  {
    category: 'Practice Platforms',
    items: [
      {
        title: 'LeetCode',
        description: 'Premier platform for technical interview preparation',
        url: 'https://leetcode.com',
        tags: ['interviews', 'problems']
      },
      {
        title: 'CSES Problem Set',
        description: 'High-quality algorithmic problems',
        url: 'https://cses.fi/problemset/',
        tags: ['competitive', 'advanced']
      },
      {
        title: 'Codeforces',
        description: 'Competitive programming platform with regular contests',
        url: 'https://codeforces.com',
        tags: ['competitive', 'contests']
      },
      {
        title: 'AtCoder',
        description: 'High-quality algorithmic contests',
        url: 'https://atcoder.jp/',
        tags: ['competitive', 'contests']
      }
    ]
  },
  {
    category: 'Tools & Visualizers',
    items: [
      {
        title: 'VisuAlgo',
        description: 'Visualizing data structures and algorithms through animation',
        url: 'https://visualgo.net',
        tags: ['visualization', 'interactive']
      },
      {
        title: 'Algorithm Visualizer',
        description: 'Interactive visualization of algorithms from code',
        url: 'https://algorithm-visualizer.org/',
        tags: ['visualization', 'code']
      },
      {
        title: 'Big-O Cheat Sheet',
        description: 'Time & space complexity reference',
        url: 'https://www.bigocheatsheet.com/',
        tags: ['reference', 'complexity']
      }
    ]
  },
  {
    category: 'Video Content',
    items: [
      {
        title: 'Abdul Bari Algorithms',
        description: 'In-depth algorithm explanations',
        url: 'https://www.youtube.com/channel/UCZCFT11CWBi3MHNlGf019nw',
        tags: ['tutorials', 'theory']
      },
      {
        title: 'NeetCode YouTube',
        description: 'Problem solving approaches and patterns',
        url: 'https://www.youtube.com/c/NeetCode',
        tags: ['problems', 'patterns']
      },
      {
        title: 'MIT 6.006 Lectures',
        description: 'Complete MIT algorithm course recordings',
        url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
        tags: ['academic', 'comprehensive']
      }
    ]
  },
  {
    category: 'Reference Materials',
    items: [
      {
        title: 'CP-Algorithms',
        description: 'Comprehensive collection of competitive programming algorithms',
        url: 'https://cp-algorithms.com/',
        tags: ['competitive', 'advanced']
      },
      {
        title: 'CLRS Solutions',
        description: 'Community solutions to CLRS exercises',
        url: 'https://walkccc.github.io/CLRS/',
        tags: ['solutions', 'academic']
      },
      {
        title: 'GeeksforGeeks DSA',
        description: 'Extensive DSA article collection',
        url: 'https://www.geeksforgeeks.org/data-structures/',
        tags: ['tutorials', 'articles']
      }
    ]
  }
];

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Essential Books':
      return <BookOpen className="w-6 h-6 text-orange-500" />;
    case 'Top Learning Platforms':
      return <School className="w-6 h-6 text-purple-500" />;
    case 'Practice Platforms':
      return <Code className="w-6 h-6 text-green-500" />;
    case 'Tools & Visualizers':
      return <Binary className="w-6 h-6 text-blue-500" />;
    case 'Video Content':
      return <Video className="w-6 h-6 text-red-500" />;
    case 'Reference Materials':
      return <Globe className="w-6 h-6 text-teal-500" />;
    default:
      return <Users className="w-6 h-6 text-gray-500" />;
  }
};

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = dsaResources.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search DSA resources by name, author, or tag..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {filteredResources.map(({ category, items }) => (
          <div key={category} className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              {getCategoryIcon(category)}
              <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <Card key={idx} className="group hover:shadow-lg transition-all duration-300 border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    {item.author && (
                      <p className="text-sm text-gray-500">by {item.author}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <span>Access Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;