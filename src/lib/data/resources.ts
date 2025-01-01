// src/lib/data/resources.ts

import { Resource } from '@/types/resource'

export const resourcesData: Resource[] = [
  // Books
  {
    type: 'Book',
    title: 'Introduction to Algorithms',
    description:
      'A comprehensive textbook covering a wide range of algorithms in depth.',
    url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
  },
  {
    type: 'Book',
    title: 'Data Structures and Algorithms in Java',
    description:
      'An in-depth look at data structures and algorithms using Java.',
    url: 'https://www.wiley.com/en-us/Data+Structures+and+Algorithms+in+Java-p-9781118771334',
  },
  {
    type: 'Book',
    title: 'Cracking the Coding Interview',
    description:
      'A practical guide to preparing for technical interviews with coding problems and solutions.',
    url: 'https://www.crackingthecodinginterview.com/',
  },
  {
    type: 'Book',
    title: 'The Algorithm Design Manual',
    description:
      'A comprehensive guide to designing and analyzing algorithms.',
    url: 'https://www.algorist.com/',
  },
  {
    type: 'Book',
    title: 'Algorithms',
    description:
      'A textbook that provides a comprehensive introduction to the modern study of computer algorithms.',
    url: 'https://www.cs.princeton.edu/~rs/AlgsDS.pdf',
  },
  {
    type: 'Book',
    title: 'Grokking Algorithms',
    description:
      'An illustrated guide for programmers and other curious people.',
    url: 'https://www.manning.com/books/grokking-algorithms',
  },
  {
    type: 'Book',
    title: 'Competitive Programming',
    description:
      'A book focused on algorithms and problem-solving techniques for competitive programming.',
    url: 'https://cpbook.net/',
  },
  // Cheatsheets
  {
    type: 'Cheatsheet',
    title: 'Big-O Cheat Sheet',
    description:
      'Quick reference for time and space complexities of common algorithms.',
    url: 'https://www.bigocheatsheet.com/',
  },
  {
    type: 'Cheatsheet',
    title: 'JavaScript Algorithms Cheatsheet',
    description:
      'A handy cheatsheet for common algorithms implemented in JavaScript.',
    url: 'https://github.com/trekhleb/javascript-algorithms/blob/master/README.md',
  },
  {
    type: 'Cheatsheet',
    title: 'Python Data Structures Cheatsheet',
    description:
      'A quick reference guide for data structures implemented in Python.',
    url: 'https://github.com/python-engineer/python-data-structures/blob/main/README.md',
  },
  // Tools
  {
    type: 'Tool',
    title: 'LeetCode',
    description:
      'Platform for practicing coding problems and preparing for technical interviews.',
    url: 'https://leetcode.com/',
  },
  {
    type: 'Tool',
    title: 'GeeksforGeeks',
    description:
      'Comprehensive resource for learning programming, algorithms, and data structures.',
    url: 'https://www.geeksforgeeks.org/',
  },
  {
    type: 'Tool',
    title: 'Visualgo',
    description:
      'Visualizations of data structures and algorithms to aid understanding.',
    url: 'https://visualgo.net/en',
  },
  {
    type: 'Tool',
    title: 'AlgoExpert',
    description:
      'Platform offering curated coding interview questions and solutions.',
    url: 'https://www.algoexpert.io/',
  },
  {
    type: 'Tool',
    title: 'Coderbyte',
    description:
      'Platform with coding challenges and interview prep resources.',
    url: 'https://coderbyte.com/',
  },
  {
    type: 'Tool',
    title: 'InterviewBit',
    description:
      'Platform offering coding problems and interview preparation resources.',
    url: 'https://www.interviewbit.com/',
  },
  {
    type: 'Tool',
    title: 'SPOJ',
    description:
      'Online judge system with a vast collection of coding problems.',
    url: 'https://www.spoj.com/',
  },
  // Websites
  {
    type: 'Website',
    title: 'HackerRank',
    description:
      'Competitive programming platform to practice coding and prepare for interviews.',
    url: 'https://www.hackerrank.com/',
  },
  {
    type: 'Website',
    title: 'CodeSignal',
    description:
      'Platform for coding challenges and interview preparation.',
    url: 'https://codesignal.com/',
  },
  {
    type: 'Website',
    title: 'TopCoder',
    description:
      'Competitive programming contests and practice problems.',
    url: 'https://www.topcoder.com/',
  },
  {
    type: 'Website',
    title: 'Project Euler',
    description:
      'Series of challenging mathematical/computer programming problems.',
    url: 'https://projecteuler.net/',
  },
  {
    type: 'Website',
    title: 'FreeCodeCamp',
    description:
      'Comprehensive tutorials and interactive coding lessons on algorithms and data structures.',
    url: 'https://www.freecodecamp.org/',
  },
  // Courses
  {
    type: 'Course',
    title:
      'Algorithms, Part I & II by Princeton University (Coursera)',
    description:
      'Courses covering essential information about algorithms and data structures.',
    url: 'https://www.coursera.org/specializations/algorithms',
  },
  {
    type: 'Course',
    title: 'Data Structures and Algorithms Nanodegree (Udacity)',
    description:
      'Comprehensive program covering data structures, algorithms, and problem-solving.',
    url: 'https://www.udacity.com/course/data-structures-and-algorithms-nanodegree--nd256',
  },
  {
    type: 'Course',
    title:
      'Data Structures and Algorithms Specialization (Coursera)',
    description:
      'A series of courses that cover algorithmic techniques for solving various computational problems.',
    url: 'https://www.coursera.org/specializations/data-structures-algorithms',
  },
  {
    type: 'Course',
    title: 'Data Structures and Algorithms (edX)',
    description:
      'Courses from various universities covering DSA topics.',
    url: 'https://www.edx.org/learn/data-structures',
  },
  // Interactive Platforms
  {
    type: 'Interactive',
    title: 'AlgoVisualizer',
    description:
      'Interactive visualizations for understanding how different algorithms work.',
    url: 'https://algovisualizer.com/',
  },
  {
    type: 'Interactive',
    title: 'Codewars',
    description:
      'Platform to train coding skills through challenges and kata.',
    url: 'https://www.codewars.com/',
  },
  // Community
  {
    type: 'Community',
    title: 'Codeforces',
    description:
      'Competitive programming community with regular contests and problem-solving.',
    url: 'https://codeforces.com/',
  },
  {
    type: 'Community',
    title: 'CodeChef',
    description:
      'Platform offering coding competitions and a community for programmers.',
    url: 'https://www.codechef.com/',
  },
  {
    type: 'Community',
    title: 'Reddit - r/learnprogramming',
    description:
      'A subreddit for learning programming, sharing resources, and getting help.',
    url: 'https://www.reddit.com/r/learnprogramming/',
  },
  // Additional Resources
  // Add more resources as needed following the same structure
]
