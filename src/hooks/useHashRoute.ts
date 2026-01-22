import { useState, useEffect } from 'react'

export function useHashRoute() {
  const [route, setRoute] = useState<string>(() => {
    const raw = window.location.hash.replace(/^#/, '') || '/'
    return raw.startsWith('/') ? raw : `/${raw}`
  })
  useEffect(() => {
    const onHash = () => {
      const raw = window.location.hash.replace(/^#/, '') || '/'
      setRoute(raw.startsWith('/') ? raw : `/${raw}`)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}
