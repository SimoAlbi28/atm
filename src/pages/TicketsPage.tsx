import { useEffect, useMemo, useRef, useState } from 'react'
import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'

type Ticket = {
  id: string
  name: string
  price: string
}

type PurchaseStep = 'idle' | 'processing' | 'qr'

export default function TicketsPage() {
  const { user } = useAuth()
  const tickets: Ticket[] = useMemo(() => ([
    { id: 't1', name: 'Urbano 90 min', price: '€ 2,20' },
    { id: 't2', name: 'Giornaliero', price: '€ 7,60' },
    { id: 't3', name: 'Carnet 10 corse', price: '€ 19,50' },
    { id: 't4', name: 'Bigiornaliero', price: '€ 12,00' },
    { id: 't5', name: 'Settimanale', price: '€ 17,00' },
    { id: 't6', name: 'Extraurbano', price: 'da € 3,50' }
  ]), [])

  const [selected, setSelected] = useState<Ticket | null>(null)
  const [step, setStep] = useState<PurchaseStep>('idle')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const formRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (user && !email) setEmail(user.email)
  }, [user, email])

  const startPurchase = (ticket: Ticket) => {
    setSelected(ticket)
    setStep('idle')
    setQrDataUrl(null)
    setEmailSent(false)
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
    setQrDataUrl(null)
    setEmailSent(false)
    await new Promise(res => setTimeout(res, 2000))
    const code = `ATM-${selected!.id}-${Date.now()}`
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><rect width='320' height='320' fill='%23fff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='18' fill='%23000'>${code}</text><rect x='20' y='20' width='80' height='80' fill='%23000'/><rect x='220' y='220' width='80' height='80' fill='%23000'/><rect x='150' y='150' width='40' height='40' fill='%23000'/></svg>`
    setQrDataUrl(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`)
    setStep('qr')
  }

  return (
    <Page title="Biglietti e titoli di viaggio" intro="Acquista e usa i titoli di viaggio. Scopri tutte le tariffe disponibili.">
      <div className="grid grid-3">
        {tickets.map(t => (
          <article key={t.id} className="card">
            <h3>{t.name}</h3>
            <p className="tiny">Pagamento immediato con QR utilizzabile subito.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
              <span className="price">{t.price}</span>
              <button className="primary" onClick={() => startPurchase(t)}>
                Acquista
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1rem' }} ref={formRef}>
        <h3>Pagamento e QR digitale</h3>
        {selected ? (
          <form onSubmit={handleSubmit} className="form-grid">
            <p className="tiny" style={{ marginBottom: '.5rem' }}>Stai acquistando: <strong>{selected.name}</strong> ({selected.price})</p>
            <div className="grid grid-2" style={{ gap: '.5rem' }}>
              <div className="field">
                <label className="tiny">Intestatario carta</label>
                <input className="input" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Nome e cognome" />
              </div>
              <div className="field">
                <label className="tiny">Email di invio</label>
                <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
              </div>
              <div className="field">
                <label className="tiny">Numero carta</label>
                <input className="input" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '.5rem' }}>
                <div className="field">
                  <label className="tiny">Scadenza</label>
                  <input className="input" value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/AA" />
                </div>
                <div className="field">
                  <label className="tiny">CVV</label>
                  <input className="input" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="123" />
                </div>
                <div className="field" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button className="primary" type="submit" disabled={step === 'processing'}>
                    {step === 'processing' ? 'Elaborazione...' : 'Paga e genera QR'}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="tiny" style={{ color: '#ef4444' }}>{error}</p>}
            {step === 'processing' && <p className="tiny">Elaborazione del pagamento, attendi 2 secondi...</p>}
            {step === 'qr' && qrDataUrl && (
              <div className="qr-wrap">
                <img src={qrDataUrl} alt="QR del biglietto" style={{ maxWidth: '240px' }} />
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
                  <a className="primary" href={qrDataUrl} download={`biglietto-${selected.id}.svg`} style={{ textAlign: 'center' }}>
                    Scarica QR
                  </a>
                  <button
                    className="secondary"
                    type="button"
                    onClick={() => setEmailSent(true)}
                  >
                    Invia via email
                  </button>
                </div>
                {emailSent && <p className="tiny" style={{ marginTop: '.35rem' }}>Inviato a {email}. Controlla la tua casella.</p>}
              </div>
            )}
          </form>
        ) : (
          <p className="tiny">Seleziona un biglietto per inserire i dati di pagamento e generare il QR.</p>
        )}
      </div>

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
