import { TwitterApi } from 'twitter-api-v2'

export async function shitpostPomp (client: TwitterApi) {
  const pompTweets = require('../../data/pomp_dump.json')
  const randomTweet = pompTweets[Math.floor(Math.random() * pompTweets.length)]
  const shouldCredit = Math.random() > 0.75
  const message = shouldCredit ? randomTweet.text : randomTweet.text.replace('\n\n–@APompliano', '')
  const result = await client.v2.tweet(message)
  console.log(result)
}
