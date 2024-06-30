import {cn} from '@/lib/utils'

export interface InputProps {
  name: string
  register: Function
  className?: string
  type: string
  placeholder: string
  autoComplete: string
  error?: {message?: string}
}

export default function Input({name, register, className, type, placeholder, autoComplete, error}: InputProps) {
  return (
    <>
      <input {...register(name)} className={cn('px-4 py-2 rounded-md bg-background text-custom-grey text-lg outline-2 focus:outline-primary', className)} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      {error && <span className="text-sm text-tags-warning">{error.message}</span>}
    </>
  )
}
