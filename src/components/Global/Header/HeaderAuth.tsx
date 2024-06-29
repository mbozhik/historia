'use client'

import {signIn, signOut} from 'next-auth/react'

import Link from 'next/link'

export default function HeaderAuth({session, headerData}) {
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
          {/* <Link href={headerData.account.sign_up.link} className="duration-200 hover:text-neutral-400">
            {headerData.account.sign_up.text}
          </Link> */}
        </>
      )}
    </div>
  )
}
