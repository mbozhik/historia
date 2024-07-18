'use client'

import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'

import {api} from '@/lib/backendApi'

import Heading from '#/UI/Heading'
import Input from '#/UI/Input'
import Button from '#/UI/Button'

const schema = z.object({
  login: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
})

type FormFields = z.infer<typeof schema>

const FormInput = ({register, errors, text, name, type, placeholder}) => {
  return (
    <div className="space-y-3.5">
      <Heading type="h3" text={text} className="font-normal" />
      <Input name={name} register={register} type={type} className="bg-background-alt" placeholder={placeholder} error={errors[name]} />
    </div>
  )
}

export default function SettingsForm({session}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({resolver: zodResolver(schema)})

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const payload = {
      user_id: session.user.id,
      ...(data.login && {login: data.login}),
      ...(data.email && {email: data.email}),
      ...(data.password && {password: data.password}),
    }
    console.log('🚀 ~ constonSubmit:SubmitHandler<FormFields>= ~ payload:', payload)
    console.log('🚀 ~ response ~ session.access_token:', session.access_token)

    try {
      const response = await axios.post(api.url + api.routes.update_user, payload, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      console.log('User data updated successfully', response.data)
    } catch (error) {
      setError('root', {
        message: 'Something went wrong',
      })
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="space-y-5">
        <div className="space-y-7">
          <FormInput text="Изменить логин" name="login" type="text" placeholder={session.user.login} register={register} errors={errors} />
          <FormInput text="Изменить почту" name="email" type="email" placeholder={session.user.email} register={register} errors={errors} />
          <FormInput text="Изменить пароль" name="password" type="text" placeholder="••••••" register={register} errors={errors} />
        </div>

        <Button buttonText="Сохранить" className="w-full mt-4" isSubmitting={isSubmitting} />
      </section>
    </form>
  )
}
