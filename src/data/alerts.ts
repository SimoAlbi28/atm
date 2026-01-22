export type Alert = {
  id: string
  title: string
  text: string
  line: string
  type: 'works' | 'delay' | 'skip' | 'event'
  status: 'active' | 'resolved'
  time: string
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    title: 'Lavori notturni linea M2',
    text: 'Servizio sospeso tra Cascina Gobba e Gessate dalle 22:00 alle 5:00. Bus sostitutivi in servizio.',
    line: 'M2',
    type: 'works',
    status: 'active',
    time: '22:00-05:00'
  },
  {
    id: 'a2',
    title: 'Deviazione linea 54',
    text: 'Percorso modificato in zona Dateo per evento cittadino fino a domenica.',
    line: '54',
    type: 'event',
    status: 'active',
    time: 'fino a dom'
  },
  {
    id: 'a3',
    title: 'Fermata Loreto M1 saltata',
    text: 'Per lavori di manutenzione straordinaria, i treni non fermano a Loreto M1 oggi dalle 14:00 alle 18:00.',
    line: 'M1',
    type: 'skip',
    status: 'active',
    time: '14:00-18:00'
  },
  {
    id: 'a4',
    title: 'Ritardi linea M3',
    text: 'Ritardi fino a 10 minuti sulla linea M3 per guasto tecnico risolto. Servizio in normalizzazione.',
    line: 'M3',
    type: 'delay',
    status: 'resolved',
    time: 'risolto 13:30'
  },
  {
    id: 'a5',
    title: 'Ascensore Cadorna M2 fuori servizio',
    text: 'Ascensore fuori servizio. Utilizzare accessi alternativi o fermata Cairoli.',
    line: 'M2',
    type: 'skip',
    status: 'active',
    time: 'oggi'
  }
]
