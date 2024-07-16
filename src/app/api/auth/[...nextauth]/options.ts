import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import {jwtDecode} from 'jwt-decode'
// import {encrypt} from '@/utils/encryption'

import axios from 'axios'
import {api} from '@/lib/backendApi'

async function refreshAccessToken(token) {
  const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN}`, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID,
      client_secret: process.env.KEYCLOAK_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
    }),
    method: 'POST',
  })
  const refreshToken = await resp.json()
  if (!resp.ok) throw refreshToken

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    expires_in: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: {label: 'Login', type: 'text', placeholder: 'login', autocomplete: 'username'},
        password: {label: 'Password', type: 'password', autocomplete: 'current-password'},
      },
      async authorize(credentials: {login: string; password: string}) {
        if (!credentials || !credentials.login || !credentials.password) {
          console.error('Missing credentials')
          return null
        }

        try {
          const loginResponse = await axios.post(
            api.url + api.routes.login,
            {
              login: credentials.login,
              password: credentials.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          if (loginResponse.status === 200) {
            const userData = loginResponse.data
            // console.log('🚀 ~ authorize ~ loginResponse.data:', userData)

            try {
              const userResponse = await axios.get(api.url + api.routes.all_users, {
                headers: {
                  Authorization: `Bearer ${userData.access_token}`,
                },
              })

              const users = userResponse.data.users
              const matchingUser = users.find((user) => user.login === credentials.login)

              if (matchingUser) {
                return {
                  id: matchingUser.id,
                  login: matchingUser.login,
                  email: matchingUser.email,
                  phone_number: matchingUser.phone_number,
                  photo: matchingUser.photo,
                  access_token: userData.access_token,
                  refresh_token: userData.refresh_token,
                  expires_in: userData.expires_in,
                }
              } else {
                console.error('No matching user found')
                return null
              }
            } catch (userError) {
              console.error('Error fetching user data:', userError.response ? userError.response.data : userError)
              return null
            }
          } else {
            console.error('Login response status not 200:', loginResponse.status)
            return null
          }
        } catch (error) {
          if (error.response) {
            console.error('Error logging in:', error.response.data)
          } else {
            console.error('Error logging in:', error.message)
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({token, user, session}) {
      // console.log('JWT Callback:', {token, user})
      const nowTimeStamp: number = Math.floor(Date.now() / 1000)

      if (user) {
        // user is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = jwtDecode(user.access_token)
        token.access_token = user.access_token
        token.expires_in = (nowTimeStamp + user.expires_in) as number
        token.refresh_token = user.refresh_token
        return token
      } else if (typeof token.expires_in === 'number' && nowTimeStamp < nowTimeStamp + token.expires_in) {
        // token has not expired yet, return it
        console.log('Token has not expired. Will return...')
        return token
      } else {
        // token is expired, try to refresh it
        console.log('Token has expired. Will refresh...')
        try {
          const refreshedToken = await refreshAccessToken(token)
          console.log('Token is refreshed.')
          return refreshedToken
        } catch (error) {
          console.error('Error refreshing access token', error)
          return {...token, error: 'RefreshAccessTokenError'}
        }
      }
    },
    async session({session, token}) {
      // console.log('Session Callback:', {session, token})
      const decoded = token.decoded as {given_name: string; email: string; photo: string; access_token: string}

      session.access_token = token.access_token
      session.error = token.error

      session.user = {
        login: decoded.given_name,
        email: decoded.email,
      }
      return session
    },
  },
}
