import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Link from 'next/link'
import {containerSize} from '#/Global/Container'
import {headerData} from '@/lib/constants'
import HeaderAuth from './HeaderAuth'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className="fixed w-full py-4 text-xl bg-background sm:text-lg font-book">
      <div className={`flex items-center justify-between mx-auto ${containerSize['2/3']}`}>
        <div className="flex items-center gap-6">
          <Link href="/" className="rounded-md bg-neutral-500 s-10"></Link>

          <div className="space-x-4 sm:hidden">
            {Object.entries(headerData.main).map(([key, {text, link}]) => (
              <Link href={link} className="duration-200 hover:text-neutral-400" key={key}>
                {text}
              </Link>
            ))}
          </div>
        </div>

        <HeaderAuth session={session} headerData={headerData} />
      </div>
    </header>
  )
}
