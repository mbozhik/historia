// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token: any
    error: any
    user: {
      login: string
      email: string
    }
  }

  interface User extends DefaultUser {
    id: string
    login: string
    email: string
    phone_number: string
    photo: string
    access_token: string
    refresh_token: string
    expires_in: number
  }
}
