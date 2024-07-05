'use client'

import {useEffect} from 'react'
import {useSessionStore} from '@/store/session-store'
import {signIn, signOut} from 'next-auth/react'

import Link from 'next/link'

export default function HeaderAuth({session, headerData}) {
  const setSession = useSessionStore((state) => state.setSession)

  useEffect(() => {
    if (session == null) {
      setSession(session)
      console.log('yes', session)
    } else {
      console.log('no', session)
    }
  }, [session, setSession])

  return (
    <div className="space-x-4 sm:hidden">
      {session ? (
        <>
          <Link href="/" className="duration-200 hover:text-neutral-400">
            {session.user.email}
          </Link>
          <button onClick={() => signOut()} className="duration-200 hover:text-neutral-400">
            {headerData.account.sign_out.text}
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()} className="duration-200 hover:text-neutral-400">
            {headerData.account.sign_in.text}
          </button>
          <Link href="/sign-up" className="duration-200 hover:text-neutral-400">
            {headerData.account.sign_up.text}
          </Link>
        </>
      )}
    </div>
  )
}
