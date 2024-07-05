import Image from 'next/image'
import DefaultAvatarImage from '%/auth/default_avatar.jpg'

import Heading from '#/UI/Heading'

export default function Hero({session}) {
  return (
    <section className="flex items-center justify-center gap-5">
      <div className="w-20 overflow-hidden rounded-full">
        <Image src={DefaultAvatarImage} alt="Avatar" width={100} height={100} className="object-cover s-full" />
      </div>
      {session && <Heading type="h2" text={session.user.login} className="text-center" />}
    </section>
  )
}
