'use client'

import {useState} from 'react'
import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'
import {signIn} from 'next-auth/react'

import Image from 'next/image'
import DefaultAvatarImage from '%/auth/default_avatar.jpg'

import Input from '#/UI/Input'
import Button from '#/UI/Button'
import {api} from '@/lib/backendApi'

const schema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().min(3, 'Phone number must be at least 3 digits long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type FormFields = z.infer<typeof schema>

export default function SignUp() {
  const [avatar, setAvatar] = useState<File | null>(null)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0])
    }
  }

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

      const userId = response.data.id

      if (avatar) {
        const formData = new FormData()
        formData.append('file', avatar)
        formData.append('filename', avatar.name)
        formData.append('content_type', avatar.type)
        formData.append('user_id', userId.toString())

        console.log('File:', formData.get('file'))
        console.log('Filename:', formData.get('filename'))
        console.log('Content Type:', formData.get('content_type'))
        console.log('User ID:', formData.get('user_id'))

        await axios.post(api.url + api.routes.user_avatar, formData)
        console.log('Avatar uploaded successfully')
      }

      await signIn('credentials', {
        login: data.login,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      })
    } catch (error) {
      console.error('Error registering user or uploading avatar', error)
      setError('root', {
        message: 'Something went wrong',
      })
    }
  }

  const gridConfig = {
    parent: 'grid-cols-10',
    text: 'col-span-4 md:col-span-5',
    form: 'col-span-6 md:col-span-5',
  }

  return (
    <section data-section="sign-up" className="grid place-items-center space-y-5 SCREEN_HEIGHT">
      <div className={`grid ${gridConfig.parent} sm:block items-center p-10 md:p-6 sm:px-4 sm:py-10 gap-10 md:gap-6 w-[50%] min-h-[60vh] xl:w-[60%] md:w-[90%] sm:min-h-0 bg-background-alt rounded-4xl shadow-[0_4px_40px_0px_rgba(0,0,0,0.05)]`}>
        <h1 className={`mb-2 text-6xl text-center font-semibold tracking-tight xl:text-5xl sm:leading-[1.10] ${gridConfig.text}`}>
          Welcome <br /> to Historia
        </h1>

        <form className={`flex flex-col gap-5 bg-background rounded-lg p-5 ${gridConfig.form}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="s-24 overflow-hidden mx-auto rounded-full transition-opacity duration-500">
              <Image src={avatar ? URL.createObjectURL(avatar) : DefaultAvatarImage} alt="Avatar" width={100} height={100} className="object-cover s-full" />
            </div>
            <label className="block mx-auto w-fit underline hover:no-underline cursor-pointer">
              {avatar ? 'Change avatar' : 'Upload avatar'}
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/jpeg, image/png" />
            </label>
          </div>
          <div className="space-y-1.5 [&>*]:bg-background-alt">
            <Input name="login" register={register} type="text" placeholder="Username" autoComplete="username" error={errors.login} />
            <Input name="email" register={register} type="email" placeholder="Email" autoComplete="email" error={errors.email} />
            <Input name="phone_number" register={register} type="text" placeholder="Phone Number" autoComplete="tel" error={errors.phone_number} />
            <Input name="password" register={register} type="password" placeholder="Password" autoComplete="new-password" error={errors.password} />
          </div>

          <Button buttonText="Create user" className="w-full" isSubmitting={isSubmitting} error={errors.root} />
        </form>
      </div>
    </section>
  )
}
