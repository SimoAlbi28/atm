import Page from '../components/Page'

export default function ParkingPage() {
  return (
    <Page title="Parcheggi e ZTL" intro="Info sui parcheggi di interscambio e varchi Area C.">
      <h3 style={{ marginBottom: '.5rem' }}>Parcheggi di interscambio</h3>
      <div className="grid grid-3">
        <article className="card">
          <h3>Famagosta</h3>
          <p className="tiny">Fermata: M2 Famagosta</p>
          <p className="tiny">Posti: 1200</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
        <article className="card">
          <h3>Cascina Gobba</h3>
          <p className="tiny">Fermata: M2 Cascina Gobba</p>
          <p className="tiny">Posti: 1800</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
        <article className="card">
          <h3>San Donato</h3>
          <p className="tiny">Fermata: M3 San Donato</p>
          <p className="tiny">Posti: 900</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
        <article className="card">
          <h3>Lampugnano</h3>
          <p className="tiny">Fermata: M1 Lampugnano</p>
          <p className="tiny">Posti: 2100</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
        <article className="card">
          <h3>Bisceglie</h3>
          <p className="tiny">Fermata: M1 Bisceglie</p>
          <p className="tiny">Posti: 650</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
        <article className="card">
          <h3>Rogoredo</h3>
          <p className="tiny">Fermata: M3 Rogoredo</p>
          <p className="tiny">Posti: 500</p>
          <p className="tiny">Tariffa: € 2,00/giorno con abbonamento</p>
        </article>
      </div>
      <h3 style={{ marginTop: '1.5rem', marginBottom: '.5rem' }}>Area C - Zona a traffico limitato</h3>
      <div className="card">
        <p>L'Area C è attiva dal lunedì al venerdì, dalle 7:30 alle 19:30 (esclusi festivi).</p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Tariffa ingresso: € 5,00</li>
          <li>Residenti: tariffa agevolata dopo 40 ingressi annuali</li>
          <li>Veicoli elettrici e ibridi: esenzione fino al 2025</li>
          <li>Moto e scooter elettrici: libero accesso</li>
        </ul>
      </div>
    </Page>
  )
}
