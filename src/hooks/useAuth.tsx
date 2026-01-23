import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type AuthUser = {
  email: string
  name?: string
  phone?: string
  address?: string
  birthDate?: string
  fiscalCode?: string
}

type AuthContextType = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'atm-auth-user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      console.warn('Auth restore failed', err)
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.warn('Auth persist failed', err)
    }
  }, [user])

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Compila email e password')
    // Fake async auth
    await new Promise(res => setTimeout(res, 500))
    setUser({ email, name: email.split('@')[0] })
  }

  const register = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Compila email e password')
    await new Promise(res => setTimeout(res, 700))
    setUser({ email, name: email.split('@')[0] })
  }

  const logout = () => setUser(null)

  const updateProfile = async (data: Partial<AuthUser>) => {
    await new Promise(res => setTimeout(res, 500))
    setUser(prev => prev ? { ...prev, ...data } : null)
  }

  const value = useMemo(() => ({ user, login, register, logout, updateProfile }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
