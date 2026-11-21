import { NavLink, Outlet } from 'react-router'
import { Alert, MultiSelect, Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { FACULTADES } from '../datos-ejemplo/datos'
import { listarPublicaciones } from '../servicios/mock-servidor'
import { anioPorDefecto } from '../validaciones/validaciones'
import { useSeleccionConsulta, useSesion } from '../stores/seleccion-consulta-store'
import { Cabecera } from './cabecera'

export const ANIO_CALENDARIO = new Date().getFullYear()

/** Año mostrado: derivado al renderizar de la selección y de los años publicados (RN-43). */
export function useAnioVisible() {
  const pubs = useQuery({ queryKey: ['publicaciones'], queryFn: listarPublicaciones })
  const elegido = useSeleccionConsulta((s) => s.anio)
  const publicados = (pubs.data ?? []).map((p) => p.anio).sort((a, b) => b - a)
  const def = anioPorDefecto(publicados, ANIO_CALENDARIO)
  const anio = elegido && publicados.includes(elegido) ? elegido : def.anio
  const aviso = elegido ? false : def.aviso
  const fecha = pubs.data?.find((p) => p.anio === anio)?.fecha ?? null
  return { cargando: pubs.isPending, publicados, anio, aviso, fecha }
}

export function LayoutConsulta() {
  const rol = useSesion((s) => s.rol)
  const { anio, publicados, aviso } = useAnioVisible()
  const { facultades, elegirAnio, elegirFacultades } = useSeleccionConsulta()
  return (
    <>
      <Cabecera />
      <nav className="app-nav" aria-label="Tableros finales">
        <NavLink to="/superavit-deficit">Superávit y déficit</NavLink>
        <NavLink to="/costo-clases">Costo de clases</NavLink>
        <NavLink to="/gestion-docencia">Gestión docencia</NavLink>
      </nav>
      <main className="contenido">
        {publicados.length > 0 && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            <Select
              label="Año publicado"
              w={160}
              allowDeselect={false}
              value={anio ? String(anio) : null}
              onChange={(v) => elegirAnio(v ? Number(v) : null)}
              data={publicados.map(String)}
            />
            {rol === 'rectorado' && (
              <MultiSelect
                label="Filtrar por facultad"
                placeholder={facultades.length ? undefined : 'Todas'}
                w={340}
                data={[...FACULTADES]}
                value={facultades}
                onChange={elegirFacultades}
                clearable
              />
            )}
          </div>
        )}
        {aviso && anio && (
          <Alert color="yellow" mb="md">
            El año {ANIO_CALENDARIO} no tiene publicación; se muestra el año publicado más reciente ({anio}).
          </Alert>
        )}
        <Outlet />
      </main>
    </>
  )
}
