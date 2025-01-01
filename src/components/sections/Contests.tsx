// pages/contests.tsx (or wherever your ContestsPage component resides)

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

interface CodeforcesContest {
  id: number;
  name: string;
  type: string;
  phase: string;
  durationSeconds: number;
  startTimeSeconds: number;
}

interface LeetCodeContest {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  url: string;
  status: 'UPCOMING' | 'ONGOING';
}

type PlatformType = 'all' | 'leetcode' | 'codeforces';

interface Platform {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  platform: PlatformType;
}

interface ContestCardProps {
  contest: Contest;
  addToCalendar: (contest: Contest) => void;
}

// Platform configurations
const platforms: Record<PlatformType, Platform> = {
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
};

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

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0
    ? `${hours} hours${minutes > 0 ? ` ${minutes} minutes` : ''}`
    : `${minutes} minutes`;
};

const ContestsPage: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchContests = async (): Promise<void> => {
    try {
      setLoading(true);

      // Fetch Codeforces Contests
      const fetchCodeforces = async () => {
        try {
          const response = await fetch('https://codeforces.com/api/contest.list');
          if (!response.ok) throw new Error('Codeforces API error');
          const data = await response.json();
          return data.result
            .filter((contest: CodeforcesContest) => contest.phase === 'BEFORE')
            .map((contest: CodeforcesContest) => ({
              id: `cf-${contest.id}`,
              platform: 'codeforces' as PlatformType,
              name: contest.name,
              startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
              endTime: new Date(
                (contest.startTimeSeconds + contest.durationSeconds) * 1000
              ).toISOString(),
              duration: contest.durationSeconds,
              url: `https://codeforces.com/contest/${contest.id}`,
              status: 'UPCOMING' as const,
            }));
        } catch (error) {
          console.error('Codeforces fetch error:', error);
          return [];
        }
      };

      // Fetch LeetCode Contests using the Next.js API route
      const fetchLeetCode = async () => {
        try {
          const response = await fetch('/api/leetcode-contests');
          if (!response.ok) throw new Error('LeetCode API error');

          const leetcodeContests: LeetCodeContest[] = await response.json();

          return leetcodeContests.map(contest => ({
            id: contest.id,
            platform: 'leetcode' as PlatformType,
            name: contest.name,
            startTime: contest.startTime,
            endTime: contest.endTime,
            duration: contest.duration,
            url: contest.url,
            status: contest.status,
          }));
        } catch (error) {
          console.error('LeetCode fetch error:', error);
          return [];
        }
      };

      // Fetch all contests in parallel
      const [codeforcesContests, leetcodeContests] = await Promise.all([
        fetchCodeforces(),
        fetchLeetCode(),
      ]);

      // Combine and sort all contests
      const allContests = [...codeforcesContests, ...leetcodeContests].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

      setContests(allContests);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Fetch error:', err);
      // Optionally, you can notify the user about the fetch failure here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
    const interval = setInterval(fetchContests, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const addToCalendar = (contest: Contest): void => {
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${
      encodeURIComponent(`${platforms[contest.platform].name} Contest: ${contest.name}`)
    }&dates=${
      startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }/${
      endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }&details=${
      encodeURIComponent(`${platforms[contest.platform].name} Contest\nURL: ${contest.url}`)
    }`;

    window.open(googleCalendarUrl, '_blank');
  };

  const filteredContests =
    selectedPlatform === 'all'
      ? contests
      : contests.filter(contest => contest.platform === selectedPlatform);

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Upcoming Contests</h1>
        <p className="text-lg opacity-90">Track competitive programming contests</p>
      </div>

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
              <p className="text-md font-bold text-blue-600">
                {contests[0]?.name.length > 20
                  ? `${contests[0].name.slice(0, 20)}...`
                  : contests[0]?.name}
              </p>
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
              onClick={() => fetchContests()}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(platforms) as PlatformType[]).map(platform => (
          <FilterButton
            key={platform}
            platform={platform}
            isActive={selectedPlatform === platform}
            onClick={() => setSelectedPlatform(platform)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map(contest => (
            <ContestCard key={contest.id} contest={contest} addToCalendar={addToCalendar} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No upcoming contests found for this platform.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestsPage;
