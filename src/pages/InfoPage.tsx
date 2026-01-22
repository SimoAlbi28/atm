import Page from '../components/Page'

export default function InfoPage() {
  return (
    <Page title="Informazioni e regolamenti" intro="Tutto quello che devi sapere per viaggiare con ATM.">
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Regolamento di viaggio</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Il biglietto deve essere obliterato prima di salire sul mezzo</li>
          <li>È obbligatorio conservare il biglietto fino alla fine del viaggio</li>
          <li>In caso di controllo, mostra il biglietto valido al personale ATM</li>
          <li>Sanzione per viaggio senza titolo: da € 50 a € 500</li>
          <li>Vietato fumare su tutti i mezzi e nelle stazioni</li>
          <li>Vietato consumare cibi e bevande alcoliche</li>
          <li>I cani di piccola taglia devono essere nel trasportino; cani grandi con museruola e guinzaglio</li>
        </ul>
      </div>
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Zone tariffarie</h3>
        <p style={{ marginTop: '.5rem' }}>Il sistema tariffario è diviso in zone concentriche:</p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li><strong>MI1</strong> - Comune di Milano urbano</li>
          <li><strong>MI2</strong> - Prima cintura (fino a 12 km)</li>
          <li><strong>MI3</strong> - Seconda cintura (fino a 20 km)</li>
          <li><strong>MI4-MI9</strong> - Zone extraurbane</li>
        </ul>
      </div>
      <div className="card" style={{ marginBottom: '.75rem' }}>
        <h3>Sicurezza</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>In caso di emergenza, usa i pulsanti SOS presenti in ogni vagone e stazione</li>
          <li>Segnala comportamenti sospetti al personale o chiama 02.4860.7607</li>
          <li>Tutte le stazioni e i mezzi sono videosorvegliati</li>
          <li>Evita di ostacolare le porte durante la chiusura</li>
        </ul>
      </div>
      <div className="card">
        <h3>Norme COVID-19</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
          <li>Mascherina FFP2 raccomandata ma non obbligatoria</li>
          <li>Igienizzanti disponibili nelle stazioni principali</li>
          <li>Pulizia e sanificazione giornaliera dei mezzi</li>
          <li>Ventilazione forzata attiva su tutti i mezzi</li>
        </ul>
      </div>
    </Page>
  )
}
