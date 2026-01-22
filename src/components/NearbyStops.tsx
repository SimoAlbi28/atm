import { useState, useEffect, useMemo } from 'react'

export default function NearbyStops() {
  const [status, setStatus] = useState<'idle' | 'locating' | 'ready' | 'error'>('idle')
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    setStatus('locating')
    if (!('geolocation' in navigator)) {
      setStatus('error')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setStatus('ready')
      },
      () => setStatus('error'),
      { enableHighAccuracy: false, timeout: 5000 }
    )
  }, [])

  const stops = useMemo(() => {
    if (!coords) return [] as Array<{ id: string; name: string; dist: number }>
    const base = Math.abs(Math.round((coords.lat + coords.lon) % 100))
    return [
      { id: 's1', name: 'Fermata Duomo M1/M3', dist: 120 + (base % 30) },
      { id: 's2', name: 'Tram 15 Torino', dist: 240 + (base % 45) },
      { id: 's3', name: 'Bus 54 Diaz', dist: 360 + (base % 60) }
    ]
  }, [coords])

  return (
    <div className="card">
      <h3>Fermate vicine</h3>
      {status === 'locating' && <p className="tiny">Rilevamento posizione…</p>}
      {status === 'error' && (
        <p className="tiny">Impossibile ottenere la posizione. Consenti la geolocalizzazione o cerca manualmente.</p>
      )}
      {status === 'ready' && (
        <ul style={{ marginTop: '.5rem' }}>
          {stops.map((s) => (
            <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0', borderBottom: '1px solid var(--border)' }}>
              <span>{s.name}</span>
              <span className="tiny">{s.dist} m</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
