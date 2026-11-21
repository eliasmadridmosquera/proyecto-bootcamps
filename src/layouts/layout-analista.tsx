import { NavLink, Outlet, useSearchParams } from 'react-router'
import { Cabecera } from './cabecera'

export const ANIO_DEFECTO = 2026

/** Año de trabajo del analista: parámetro ?anio (D69). */
export function useAnio(): number {
  const [params] = useSearchParams()
  const n = Number(params.get('anio'))
  return Number.isInteger(n) && n >= 2000 && n <= 2100 ? n : ANIO_DEFECTO
}

export function LayoutAnalista() {
  const anio = useAnio()
  const q = `?anio=${anio}`
  return (
    <>
      <Cabecera />
      <nav className="app-nav" aria-label="Analista">
        <NavLink to={`/carga${q}`}>1. Carga del año</NavLink>
        <NavLink to={`/calculo${q}`}>2. Estado y publicación</NavLink>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <NavLink key={n} to={`/fase/${n}${q}`}>
            Fase {n}
          </NavLink>
        ))}
        <NavLink to={`/anomalias${q}`}>Anomalías</NavLink>
      </nav>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  )
}
