import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LinkButton = ({ to, variant = 'default', size = 'default', className, children, ...props }) => {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export { LinkButton }