// src/components/sections/Hackathons.tsx

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCcw, Calendar, Trophy, Globe } from 'lucide-react';

interface Hackathon {
  id: string;
  platform: HackathonPlatform;
  name: string;
  url: string;
  startTime: string;
  endTime: string;
  status: 'UPCOMING' | 'ONGOING';
}

type HackathonPlatform = 'all' | 'devpost' | 'mlh' | 'unstop';

// UI styling config
const platforms = {
  all:     { label: 'All',     color: 'text-gray-600',   bg: 'bg-gray-50',   border: 'border-gray-200' },
  devpost: { label: 'Devpost', color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  mlh:     { label: 'MLH',     color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200' },
  unstop:  { label: 'Unstop',  color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
};

// Minimal HTML scrapes (very fragile!)
async function fetchDevpost(): Promise<Hackathon[]> {
  try {
    const res = await fetch('https://devpost.com/hackathons');
    if (!res.ok) throw new Error('Devpost fetch error');
    const html = await res.text();
    // naive scrape example: look for `<a class="title..." href="...">Hack Name</a>`
    const hackathons: Hackathon[] = [];

    // We'll do a quick regex to find hackathon blocks:
    const regex = /<a[^>]+class="[^"]*title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    let match: RegExpExecArray | null;
    let i = 0;
    while ((match = regex.exec(html)) !== null && i < 5) {
      const [_, link, name] = match;
      // example: Mark them all as "UPCOMING" in near future
      hackathons.push({
        id: `devpost-${i}`,
        platform: 'devpost',
        name: name.trim(),
        url: link.startsWith('http') ? link : `https://devpost.com${link}`,
        startTime: new Date(Date.now() + (i+1)*24*3600*1000).toISOString(),
        endTime: new Date(Date.now() + (i+2)*24*3600*1000).toISOString(),
        status: 'UPCOMING',
      });
      i++;
    }
    return hackathons;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchMLH(): Promise<Hackathon[]> {
  try {
    const res = await fetch('https://mlh.io/seasons/2025/events');
    if (!res.ok) throw new Error('MLH fetch error');
    const html = await res.text();
    // naive approach: look for `<h3 class="event-name"><a href="...">Name</a></h3>`
    const hackathons: Hackathon[] = [];
    const regex = /<h3[^>]+class="[^"]*event-name[^"]*"[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    let match: RegExpExecArray | null;
    let i = 0;
    while ((match = regex.exec(html)) !== null && i < 5) {
      const [_, link, name] = match;
      hackathons.push({
        id: `mlh-${i}`,
        platform: 'mlh',
        name: name.trim(),
        url: link.startsWith('http') ? link : `https://mlh.io${link}`,
        // pretend half are ONGOING, half are UPCOMING
        startTime: new Date(Date.now() + (i%2)*12*3600*1000).toISOString(),
        endTime: new Date(Date.now() + 2*24*3600*1000).toISOString(),
        status: i % 2 === 0 ? 'ONGOING' : 'UPCOMING',
      });
      i++;
    }
    return hackathons;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchUnstop(): Promise<Hackathon[]> {
  try {
    const res = await fetch('https://unstop.com/hackathons');
    if (!res.ok) throw new Error('Unstop fetch error');
    const html = await res.text();
    // naive approach: look for `<h2 class="event-title"><a href="...">...</a></h2>`
    const hackathons: Hackathon[] = [];
    const regex = /<h2[^>]*class="[^"]*event-title[^"]*"[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    let match: RegExpExecArray | null;
    let i = 0;
    while ((match = regex.exec(html)) !== null && i < 5) {
      const [_, link, name] = match;
      hackathons.push({
        id: `unstop-${i}`,
        platform: 'unstop',
        name: name.trim(),
        url: link.startsWith('http') ? link : `https://unstop.com${link}`,
        startTime: new Date(Date.now() + (i+1)*12*3600*1000).toISOString(),
        endTime: new Date(Date.now() + (i+2)*12*3600*1000).toISOString(),
        status: 'UPCOMING',
      });
      i++;
    }
    return hackathons;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Filter button for hackathons
interface FilterButtonProps {
  platform: HackathonPlatform;
  isActive: boolean;
  onClick: () => void;
}
const FilterButton: React.FC<FilterButtonProps> = ({ platform, isActive, onClick }) => {
  const cfg = platforms[platform];
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`
        px-4 py-2 flex items-center justify-center rounded-md
        ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200'}
        ${cfg.color}
      `}
    >
      <Trophy className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{cfg.label}</span>
    </Button>
  );
};

// Card for each hackathon
interface HackathonCardProps {
  hackathon: Hackathon;
  onAddToCalendar: (h: Hackathon) => void;
}
const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, onAddToCalendar }) => {
  const cfg = platforms[hackathon.platform];
  return (
    <Card className={`${cfg.bg} border-2 ${cfg.border}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className={`w-6 h-6 ${cfg.color}`} />
            <CardTitle className="text-lg">{hackathon.name}</CardTitle>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${cfg.color} bg-white`}>
            {cfg.label}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2 text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>
                {new Date(hackathon.startTime).toLocaleString()} &mdash;{' '}
                {new Date(hackathon.endTime).toLocaleString()}
              </span>
            </div>
            <div>
              Status: <span className="font-semibold">{hackathon.status}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => window.open(hackathon.url, '_blank')} className="flex-1">
              <Globe className="w-4 h-4 mr-2" />
              View Hackathon
            </Button>
            <Button onClick={() => onAddToCalendar(hackathon)} variant="outline" className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Hackathons: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [platform, setPlatform] = useState<HackathonPlatform>('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchAll = async () => {
    try {
      setLoading(true);
      // fetch from Devpost, MLH, Unstop in parallel
      const [dp, ml, us] = await Promise.all([fetchDevpost(), fetchMLH(), fetchUnstop()]);
      const combined = [...dp, ...ml, ...us];
      // Sort by startTime ascending
      combined.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      setHackathons(combined);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Hackathon fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addToCalendar = (hack: Hackathon) => {
    const startTime = new Date(hack.startTime);
    const endTime = new Date(hack.endTime);
    const label = platforms[hack.platform].label;

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${
      encodeURIComponent(`${label} Hackathon: ${hack.name}`)
    }&dates=${
      startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }/${
      endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }&details=${
      encodeURIComponent(`${label} Hackathon\nURL: ${hack.url}`)
    }`;
    window.open(googleCalendarUrl, '_blank');
  };

  const filtered = platform === 'all'
    ? hackathons
    : hackathons.filter((h) => h.platform === platform);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading hackathons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Hackathons</h1>
        <p className="text-lg opacity-90">Discover upcoming & ongoing hackathons</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hackathons</p>
              <p className="text-2xl font-bold text-green-600">{hackathons.length}</p>
            </div>
            <Trophy className="w-8 h-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Hackathon</p>
              {hackathons.length > 0 ? (
                <p className="text-md font-bold text-blue-600">
                  {hackathons[0].name.length > 20
                    ? hackathons[0].name.slice(0, 20) + '...'
                    : hackathons[0].name}
                </p>
              ) : (
                <p className="text-md font-bold text-blue-600">N/A</p>
              )}
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
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
              onClick={fetchAll}
            />
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(platforms) as HackathonPlatform[]).map((p) => (
          <FilterButton
            key={p}
            platform={p}
            isActive={platform === p}
            onClick={() => setPlatform(p)}
          />
        ))}
      </div>

      {/* Hackathon Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.length > 0 ? (
          filtered.map((hack) => (
            <HackathonCard key={hack.id} hackathon={hack} onAddToCalendar={addToCalendar} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No hackathons found for this platform.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
