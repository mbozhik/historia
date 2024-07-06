import Link from 'next/link'
import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import ChangeLogin from '##/user/profile/settings/ChangeLogin'

export default function ProfilePage() {
  return (
    <>
      <Container dataSection="user-profile" className="space-y-5">
        <Heading type="h2" text="Настройки аккаунта" className="text-center" />
        <Link href="/profile/reader" className="block text-primary hover:text-primary-hover duration-200">{`<— вернуться в личный кабинет`}</Link>
      </Container>

      <Container dataSection="user-profile-inputs" className="mt-10" width="1/2" padding={false}>
        <ChangeLogin />
      </Container>
    </>
  )
}
