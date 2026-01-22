import Page from '../components/Page'

export default function PassesPage() {
  return (
    <Page title="Abbonamenti" intro="Rinnova e gestisci il tuo abbonamento. Scegli la soluzione più conveniente.">
      <div className="grid grid-3">
        <article className="card">
          <h3>Mensile urbano</h3>
          <p className="tiny">Valido su rete urbana. Attivazione immediata.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 39,00</span>
            <button className="secondary">Rinnova</button>
          </div>
        </article>
        <article className="card">
          <h3>Annuale urbano</h3>
          <p className="tiny">Risparmia con 12 mesi. Oltre 40% di sconto.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 330,00</span>
            <button className="secondary">Rinnova</button>
          </div>
        </article>
        <article className="card">
          <h3>Under 26</h3>
          <p className="tiny">Tariffa agevolata per studenti fino a 26 anni.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 22,00</span>
            <button className="secondary">Rinnova</button>
          </div>
        </article>
        <article className="card">
          <h3>Over 65</h3>
          <p className="tiny">Abbonamento agevolato per pensionati.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">€ 20,00</span>
            <button className="secondary">Rinnova</button>
          </div>
        </article>
        <article className="card">
          <h3>Integrato MI1-MI3</h3>
          <p className="tiny">Valido per zone MI1, MI2, MI3. Include interurbani.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">da € 55,00</span>
            <button className="secondary">Rinnova</button>
          </div>
        </article>
        <article className="card">
          <h3>Mobilità ridotta</h3>
          <p className="tiny">Gratuito per persone con disabilità certificata.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', alignItems: 'center' }}>
            <span className="price">Gratuito</span>
            <button className="secondary">Richiedi</button>
          </div>
        </article>
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
    </Page>
  )
}
