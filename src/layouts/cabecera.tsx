import { useNavigate } from 'react-router'
import { FACULTADES } from '../datos-ejemplo/datos'
import { useSesion, type Rol } from '../stores/seleccion-consulta-store'
import { reiniciarDemo } from '../servicios/mock-servidor'

const COMMIT = String(import.meta.env.VITE_APP_VERSION ?? 'local').slice(0, 7)

export function Cabecera() {
  const { rol, facultadDecano, cambiarRol, asignarFacultad } = useSesion()
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <h1>Panel Académico · costos de docencia por carrera · v2.0</h1>
      <small>commit {COMMIT}</small>
      <label>
        Rol (demo){' '}
        <select
          value={rol}
          onChange={(e) => {
            cambiarRol(e.target.value as Rol)
            navigate('/')
          }}
        >
          <option value="analista">Analista</option>
          <option value="rectorado">Rectorado</option>
          <option value="decano">Decano</option>
        </select>
      </label>
      {rol === 'decano' && (
        <label>
          Facultad{' '}
          <select value={facultadDecano ?? ''} onChange={(e) => asignarFacultad(e.target.value || null)}>
            <option value="">(sin facultad asignada)</option>
            {FACULTADES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        type="button"
        onClick={() => {
          reiniciarDemo()
          window.location.reload()
        }}
      >
        Reiniciar demo
      </button>
    </header>
  )
}
