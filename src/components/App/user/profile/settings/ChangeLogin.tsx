'use client'

import {useForm} from 'react-hook-form'

import Input from '#/UI/Input'
import Button from '#/UI/Button'

export default function ChangeLogin() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="space-y-2">
        <Input name="login" register={register} type="text" className="bg-background-alt" placeholder="New Username" error={errors.login} />
        <Input name="password" register={register} type="password" className="bg-background-alt" placeholder="New Password" error={errors.password} />
        <Input name="email" register={register} type="email" className="bg-background-alt" placeholder="New Email" error={errors.email} />
        <Button buttonText="Update Profile" className="w-full mt-4" isSubmitting={isSubmitting} />
      </section>
    </form>
  )
}
