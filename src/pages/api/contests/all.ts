import type { NextApiRequest, NextApiResponse } from 'next';

type Platform =
  | 'leetcode'
  | 'codeforces'
  | 'codechef'
  | 'atcoder'
  | 'hackerrank'
  | 'hackerearth'
  | 'topcoder'
  | 'csacademy'
  | 'other';

interface Contest {
  id: string;
  platform: Platform;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  url: string;
  status: 'UPCOMING' | 'ONGOING';
}

// Map site names from kontests.net to our platform keys
const platformMap: Record<string, Platform> = {
  codeforces: 'codeforces',
  codeforces_gym: 'codeforces',
  leet_code: 'leetcode',
  code_chef: 'codechef',
  at_coder: 'atcoder',
  hacker_rank: 'hackerrank',
  hacker_earth: 'hackerearth',
  top_coder: 'topcoder',
  cs_academy: 'csacademy',
};

const hostToPlatform: Record<string, Platform> = {
  'codeforces.com': 'codeforces',
  'atcoder.jp': 'atcoder',
  'leetcode.com': 'leetcode',
  'codechef.com': 'codechef',
  'hackerrank.com': 'hackerrank',
  'hackerearth.com': 'hackerearth',
  'topcoder.com': 'topcoder',
  'csacademy.com': 'csacademy',
};

// Direct platform fetchers as a reliable fallback
async function fetchCodeforces(): Promise<Contest[]> {
  try {
    const response = await fetch('https://codeforces.com/api/contest.list', {
      headers: { Accept: 'application/json', 'User-Agent': 'dsa-app/1.0' },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = await response.json();
    if (!data?.result) return [];
    const now = Date.now();
    return (data.result as any[])
      .filter((c: any) => c.phase === 'BEFORE' || c.phase === 'CODING')
      .map((c: any) => {
        const start = c.startTimeSeconds * 1000;
        const end = start + c.durationSeconds * 1000;
        return {
          id: `cf-${c.id}`,
          platform: 'codeforces',
          name: c.name,
          startTime: new Date(start).toISOString(),
          endTime: new Date(end).toISOString(),
          duration: c.durationSeconds,
          url: `https://codeforces.com/contest/${c.id}`,
          status: now < start ? 'UPCOMING' : 'ONGOING',
        } satisfies Contest;
      });
  } catch {
    return [];
  }
}

async function fetchLeetCode(): Promise<Contest[]> {
  // Try official JSON endpoint first
  try {
    const response = await fetch('https://leetcode.com/contest/api/list', {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'dsa-app/1.0',
        Referer: 'https://leetcode.com/contest/',
      },
      cache: 'no-store',
    });
    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!data?.contests || typeof data.currentTimestamp !== 'number') throw new Error('bad lc json');
        const now = data.currentTimestamp; // seconds
        const results: Contest[] = [];
        for (const c of data.contests as any[]) {
          const st = c.startTime as number; // seconds
          const en = st + (c.duration as number); // seconds
          if (en < now) continue; // finished
          results.push({
            id: `lc-${c.id}`,
            platform: 'leetcode',
            name: c.title as string,
            startTime: new Date(st * 1000).toISOString(),
            endTime: new Date(en * 1000).toISOString(),
            duration: c.duration as number,
            url: `https://leetcode.com/contest/${c.titleSlug}`,
            status: now < st ? 'UPCOMING' : 'ONGOING',
          });
        }
        return results;
      }
    }
  } catch {}

  // Fallback: parse contest landing page for upcoming contest cards
  try {
    const response = await fetch('https://leetcode.com/contest/', {
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'dsa-app/1.0',
        Referer: 'https://leetcode.com/',
      },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const html = await response.text();

    // Extract blocks like /contest/weekly-contest-XYZ or /contest/biweekly-contest-XYZ
    const cardRegex = /href=\"(\/contest\/(?:weekly|biweekly)-contest-([0-9]+))\"[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?<span[^>]*>([^<]+)<\/span>/g;
    const results: Contest[] = [];
    const nowMs = Date.now();
    for (const m of html.matchAll(cardRegex)) {
      const path = m[1];
      const title = m[3].trim();
      const timeText = m[4].trim();
      // timeText may be like "Aug 17, 2025 8:00 AM UTC"
      const startMs = Date.parse(timeText);
      if (Number.isNaN(startMs)) continue;
      // default duration 90 minutes for biweekly, 90 for weekly; LeetCode durations are typically 90-120
      const isBiweekly = path.includes('biweekly');
      const durationSec = isBiweekly ? 90 * 60 : 90 * 60;
      const endMs = startMs + durationSec * 1000;
      if (endMs <= nowMs) continue;
      results.push({
        id: `lc-fallback-${path}`,
        platform: 'leetcode',
        name: title,
        startTime: new Date(startMs).toISOString(),
        endTime: new Date(endMs).toISOString(),
        duration: durationSec,
        url: `https://leetcode.com${path}`,
        status: nowMs < startMs ? 'UPCOMING' : 'ONGOING',
      });
    }
    return results;
  } catch {
    return [];
  }
}

async function fetchFromAggregator(): Promise<Contest[]> {
  try {
    const response = await fetch('https://kontests.net/api/v1/all', {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'dsa-app/1.0',
      },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return [];
    const data = (await response.json()) as Array<Record<string, any>>;
    const now = Date.now();
    const results: Contest[] = [];
    for (const item of data) {
      const siteRaw = String(item.site || '').toLowerCase();
      const platform: Platform = platformMap[siteRaw] || 'other';
      const name: string | undefined = item.name;
      const url: string | undefined = item.url;
      const startMs = Date.parse(item.start_time);
      const endMs = Date.parse(item.end_time);
      if (!name || !url || Number.isNaN(startMs) || Number.isNaN(endMs)) continue;
      if (endMs <= now) continue;
      const status: 'UPCOMING' | 'ONGOING' = now < startMs ? 'UPCOMING' : 'ONGOING';
      const durationSeconds =
        typeof item.duration === 'number'
          ? item.duration
          : Math.max(0, Math.floor((endMs - startMs) / 1000));
      const idSource = item?.id ?? `${siteRaw}-${name}-${startMs}`;
      results.push({
        id: String(idSource),
        platform,
        name,
        startTime: new Date(startMs).toISOString(),
        endTime: new Date(endMs).toISOString(),
        duration: durationSeconds,
        url,
        status,
      });
    }
    return results;
  } catch {
    return [];
  }
}

async function fetchFromClist(): Promise<Contest[]> {
  const username = process.env.CLIST_USERNAME;
  const apiKey = process.env.CLIST_API_KEY;
  if (!username || !apiKey) return [];

  const resources = [
    'codeforces.com',
    'atcoder.jp',
    'leetcode.com',
    'codechef.com',
    'hackerrank.com',
    'hackerearth.com',
    'topcoder.com',
    'csacademy.com',
  ];

  // time window: last day to next 60 days
  const nowIso = new Date().toISOString();
  const pastIso = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const futureIso = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();

  const params = new URLSearchParams({
    resource__in: resources.join(','),
    start__gte: pastIso,
    end__lte: futureIso,
    order_by: 'start',
    limit: '500',
  });

  try {
    const response = await fetch(`https://clist.by/api/v2/contest/?${params.toString()}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `ApiKey ${username}:${apiKey}`,
        'User-Agent': 'dsa-app/1.0',
      },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = (await response.json()) as any;
    const objects: any[] = Array.isArray(data?.objects) ? data.objects : [];
    const now = Date.parse(nowIso);
    const results: Contest[] = [];
    for (const item of objects) {
      const startMs = Date.parse(item.start);
      const endMs = Date.parse(item.end);
      if (Number.isNaN(startMs) || Number.isNaN(endMs)) continue;
      if (endMs <= now) continue; // finished
      const host: string = item.resource?.host || '';
      const platform: Platform = hostToPlatform[host] || 'other';
      const status: 'UPCOMING' | 'ONGOING' = now < startMs ? 'UPCOMING' : 'ONGOING';
      const durationSeconds = Math.max(0, Math.floor((endMs - startMs) / 1000));
      const url: string = item.href || '';
      const name: string = item.event || item.title || host;
      const id: string = String(item.id || `${host}-${name}-${startMs}`);
      if (!url || !name) continue;
      results.push({
        id,
        platform,
        name,
        startTime: new Date(startMs).toISOString(),
        endTime: new Date(endMs).toISOString(),
        duration: durationSeconds,
        url,
        status,
      });
    }
    return results;
  } catch {
    return [];
  }
}

async function fetchCodeChef(): Promise<Contest[]> {
  try {
    const response = await fetch(
      'https://www.codechef.com/api/list/contests/all?sort_by=STARTTIME&sorting_order=asc',
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'dsa-app/1.0',
          Referer: 'https://www.codechef.com/',
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) return [];
    const data = (await response.json()) as any;
    const upcoming = Array.isArray(data?.future_contests) ? data.future_contests : [];
    const ongoing = Array.isArray(data?.present_contests) ? data.present_contests : [];
    const now = Date.now();
    const results: Contest[] = [];

    for (const c of upcoming) {
      const start = Date.parse(c.contest_start_date_iso);
      const end = Date.parse(c.contest_end_date_iso);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;
      if (end <= now) continue;
      const durationSec = Math.max(0, Math.floor((end - start) / 1000));
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

    for (const c of ongoing) {
      const start = Date.parse(c.contest_start_date_iso);
      const end = Date.parse(c.contest_end_date_iso);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;
      if (end <= now) continue;
      const durationSec = Math.max(0, Math.floor((end - start) / 1000));
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
  } catch {
    return [];
  }
}

async function fetchHackerEarth(): Promise<Contest[]> {
  try {
    const response = await fetch('https://www.hackerearth.com/api/events/upcoming/', {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'dsa-app/1.0',
        Referer: 'https://www.hackerearth.com/',
      },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = (await response.json()) as any;
    const arr: any[] = Array.isArray(data?.response) ? data.response : [];
    const now = Date.now();
    const results: Contest[] = [];
    for (const item of arr) {
      const url: string = item.url || '';
      // Limit to competitive programming contests; skip hackathons/jobs
      if (!url.includes('/challenges/competitive/')) continue;
      const name: string = item.title || 'HackerEarth Contest';
      const startIso = (item.start_utc_tz as string)?.replace(' ', 'T');
      const endIso = (item.end_utc_tz as string)?.replace(' ', 'T');
      const startMs = Date.parse(startIso);
      const endMs = Date.parse(endIso);
      if (Number.isNaN(startMs) || Number.isNaN(endMs)) continue;
      if (endMs <= now) continue;
      const status: 'UPCOMING' | 'ONGOING' = now < startMs ? 'UPCOMING' : 'ONGOING';
      const durationSeconds = Math.max(0, Math.floor((endMs - startMs) / 1000));
      // Filter out very long multi-week/month events to keep CP feed clean
      if (durationSeconds > 24 * 3600) continue;
      results.push({
        id: `he-${url}`,
        platform: 'hackerearth',
        name,
        startTime: new Date(startMs).toISOString(),
        endTime: new Date(endMs).toISOString(),
        duration: durationSeconds,
        url,
        status,
      });
    }
    return results;
  } catch {
    return [];
  }
}

// Lightweight HTML parser for AtCoder contest list
function extractText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseDurationToSeconds(text: string): number | null {
  // format like 1:40 or 02:00
  const m = text.match(/(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const hours = parseInt(m[1], 10);
  const minutes = parseInt(m[2], 10);
  return hours * 3600 + minutes * 60;
}

async function fetchAtCoder(): Promise<Contest[]> {
  try {
    const response = await fetch('https://atcoder.jp/contests/?lang=en', {
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'dsa-app/1.0',
        Referer: 'https://atcoder.jp/',
      },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const html = await response.text();

    const now = Date.now();
    const results: Contest[] = [];

    // Extract sections for Active (ongoing) and Upcoming
    const sections = [
      { key: 'Ongoing Contests', status: 'ONGOING' as const },
      { key: 'Upcoming Contests', status: 'UPCOMING' as const },
    ];

    for (const section of sections) {
      const idx = html.indexOf(section.key);
      if (idx === -1) continue;
      const sub = html.slice(idx, idx + 20000); // slice a window
      // Grab table rows
      const rows = sub.match(/<tr[\s\S]*?<\/tr>/g) || [];
      for (const row of rows) {
        // Extract link and name
        const linkMatch = row.match(/<a\s+href="([^"]+)">([\s\S]*?)<\/a>/);
        if (!linkMatch) continue;
        const href = linkMatch[1];
        const name = extractText(linkMatch[2]);
        if (!href.startsWith('/contests/')) continue;

        // Extract start time
        const timeMatch = row.match(/<time[^>]*>([^<]+)<\/time>/);
        const timeText = timeMatch ? timeMatch[1].trim() : '';
        // Attempt to parse; AtCoder shows like "2025-08-13 21:00:00+0900"
        const startMs = Date.parse(timeText.replace(' ', 'T'));
        if (Number.isNaN(startMs)) continue;

        // Extract duration cell text
        const durationCellMatch = row.match(/<td[^>]*>\s*(\d{1,2}:\d{2})\s*<\/td>/);
        const durationSec = durationCellMatch
          ? parseDurationToSeconds(durationCellMatch[1]) || 0
          : 0;
        const endMs = startMs + durationSec * 1000;
        if (endMs <= now) continue;

        results.push({
          id: `ac-${href}`,
          platform: 'atcoder',
          name,
          startTime: new Date(startMs).toISOString(),
          endTime: new Date(endMs).toISOString(),
          duration: durationSec,
          url: `https://atcoder.jp${href}`,
          status: section.status,
        });
      }
    }

    return results;
  } catch {
    return [];
  }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Prefer CLIST if configured; then kontests; then direct sources
    const [clist, agg, cf, lc, cc, he, ac] = await Promise.all([
      fetchFromClist(),
      fetchFromAggregator(),
      fetchCodeforces(),
      fetchLeetCode(),
      fetchCodeChef(),
      fetchHackerEarth(),
      fetchAtCoder(),
    ]);
    const merged = [...clist, ...agg, ...cf, ...lc, ...cc, ...he, ...ac];

    // De-duplicate by id+platform
    const seen = new Set<string>();
    const unique: Contest[] = [];
    for (const c of merged) {
      const key = `${c.platform}:${c.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(c);
    }

    unique.sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    res.status(200).json({ contests: unique });
  } catch (error) {
    res.status(200).json({ contests: [] });
  }
}


