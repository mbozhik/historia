'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'

const screenHeight = 'h-svh h-screen'

const schema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
})

type FormFields = z.infer<typeof schema>

export default function LoginPage() {
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
    <section data-section="sign-in" className={`grid place-items-center ${screenHeight}`} onSubmit={handleSubmit(onSubmit)}>
      <form className="flex flex-col p-5 w-[15%] gap-2 rounded-sm bg-neutral-100">
        <input {...register('login')} className="px-3 py-2 rounded-md bg-neutral-200" type="text" placeholder="username" autoComplete="username" />
        {errors.login && <span className="text-sm text-red-500">{errors.login.message}</span>}

        <input {...register('password')} className="px-3 py-2 rounded-md bg-neutral-200" type="password" placeholder="password" autoComplete="current-password" />
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}

        <button disabled={isSubmitting}>{isSubmitting ? 'Wait..' : 'Sign in'}</button>
        {errors.root && <span className="text-sm text-red-500">{errors.root.message}</span>}
      </form>
    </section>
  )
}
