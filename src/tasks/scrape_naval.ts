import { TwitterApiReadOnly } from 'twitter-api-v2'
import { getTimelineV1 } from '../actions/timeline'
import fs from 'fs/promises'

export async function scrapeNaval (appClient: TwitterApiReadOnly) {
  const tl = await getTimelineV1(appClient, 'NavalismHQ', 1500)
  const navalDump = tl.map(t => ({
    id: t.id,
    text: t.full_text
  }))

  await fs.writeFile('data/navalism_dump.json', JSON.stringify(navalDump, null, 2))
}
