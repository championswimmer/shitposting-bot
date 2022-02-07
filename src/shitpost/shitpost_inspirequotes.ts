import { TwitterApi } from 'twitter-api-v2'

interface Quote {
  author: string
  text: string
  source: string
  tags: string
}

export async function shitpostInspireQuotes (client: TwitterApi) {
  const quotes = require('../../data/inspire_quotes.json')
  const randQuote: Quote = quotes[Math.floor(Math.random() * quotes.length)]
  const shoudCredit = Math.random() > 0.75
  const message = shoudCredit ? randQuote.text : randQuote.text + '\n\n- ' + randQuote.author
  const result = await client.v2.tweet(message)
  console.log(result)
}
