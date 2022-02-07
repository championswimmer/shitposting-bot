import { TwitterApi } from 'twitter-api-v2'

export async function shitpostWarikoo (client: TwitterApi) {
  const warikooTweets = require('../../data/warikoo_dump.json')
  const randomTweet = warikooTweets[Math.floor(Math.random() * warikooTweets.length)]
  const shouldCredit = Math.random() > 0.75
  const message = shouldCredit ? randomTweet.text : randomTweet.text.replace('\n-@warikoo', '')
  const result = await client.v2.tweet(message)
  console.log(result)
}
