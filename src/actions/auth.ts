import { getUserClient, twClient } from '../api/twitter-api'
import prompt from 'prompt'

export default async function auth () {
  let userClient = await getUserClient()
  if (userClient) {
    try {
      const user = await userClient.v2.get('users/me')
      console.log(`Logged in as ${JSON.stringify(user)})`)
    } catch (e) {
      userClient = null
    }
  }
  if (!userClient) {
    const authLink = await twClient.generateAuthLink('https://android.championswimmer.in')

    console.log(`Please visit ${authLink.url} to authorize your account`)
    prompt.start()
    console.log('After authorizing on Twitter, paste the redirected URL of your browser here:')
    const { url } = await prompt.get(['url'])
    const urlObj = new URL(url as string)
    console.log(urlObj)
    userClient = await getUserClient({
      oauth_token: authLink.oauth_token,
      oauth_token_secret: authLink.oauth_token_secret,
      oauth_verifier: urlObj.searchParams.get('oauth_verifier')!
    })
  }
  console.log(userClient)
  return userClient!
}
