import type { PokemonSpecies } from '../types'

/**
 * Starter and popular Pokemon roster to support upgrading to real Pokemon species.
 * Provides instant autocomplete and preview with official sprites.
 */
export const SAMPLE_POKEMON: PokemonSpecies[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    types: [5, 8], // Grass / Poison
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 3,
    name: 'Venusaur',
    types: [5, 8], // Grass / Poison
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  },
  {
    id: 4,
    name: 'Charmander',
    types: [2], // Fire
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 6,
    name: 'Charizard',
    types: [2, 10], // Fire / Flying
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    types: [3], // Water
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    id: 9,
    name: 'Blastoise',
    types: [3], // Water
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
  },
  {
    id: 25,
    name: 'Pikachu',
    types: [4], // Electric
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    id: 94,
    name: 'Gengar',
    types: [14, 8], // Ghost / Poison
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
  },
  {
    id: 130,
    name: 'Gyarados',
    types: [3, 10], // Water / Flying
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
  },
  {
    id: 131,
    name: 'Lapras',
    types: [3, 6], // Water / Ice
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
  },
  {
    id: 143,
    name: 'Snorlax',
    types: [1], // Normal
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
  },
  {
    id: 149,
    name: 'Dragonite',
    types: [15, 10], // Dragon / Flying
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
  },
  {
    id: 150,
    name: 'Mewtwo',
    types: [11], // Psychic
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
  },
  {
    id: 212,
    name: 'Scizor',
    types: [12, 17], // Bug / Steel
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/212.png',
  },
  {
    id: 248,
    name: 'Tyranitar',
    types: [13, 16], // Rock / Dark
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png',
  },
  {
    id: 282,
    name: 'Gardevoir',
    types: [11, 18], // Psychic / Fairy
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
  },
  {
    id: 384,
    name: 'Rayquaza',
    types: [15, 10], // Dragon / Flying
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png',
  },
  {
    id: 445,
    name: 'Garchomp',
    types: [15, 9], // Dragon / Ground
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
  },
  {
    id: 448,
    name: 'Lucario',
    types: [7, 17], // Fighting / Steel
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png',
  },
  {
    id: 658,
    name: 'Greninja',
    types: [3, 16], // Water / Dark
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png',
  },
  {
    id: 700,
    name: 'Sylveon',
    types: [18], // Fairy
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png',
  },
  {
    id: 778,
    name: 'Mimikyu',
    types: [14, 18], // Ghost / Fairy
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png',
  },
]
