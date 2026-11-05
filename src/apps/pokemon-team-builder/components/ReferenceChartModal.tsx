import React from 'react'
import { POKEMON_TYPES } from '../data/pokemon-types'
import { getSingleTypeAttack } from '../data/type-matchups'
import { X } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface ReferenceChartModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReferenceChartModal: React.FC<ReferenceChartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Official 18-Type Matchup Reference
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Rows = Attacking Type • Columns = Defending Type
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-auto flex-1">
          <table className="w-full text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 p-2 text-left font-bold">
                  ATK \ DEF
                </th>
                {POKEMON_TYPES.map((t) => (
                  <th key={t.id} className="p-1 text-center font-bold">
                    <div
                      style={{ backgroundColor: t.color, color: t.textColor || '#fff' }}
                      className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold"
                    >
                      {t.name.slice(0, 3)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {POKEMON_TYPES.map((attacker) => (
                <tr key={attacker.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="sticky left-0 z-10 bg-white dark:bg-gray-900 p-2 font-bold flex items-center gap-1.5">
                    <span
                      style={{ backgroundColor: attacker.color }}
                      className="w-2.5 h-2.5 rounded-full inline-block"
                    />
                    <span className="text-[11px] text-gray-800 dark:text-gray-200">
                      {attacker.name}
                    </span>
                  </td>
                  {POKEMON_TYPES.map((defender) => {
                    const val = getSingleTypeAttack(attacker.id, defender.id)
                    let text = '1'
                    let cellClass = 'text-gray-300 dark:text-gray-600'
                    if (val === 1) {
                      text = '2'
                      cellClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                    } else if (val === -1) {
                      text = '½'
                      cellClass = 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    } else if (val === -100) {
                      text = '0'
                      cellClass = 'bg-purple-900 text-purple-200 dark:bg-purple-950 dark:text-purple-300 font-extrabold'
                    }

                    return (
                      <td key={defender.id} className="p-1 text-center">
                        <span className={cn('inline-block w-6 py-0.5 rounded text-[10px]', cellClass)}>
                          {text === '1' ? '—' : text}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
