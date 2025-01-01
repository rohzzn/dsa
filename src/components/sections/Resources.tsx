import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code,  Users, BookOpen, Terminal, Cpu, 
         Briefcase, ChevronRight, ArrowUpRight } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  features: string[];
  url: string;
}

interface ResourceCardProps {
  resource: Resource;
}

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CATEGORIES = {
  practice: 'Practice Platforms',
  coding: 'Coding Tools',
  visualization: 'Visualizers',
  interview: 'Interview Prep',
  cheatsheets: 'Cheatsheets',
  communities: 'Communities'
} as const;

type CategoryType = keyof typeof CATEGORIES;

const resourcesData: Record<CategoryType, Resource[]> = {
  practice: [
    {
      title: "LeetCode",
      description: "The most popular platform for coding interview preparation",
      features: ["2500+ coding problems", "Company-specific questions", "Weekly contests", "Discussion forums"],
      url: "https://leetcode.com"
    },
    {
      title: "CodeForces",
      description: "Competitive programming platform with regular contests",
      features: ["High quality problems", "Regular competitions", "Educational rounds", "Problem ratings"],
      url: "https://codeforces.com"
    },
    {
      title: "AtCoder",
      description: "Japanese competitive programming platform",
      features: ["High-quality contests", "Beginner friendly", "Regular competitions", "Educational content"],
      url: "https://atcoder.jp"
    },
    {
      title: "CSES Problem Set",
      description: "Comprehensive problem set for learning algorithms",
      features: ["300+ algorithmic problems", "Sorted by topic", "Test cases provided", "Solutions available"],
      url: "https://cses.fi/problemset/"
    },
    {
      title: "CodeChef",
      description: "Competitive programming platform with long and short contests",
      features: ["Multiple contest formats", "Practice problems", "Discussion forum", "DSA learning resources"],
      url: "https://www.codechef.com"
    },
    {
      title: "HackerRank",
      description: "Platform focusing on both competitive programming and interview prep",
      features: ["Company contests", "Skill certification", "Interview preparation kit", "Problem solving"],
      url: "https://www.hackerrank.com"
    }
  ],
  visualization: [
    {
      title: "VisuAlgo",
      description: "Visualize data structures and algorithms through animation",
      features: ["Interactive animations", "Step-by-step execution", "Multiple languages", "Practice problems"],
      url: "https://visualgo.net"
    },
    {
      title: "Algorithm Visualizer",
      description: "Interactive platform for visualizing algorithms",
      features: ["Multiple algorithms", "Code visualization", "Custom input", "Speed control"],
      url: "https://algorithm-visualizer.org/"
    },
    {
      title: "Data Structure Visualizations",
      description: "University of San Francisco's DS visualizations",
      features: ["Clear animations", "Educational focus", "Multiple data structures", "Interactive demos"],
      url: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html"
    },
    {
      title: "Sorting.at",
      description: "Sorting algorithm visualizations",
      features: ["Compare algorithms", "Speed control", "Custom input", "Multiple sorting methods"],
      url: "https://sorting.at/"
    }
  ],
  coding: [
    {
      title: "VS Code",
      description: "Popular code editor with excellent extensions",
      features: ["Multiple extensions", "Git integration", "Debugging tools", "Live Share"],
      url: "https://code.visualstudio.com"
    },
    {
      title: "repl.it",
      description: "Online coding environment with support for 50+ languages",
      features: ["Browser-based IDE", "Real-time collaboration", "GitHub integration", "Hosting capabilities"],
      url: "https://replit.com"
    },
    {
      title: "CodeSandbox",
      description: "Online code editor for web development",
      features: ["Instant setup", "Live collaboration", "GitHub integration", "Template support"],
      url: "https://codesandbox.io"
    },
    {
      title: "Sublime Text",
      description: "Fast and lightweight text editor",
      features: ["Quick startup", "Multiple cursors", "Command palette", "Package ecosystem"],
      url: "https://www.sublimetext.com"
    }
  ],
  interview: [
    {
      title: "Pramp",
      description: "Practice mock interviews with peers",
      features: ["Free mock interviews", "Peer matching", "Interview feedback", "Real questions"],
      url: "https://www.pramp.com"
    },
    {
      title: "interviewing.io",
      description: "Anonymous technical interviews with engineers",
      features: ["Real interviews", "Anonymous practice", "Interview recordings", "Expert feedback"],
      url: "https://interviewing.io"
    },
    {
      title: "AlgoExpert",
      description: "Platform for coding interview preparation",
      features: ["160+ hand-picked questions", "Video explanations", "Clean interface", "Multiple languages"],
      url: "https://www.algoexpert.io"
    },
    {
      title: "ByteByByte",
      description: "Coding interview preparation resources",
      features: ["Interview questions", "System design", "Video explanations", "Practice problems"],
      url: "https://www.bytebybyte.com"
    }
  ],
  cheatsheets: [
    {
      title: "Big-O Cheat Sheet",
      description: "Comprehensive guide to time and space complexities",
      features: ["Algorithm complexities", "Data structure operations", "Visual references", "Common examples"],
      url: "https://www.bigocheatsheet.com"
    },
    {
      title: "Tech Interview Handbook",
      description: "Curated coding interview preparation materials",
      features: ["Interview cheatsheets", "Study plans", "Best practices", "Common patterns"],
      url: "https://www.techinterviewhandbook.org"
    },
    {
      title: "Python CheatSheet",
      description: "Comprehensive Python programming reference",
      features: ["Language basics", "Data structures", "Advanced concepts", "Code examples"],
      url: "https://www.pythoncheatsheet.org"
    },
    {
      title: "JavaScript Algorithms",
      description: "Collection of JavaScript implementations",
      features: ["Algorithm implementations", "Data structures", "Explanations", "Time complexities"],
      url: "https://github.com/trekhleb/javascript-algorithms"
    },
    {
      title: "CP Algorithms",
      description: "Competitive programming algorithms wiki",
      features: ["Detailed explanations", "Implementation guide", "Mathematics", "Data structures"],
      url: "https://cp-algorithms.com"
    }
  ],
  communities: [
    {
      title: "LeetCode Discuss",
      description: "Active community for problem discussion and solutions",
      features: ["Problem discussions", "Interview experiences", "Pattern sharing", "Company insights"],
      url: "https://leetcode.com/discuss"
    },
    {
      title: "r/cscareerquestions",
      description: "Reddit community for CS career discussions",
      features: ["Interview experiences", "Career advice", "Resume reviews", "Industry insights"],
      url: "https://reddit.com/r/cscareerquestions"
    },
    {
      title: "Dev.to",
      description: "Community of developers sharing knowledge",
      features: ["Technical articles", "Career advice", "Programming tutorials", "Community support"],
      url: "https://dev.to"
    },
    {
      title: "Stack Overflow",
      description: "Q&A community for programmers",
      features: ["Problem solving", "Code reviews", "Best practices", "Expert answers"],
      url: "https://stackoverflow.com"
    }
  ]
};
const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, children, icon }) => (
  <Button
    onClick={onClick}
    variant={isActive ? "default" : "outline"}
    className="w-full justify-start"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Button>
);

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => (
  <Card className="hover:border-blue-200 transition-all h-full">
    <CardHeader>
      <CardTitle className="text-lg">{resource.title}</CardTitle>
      <p className="text-gray-600 mt-1">{resource.description}</p>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <ul className="space-y-2">
          {resource.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-600">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={() => window.open(resource.url, '_blank')}
          className="w-full mt-4"
        >
          Visit Resource <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('practice');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Resources</h1>
        <p className="text-base sm:text-lg opacity-90">
          Curated collection of the best DSA learning resources
        </p>
      </div>

      {/* Mobile Category Select */}
      <div className="lg:hidden grid grid-cols-2 gap-2 px-4">
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <FilterButton
            key={key}
            isActive={activeCategory === key}
            onClick={() => setActiveCategory(key as CategoryType)}
            icon={getIconForCategory(key as CategoryType)}
          >
            {value}
          </FilterButton>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8 px-4 sm:px-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block space-y-2">
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <FilterButton
              key={key}
              isActive={activeCategory === key}
              onClick={() => setActiveCategory(key as CategoryType)}
              icon={getIconForCategory(key as CategoryType)}
            >
              {value}
            </FilterButton>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {resourcesData[activeCategory].map((resource, idx) => (
              <ResourceCard key={idx} resource={resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get icon for category
const getIconForCategory = (category: CategoryType): React.ReactNode => {
  const icons = {
    practice: <Code className="w-5 h-5" />,
    coding: <Terminal className="w-5 h-5" />,
    visualization: <Cpu className="w-5 h-5" />,
    interview: <Briefcase className="w-5 h-5" />,
    cheatsheets: <BookOpen className="w-5 h-5" />,
    communities: <Users className="w-5 h-5" />
  };
  return icons[category];
};

export default ResourcesPage;