import { useState, useMemo } from 'react'

type Departure = {
  id: string
  line: string
  destination: string
  minutes: number
}

export default function Departures() {
  const [query, setQuery] = useState('Duomo M1')

  const departures: Departure[] = useMemo(
    () => [
      { id: 'd1', line: 'M1', destination: 'Sesto FS', minutes: 2 },
      { id: 'd2', line: 'M1', destination: 'Bisceglie', minutes: 4 },
      { id: 'd3', line: '15', destination: 'Rozzano', minutes: 6 }
    ],
    []
  )

  return (
    <section className="departures">
      <div className="container">
        <div className="section-header">
          <h2>Prossime partenze</h2>
        </div>
        <div className="departures-search">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cerca fermata o codice (es. DUOMO)" />
          <button className="secondary">Cerca</button>
        </div>
        <ul className="departures-list">
          {departures.map((d) => (
            <li key={d.id} className="card dep-item">
              <span className="badge line">{d.line}</span>
              <div className="dep-meta">
                <div className="dest">{d.destination}</div>
                <div className="stop-name">{query}</div>
              </div>
              <div className="eta">
                <strong>{d.minutes}'</strong>
                <span>min</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
