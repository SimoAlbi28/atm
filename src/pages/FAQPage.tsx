import Page from '../components/Page'

export default function FAQPage() {
  const faqs = [
    {
      q: 'Come posso ricaricare la mia card ATM?',
      a: 'Puoi ricaricare presso le biglietterie automatiche, app ATM Milano, punti vendita autorizzati o online su atm.it.'
    },
    {
      q: 'Cosa fare se dimentico di obliterare il biglietto?',
      a: 'Il biglietto deve essere obliterato prima di salire. In caso di controllo senza obliterazione, è prevista una sanzione anche con biglietto valido.'
    },
    {
      q: 'I bambini pagano il biglietto?',
      a: 'Bambini sotto i 6 anni viaggiano gratuitamente. Dai 6 ai 14 anni è prevista tariffa ridotta.'
    },
    {
      q: 'Posso portare la bicicletta in metro?',
      a: 'Sì, nei giorni festivi e feriali dopo le 20:00. Vietato nelle ore di punta (7:30-9:30 e 17:00-19:30).'
    },
    {
      q: 'Come funziona l\'abbonamento mensile?',
      a: 'L\'abbonamento è valido per 30 giorni dalla prima obliterazione. Può essere caricato su card ricaricabile o acquistato come biglietto cartaceo.'
    },
    {
      q: 'Posso richiedere rimborso per ritardi?',
      a: 'I rimborsi sono previsti solo per ritardi superiori a 60 minuti documentati su linee suburbane e regionali.'
    },
    {
      q: 'Dove trovo gli orari delle linee notturne?',
      a: 'Le linee notturne (NM) funzionano dopo la chiusura della metro (00:30-6:00). Consulta la sezione Linee o l\'app ATM.'
    },
    {
      q: 'Come funziona l\'Area C?',
      a: 'Area C è attiva Lun-Ven 7:30-19:30. Il pagamento (€5) si effettua online o presso i punti vendita entro mezzanotte.'
    }
  ]

  return (
    <Page title="Domande frequenti (FAQ)" intro="Risposte alle domande più comuni su biglietti, abbonamenti e servizi.">
      <div style={{ display: 'grid', gap: '.75rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="card">
            <h3 style={{ marginBottom: '.5rem' }}>{faq.q}</h3>
            <p className="tiny">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Non hai trovato risposta?</h3>
        <p style={{ marginTop: '.5rem' }}>
          Contatta il nostro <a href="#/help" className="link">servizio clienti</a> o consulta la sezione <a href="#/info" className="link">Informazioni</a>.
        </p>
      </div>
    </Page>
  )
}
