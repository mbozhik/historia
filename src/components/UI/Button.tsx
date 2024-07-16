import {ButtonHTMLAttributes} from 'react'
import {cn} from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean
  error?: {message?: string}
  className?: string
  buttonText: string
}

function Button({isSubmitting, error, className, buttonText, ...buttonProps}: ButtonProps) {
  return (
    <>
      <button {...buttonProps} className={cn('block w-fit px-6 py-2 text-lg text-custom-white rounded-3xl bg-primary hover:bg-primary-hover duration-300', isSubmitting ? 'bg-neutral-200' : '', className)} disabled={isSubmitting}>
        {isSubmitting ? 'Wait..' : buttonText}
      </button>
      {error && <span className="text-sm text-center text-red-500">{error.message}</span>}
    </>
  )
}

export default Button
