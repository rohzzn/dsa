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

type PlatformType = 'all' | 'leetcode' | 'codeforces' | 'codechef';

// For Codeforces JSON
interface CodeforcesContest {
  id: number;
  name: string;
  phase: string;           // "BEFORE", "CODING", "FINISHED"
  durationSeconds: number;
  startTimeSeconds: number;
}

// For LeetCode’s /contest/api/list
interface LeetCodeAPIResponse {
  currentTimestamp: number;  // in seconds
  contests: Array<{
    id: number;
    title: string;
    titleSlug: string;
    startTime: number;      // in seconds
    duration: number;       // in seconds
  }>;
}

// For CodeChef’s /api/list/contests/all
interface CodeChefAPIResponse {
  // Typically returns object with these keys:
  future_contests: Array<CodeChefContestItem>;
  present_contests: Array<CodeChefContestItem>;
  [key: string]: any;
}


interface CodeChefContestItem {
  contest_code: string;
  contest_name: string;
  contest_start_date_iso: string; // e.g. '2025-01-01T10:00:00+05:30'
  contest_end_date_iso: string;
  // many other fields, we only need a few
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

  // ========== Codeforces ==========
  const fetchCodeforces = async (): Promise<Contest[]> => {
    try {
      const response = await fetch('https://codeforces.com/api/contest.list');
      if (!response.ok) throw new Error('Codeforces API error');
      const data = await response.json();
      if (!data?.result) return [];

      // Filter to keep only BEFORE or CODING
      const rawCF = data.result.filter(
        (c: CodeforcesContest) => c.phase === 'BEFORE' || c.phase === 'CODING'
      );

      return rawCF.map((c: CodeforcesContest) => {
        const start = c.startTimeSeconds * 1000;
        const duration = c.durationSeconds;
        const end = start + duration * 1000;
        const now = Date.now();
        const status = now < start ? 'UPCOMING' : 'ONGOING';

        return {
          id: `cf-${c.id}`,
          platform: 'codeforces',
          name: c.name,
          startTime: new Date(start).toISOString(),
          endTime: new Date(end).toISOString(),
          duration,
          url: `https://codeforces.com/contest/${c.id}`,
          status,
        };
      });
    } catch (error) {
      console.error('Codeforces fetch error:', error);
      return [];
    }
  };

  // ========== LeetCode ==========
  const fetchLeetCode = async (): Promise<Contest[]> => {
    try {
      const response = await fetch('https://leetcode.com/contest/api/list');
      if (!response.ok) throw new Error('LeetCode API error');
      const data: LeetCodeAPIResponse = await response.json();
      if (!data?.contests) return [];

      const now = data.currentTimestamp; // seconds
      const res: Contest[] = [];
      for (const c of data.contests) {
        const st = c.startTime; // seconds
        const en = c.startTime + c.duration; // seconds
        if (en < now) {
          // Finished
          continue;
        }
        const status = now < st ? 'UPCOMING' : 'ONGOING';
        res.push({
          id: `lc-${c.id}`,
          platform: 'leetcode',
          name: c.title,
          startTime: new Date(st * 1000).toISOString(),
          endTime: new Date(en * 1000).toISOString(),
          duration: c.duration,
          url: `https://leetcode.com/contest/${c.titleSlug}`,
          status,
        });
      }
      return res;
    } catch (error) {
      console.error('LeetCode fetch error:', error);
      return [];
    }
  };

  // ========== CodeChef ==========
  const fetchCodeChef = async (): Promise<Contest[]> => {
    try {
      const response = await fetch(
        'https://www.codechef.com/api/list/contests/all?sort_by=STARTTIME&sorting_order=asc'
      );
      if (!response.ok) throw new Error('CodeChef API error');
      const data: CodeChefAPIResponse = await response.json();

      // We only want "future_contests" (upcoming) and "present_contests" (ongoing)
      const upcoming = data.future_contests || [];
      const ongoing = data.present_contests || [];
      const results: Contest[] = [];

      // Future => UPCOMING
      for (const c of upcoming) {
        // parse start/end times
        const start = Date.parse(c.contest_start_date_iso);
        const end = Date.parse(c.contest_end_date_iso);
        const now = Date.now();
        const durationSec = Math.floor((end - start) / 1000);
        if (end <= now) continue; // already ended

        results.push({
          id: `cc-${c.contest_code}`,
          platform: 'codechef',
          name: c.contest_name,
          startTime: new Date(start).toISOString(),
          endTime: new Date(end).toISOString(),
          duration: durationSec,
          url: `https://www.codechef.com/${c.contest_code}`,
          status: 'UPCOMING',
        });
      }

      // Present => ONGOING
      for (const c of ongoing) {
        const start = Date.parse(c.contest_start_date_iso);
        const end = Date.parse(c.contest_end_date_iso);
        const now = Date.now();
        if (end <= now) continue; // ended

        const durationSec = Math.floor((end - start) / 1000);
        results.push({
          id: `cc-${c.contest_code}`,
          platform: 'codechef',
          name: c.contest_name,
          startTime: new Date(start).toISOString(),
          endTime: new Date(end).toISOString(),
          duration: durationSec,
          url: `https://www.codechef.com/${c.contest_code}`,
          status: 'ONGOING',
        });
      }

      return results;
    } catch (error) {
      console.error('CodeChef fetch error:', error);
      return [];
    }
  };

  // --------------------------------
  // Main fetch for all contests
  // --------------------------------
  const fetchContests = async (): Promise<void> => {
    try {
      setLoading(true);
      const [codeforcesContests, leetcodeContests, codechefContests] = await Promise.all([
        fetchCodeforces(),
        fetchLeetCode(),
        fetchCodeChef(),
      ]);
      const all = [...codeforcesContests, ...leetcodeContests, ...codechefContests];
      all.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

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

      {/* Contest Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
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
