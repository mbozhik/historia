// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token: string
    id_token: string
    user: {
      id: string
      login: string
      email: string
      phone_number: string
      photo: string
    }
  }

  interface User extends DefaultUser {
    id: string
    login: string
    email: string
    phone_number: string
    photo: string
  }
}
