import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ErrorAnalisis, simularAnalisis, validarEntrada, validarRespuesta } from '../src/validaciones/analisis-ia.ts'

const anomalia = { fase: '2', descripcion: 'Falta el contrato de un docente', referencia: 'contratos.csv' }

test('rechaza el análisis sin anomalías', () => {
  assert.throws(() => validarEntrada({ anio: 2026, anomalias: [] }), /al menos una anomalía/)
})

test('rechaza una descripción demasiado larga', () => {
  const larga = { ...anomalia, descripcion: 'x'.repeat(501) }
  assert.throws(() => validarEntrada({ anio: 2026, anomalias: [larga] }), /500 caracteres/)
})

test('no envía campos fuera del contrato', () => {
  const r = validarEntrada({ anio: 2026, anomalias: [{ ...anomalia, id: '1', fecha: 'hoy' }] })
  assert.deepEqual(r.anomalias[0], anomalia)
})

test('la respuesta del simulador cumple el contrato', () => {
  const r = validarRespuesta(simularAnalisis(validarEntrada({ anio: 2026, anomalias: [anomalia] })))
  assert.equal(r.recomendaciones[0].prioridad, 'alta')
})

test('rechaza respuestas inválidas con un mensaje controlado', () => {
  for (const mala of [null, 'texto', {}, { resumen: 'ok', recomendaciones: [{ prioridad: 'urgente' }] }]) {
    assert.throws(() => validarRespuesta(mala), ErrorAnalisis)
  }
})
