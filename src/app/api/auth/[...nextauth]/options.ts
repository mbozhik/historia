import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import {api} from '@/lib/backendApi'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: {label: 'Login', type: 'text', placeholder: 'user4'},
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
      return {...token, ...user}
    },
    async session({session, token}) {
      session.user = token as any
      return session
    },
  },
}
