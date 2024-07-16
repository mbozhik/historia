'use client'

import {isMobile} from '@bozzhik/is-mobile'

import {websitePaths} from '@/lib/constants'
import {usePathname} from 'next/navigation'

import Link from 'next/link'
import Text from '#/UI/Text'

function Navigation() {
  const pathname = usePathname()
  const links = [websitePaths.profile.reader, websitePaths.profile.author, websitePaths.profile.settings]

  return (
    <div className="flex items-center justify-center gap-7 sm:gap-5">
      {links.map(({link, text, text_mobile}) => (
        <Link key={link} href={link} className="group">
          <Text type="h4" text={isMobile ? text_mobile : text} className={`group-hover:text-primary duration-200 ${pathname === link ? 'text-primary' : ''}`} />
        </Link>
      ))}
    </div>
  )
}

export default Navigation
