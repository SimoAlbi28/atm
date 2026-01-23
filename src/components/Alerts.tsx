import { MOCK_ALERTS } from '../data/alerts'

export default function Alerts() {
  const activeCount = MOCK_ALERTS.filter(a => a.status === 'active').length
  return (
    <section className="alerts" aria-labelledby="alerts-title">
      <div className="container">
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <a 
            href="#/alerts" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '.75rem',
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              textDecoration: 'none',
              color: '#dc2626',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all .2s ease'
            }}
          >
            <span className="live-badge">LIVE</span>
            Aggiornamenti in tempo reale
            {activeCount > 0 && (
              <span style={{ 
                background: '#dc2626', 
                color: '#fff', 
                padding: '.2rem .5rem', 
                borderRadius: '6px',
                fontSize: '.85rem'
              }}>
                {activeCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </section>
  )
}
