import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
// @ts-expect-error la función Lambda es JavaScript sin tipos
import { handler } from '../lambda/index.mjs'
import { validarRespuesta } from '../src/validaciones/analisis-ia.ts'

const anomalias = [{ fase: '1', descripcion: 'Contratos duplicados', referencia: 'contratos.csv' }]
const evento = (cuerpo: unknown) => ({ requestContext: { http: { method: 'POST' } }, body: JSON.stringify(cuerpo) })
const original = globalThis.fetch

// Gemini simulado: la prueba no usa red ni claves reales
function responderModelo(texto: string) {
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: texto }] } }] }))
}

afterEach(() => {
  globalThis.fetch = original
  delete process.env.GEMINI_API_KEY
})

test('Lambda rechaza una entrada inválida', async () => {
  const r = await handler(evento({ anio: 2026, anomalias: [] }))
  assert.equal(r.statusCode, 400)
})

test('Lambda no llama al modelo sin clave configurada', async () => {
  const r = await handler(evento({ anio: 2026, anomalias }))
  assert.equal(r.statusCode, 500)
})

test('Lambda devuelve una respuesta que cumple el contrato del frontend', async () => {
  process.env.GEMINI_API_KEY = 'clave-de-prueba'
  responderModelo(JSON.stringify({ resumen: 'ok', recomendaciones: [{ prioridad: 'alta', titulo: 't', detalle: 'd' }] }))
  const r = await handler(evento({ anio: 2026, anomalias }))
  assert.equal(r.statusCode, 200)
  assert.equal(validarRespuesta(JSON.parse(r.body)).recomendaciones.length, 1)
  assert.ok(!r.body.includes('clave-de-prueba'))
})

test('Lambda controla una respuesta inesperada del modelo', async () => {
  process.env.GEMINI_API_KEY = 'clave-de-prueba'
  responderModelo('esto no es JSON')
  const r = await handler(evento({ anio: 2026, anomalias }))
  assert.equal(r.statusCode, 502)
})
