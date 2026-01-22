import { useState, useEffect } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onResize = () => setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <header className="site-header">
      <div className="container header-row">
        <div className="brand">ATM Milano</div>
        <button
          className="menu-btn"
          aria-label="Apri menu"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(v => !v)}
        >
          Menu
        </button>
        <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          <a href="#/">Home</a>
          <a href="#/tickets">Biglietti</a>
          <a href="#/passes">Abbonamenti</a>
          <a href="#/lines">Linee</a>
          <a href="#/map">Mappa</a>
          <a href="#/alerts">Avvisi</a>
          <a href="#/info">Info</a>
          <a href="#/help">Assistenza</a>
        </nav>
      </div>
    </header>
  )
}
