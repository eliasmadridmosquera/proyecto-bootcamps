/** Cliente del servicio de análisis. Sin VITE_IA_API_URL usa el simulador. Nunca lleva claves. */
import { ErrorAnalisis, simularAnalisis, validarEntrada, validarRespuesta, type Analisis } from '../validaciones/analisis-ia'

const URL_SERVICIO: string = import.meta.env.VITE_IA_API_URL ?? ''

export const usaSimulador = URL_SERVICIO === ''

/** Escenarios de demostración, solo en el simulador. */
export type Escenario = 'normal' | 'invalida' | 'caido'

export async function analizarAnomalias(datos: unknown, escenario: Escenario = 'normal'): Promise<Analisis> {
  const entrada = validarEntrada(datos)

  if (usaSimulador) {
    await new Promise((r) => setTimeout(r, 900))
    if (escenario === 'caido') throw new ErrorAnalisis('El servicio de análisis respondió con error (HTTP 503).')
    if (escenario === 'invalida') return validarRespuesta({ resumen: '', recomendaciones: 'sin formato' })
    return validarRespuesta(simularAnalisis(entrada))
  }

  let respuesta: Response
  try {
    respuesta = await fetch(URL_SERVICIO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrada),
      signal: AbortSignal.timeout(15000),
    })
  } catch (e) {
    const lento = e instanceof Error && e.name === 'TimeoutError'
    throw new ErrorAnalisis(
      lento ? 'El servicio de análisis tardó demasiado. Inténtalo de nuevo.' : 'No se pudo conectar con el servicio de análisis.',
    )
  }
  if (!respuesta.ok) throw new ErrorAnalisis(`El servicio de análisis respondió con error (HTTP ${respuesta.status}).`)
  return validarRespuesta(await respuesta.json().catch(() => null))
}
