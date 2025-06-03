import { ChampionshipRaces, Result } from './ChampionshipRaces'

export function parseChampionshipRaces(data: string): ChampionshipRaces[] {
  const lines = data.trim().split('\n').filter(Boolean)
  return lines.map(processLine)
}

function processLine(line: string): ChampionshipRaces {
  const parts = line.split('\t').map(part => part.trim())
  const [position, id, name, ...rawResults] = parts
  if (!position || !id || !name) throw new Error(`Invalid line format: ${line}`)
  const results = rawResults.map(parseResult).filter(Boolean)
  return {
    id: parseInt(id, 10),
    position: parseInt(position, 10),
    name,
    results,
    participatedResults: results.filter(result => result.type === 'participated'),
  }
}

function parseResult(rawResult: string): Result {
  if (rawResult === 'x') return { type: 'notParticipated' }

  const points = parseInt(rawResult, 10)
  if (isNaN(points)) throw new Error(`Invalid result format: ${rawResult}`)

  return { type: 'participated', points }
}
