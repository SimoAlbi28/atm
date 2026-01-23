import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const { user, login, register, logout } = useAuth()
  useEffect(() => {
    const onResize = () => {
      setOpen(false)
      setProfileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <header className="site-header">
      <div className="container header-row">
        <a href="#/" className="brand" onClick={() => { setOpen(false); setProfileOpen(false) }}>
          <img src="/image.png" alt="ATM Milano" className="brand-logo" />
        </a>
        <nav
          id="main-nav"
          className={`main-nav ${open ? 'open' : ''}`}
          onClick={() => {
            setOpen(false)
            setProfileOpen(false)
          }}
        >
          <a href="#/tickets">Biglietti</a>
          <a href="#/passes">Abbonamenti</a>
          <a href="#/lines">Linee</a>
          <a href="#/map">Mappa</a>
          <a href="#/alerts">Avvisi</a>
          <a href="#/parking">Parcheggi e ZTL</a>
          <a href="#/access">Accessibilità</a>
          <a href="#/lost">Oggetti smarriti</a>
          <a href="#/faq">FAQ</a>
          <a href="#/info">Info</a>
          <a href="#/help">Assistenza</a>
        </nav>
        <div className="header-right">
          <a className="home-btn nav-btn" href="#/" onClick={() => { setOpen(false); setProfileOpen(false) }}>
            Home
          </a>
          <div className="profile-wrap">
            <button
              className="profile-btn nav-btn"
              aria-expanded={profileOpen}
              aria-controls="profile-panel"
              onClick={() => {
                setOpen(false)
                setProfileOpen(v => !v)
              }}
            >
              Profilo
            </button>
            {profileOpen && (
              <div id="profile-panel" className="profile-panel card" role="dialog" aria-label="Area profilo">
                {user ? (
                  <>
                    <h4 style={{ marginBottom: '.25rem' }}>Ciao {user.name || 'viaggiatore'}</h4>
                    <p className="tiny" style={{ marginBottom: '.5rem' }}>{user.email}</p>
                    <div className="profile-form">
                      <a className="primary" style={{ width: '100%', textAlign: 'center' }} href="#/profile" onClick={() => setProfileOpen(false)}>
                        Vai al profilo
                      </a>
                      <button className="secondary" style={{ width: '100%' }} onClick={() => { logout(); setProfileOpen(false) }}>
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 style={{ marginBottom: '.4rem' }}>Accedi o registrati</h4>
                    <div className="profile-form">
                      <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      {authError && <p className="tiny" style={{ color: '#ef4444' }}>{authError}</p>}
                      <button
                        className="primary"
                        style={{ width: '100%' }}
                        disabled={authLoading}
                        onClick={async () => {
                          setAuthError(null)
                          setAuthLoading(true)
                          try {
                            await login(email, password)
                            setPassword('')
                          } catch (err) {
                            setAuthError(err instanceof Error ? err.message : 'Errore di accesso')
                          } finally {
                            setAuthLoading(false)
                          }
                        }}
                      >
                        {authLoading ? 'Accesso...' : 'Accedi'}
                      </button>
                      <button
                        className="secondary"
                        style={{ width: '100%' }}
                        disabled={authLoading}
                        onClick={async () => {
                          setAuthError(null)
                          setAuthLoading(true)
                          try {
                            await register(email, password)
                            setPassword('')
                          } catch (err) {
                            setAuthError(err instanceof Error ? err.message : 'Errore di registrazione')
                          } finally {
                            setAuthLoading(false)
                          }
                        }}
                      >
                        {authLoading ? 'Invio...' : 'Registrati'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            className="menu-btn nav-btn"
            aria-label="Apri menu"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => {
              setProfileOpen(false)
              setOpen(v => !v)
            }}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
