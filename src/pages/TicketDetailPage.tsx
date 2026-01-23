import Page from '../components/Page'

type TicketData = {
  id: string
  name: string
  price: string
  priceNum: number
  validity: string
  zones: string
  desc: string
  howTo: string[]
  includes: string[]
}

const TICKETS_DATA: Record<string, TicketData> = {
  'urbano-90': {
    id: 'urbano-90',
    name: 'Biglietto Urbano 90 minuti',
    price: '€ 2,20',
    priceNum: 2.20,
    validity: '90 minuti dalla prima validazione',
    zones: 'Mi1-Mi3 (zona urbana)',
    desc: 'Il biglietto standard per spostarsi su tutta la rete urbana ATM. Valido 90 minuti dalla prima validazione, permette viaggi illimitati e cambi di mezzo.',
    howTo: [
      'Acquista il biglietto (app, edicola, distributore)',
      'Valida alla prima salita (tornello metro o obliteratrice bus/tram)',
      'Viaggia liberamente per 90 minuti',
      'Puoi cambiare metro, bus e tram senza limiti'
    ],
    includes: [
      'Tutte le linee metro (M1, M2, M3, M4, M5)',
      'Bus urbani',
      'Tram e filobus',
      'Passante ferroviario (tratta urbana)'
    ]
  },
  'giornaliero': {
    id: 'giornaliero',
    name: 'Biglietto Giornaliero',
    price: '€ 7,60',
    priceNum: 7.60,
    validity: '24 ore dalla prima validazione',
    zones: 'Mi1-Mi3 (zona urbana)',
    desc: 'Ideale per chi deve fare molti spostamenti in una giornata. Valido 24 ore dalla prima validazione.',
    howTo: [
      'Acquista il biglietto',
      'Valida alla prima corsa',
      'Viaggia illimitatamente per 24 ore',
      'Conveniente da 4 viaggi in su'
    ],
    includes: [
      'Tutte le linee metro',
      'Bus, tram e filobus urbani',
      'Passante ferroviario urbano',
      'Ideale per turisti e visitatori'
    ]
  },
  'carnet-10': {
    id: 'carnet-10',
    name: 'Carnet 10 Corse',
    price: '€ 19,50',
    priceNum: 19.50,
    validity: '90 minuti per corsa',
    zones: 'Mi1-Mi3 (zona urbana)',
    desc: 'Pacchetto conveniente di 10 biglietti urbani. Ogni corsa vale 90 minuti. Risparmio rispetto all\'acquisto singolo.',
    howTo: [
      'Acquista il carnet (app o punti vendita)',
      'Valida una corsa per ogni viaggio',
      'Ogni corsa dura 90 minuti',
      'Risparmia €2,50 rispetto ai singoli'
    ],
    includes: [
      '10 corse da 90 minuti ciascuna',
      'Utilizzabili anche da persone diverse',
      'Nessuna scadenza (finché sono disponibili)',
      'Stessa validità del biglietto singolo'
    ]
  },
  'bigiornaliero': {
    id: 'bigiornaliero',
    name: 'Biglietto Bigiornaliero',
    price: '€ 12,00',
    priceNum: 12.00,
    validity: '48 ore dalla prima validazione',
    zones: 'Mi1-Mi3 (zona urbana)',
    desc: 'Perfetto per un weekend a Milano. Valido 48 ore dalla prima validazione su tutta la rete urbana.',
    howTo: [
      'Acquista il biglietto',
      'Valida quando inizi a viaggiare',
      'Hai 48 ore di viaggi illimitati',
      'Ideale per weekend o short stay'
    ],
    includes: [
      'Due giorni di viaggi illimitati',
      'Tutta la rete urbana ATM',
      'Metro, bus, tram, filobus',
      'Ottimo rapporto qualità-prezzo'
    ]
  },
  'settimanale': {
    id: 'settimanale',
    name: 'Biglietto Settimanale',
    price: '€ 17,00',
    priceNum: 17.00,
    validity: '7 giorni dalla prima validazione',
    zones: 'Mi1-Mi3 (zona urbana)',
    desc: 'Una settimana di viaggi illimitati. Ideale per chi sta a Milano per periodi medio-lunghi senza abbonamento.',
    howTo: [
      'Acquista il biglietto settimanale',
      'Valida il primo giorno di utilizzo',
      'Viaggia per 7 giorni consecutivi',
      'Alternativa flessibile all\'abbonamento'
    ],
    includes: [
      '7 giorni di viaggi illimitati',
      'Tutta la rete urbana',
      'Nessun limite di corse',
      'Più conveniente di 8 biglietti singoli'
    ]
  },
  'extraurbano': {
    id: 'extraurbano',
    name: 'Biglietto Extraurbano',
    price: 'da € 3,50',
    priceNum: 3.50,
    validity: 'Variabile in base alla tratta',
    zones: 'Oltre Mi3 (zone extraurbane)',
    desc: 'Per viaggiare oltre la zona urbana di Milano. Il prezzo varia in base alla destinazione.',
    howTo: [
      'Verifica la zona di destinazione',
      'Acquista il biglietto corretto',
      'Valida prima di salire',
      'Include anche la tratta urbana'
    ],
    includes: [
      'Collegamento con comuni limitrofi',
      'Linee interurbane',
      'Integrazione con trasporto regionale',
      'Validità anche in zona urbana'
    ]
  }
}

export default function TicketDetailPage({ ticketId }: { ticketId: string }) {
  const ticket = TICKETS_DATA[ticketId]

  if (!ticket) {
    return (
      <Page title="Biglietto non trovato" intro="">
        <div className="card">
          <p>Il biglietto richiesto non esiste. <a href="#/tickets" className="link">Torna ai biglietti</a></p>
        </div>
      </Page>
    )
  }

  return (
    <Page title={ticket.name} intro={ticket.desc}>
      <div className="grid grid-2-aside" style={{ alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand)' }}>{ticket.price}</span>
            </div>
            
            <div className="grid grid-2" style={{ gap: '.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '.75rem', background: 'var(--surface)', borderRadius: '8px' }}>
                <p className="tiny" style={{ marginBottom: '.25rem' }}>Validità</p>
                <p style={{ fontWeight: 600 }}>{ticket.validity}</p>
              </div>
              <div style={{ padding: '.75rem', background: 'var(--surface)', borderRadius: '8px' }}>
                <p className="tiny" style={{ marginBottom: '.25rem' }}>Zone</p>
                <p style={{ fontWeight: 600 }}>{ticket.zones}</p>
              </div>
            </div>

            <h3>Come usarlo</h3>
            <ol style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              {ticket.howTo.map((step, i) => (
                <li key={i} style={{ marginBottom: '.35rem' }}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Cosa include</h3>
            <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              {ticket.includes.map((item, i) => (
                <li key={i} style={{ marginBottom: '.25rem' }}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Acquista ora</h3>
            <p className="tiny" style={{ marginTop: '.5rem', marginBottom: '1rem' }}>
              Puoi acquistare questo biglietto in diversi modi:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <a href="#/tickets" className="primary" style={{ textAlign: 'center' }}>
                Acquista dall'app
              </a>
              <button className="secondary" style={{ width: '100%' }}>
                Trova punto vendita
              </button>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Punti vendita</h3>
            <ul style={{ marginTop: '.5rem', paddingLeft: '1.25rem' }}>
              <li>Distributori automatici in metro</li>
              <li>Edicole e tabaccherie</li>
              <li>Biglietterie ATM</li>
              <li>App ATM Milano</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: '1rem', background: '#fef3c7' }}>
            <h3>⚠️ Ricorda</h3>
            <p className="tiny" style={{ marginTop: '.5rem' }}>
              Valida sempre il biglietto prima di salire. I controlli sono frequenti e la multa per viaggiare senza biglietto valido è di €50.
            </p>
          </div>

          <a href="#/tickets" className="secondary" style={{ display: 'block', textAlign: 'center' }}>
            ← Torna ai biglietti
          </a>
        </div>
      </div>
    </Page>
  )
}
