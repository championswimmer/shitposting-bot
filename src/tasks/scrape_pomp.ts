import { TwitterApiReadOnly } from 'twitter-api-v2'
import { getTimelineV1 } from '../actions/timeline'
import fs from 'fs/promises'

export async function scrapePomp (appClient: TwitterApiReadOnly) {
  const tl = await getTimelineV1(appClient, 'PompBot', 1800)
  const pompDump = tl.map(t => ({
    id: t.id,
    text: t.full_text
  }))

  await fs.writeFile('data/pomp_dump.json', JSON.stringify(pompDump, null, 2))
}
