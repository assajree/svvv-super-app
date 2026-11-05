export interface PokemonType {
  id: number
  name: string
  color: string
  textColor?: string
}

export interface PokemonSpecies {
  id: number // National Pokedex Number (e.g. 25 for Pikachu)
  name: string
  types: [number] | [number, number]
  spriteUrl?: string
}

export interface TeamMember {
  slotIndex: number // 0 to 5
  primaryTypeId: number // 1 to 18 (0 = empty)
  secondaryTypeId: number // 0 = none, 1 to 18
  // Real Pokemon upgrade fields:
  pokemonId?: number
  pokemonName?: string
  spriteUrl?: string
}

export type EffectiveColor = 'RED' | 'YELLOW' | 'WHITE' | 'GREEN'

export interface TypeCover {
  color: EffectiveColor
  notCoverCount: number
  superEffectCount: number
}

export interface RecommendedTypeItem {
  typeId: number
  score: number
  typeName: string
  color: string
}
