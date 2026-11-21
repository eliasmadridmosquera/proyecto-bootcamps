import { create } from 'zustand'

export type Rol = 'analista' | 'rectorado' | 'decano'

interface SeleccionConsulta {
  anio: number | null
  facultades: string[]
  elegirAnio: (anio: number | null) => void
  elegirFacultades: (f: string[]) => void
  limpiarFiltro: () => void
}

/** Selección compartida por los tres tableros finales (D57). Se pierde al recargar. */
export const useSeleccionConsulta = create<SeleccionConsulta>((set) => ({
  anio: null,
  facultades: [],
  elegirAnio: (anio) => set({ anio }),
  elegirFacultades: (facultades) => set({ facultades }),
  limpiarFiltro: () => set({ facultades: [] }),
}))

interface Sesion {
  rol: Rol
  facultadDecano: string | null
  cambiarRol: (r: Rol) => void
  asignarFacultad: (f: string | null) => void
}

/** Demostración sin inicio de sesión: el rol se elige en el encabezado (la identidad real depende de un servicio). */
export const useSesion = create<Sesion>((set) => ({
  rol: 'analista',
  facultadDecano: 'Ingeniería',
  cambiarRol: (rol) => set({ rol }),
  asignarFacultad: (facultadDecano) => set({ facultadDecano }),
}))
