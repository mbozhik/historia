'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'

import {cn} from '@/lib/utils'
import Input from '#/UI/Input'
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

  return (
    <section data-section="sign-in" className={`grid place-items-center space-y-5 ${screenHeight}`} onSubmit={handleSubmit(onSubmit)}>
      <form className="flex flex-col p-5 w-[15%] gap-2 bg-background-alt rounded-4xl">
        <h1 className="mb-2 text-xl">Sign in</h1>

        <Input name="login" register={register} type="text" placeholder="Username" autoComplete="username" error={errors.login} />
        <Input name="password" register={register} type="password" placeholder="Password" autoComplete="current-password" error={errors.password} />

        <button className={cn('py-2 duration-200 rounded-md bg-neutral-400 hover:opacity-85', isSubmitting ? 'bg-neutral-200' : '')} disabled={isSubmitting}>
          {isSubmitting ? 'Wait..' : 'Sign in'}
        </button>
        {errors.root && <span className="text-sm text-center text-red-500">{errors.root.message}</span>}
      </form>
    </section>
  )
}
