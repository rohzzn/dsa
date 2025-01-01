// src/types/resource.ts

export interface Resource {
  type:
    | 'Book'
    | 'Tool'
    | 'Course'
    | 'Interactive'
    | 'Cheatsheet'
    | 'Community'
  title: string
  description: string
  url: string
}
