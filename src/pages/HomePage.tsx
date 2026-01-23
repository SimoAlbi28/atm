import { useState, useEffect } from 'react'
import ServiceStatus from '../components/ServiceStatus'
import TripPlanner, { type TripQuery } from '../components/TripPlanner'
import TripResults, { type TripResult } from '../components/TripResults'
import Alerts from '../components/Alerts'
import Departures from '../components/Departures'
import { useWallet } from '../hooks/useWallet'

function WalletPreview() {
  const { items } = useWallet()
  
  if (items.length === 0) {
    return (
      <section className="section">
        <h2>💳 Wallet</h2>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>💳</div>
          <p style={{ fontWeight: 600, marginBottom: '.25rem' }}>Il tuo wallet è vuoto</p>
          <p className="tiny" style={{ marginBottom: '1rem' }}>Acquista biglietti o abbonamenti per vederli qui</p>
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/tickets" className="primary" style={{ textDecoration: 'none' }}>Acquista biglietti</a>
            <a href="#/passes" className="secondary" style={{ textDecoration: 'none' }}>Abbonamenti</a>
          </div>
        </div>
      </section>
    )
  }
  
  const recentItems = items.slice(0, 3)
  
  return (
    <section className="section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem', paddingRight: '.5rem' }}>
        <h2>💳 Wallet</h2>
        <a href="#/wallet" className="link" style={{ fontSize: '.9rem', whiteSpace: 'nowrap' }}>Vedi tutto ({items.length})</a>
      </div>
      <div className="grid grid-3">
        {recentItems.map(item => (
          <a 
            key={item.id}
            href={`#/wallet/${item.id}`} 
            className="card" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{item.type === 'ticket' ? '🎫' : '📱'}</span>
              <h3 style={{ margin: 0, fontSize: '.95rem' }}>{item.name}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="price" style={{ fontSize: '.9rem' }}>{item.price}</span>
              <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: '.7rem' }}>Attivo</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [results, setResults] = useState<TripResult[]>([])

  function handleSearch(q: TripQuery) {
    const now = new Date()
    const base = q.when === 'now' ? now : new Date(now.toDateString() + ' ' + q.time)
    const mocked: TripResult[] = [
      {
        id: 'r1',
        durationMin: 12,
        transfers: 0,
        summary: `Linea M3 da ${q.from} a ${q.to}`,
        departure: base.toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 12 * 60000).toTimeString().slice(0, 5)
      },
      {
        id: 'r2',
        durationMin: 16,
        transfers: 1,
        summary: `M1 + M2 con 1 cambio a Cadorna`,
        departure: new Date(base.getTime() + 3 * 60000).toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 19 * 60000).toTimeString().slice(0, 5)
      },
      {
        id: 'r3',
        durationMin: 22,
        transfers: 1,
        summary: `Tram 15 + M2 soluzione alternativa`,
        departure: new Date(base.getTime() + 6 * 60000).toTimeString().slice(0, 5),
        arrival: new Date(base.getTime() + 28 * 60000).toTimeString().slice(0, 5)
      }
    ]
    setResults(mocked)
  }

  return (
    <>
      <ServiceStatus />
      <WalletPreview />
      <TripPlanner onSearch={handleSearch} />
      <TripResults items={results} />
      <Alerts />
      <Departures />
    </>
  )
}
