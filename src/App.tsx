import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TicketsPage from './pages/TicketsPage'
import PassesPage from './pages/PassesPage'
import LinesPage from './pages/LinesPage'
import MapPage from './pages/MapPage'
import AlertsPage from './pages/AlertsPage'
import ParkingPage from './pages/ParkingPage'
import AccessibilityPage from './pages/AccessibilityPage'
import LostAndFoundPage from './pages/LostAndFoundPage'
import HelpPage from './pages/HelpPage'
import FAQPage from './pages/FAQPage'
import InfoPage from './pages/InfoPage'
import ProfilePage from './pages/ProfilePage'
import { useHashRoute } from './hooks/useHashRoute'
import { AuthProvider } from './hooks/useAuth'

export default function App() {
  const route = useHashRoute()

  function renderRoute() {
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
      case '/':
      default:
        return <HomePage />
    }
  }

  return (
    <AuthProvider>
      <div className="app">
        <Header />
        {renderRoute()}
        <Footer />
      </div>
    </AuthProvider>
  )
}
