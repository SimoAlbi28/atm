import Page from '../components/Page'

export default function MapPage() {
  return (
    <Page title="Mappa della rete" intro="Linee metropolitane di Milano con interscambi principali.">
      <div className="metro-map-container">
        <img
          src="/mappametro.webp"
          alt="Mappa della metropolitana di Milano"
          className="metro-map"
          loading="lazy"
        />
      </div>
      <div className="metro-legend">
        <h3>Legenda linee</h3>
        <div className="legend-items">
          <div className="legend-item"><span className="line-color" style={{background: '#e30613'}}></span> M1 - Rossa</div>
          <div className="legend-item"><span className="line-color" style={{background: '#00843d'}}></span> M2 - Verde</div>
          <div className="legend-item"><span className="line-color" style={{background: '#ffd400'}}></span> M3 - Gialla</div>
          <div className="legend-item"><span className="line-color" style={{background: '#0066cc'}}></span> M4 - Blu</div>
          <div className="legend-item"><span className="line-color" style={{background: '#8b5da8'}}></span> M5 - Lilla</div>
        </div>
      </div>
      <div style={{ marginTop: '.75rem' }}>
        <button className="secondary">Scarica mappa PDF completa</button>
      </div>
    </Page>
  )
}
