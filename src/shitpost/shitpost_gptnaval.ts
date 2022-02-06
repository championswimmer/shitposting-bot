import { TwitterApi } from 'twitter-api-v2'

export async function shitpostGPTNaval (client: TwitterApi) {
  const navalTweets = require('../../data/gptnaval_dump.json')
  const randomTweet = navalTweets[Math.floor(Math.random() * navalTweets.length)]
  const result = await client.v2.tweet(randomTweet.text)
  console.log(result)
}
