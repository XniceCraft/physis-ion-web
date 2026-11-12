import { BrandIcon } from '@/components/icon/brand'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'
import { BellIcon, UserIcon } from '@phosphor-icons/react/ssr'
import { cn } from 'cn'

export function Navbar({ variant }: { variant?: 'default' | 'white' }) {
  const { user } = usePage().props

  return (
    <header className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between')}>
      <div className="flex items-center gap-3">
        <BrandIcon />
        <div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                'font-heading text-lg font-bold tracking-tight',
                variant == 'white' ? 'text-white' : ' text-slate-900'
              )}
            >
              Physis
            </span>
            <span
              className={cn(
                'font-heading text-lg font-extrabold tracking-tight',
                variant == 'white' ? 'text-white' : ' text-blue-600'
              )}
            >
              ION
            </span>
          </div>
          <p className={cn('text-xs', variant == 'white' ? 'text-white' : 'text-muted-foreground')}>
            Eco-Enzyme Fermentation Monitor
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        {user ? (
          <>
            <Button
              size="icon-lg"
              variant="ghost"
              className={cn(
                'bg-black/20 rounded-full',
                variant == 'white' ? 'text-white' : 'text-black'
              )}
            >
              <BellIcon />
            </Button>
            <Button
              size="icon-lg"
              variant="ghost"
              className={cn(
                'bg-black/20 rounded-full',
                variant == 'white' ? 'text-white' : 'text-black'
              )}
            >
              <UserIcon />
            </Button>
          </>
        ) : null}
      </div>
    </header>
  )
}
