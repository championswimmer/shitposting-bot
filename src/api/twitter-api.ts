import 'dotenv/config'
import TwApi from 'twitter-api-v2'

// export const twClient = new TwApi(process.env.BEARER_TOKEN)
export const twClient = new TwApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: 'C4bGSgAAAAAARwPqAAABftCKEhc'
})

/* eslint-disable camelcase */
interface UserClientCredentials {
    oauth_token: string
    oauth_token_secret: string
    oauth_verifier: string
}
/* eslint-enable camelcase */

export const getUserClient = async function (credentials?: UserClientCredentials) {
  if (!credentials) {
    if (process.env.ACCESS_SECRET && process.env.ACCESS_TOKEN) {
      return new TwApi({
        appKey: process.env.API_KEY,
        appSecret: process.env.API_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        accessSecret: process.env.ACCESS_SECRET
      })
    } else {
      return null
    }
  }
  const twClient = new TwApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: credentials.oauth_token,
    accessSecret: credentials.oauth_token_secret
  })

  const { client: userClient, accessToken, accessSecret } = await twClient.login(credentials.oauth_verifier)

  console.log({ accessToken, accessSecret })

  return userClient
}
