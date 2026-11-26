/** Contrato del análisis de IA: validación de entrada y respuesta, y simulador. */
import { z } from 'zod/v4'

export class ErrorAnalisis extends Error {}

const entradaSchema = z.object({
  anio: z.number().int().min(2000, 'Año no válido').max(2100, 'Año no válido'),
  anomalias: z
    .array(
      z.object({
        fase: z.string().regex(/^[1-6]$/, 'La fase debe estar entre 1 y 6'),
        descripcion: z.string().trim().min(1, 'Hay una anomalía sin descripción').max(500, 'Una descripción supera los 500 caracteres'),
        referencia: z.string().trim().min(1, 'Hay una anomalía sin referencia').max(200, 'Una referencia supera los 200 caracteres'),
      }),
    )
    .min(1, 'Registra al menos una anomalía antes de analizar')
    .max(20, 'Solo se pueden analizar hasta 20 anomalías a la vez'),
})

const respuestaSchema = z.object({
  resumen: z.string().trim().min(1).max(600),
  recomendaciones: z
    .array(
      z.object({
        prioridad: z.enum(['alta', 'media', 'baja']),
        titulo: z.string().trim().min(1).max(150),
        detalle: z.string().trim().min(1).max(900),
      }),
    )
    .min(1)
    .max(20),
})

export type EntradaAnalisis = z.infer<typeof entradaSchema>
export type Analisis = z.infer<typeof respuestaSchema>

/** Valida y limpia la entrada antes de enviarla. Los campos que no están en el contrato se descartan. */
export function validarEntrada(datos: unknown): EntradaAnalisis {
  const r = entradaSchema.safeParse(datos)
  if (!r.success) throw new ErrorAnalisis(r.error.issues[0].message)
  return r.data
}

/** Valida la respuesta antes de mostrarla. */
export function validarRespuesta(datos: unknown): Analisis {
  const r = respuestaSchema.safeParse(datos)
  if (!r.success) throw new ErrorAnalisis('El servicio devolvió una respuesta inválida. No se muestra ningún resultado.')
  return r.data
}

const ORDEN = { alta: 0, media: 1, baja: 2 } as const

/** Simulador: reglas fijas que imitan la respuesta del servicio. No es un modelo de IA real. */
export function simularAnalisis({ anio, anomalias }: EntradaAnalisis): Analisis {
  const recomendaciones = anomalias
    .map((a) => {
      const grave = /falta|vac[ií]|duplicad|error|incorrect|negativ/i.test(a.descripcion)
      const prioridad: 'alta' | 'media' | 'baja' = grave ? 'alta' : Number(a.fase) <= 3 ? 'media' : 'baja'
      return {
        prioridad,
        titulo: `Fase ${a.fase}: revisar ${a.referencia}`.slice(0, 150),
        detalle: `Se registró: "${a.descripcion}". Verifica el dato de origen y vuelve a calcular ${anio}; las fases desde la ${a.fase} dependen de este resultado.`,
      }
    })
    .sort((x, y) => ORDEN[x.prioridad] - ORDEN[y.prioridad])
  const altas = recomendaciones.filter((r) => r.prioridad === 'alta').length
  const fases = new Set(anomalias.map((a) => a.fase)).size
  return {
    resumen: `Anomalías analizadas del cálculo ${anio}: ${anomalias.length}. Fases afectadas: ${fases}. De prioridad alta: ${altas}.`,
    recomendaciones,
  }
}
