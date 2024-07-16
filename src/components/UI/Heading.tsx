import {cn} from '@/lib/utils'

interface Props {
  type: 'h1' | 'h2' | 'h3'
  text: string
  className?: string
}

const Heading: React.FC<Props> = ({type, text, className}) => {
  if (type === 'h1') {
    return <h1 className={cn('text-6xl xl:text-5xl sm:leading-[1.10]', 'font-semibold tracking-tight', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'h2') {
    return <h2 className={cn('text-5xl xl:text-4xl sm:text-3xl', 'font-medium tracking-tight', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'h3') {
    return <h3 className={cn('text-4xl xl:text-3xl sm:text-2xl', 'font-medium tracking-tight', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
