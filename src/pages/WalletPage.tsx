import Page from '../components/Page'
import { useWallet, WalletItem } from '../hooks/useWallet'

export default function WalletPage() {
  const { items } = useWallet()
  
  const tickets = items.filter(i => i.type === 'ticket')
  const passes = items.filter(i => i.type === 'pass')
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const ItemCard = ({ item }: { item: WalletItem }) => (
    <a 
      href={`#/wallet/${item.id}`} 
      className="card" 
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'block',
        transition: 'transform .2s ease, box-shadow .2s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{item.type === 'ticket' ? '🎫' : '📱'}</span>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
          </div>
          <p className="tiny" style={{ marginBottom: '.25rem' }}>
            Acquistato: {formatDate(item.purchaseDate)}
          </p>
          {item.zones && (
            <p className="tiny">Zone: {item.zones}</p>
          )}
          {item.quantity && item.quantity > 1 && (
            <p className="tiny">Quantità: {item.quantity}</p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="price" style={{ fontSize: '1.1rem' }}>{item.price}</span>
          <div className="badge" style={{ 
            marginTop: '.5rem', 
            background: '#dcfce7', 
            color: '#166534',
            fontSize: '.75rem'
          }}>
            Attivo
          </div>
        </div>
      </div>
    </a>
  )

  return (
    <Page title="Wallet" intro="I tuoi biglietti e abbonamenti acquistati. Clicca per vedere il QR code.">
      {items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💳</div>
          <h3>Il tuo wallet è vuoto</h3>
          <p className="tiny" style={{ margin: '1rem 0' }}>
            Acquista biglietti o abbonamenti per vederli qui.
          </p>
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/tickets" className="primary" style={{ textDecoration: 'none' }}>
              Acquista biglietti
            </a>
            <a href="#/passes" className="secondary" style={{ textDecoration: 'none' }}>
              Abbonamenti
            </a>
          </div>
        </div>
      ) : (
        <>
          {tickets.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                🎫 Biglietti ({tickets.length})
              </h2>
              <div className="grid grid-2">
                {tickets.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
          
          {passes.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                📱 Abbonamenti ({passes.length})
              </h2>
              <div className="grid grid-2">
                {passes.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Page>
  )
}
