import { useEffect } from 'react'
import { Button, Group, Modal, Select, Textarea, TextInput } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NOMBRES_FASE } from '../datos-ejemplo/datos'
import { guardarAnomalia, listarAnomalias, type Anomalia } from '../servicios/mock-servidor'
import { anomaliaSchema, esDuplicado, type AnomaliaForm } from '../validaciones/validaciones'

interface Props {
  abierto: boolean
  anio: number
  faseInicial?: number
  editando?: Anomalia | null
  onCerrar: () => void
}

/** Modal de crear/editar anomalía (D56, D59): Zod + Mantine Form. */
export function ModalAnomalia({ abierto, anio, faseInicial, editando, onCerrar }: Props) {
  const qc = useQueryClient()
  const existentes = useQuery({ queryKey: ['anomalias', anio], queryFn: () => listarAnomalias(anio) })
  const form = useForm<AnomaliaForm>({
    initialValues: { fase: faseInicial ? String(faseInicial) : '', descripcion: '', referencia: '' },
    validate: schemaResolver(anomaliaSchema),
  })

  useEffect(() => {
    if (!abierto) return
    form.setValues(
      editando
        ? { fase: editando.fase, descripcion: editando.descripcion, referencia: editando.referencia }
        : { fase: faseInicial ? String(faseInicial) : '', descripcion: '', referencia: '' },
    )
    form.resetDirty()
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto, editando, faseInicial])

  const mut = useMutation({
    mutationFn: (v: AnomaliaForm) => guardarAnomalia({ ...v, anio, id: editando?.id }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['anomalias', anio] })
      onCerrar()
    },
  })

  return (
    <Modal opened={abierto} onClose={onCerrar} title={editando ? 'Editar anomalía' : 'Registrar anomalía no corregible'}>
      <form
        onSubmit={form.onSubmit((v) => {
          if (esDuplicado(v, existentes.data ?? [], editando?.id)) {
            form.setFieldError('descripcion', 'Ya registraste esta anomalía (misma fase, descripción y referencia).')
            return
          }
          mut.mutate(v)
        })}
      >
        <Select
          label="Fase"
          data={NOMBRES_FASE.map((n, i) => ({ value: String(i + 1), label: `${i + 1}. ${n}` }))}
          {...form.getInputProps('fase')}
        />
        <Textarea label="Descripción" mt="sm" {...form.getInputProps('descripcion')} />
        <TextInput label="Referencia (archivo o dato)" mt="sm" {...form.getInputProps('referencia')} />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button type="submit" loading={mut.isPending}>
            Guardar
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
