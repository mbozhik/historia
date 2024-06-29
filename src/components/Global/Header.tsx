import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Link from 'next/link'
import {containerSize} from '#/Global/Container'
import {headerData} from '@/lib/constants'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className={`flex items-center justify-between py-4 text-xl sm:text-lg font-book mx-auto ${containerSize['2/3']}`}>
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

      <div className="space-x-4 sm:hidden">
        {session ? (
          <>
            <Link href="/" className="duration-200 hover:text-neutral-400">
              {session.user.email}
            </Link>
            <Link href={headerData.account.sign_out.link} className="duration-200 hover:text-neutral-400">
              {headerData.account.sign_out.text}
            </Link>
          </>
        ) : (
          <>
            <Link href={headerData.account.sign_in.link} className="duration-200 hover:text-neutral-400">
              {headerData.account.sign_in.text}
            </Link>
            {/* <Link href={headerData.account.register.link} className="duration-200 hover:text-neutral-400">
              {headerData.account.register.text}
            </Link> */}
          </>
        )}
      </div>
    </header>
  )
}
