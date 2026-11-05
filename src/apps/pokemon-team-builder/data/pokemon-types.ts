import type { PokemonType } from '../types'

export const POKEMON_TYPES: PokemonType[] = [
  { id: 1, name: 'Normal', color: '#5c5c5a', textColor: '#ffffff' },
  { id: 2, name: 'Fire', color: '#e6721f', textColor: '#ffffff' },
  { id: 3, name: 'Water', color: '#5784ee', textColor: '#ffffff' },
  { id: 4, name: 'Electric', color: '#f3c718', textColor: '#1a1a1a' },
  { id: 5, name: 'Grass', color: '#6bba44', textColor: '#ffffff' },
  { id: 6, name: 'Ice', color: '#85d1d1', textColor: '#1a1a1a' },
  { id: 7, name: 'Fighting', color: '#a92a23', textColor: '#ffffff' },
  { id: 8, name: 'Poison', color: '#8d398d', textColor: '#ffffff' },
  { id: 9, name: 'Ground', color: '#dbb651', textColor: '#1a1a1a' },
  { id: 10, name: 'Flying', color: '#9986d3', textColor: '#ffffff' },
  { id: 11, name: 'Psychic', color: '#f62161', textColor: '#ffffff' },
  { id: 12, name: 'Bug', color: '#919f1c', textColor: '#ffffff' },
  { id: 13, name: 'Rock', color: '#99852f', textColor: '#ffffff' },
  { id: 14, name: 'Ghost', color: '#59467a', textColor: '#ffffff' },
  { id: 15, name: 'Dragon', color: '#5210f1', textColor: '#ffffff' },
  { id: 16, name: 'Dark', color: '#5e4a3d', textColor: '#ffffff' },
  { id: 17, name: 'Steel', color: '#9d9dbe', textColor: '#1a1a1a' },
  { id: 18, name: 'Fairy', color: '#e27fe2', textColor: '#1a1a1a' },
]

export const EMPTY_TYPE: PokemonType = {
  id: 0,
  name: 'None',
  color: '#94a3b8',
  textColor: '#ffffff',
}

export const TYPE_MAP = new Map<number, PokemonType>(
  POKEMON_TYPES.map((t) => [t.id, t])
)

export function getTypeById(id: number): PokemonType {
  return TYPE_MAP.get(id) || EMPTY_TYPE
}
