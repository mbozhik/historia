import {getSession} from '@/lib/getSession'

import Image from 'next/image'
import DefaultAvatarImage from '%/auth/default_avatar.jpg'

import Heading from '#/UI/Heading'

export default async function Hero() {
  const session = await getSession()

  return (
    <section className="flex items-center justify-center gap-5 sm:gap-3">
      <div className="w-20 overflow-hidden rounded-full xl:w-16 sm:w-12">
        <Image src={DefaultAvatarImage} alt="Avatar" width={100} height={100} className="object-cover s-full" />
      </div>
      {session && <Heading type="h2" text={session.user.login} className="text-center" />}
    </section>
  )
}
