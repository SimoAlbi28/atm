import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TicketsPage from './pages/TicketsPage'
import TicketDetailPage from './pages/TicketDetailPage'
import PassesPage from './pages/PassesPage'
import PassDetailPage from './pages/PassDetailPage'
import LinesPage from './pages/LinesPage'
import LineDetailPage from './pages/LineDetailPage'
import MapPage from './pages/MapPage'
import AlertsPage from './pages/AlertsPage'
import AlertDetailPage from './pages/AlertDetailPage'
import ParkingPage from './pages/ParkingPage'
import AccessibilityPage from './pages/AccessibilityPage'
import LostAndFoundPage from './pages/LostAndFoundPage'
import HelpPage from './pages/HelpPage'
import FAQPage from './pages/FAQPage'
import InfoPage from './pages/InfoPage'
import ProfilePage from './pages/ProfilePage'
import WalletPage from './pages/WalletPage'
import WalletItemPage from './pages/WalletItemPage'
import { useHashRoute } from './hooks/useHashRoute'
import { AuthProvider } from './hooks/useAuth'
import { WalletProvider } from './hooks/useWallet'

export default function App() {
  const route = useHashRoute()

  function renderRoute() {
    // Detail routes
    if (route.startsWith('/line/')) {
      const lineId = route.replace('/line/', '').split('?')[0]
      return <LineDetailPage lineId={lineId} />
    }
    if (route.startsWith('/pass/')) {
      const passId = route.replace('/pass/', '').split('?')[0]
      return <PassDetailPage passId={passId} />
    }
    if (route.startsWith('/alert/')) {
      const alertId = route.replace('/alert/', '').split('?')[0]
      return <AlertDetailPage alertId={alertId} />
    }
    if (route.startsWith('/ticket/')) {
      const ticketId = route.replace('/ticket/', '').split('?')[0]
      return <TicketDetailPage ticketId={ticketId} />
    }
    if (route.startsWith('/wallet/')) {
      const itemId = route.replace('/wallet/', '').split('?')[0]
      return <WalletItemPage itemId={itemId} />
    }

    switch (route) {
      case '/tickets':
        return <TicketsPage />
      case '/passes':
        return <PassesPage />
      case '/lines':
        return <LinesPage />
      case '/map':
        return <MapPage />
      case '/alerts':
        return <AlertsPage />
      case '/parking':
        return <ParkingPage />
      case '/access':
        return <AccessibilityPage />
      case '/lost':
        return <LostAndFoundPage />
      case '/help':
        return <HelpPage />
      case '/faq':
        return <FAQPage />
      case '/info':
        return <InfoPage />
      case '/profile':
        return <ProfilePage />
      case '/wallet':
        return <WalletPage />
      case '/':
      default:
        return <HomePage />
    }
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <div className="app">
          <Header />
          {renderRoute()}
          <Footer />
        </div>
      </WalletProvider>
    </AuthProvider>
  )
}
