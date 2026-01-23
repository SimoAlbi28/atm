import { useState, useEffect } from 'react'
import ServiceStatus from '../components/ServiceStatus'
import TripPlanner, { type TripQuery } from '../components/TripPlanner'
import TripResults, { type TripResult } from '../components/TripResults'
import Alerts from '../components/Alerts'
import Departures from '../components/Departures'

export default function HomePage() {
  const [results, setResults] = useState<TripResult[]>([])

  function handleSearch(q: TripQuery) {
    const now = new Date()
    const base = q.when === 'now' ? now : new Date(now.toDateString() + ' ' + q.time)
    const mocked: TripResult[] = [
      {
        id: 'r1',
        durationMin: 12,
        transfers: 0,
        summary: `Linea M3 da ${q.from} a ${q.to}`,
        departure: base.toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 12 * 60000).toTimeString().slice(0, 5)
      },
      {
        id: 'r2',
        durationMin: 16,
        transfers: 1,
        summary: `M1 + M2 con 1 cambio a Cadorna`,
        departure: new Date(base.getTime() + 3 * 60000).toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 19 * 60000).toTimeString().slice(0, 5)
      },
      {
        id: 'r3',
        durationMin: 22,
        transfers: 1,
        summary: `Tram 15 + M2 soluzione alternativa`,
        departure: new Date(base.getTime() + 6 * 60000).toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 28 * 60000).toTimeString().slice(0, 5)
      }
    ]
    setResults(mocked)
  }

  return (
    <>
      <ServiceStatus />
      <TripPlanner onSearch={handleSearch} />
      <TripResults items={results} />
      <Alerts />
      <Departures />
    </>
  )
}
