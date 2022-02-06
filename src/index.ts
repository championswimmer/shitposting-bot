import auth from './actions/auth'
import { twClient } from './api/twitter-api'
import { shitpostGPTNaval } from './shitpost/shitpost_gptnaval';
import { shitpostNaval } from './shitpost/shitpost_naval'
import { shitpostWarikoo } from './shitpost/shitpost_warikoo'
import { scrapeGPTNaval } from './tasks/scrape_gptnaval'
import { scrapeNaval } from './tasks/scrape_naval'
import { scrapeWarikoo } from './tasks/scrape_warikoo'

async function main () {
  const userClient = await auth()
  const appClient = twClient.readOnly

  // const timeline = await getTimelineV2(userClient, 'championswimmer')
  // console.log(timeline)

  switch (process.argv.pop()) {
    case 'scrape-warikoo':
      await scrapeWarikoo(appClient)
      break
    case 'scrape-naval':
      await scrapeNaval(appClient)
      break
    case 'scrape-gptnaval':
      await scrapeGPTNaval(appClient)
      break
    case 'shitpost-warikoo':
      await shitpostWarikoo(userClient)
      break
    case 'shitpost-naval':
      await shitpostNaval(userClient)
      break
    case 'shitpost-gptnaval':
      await shitpostGPTNaval(userClient)
      break
    default:
      console.error('Unknown task')
  }
}

main()
