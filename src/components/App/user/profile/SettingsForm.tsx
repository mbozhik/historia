'use client'

import {useForm} from 'react-hook-form'

import Heading from '#/UI/Heading'
import Input from '#/UI/Input'
import Button from '#/UI/Button'

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
    formState: {errors, isSubmitting},
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="space-y-5">
        <div className="space-y-7">
          <FormInput text="Изменить логин" name="username" type="text" placeholder={session.user.login} register={register} errors={errors} />
          <FormInput text="Изменить почту" name="email" type="email" placeholder={session.user.email} register={register} errors={errors} />
          <FormInput text="Изменить пароль" name="password" type="text" placeholder="••••••" register={register} errors={errors} />
        </div>

        <Button buttonText="Сохранить" className="w-full mt-4" isSubmitting={isSubmitting} />
      </section>
    </form>
  )
}
