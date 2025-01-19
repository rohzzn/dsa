// src/pages/contests/index.tsx
import { NextPage } from 'next';
import ContestsPage from '@/components/sections/Contests';

const Contests: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ContestsPage />
    </div>
  );
};

export default Contests;
