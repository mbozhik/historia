import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Container from '#/Global/Container'
import Hero from '##/user/profile/Hero'
import Navigation from '##/user/profile/Navigation'

export default async function ProfilePage() {
  const session = await getServerSession(options)

  return (
    <Container dataSection="user-profile" className="space-y-10">
      <Hero session={session} />

      <Navigation />

      <section>
        <p>Читательский кабинет</p>
      </section>
    </Container>
  )
}
