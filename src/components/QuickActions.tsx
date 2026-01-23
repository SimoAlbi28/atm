export default function QuickActions() {
  const actions = [
    { id: 'qa1', label: 'Acquista biglietti', anchor: '#/tickets' },
    { id: 'qa2', label: 'Ricarica abbonamento', anchor: '#/passes' },
    { id: 'qa3', label: 'Orari e linee', anchor: '#/lines' },
    { id: 'qa4', label: 'Mappa rete', anchor: '#/map' },
    { id: 'qa5', label: 'Parcheggi e ZTL', anchor: '#/parking' },
    { id: 'qa6', label: 'Accessibilità', anchor: '#/access' },
    { id: 'qa7', label: 'Lavora con noi', anchor: '#/careers' },
    { id: 'qa8', label: 'FAQ', anchor: '#/faq' }
  ]

  return (
    <section className="quick-actions">
      <div className="container grid">
        {actions.map((a) => (
          <a key={a.id} className="card action" href={a.anchor}>{a.label}</a>
        ))}
      </div>
    </section>
  )
}
