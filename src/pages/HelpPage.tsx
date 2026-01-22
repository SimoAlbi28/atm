import Page from '../components/Page'

export default function HelpPage() {
  return (
    <Page title="Assistenza clienti" intro="Contatta il supporto per informazioni, reclami e assistenza.">
      <div className="grid grid-3">
        <article className="card">
          <h3>Customer Care</h3>
          <p className="tiny" style={{ marginTop: '.5rem' }}>Numero verde gratuito</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, margin: '.5rem 0' }}>800.123.456</p>
          <p className="tiny">Lun-Ven: 7:00-20:00<br />Sab-Dom: 9:00-18:00</p>
        </article>
        <article className="card">
          <h3>Email</h3>
          <p className="tiny" style={{ marginTop: '.5rem' }}>Per segnalazioni e reclami</p>
          <p style={{ fontWeight: 600, margin: '.5rem 0' }}>assistenza@atm.example</p>
          <p className="tiny">Risposta entro 48h lavorative</p>
        </article>
        <article className="card">
          <h3>Social e App</h3>
          <p className="tiny" style={{ marginTop: '.5rem' }}>Aggiornamenti in tempo reale</p>
          <ul style={{ paddingLeft: '1.25rem', margin: '.5rem 0' }}>
            <li>Twitter: @ATMMilano</li>
            <li>App ATM Milano</li>
          </ul>
        </article>
      </div>
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Sportelli fisici</h3>
        <div className="grid grid-2" style={{ marginTop: '.75rem' }}>
          <div>
            <h4 style={{ marginBottom: '.25rem' }}>Info Point Duomo</h4>
            <p className="tiny">Stazione M1/M3 Duomo<br />Lun-Sab: 7:45-19:30</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '.25rem' }}>Info Point Centrale</h4>
            <p className="tiny">Stazione M2/M3 Centrale FS<br />Lun-Sab: 7:45-19:30</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '.25rem' }}>Info Point Cadorna</h4>
            <p className="tiny">Stazione M1/M2 Cadorna<br />Lun-Ven: 8:00-18:00</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '.25rem' }}>Info Point Loreto</h4>
            <p className="tiny">Stazione M1/M2 Loreto<br />Lun-Ven: 8:00-18:00</p>
          </div>
        </div>
      </div>
    </Page>
  )
}
