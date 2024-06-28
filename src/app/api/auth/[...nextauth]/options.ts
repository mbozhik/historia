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

            console.log('🚀 ~ authorize ~ login used to find user:', credentials.login)

            try {
              const userResponse = await axios.get(api.url + api.routes.all_users, {
                headers: {
                  Authorization: `Bearer ${userData.access_token}`,
                },
              })

              const users = userResponse.data.users
              console.log('🚀 ~ authorize ~ users:', users)

              const matchingUser = users.find((user) => user.login === credentials.login)
              console.log('🚀 ~ authorize ~ matchingUser:', matchingUser)

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
    maxAge: 300, /// 300ms (5 min)
  },
  jwt: {
    maxAge: 300,
  },
  callbacks: {
    async session({session, token, user}) {
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.login as string
        console.log('🚀 ~ session ~ token:', {session, token, user})
      }
      return session
    },
    async jwt({token, user}) {
      console.log('🚀 ~ jwt ~ jwt:', {token, user})
      if (user) {
        token.id = user.id
        token.login = user.login
      }
      return token
    },
  },
}
