import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type WalletItem = {
  id: string
  type: 'ticket' | 'pass'
  name: string
  price: string
  purchaseDate: string
  expiryDate?: string
  zones?: string
  quantity?: number
  duration?: string
  qrCode: string
}

type WalletContextType = {
  items: WalletItem[]
  addItem: (item: Omit<WalletItem, 'id' | 'purchaseDate' | 'qrCode'>) => void
  removeItem: (id: string) => void
  getItem: (id: string) => WalletItem | undefined
}

const WalletContext = createContext<WalletContextType | null>(null)

const generateQRCode = () => {
  // Generate a random ticket code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WalletItem[]>(() => {
    const saved = localStorage.getItem('atm-wallet')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('atm-wallet', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<WalletItem, 'id' | 'purchaseDate' | 'qrCode'>) => {
    const now = new Date()
    const newItem: WalletItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      purchaseDate: now.toISOString(),
      qrCode: generateQRCode()
    }
    setItems(prev => [newItem, ...prev])
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const getItem = (id: string) => {
    return items.find(item => item.id === id)
  }

  return (
    <WalletContext.Provider value={{ items, addItem, removeItem, getItem }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
