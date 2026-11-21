import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Alert, Badge, Button, Checkbox, NumberInput, Paper, Stack, Table, Title, Text } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ARCHIVOS_REQUERIDOS } from '../../datos-ejemplo/datos'
import { subirConjunto } from '../../servicios/mock-servidor'
import { useAnio } from '../../layouts/layout-analista'

/** P1 · Carga del año: el conjunto se sube completo y de una vez (RN-01). */
export function CargaAnio() {
  const anioUrl = useAnio()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [anio, setAnio] = useState<number>(anioUrl)
  const [cargados, setCargados] = useState<Record<string, string>>({})
  const [simularFalla, setSimularFalla] = useState(false)

  const subir = useMutation({
    mutationFn: () => subirConjunto(anio, Object.keys(cargados), { simularFalla }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['calculo'] })
      navigate(`/calculo?anio=${anio}`)
    },
  })

  const ejemplo = () =>
    setCargados(Object.fromEntries(ARCHIVOS_REQUERIDOS.map((a) => [a.id, `${a.id}-${anio}.csv`])))

  return (
    <Stack>
      <Title order={2}>Carga del año</Title>
      <Text c="dimmed">
        Indica el año y sube los 16 archivos a la vez: 7 originales, 4 equivalentes del año anterior y 5 de apoyo. Un
        cálculo nuevo reemplaza al anterior del mismo año.
      </Text>
      <NumberInput label="Año" value={anio} onChange={(v) => setAnio(Number(v))} min={2000} max={2100} w={160} />
      <Paper withBorder p="sm">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Archivo</Table.Th>
              <Table.Th>Tipo</Table.Th>
              <Table.Th>Selección</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ARCHIVOS_REQUERIDOS.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td>{a.nombre}</Table.Td>
                <Table.Td>
                  <Badge variant="light">{a.grupo}</Badge>
                </Table.Td>
                <Table.Td>
                  <input
                    type="file"
                    aria-label={a.nombre}
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      setCargados((prev) => {
                        const n = { ...prev }
                        if (f) n[a.id] = f.name
                        else delete n[a.id]
                        return n
                      })
                    }}
                  />
                  {cargados[a.id] && <Text size="xs" c="teal">✔ {cargados[a.id]}</Text>}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
      <Checkbox
        checked={simularFalla}
        onChange={(e) => setSimularFalla(e.currentTarget.checked)}
        label="Demostración: simular la falla de un control en la fase 3 (el cálculo se detiene)"
      />
      {subir.isError && (
        <Alert color="red" title="Error de archivo">
          {(subir.error as Error).message}
        </Alert>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="default" onClick={ejemplo}>
          Usar archivos de ejemplo
        </Button>
        <Button onClick={() => subir.mutate()} loading={subir.isPending}>
          Subir y calcular las seis fases
        </Button>
      </div>
    </Stack>
  )
}
