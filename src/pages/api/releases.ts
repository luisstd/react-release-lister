// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Error from '@/types/error'
import Release from '@/types/release'
import ResponseError from '@/types/responseError'

async function handler(req: NextApiRequest, res: NextApiResponse<Release | ResponseError | Error>) {
  const { per_page, page, search } = req.query

  const url = `https://api.github.com/repos/facebook/react/releases?per_page=${per_page}&page=${page}&search=${search}`

  try {
    const response = await fetch(url)
    const releases = await response.json()

    const filteredReleases = releases.filter(
      (el: Release) =>
        el.author.login.toLowerCase().includes((search as string).toLowerCase()) ||
        el.tag_name.toLowerCase().includes((search as string).toLowerCase()) ||
        el.id.toString() === search
    )

    res.status(200).json(filteredReleases)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default handler
