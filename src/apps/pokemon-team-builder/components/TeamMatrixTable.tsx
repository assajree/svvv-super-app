import React from 'react'
import type { TeamMember } from '../types'
import { POKEMON_TYPES, getTypeById } from '../data/pokemon-types'
import { getAttackVsDefender, getDamageMultiplier } from '../logic/effectiveness'
import { getSingleTypeAttack } from '../data/type-matchups'
import { Shield, Swords } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface TeamMatrixTableProps {
  team: TeamMember[]
  onSelectSlot: (slotIndex: number) => void
}

export const TeamMatrixTable: React.FC<TeamMatrixTableProps> = ({ team, onSelectSlot }) => {
  const activeMembers = team.filter((m) => m.primaryTypeId > 0)

  if (activeMembers.length === 0) {
    return null
  }

  // Calculate defensive totals per attack type
  const defensiveSummaryPerType = POKEMON_TYPES.map((attackType) => {
    let weakCount = 0
    let resistCount = 0
    let immuneCount = 0

    for (const member of activeMembers) {
      const score = getAttackVsDefender(member, attackType.id)
      if (score <= -100) immuneCount += 1
      else if (score < 0) resistCount += 1
      else if (score > 0) weakCount += 1
    }

    return {
      typeId: attackType.id,
      weakCount,
      resistCount,
      immuneCount,
    }
  })

  // Calculate offensive super-effective hits against each defending type
  const offensiveSummaryPerType = POKEMON_TYPES.map((defendingType) => {
    let seCount = 0

    for (const member of activeMembers) {
      const atk1 = getSingleTypeAttack(member.primaryTypeId, defendingType.id)
      const atk2 =
        member.secondaryTypeId > 0
          ? getSingleTypeAttack(member.secondaryTypeId, defendingType.id)
          : -1

      if (atk1 > 0 || atk2 > 0) {
        seCount += 1
      }
    }

    return {
      typeId: defendingType.id,
      seCount,
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm overflow-hidden">
      {/* Table Header / Title */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Team Defense Matrix (18 Types Matchup)
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            How each member defends against each incoming attack type
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold">
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
            Weak (2x/4x)
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Resist (½x/¼x)
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            Immune (0x)
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Offense (2x)
          </span>
        </div>
      </div>

      {/* Horizontal Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700">
              <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-900 p-2.5 text-left font-bold text-gray-700 dark:text-gray-300 min-w-[140px] shadow-sm">
                Team Member
              </th>
              {POKEMON_TYPES.map((t) => (
                <th
                  key={t.id}
                  className="p-1.5 text-center font-bold min-w-[42px] max-w-[48px]"
                  title={t.name}
                >
                  <div
                    style={{ backgroundColor: t.color, color: t.textColor || '#fff' }}
                    className="w-full py-1 rounded text-[10px] font-bold uppercase truncate"
                  >
                    {t.name.slice(0, 3)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {activeMembers.map((member) => (
              <tr
                key={member.slotIndex}
                className="hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-colors"
              >
                {/* Left sticky column: Member Info */}
                <td
                  onClick={() => onSelectSlot(member.slotIndex)}
                  className="sticky left-0 z-10 bg-white dark:bg-gray-800 p-2.5 cursor-pointer shadow-sm hover:text-blue-500"
                >
                  <div className="flex items-center gap-2">
                    {member.spriteUrl ? (
                      <img
                        src={member.spriteUrl}
                        alt="Sprite"
                        className="w-7 h-7 object-contain"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-[10px]">
                        #{member.slotIndex + 1}
                      </div>
                    )}
                    <div className="truncate">
                      <div className="font-bold text-gray-900 dark:text-white truncate">
                        {member.pokemonName || `Slot #${member.slotIndex + 1}`}
                      </div>
                      <div className="flex gap-1 mt-0.5">
                        <span className="text-[9px] text-gray-500 font-medium">
                          {getTypeById(member.primaryTypeId).name}
                          {member.secondaryTypeId > 0
                            ? `/${getTypeById(member.secondaryTypeId).name}`
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 18 Effectiveness Cells */}
                {POKEMON_TYPES.map((attackType) => {
                  const score = getAttackVsDefender(member, attackType.id)
                  const { label, tone } = getDamageMultiplier(score)

                  return (
                    <td key={attackType.id} className="p-1 text-center">
                      <span
                        className={cn(
                          'inline-block w-8 py-0.5 rounded text-[11px] font-bold text-center select-none',
                          tone === 'immune' &&
                            'bg-purple-900 text-purple-200 dark:bg-purple-950 dark:text-purple-300 font-extrabold',
                          tone === 'resist-heavy' &&
                            'bg-emerald-600 text-white font-extrabold',
                          tone === 'resist' &&
                            'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
                          tone === 'neutral' &&
                            'text-gray-300 dark:text-gray-600 font-normal',
                          tone === 'weak' &&
                            'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold',
                          tone === 'weak-heavy' &&
                            'bg-red-600 text-white font-extrabold animate-pulse'
                        )}
                      >
                        {label === '1x' ? '—' : label}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}

            {/* Defensive Summary Row */}
            <tr className="bg-gray-50/90 dark:bg-gray-900/80 font-bold border-t-2 border-gray-200 dark:border-gray-700">
              <td className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-900 p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                  <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="text-xs">Defense Summary</span>
                </div>
                <div className="text-[9px] text-gray-400 font-normal mt-0.5">
                  Weak (-) vs Resist (+)
                </div>
              </td>
              {defensiveSummaryPerType.map((defSummary) => (
                <td key={defSummary.typeId} className="p-1 text-center font-mono text-[10px]">
                  {defSummary.weakCount > 0 && (
                    <span className="text-red-600 dark:text-red-400 block font-bold">
                      -{defSummary.weakCount}
                    </span>
                  )}
                  {defSummary.resistCount + defSummary.immuneCount > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 block font-bold">
                      +{defSummary.resistCount + defSummary.immuneCount}
                    </span>
                  )}
                  {defSummary.weakCount === 0 &&
                    defSummary.resistCount === 0 &&
                    defSummary.immuneCount === 0 && (
                      <span className="text-gray-400">0</span>
                    )}
                </td>
              ))}
            </tr>

            {/* Offensive Summary Row */}
            <tr className="bg-amber-50/30 dark:bg-amber-950/15 font-bold border-t border-gray-200 dark:border-gray-800">
              <td className="sticky left-0 z-10 bg-amber-50/70 dark:bg-gray-900 p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                  <Swords className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-xs">Offense Summary</span>
                </div>
                <div className="text-[9px] text-gray-400 font-normal mt-0.5">
                  Super-Effective (2x) hits
                </div>
              </td>
              {offensiveSummaryPerType.map((offSummary) => (
                <td key={offSummary.typeId} className="p-1 text-center font-mono text-[10px]">
                  {offSummary.seCount > 0 ? (
                    <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                      +{offSummary.seCount}
                    </span>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600 font-normal">—</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
