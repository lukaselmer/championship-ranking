export interface ChampionshipSpeed {
  position: number
  total: number
  races: ChampionshipRaces
}

export interface ChampionshipRaces {
  id: number
  position: number
  name: string
  results: Result[]
  participatedResults: ParticipatedResult[]
}

export type Result = ParticipatedResult | NotParticipatedResult

interface ParticipatedResult {
  type: 'participated'
  points: number
}

interface NotParticipatedResult {
  type: 'notParticipated'
}
