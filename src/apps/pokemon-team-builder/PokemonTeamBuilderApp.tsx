import React, { useState, useEffect, useMemo } from 'react'
import type { TeamMember } from './types'
import { TeamSlotCard } from './components/TeamSlotCard'
import { MemberSelectorModal } from './components/MemberSelectorModal'
import { RecommendationPanel } from './components/RecommendationPanel'
import { TeamMatrixTable } from './components/TeamMatrixTable'
import { ReferenceChartModal } from './components/ReferenceChartModal'
import {
  calculateTeamCoverList,
  getNotCoverTypeList,
  getFragileDefenseTypeList,
  getNotSuperEffectTypeList,
  getDefensiveRecommendations,
  getOffensiveRecommendations,
} from './logic/recommender'
import { useTheme } from '../../hooks/useTheme'
import pokemonAppIcon from '../../assets/pokemon_team_builder.png'
import {
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react'

const STORAGE_KEY = 'svvv_pokemon_team_v1'

const INITIAL_TEAM: TeamMember[] = Array.from({ length: 6 }, (_, index) => ({
  slotIndex: index,
  primaryTypeId: 0,
  secondaryTypeId: 0,
}))

interface PokemonTeamBuilderAppProps {
  onBackToHub: () => void
}

export const PokemonTeamBuilderApp: React.FC<PokemonTeamBuilderAppProps> = ({ onBackToHub }) => {
  const { theme, toggleTheme } = useTheme()

  // State: Team Members (persisted in LocalStorage)
  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === 6) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to load pokemon team from localStorage', e)
    }
    return INITIAL_TEAM
  })

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
    } catch (e) {
      console.warn('Failed to persist pokemon team to localStorage', e)
    }
  }, [team])

  // Modals state
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null)
  const [isReferenceOpen, setIsReferenceOpen] = useState(false)

  // Computed analysis
  const coverMap = useMemo(() => calculateTeamCoverList(team), [team])
  const notCoverTypes = useMemo(() => getNotCoverTypeList(team, coverMap), [team, coverMap])
  const fragileDefenseTypes = useMemo(() => getFragileDefenseTypeList(team), [team])
  const notSuperEffectTypes = useMemo(() => getNotSuperEffectTypeList(coverMap, team), [coverMap, team])
  const defensiveRecs = useMemo(
    () => getDefensiveRecommendations(notCoverTypes, fragileDefenseTypes, team),
    [notCoverTypes, fragileDefenseTypes, team]
  )
  const offensiveRecs = useMemo(
    () => getOffensiveRecommendations(notSuperEffectTypes),
    [notSuperEffectTypes]
  )

  // Actions
  const handleEditSlot = (slotIndex: number) => {
    setActiveSlotIndex(slotIndex)
  }

  const handleClearSlot = (slotIndex: number) => {
    setTeam((prev) =>
      prev.map((m, idx) =>
        idx === slotIndex
          ? { slotIndex, primaryTypeId: 0, secondaryTypeId: 0 }
          : m
      )
    )
  }

  const handleSaveMember = (updated: TeamMember) => {
    setTeam((prev) =>
      prev.map((m, idx) => (idx === updated.slotIndex ? updated : m))
    )
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all team members?')) {
      setTeam(INITIAL_TEAM)
    }
  }

  const handleQuickAddType = (typeId: number) => {
    // Find first empty slot
    const emptyIndex = team.findIndex((m) => m.primaryTypeId === 0)
    if (emptyIndex !== -1) {
      setTeam((prev) =>
        prev.map((m, idx) =>
          idx === emptyIndex
            ? { slotIndex: emptyIndex, primaryTypeId: typeId, secondaryTypeId: 0 }
            : m
        )
      )
    } else {
      // If team is full, open slot 0 or alert
      setActiveSlotIndex(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Back button & Brand Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-all cursor-pointer hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </button>

            <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center gap-2.5">
              <img
                src={pokemonAppIcon}
                alt="Pokemon Team Builder"
                className="w-8 h-8 rounded-xl object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
              />
              <div>
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  Pokemon Team Builder
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Type Analyzer
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsReferenceOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              title="View full 18-Type Matchup Chart"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Type Chart</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-medium transition-colors cursor-pointer"
              title="Reset all 6 team slots"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Team</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Section 1: 6 Team Slots */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Active Team Roster (6 Slots)
              </h2>
              <span className="text-xs text-gray-400">
                ({team.filter((m) => m.primaryTypeId > 0).length}/6 Selected)
              </span>
            </div>
            <span className="text-xs text-gray-400">
              Click any slot to pick types or real Pokemon
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {team.map((member, index) => (
              <TeamSlotCard
                key={index}
                slotNumber={index + 1}
                member={member}
                onEdit={() => handleEditSlot(index)}
                onClear={() => handleClearSlot(index)}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Smart Recommendations (Weaknesses & Missing Coverage) */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Smart Coverage Analyzer & Suggestions
            </h3>
          </div>
          <RecommendationPanel
            team={team}
            coverMap={coverMap}
            notCoverTypes={notCoverTypes}
            fragileDefenseTypes={fragileDefenseTypes}
            notSuperEffectTypes={notSuperEffectTypes}
            defensiveRecommendations={defensiveRecs}
            offensiveRecommendations={offensiveRecs}
            onQuickAddType={handleQuickAddType}
          />
        </section>

        {/* Section 3: Full Team Defense Matrix Table */}
        <section>
          <TeamMatrixTable
            team={team}
            onSelectSlot={(slotIndex) => handleEditSlot(slotIndex)}
          />
        </section>
      </main>

      {/* Member Config Modal */}
      {activeSlotIndex !== null && (
        <MemberSelectorModal
          isOpen={true}
          slotNumber={activeSlotIndex + 1}
          currentMember={team[activeSlotIndex]}
          onClose={() => setActiveSlotIndex(null)}
          onSave={handleSaveMember}
        />
      )}

      {/* Reference Type Chart Modal */}
      <ReferenceChartModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />
    </div>
  )
}
