import type {NextAuthOptions} from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

import {jwtDecode} from 'jwt-decode'
import {encrypt} from '@/utils/encryption'

export const options: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      idToken: true,
      checks: ['none'],
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      console.log('JWT Callback:', {token, account})
      const nowTimeStamp: number = Math.floor(Date.now() / 1000)

      if (account) {
        // account is only available on a new session (after the user signs in)
        token.decoded = jwtDecode(account.access_token)
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.expires_at = account.expires_at as number
        token.refresh_token = account.refresh_token
        return token
      } else if (typeof token.expires_at === 'number' && nowTimeStamp < token.expires_at) {
        // token has not expired yet, return it
        return token
      } else {
        // token is expired, try to refresh it
        console.log('Token has expired. Will refresh...')
        return token
      }
    },
    async session({session, token}) {
      console.log('Session Callback:', {session, token})

      session.access_token = encrypt(token.access_token)
      session.id_token = encrypt(token.id_token)
      return session
    },
    async redirect({url, baseUrl}) {
      const redirectUrl = url.startsWith('/') ? new URL(url, baseUrl).toString() : url
      console.log(`[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`)
      return redirectUrl
    },
  },
}
