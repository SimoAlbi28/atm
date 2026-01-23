import { useState } from 'react'
import Page from '../components/Page'

export default function CareersPage() {
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    dataNascita: '',
    codiceFiscale: '',
    posizione: '',
    titolo: '',
    presentazione: '',
    privacy: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const isFormValid = form.nome && form.cognome && form.email && form.telefono && 
    form.dataNascita && form.codiceFiscale && form.posizione && form.titolo && 
    form.presentazione && form.privacy

  const handleSubmit = () => {
    if (!isFormValid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
      setForm({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        dataNascita: '',
        codiceFiscale: '',
        posizione: '',
        titolo: '',
        presentazione: '',
        privacy: false
      })
    }, 1500)
  }

  return (
    <Page title="Lavora con noi" intro="Entra a far parte del team ATM Milano: scopri le posizioni aperte e candidati.">
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Perché lavorare in ATM</h3>
        <p style={{ marginTop: '.5rem' }}>
          ATM è l'azienda di trasporto pubblico di Milano, con oltre 10.000 dipendenti e una rete che serve milioni di passeggeri ogni giorno. 
          Offriamo un ambiente di lavoro dinamico, formazione continua e possibilità di crescita professionale.
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Contratto a tempo indeterminato (CCNL Autoferrotranvieri)</li>
          <li>Buoni pasto e welfare aziendale</li>
          <li>Abbonamento gratuito ai mezzi ATM</li>
          <li>Formazione professionale retribuita</li>
          <li>Possibilità di crescita interna</li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Posizioni aperte</h3>
        
        <div style={{ marginTop: '.75rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '.5rem' }}>
          <h4 style={{ color: 'var(--atm-red)' }}>🚇 Macchinista Metropolitana</h4>
          <p style={{ marginTop: '.25rem', fontSize: '.9rem' }}>Guida dei treni sulle linee M1, M2, M3, M4, M5.</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem', fontSize: '.85rem' }}>
            <li><strong>Requisiti:</strong> Età 21-45 anni, diploma scuola superiore, patente B</li>
            <li><strong>Orari:</strong> Turni 6:00-14:00 / 14:00-22:00 / 22:00-6:00 (rotazione)</li>
            <li><strong>Retribuzione:</strong> €1.600-2.200 netti/mese + indennità turni</li>
          </ul>
        </div>

        <div style={{ marginTop: '.75rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '.5rem' }}>
          <h4 style={{ color: 'var(--atm-red)' }}>🚌 Conducente Autobus/Tram</h4>
          <p style={{ marginTop: '.25rem', fontSize: '.9rem' }}>Guida mezzi di superficie su linee urbane ed extraurbane.</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem', fontSize: '.85rem' }}>
            <li><strong>Requisiti:</strong> Età 21-55 anni, patente D + CQC, nessuna sospensione patente negli ultimi 5 anni</li>
            <li><strong>Orari:</strong> Turni 5:30-13:30 / 13:30-21:30 / notturni (rotazione settimanale)</li>
            <li><strong>Retribuzione:</strong> €1.500-2.000 netti/mese + straordinari</li>
          </ul>
        </div>

        <div style={{ marginTop: '.75rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '.5rem' }}>
          <h4 style={{ color: 'var(--atm-red)' }}>🔧 Tecnico Manutenzione</h4>
          <p style={{ marginTop: '.25rem', fontSize: '.9rem' }}>Manutenzione e riparazione dei mezzi e degli impianti.</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem', fontSize: '.85rem' }}>
            <li><strong>Requisiti:</strong> Diploma tecnico (meccanica, elettronica, elettrotecnica), esperienza di almeno 2 anni</li>
            <li><strong>Orari:</strong> Lun-Ven 7:00-15:30 oppure turni nelle officine H24</li>
            <li><strong>Retribuzione:</strong> €1.600-2.300 netti/mese in base all'esperienza</li>
          </ul>
        </div>

        <div style={{ marginTop: '.75rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '.5rem' }}>
          <h4 style={{ color: 'var(--atm-red)' }}>👨‍💼 Addetto Stazione</h4>
          <p style={{ marginTop: '.25rem', fontSize: '.9rem' }}>Assistenza ai passeggeri e gestione delle stazioni metro.</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem', fontSize: '.85rem' }}>
            <li><strong>Requisiti:</strong> Diploma scuola superiore, buona conoscenza inglese, orientamento al cliente</li>
            <li><strong>Orari:</strong> Turni 6:00-14:00 / 14:00-22:00 (rotazione)</li>
            <li><strong>Retribuzione:</strong> €1.400-1.700 netti/mese</li>
          </ul>
        </div>

        <div style={{ marginTop: '.75rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '.5rem' }}>
          <h4 style={{ color: 'var(--atm-red)' }}>💻 Sviluppatore Software</h4>
          <p style={{ marginTop: '.25rem', fontSize: '.9rem' }}>Sviluppo applicazioni e sistemi digitali per la mobilità.</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem', fontSize: '.85rem' }}>
            <li><strong>Requisiti:</strong> Laurea in informatica/ingegneria, esperienza con React, Java o Python</li>
            <li><strong>Orari:</strong> Lun-Ven 9:00-18:00 (smart working parziale)</li>
            <li><strong>Retribuzione:</strong> €1.800-3.000 netti/mese in base alla seniority</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Processo di selezione</h3>
        <ol style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li><strong>Candidatura online</strong> - Compila il modulo sottostante</li>
          <li><strong>Screening CV</strong> - Valutazione dei requisiti (7-14 giorni)</li>
          <li><strong>Test attitudinali</strong> - Presso la nostra sede (solo per alcune posizioni)</li>
          <li><strong>Colloquio</strong> - Conoscitivo e tecnico</li>
          <li><strong>Visita medica</strong> - Idoneità psicofisica (obbligatoria per conducenti)</li>
          <li><strong>Assunzione</strong> - Contratto e formazione iniziale retribuita</li>
        </ol>
      </div>

      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Candidatura spontanea</h3>
        <p style={{ marginTop: '.5rem' }}>Compila il modulo per inviare la tua candidatura:</p>
        <div className="grid grid-2 form-grid" style={{ gap: '.5rem', marginTop: '.75rem' }}>
          <input className="input" placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
          <input className="input" placeholder="Cognome" value={form.cognome} onChange={e => setForm({...form, cognome: e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input className="input" placeholder="Telefono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
          <input className="input" placeholder="Data di nascita" type="date" value={form.dataNascita} onChange={e => setForm({...form, dataNascita: e.target.value})} />
          <input className="input" placeholder="Codice fiscale" value={form.codiceFiscale} onChange={e => setForm({...form, codiceFiscale: e.target.value})} />
          <select className="input col-span-2" value={form.posizione} onChange={e => setForm({...form, posizione: e.target.value})}>
            <option value="" disabled>Posizione di interesse</option>
            <option value="macchinista">Macchinista Metropolitana</option>
            <option value="conducente">Conducente Autobus/Tram</option>
            <option value="tecnico">Tecnico Manutenzione</option>
            <option value="stazione">Addetto Stazione</option>
            <option value="sviluppatore">Sviluppatore Software</option>
            <option value="altro">Altro / Candidatura spontanea</option>
          </select>
          <input className="input col-span-2" placeholder="Titolo di studio" value={form.titolo} onChange={e => setForm({...form, titolo: e.target.value})} />
          <textarea className="textarea col-span-2" placeholder="Breve presentazione ed esperienze lavorative rilevanti" value={form.presentazione} onChange={e => setForm({...form, presentazione: e.target.value})} />
        </div>
        <div style={{ marginTop: '.5rem' }}>
          <label style={{ fontSize: '.85rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <input type="checkbox" checked={form.privacy} onChange={e => setForm({...form, privacy: e.target.checked})} /> Acconsento al trattamento dei dati personali (GDPR)
          </label>
        </div>
        {success && (
          <div style={{ marginTop: '.75rem', padding: '.75rem', background: '#d4edda', color: '#155724', borderRadius: '.5rem', textAlign: 'center', fontWeight: 500 }}>
            ✓ Candidatura inviata con successo!
          </div>
        )}
        <div style={{ marginTop: '.75rem', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <button className="primary" disabled={!isFormValid || loading} onClick={handleSubmit} style={{ opacity: isFormValid && !loading ? 1 : 0.6 }}>
            {loading ? 'Invio in corso...' : 'Invia candidatura'}
          </button>
          <button className="secondary">Allega CV (PDF)</button>
        </div>
      </div>

      <div className="card">
        <h3>Contatti Ufficio Risorse Umane</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li><strong>Indirizzo:</strong> Foro Buonaparte 61, 20121 Milano</li>
          <li><strong>Orari ufficio:</strong> Lun-Ven 9:00-13:00, 14:00-17:00</li>
          <li><strong>Email:</strong> selezione@atm.example</li>
          <li><strong>Tel:</strong> 02.4860.7200</li>
          <li><strong>LinkedIn:</strong> ATM Milano Careers</li>
        </ul>
      </div>
    </Page>
  )
}
