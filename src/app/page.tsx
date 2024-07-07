import {getServerSession} from 'next-auth/next'
import {options} from '@/app/api/auth/[...nextauth]/options'

import Image from 'next/image'
import SignInImage from '%/auth/sign-in.jpg'

import {cn} from '@/lib/utils'
import Container from '#/Global/Container'

export default async function IndexPage() {
  const session = await getServerSession(options)
  // console.log(session)

  return (
    <Container>
      {/* <mark className={cn('w-full text-center', session ? 'bg-green-400' : 'bg-red-500')}>{session ? session.user.email : 'NO USER'}</mark> */}

      <div className="w-[30vw] xl:w-[35vw] md:w-[40vh] mx-auto p-1.5 bg-primary rounded-2xl border-4 border-background hover:ring-4 hover:ring-[#33595a80] duration-300">
        <Image quality={100} className={`block object-cover rounded-lg s-full`} src={SignInImage} alt="Sign in" />
      </div>
    </Container>
  )
}
