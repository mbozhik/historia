import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  width?: '1/2' | '2/3'
  padding?: boolean
  dataSection?: string
  className?: string
}

export const containerSize = {
  default: 'mx-auto flex-auto',
  '1/2': 'w-[40%] xl:w-[90%]',
  '2/3': 'w-[80%] xl:w-[90%]',
}

export default function Container({children, width = '2/3', padding = true, className, dataSection}: Props) {
  const containerStyles = `${containerSize.default} ${containerSize[width]} ${padding && 'pt-24'} ${cn(className)}`

  return (
    <main className={cn(containerStyles, className)} data-section={dataSection}>
      {children}
    </main>
  )
}
