import { sortBy, sum } from 'lodash-es'
import { ChampionshipRaces, ChampionshipSpeed } from '../championshipRanking/ChampionshipRaces'
import { parseChampionshipRaces } from '../championshipRanking/parseChampionshipRaces'
import { rankingData } from '../championshipRanking/rankingData'
import { truthy } from '../utils/truthy'

function main() {
  const races = parseChampionshipRaces(rankingData)
  const speed = races.map(calculateSpeed).filter(truthy)
  const sortedBySpeed = sortBy(speed, (speed) => -speed.total)
  sortedBySpeed.forEach((speed, index) => (speed.position = index + 1))
  console.log(sortedBySpeed.map(printSpeed).join('\n'))
}

function calculateSpeed(races: ChampionshipRaces): ChampionshipSpeed | undefined {
  if (races.participatedResults.length === 0) return undefined

  const sortedByTotal = sortBy(races.participatedResults, (result) => -result.points)
  const bestRaces = sortedByTotal.slice(0, maxRaces)
  const averagePoints = sum(bestRaces.map((result) => result.points)) / bestRaces.length
  return { races, total: averagePoints, position: 0 }
}

function printSpeed(speed: ChampionshipSpeed): string {
  return `${speed.position}\t${speed.races.position}\t${speed.total.toFixed(2)}\t${speed.races.name}`
}

const maxRaces = 5

main()
