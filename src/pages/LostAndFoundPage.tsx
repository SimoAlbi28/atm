import Page from '../components/Page'

export default function LostAndFoundPage() {
  return (
    <Page title="Oggetti smarriti" intro="Come recuperare un oggetto smarrito su mezzi ATM.">
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <p>Compila il modulo e descrivi l'oggetto, la linea e l'orario. Ti contatteremo se viene ritrovato.</p>
        <div className="grid grid-2 form-grid" style={{ gap: '.5rem', marginTop: '.75rem' }}>
          <input className="input" placeholder="Nome e cognome" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Telefono" />
          <input className="input col-span-2" placeholder="Linea/mezzo (es. M1, Tram 15)" />
          <input className="input" placeholder="Data" type="date" />
          <input className="input" placeholder="Orario approssimativo" type="time" />
          <textarea className="textarea col-span-2" placeholder="Descrizione dettagliata dell'oggetto smarrito" />
        </div>
        <div style={{ marginTop: '.75rem' }}>
          <button className="primary">Invia segnalazione</button>
        </div>
      </div>
      <div className="card">
        <h3>Ufficio oggetti rinvenuti</h3>
        <p style={{ marginTop: '.5rem' }}>Puoi anche recarti di persona:</p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Indirizzo: Via Sammartini 1, Milano (presso stazione Centrale)</li>
          <li>Orari: Lun-Ven 8:30-12:30, 14:00-16:00</li>
          <li>Tel: 02.4860.4316</li>
          <li>Email: oggetti.rinvenuti@atm.example</li>
        </ul>
      </div>
    </Page>
  )
}
