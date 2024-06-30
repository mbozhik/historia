'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'

import Input from '#/UI/Input'
import Button from '#/UI/Button'
const screenHeight = 'h-svh h-screen'

import Image from 'next/image'
import SignInImage from '%/auth/sign-in.jpg'

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
    auth: 'col-span-4 md:col-span-5',
    image: 'col-span-6 md:col-span-5',
  }

  return (
    <section data-section="sign-in" className={`grid place-items-center space-y-5 ${screenHeight}`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`grid ${gridConfig.parent} items-center p-10 gap-10 w-[50%] min-h-[60vh] bg-background-alt rounded-4xl shadow-[0_4px_40px_0px_rgba(0,0,0,0.05)]`}>
        <form className={`flex flex-col justify-between gap-10 ${gridConfig.auth} col-s`}>
          <div className="text-center">
            <h1 className="mb-2 text-6xl font-semibold tracking-tight">
              Welcome <br /> to Historia
            </h1>
            <p className="text-lg">New fanfiction platform </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Input name="login" register={register} type="text" placeholder="Username" autoComplete="username" error={errors.login} />
              <Input name="password" register={register} type="password" placeholder="Password" autoComplete="current-password" error={errors.password} />
            </div>

            <Button buttonText="Sign in" className="w-full" isSubmitting={isSubmitting} error={errors.root} />
          </div>
        </form>

        <Image quality={100} className={`block object-cover rounded-xl s-full ${gridConfig.image}`} src={SignInImage} alt="Sign in" />
      </div>
    </section>
  )
}
