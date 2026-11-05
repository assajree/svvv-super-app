import type { RecommendedTypeItem, TeamMember, TypeCover } from '../types'
import { POKEMON_TYPES, getTypeById } from '../data/pokemon-types'
import { getAttackVsDefender } from './effectiveness'
import { getSingleTypeAttack } from '../data/type-matchups'

/**
 * Calculates per-type defense statistics for the current active team members
 */
export function calculateTeamCoverList(team: TeamMember[]): Map<number, TypeCover> {
  const activeMembers = team.filter((m) => m.primaryTypeId > 0)
  const coverMap = new Map<number, TypeCover>()

  for (const t of POKEMON_TYPES) {
    let notCoverCount = 0 // weak count (takes 2x or 4x damage)
    let superEffectCount = 0 // resist + immune count

    for (const member of activeMembers) {
      const score = getAttackVsDefender(member, t.id)
      if (score > 0) {
        notCoverCount += 1
      } else if (score < 0 || score <= -100) {
        superEffectCount += 1
      }
    }

    coverMap.set(t.id, {
      color: notCoverCount > 0 ? (superEffectCount === 0 ? 'RED' : 'YELLOW') : 'WHITE',
      notCoverCount,
      superEffectCount,
    })
  }

  return coverMap
}

/**
 * Pure Defensive Weakness (No Safe Switch-in):
 * An incoming attack type is a team vulnerability ONLY IF:
 * 1. At least one member is weak to it (weakCount > 0)
 * 2. NO ONE in the team can take the damage (safeCount === 0, meaning all members take 2x or 4x).
 * If there are >= 2 members taking <= 1x damage (Neutral, Resist, Immune), it is NOT vulnerable.
 */
export function getNotCoverTypeList(team: TeamMember[], _coverMap?: Map<number, TypeCover>): number[] {
  const activeMembers = team.filter((m) => m.primaryTypeId > 0)
  if (activeMembers.length === 0) return []

  const result: number[] = []

  for (const attackType of POKEMON_TYPES) {
    let weakCount = 0
    let safeCount = 0 // members taking <= 1x damage (Neutral 1x, Resist 0.5x/0.25x, Immune 0x)

    for (const member of activeMembers) {
      const score = getAttackVsDefender(member, attackType.id)
      if (score > 0) {
        weakCount += 1
      } else {
        safeCount += 1
      }
    }

    // Vulnerable ONLY if there are weak members and 0 members can take the hit
    if (weakCount > 0 && safeCount === 0) {
      result.push(attackType.id)
    }
  }

  return result
}

/**
 * Finds attack types where defense is fragile:
 * There is at least 1 member weak to it, and ONLY EXACTLY 1 member in the entire team can take damage <= 1x (safeCount === 1).
 * If safeCount >= 2, the team has 2+ members who can take the hit without being weak, so it is NOT fragile.
 * If safeCount === 0, it is a full Vulnerability.
 * Activates when team has >= 2 members.
 */
export function getFragileDefenseTypeList(team: TeamMember[]): number[] {
  const activeMembers = team.filter((m) => m.primaryTypeId > 0)
  if (activeMembers.length < 2) return []

  const result: number[] = []

  for (const attackType of POKEMON_TYPES) {
    let weakCount = 0
    let safeCount = 0

    for (const member of activeMembers) {
      const score = getAttackVsDefender(member, attackType.id)
      if (score > 0) {
        weakCount += 1
      } else {
        safeCount += 1
      }
    }

    // Fragile Defense: weakCount > 0 and safeCount === 1 (Only 1 member in the whole team can take the hit!)
    if (weakCount > 0 && safeCount === 1) {
      result.push(attackType.id)
    }
  }

  return result
}

/**
 * Finds defending types against which no team member can deal super effective damage (2x or 4x)
 */
export function getNotSuperEffectTypeList(_coverMap?: Map<number, TypeCover>, team?: TeamMember[]): number[] {
  const activeMembers = (team ?? []).filter((m) => m.primaryTypeId > 0)
  if (activeMembers.length === 0) return POKEMON_TYPES.map((t) => t.id)

  const result: number[] = []

  for (const defenderType of POKEMON_TYPES) {
    let hasSuperEffective = false

    for (const member of activeMembers) {
      const atk1 = getSingleTypeAttack(member.primaryTypeId, defenderType.id)
      const atk2 = member.secondaryTypeId > 0
        ? getSingleTypeAttack(member.secondaryTypeId, defenderType.id)
        : -1

      if (atk1 > 0 || atk2 > 0) {
        hasSuperEffective = true
        break
      }
    }

    if (!hasSuperEffective) {
      result.push(defenderType.id)
    }
  }

  return result
}

/**
 * Recommends Pokemon types that best patch the team's current defensive weaknesses (Vulnerability Patching)
 * and reinforces fragile single-defender types (at a 50% rate).
 * Returns empty array if the team has neither full vulnerabilities nor fragile defenses.
 */
export function getDefensiveRecommendations(
  notCoverTypes: number[],
  fragileDefenseTypes: number[] = [],
  team?: TeamMember[]
): RecommendedTypeItem[] {
  // If team has neither full vulnerabilities nor fragile defenses, no defensive patch is needed
  if (notCoverTypes.length === 0 && fragileDefenseTypes.length === 0) return []

  const activeMembers = (team ?? []).filter((m) => m.primaryTypeId > 0)
  const scoreMap = new Map<number, number>()
  const notCoverSet = new Set(notCoverTypes)
  const fragileSet = new Set(fragileDefenseTypes)

  for (const candidate of POKEMON_TYPES) {
    const candMember: TeamMember = {
      slotIndex: -1,
      primaryTypeId: candidate.id,
      secondaryTypeId: 0,
    }

    let coveredCount = 0
    let vulnerabilityScore = 0

    // 1. Evaluate candidate directly against the team's open vulnerabilities (100% full weight)
    for (const vulnId of notCoverTypes) {
      const score = getAttackVsDefender(candMember, vulnId)
      if (score <= -100) {
        // Immunity against team weakness
        vulnerabilityScore += 4
        coveredCount += 1
      } else if (score < 0) {
        // Resistance (0.5x, 0.25x) against team weakness
        vulnerabilityScore += 3
        coveredCount += 1
      } else if (score > 0) {
        // Candidate shares this team weakness (penalize stacking weakness)
        vulnerabilityScore -= 3
      }
    }

    // 2. Evaluate candidate against Fragile Defenses (50% rate weight)
    for (const fragileId of fragileDefenseTypes) {
      if (notCoverSet.has(fragileId)) continue

      const score = getAttackVsDefender(candMember, fragileId)
      if (score <= -100) {
        // Immunity gives solid reinforcement
        vulnerabilityScore += 2
        coveredCount += 1
      } else if (score < 0) {
        // Resistance provides valuable second switch-in
        vulnerabilityScore += 1.5
        coveredCount += 1
      } else if (score > 0) {
        // Weakness turns a fragile defense into a full team vulnerability!
        vulnerabilityScore -= 2
      }
    }

    // Must help patch at least 1 vulnerability or fragile defense and have positive net impact
    if (coveredCount === 0 || vulnerabilityScore <= 0) {
      continue
    }

    // 3. Tie-breaker bonus for overall resistance against other types
    let generalBonus = 0
    for (const incomingType of POKEMON_TYPES) {
      if (!notCoverSet.has(incomingType.id) && !fragileSet.has(incomingType.id)) {
        const score = getAttackVsDefender(candMember, incomingType.id)
        if (score <= -100) generalBonus += 0.3
        else if (score < 0) generalBonus += 0.2
        else if (score > 0) generalBonus -= 0.2
      }
    }

    // Small penalty if primary type is already used in team
    const alreadyUsed = activeMembers.some((m) => m.primaryTypeId === candidate.id)
    if (alreadyUsed) {
      generalBonus -= 0.5
    }

    scoreMap.set(candidate.id, Math.round((vulnerabilityScore + generalBonus) * 10) / 10)
  }

  return Array.from(scoreMap.entries())
    .map(([typeId, score]) => {
      const typeInfo = getTypeById(typeId)
      return {
        typeId,
        score,
        typeName: typeInfo.name,
        color: typeInfo.color,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

/**
 * Recommends types that deal super effective damage against currently uncovered defensive targets
 */
export function getOffensiveRecommendations(notSuperEffectTypes: number[]): RecommendedTypeItem[] {
  if (notSuperEffectTypes.length === 0) return []

  const scoreMap = new Map<number, number>()

  for (const targetId of notSuperEffectTypes) {
    for (const attackerType of POKEMON_TYPES) {
      const atk = getSingleTypeAttack(attackerType.id, targetId)
      if (atk > 0) {
        scoreMap.set(attackerType.id, (scoreMap.get(attackerType.id) ?? 0) + 1)
      }
    }
  }

  return Array.from(scoreMap.entries())
    .map(([typeId, score]) => {
      const typeInfo = getTypeById(typeId)
      return {
        typeId,
        score,
        typeName: typeInfo.name,
        color: typeInfo.color,
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}
