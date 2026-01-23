import Page from '../components/Page'
import { MOCK_ALERTS } from '../data/alerts'

export default function AlertDetailPage({ alertId }: { alertId: string }) {
  const alert = MOCK_ALERTS.find(a => a.id === alertId)

  if (!alert) {
    return (
      <Page title="Avviso non trovato" intro="">
        <div className="card">
          <p>L'avviso richiesto non esiste. <a href="#/alerts" className="link">Torna agli avvisi</a></p>
        </div>
      </Page>
    )
  }

  const typeLabels: Record<string, string> = {
    works: 'Lavori in corso',
    delay: 'Ritardi',
    skip: 'Fermata saltata',
    event: 'Evento speciale'
  }

  const getLineColor = (line: string) => {
    const colors: Record<string, string> = {
      M1: '#e30613',
      M2: '#00843d',
      M3: '#ffd400',
      M4: '#0066cc',
      M5: '#8b5da8'
    }
    return colors[line] || '#333'
  }

  return (
    <Page title={alert.title} intro="">
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="alert-header" style={{ marginBottom: '1rem' }}>
              <span className="badge line" style={{ background: getLineColor(alert.line), fontSize: '1.1rem', padding: '.4rem .7rem' }}>
                {alert.line}
              </span>
              <span className={`alert-status ${alert.status}`} style={{ fontSize: '1rem' }}>
                {alert.status === 'active' ? '🔴 Attivo ora' : '🟢 Risolto'}
              </span>
            </div>

            <h2 style={{ marginBottom: '1rem' }}>{alert.title}</h2>
            
            <div style={{ 
              padding: '1rem', 
              background: alert.status === 'active' ? '#fef2f2' : '#f0fdf4', 
              borderRadius: '8px',
              borderLeft: `4px solid ${alert.status === 'active' ? '#ef4444' : '#10b981'}`,
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{alert.text}</p>
            </div>

            <div className="grid grid-2" style={{ gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '.75rem', background: 'var(--surface)', borderRadius: '8px' }}>
                <p className="tiny" style={{ marginBottom: '.25rem' }}>Tipo</p>
                <p style={{ fontWeight: 600 }}>{typeLabels[alert.type]}</p>
              </div>
              <div style={{ padding: '.75rem', background: 'var(--surface)', borderRadius: '8px' }}>
                <p className="tiny" style={{ marginBottom: '.25rem' }}>Orario</p>
                <p style={{ fontWeight: 600 }}>{alert.time}</p>
              </div>
            </div>
          </div>

          {alert.status === 'active' && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Alternative consigliate</h3>
              <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
                {alert.line.startsWith('M') ? (
                  <>
                    <li>Utilizza le linee bus sostitutive</li>
                    <li>Verifica percorsi alternativi con altre linee metro</li>
                    <li>Considera l'uso di bike sharing o taxi</li>
                  </>
                ) : (
                  <>
                    <li>Verifica deviazioni e fermate temporanee</li>
                    <li>Utilizza linee metro nelle vicinanze</li>
                    <li>Consulta la mappa per percorsi alternativi</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Aggiornamenti</h3>
            <div style={{ marginTop: '.75rem' }}>
              <div style={{ padding: '.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <p className="tiny">{alert.time}</p>
                <p>Segnalazione iniziale</p>
              </div>
              {alert.status === 'resolved' && (
                <div style={{ padding: '.5rem 0' }}>
                  <p className="tiny">Oggi</p>
                  <p style={{ color: 'var(--ok)' }}>Problema risolto</p>
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Contatti utili</h3>
            <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              <li>Numero verde: 800 80 81 81</li>
              <li>Twitter: @atabordo</li>
              <li>App ATM Milano</li>
            </ul>
          </div>

          <a href="#/alerts" className="secondary" style={{ display: 'block', textAlign: 'center' }}>
            ← Torna agli avvisi
          </a>
        </div>
      </div>
    </Page>
  )
}
