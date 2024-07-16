import {getSession} from '@/lib/getSession'

import Link from 'next/link'
import {containerSize} from '#/Global/Container'
import {websitePaths} from '@/lib/constants'
import HeaderAuth from './HeaderAuth'

export default async function Header() {
  const session = await getSession()
  const mainLinks = websitePaths.main

  return (
    <header className="fixed w-full py-4 text-xl bg-background sm:text-lg font-book">
      <div className={`flex items-center justify-between mx-auto ${containerSize['2/3']}`}>
        <div className="flex items-center gap-6">
          <Link href="/" className="duration-300 rounded-md bg-primary hover:bg-primary-hover s-10"></Link>

          <div className="space-x-4 sm:hidden">
            {Object.entries(mainLinks).map(([key, {text, link}]) => (
              <Link href={link} className="duration-200 hover:text-neutral-400" key={key}>
                {text}
              </Link>
            ))}
          </div>
        </div>

        <HeaderAuth session={session} websitePaths={websitePaths} />
      </div>
    </header>
  )
}
