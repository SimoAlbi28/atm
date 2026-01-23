import { MOCK_ALERTS } from '../data/alerts'

export default function Alerts() {
  const activeCount = MOCK_ALERTS.filter(a => a.status === 'active').length
  return (
    <section className="alerts" aria-labelledby="alerts-title">
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <span className="live-badge" style={{ whiteSpace: 'nowrap' }}>LIVE</span>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Aggiornamenti in tempo reale</h2>
            {activeCount > 0 && (
              <span style={{ 
                background: '#dc2626', 
                color: '#fff', 
                padding: '.25rem .6rem', 
                borderRadius: '6px',
                fontSize: '.85rem',
                fontWeight: 700,
                minWidth: '1.5rem'
              }}>
                {activeCount}
              </span>
            )}
          </div>
          <a 
            href="#/alerts" 
            className="primary"
            style={{ 
              display: 'inline-block',
              textDecoration: 'none',
              padding: '.6rem 1.5rem'
            }}
          >
            Visualizza
          </a>
        </div>
      </div>
    </section>
  )
}
