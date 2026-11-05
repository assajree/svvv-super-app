import React from 'react'
import type { TeamMember } from '../types'
import { TypeBadge } from './TypeBadge'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface TeamSlotCardProps {
  slotNumber: number
  member: TeamMember
  onEdit: () => void
  onClear: () => void
}

export const TeamSlotCard: React.FC<TeamSlotCardProps> = ({
  slotNumber,
  member,
  onEdit,
  onClear,
}) => {
  const isEmpty = member.primaryTypeId === 0

  if (isEmpty) {
    return (
      <div
        onClick={onEdit}
        className={cn(
          'group relative flex flex-col items-center justify-center p-4 min-h-[140px] rounded-2xl',
          'border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400',
          'bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm cursor-pointer transition-all duration-200',
          'hover:shadow-md hover:bg-blue-50/30 dark:hover:bg-blue-950/20 active:scale-[0.98]'
        )}
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
        </div>
        <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          Slot {slotNumber} • Add Pokemon
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-4 min-h-[140px] rounded-2xl',
        'bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 shadow-sm',
        'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200'
      )}
    >
      {/* Top Header: Slot Number & Action buttons */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-wider">
          SLOT #{slotNumber}
        </span>
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Edit member"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Remove from team"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Body: Sprite or Icon + Name */}
      <div className="flex items-center gap-3 my-2 cursor-pointer" onClick={onEdit}>
        {member.spriteUrl ? (
          <img
            src={member.spriteUrl}
            alt={member.pokemonName || 'Pokemon'}
            className="w-14 h-14 object-contain filter drop-shadow hover:scale-110 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            #{slotNumber}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
            {member.pokemonName || `Type Build #${slotNumber}`}
          </h4>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <TypeBadge typeId={member.primaryTypeId} size="sm" />
            {member.secondaryTypeId > 0 && (
              <TypeBadge typeId={member.secondaryTypeId} size="sm" />
            )}
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 pt-1 border-t border-gray-100 dark:border-gray-800">
        <span>{member.secondaryTypeId > 0 ? 'Dual Type' : 'Pure Type'}</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Change
        </button>
      </div>
    </div>
  )
}
