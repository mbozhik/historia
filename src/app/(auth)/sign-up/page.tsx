'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'
import {signIn} from 'next-auth/react'

import Input from '#/UI/Input'
import Button from '#/UI/Button'
import {api} from '@/lib/backendApi'

const screenHeight = 'h-svh h-screen'

const schema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().min(3, 'Phone number must be at least 3 digits long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type FormFields = z.infer<typeof schema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({resolver: zodResolver(schema)})

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(api.url + api.routes.new_user, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('User registered successfully', response.data)

      await signIn('credentials', {
        login: data.login,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      })
    } catch (error) {
      console.error('Error registering user', error)
      setError('root', {
        message: 'Something went wrong',
      })
    }
  }

  return (
    <section data-section="sign-up" className={`grid place-items-center space-y-5 ${screenHeight}`}>
      <form className="flex flex-col p-5 w-[15%] gap-2 rounded-sm bg-neutral-100" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-xl">Register</h1>

        <Input name="login" register={register} type="text" placeholder="Username" autoComplete="username" error={errors.login} />
        <Input name="email" register={register} type="email" placeholder="Email" autoComplete="email" error={errors.email} />
        <Input name="phone_number" register={register} type="text" placeholder="Phone Number" autoComplete="tel" error={errors.phone_number} />
        <Input name="password" register={register} type="password" placeholder="Password" autoComplete="new-password" error={errors.password} />

        <Button buttonText="Create user" className="w-full" isSubmitting={isSubmitting} error={errors.root} />
      </form>
    </section>
  )
}
