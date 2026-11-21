import { useState } from 'react'
import { Link } from 'react-router'
import { Alert, Badge, Button, Group, Modal, Stack, Table, Text, Title } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NOMBRES_FASE } from '../../datos-ejemplo/datos'
import { listarPublicaciones, obtenerCalculo, publicar } from '../../servicios/mock-servidor'
import { puedePublicar } from '../../validaciones/validaciones'
import { useAnio } from '../../layouts/layout-analista'

/** P2 · Estado del cálculo y publicación (CU1, CU2, CU4). */
export function EstadoCalculo() {
  const anio = useAnio()
  const qc = useQueryClient()
  const [abierto, setAbierto] = useState(false)
  const calculo = useQuery({ queryKey: ['calculo', anio], queryFn: () => obtenerCalculo(anio) })
  const pubs = useQuery({ queryKey: ['publicaciones'], queryFn: listarPublicaciones })
  const mut = useMutation({
    mutationFn: () => publicar(anio),
    onSuccess: async () => {
      setAbierto(false)
      await qc.invalidateQueries({ queryKey: ['publicaciones'] })
    },
  })

  if (calculo.isPending) return <Text>Cargando…</Text>
  const c = calculo.data
  if (!c) {
    return (
      <Alert color="blue" title={`No hay cálculo del año ${anio}`}>
        Primero sube el conjunto de archivos en <Link to={`/carga?anio=${anio}`}>Carga del año</Link>.
      </Alert>
    )
  }
  const publicado = pubs.data?.find((p) => p.anio === anio)
  const habilitado = puedePublicar(
    c.fases.map((f) => f.revisada),
    c.estado,
  )
  const pendientes = c.fases.filter((f) => !f.revisada).length

  return (
    <Stack>
      <Title order={2}>Estado del cálculo {anio}</Title>
      {c.estado === 'completado' ? (
        <Alert color="teal">El cálculo se completó (calculado el {c.fecha}). Revisa cada fase y publica.</Alert>
      ) : (
        <Alert color="red" title={`El cálculo se detuvo en la fase ${c.faseDetenida}`}>
          Un control falló y las fases siguientes no se ejecutaron. Puedes ver los tableros de las fases ya calculadas;
          no hay cálculo completo que publicar.
        </Alert>
      )}
      {publicado && <Alert color="blue">Publicado el {publicado.fecha}. Rectorado y Decano ven este año.</Alert>}
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Fase</Table.Th>
            <Table.Th>Controles</Table.Th>
            <Table.Th>Revisión</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {c.fases.map((f) => (
            <Table.Tr key={f.numero}>
              <Table.Td>
                {f.numero}. {NOMBRES_FASE[f.numero - 1]}
              </Table.Td>
              <Table.Td>
                {f.calculada ? (
                  <Group gap={4}>
                    {(['ok', 'aviso', 'falla'] as const).map((r) => {
                      const n = f.controles.filter((x) => x.resultado === r).length
                      return n ? (
                        <Badge key={r} color={r === 'ok' ? 'teal' : r === 'aviso' ? 'yellow' : 'red'}>
                          {n} {r}
                        </Badge>
                      ) : null
                    })}
                  </Group>
                ) : (
                  <Badge color="gray">No ejecutada</Badge>
                )}
              </Table.Td>
              <Table.Td>{f.revisada ? <Badge color="teal">Revisada</Badge> : <Badge color="gray">Sin revisar</Badge>}</Table.Td>
              <Table.Td>
                {f.calculada && <Link to={`/fase/${f.numero}?anio=${anio}`}>Abrir tablero</Link>}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {!habilitado && c.estado === 'completado' && (
        <Text c="orange" size="sm">
          Falta revisar {pendientes} fase{pendientes === 1 ? '' : 's'}: solo se publica con las seis revisadas.
        </Text>
      )}
      <div>
        <Button disabled={!habilitado} onClick={() => setAbierto(true)}>
          Publicar resultados
        </Button>
      </div>
      <Modal opened={abierto} onClose={() => setAbierto(false)} title={`Publicar los resultados de ${anio}`}>
        <Text mb="md">
          Rectorado y Decano pasarán a ver los tres tableros finales de {anio}. La publicación sustituye a la anterior
          de este año y no se puede retirar.
        </Text>
        {mut.isError && (
          <Alert color="red" mb="sm">
            {(mut.error as Error).message}
          </Alert>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setAbierto(false)}>
            Cancelar
          </Button>
          <Button loading={mut.isPending} onClick={() => mut.mutate()}>
            Confirmar y publicar
          </Button>
        </Group>
      </Modal>
    </Stack>
  )
}
