import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Image from 'next/image'
import DefaultAvatarImage from '%/auth/default_avatar.jpg'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'

export default async function ProfilePage() {
  const session = await getServerSession(options)

  return (
    <Container className="space-y-10">
      <section className="flex items-center justify-center gap-5">
        <div className="w-20 overflow-hidden rounded-full">
          <Image src={DefaultAvatarImage} alt="Avatar" width={100} height={100} className="object-cover s-full" />
        </div>
        {session && <Heading type="h2" text={session.user.login} className="text-center" />}
      </section>

      <section>
        <div className="flex items-center justify-center gap-7">
          <Text type="h4" text="Авторский кабинет" />
          <Text type="h4" text="Читательский кабинет" />
          <Text type="h4" text="Настройки" />
        </div>
      </section>
    </Container>
  )
}
