import { useState } from 'react'
import { Button, Group, Select, Stack, Table, Text, Title } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NOMBRES_FASE } from '../../datos-ejemplo/datos'
import { eliminarAnomalia, listarAnomalias, listarPublicaciones, type Anomalia } from '../../servicios/mock-servidor'
import { ModalAnomalia } from '../../componentes/modal-anomalia'
import { useAnio } from '../../layouts/layout-analista'
import { PanelAnalisisIA } from '../../componentes/panel-analisis-ia'

/** P4 · Anomalías registradas del cálculo en curso (solo analista). */
export function AnomaliasRegistradas() {
  const anio = useAnio()
  const qc = useQueryClient()
  const [filtro, setFiltro] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Anomalia | null>(null)
  const lista = useQuery({ queryKey: ['anomalias', anio], queryFn: () => listarAnomalias(anio) })
  const pubs = useQuery({ queryKey: ['publicaciones'], queryFn: listarPublicaciones })
  const del = useMutation({
    mutationFn: eliminarAnomalia,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['anomalias', anio] }),
  })
  const publicado = pubs.data?.some((p) => p.anio === anio) ?? false
  const filas = (lista.data ?? []).filter((a) => !filtro || a.fase === filtro)

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Anomalías registradas ({anio})</Title>
        <Button
          disabled={publicado}
          onClick={() => {
            setEditando(null)
            setModal(true)
          }}
        >
          Registrar anomalía
        </Button>
      </Group>
      <Text c="dimmed" size="sm">
        Pertenecen al cálculo en curso: si recalculas, vuelve a registrar las que sigan presentes. Rectorado y Decano no
        las ven.
      </Text>
      <Select
        label="Filtrar por fase"
        clearable
        w={280}
        value={filtro}
        onChange={setFiltro}
        data={NOMBRES_FASE.map((n, i) => ({ value: String(i + 1), label: `${i + 1}. ${n}` }))}
      />
      {filas.length === 0 ? (
        <Text>No hay anomalías registradas.</Text>
      ) : (
        <Table withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Fase</Table.Th>
              <Table.Th>Descripción</Table.Th>
              <Table.Th>Referencia</Table.Th>
              <Table.Th>Fecha</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filas.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td>{a.fase}</Table.Td>
                <Table.Td>{a.descripcion}</Table.Td>
                <Table.Td>{a.referencia}</Table.Td>
                <Table.Td>{a.fecha}</Table.Td>
                <Table.Td>
                  {!publicado && (
                    <Group gap="xs">
                      <Button
                        size="xs"
                        variant="default"
                        onClick={() => {
                          setEditando(a)
                          setModal(true)
                        }}
                      >
                        Editar
                      </Button>
                      <Button size="xs" color="red" variant="light" onClick={() => del.mutate(a.id)}>
                        Eliminar
                      </Button>
                    </Group>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      <PanelAnalisisIA key={JSON.stringify([anio, lista.data])} anio={anio} anomalias={lista.data ?? []} />
      <ModalAnomalia abierto={modal} anio={anio} editando={editando} onCerrar={() => setModal(false)} />
    </Stack>
  )
}
