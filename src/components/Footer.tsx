export default function Footer() {
  return (
    <footer className="site-footer" id="help">
      <div className="container footer-grid">
        <div>
          <div className="brand">ATM Milano</div>
          <p>Informazioni, assistenza e supporto al viaggio.</p>
        </div>
        <div>
          <h4>Contatti</h4>
          <ul>
            <li>Customer Care: 800.123.456</li>
            <li>Segnalazioni: assistenza@atm.example</li>
          </ul>
        </div>
        <div>
          <h4>Link utili</h4>
          <ul>
            <li><a href="#/tickets">Biglietti e tariffe</a></li>
            <li><a href="#/passes">Abbonamenti</a></li>
            <li><a href="#/faq">FAQ</a></li>
            <li><a href="#/info">Info e regolamenti</a></li>
          </ul>
        </div>
      </div>
      <div className="container tiny">© {new Date().getFullYear()} Sito dimostrativo non ufficiale.</div>
    </footer>
  )
}
