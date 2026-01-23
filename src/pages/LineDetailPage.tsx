import Page from '../components/Page'

type LineData = {
  name: string
  color: string
  fullName: string
  type: 'metro' | 'tram' | 'bus'
  stops: string[]
  hours: string
  frequency: string
  info: string
}

const LINES_DATA: Record<string, LineData> = {
  M1: {
    name: 'M1',
    color: '#e30613',
    fullName: 'Linea Rossa',
    type: 'metro',
    stops: ['Sesto 1° Maggio FS', 'Sesto Rondò', 'Sesto Marelli', 'Villa San Giovanni', 'Precotto', 'Gorla', 'Turro', 'Rovereto', 'Pasteur', 'Loreto', 'Lima', 'Porta Venezia', 'Palestro', 'San Babila', 'Duomo', 'Cordusio', 'Cairoli', 'Cadorna', 'Conciliazione', 'Pagano', 'Buonarroti', 'Amendola', 'Lotto', 'QT8', 'Lampugnano', 'Uruguay', 'Bonola', 'San Leonardo', 'Molino Dorino', 'Rho Fieramilano'],
    hours: '6:00 - 00:30 (Ven-Sab fino 1:30)',
    frequency: '2-4 min (punta) / 6-8 min (sera)',
    info: 'La linea M1 è la prima metropolitana di Milano, inaugurata nel 1964. Collega la periferia est (Sesto San Giovanni) con quella ovest (Rho Fiera/Bisceglie), passando per il centro.'
  },
  M2: {
    name: 'M2',
    color: '#00843d',
    fullName: 'Linea Verde',
    type: 'metro',
    stops: ['Abbiategrasso', 'Famagosta', 'Romolo', 'Porta Genova', 'Sant\'Agostino', 'Sant\'Ambrogio', 'Cadorna', 'Lanza', 'Moscova', 'Garibaldi', 'Gioia', 'Centrale', 'Caiazzo', 'Loreto', 'Piola', 'Lambrate', 'Udine', 'Cimiano', 'Crescenzago', 'Cascina Gobba', 'Gorgonzola', 'Gessate'],
    hours: '5:40 - 00:30 (Ven-Sab fino 1:30)',
    frequency: '2-4 min (punta) / 5-7 min (sera)',
    info: 'La linea M2, inaugurata nel 1969, attraversa Milano da sud-ovest a nord-est, con diramazioni verso Abbiategrasso/Assago e Cologno Nord/Gessate.'
  },
  M3: {
    name: 'M3',
    color: '#ffd400',
    fullName: 'Linea Gialla',
    type: 'metro',
    stops: ['Comasina', 'Affori Centro', 'Affori FN', 'Dergano', 'Maciachini', 'Zara', 'Sondrio', 'Centrale', 'Repubblica', 'Turati', 'Montenapoleone', 'Duomo', 'Missori', 'Crocetta', 'Porta Romana', 'Lodi TIBB', 'Brenta', 'Corvetto', 'Porto di Mare', 'Rogoredo', 'San Donato'],
    hours: '6:00 - 00:30 (Ven-Sab fino 1:30)',
    frequency: '3-4 min (punta) / 6-8 min (sera)',
    info: 'La linea M3 è la terza metropolitana di Milano, aperta nel 1990. Collega la periferia nord (Comasina) con quella sud-est (San Donato).'
  },
  M4: {
    name: 'M4',
    color: '#0066cc',
    fullName: 'Linea Blu',
    type: 'metro',
    stops: ['Linate Aeroporto', 'Repetti', 'Stazione Forlanini', 'Argonne', 'Susa', 'Dateo', 'Tricolore', 'San Babila', 'Duomo', 'Sant\'Ambrogio', 'De Amicis', 'Sant\'Agostino', 'Coni Zugna', 'California', 'Bolivar', 'Tolstoj', 'Frattini', 'Gelsomini', 'Segneri', 'San Cristoforo'],
    hours: '5:30 - 00:30 (Ven-Sab fino 1:30)',
    frequency: '3-5 min (punta) / 6-8 min (sera)',
    info: 'La M4 è la più recente metropolitana di Milano, completata nel 2024. Collega l\'aeroporto di Linate al centro e alla zona ovest.'
  },
  M5: {
    name: 'M5',
    color: '#8b5da8',
    fullName: 'Linea Lilla',
    type: 'metro',
    stops: ['Bignami', 'Ponale', 'Bicocca', 'Ca\' Granda', 'Istria', 'Marche', 'Zara', 'Isola', 'Garibaldi', 'Monumentale', 'Cenisio', 'Gerusalemme', 'Domodossola', 'Tre Torri', 'Portello', 'Lotto', 'Segesta', 'San Siro Ippodromo', 'San Siro Stadio'],
    hours: '6:00 - 00:30 (Ven-Sab fino 1:30)',
    frequency: '4-5 min (punta) / 7-9 min (sera)',
    info: 'La linea M5, completamente automatica, è stata inaugurata nel 2013. Collega la Bicocca allo Stadio San Siro, servendo anche la zona Garibaldi.'
  }
}

export default function LineDetailPage({ lineId }: { lineId: string }) {
  const line = LINES_DATA[lineId]

  if (!line) {
    return (
      <Page title="Linea non trovata" intro="">
        <div className="card">
          <p>La linea richiesta non esiste. <a href="#/lines" className="link">Torna alle linee</a></p>
        </div>
      </Page>
    )
  }

  return (
    <Page title={`${line.name} - ${line.fullName}`} intro={line.info}>
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <span className="badge line" style={{ background: line.color, fontSize: '1.2rem', padding: '.4rem .8rem' }}>{line.name}</span>
              Fermate della linea
            </h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
              {line.stops.map((stop, i) => (
                <div key={stop} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '.75rem',
                  padding: '.5rem .75rem',
                  background: i === 0 || i === line.stops.length - 1 ? 'var(--surface)' : 'transparent',
                  borderRadius: '8px'
                }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: line.color,
                    border: '2px solid #fff',
                    boxShadow: `0 0 0 2px ${line.color}`
                  }} />
                  <span style={{ fontWeight: i === 0 || i === line.stops.length - 1 ? 700 : 400 }}>
                    {stop}
                  </span>
                  {(i === 0 || i === line.stops.length - 1) && (
                    <span className="badge" style={{ 
                      background: 'var(--brand)', 
                      color: '#fff', 
                      fontSize: '.7rem',
                      padding: '.15rem .4rem'
                    }}>
                      Capolinea
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Orari di servizio</h3>
            <p style={{ marginTop: '.5rem' }}>{line.hours}</p>
          </div>
          
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Frequenza</h3>
            <p style={{ marginTop: '.5rem' }}>{line.frequency}</p>
          </div>
          
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Servizi</h3>
            <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              <li>Ascensori in tutte le stazioni</li>
              <li>Annunci vocali e visivi</li>
              <li>Videosorveglianza 24h</li>
              <li>WiFi gratuito</li>
            </ul>
          </div>

          <a href="#/lines" className="secondary" style={{ display: 'block', textAlign: 'center' }}>
            ← Torna alle linee
          </a>
        </div>
      </div>
    </Page>
  )
}
