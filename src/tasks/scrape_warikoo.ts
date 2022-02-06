import { TwitterApiReadOnly } from 'twitter-api-v2'
import { getTimelineV1 } from '../actions/timeline'
import fs from 'fs/promises'

export async function scrapeWarikoo (appClient: TwitterApiReadOnly) {
  const tl = await getTimelineV1(appClient, 'AnkurWarikooBot', 300)
  const warikooDump = tl.map(t => ({
    id: t.id,
    text: t.full_text
  }))

  await fs.writeFile('data/warikoo_dump.json', JSON.stringify(warikooDump, null, 2))
}
