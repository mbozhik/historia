'use client'

import {signIn, signOut} from 'next-auth/react'

import Link from 'next/link'

export default function HeaderAuth({session, websitePaths}) {
  const {profile, sign_out, sign_in, sign_up} = websitePaths.auth

  return (
    <div className="space-x-4 sm:hidden">
      {session ? (
        <>
          <Link href={profile.link} className="duration-200 hover:text-neutral-400">
            {session.user.email}
          </Link>
          <button onClick={() => signOut()} className="duration-200 hover:text-neutral-400">
            {sign_out.text}
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()} className="duration-200 hover:text-neutral-400">
            {sign_in.text}
          </button>
          <Link href={sign_up.link} className="duration-200 hover:text-neutral-400">
            {sign_up.text}
          </Link>
        </>
      )}
    </div>
  )
}
