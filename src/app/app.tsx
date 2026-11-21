import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { LayoutAnalista } from '../layouts/layout-analista'
import { LayoutConsulta } from '../layouts/layout-consulta'
import { CargaAnio } from '../paginas/analista/carga-anio'
import { EstadoCalculo } from '../paginas/analista/estado-calculo'
import { TableroFase } from '../paginas/analista/tablero-fase'
import { AnomaliasRegistradas } from '../paginas/analista/anomalias-registradas'
import { SuperavitDeficit, CostoClases, GestionDocencia } from '../paginas/consulta/tableros'
import { NoEncontrada } from '../paginas/no-encontrada'
import { useSesion } from '../stores/seleccion-consulta-store'

function Raiz() {
  const rol = useSesion((s) => s.rol)
  return <Navigate to={rol === 'analista' ? '/carga' : '/superavit-deficit'} replace />
}

/** Guardia visual, no autorización: la garantía real dependerá de un servicio (apartado 23.4). */
function SoloRol({ es, children }: { es: 'analista' | 'consulta'; children: React.ReactNode }) {
  const rol = useSesion((s) => s.rol)
  const ok = es === 'analista' ? rol === 'analista' : rol !== 'analista'
  return ok ? children : <Navigate to="/" replace />
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Raiz />} />
        <Route
          element={
            <SoloRol es="analista">
              <LayoutAnalista />
            </SoloRol>
          }
        >
          <Route path="/carga" element={<CargaAnio />} />
          <Route path="/calculo" element={<EstadoCalculo />} />
          <Route path="/fase/:fase" element={<TableroFase />} />
          <Route path="/anomalias" element={<AnomaliasRegistradas />} />
        </Route>
        <Route
          element={
            <SoloRol es="consulta">
              <LayoutConsulta />
            </SoloRol>
          }
        >
          <Route path="/superavit-deficit" element={<SuperavitDeficit />} />
          <Route path="/costo-clases" element={<CostoClases />} />
          <Route path="/gestion-docencia" element={<GestionDocencia />} />
        </Route>
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </HashRouter>
  )
}
