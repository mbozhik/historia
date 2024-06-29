'use client'

import {useSessionStore} from '@/store/session-store'

export default function ClientComponent() {
  const {session} = useSessionStore()

  return <div className="w-full border-2 mt-2 text-center rounded-sm py-1.5 text-black font-medium border-black">{session ? <p>Logged in as: {session.user.email}</p> : <p>No user is logged in.</p>}</div>
}
