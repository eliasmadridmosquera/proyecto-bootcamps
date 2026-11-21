import { z } from 'zod/v4'

export const anomaliaSchema = z.object({
  fase: z.string().min(1, 'Elige la fase'),
  descripcion: z.string().trim().min(1, 'Describe la irregularidad'),
  referencia: z.string().trim().min(1, 'Indica el archivo o dato de origen'),
})

export type AnomaliaForm = z.infer<typeof anomaliaSchema>

/** Duplicado: misma fase, descripción y referencia, sin distinguir mayúsculas (RN-30). */
export function esDuplicado(
  a: AnomaliaForm,
  existentes: { id: string; fase: string; descripcion: string; referencia: string }[],
  ignorarId?: string,
): boolean {
  const n = (s: string) => s.trim().toLowerCase()
  return existentes.some(
    (e) =>
      e.id !== ignorarId &&
      e.fase === a.fase &&
      n(e.descripcion) === n(a.descripcion) &&
      n(e.referencia) === n(a.referencia),
  )
}

export function archivosFaltantes(requeridos: readonly { id: string; nombre: string }[], cargados: Set<string>): string[] {
  return requeridos.filter((r) => !cargados.has(r.id)).map((r) => r.nombre)
}

/** Año por defecto (RN-43): el calendario actual si tiene publicación; si no, el publicado más reciente con aviso. */
export function anioPorDefecto(
  publicados: number[],
  anioActual: number,
): { anio: number | null; aviso: boolean } {
  if (publicados.length === 0) return { anio: null, aviso: false }
  if (publicados.includes(anioActual)) return { anio: anioActual, aviso: false }
  return { anio: Math.max(...publicados), aviso: true }
}

export function puedePublicar(revisadas: boolean[], estado: string): boolean {
  return estado === 'completado' && revisadas.length === 6 && revisadas.every(Boolean)
}

export function aCsv(filas: Record<string, string | number>[]): string {
  if (filas.length === 0) return ''
  const cols = Object.keys(filas[0])
  const esc = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`
  return [cols.join(','), ...filas.map((f) => cols.map((c) => esc(f[c])).join(','))].join('\n')
}
