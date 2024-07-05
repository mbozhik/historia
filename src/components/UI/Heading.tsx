import {cn} from '@/lib/utils'

interface Props {
  type: 'h1' | 'h2'
  text: string
  className?: string
}

const Heading: React.FC<Props> = ({type, text, className}) => {
  if (type === 'h1') {
    return <h1 className={cn(`text-6xl xl:text-5xl font-semibold tracking-tight sm:leading-[1.10]`, className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'h2') {
    return <h2 className={cn('text-3xl font-light', className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
