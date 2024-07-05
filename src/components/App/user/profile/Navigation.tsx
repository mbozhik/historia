'use client'

import {websitePaths} from '@/lib/constants'
import {usePathname} from 'next/navigation'

import Link from 'next/link'
import Text from '#/UI/Text'

export default function Navigation() {
  const pathname = usePathname()
  const links = [websitePaths.profile.reader, websitePaths.profile.author, websitePaths.profile.settings]

  return (
    <div className="flex items-center justify-center gap-7">
      {links.map(({link, text}) => (
        <Link key={link} href={link} className="group">
          <Text type="h4" text={text} className={`group-hover:text-primary duration-200 ${pathname === link ? 'text-primary' : ''}`} />
        </Link>
      ))}
    </div>
  )
}
