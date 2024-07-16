import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Container from '#/Global/Container'
import Hero from '##/user/profile/Hero'
import Navigation from '##/user/profile/Navigation'
import Heading from '#/UI/Heading'
import Button from '@/components/UI/Button'

export default async function ProfilePage() {
  const session = await getServerSession(options)

  return (
    <Container dataSection="user-profile" className="space-y-14 sm:space-y-8">
      <section className="space-y-10 sm:space-y-5">
        <Hero session={session} />

        <Navigation />
      </section>

      <section className="space-y-4">
        <Heading text="Новая коллекция" type="h2" className="text-center text-custom-grey" />
        <Button buttonText="Создать" className="mx-auto" />
      </section>
    </Container>
  )
}
