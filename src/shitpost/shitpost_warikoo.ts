import { TwitterApi } from 'twitter-api-v2'

export async function shitpostWarikoo (client: TwitterApi) {
  const warikooTweets = require('../../data/warikoo_dump.json')
  const randomTweet = warikooTweets[Math.floor(Math.random() * warikooTweets.length)]
  const result = await client.v2.tweet(randomTweet.text)
  console.log(result)
}
