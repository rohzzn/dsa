// pages/api/contests.ts
import type { NextApiRequest, NextApiResponse } from 'next';

async function fetchCodeforces() {
  const response = await fetch('https://codeforces.com/api/contest.list');
  const data = await response.json();
  return data.result;
}

async function fetchLeetcode() {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        allContests {
          title
          titleSlug
          startTime
          duration
        }
      }`
    }),
  });
  const data = await response.json();
  return data.data?.allContests || [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [codeforcesContests] = await Promise.all([
      fetchCodeforces(),
    ]);

    const contests = [
      ...codeforcesContests.map((contest: any) => ({
        id: `cf-${contest.id}`,
        platform: 'codeforces',
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
        endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
        status: contest.phase
      }))
    ];

    res.status(200).json(contests);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch contest data' });
  }
}