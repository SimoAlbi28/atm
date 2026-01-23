import { useState } from 'react'
import Page from '../components/Page'
import { useAuth } from '../hooks/useAuth'

const ZONES = [
  { id: 'Mi1', name: 'Mi1', desc: 'Centro storico' },
  { id: 'Mi2', name: 'Mi2', desc: 'Prima corona urbana' },
  { id: 'Mi3', name: 'Mi3', desc: 'Seconda corona urbana' },
  { id: 'Mi4', name: 'Mi4', desc: 'Cinisello, Sesto SG' },
  { id: 'Mi5', name: 'Mi5', desc: 'Monza, Lissone' },
  { id: 'Mi6', name: 'Mi6', desc: 'Rho, Pero, Legnano' },
  { id: 'Mi7', name: 'Mi7', desc: 'Abbiategrasso, Magenta' },
  { id: 'Mi8', name: 'Mi8', desc: 'Pavia, Lodi' },
  { id: 'Mi9', name: 'Mi9', desc: 'Melzo, Gorgonzola' }
]

const getPassesForZones = (selectedZones: string[]) => {
  const maxZone = Math.max(...selectedZones.map(z => parseInt(z.replace('Mi', ''))))
  
  const basePasses = []
  
  // Abbonamento urbano (Mi1-Mi3)
  if (maxZone <= 3) {
    basePasses.push(
      { id: 'mensile-urbano', name: 'Mensile Urbano', desc: `Valido per zone Mi1-Mi3. Attivazione immediata.`, price: '€ 39,00', btn: 'Acquista' },
      { id: 'annuale-urbano', name: 'Annuale Urbano', desc: 'Risparmia con 12 mesi. Oltre 40% di sconto.', price: '€ 330,00', btn: 'Acquista' }
    )
  }
  
  // Abbonamento integrato (oltre Mi3)
  if (maxZone > 3) {
    const zoneRange = `Mi1-Mi${maxZone}`
    const basePrice = 39 + (maxZone - 3) * 16
    basePasses.push(
      { id: 'integrato', name: `Mensile Integrato ${zoneRange}`, desc: `Valido per zone ${zoneRange}. Include treni suburbani.`, price: `€ ${basePrice},00`, btn: 'Acquista' },
      { id: 'annuale-integrato', name: `Annuale Integrato ${zoneRange}`, desc: `12 mesi su zone ${zoneRange}. Massimo risparmio.`, price: `€ ${Math.round(basePrice * 10 * 0.85)},00`, btn: 'Acquista' }
    )
  }
  
  // Sempre disponibili
  basePasses.push(
    { id: 'under26', name: 'Under 26', desc: 'Tariffa agevolata per studenti fino a 26 anni.', price: maxZone <= 3 ? '€ 22,00' : `€ ${22 + (maxZone - 3) * 8},00`, btn: 'Acquista' },
    { id: 'over65', name: 'Over 65', desc: 'Abbonamento agevolato per pensionati.', price: maxZone <= 3 ? '€ 20,00' : `€ ${20 + (maxZone - 3) * 7},00`, btn: 'Acquista' },
    { id: 'mobilita-ridotta', name: 'Mobilità ridotta', desc: 'Gratuito per persone con disabilità certificata.', price: 'Gratuito', btn: 'Richiedi' }
  )
  
  return basePasses
}

export default function PassesPage() {
  const { user } = useAuth()
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [showPasses, setShowPasses] = useState(false)
  
  const toggleZone = (zoneId: string) => {
    const zoneNum = parseInt(zoneId.replace('Mi', ''))
    
    setSelectedZones(prev => {
      if (prev.length === 0) {
        // Prima selezione
        return [zoneId]
      }
      
      // Trova min e max delle zone già selezionate
      const currentNums = prev.map(z => parseInt(z.replace('Mi', '')))
      const currentMin = Math.min(...currentNums)
      const currentMax = Math.max(...currentNums)
      
      if (prev.includes(zoneId)) {
        // Deseleziona: rimuovi questa zona e tutte quelle oltre
        if (zoneNum === currentMin) {
          // Se clicco sul minimo, rimuovo tutto fino al prossimo selezionato
          return prev.filter(z => parseInt(z.replace('Mi', '')) > zoneNum)
        } else if (zoneNum === currentMax) {
          // Se clicco sul massimo, rimuovo tutto dal precedente selezionato
          return prev.filter(z => parseInt(z.replace('Mi', '')) < zoneNum)
        } else {
          // Se clicco in mezzo, deseleziono tutto
          return []
        }
      } else {
        // Seleziona: riempi tutte le zone tra min e questa nuova
        const newMin = Math.min(currentMin, zoneNum)
        const newMax = Math.max(currentMax, zoneNum)
        const newZones: string[] = []
        for (let i = newMin; i <= newMax; i++) {
          newZones.push(`Mi${i}`)
        }
        return newZones
      }
    })
  }
  
  const handleConfirm = () => {
    if (selectedZones.length > 0) {
      setShowPasses(true)
    }
  }
  
  const handleReset = () => {
    setSelectedZones([])
    setShowPasses(false)
  }
  
  const passes = getPassesForZones(selectedZones)
  
  return (
    <Page title="Abbonamenti" intro="Rinnova e gestisci il tuo abbonamento. Scegli la soluzione più conveniente.">
      {!showPasses ? (
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>🗺️ Seleziona le zone che vuoi coprire</h3>
          <p className="tiny" style={{ marginBottom: '1rem' }}>
            Seleziona le zone di Milano che desideri includere nel tuo abbonamento. Il prezzo varierà in base alle zone selezionate.
          </p>
          
          <div className="grid grid-3" style={{ gap: '.5rem', marginBottom: '1.5rem' }}>
            {ZONES.map(zone => (
              <button
                key={zone.id}
                onClick={() => toggleZone(zone.id)}
                style={{
                  padding: '.75rem',
                  border: selectedZones.includes(zone.id) ? '2px solid var(--brand)' : '1px solid var(--border)',
                  borderRadius: '10px',
                  background: selectedZones.includes(zone.id) ? '#fff7ed' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: selectedZones.includes(zone.id) ? 'var(--brand)' : 'var(--surface)',
                    color: selectedZones.includes(zone.id) ? '#fff' : 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.75rem',
                    fontWeight: 700
                  }}>
                    {selectedZones.includes(zone.id) ? '✓' : zone.id.replace('Mi', '')}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{zone.name}</div>
                    <div className="tiny">{zone.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {selectedZones.length > 0 && (
            <div style={{ 
              padding: '.75rem', 
              background: 'var(--surface)', 
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <p className="tiny">
                <strong>Zone selezionate:</strong> {selectedZones.sort().join(', ')}
              </p>
            </div>
          )}
          
          <button 
            className="primary" 
            onClick={handleConfirm}
            disabled={selectedZones.length === 0}
            style={{ width: '100%', opacity: selectedZones.length === 0 ? 0.5 : 1 }}
          >
            {selectedZones.length === 0 ? 'Seleziona almeno una zona' : 'Mostra abbonamenti disponibili'}
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div className="badge" style={{ 
              background: 'var(--surface)', 
              padding: '.5rem .75rem',
              fontSize: '.9rem'
            }}>
              📍 Zone: {selectedZones.sort().join(', ')}
            </div>
            <button className="secondary" onClick={handleReset} style={{ padding: '.5rem .75rem', color: '#dc2626', borderColor: '#fca5a5' }}>
              Cambia zone
            </button>
          </div>

          {!user && (
            <div className="card" style={{ marginBottom: '1rem', background: '#fef3c7', borderColor: '#fbbf24' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔒</span>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '.25rem' }}>Accesso richiesto per acquistare</p>
                  <p className="tiny">Per acquistare o rinnovare un abbonamento devi prima accedere. Clicca su <strong>Profilo</strong> nella navbar.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-3">
            {passes.map(p => (
              <article key={p.id} className="card">
                <h3>{p.name}</h3>
                <p className="tiny">{p.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
                  <span className="price">{p.price}</span>
                  <a href={`#/pass/${p.id}?zones=${selectedZones.join(',')}`} className="secondary" style={{ textDecoration: 'none' }}>{p.btn}</a>
                </div>
              </article>
            ))}
          </div>
          
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3>Come rinnovare</h3>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
              <li>App ATM Milano: rinnovo automatico</li>
              <li>Area personale su atm.it</li>
              <li>Biglietterie automatiche nelle stazioni</li>
              <li>Punti vendita autorizzati</li>
            </ul>
          </div>
        </>
      )}
    </Page>
  )
}
