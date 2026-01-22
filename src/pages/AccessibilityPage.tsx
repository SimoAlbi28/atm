import Page from '../components/Page'

export default function AccessibilityPage() {
  return (
    <Page title="Accessibilità" intro="Informazioni su accesso facilitato, ascensori e servizi per persone con mobilità ridotta.">
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Stazioni accessibili</h3>
        <p style={{ marginTop: '.5rem' }}>Oltre l'80% delle stazioni metro dispone di:</p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Ascensori da strada a banchina</li>
          <li>Ingressi con varchi larghi per carrozzine</li>
          <li>Percorsi tattili per non vedenti</li>
          <li>Mappe tattili e annunci sonori</li>
          <li>Assistenza dedicata su richiesta</li>
        </ul>
      </div>
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Mezzi accessibili</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>100% delle linee metro: accesso a livello</li>
          <li>Tutti i tram di nuova generazione: pianale ribassato</li>
          <li>Bus urbani: pedana di salita automatica</li>
          <li>Posti riservati segnalati</li>
        </ul>
      </div>
      <div className="card">
        <h3>Servizio di assistenza</h3>
        <p style={{ marginTop: '.5rem' }}>Prenota assistenza per viaggi programmati:</p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Tel: 800.808.181 (gratuito da fisso)</li>
          <li>Email: assistenza.accessibilita@atm.example</li>
          <li>Prenotazione consigliata 24h prima</li>
        </ul>
      </div>
    </Page>
  )
}
