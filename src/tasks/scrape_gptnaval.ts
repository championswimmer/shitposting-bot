import { TwitterApiReadOnly } from 'twitter-api-v2'
import { getTimelineV1 } from '../actions/timeline'
import fs from 'fs/promises'

export async function scrapeGPTNaval (appClient: TwitterApiReadOnly) {
  const tl = await getTimelineV1(appClient, 'gpt3_naval', 1200)
  const navalDump = tl.map(t => ({
    id: t.id,
    text: t.full_text + '\n\n - GPT3-Naval'
  }))

  await fs.writeFile('data/gptnaval_dump.json', JSON.stringify(navalDump, null, 2))
}
