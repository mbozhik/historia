'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'

import Link from 'next/link'
import Image from 'next/image'
import SignInImage from '%/auth/sign-in.jpg'

import Heading from '#/UI/Heading'
import Input from '#/UI/Input'
import Button from '#/UI/Button'
const screenHeight = 'h-svh h-screen'

const schema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type FormFields = z.infer<typeof schema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({resolver: zodResolver(schema)})

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const {login, password} = data

      await signIn('credentials', {
        login: login,
        password: password,
        redirect: true,
        callbackUrl: '/',
      })
    } catch (error) {
      setError('root', {
        message: 'Something went wrong',
      })
      throw new Error()
    }
  }

  const gridConfig = {
    parent: 'grid-cols-10',
    form: 'col-span-4 md:col-span-5',
    image: 'col-span-6 md:col-span-5',
  }

  return (
    <section data-section="sign-in" className={`grid place-items-center space-y-5 ${screenHeight}`}>
      <div className={`grid ${gridConfig.parent} sm:block items-center p-10 md:p-6 sm:px-4 sm:py-10 gap-10 md:gap-6 w-[50%] min-h-[60vh] xl:w-[60%] md:w-[90%] sm:min-h-0 bg-background-alt rounded-4xl shadow-[0_4px_40px_0px_rgba(0,0,0,0.05)]`}>
        <form className={`flex flex-col justify-between gap-10 xl:gap-7 ${gridConfig.form} col-s`} onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center sm:-space-y-1">
            <Heading type="h1" text="Welcome <br /> to Historia" className={`mb-2 text-center`} />
            <p className="text-lg xl:text-base">New fanfiction platform </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input name="login" register={register} type="text" placeholder="Username" autoComplete="username" error={errors.login} />
              <Input name="password" register={register} type="password" placeholder="Password" autoComplete="current-password" error={errors.password} />
            </div>

            <div className="space-y-2 md:space-y-3">
              <Button buttonText="Sign in" className="w-full" isSubmitting={isSubmitting} error={errors.root} />
              <div className="flex gap-2 mx-auto text-sm md:gap-3 xl:gap-3 w-fit">
                <span>Is it our first meeting?</span>
                <Link className="font-medium underline duration-200 text-primary hover:no-underline" href="/sign-up">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </form>

        <Image quality={100} className={`sm:hidden block object-cover rounded-4xl s-full ${gridConfig.image}`} src={SignInImage} alt="Sign in" />
      </div>
    </section>
  )
}
