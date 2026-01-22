export type TripResult = {
  id: string
  durationMin: number
  transfers: number
  summary: string
  departure: string
  arrival: string
}

type Props = {
  items: TripResult[]
}

export default function TripResults({ items }: Props) {
  if (!items.length) return null
  return (
    <section className="results" aria-labelledby="results-title">
      <div className="container">
        <div className="section-header">
          <h2 id="results-title">Soluzioni di viaggio</h2>
        </div>
        <ul className="results-list">
          {items.map((r) => (
            <li key={r.id} className="card result-item">
              <div className="result-time">
                <strong>{r.departure}</strong>
                <span>→ {r.arrival}</span>
              </div>
              <div className="result-summary">{r.summary}</div>
              <div className="result-meta">
                <span>{r.durationMin} min</span>
                <span>•</span>
                <span>{r.transfers} cambi</span>
              </div>
              <button className="secondary">Dettagli</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
