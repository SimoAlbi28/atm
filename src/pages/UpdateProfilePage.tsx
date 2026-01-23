import { useState, useEffect } from 'react'
import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'

export default function UpdateProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [birthDate, setBirthDate] = useState(user?.birthDate || '')
  const [fiscalCode, setFiscalCode] = useState(user?.fiscalCode || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.hash = '#/profile'
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [success])

  if (!user) {
    return (
      <Page title="Aggiorna dati" intro="">
        <div className="card">
          <p>Devi effettuare l'accesso per modificare i tuoi dati. <a href="#/profile" className="link">Vai al profilo</a></p>
        </div>
      </Page>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      await updateProfile({
        name,
        phone,
        address,
        birthDate,
        fiscalCode
      })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il salvataggio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title="Aggiorna dati" intro="Modifica le informazioni del tuo profilo ATM.">
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>📝 Dati personali</h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div className="field">
                <label className="tiny">Nome e cognome</label>
                <input 
                  className="input" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Mario Rossi"
                />
              </div>
              
              <div className="field">
                <label className="tiny">Email</label>
                <input 
                  className="input" 
                  value={user.email} 
                  disabled
                  style={{ background: 'var(--surface)', color: 'var(--muted)' }}
                />
                <span className="tiny" style={{ color: 'var(--muted)' }}>L'email non può essere modificata</span>
              </div>
              
              <div className="field">
                <label className="tiny">Telefono</label>
                <input 
                  className="input" 
                  type="tel"
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  placeholder="+39 333 1234567"
                />
              </div>
              
              <div className="field">
                <label className="tiny">Indirizzo</label>
                <input 
                  className="input" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  placeholder="Via Roma 1, 20100 Milano"
                />
              </div>
              
              <div className="grid grid-2" style={{ gap: '.75rem' }}>
                <div className="field">
                  <label className="tiny">Data di nascita</label>
                  <input 
                    className="input" 
                    type="date"
                    value={birthDate} 
                    onChange={e => setBirthDate(e.target.value)} 
                  />
                </div>
                
                <div className="field">
                  <label className="tiny">Codice fiscale</label>
                  <input 
                    className="input" 
                    value={fiscalCode} 
                    onChange={e => setFiscalCode(e.target.value.toUpperCase())} 
                    placeholder="RSSMRA80A01F205X"
                    maxLength={16}
                  />
                </div>
              </div>
              
              {error && (
                <p className="tiny" style={{ color: '#ef4444' }}>{error}</p>
              )}
              
              {success && (
                <div style={{ 
                  background: '#dcfce7', 
                  color: '#166534', 
                  padding: '.75rem', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem'
                }}>
                  <span>✓</span> Dati aggiornati con successo!
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                <button 
                  type="submit" 
                  className="primary" 
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? 'Salvataggio...' : 'Salva modifiche'}
                </button>
                <a 
                  href="#/profile" 
                  className="secondary"
                  style={{ textDecoration: 'none', textAlign: 'center', padding: '.75rem 1rem' }}
                >
                  Annulla
                </a>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: '.75rem' }}>ℹ️ Informazioni</h3>
            <p className="tiny" style={{ marginBottom: '.5rem' }}>
              I tuoi dati personali sono utilizzati per:
            </p>
            <ul className="tiny" style={{ paddingLeft: '1.25rem', margin: 0 }}>
              <li>Personalizzare la tua esperienza</li>
              <li>Emettere abbonamenti nominativi</li>
              <li>Inviarti comunicazioni importanti</li>
              <li>Assistenza clienti</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 style={{ marginBottom: '.75rem' }}>🔒 Privacy</h3>
            <p className="tiny">
              I tuoi dati sono trattati in conformità al GDPR. Puoi richiedere la cancellazione o l'esportazione dei tuoi dati in qualsiasi momento.
            </p>
            <a href="#/info" className="link tiny" style={{ marginTop: '.5rem', display: 'inline-block' }}>
              Leggi l'informativa privacy →
            </a>
          </div>
        </div>
      </div>
    </Page>
  )
}
