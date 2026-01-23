import { useState, useMemo, useEffect } from 'react'

type Departure = {
  id: string
  line: string
  destination: string
  minutes: number
}

const METRO_LINES = [
  { id: 'M1', name: 'M1 Rossa' },
  { id: 'M2', name: 'M2 Verde' },
  { id: 'M3', name: 'M3 Gialla' },
  { id: 'M4', name: 'M4 Blu' },
  { id: 'M5', name: 'M5 Lilla' }
]

// Fermate reali di ogni linea metro di Milano
// M1 e M2 hanno diramazioni, quindi le fermate sono organizzate con il tratto comune + diramazioni
type MetroLineConfig = {
  stops: string[]
  branches?: {
    splitAfter: string  // fermata dopo la quale si divide
    directions: { name: string; stops: string[] }[]
  }
}

const METRO_CONFIG: Record<string, MetroLineConfig> = {
  M1: {
    // Tratto comune: da Sesto 1° Maggio FS a Pagano, poi si divide
    stops: [
      'Sesto 1° Maggio FS', 'Sesto Rondò', 'Sesto Marelli', 'Villa San Giovanni', 'Precotto',
      'Gorla', 'Turro', 'Rovereto', 'Pasteur', 'Loreto', 'Lima', 'Porta Venezia', 'Palestro',
      'San Babila', 'Duomo', 'Cordusio', 'Cairoli', 'Cadorna', 'Conciliazione', 'Pagano'
    ],
    branches: {
      splitAfter: 'Pagano',
      directions: [
        {
          name: 'Bisceglie',
          stops: ['De Angeli', 'Gambara', 'Bande Nere', 'Primaticcio', 'Inganni', 'Bisceglie']
        },
        {
          name: 'Rho Fieramilano',
          stops: ['Buonarroti', 'Amendola', 'Lotto', 'QT8', 'Lampugnano', 'Uruguay', 'Bonola', 'San Leonardo', 'Molino Dorino', 'Rho Fieramilano']
        }
      ]
    }
  },
  M2: {
    // La M2 ha diramazione a est (parte da Gessate O Cologno Nord) e a ovest (Abbiategrasso/Assago)
    // Usiamo Cologno Nord come capolinea principale est
    stops: [
      'Cologno Nord', 'Cologno Centro', 'Cologno Sud', 'Vimodrone', 'Cascina Burrona',
      'Cimiano', 'Crescenzago', 'Udine', 'Lambrate FS', 'Piola', 'Loreto', 'Caiazzo',
      'Centrale FS', 'Gioia', 'Garibaldi FS', 'Moscova', 'Lanza', 'Cadorna',
      'Sant\'Ambrogio', 'Sant\'Agostino', 'Porta Genova FS', 'Romolo', 'Famagosta'
    ],
    branches: {
      splitAfter: 'Famagosta',
      directions: [
        {
          name: 'Abbiategrasso',
          stops: ['Abbiategrasso']
        },
        {
          name: 'Assago Milanofiori Forum',
          stops: ['Assago Milanofiori Nord', 'Assago Milanofiori Forum']
        }
      ]
    }
  },
  M3: {
    stops: [
      'Comasina', 'Affori Centro', 'Affori FN', 'Dergano', 'Maciachini', 'Zara', 'Sondrio',
      'Centrale FS', 'Repubblica', 'Turati', 'Montenapoleone', 'Duomo', 'Missori',
      'Crocetta', 'Porta Romana', 'Lodi TIBB', 'Brenta', 'Corvetto', 'Porto di Mare',
      'Rogoredo FS', 'San Donato'
    ]
  },
  M4: {
    stops: [
      'San Cristoforo', 'Segneri', 'Gelsomini', 'Frattini', 'Tolstoj', 'Washington Bolivar',
      'Foppa', 'Parco Solari', 'Sant\'Ambrogio', 'De Amicis', 'Vetra', 'Santa Sofia',
      'Sforza Policlinico', 'San Babila', 'Tricolore', 'Dateo', 'Argonne', 'Susa',
      'Forlanini FS', 'Repetti', 'Linate Aeroporto'
    ]
  },
  M5: {
    stops: [
      'Bignami', 'Ponale', 'Bicocca', 'Ca\' Granda', 'Istria', 'Marche', 'Zara', 'Isola',
      'Garibaldi FS', 'Lanza', 'Monumentale', 'Cenisio', 'Gerusalemme', 'Domodossola',
      'Tre Torri', 'Portello', 'Lotto', 'Segesta', 'San Siro Ippodromo', 'San Siro Stadio'
    ]
  }
}

// Helper per ottenere tutte le fermate di una linea (per il dropdown) - ordinate alfabeticamente
function getAllStops(metroId: string): string[] {
  const config = METRO_CONFIG[metroId]
  if (!config) return []
  
  const allStops = [...config.stops]
  if (config.branches) {
    config.branches.directions.forEach(dir => {
      dir.stops.forEach(stop => {
        if (!allStops.includes(stop)) {
          allStops.push(stop)
        }
      })
    })
  }
  return allStops.sort((a, b) => a.localeCompare(b, 'it'))
}

// Helper per ottenere le destinazioni possibili da una fermata
function getDestinations(metroId: string, currentStop: string): string[] {
  const config = METRO_CONFIG[metroId]
  if (!config) return []
  
  const mainStops = config.stops
  const currentInMain = mainStops.indexOf(currentStop)
  const destinations: string[] = []
  
  if (config.branches) {
    // Linea con diramazioni
    const splitIndex = mainStops.indexOf(config.branches.splitAfter)
    
    if (currentInMain !== -1) {
      // Siamo nel tratto principale
      
      // Se siamo al primo capolinea (es. Sesto), possiamo andare solo verso le diramazioni
      if (currentInMain === 0) {
        config.branches.directions.forEach(dir => {
          destinations.push(dir.stops[dir.stops.length - 1])
        })
      } else {
        // Non siamo al capolinea iniziale, possiamo tornare indietro
        destinations.push(mainStops[0])
        
        // Se siamo prima o al bivio, possiamo andare verso le diramazioni
        if (currentInMain <= splitIndex) {
          config.branches.directions.forEach(dir => {
            destinations.push(dir.stops[dir.stops.length - 1])
          })
        }
      }
    } else {
      // Siamo in una diramazione
      // Trova in quale diramazione siamo
      for (const dir of config.branches.directions) {
        const idxInBranch = dir.stops.indexOf(currentStop)
        if (idxInBranch !== -1) {
          const branchTerminal = dir.stops[dir.stops.length - 1]
          
          // Se siamo al capolinea della diramazione, possiamo solo andare verso Sesto
          if (currentStop === branchTerminal) {
            destinations.push(mainStops[0])
          } else {
            // Non siamo al capolinea, possiamo andare in entrambe le direzioni
            destinations.push(mainStops[0]) // Verso Sesto
            destinations.push(branchTerminal) // Verso il capolinea della diramazione
          }
          break
        }
      }
    }
  } else {
    // Linea semplice senza diramazioni
    const idx = mainStops.indexOf(currentStop)
    if (idx > 0) destinations.push(mainStops[0])
    if (idx < mainStops.length - 1) destinations.push(mainStops[mainStops.length - 1])
  }
  
  return destinations
}

export default function Departures() {
  const [selectedMetro, setSelectedMetro] = useState('')
  const [selectedStop, setSelectedStop] = useState('')
  const [selectedDirection, setSelectedDirection] = useState('')

  // Ottiene tutte le fermate disponibili per la metro selezionata
  const availableStops = useMemo(() => selectedMetro ? getAllStops(selectedMetro) : [], [selectedMetro])

  // Ottiene le direzioni disponibili dalla fermata selezionata
  const availableDirections = useMemo(() => 
    (selectedMetro && selectedStop) ? getDestinations(selectedMetro, selectedStop) : [], 
    [selectedMetro, selectedStop]
  )

  // Resetta fermata quando cambia la metro
  useEffect(() => {
    setSelectedStop('')
    setSelectedDirection('')
  }, [selectedMetro])

  // Resetta direzione quando cambia la fermata
  useEffect(() => {
    setSelectedDirection('')
  }, [selectedStop])

  // Genera le partenze dinamiche in base alla direzione selezionata
  const departures: Departure[] = useMemo(() => {
    if (!selectedDirection) return []
    
    const results: Departure[] = []
    // Mostra i prossimi treni per la direzione selezionata
    results.push({
      id: 'd1',
      line: selectedMetro,
      destination: selectedDirection,
      minutes: Math.floor(Math.random() * 3) + 1
    })
    results.push({
      id: 'd2',
      line: selectedMetro,
      destination: selectedDirection,
      minutes: Math.floor(Math.random() * 4) + 4
    })
    results.push({
      id: 'd3',
      line: selectedMetro,
      destination: selectedDirection,
      minutes: Math.floor(Math.random() * 5) + 8
    })
    
    return results.sort((a, b) => a.minutes - b.minutes)
  }, [selectedMetro, selectedDirection])

  const handleReset = () => {
    setSelectedMetro('')
    setSelectedStop('')
    setSelectedDirection('')
  }

  return (
    <section className="departures">
      <div className="container">
        <div className="section-header">
          <h2>Prossime Partenze Metro</h2>
        </div>
        <div className="departures-search">
          <select value={selectedMetro} onChange={(e) => setSelectedMetro(e.target.value)} aria-label="Seleziona linea metro">
            <option value="">Seleziona linea</option>
            {METRO_LINES.map(line => (
              <option key={line.id} value={line.id}>{line.name}</option>
            ))}
          </select>
          <select value={selectedStop} onChange={(e) => setSelectedStop(e.target.value)} aria-label="Seleziona fermata" disabled={!selectedMetro}>
            <option value="">Seleziona fermata</option>
            {availableStops.map(stop => (
              <option key={stop} value={stop}>{stop}</option>
            ))}
          </select>
          <select value={selectedDirection} onChange={(e) => setSelectedDirection(e.target.value)} aria-label="Seleziona direzione" disabled={!selectedStop}>
            <option value="">Seleziona direzione</option>
            {availableDirections.map(dir => (
              <option key={dir} value={dir}>→ {dir}</option>
            ))}
          </select>
          {selectedMetro && (
            <button className="secondary" onClick={handleReset} style={{ padding: '.5rem .75rem', color: '#dc2626', borderColor: '#fca5a5' }}>
              Reset
            </button>
          )}
        </div>
        <ul className="departures-list">
          {departures.map((d) => (
            <li key={d.id} className="card dep-item">
              <span className="badge line">{d.line}</span>
              <div className="dep-meta">
                <div className="dest">→ {d.destination}</div>
                <div className="stop-name">Da: {selectedStop}</div>
              </div>
              <div className="eta">
                <strong>{d.minutes}'</strong>
                <span>min</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
