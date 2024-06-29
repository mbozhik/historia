'use client'

import {signIn} from 'next-auth/react'
import {useRef} from 'react'
const screenHeight = 'h-svh h-screen'

export default function LoginPage() {
  const userLogin = useRef('')
  const userPassword = useRef('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signIn('credentials', {
      login: userLogin.current,
      password: userPassword.current,
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <section data-section="sign-in" className={`grid place-items-center ${screenHeight}`}>
      <form className="flex flex-col p-5 w-[15%] gap-2 rounded-sm bg-neutral-100">
        <input onChange={(e) => (userLogin.current = e.target.value)} className="px-3 py-2 rounded-md bg-neutral-200" type="text" placeholder="username" autoComplete="username" />
        <input onChange={(e) => (userPassword.current = e.target.value)} className="px-3 py-2 rounded-md bg-neutral-200" type="password" placeholder="password" autoComplete="current-password" />
        <button onClick={handleSubmit}>Sign in</button>
      </form>
    </section>
  )
}
