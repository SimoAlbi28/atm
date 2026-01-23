import { useState, useEffect, useRef, useMemo } from 'react'
import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'

type PassData = {
  id: string
  name: string
  price: string
  priceNum: number
  duration: string
  zone: string
  desc: string
  benefits: string[]
  requirements?: string
}

const getPassData = (passId: string, zones: string[]): PassData | null => {
  const maxZone = zones.length > 0 
    ? Math.max(...zones.map(z => parseInt(z.replace('Mi', '')))) 
    : 3
  const minZone = zones.length > 0 
    ? Math.min(...zones.map(z => parseInt(z.replace('Mi', '')))) 
    : 1
  const zoneRange = zones.length > 0 ? `Mi${minZone}-Mi${maxZone}` : 'Mi1-Mi3'
  const isUrbano = maxZone <= 3
  
  const PASSES: Record<string, PassData> = {
    'mensile-urbano': {
      id: 'mensile-urbano',
      name: 'Abbonamento Mensile Urbano',
      price: '€ 39,00',
      priceNum: 39,
      duration: '30 giorni',
      zone: 'Mi1-Mi3 (urbana)',
      desc: 'L\'abbonamento mensile urbano è valido su tutta la rete ATM all\'interno della zona urbana di Milano (Mi1-Mi3). Include metro, bus, tram e filobus.',
      benefits: [
        'Viaggi illimitati per 30 giorni',
        'Valido su metro, bus, tram, filobus',
        'Attivazione immediata',
        'Ricaricabile dall\'app',
        'Trasferibile su tessera o smartphone'
      ]
    },
    'annuale-urbano': {
      id: 'annuale-urbano',
      name: 'Abbonamento Annuale Urbano',
      price: '€ 330,00',
      priceNum: 330,
      duration: '365 giorni',
      zone: 'Mi1-Mi3 (urbana)',
      desc: 'L\'abbonamento annuale offre un risparmio significativo rispetto al mensile. Ideale per chi usa quotidianamente i mezzi pubblici.',
      benefits: [
        'Risparmio di oltre € 130 rispetto al mensile',
        'Viaggi illimitati per 365 giorni',
        'Pagamento rateizzabile',
        'Valido su tutta la rete urbana',
        'Priorità per parcheggi di interscambio'
      ]
    },
    'under26': {
      id: 'under26',
      name: 'Abbonamento Under 26',
      price: isUrbano ? '€ 22,00/mese' : `€ ${22 + (maxZone - 3) * 8},00/mese`,
      priceNum: isUrbano ? 22 : 22 + (maxZone - 3) * 8,
      duration: '30 giorni',
      zone: zoneRange,
      desc: `Tariffa agevolata per giovani fino a 26 anni. Valido per zone ${zoneRange}. Richiede documento d\'identità valido.`,
      benefits: [
        'Sconto del 43% sul prezzo standard',
        'Viaggi illimitati',
        `Valido su zone ${zoneRange}`,
        'Rinnovo semplificato'
      ],
      requirements: 'Età inferiore a 26 anni. Richiesto documento d\'identità.'
    },
    'over65': {
      id: 'over65',
      name: 'Abbonamento Over 65',
      price: isUrbano ? '€ 20,00/mese' : `€ ${20 + (maxZone - 3) * 7},00/mese`,
      priceNum: isUrbano ? 20 : 20 + (maxZone - 3) * 7,
      duration: '30 giorni',
      zone: zoneRange,
      desc: `Tariffa agevolata per pensionati e anziani over 65. Valido per zone ${zoneRange}. Richiede documento d\'identità.`,
      benefits: [
        'Sconto del 48% sul prezzo standard',
        'Viaggi illimitati',
        `Valido su zone ${zoneRange}`,
        'Assistenza dedicata'
      ],
      requirements: 'Età superiore a 65 anni. Richiesto documento d\'identità.'
    },
    'integrato': {
      id: 'integrato',
      name: `Abbonamento Mensile Integrato ${zoneRange}`,
      price: `€ ${39 + (maxZone - 3) * 16},00`,
      priceNum: 39 + (maxZone - 3) * 16,
      duration: '30 giorni',
      zone: zoneRange,
      desc: `Abbonamento integrato valido per le zone ${zoneRange}. Include treni suburbani e collegamenti extraurbani. Ideale per pendolari.`,
      benefits: [
        'Include treni suburbani',
        'Valido anche per linee interurbane',
        `Collegamento con tutte le zone ${zoneRange}`,
        'Parcheggi di interscambio inclusi'
      ]
    },
    'annuale-integrato': {
      id: 'annuale-integrato',
      name: `Abbonamento Annuale Integrato ${zoneRange}`,
      price: `€ ${Math.round((39 + (maxZone - 3) * 16) * 10 * 0.85)},00`,
      priceNum: Math.round((39 + (maxZone - 3) * 16) * 10 * 0.85),
      duration: '365 giorni',
      zone: zoneRange,
      desc: `Abbonamento annuale integrato per zone ${zoneRange}. Massimo risparmio per chi viaggia quotidianamente sulle tratte extraurbane.`,
      benefits: [
        'Risparmio del 15% rispetto al mensile',
        'Viaggi illimitati per 365 giorni',
        'Include treni suburbani',
        `Valido su tutte le zone ${zoneRange}`,
        'Parcheggi di interscambio inclusi'
      ]
    },
    'mobilita-ridotta': {
      id: 'mobilita-ridotta',
      name: 'Abbonamento Mobilità Ridotta',
      price: 'Gratuito',
      priceNum: 0,
      duration: 'Annuale',
      zone: 'Intera rete',
      desc: 'Abbonamento gratuito per persone con disabilità certificata. Valido su tutta la rete ATM.',
      benefits: [
        'Completamente gratuito',
        'Valido su tutta la rete',
        'Accompagnatore gratuito',
        'Accesso prioritario',
        'Assistenza dedicata'
      ],
      requirements: 'Certificazione di invalidità civile ≥67% o certificazione L.104.'
    }
  }
  
  return PASSES[passId] || null
}

type PurchaseStep = 'idle' | 'processing' | 'success'

export default function PassDetailPage({ passId }: { passId: string }) {
  // Estrai le zone dall'URL
  const zones = useMemo(() => {
    const hash = window.location.hash
    const zonesMatch = hash.match(/zones=([^&]+)/)
    if (zonesMatch) {
      return zonesMatch[1].split(',').filter(z => z.startsWith('Mi'))
    }
    return []
  }, [])
  
  const pass = useMemo(() => getPassData(passId, zones), [passId, zones])
  const { user } = useAuth()
  const [step, setStep] = useState<PurchaseStep>('idle')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (user && !email) setEmail(user.email)
  }, [user, email])

  if (!pass) {
    return (
      <Page title="Abbonamento non trovato" intro="">
        <div className="card">
          <p>L'abbonamento richiesto non esiste. <a href="#/passes" className="link">Torna agli abbonamenti</a></p>
        </div>
      </Page>
    )
  }

  const validatePayment = () => {
    if (pass.priceNum === 0) return null
    if (!cardName || !cardNumber || !expiry || !cvv) return 'Compila tutti i campi della carta'
    if (cardNumber.replace(/\s+/g, '').length < 12) return 'Numero carta non valido'
    if (!/^[0-9]{2}\/[0-9]{2}$/.test(expiry)) return 'Scadenza nel formato MM/AA'
    if (cvv.length < 3) return 'CVV non valido'
    if (!email) return 'Indica un indirizzo email'
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
    setStep('success')
  }

  return (
    <Page title={pass.name} intro={pass.desc}>
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand)' }}>{pass.price}</span>
              <span className="badge" style={{ background: 'var(--surface)', padding: '.4rem .8rem' }}>{pass.duration}</span>
            </div>
            
            <h3>Vantaggi inclusi</h3>
            <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              {pass.benefits.map((b, i) => (
                <li key={i} style={{ marginBottom: '.25rem' }}>✓ {b}</li>
              ))}
            </ul>
            
            {pass.requirements && (
              <div style={{ marginTop: '1rem', padding: '.75rem', background: '#fef3c7', borderRadius: '8px' }}>
                <strong>Requisiti:</strong> {pass.requirements}
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Zone di validità</h3>
            <p style={{ marginTop: '.5rem' }}>{pass.zone}</p>
            <p className="tiny" style={{ marginTop: '.5rem' }}>
              L'abbonamento è valido su tutti i mezzi ATM (metro, bus, tram, filobus) all'interno delle zone indicate.
            </p>
          </div>
        </div>

        <div ref={formRef}>
          {!user ? (
            <div className="card">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>🔒</div>
                <h3>Accesso richiesto</h3>
                <p className="tiny" style={{ margin: '.75rem 0' }}>
                  Per acquistare o rinnovare un abbonamento devi prima accedere al tuo account.
                </p>
                <p className="tiny" style={{ marginBottom: '1rem' }}>
                  Clicca su <strong>Profilo</strong> nella barra di navigazione per accedere o registrarti.
                </p>
                <div style={{ 
                  padding: '.75rem', 
                  background: 'var(--surface)', 
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <p className="tiny" style={{ marginBottom: '.5rem' }}>
                    <strong>Perché devo accedere?</strong>
                  </p>
                  <ul className="tiny" style={{ paddingLeft: '1.25rem', textAlign: 'left' }}>
                    <li>L'abbonamento sarà collegato al tuo profilo</li>
                    <li>Potrai gestire rinnovi e disdette</li>
                    <li>Avrai accesso allo storico acquisti</li>
                  </ul>
                </div>
                <p className="tiny" style={{ color: 'var(--muted)' }}>
                  💡 Per i biglietti singoli non è richiesto l'accesso
                </p>
              </div>
            </div>
          ) : step === 'success' ? (
            <div className="card">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>✅</div>
                <h3>Abbonamento attivato!</h3>
                <p className="tiny" style={{ margin: '.5rem 0' }}>
                  {pass.priceNum > 0 
                    ? `Abbiamo inviato la conferma a ${email}` 
                    : 'La tua richiesta è stata registrata'}
                </p>
                <p className="tiny">
                  Puoi visualizzare il tuo abbonamento nell'area profilo.
                </p>
                <a href="#/profile" className="primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                  Vai al profilo
                </a>
              </div>
            </div>
          ) : (
            <div className="card">
              <h3>{pass.priceNum > 0 ? 'Acquista ora' : 'Richiedi abbonamento'}</h3>
              <form onSubmit={handleSubmit} className="form-grid" autoComplete="off" style={{ marginTop: '.75rem' }}>
                {pass.priceNum > 0 ? (
                  <>
                    <div className="field">
                      <label className="tiny">Intestatario carta</label>
                      <input className="input" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Nome e cognome" autoComplete="off" />
                    </div>
                    <div className="field">
                      <label className="tiny">Email</label>
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
                  </>
                ) : (
                  <>
                    <div className="field">
                      <label className="tiny">Nome e cognome</label>
                      <input className="input" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Mario Rossi" autoComplete="off" />
                    </div>
                    <div className="field">
                      <label className="tiny">Email</label>
                      <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" autoComplete="off" />
                    </div>
                    <p className="tiny">
                      Verrai contattato per completare la procedura e fornire la documentazione richiesta.
                    </p>
                  </>
                )}
                
                {error && <p className="tiny" style={{ color: '#ef4444' }}>{error}</p>}
                
                <button className="primary" type="submit" disabled={step === 'processing'} style={{ width: '100%' }}>
                  {step === 'processing' ? 'Elaborazione...' : (pass.priceNum > 0 ? `Paga ${pass.price}` : 'Invia richiesta')}
                </button>
              </form>
            </div>
          )}

          <a href="#/passes" className="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
            ← Torna agli abbonamenti
          </a>
        </div>
      </div>
    </Page>
  )
}
