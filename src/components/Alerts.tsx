import { MOCK_ALERTS } from '../data/alerts'

export default function Alerts() {
  const activeAlerts = MOCK_ALERTS.filter(a => a.status === 'active').slice(0, 3)
  return (
    <section className="alerts" aria-labelledby="alerts-title">
      <div className="container">
        <div className="section-header">
          <h2 id="alerts-title">
            <span className="live-badge">LIVE</span> Aggiornamenti in tempo reale
          </h2>
          <a href="#/alerts" className="btn-tutti">Tutti</a>
        </div>
        <div className="list">
          {activeAlerts.map((a) => (
            <a 
              key={a.id} 
              href={`#/alert/${a.id}`}
              className="card alert"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="alert-header">
                <span className="badge line">{a.line}</span>
                <span className="alert-time">{a.time}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
