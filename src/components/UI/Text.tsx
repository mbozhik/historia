import {cn} from '@/lib/utils'

interface Props {
  type: 'h4' | 'h5'
  text: string
  className?: string
}

const Heading: React.FC<Props> = ({type, text, className}) => {
  if (type === 'h4') {
    return <h4 className={cn(`text-2xl sm:text-xl tracking-[-0.020em]`, className)} dangerouslySetInnerHTML={{__html: text || ''}} />
  } else if (type === 'h5') {
    return <h5 dangerouslySetInnerHTML={{__html: text || ''}} />
  }
}

export default Heading
