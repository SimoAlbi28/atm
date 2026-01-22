import { useState } from 'react'

export type TripQuery = {
  from: string
  to: string
  when: 'now' | 'leaveAt'
  time: string
}

type Props = {
  onSearch: (q: TripQuery) => void
}

export default function TripPlanner({ onSearch }: Props) {
  const [from, setFrom] = useState('Duomo')
  const [to, setTo] = useState('Centrale FS')
  const [when, setWhen] = useState<TripQuery['when']>('now')
  const [time, setTime] = useState<string>(new Date().toISOString().slice(11, 16))

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({ from, to, when, time })
  }

  return (
    <section id="planner" className="hero">
      <div className="container">
        <h1>Muoviti a Milano con facilità</h1>
        <p className="subtitle">Pianifica il tuo viaggio in pochi secondi.</p>
        <form className="planner" onSubmit={submit}>
          <div className="field">
            <label htmlFor="from">Da</label>
            <input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Fermata, indirizzo o luogo" />
          </div>
          <div className="field">
            <label htmlFor="to">A</label>
            <input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Fermata, indirizzo o luogo" />
          </div>
          <div className="field when">
            <label htmlFor="when">Quando</label>
            <div className="when-row">
              <select id="when" value={when} onChange={(e) => setWhen(e.target.value as TripQuery['when'])}>
                <option value="now">Adesso</option>
                <option value="leaveAt">Parti alle</option>
              </select>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={when !== 'leaveAt'}
                aria-disabled={when !== 'leaveAt'}
              />
            </div>
          </div>
          <button className="primary" type="submit">Cerca</button>
        </form>
      </div>
    </section>
  )
}
