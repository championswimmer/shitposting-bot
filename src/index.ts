import auth from './actions/auth'
import { twClient } from './api/twitter-api'
import { shitpostNaval } from './shitpost/shitpost_naval'
import { scrapeNaval } from './tasks/scrape_naval'

async function main () {
  const userClient = await auth()
  const appClient = twClient.readOnly

  // const timeline = await getTimelineV2(userClient, 'championswimmer')
  // console.log(timeline)

  switch (process.argv.pop()) {
    case 'scrape-naval':
      await scrapeNaval(appClient)
      break
    case 'shitpost-naval':
      await shitpostNaval(userClient)
      break
    default:
      console.error('Unknown task')
  }
}

main()
