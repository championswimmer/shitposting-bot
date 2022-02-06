import { TwitterApi } from 'twitter-api-v2'

export async function shitpostNaval (client: TwitterApi) {
  const navalTweets = require('../../data/navalism_dump.json')
  const randomTweet = navalTweets[Math.floor(Math.random() * navalTweets.length)]
  const result = await client.v2.tweet(randomTweet.text)
  console.log(result)
}
