import { useState } from 'react'
import Page from '../components/Page'
import { useWallet } from '../hooks/useWallet'

export default function WalletItemPage({ itemId }: { itemId: string }) {
  const { getItem, removeItem } = useWallet()
  const item = getItem(itemId)
  const [showQrModal, setShowQrModal] = useState(false)
  
  if (!item) {
    return (
      <Page title="Non trovato" intro="">
        <div className="card">
          <p>Elemento non trovato nel wallet. <a href="#/wallet" className="link">Torna al wallet</a></p>
        </div>
      </Page>
    )
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getExpiryDate = () => {
    const purchaseDate = new Date(item.purchaseDate)
    let daysToAdd = 1 // default per biglietti
    if (item.duration) {
      if (item.duration.includes('365')) daysToAdd = 365
      else if (item.duration.includes('30')) daysToAdd = 30
      else if (item.duration.includes('7')) daysToAdd = 7
      else if (item.duration.includes('2')) daysToAdd = 2
    }
    const expiry = new Date(purchaseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
    return expiry.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric'
    })
  }
  
  const handleDelete = () => {
    if (confirm('Sei sicuro di voler eliminare questo elemento dal wallet?')) {
      removeItem(item.id)
      window.location.hash = '#/wallet'
    }
  }

  return (
    <Page title={item.name} intro={item.type === 'ticket' ? 'Biglietto elettronico' : 'Abbonamento digitale'}>
      {/* Modal QR ingrandito */}
      {showQrModal && (
        <div 
          onClick={() => setShowQrModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer'
          }}
        >
          <div style={{ 
            background: '#fff', 
            padding: '2rem', 
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '90vw'
          }}>
            <img 
              src="/qr.png" 
              alt="QR Code" 
              style={{ 
                width: '280px', 
                height: '280px',
                display: 'block',
                margin: '0 auto'
              }} 
            />
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '1.5rem', 
              fontWeight: 700,
              letterSpacing: '3px',
              marginTop: '1rem'
            }}>
              {item.qrCode}
            </div>
            <p className="tiny" style={{ marginTop: '.75rem', color: '#666' }}>
              Clicca ovunque per chiudere
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          {/* QR Code principale */}
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div 
              onClick={() => setShowQrModal(true)}
              style={{ 
                background: '#fff', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '2px solid var(--border)',
                display: 'inline-block',
                marginBottom: '1rem',
                cursor: 'pointer',
                transition: 'transform .2s ease, box-shadow .2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img 
                src="/qr.png" 
                alt="QR Code" 
                style={{ 
                  width: '180px', 
                  height: '180px',
                  display: 'block'
                }} 
              />
            </div>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '1.25rem', 
              fontWeight: 700,
              letterSpacing: '2px',
              color: 'var(--text)'
            }}>
              {item.qrCode}
            </div>
            <p className="tiny" style={{ marginTop: '.75rem', color: 'var(--muted)' }}>
              Clicca sul QR per ingrandirlo
            </p>
          </div>
          
          {/* Dettagli */}
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>📋 Dettagli</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                <span className="tiny">Tipo</span>
                <span style={{ fontWeight: 600 }}>{item.type === 'ticket' ? 'Biglietto' : 'Abbonamento'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                <span className="tiny">Prezzo</span>
                <span style={{ fontWeight: 600 }}>{item.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                <span className="tiny">Data acquisto</span>
                <span style={{ fontWeight: 600 }}>{formatDate(item.purchaseDate)}</span>
              </div>
              {item.zones && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                  <span className="tiny">Zone validità</span>
                  <span style={{ fontWeight: 600 }}>{item.zones}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                <span className="tiny">Scadenza</span>
                <span style={{ fontWeight: 600 }}>{getExpiryDate()}</span>
              </div>
              {item.quantity && item.quantity > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem', borderBottom: '1px solid var(--border)' }}>
                  <span className="tiny">Quantità</span>
                  <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          {/* Stato */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                ✓
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#166534' }}>Attivo</div>
                <div className="tiny">Pronto per l'utilizzo</div>
              </div>
            </div>
          </div>
          
          {/* Istruzioni */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: '.75rem' }}>📱 Come usare</h3>
            <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
              <li style={{ marginBottom: '.5rem' }}>Avvicinati ai tornelli della metro</li>
              <li style={{ marginBottom: '.5rem' }}>Mostra il QR code al lettore</li>
              <li style={{ marginBottom: '.5rem' }}>Attendi il segnale verde</li>
              <li>Passa il tornello</li>
            </ol>
            <p className="tiny" style={{ marginTop: '.75rem', padding: '.5rem', background: 'var(--surface)', borderRadius: '6px' }}>
              💡 Su bus e tram, mostra il QR code al conducente o al validatore.
            </p>
          </div>
          
          {/* Azioni */}
          <div className="card">
            <h3 style={{ marginBottom: '.75rem' }}>⚙️ Azioni</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <a href="#/wallet" className="secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
                ← Torna al wallet
              </a>
              <button 
                onClick={handleDelete}
                style={{ 
                  padding: '.75rem 1rem',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  background: '#fef2f2',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                🗑️ Elimina dal wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
