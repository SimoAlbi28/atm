type Props = {
  title: string
  intro?: string
  children: React.ReactNode
}

export default function Page({ title, children, intro }: Props) {
  return (
    <section className="page">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        {intro && <p className="tiny" style={{ marginBottom: '.75rem' }}>{intro}</p>}
        {children}
      </div>
    </section>
  )
}
