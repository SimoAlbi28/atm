import { useState } from 'react'
import Page from '../components/Page'
import { MOCK_ALERTS } from '../data/alerts'

export default function AlertsPage() {
  const [filter, setFilter] = useState<string>('all')
  const lines = ['all', 'M1', 'M2', 'M3', 'M4', 'M5', 'Bus', 'Tram']
  const filtered = filter === 'all' ? MOCK_ALERTS : MOCK_ALERTS.filter(a => a.line === filter || (filter === 'Bus' && /^\d+$/.test(a.line)) || (filter === 'Tram' && /^\d+$/.test(a.line)))
  
  return (
    <Page title="Aggiornamenti in tempo reale" intro="Monitora interruzioni, lavori e variazioni di servizio su tutte le linee.">
      <div className="alert-filters">
        {lines.map(l => (
          <button
            key={l}
            className={filter === l ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter(l)}
          >
            {l === 'all' ? 'Tutte le linee' : l}
          </button>
        ))}
      </div>
      <div className="alerts-list">
        {filtered.map((a) => (
          <article key={a.id} className={`card alert-detail ${a.status}`}>
            <div className="alert-header">
              <span className="badge line">{a.line}</span>
              <span className={`alert-status ${a.status}`}>
                {a.status === 'active' ? '🔴 Attivo' : '🟢 Risolto'}
              </span>
            </div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
            <div className="alert-meta">
              <span className="alert-time">{a.time}</span>
              <span className="alert-type">{{
                works: 'Lavori',
                delay: 'Ritardo',
                skip: 'Fermata saltata',
                event: 'Evento'
              }[a.type]}</span>
            </div>
          </article>
        ))}
      </div>
    </Page>
  )
}
