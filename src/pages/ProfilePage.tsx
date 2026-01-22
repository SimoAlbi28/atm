import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <Page title="Profilo" intro="Accedi o registrati dal pulsante Profilo in alto per gestire i tuoi dati.">
        <div className="card">
          <p style={{ marginBottom: '.75rem' }}>Non risulti connesso. Usa il menu in alto per accedere o creare un account, poi torna qui per vedere i tuoi dati e biglietti salvati.</p>
          <a className="primary" href="#/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
            Torna alla home
          </a>
        </div>
      </Page>
    )
  }

  return (
    <Page title="Profilo" intro="Gestisci i tuoi dati e i tuoi titoli di viaggio in un unico posto.">
      <div className="grid grid-2" style={{ marginBottom: '.75rem' }}>
        <div className="card">
          <h3>Account</h3>
          <p className="tiny" style={{ marginBottom: '.75rem' }}>Informazioni principali del tuo profilo.</p>
          <ul style={{ paddingLeft: '1.1rem', margin: 0, display: 'grid', gap: '.35rem' }}>
            <li><strong>Nome:</strong> {user.name || 'Profilo ATM'}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Tessera:</strong> 0123 4567 89</li>
            <li><strong>Preferenze:</strong> Notifiche via app, lingua italiano</li>
          </ul>
        </div>
        <div className="card">
          <h3>Abbonamenti</h3>
          <p className="tiny" style={{ marginBottom: '.75rem' }}>Controlla lo stato e rinnova in pochi tap.</p>
          <ul style={{ paddingLeft: '1.1rem', margin: 0, display: 'grid', gap: '.35rem' }}>
            <li><strong>Urbano mensile:</strong> Attivo fino al 30/01/2026</li>
            <li><strong>Ultimo rinnovo:</strong> 30/12/2025 • €39</li>
            <li><strong>Metodo pagamento:</strong> Visa **** 1820</li>
            <li><strong>Ricevute:</strong> Scarica PDF degli ultimi 6 mesi</li>
          </ul>
        </div>
      </div>
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Azioni rapide</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.5rem' }}>
          <button className="primary">Rinnova abbonamento</button>
          <button className="secondary">Aggiorna dati</button>
          <button className="secondary">Gestisci notifiche</button>
        </div>
      </div>
      <div className="card">
        <h3>Sessione</h3>
        <p className="tiny" style={{ marginBottom: '.5rem' }}>Rimani connesso fino a quando non esegui il logout.</p>
        <button className="secondary" onClick={logout}>Logout</button>
      </div>
    </Page>
  )
}
