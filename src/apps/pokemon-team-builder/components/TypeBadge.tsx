import React from 'react'
import type { PokemonType } from '../types'
import { getTypeById } from '../data/pokemon-types'
import { cn } from '../../../lib/utils'

interface TypeBadgeProps {
  typeId: number
  type?: PokemonType
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  typeId,
  type,
  size = 'md',
  className,
  onClick,
}) => {
  const t = type ?? getTypeById(typeId)
  if (t.id === 0) return null

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 font-bold tracking-widest',
  }

  return (
    <span
      onClick={onClick}
      style={{ backgroundColor: t.color, color: t.textColor || '#ffffff' }}
      className={cn(
        'inline-flex items-center justify-center rounded-lg uppercase shadow-sm transition-transform select-none',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        className
      )}
    >
      {t.name}
    </span>
  )
}
