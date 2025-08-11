// src/components/sections/Contests.tsx

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Globe, Clock, Trophy, Loader2, RefreshCcw } from 'lucide-react';

// Interfaces
interface Contest {
  id: string;
  platform: PlatformType;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  url: string;
  status: 'UPCOMING' | 'ONGOING';
}

type PlatformType =
  | 'all'
  | 'leetcode'
  | 'codeforces'
  | 'codechef'
  | 'atcoder'
  | 'hackerrank'
  | 'hackerearth'
  | 'topcoder'
  | 'csacademy'
  | 'other';

// API response shape from our server aggregator
interface AllContestsApiResponse {
  contests: Contest[];
}

// Platform configs for styling
const platforms = {
  all: {
    name: 'All Platforms',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
  leetcode: {
    name: 'LeetCode',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  codeforces: {
    name: 'Codeforces',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  codechef: {
    name: 'CodeChef',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  atcoder: {
    name: 'AtCoder',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  hackerrank: {
    name: 'HackerRank',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  hackerearth: {
    name: 'HackerEarth',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  topcoder: {
    name: 'Topcoder',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  csacademy: {
    name: 'CSAcademy',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  other: {
    name: 'Other',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
};

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  platform: PlatformType;
}

const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, platform }) => (
  <Button
    onClick={onClick}
    variant="outline"
    className={`px-4 py-2 flex items-center justify-center rounded-md
                ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-200'
                }
                ${platforms[platform].color}`}
  >
    <Trophy className="w-4 h-4 mr-2" />
    <span className="text-sm font-medium">{platforms[platform].name}</span>
  </Button>
);

interface ContestCardProps {
  contest: Contest;
  addToCalendar: (contest: Contest) => void;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, addToCalendar }) => {
  const platform = platforms[contest.platform];

  return (
    <Card
      className={`${platform?.bgColor || 'bg-gray-50'} border-2 ${
        platform?.borderColor || 'border-gray-200'
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className={`w-6 h-6 ${platform?.color || 'text-gray-600'}`} />
            <CardTitle className="text-lg">{contest.name}</CardTitle>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              platform?.color || 'text-gray-600'
            } bg-white`}
          >
            {platform?.name || 'Other'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{formatDuration(contest.duration)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {new Date(contest.startTime).toLocaleString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short',
                })}
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => window.open(contest.url, '_blank')} className="flex-1">
              <Globe className="w-4 h-4 mr-2" />
              View Contest
            </Button>
            <Button onClick={() => addToCalendar(contest)} variant="outline" className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ------------------------------
// Time/Duration helpers
// ------------------------------
function formatDuration(seconds: number): string {
  if (seconds <= 0) return '—';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0
    ? `${hours} hours${minutes > 0 ? ` ${minutes} minutes` : ''}`
    : `${minutes} minutes`;
}

// ------------------------------
// Main component
// ------------------------------
const ContestsPage: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Single server-side aggregator fetch
  const fetchAllContests = async (): Promise<Contest[]> => {
    try {
      const response = await fetch('/api/contests/all');
      if (!response.ok) throw new Error('Aggregator API error');
      const data: AllContestsApiResponse = await response.json();
      if (!data?.contests) return [];
      return data.contests as Contest[];
    } catch (error) {
      console.error('All contests fetch error:', error);
      return [];
    }
  };

  // --------------------------------
  // Main fetch for all contests
  // --------------------------------
  const fetchContests = async (): Promise<void> => {
    try {
      setLoading(true);
      const all = await fetchAllContests();
      setContests(all);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Fetch error:', err);
      // Optionally show a UI error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
    const interval = setInterval(fetchContests, 5 * 60_000); // auto-refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const addToCalendar = (contest: Contest) => {
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${
      encodeURIComponent(`${platforms[contest.platform].name} Contest: ${contest.name}`)
    }&dates=${
      startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }/${
      endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }&details=${encodeURIComponent(
      `${platforms[contest.platform].name} Contest\nURL: ${contest.url}`
    )}`;

    window.open(googleCalendarUrl, '_blank');
  };

  // filter by selectedPlatform
  const filteredContests =
    selectedPlatform === 'all'
      ? contests
      : contests.filter((c) => c.platform === selectedPlatform);

  const ongoing = filteredContests.filter((c) => c.status === 'ONGOING');
  const upcoming = filteredContests.filter((c) => c.status === 'UPCOMING');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading upcoming contests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Upcoming Contests</h1>
        <p className="text-lg opacity-90">Track competitive programming contests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contests</p>
              <p className="text-2xl font-bold text-green-600">{contests.length}</p>
            </div>
            <Trophy className="w-8 h-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Contest</p>
              {contests.length > 0 ? (
                <p className="text-md font-bold text-blue-600">
                  {contests[0].name.length > 20
                    ? contests[0].name.slice(0, 20) + '...'
                    : contests[0].name}
                </p>
              ) : (
                <p className="text-md font-bold text-blue-600">N/A</p>
              )}
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-md font-bold text-purple-600">
                {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <RefreshCcw
              className="w-8 h-8 text-purple-500 cursor-pointer hover:rotate-180 transition-transform duration-500"
              onClick={fetchContests}
            />
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(platforms) as PlatformType[]).map((p) => (
          <FilterButton
            key={p}
            platform={p}
            isActive={selectedPlatform === p}
            onClick={() => setSelectedPlatform(p)}
          />
        ))}
      </div>

      {/* Ongoing */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ongoing</h2>
        <div className="grid grid-cols-1 gap-6">
          {ongoing.length > 0 ? (
            ongoing.map((contest) => (
              <ContestCard key={contest.id} contest={contest} addToCalendar={addToCalendar} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No ongoing contests for this platform.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming</h2>
        <div className="grid grid-cols-1 gap-6">
          {upcoming.length > 0 ? (
            upcoming.map((contest) => (
              <ContestCard key={contest.id} contest={contest} addToCalendar={addToCalendar} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No upcoming contests for this platform.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestsPage;
