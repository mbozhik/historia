// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      login: string
      email: string
      phone_number: string
      photo: string
      access_token: string
    }
  }

  interface User extends DefaultUser {
    id: string
    login: string
    email: string
    phone_number: string
    photo: string
    access_token: string
  }
}
