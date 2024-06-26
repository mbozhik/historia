// types/next-auth.d.ts
import NextAuth, {DefaultSession, DefaultUser} from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    login: string
  }
}
