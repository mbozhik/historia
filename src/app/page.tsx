import {options} from './api/auth/[...nextauth]/options'
import {getServerSession} from 'next-auth/next'

import {cn} from '@/lib/utils'
import Container from '#/Global/Container'

export default async function IndexPage() {
  const session = await getServerSession(options)

  return (
    <Container>
      <mark className={cn('w-full text-center', session ? 'bg-green-400' : 'bg-red-500')}>{session ? `USER <${session.user.username}>` : 'NO USER'}</mark>
    </Container>
  )
}
