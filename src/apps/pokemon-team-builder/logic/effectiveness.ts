import type { EffectiveColor, TeamMember } from '../types'
import { getSingleTypeAttack } from '../data/type-matchups'

/**
 * Calculates attack effectiveness of an attack type against a defending Pokemon
 * Returns:
 * -100 = Immune (0x)
 *  2   = 4x Super Effective
 *  1   = 2x Super Effective
 *  0   = 1x Normal
 * -1   = 0.5x Not Very Effective
 * -2   = 0.25x Double Resisted
 */
export function getAttackVsDefender(defender: TeamMember, attackTypeId: number): number {
  if (defender.primaryTypeId <= 0) return 0

  const atk1 = getSingleTypeAttack(attackTypeId, defender.primaryTypeId)
  const atk2 = defender.secondaryTypeId > 0
    ? getSingleTypeAttack(attackTypeId, defender.secondaryTypeId)
    : 0

  // If either type grants immunity, the result is immune (-100)
  if (atk1 === -100 || atk2 === -100) {
    return -100
  }

  return atk1 + atk2
}

/**
 * Calculates defense of defender against attack type
 */
export function getDefenseVsAttacker(defender: TeamMember, attackTypeId: number): number {
  return getAttackVsDefender(defender, attackTypeId) * -1
}

/**
 * Calculates maximum offensive effectiveness of dual-type attacker against defender
 */
export function getDualAttack(attacker: TeamMember, defender: TeamMember): number {
  if (attacker.primaryTypeId <= 0) return 0

  const atk1 = getAttackVsDefender(defender, attacker.primaryTypeId)
  const atk2 = attacker.secondaryTypeId > 0
    ? getAttackVsDefender(defender, attacker.secondaryTypeId)
    : atk1

  return Math.max(atk1, atk2)
}

/**
 * Dual defense effectiveness
 */
export function getDualDefense(attacker: TeamMember, defender: TeamMember): number {
  return getDualAttack(attacker, defender) * -1
}

/**
 * Determines matchup color matching original Android Util.getTypeCoverColor logic
 */
export function getTypeCoverColor(member: TeamMember, opponent: TeamMember): EffectiveColor {
  const atk = getDualAttack(member, opponent)
  const def = getDualDefense(opponent, member)

  if (atk === 0 && def === 0) {
    return 'WHITE'
  }
  if ((atk > 0 && def < 0) || (atk < 0 && def > 0)) {
    return 'YELLOW'
  }
  if (atk + def < 0) {
    return 'RED'
  }
  if (atk + def > 0) {
    return 'GREEN'
  }
  return 'WHITE'
}

/**
 * Converts internal score (-100, -2, -1, 0, 1, 2) to damage multiplier (0x, 0.25x, 0.5x, 1x, 2x, 4x)
 */
export function getDamageMultiplier(score: number): { label: string; multiplier: number; tone: 'immune' | 'resist-heavy' | 'resist' | 'neutral' | 'weak' | 'weak-heavy' } {
  if (score <= -100) return { label: '0x', multiplier: 0, tone: 'immune' }
  if (score <= -2) return { label: '¼x', multiplier: 0.25, tone: 'resist-heavy' }
  if (score === -1) return { label: '½x', multiplier: 0.5, tone: 'resist' }
  if (score === 0) return { label: '1x', multiplier: 1, tone: 'neutral' }
  if (score === 1) return { label: '2x', multiplier: 2, tone: 'weak' }
  return { label: '4x', multiplier: 4, tone: 'weak-heavy' }
}
