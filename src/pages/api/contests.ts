// src/pages/api/contests.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://kontests.net/api/v1/all');
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch contests' });
  }
}