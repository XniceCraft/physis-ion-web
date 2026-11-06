import { BrandIcon } from '@/components/icon/brand'
import { Button } from '@/components/ui/button'
import { BellIcon } from '@phosphor-icons/react/ssr'

export function Navbar() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <BrandIcon />
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
              Physis
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-blue-600">
              ION
            </span>
          </div>
          <p className="text-muted-foreground text-xs">Eco-Enzyme Fermentation Monitor</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <Button size="icon-lg" variant="ghost">
          <BellIcon />
        </Button>
      </div>
    </header>
  )
}
