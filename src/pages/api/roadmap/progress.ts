import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'

type RoadmapProgress = Record<string, boolean>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    if (req.method === 'GET') {
      const user = await (await clerkClient()).users.getUser(userId)
      const progress = (user.publicMetadata?.roadmapProgress || {}) as RoadmapProgress
      return res.status(200).json({ progress })
    }

    if (req.method === 'POST') {
      const { progress } = req.body as { progress: RoadmapProgress }
      if (!progress || typeof progress !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' })
      }
      await (await clerkClient()).users.updateUser(userId, {
        publicMetadata: {
          ...(await getMergedPublicMetadata(userId, progress)),
        },
      })
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end('Method Not Allowed')
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}

async function getMergedPublicMetadata(userId: string, newProgress: RoadmapProgress) {
  const user = await (await clerkClient()).users.getUser(userId)
  const existing = (user.publicMetadata?.roadmapProgress || {}) as RoadmapProgress
  return {
    ...user.publicMetadata,
    roadmapProgress: { ...existing, ...newProgress },
  }
}


