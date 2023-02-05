// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Error from '@/types/error'
import Release from '@/types/release'
import ResponseError from '@/types/responseError'

async function handler(req: NextApiRequest, res: NextApiResponse<Release | ResponseError | Error>) {
  const { per_page, page } = req.query

  const url = `https://api.github.com/repos/facebook/react/releases?per_page=${per_page}&page=${page}`

  try {
    const response = await fetch(url)
    const releases = await response.json()
    res.status(200).json(releases)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default handler
