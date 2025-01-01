import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Globe, Clock, Trophy, Loader2 } from 'lucide-react';

const platforms = {
  leetcode: {
    name: 'LeetCode',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  codeforces: {
    name: 'Codeforces',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  atcoder: {
    name: 'AtCoder',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  codechef: {
    name: 'CodeChef',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  hackerearth: {
    name: 'HackerEarth',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  topcoder: {
    name: 'TopCoder',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
};

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContests = async () => {
    try {
      setLoading(true);
      // Using Kontests API to fetch contest data
      const responses = await Promise.all([
        fetch('https://kontests.net/api/v1/all'),
      ]);

      const results = await Promise.all(responses.map(r => r.json()));
      
      const allContests = results.flat().map(contest => {
        const platform = getPlatformFromUrl(contest.url);
        return {
          id: contest.name + contest.start_time,
          platform,
          name: contest.name,
          startTime: contest.start_time,
          endTime: contest.end_time,
          duration: formatDuration(contest.duration),
          url: contest.url,
          status: contest.status || 'UPCOMING'
        };
      });

      // Sort by start time and filter out past contests
      const sortedContests = allContests
        .filter(contest => new Date(contest.endTime) > new Date())
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      setContests(sortedContests);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contest data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
    // Refresh every 5 minutes
    const interval = setInterval(fetchContests, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlatformFromUrl = (url) => {
    if (url.includes('leetcode')) return 'leetcode';
    if (url.includes('codeforces')) return 'codeforces';
    if (url.includes('atcoder')) return 'atcoder';
    if (url.includes('codechef')) return 'codechef';
    if (url.includes('hackerearth')) return 'hackerearth';
    if (url.includes('topcoder')) return 'topcoder';
    return 'other';
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hours${minutes > 0 ? ` ${minutes} minutes` : ''}` : `${minutes} minutes`;
  };

  const addToCalendar = (contest) => {
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.name)}&dates=${startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}\/${endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(`${platforms[contest.platform].name} Contest\nURL: ${contest.url}`)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Fetching contest data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchContests}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Auto-refreshes every 5 minutes
        </div>
        <Button onClick={fetchContests} size="sm">
          Refresh Now
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {contests.map((contest) => (
          <Card 
            key={contest.id}
            className={`${platforms[contest.platform]?.bgColor || 'bg-gray-50'} border-2 ${platforms[contest.platform]?.borderColor || 'border-gray-200'}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className={`w-6 h-6 ${platforms[contest.platform]?.color || 'text-gray-600'}`} />
                  <CardTitle className="text-lg">
                    {contest.name}
                  </CardTitle>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${platforms[contest.platform]?.color || 'text-gray-600'} bg-white`}>
                  {platforms[contest.platform]?.name || 'Other'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{contest.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{formatDate(contest.startTime)}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => window.open(contest.url, '_blank')}
                    className="flex-1"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View Contest
                  </Button>
                  <Button
                    onClick={() => addToCalendar(contest)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contests;