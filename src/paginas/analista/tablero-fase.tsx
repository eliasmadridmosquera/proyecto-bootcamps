import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Alert, Badge, Button, Group, Stack, Table, Tabs, Text, Title } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CONTROLES_FASE, NOMBRES_FASE, PESTANAS_FASE } from '../../datos-ejemplo/datos'
import { marcarRevision, obtenerCalculo, listarPublicaciones } from '../../servicios/mock-servidor'
import { ModalAnomalia } from '../../componentes/modal-anomalia'
import { useAnio } from '../../layouts/layout-analista'

const COLOR = { ok: 'teal', aviso: 'yellow', falla: 'red' } as const

/** P3 · Tablero de fase (CU2, CU3). El contenido de cada pestaña es de ejemplo. */
export function TableroFase() {
  const { fase } = useParams()
  const anio = useAnio()
  const qc = useQueryClient()
  const [modal, setModal] = useState(false)
  const n = Number(fase)
  const calculo = useQuery({ queryKey: ['calculo', anio], queryFn: () => obtenerCalculo(anio) })
  const pubs = useQuery({ queryKey: ['publicaciones'], queryFn: listarPublicaciones })
  const mut = useMutation({
    mutationFn: (r: boolean) => marcarRevision(anio, n, r),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['calculo', anio] }),
  })

  if (!Number.isInteger(n) || n < 1 || n > 6) return <Navigate to={`/calculo?anio=${anio}`} replace />
  if (calculo.isPending) return <Text>Cargando…</Text>
  const c = calculo.data
  const f = c?.fases[n - 1]
  if (!c || !f?.calculada) {
    return (
      <Alert color="blue" title="Esta fase no tiene tablero">
        No hay cálculo o el cálculo se detuvo antes de esta fase. <Link to={`/calculo?anio=${anio}`}>Ver estado</Link>
      </Alert>
    )
  }
  const publicado = pubs.data?.some((p) => p.anio === anio) ?? false
  const soloLectura = c.estado === 'detenido' || publicado
  const tabs = PESTANAS_FASE[n - 1]

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>
          Fase {n} · {NOMBRES_FASE[n - 1]} ({anio})
        </Title>
        <Group>
          {f.revisada ? <Badge color="teal">Revisada</Badge> : <Badge color="gray">Sin revisar</Badge>}
          {!soloLectura && (
            <>
              <Button size="xs" variant="default" onClick={() => setModal(true)}>
                Registrar anomalía
              </Button>
              <Button size="xs" loading={mut.isPending} onClick={() => mut.mutate(!f.revisada)}>
                {f.revisada ? 'Quitar marca de revisada' : 'Marcar fase como revisada'}
              </Button>
            </>
          )}
        </Group>
      </Group>
      {soloLectura && <Alert color="gray">Solo lectura: {publicado ? 'el cálculo está publicado.' : 'el cálculo se detuvo por una falla de control.'}</Alert>}
      <Tabs defaultValue={tabs[0]}>
        <Tabs.List style={{ flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <Tabs.Tab key={t} value={t}>
              {t}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((t) => (
          <Tabs.Panel key={t} value={t} pt="md">
            {t === 'Controles' ? (
              <Table withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Control</Table.Th>
                    <Table.Th>Resultado</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {f.controles.map((x) => (
                    <Table.Tr key={x.nombre}>
                      <Table.Td>{x.nombre}</Table.Td>
                      <Table.Td>
                        <Badge color={COLOR[x.resultado]}>{x.resultado}</Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : t === 'Resumen' ? (
              <Text>
                {CONTROLES_FASE[n - 1].length} controles aplicados. Tolerancia de cuadre: 0,01 USD. Revisa las pestañas de
                detalle para detectar anomalías de datos.
              </Text>
            ) : (
              <Text c="dimmed">Detalle «{t}»: tabla de ejemplo (datos ficticios, sin servicio real).</Text>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
      <ModalAnomalia abierto={modal} anio={anio} faseInicial={n} onCerrar={() => setModal(false)} />
    </Stack>
  )
}
