import Page from '../components/Page'
import NearbyStops from '../components/NearbyStops'

export default function LinesPage() {
  const metroLines = [
    { name: 'M1', color: '#e30613', desc: 'Sesto FS - Rho Fiera / Bisceglie' },
    { name: 'M2', color: '#00843d', desc: 'Abbiategrasso - Cologno Nord / Gessate' },
    { name: 'M3', color: '#ffd400', desc: 'Comasina - San Donato' },
    { name: 'M4', color: '#0066cc', desc: 'Linate - San Cristoforo' },
    { name: 'M5', color: '#8b5da8', desc: 'Bignami - San Siro Stadio' }
  ]
  const busLines = ['54', '90', '91', '92', '94', '95']
  const tramLines = ['2', '3', '9', '10', '12', '14', '15', '16', '19', '27']

  return (
    <Page title="Linee e orari" intro="Consulta linee metropolitane, bus e tram. Trova fermate vicine.">
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '.75rem' }}>
            <h3>Linee Metropolitane</h3>
            <div style={{ display: 'grid', gap: '.5rem', marginTop: '.5rem' }}>
              {metroLines.map((l) => (
                <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span className="badge line" style={{ background: l.color }}>{l.name}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{l.desc}</div>
                    <div className="tiny">Servizio: 6:00 - 00:30</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: '.75rem' }}>
            <h3>Linee Tram principali</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.5rem' }}>
              {tramLines.map((l) => (
                <span className="badge" key={l} style={{ border: '1px solid var(--border)', padding: '.35rem .6rem' }}>{l}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Linee Bus urbane</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.5rem' }}>
              {busLines.map((l) => (
                <span className="badge" key={l} style={{ border: '1px solid var(--border)', padding: '.35rem .6rem' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <NearbyStops />
      </div>
    </Page>
  )
}
