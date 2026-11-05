import React from 'react'
import type { RecommendedTypeItem, TeamMember, TypeCover } from '../types'
import { TypeBadge } from './TypeBadge'
import { ShieldCheck, Crosshair, CheckCircle2, AlertTriangle } from 'lucide-react'

interface RecommendationPanelProps {
  team: TeamMember[]
  coverMap: Map<number, TypeCover>
  notCoverTypes: number[]
  fragileDefenseTypes?: number[]
  notSuperEffectTypes: number[]
  defensiveRecommendations: RecommendedTypeItem[]
  offensiveRecommendations: RecommendedTypeItem[]
  onQuickAddType?: (typeId: number) => void
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  team,
  notCoverTypes,
  fragileDefenseTypes = [],
  notSuperEffectTypes,
  defensiveRecommendations,
  offensiveRecommendations,
  onQuickAddType,
}) => {
  const activeCount = team.filter((m) => m.primaryTypeId > 0).length

  if (activeCount === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-sm text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add at least 1 Pokemon or Type to your team to see real-time defensive & offensive recommendations.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Defensive Recommendation Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Defensive Weakness Coverage
            </h4>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {notCoverTypes.length > 0 ? (
              <span>
                Your team has defensive vulnerability against{' '}
                <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                  {notCoverTypes.length}
                </strong>{' '}
                attack type{notCoverTypes.length > 1 ? 's' : ''}.
              </span>
            ) : fragileDefenseTypes.length > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                ทีมไม่มีจุดอ่อนเต็มตัว แต่มีแนวรับที่เปราะบาง แนะนำให้เสริมธาตุเหล่านี้
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                ทีมของคุณไม่มีจุดอ่อนที่เปิดโล่งแล้ว! การตั้งรับของทีมมีความสมดุลยอดเยี่ยม
              </span>
            )}
          </p>

          {/* Weaknesses list */}
          {notCoverTypes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-[11px] font-medium text-gray-400 mr-1 self-center">
                Vulnerable to:
              </span>
              {notCoverTypes.map((typeId) => (
                <TypeBadge key={typeId} typeId={typeId} size="sm" />
              ))}
            </div>
          )}

          {/* Fragile Defense Warning (Only 1 defender) */}
          {fragileDefenseTypes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3 text-xs">
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Fragile Defense (มีตัวต้านตัวเดียว):</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {fragileDefenseTypes.map((typeId) => (
                  <TypeBadge key={typeId} typeId={typeId} size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Types to counter / reinforce */}
        {defensiveRecommendations.length > 0 && (
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {notCoverTypes.length === 0
                ? 'Best Types to Reinforce Fragile Defenses:'
                : 'Best Types to Add for Defense:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {defensiveRecommendations.map((rec) => (
                <div
                  key={rec.typeId}
                  onClick={() => onQuickAddType?.(rec.typeId)}
                  className="cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  title="Click to add to next open slot"
                >
                  <TypeBadge typeId={rec.typeId} size="md" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Offensive Super-Effective Coverage Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Crosshair className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Offensive Super-Effective Reach
            </h4>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {notSuperEffectTypes.length > 0 ? (
              <span>
                Missing super-effective coverage against{' '}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {notSuperEffectTypes.length}
                </strong>{' '}
                type{notSuperEffectTypes.length > 1 ? 's' : ''}.
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Incredible! You have super-effective attacks against all 18 types.
              </span>
            )}
          </p>

          {/* Missing Super-effective targets */}
          {notSuperEffectTypes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              <span className="text-[11px] font-medium text-gray-400 mr-1 self-center">
                Uncovered targets:
              </span>
              {notSuperEffectTypes.slice(0, 8).map((typeId) => (
                <TypeBadge key={typeId} typeId={typeId} size="sm" />
              ))}
              {notSuperEffectTypes.length > 8 && (
                <span className="text-[11px] text-gray-400 self-center">
                  +{notSuperEffectTypes.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Recommended Types to add for offensive coverage */}
        {offensiveRecommendations.length > 0 && (
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Best Types to Add for Offense:
            </div>
            <div className="flex flex-wrap gap-2">
              {offensiveRecommendations.map((rec) => (
                <div
                  key={rec.typeId}
                  onClick={() => onQuickAddType?.(rec.typeId)}
                  className="cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  title="Click to add to next open slot"
                >
                  <TypeBadge typeId={rec.typeId} size="md" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
