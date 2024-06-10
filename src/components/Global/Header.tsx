import Link from 'next/link'
import {containerSize} from '#/Global/Container'

export const headerData = {
  main: {
    about: {
      text: 'О нас',
      link: '/about',
    },
    contacts: {
      text: 'Контакты',
      link: '/contacts',
    },
  },
  account: {
    'sign-in': {
      text: 'Войти',
      link: '/api/auth/signin',
    },
    register: {
      text: 'Создать аккаунт',
      link: '/register',
    },
  },
}

export default async function Header() {
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
        {Object.entries(headerData.account).map(([key, {text, link}]) => (
          <Link href={link} className="duration-200 hover:text-neutral-400" key={key}>
            {text}
          </Link>
        ))}
      </div>
    </header>
  )
}
