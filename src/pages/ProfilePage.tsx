import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'
import { useWallet } from '../hooks/useWallet'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { items } = useWallet()

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
          <h3>💳 Il mio Wallet</h3>
          {items.length > 0 && (
            <a href="#/wallet" className="link" style={{ fontSize: '.85rem' }}>Vedi tutto ({items.length})</a>
          )}
        </div>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>💳</div>
            <p className="tiny" style={{ marginBottom: '.75rem' }}>Il tuo wallet è vuoto</p>
            <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#/tickets" className="primary" style={{ textDecoration: 'none', fontSize: '.85rem' }}>Acquista biglietti</a>
              <a href="#/passes" className="secondary" style={{ textDecoration: 'none', fontSize: '.85rem' }}>Abbonamenti</a>
            </div>
          </div>
        ) : (
          <div className="grid grid-3" style={{ gap: '.5rem' }}>
            {items.slice(0, 3).map(item => (
              <a 
                key={item.id}
                href={`#/wallet/${item.id}`} 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  padding: '.75rem',
                  background: 'var(--surface)',
                  borderRadius: '8px',
                  display: 'block'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem' }}>
                  <span>{item.type === 'ticket' ? '🎫' : '📱'}</span>
                  <span style={{ fontWeight: 600, fontSize: '.85rem' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tiny">{item.price}</span>
                  <span style={{ background: '#dcfce7', color: '#166534', fontSize: '.65rem', padding: '.2rem .4rem', borderRadius: '4px' }}>Attivo</span>
                </div>
              </a>
            ))}
          </div>
        )}
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
