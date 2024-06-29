import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import {api} from '@/lib/backendApi'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: {label: 'Username', type: 'text', placeholder: 'user4'},
        password: {label: 'Password', type: 'password'},
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
            console.log('🚀 ~ authorize ~ loginResponse.data:', userData)

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
  session: {
    maxAge: 300,
  },
  jwt: {
    maxAge: 300,
  },
  callbacks: {
    async jwt({token, user}) {
      console.log('🚀 ~ jwt ~ jwt:', {token, user})
      if (user) {
        token.id = user.id as string
        token.login = user.login as string
      }
      return token
    },
    async session({session, token}) {
      console.log('🚀 ~ session ~ session:', {session, token})
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.login as string
      }
      return session
    },
  },
}
