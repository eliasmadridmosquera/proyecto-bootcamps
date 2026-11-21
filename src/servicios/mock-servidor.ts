/** Servidor simulado en memoria + localStorage. Sin red: el backend se despliega aparte. */
import { ARCHIVOS_REQUERIDOS, CONTROLES_FASE } from '../datos-ejemplo/datos'
import { archivosFaltantes } from '../validaciones/validaciones'

export type Resultado = 'ok' | 'aviso' | 'falla'

export interface Control {
  nombre: string
  resultado: Resultado
}

export interface Fase {
  numero: number
  controles: Control[]
  calculada: boolean
  revisada: boolean
}

export interface Calculo {
  anio: number
  estado: 'completado' | 'detenido'
  faseDetenida: number | null
  fases: Fase[]
  fecha: string
}

export interface Anomalia {
  id: string
  anio: number
  fase: string
  descripcion: string
  referencia: string
  fecha: string
}

export interface Publicacion {
  anio: number
  fecha: string
}

interface Estado {
  calculos: Record<number, Calculo>
  anomalias: Anomalia[]
  publicaciones: Publicacion[]
}

const CLAVE = 'panel-bootcamp-mock'

const INICIAL: Estado = {
  calculos: {},
  anomalias: [],
  publicaciones: [{ anio: 2025, fecha: '2026-03-12' }],
}

function leer(): Estado {
  try {
    const raw = localStorage.getItem(CLAVE)
    if (raw) return JSON.parse(raw) as Estado
  } catch {
    /* sin storage: se usa el estado inicial */
  }
  return structuredClone(INICIAL)
}

function guardar(e: Estado): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(e))
  } catch {
    /* ignorar */
  }
}

const espera = (ms = 400) => new Promise((r) => setTimeout(r, ms))
const hoy = () => new Date().toISOString().slice(0, 10)

export class ErrorArchivo extends Error {}

export interface OpcionesCalculo {
  /** Demostración: fuerza la falla de un control en la fase 3 (EJ-02). */
  simularFalla: boolean
}

export async function subirConjunto(anio: number, cargados: string[], op: OpcionesCalculo): Promise<Calculo> {
  await espera(900)
  const faltan = archivosFaltantes(ARCHIVOS_REQUERIDOS, new Set(cargados))
  if (faltan.length > 0) {
    throw new ErrorArchivo(`No se calculó nada. Falta: ${faltan.join('; ')}.`)
  }
  const estado = leer()
  const fases: Fase[] = []
  let faseDetenida: number | null = null
  for (let n = 1; n <= 6; n++) {
    if (faseDetenida) {
      fases.push({ numero: n, controles: [], calculada: false, revisada: false })
      continue
    }
    const controles: Control[] = CONTROLES_FASE[n - 1].map((nombre, i) => ({
      nombre,
      resultado: n === 2 && i === 2 ? 'aviso' : 'ok',
    }))
    if (op.simularFalla && n === 3) {
      controles[0].resultado = 'falla'
      faseDetenida = 3
    }
    fases.push({ numero: n, controles, calculada: true, revisada: false })
  }
  const calculo: Calculo = {
    anio,
    estado: faseDetenida ? 'detenido' : 'completado',
    faseDetenida,
    fases,
    fecha: hoy(),
  }
  estado.calculos[anio] = calculo // el nuevo reemplaza al anterior
  estado.anomalias = estado.anomalias.filter((a) => a.anio !== anio) // las anomalías pertenecen al cálculo en curso
  guardar(estado)
  return calculo
}

export async function obtenerCalculo(anio: number): Promise<Calculo | null> {
  await espera(150)
  return leer().calculos[anio] ?? null
}

export async function marcarRevision(anio: number, fase: number, revisada: boolean): Promise<void> {
  const e = leer()
  const c = e.calculos[anio]
  if (!c) return
  const f = c.fases.find((x) => x.numero === fase)
  if (f?.calculada) f.revisada = revisada
  guardar(e)
}

export async function publicar(anio: number): Promise<Publicacion> {
  await espera(600)
  const e = leer()
  const c = e.calculos[anio]
  if (!c || c.estado !== 'completado' || !c.fases.every((f) => f.revisada)) {
    throw new Error('No se puede publicar: faltan fases por revisar.')
  }
  const pub = { anio, fecha: hoy() }
  e.publicaciones = [...e.publicaciones.filter((p) => p.anio !== anio), pub] // sustituye la publicación del año
  guardar(e)
  return pub
}

export async function listarPublicaciones(): Promise<Publicacion[]> {
  return leer().publicaciones
}

export async function listarAnomalias(anio: number): Promise<Anomalia[]> {
  await espera(100)
  return leer().anomalias.filter((a) => a.anio === anio)
}

export async function guardarAnomalia(a: Omit<Anomalia, 'fecha' | 'id'> & { id?: string }): Promise<void> {
  const e = leer()
  if (a.id) {
    const i = e.anomalias.findIndex((x) => x.id === a.id)
    if (i >= 0) e.anomalias[i] = { ...e.anomalias[i], fase: a.fase, descripcion: a.descripcion, referencia: a.referencia }
  } else {
    e.anomalias.push({ ...a, id: crypto.randomUUID(), fecha: hoy() })
  }
  guardar(e)
}

export async function eliminarAnomalia(id: string): Promise<void> {
  const e = leer()
  e.anomalias = e.anomalias.filter((a) => a.id !== id)
  guardar(e)
}

export function reiniciarDemo(): void {
  guardar(structuredClone(INICIAL))
}
