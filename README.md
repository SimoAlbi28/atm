## ATM Milano — Sito demo

Una piattaforma web completa ispirata ad ATM Milano, con interfaccia pulita, mobile-responsive e modulare.

### Funzionalità principali

**Homepage**
- Pianificatore viaggio con orario personalizzabile
- Stato servizio in tempo reale
- Azioni rapide per tutte le funzionalità
- Prossime partenze in tempo reale (mock)
- Avvisi LIVE con badge animato

**Pagine dedicate**
- **Biglietti**: 6+ tipologie con prezzi e descrizioni
- **Abbonamenti**: mensili, annuali, agevolati
- **Linee**: tutte le metro (M1-M5), tram, bus + fermate vicine con geolocalizzazione
- **Mappa**: mappa interattiva SVG con 5 linee metro e interscambi
- **Avvisi**: filtro per linea, stati attivo/risolto, dettagli completi
- **Parcheggi e ZTL**: info park&ride e Area C
- **Accessibilità**: info ascensori, mezzi accessibili, assistenza
- **Oggetti smarriti**: modulo segnalazione
- **FAQ**: 8+ domande frequenti
- **Info e regolamenti**: zone tariffarie, sicurezza, norme COVID
- **Assistenza**: contatti, sportelli fisici, orari

**Caratteristiche tecniche**
- ✅ **Mobile-first**: perfettamente adattato a ogni dimensione schermo
- ✅ **Componenti modulari**: ogni sezione in file separato
- ✅ **Hash routing**: navigazione senza refresh
- ✅ **TypeScript**: type-safe
- ✅ **Zero dipendenze esterne** (solo React)

## Avvio rapido

Prerequisiti: Node 18+ e pnpm.

```bash
# Installazione
pnpm install

# Sviluppo locale
pnpm dev

# Build di produzione
pnpm build
pnpm preview
```

## Struttura del progetto

```
src/
├── App.tsx                 # Router principale (pulito)
├── App.css                 # Stili componenti
├── index.css               # Stili base e variabili
├── components/             # Componenti riutilizzabili
│   ├── Header.tsx          # Navigazione + mobile menu
│   ├── Footer.tsx          # Footer con link
│   ├── ServiceStatus.tsx   # Barra stato servizio
│   ├── TripPlanner.tsx     # Pianificatore viaggio
│   ├── QuickActions.tsx    # Azioni rapide 4x2 grid
│   ├── TripResults.tsx     # Risultati ricerca
│   ├── Alerts.tsx          # Widget avvisi home
│   ├── Departures.tsx      # Prossime partenze
│   ├── NearbyStops.tsx     # Fermate vicine (geoloc)
│   └── Page.tsx            # Template pagina base
├── pages/                  # Schermate complete
│   ├── HomePage.tsx        # Home con tutti i widget
│   ├── TicketsPage.tsx     # Biglietti
│   ├── PassesPage.tsx      # Abbonamenti
│   ├── LinesPage.tsx       # Linee e orari
│   ├── MapPage.tsx         # Mappa metro SVG
│   ├── AlertsPage.tsx      # Avvisi completi con filtri
│   ├── ParkingPage.tsx     # Parcheggi e ZTL
│   ├── AccessibilityPage.tsx
│   ├── LostAndFoundPage.tsx
│   ├── HelpPage.tsx        # Assistenza
│   ├── FAQPage.tsx         # Domande frequenti
│   └── InfoPage.tsx        # Regolamenti
├── data/
│   └── alerts.ts           # Dati avvisi mock
└── hooks/
    └── useHashRoute.ts     # Hook routing
```

## Pagine disponibili

| URL | Descrizione |
|-----|-------------|
| `#/` | Homepage completa |
| `#/tickets` | Biglietti e tariffe |
| `#/passes` | Abbonamenti |
| `#/lines` | Linee metro/tram/bus |
| `#/map` | Mappa metropolitana |
| `#/alerts` | Avvisi tempo reale |
| `#/parking` | Parcheggi e Area C |
| `#/access` | Accessibilità |
| `#/lost` | Oggetti smarriti |
| `#/faq` | Domande frequenti |
| `#/info` | Info e regolamenti |
| `#/help` | Assistenza clienti |

## Note

- **Dati dimostrativi**: tutti i dati sono mock (prezzi, orari, avvisi)
- **Geolocalizzazione**: fermate vicine usa API browser (richiede consenso)
- **Design ispirato**: prende spunto da ATM ma non riproduce contenuti protetti
- **Completamente responsive**: testato su mobile, tablet, desktop

## Licenza

Progetto dimostrativo non ufficiale.
