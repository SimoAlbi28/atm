import { useEffect, useMemo, useRef, useState } from 'react'
import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'
import { useWallet } from '../hooks/useWallet'

type Ticket = {
  id: string
  name: string
  price: string
  detailId: string
}

type PurchaseStep = 'idle' | 'processing' | 'success'

export default function TicketsPage() {
  const { addItem } = useWallet()
  const { user } = useAuth()
  const tickets: Ticket[] = useMemo(() => ([
    { id: 't1', name: 'Urbano 90 min', price: '€ 2,20', detailId: 'urbano-90' },
    { id: 't2', name: 'Giornaliero', price: '€ 7,60', detailId: 'giornaliero' },
    { id: 't3', name: 'Carnet 10 corse', price: '€ 19,50', detailId: 'carnet-10' },
    { id: 't4', name: 'Bigiornaliero', price: '€ 12,00', detailId: 'bigiornaliero' },
    { id: 't5', name: 'Settimanale', price: '€ 17,00', detailId: 'settimanale' },
    { id: 't6', name: 'Extraurbano', price: 'da € 3,50', detailId: 'extraurbano' }
  ]), [])

  const [selected, setSelected] = useState<Ticket | null>(null)
  const [step, setStep] = useState<PurchaseStep>('idle')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (user && !email) setEmail(user.email)
  }, [user, email])

  const startPurchase = (ticket: Ticket) => {
    setSelected(ticket)
    setStep('idle')
    setError(null)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const validatePayment = () => {
    if (!selected) return 'Seleziona un biglietto'
    if (!cardName || !cardNumber || !expiry || !cvv) return 'Compila tutti i campi della carta'
    if (cardNumber.replace(/\s+/g, '').length < 12) return 'Numero carta non valido'
    if (!/^[0-9]{2}\/[0-9]{2}$/.test(expiry)) return 'Scadenza nel formato MM/AA'
    if (cvv.length < 3) return 'CVV non valido'
    if (!email) return 'Indica un indirizzo email per ricevere il biglietto'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validatePayment()
    if (validation) {
      setError(validation)
      return
    }
    setError(null)
    setStep('processing')
    await new Promise(res => setTimeout(res, 2000))
    
    // Aggiungi al wallet
    if (selected) {
      addItem({
        type: 'ticket',
        name: selected.name,
        price: selected.price,
        zones: 'Mi1-Mi3'
      })
      // Recupero il QR appena generato
      setTimeout(() => {
        const walletItems = JSON.parse(localStorage.getItem('atm-wallet') || '[]')
        if (walletItems && walletItems.length > 0) {
          setQrCode(walletItems[0].qrCode)
        }
      }, 100)
    }
    
    setStep('success')
  }

  return (
    <Page title="Biglietti e titoli di viaggio" intro="Acquista e usa i titoli di viaggio. Scopri tutte le tariffe disponibili.">
      <div className="grid grid-3">
        {tickets.map(t => (
          <article key={t.id} className="card">
            <h3>{t.name}</h3>
            <p className="tiny">Pagamento immediato con QR utilizzabile subito.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center', gap: '.5rem' }}>
              <span className="price">{t.price}</span>
              <div style={{ display: 'flex', gap: '.35rem' }}>
                <a href={`#/ticket/${t.detailId}`} className="secondary" style={{ textDecoration: 'none', padding: '.5rem .7rem' }}>Info</a>
                <button className="primary" onClick={() => startPurchase(t)}>
                  Acquista
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1rem' }} ref={formRef}>
        <h3>Pagamento e QR digitale</h3>
        {selected ? (
          <form onSubmit={handleSubmit} className="form-grid" autoComplete="off">
            <p className="tiny" style={{ marginBottom: '.5rem' }}>Stai acquistando: <strong>{selected.name}</strong> ({selected.price})</p>
            <div className="grid grid-2" style={{ gap: '.5rem' }}>
              <div className="field">
                <label className="tiny">Intestatario carta</label>
                <input className="input" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Nome e cognome" autoComplete="off" />
              </div>
              <div className="field">
                <label className="tiny">Email di invio</label>
                <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" autoComplete="off" />
              </div>
              <div className="field">
                <label className="tiny">Numero carta</label>
                <input className="input" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" autoComplete="off" />
              </div>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                <div className="field">
                  <label className="tiny">Scadenza</label>
                  <input 
                    className="input" 
                    value={expiry} 
                    onChange={e => {
                      let val = e.target.value.replace(/[^0-9]/g, '')
                      if (val.length >= 2) {
                        val = val.slice(0, 2) + '/' + val.slice(2, 4)
                      }
                      setExpiry(val.slice(0, 5))
                    }} 
                    placeholder="MM/AA" 
                    autoComplete="off" 
                    maxLength={5}
                  />
                </div>
                <div className="field">
                  <label className="tiny">CVV</label>
                  <input className="input" value={cvv} onChange={e => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))} placeholder="123" autoComplete="off" maxLength={4} />
                </div>
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <button className="primary" type="submit" disabled={step === 'processing'} style={{ width: '100%' }}>
                  {step === 'processing' ? 'Elaborazione...' : 'Paga e genera QR'}
                </button>
              </div>
            </div>
            {error && <p className="tiny" style={{ color: '#ef4444' }}>{error}</p>}
            {step === 'processing' && <p className="tiny">Elaborazione del pagamento, attendi 2 secondi...</p>}
            {step === 'success' && user && (
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                background: '#dcfce7', 
                borderRadius: '12px',
                marginTop: '1rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>✅</div>
                <h3 style={{ marginBottom: '.5rem' }}>Biglietto acquistato!</h3>
                <p className="tiny" style={{ marginBottom: '1rem' }}>
                  Il tuo biglietto <strong>{selected?.name}</strong> è stato aggiunto al wallet.
                </p>
                <a href="#/wallet" className="primary" style={{ textDecoration: 'none' }}>
                  Vai al Wallet per utilizzarlo
                </a>
              </div>
            )}
          </form>
        ) : (
          <p className="tiny" style={{ marginTop: '1rem' }}>Seleziona un biglietto per inserire i dati di pagamento e generare il QR.</p>
        )}
      </div>

      {step === 'success' && !user && qrCode && (
        <FakeQrActions qrCode={qrCode} />
      )}

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Dove acquistare</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>App ATM Milano (consigliato)</li>
          <li>Edicole, tabaccherie e distributori automatici</li>
          <li>Biglietterie ATM nelle stazioni principali</li>
          <li>Online su atm.it</li>
        </ul>
      </div>
    </Page>
  )
}

// Componenti helper
function FakeQrActions({ qrCode }: { qrCode: string }) {
  const [loadingMail, setLoadingMail] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)
  const [doneMail, setDoneMail] = useState(false)
  const [doneDownload, setDoneDownload] = useState(false)
  return (
    <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fffbe6', borderRadius: '12px', marginTop: '1rem', border: '1px solid #fde68a' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>⚠️</div>
      <h3 style={{ marginBottom: '.5rem' }}>Salva subito il tuo QR code!</h3>
      <p className="tiny" style={{ marginBottom: '1rem', color: '#b91c1c', fontWeight: 500 }}>
        Non sei loggato: <b>questo QR code scomparirà appena chiudi o aggiorni la pagina</b>.<br />
        <span style={{ color: '#dc2626' }}>Salvalo subito facendo uno screenshot, scaricalo o invialo alla tua email.</span>
      </p>
      <div style={{ margin: '2rem 0' }}>
        <img src="/qr.png" alt="QR Code" style={{ width: '180px', height: '180px', display: 'block', margin: '0 auto' }} />
        <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--text)', marginTop: '.5rem' }}>
          {qrCode}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <button className="primary" disabled={loadingMail || doneMail} onClick={() => {
          setLoadingMail(true)
          setTimeout(() => { setLoadingMail(false); setDoneMail(true) }, 1500)
        }}>
          {loadingMail ? 'Invio in corso...' : doneMail ? 'Inviato!' : 'Invia via email'}
        </button>
        <button className="secondary" disabled={loadingDownload || doneDownload} onClick={() => {
          setLoadingDownload(true)
          setTimeout(() => { setLoadingDownload(false); setDoneDownload(true) }, 1500)
        }}>
          {loadingDownload ? 'Download...' : doneDownload ? 'Scaricato!' : 'Scarica QR'}
        </button>
      </div>
      <p className="tiny" style={{ marginTop: '1.5rem', color: '#666' }}>
        Per conservare il biglietto, fai uno screenshot o accedi per salvarlo nel wallet personale.
      </p>
      <a href="#/profile" className="secondary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Accedi o registrati</a>
    </div>
  )
}
