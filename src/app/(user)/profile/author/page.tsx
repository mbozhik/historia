import Container from '#/Global/Container'
import Hero from '##/user/profile/Hero'
import Navigation from '##/user/profile/Navigation'
import Heading from '#/UI/Heading'

import {Plus} from 'lucide-react'

export default async function ProfilePage() {
  return (
    <Container dataSection="user-profile" className="space-y-14 xl:space-y-10 sm:space-y-8">
      <section className="space-y-10 sm:space-y-5">
        <Hero />

        <Navigation />
      </section>

      <section className="mx-auto px-10 py-6 sm:px-6 sm:py-4 w-fit flex flex-col items-center gap-4 sm:gap-2 bg-secondary rounded-[24px] cursor-pointer">
        <Heading text="Добавить работу" type="h3" className="text-center text-primary" />
        <Plus className="s-12 xl:s-10 sm:s-8 text-primary" />
      </section>
    </Container>
  )
}
