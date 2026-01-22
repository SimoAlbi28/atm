import Page from '../components/Page'

export default function TicketsPage() {
  return (
    <Page title="Biglietti e titoli di viaggio" intro="Acquista e usa i titoli di viaggio. Scopri tutte le tariffe disponibili.">
      <div className="grid grid-3">
        <article className="card">
          <h3>Urbano 90 min</h3>
          <p className="tiny">Valido 90 minuti su rete urbana. Consente cambi illimitati.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 2,20</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
        <article className="card">
          <h3>Giornaliero</h3>
          <p className="tiny">Viaggi illimitati per 24 ore dall'obliterazione.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 7,60</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
        <article className="card">
          <h3>Carnet 10 corse</h3>
          <p className="tiny">Blocco da 10 corse urbane. Risparmio garantito.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 19,50</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
        <article className="card">
          <h3>Bigiornaliero</h3>
          <p className="tiny">Valido 48 ore consecutive. Ideale per weekend.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 12,00</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
        <article className="card">
          <h3>Settimanale</h3>
          <p className="tiny">Viaggi illimitati per 7 giorni.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 17,00</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
        <article className="card">
          <h3>Extraurbano</h3>
          <p className="tiny">Per linee suburbane e interurbane.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">da € 3,50</span>
            <button className="primary">Acquista</button>
          </div>
        </article>
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
