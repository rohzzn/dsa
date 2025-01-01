// src/pages/learn/index.tsx
import { NextPage } from 'next';
import LearningPage from '@/components/sections/Learning';

const LearnPage: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <LearningPage />
    </div>
  );
};

export default LearnPage;