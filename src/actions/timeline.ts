import { TweetV1, TweetV1TimelineParams, TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2'

export async function getTimelineV2 (client: TwitterApi, username: string) {
  const { data: user } = await client.v2.userByUsername(username)

  const { data: timeline } = await client.v2.userTimeline(user.id)

  return timeline.data
}

export async function getTimelineV1 (client: TwitterApiReadOnly, username: string, count?: number) {
  count = count ?? 1000
  const timeline = await client.v1.userTimelineByUsername(username, {
    count: count,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  } as TweetV1TimelineParams)
  const tweets: TweetV1[] = []
  for await (const tweet of timeline) {
    console.log(tweet.full_text)
    tweets.push(tweet)
    if (tweets.length > count) break
  }

  return tweets
}
