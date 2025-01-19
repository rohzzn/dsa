// src/pages/hackathons/index.tsx
import { NextPage } from 'next';
import Hackathons from '@/components/sections/Hackathons';

const HackathonsPage: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hackathons />
    </div>
  );
};

export default HackathonsPage;
