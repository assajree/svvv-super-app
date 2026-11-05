import React, { useState } from 'react'
import type { PokemonSpecies, TeamMember } from '../types'
import { POKEMON_TYPES } from '../data/pokemon-types'
import { SAMPLE_POKEMON } from '../data/sample-pokemon'
import { TypeBadge } from './TypeBadge'
import { X, Search, Sparkles, Layers } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface MemberSelectorModalProps {
  isOpen: boolean
  slotNumber: number
  currentMember: TeamMember
  onClose: () => void
  onSave: (member: TeamMember) => void
}

export const MemberSelectorModal: React.FC<MemberSelectorModalProps> = ({
  isOpen,
  slotNumber,
  currentMember,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'types' | 'pokemon'>('types')
  const [primaryTypeId, setPrimaryTypeId] = useState<number>(currentMember.primaryTypeId || 1)
  const [secondaryTypeId, setSecondaryTypeId] = useState<number>(currentMember.secondaryTypeId || 0)
  const [pokemonName, setPokemonName] = useState<string>(currentMember.pokemonName || '')
  const [pokemonId, setPokemonId] = useState<number | undefined>(currentMember.pokemonId)
  const [spriteUrl, setSpriteUrl] = useState<string | undefined>(currentMember.spriteUrl)
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const handleSelectPokemon = (p: PokemonSpecies) => {
    setPokemonId(p.id)
    setPokemonName(p.name)
    setSpriteUrl(p.spriteUrl)
    setPrimaryTypeId(p.types[0])
    setSecondaryTypeId(p.types[1] ?? 0)
  }

  const handleSave = () => {
    onSave({
      slotIndex: currentMember.slotIndex,
      primaryTypeId,
      secondaryTypeId: secondaryTypeId === primaryTypeId ? 0 : secondaryTypeId,
      pokemonId,
      pokemonName: pokemonName.trim() || undefined,
      spriteUrl,
    })
    onClose()
  }

  const filteredPokemon = SAMPLE_POKEMON.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Configure Slot #{slotNumber}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select Pokemon types or choose from the Pokedex roster
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-6 pt-3 gap-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('types')}
            className={cn(
              'flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer',
              activeTab === 'types'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            Pick by Types (Pure Type)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pokemon')}
            className={cn(
              'flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer',
              activeTab === 'pokemon'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Pick by Pokemon Species
            <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded-full font-bold">
              Upgrade
            </span>
          </button>
        </div>

        {/* Tab 1: Types Selection */}
        {activeTab === 'types' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Primary Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                Primary Type *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {POKEMON_TYPES.map((t) => {
                  const isSelected = primaryTypeId === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setPrimaryTypeId(t.id)
                        if (secondaryTypeId === t.id) setSecondaryTypeId(0)
                        setPokemonName('')
                        setSpriteUrl(undefined)
                        setPokemonId(undefined)
                      }}
                      style={{
                        backgroundColor: isSelected ? t.color : undefined,
                        borderColor: t.color,
                        color: isSelected ? t.textColor || '#fff' : undefined,
                      }}
                      className={cn(
                        'py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer',
                        isSelected
                          ? 'shadow-md scale-105'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60'
                      )}
                    >
                      {t.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Secondary Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                Secondary Type (Optional)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {/* Option for None */}
                <button
                  type="button"
                  onClick={() => setSecondaryTypeId(0)}
                  className={cn(
                    'py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer',
                    secondaryTypeId === 0
                      ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 border-gray-800 shadow-md scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-700 hover:bg-gray-50'
                  )}
                >
                  None (Pure)
                </button>

                {POKEMON_TYPES.map((t) => {
                  const isSelected = secondaryTypeId === t.id
                  const isSameAsPrimary = primaryTypeId === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      disabled={isSameAsPrimary}
                      onClick={() => {
                        setSecondaryTypeId(t.id)
                        setPokemonName('')
                        setSpriteUrl(undefined)
                        setPokemonId(undefined)
                      }}
                      style={{
                        backgroundColor: isSelected ? t.color : undefined,
                        borderColor: isSameAsPrimary ? '#cbd5e1' : t.color,
                        color: isSelected ? t.textColor || '#fff' : undefined,
                      }}
                      className={cn(
                        'py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center',
                        isSameAsPrimary
                          ? 'opacity-30 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
                          : 'cursor-pointer',
                        isSelected
                          ? 'shadow-md scale-105'
                          : !isSameAsPrimary &&
                              'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60'
                      )}
                    >
                      {t.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pokemon Species Selection */}
        {activeTab === 'pokemon' && (
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Pokemon name (e.g. Pikachu, Charizard, Lucario)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredPokemon.map((p) => {
                const isSelected = pokemonId === p.id
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPokemon(p)}
                    className={cn(
                      'flex items-center gap-2 p-2.5 rounded-2xl border cursor-pointer transition-all',
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm scale-102 ring-2 ring-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                    )}
                  >
                    <img
                      src={p.spriteUrl}
                      alt={p.name}
                      className="w-10 h-10 object-contain drop-shadow"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {p.name}
                      </div>
                      <div className="flex gap-1 mt-1">
                        <TypeBadge typeId={p.types[0]} size="sm" />
                        {p.types[1] && <TypeBadge typeId={p.types[1]} size="sm" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Live Preview & Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {spriteUrl && (
              <img src={spriteUrl} alt="Preview" className="w-9 h-9 object-contain drop-shadow" />
            )}
            <div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Current Preview
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-gray-900 dark:text-white mr-1">
                  {pokemonName || 'Type Build'}
                </span>
                <TypeBadge typeId={primaryTypeId} size="sm" />
                {secondaryTypeId > 0 && <TypeBadge typeId={secondaryTypeId} size="sm" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
