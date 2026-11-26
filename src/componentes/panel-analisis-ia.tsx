import { useState } from 'react'
import { Alert, Badge, Button, Group, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { analizarAnomalias, usaSimulador, type Escenario } from '../servicios/analisis-ia'
import type { Anomalia } from '../servicios/mock-servidor'

const COLOR = { alta: 'red', media: 'yellow', baja: 'teal' } as const

interface Props {
  anio: number
  anomalias: Anomalia[]
}

/** Análisis con IA de las anomalías del año: estados de carga, resultado y error. */
export function PanelAnalisisIA({ anio, anomalias }: Props) {
  const [escenario, setEscenario] = useState<Escenario>('normal')
  const analisis = useMutation({ mutationFn: () => analizarAnomalias({ anio, anomalias }, escenario) })

  return (
    <Paper withBorder p="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Title order={3}>Análisis con IA</Title>
          {usaSimulador && <Badge color="gray">Simulador (sin modelo de IA real)</Badge>}
        </Group>
        <Text c="dimmed" size="sm">
          Genera recomendaciones sobre las anomalías registradas. Son sugerencias: requieren revisión humana.
        </Text>
        {usaSimulador && (
          <Group gap="xs">
            <Text size="sm">Escenario de demostración:</Text>
            <SegmentedControl
              size="xs"
              value={escenario}
              onChange={(v) => {
                setEscenario(v as Escenario)
                analisis.reset()
              }}
              data={[
                { value: 'normal', label: 'Normal' },
                { value: 'invalida', label: 'Respuesta inválida' },
                { value: 'caido', label: 'Servicio caído' },
              ]}
            />
          </Group>
        )}
        <Group>
          <Button onClick={() => analisis.mutate()} loading={analisis.isPending}>
            Analizar con IA
          </Button>
        </Group>
        <div aria-live="polite">
          {analisis.isPending && <Text size="sm">Analizando…</Text>}
          {analisis.isError && (
            <Alert color="red" title="No se pudo completar el análisis">
              <Text size="sm" mb="xs">
                {analisis.error.message}
              </Text>
              <Button size="xs" variant="default" onClick={() => analisis.mutate()}>
                Reintentar
              </Button>
            </Alert>
          )}
          {analisis.isSuccess && (
            <Stack gap="xs">
              <Text fw={600}>{analisis.data.resumen}</Text>
              {analisis.data.recomendaciones.map((r, i) => (
                <Paper key={i} withBorder p="sm">
                  <Group gap="xs" mb={4}>
                    <Badge color={COLOR[r.prioridad]}>Prioridad {r.prioridad}</Badge>
                    <Text fw={600} size="sm">
                      {r.titulo}
                    </Text>
                  </Group>
                  <Text size="sm">{r.detalle}</Text>
                </Paper>
              ))}
            </Stack>
          )}
        </div>
      </Stack>
    </Paper>
  )
}
