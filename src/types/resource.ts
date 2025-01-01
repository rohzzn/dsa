// src/types/resource.ts

export interface Resource {
    type:
      | 'Book'
      | 'Tool'
      | 'Website'
      | 'Course'
      | 'Interactive'
      | 'Cheatsheet'
      | 'Community'
    title: string
    description: string
    url: string
  }
  