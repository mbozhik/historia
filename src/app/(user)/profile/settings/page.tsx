import {getSession} from '@/lib/getSession'

import Link from 'next/link'
import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import SettingsForm from '##/user/profile/SettingsForm'

export default async function ProfilePage() {
  const session = await getSession()

  return (
    <>
      <Container dataSection="user-profile" className="space-y-5">
        <Heading type="h2" text="Настройки аккаунта" className="text-center" />
        <Link href="/profile/reader" className="block duration-200 text-primary hover:text-primary-hover">{`<— вернуться в личный кабинет`}</Link>
      </Container>

      <Container dataSection="user-profile-inputs" className="mt-10" width="1/2" padding={false}>
        <SettingsForm session={session} />
      </Container>
    </>
  )
}
