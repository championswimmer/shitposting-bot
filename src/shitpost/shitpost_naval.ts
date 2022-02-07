import { TwitterApi } from 'twitter-api-v2'

export async function shitpostNaval (client: TwitterApi) {
  const navalTweets = require('../../data/navalism_dump.json')
  const randomTweet = navalTweets[Math.floor(Math.random() * navalTweets.length)]
  const shouldCredit = Math.random() > 0.75
  const message = shouldCredit ? randomTweet.text : randomTweet.text.replace('\n@naval', '')
  const result = await client.v2.tweet(message)
  console.log(result)
}
