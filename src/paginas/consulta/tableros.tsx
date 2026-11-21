import { Alert, Badge, Button, Group, Stack, Table, Tabs, Text, Title } from '@mantine/core'
import { datosTableros, type FilaCarrera } from '../../datos-ejemplo/datos'
import { aCsv } from '../../validaciones/validaciones'
import { useSeleccionConsulta, useSesion } from '../../stores/seleccion-consulta-store'
import { useAnioVisible } from '../../layouts/layout-consulta'

const usd = (n: number) => n.toLocaleString('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

/** Filas visibles según el rol: Decano solo su facultad (sin facultad: ninguna); Rectorado, con filtro opcional. */
function useFilas(anio: number | null): { filas: FilaCarrera[]; sinFacultad: boolean } {
  const rol = useSesion((s) => s.rol)
  const facultadDecano = useSesion((s) => s.facultadDecano)
  const facultades = useSeleccionConsulta((s) => s.facultades)
  if (!anio) return { filas: [], sinFacultad: false }
  const todas = datosTableros(anio)
  if (rol === 'decano') {
    return { filas: facultadDecano ? todas.filter((f) => f.facultad === facultadDecano) : [], sinFacultad: !facultadDecano }
  }
  return { filas: facultades.length ? todas.filter((f) => facultades.includes(f.facultad)) : todas, sinFacultad: false }
}

function descargar(nombre: string, filas: Record<string, string | number>[]) {
  const blob = new Blob(['﻿' + aCsv(filas)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}

interface MarcoProps {
  titulo: string
  archivo: string
  csv: (f: FilaCarrera[]) => Record<string, string | number>[]
  children: (filas: FilaCarrera[]) => React.ReactNode
}

function Marco({ titulo, archivo, csv, children }: MarcoProps) {
  const { cargando, anio, fecha } = useAnioVisible()
  const { filas, sinFacultad } = useFilas(anio)
  if (cargando) return <Text>Cargando…</Text>
  if (!anio) return <Alert color="gray">No existen datos procesados.</Alert>
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>
          {titulo} · {anio}
        </Title>
        <Group>
          <Badge variant="light">Publicado el {fecha}</Badge>
          <Button
            size="xs"
            variant="default"
            disabled={filas.length === 0}
            onClick={() => descargar(`${archivo}-${anio}.csv`, csv(filas))}
          >
            Descargar CSV
          </Button>
        </Group>
      </Group>
      {sinFacultad ? (
        <Alert color="orange">No tienes una facultad asignada, por eso no ves ninguna carrera.</Alert>
      ) : (
        children(filas)
      )}
    </Stack>
  )
}

function Tabla({ cols, rows }: { cols: string[]; rows: (string | number)[][] }) {
  return (
    <div className="tabla-scroll">
      <Table withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            {cols.map((c) => (
              <Table.Th key={c}>{c}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((r, i) => (
            <Table.Tr key={i}>
              {r.map((v, j) => (
                <Table.Td key={j}>{v}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

function Barras({ filas }: { filas: FilaCarrera[] }) {
  const max = Math.max(...filas.map((f) => Math.max(f.esperado, f.costoReal)), 1)
  return (
    <Stack gap={6}>
      <Text size="sm" fw={600}>
        Esperado (azul) contra costo real (naranja)
      </Text>
      {filas.map((f) => (
        <div key={f.codigo} style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 8, alignItems: 'center' }}>
          <Text size="xs">{f.carrera}</Text>
          <div>
            <div className="barra">
              <span style={{ width: `${(f.esperado / max) * 100}%`, background: '#1c7ed6' }} />
            </div>
            <div className="barra" style={{ marginTop: 2 }}>
              <span style={{ width: `${(f.costoReal / max) * 100}%`, background: '#f08c00' }} />
            </div>
          </div>
        </div>
      ))}
    </Stack>
  )
}

export function SuperavitDeficit() {
  const rol = useSesion((s) => s.rol)
  return (
    <Marco
      titulo="Superávit y déficit"
      archivo="superavit-deficit"
      csv={(fs) =>
        fs.map((f) => ({
          Carrera: f.carrera,
          Facultad: f.facultad,
          Estudiantes: f.estudiantes,
          Esperado: f.esperado,
          'Costo real': f.costoReal,
          Diferencia: f.diferencia,
        }))
      }
    >
      {(filas) => (
        <Tabs defaultValue="resultado">
          <Tabs.List>
            <Tabs.Tab value="resultado">Resultado por carrera</Tabs.Tab>
            <Tabs.Tab value="cuadre">Cuadre y metodología</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="resultado" pt="md">
            <Stack>
              <Tabla
                cols={['Carrera', 'Facultad', 'Estudiantes', 'Esperado', 'Costo real', 'Diferencia', 'Resultado']}
                rows={filas.map((f) => [
                  f.carrera,
                  f.facultad,
                  f.estudiantes,
                  usd(f.esperado),
                  usd(f.costoReal),
                  usd(f.diferencia),
                  f.diferencia > 0 ? 'Superávit' : 'Déficit',
                ])}
              />
              <Barras filas={filas} />
              {rol === 'rectorado' && <TotalesFacultad filas={filas} />}
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="cuadre" pt="md">
            <Text>
              Esperado = estudiantes × línea base (2.000 USD, valor ilustrativo). Costo real = clases + gestión de
              clases + gestión docencia + cursos sin estudiantes. Diferencia = esperado − costo real; positiva es
              superávit, cero no cuenta como superávit. Importes en dólares con 2 decimales.
            </Text>
          </Tabs.Panel>
        </Tabs>
      )}
    </Marco>
  )
}

function TotalesFacultad({ filas }: { filas: FilaCarrera[] }) {
  const grupos = new Map<string, FilaCarrera[]>()
  filas.forEach((f) => grupos.set(f.facultad, [...(grupos.get(f.facultad) ?? []), f]))
  const suma = (fs: FilaCarrera[], k: 'estudiantes' | 'costoReal' | 'esperado' | 'diferencia') =>
    fs.reduce((a, f) => a + f[k], 0)
  return (
    <>
      <Title order={4}>Totales por facultad</Title>
      <Tabla
        cols={['Facultad', 'Estudiantes', 'Costo real', 'Esperado', 'Diferencia']}
        rows={[...grupos].map(([n, fs]) => [
          n,
          suma(fs, 'estudiantes'),
          usd(suma(fs, 'costoReal')),
          usd(suma(fs, 'esperado')),
          usd(suma(fs, 'diferencia')),
        ])}
      />
    </>
  )
}

export function CostoClases() {
  return (
    <Marco
      titulo="Costo de clases"
      archivo="costo-clases"
      csv={(fs) =>
        fs.map((f) => ({
          Carrera: f.carrera,
          Facultad: f.facultad,
          Estudiantes: f.estudiantes,
          'Costo de clases': f.clases,
          'Gestión de clases': f.gestionClases,
          'Costo por estudiante': f.costoPorEstudiante,
        }))
      }
    >
      {(filas) => (
        <Tabs defaultValue="materias">
          <Tabs.List>
            <Tabs.Tab value="materias">Costo de materias</Tabs.Tab>
            <Tabs.Tab value="estudiante">Costo por estudiante</Tabs.Tab>
            <Tabs.Tab value="promedio">Costo promedio por carrera</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="materias" pt="md">
            <Tabla
              cols={['Carrera', 'Materia (ejemplo)', 'Paralelo', 'Costo de clases']}
              rows={filas.flatMap((f) => [
                [f.carrera, 'Materia 101', 'P1', usd(Math.round(f.clases * 0.55))],
                [f.carrera, 'Materia 102', 'P1', usd(Math.round(f.clases * 0.45))],
              ])}
            />
            <Text size="xs" c="dimmed" mt="xs">
              No se muestran sueldos individuales.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="estudiante" pt="md">
            <Tabla
              cols={['Carrera', 'Estudiantes', 'Costo por estudiante']}
              rows={filas.map((f) => [f.carrera, f.estudiantes, usd(f.costoPorEstudiante)])}
            />
          </Tabs.Panel>
          <Tabs.Panel value="promedio" pt="md">
            <Tabla
              cols={['Carrera', 'Clases', 'Gestión de clases', 'Total']}
              rows={filas.map((f) => [f.carrera, usd(f.clases), usd(f.gestionClases), usd(f.clases + f.gestionClases)])}
            />
          </Tabs.Panel>
        </Tabs>
      )}
    </Marco>
  )
}

export function GestionDocencia() {
  return (
    <Marco
      titulo="Gestión docencia"
      archivo="gestion-docencia"
      csv={(fs) =>
        fs.map((f) => ({
          Carrera: f.carrera,
          Facultad: f.facultad,
          Estudiantes: f.estudiantes,
          'Gestión docencia': f.gestionDocencia,
          'Por estudiante': Math.round(f.gestionDocencia / f.estudiantes),
        }))
      }
    >
      {(filas) => {
        const total = filas.reduce((a, f) => a + f.gestionDocencia, 0)
        return (
          <Tabs defaultValue="resumen">
            <Tabs.List>
              <Tabs.Tab value="resumen">Resumen general</Tabs.Tab>
              <Tabs.Tab value="carrera">Por carrera</Tabs.Tab>
              <Tabs.Tab value="cargas">Detalle de cargas GD</Tabs.Tab>
              <Tabs.Tab value="drill">Drill-down de carrera</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="resumen" pt="md">
              <Text>
                Gestión docencia total: <b>{usd(total)}</b> en {filas.length} carreras.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value="carrera" pt="md">
              <Tabla
                cols={['Carrera', 'Estudiantes', 'Gestión docencia', 'Por estudiante']}
                rows={filas.map((f) => [f.carrera, f.estudiantes, usd(f.gestionDocencia), usd(Math.round(f.gestionDocencia / f.estudiantes))])}
              />
            </Tabs.Panel>
            <Tabs.Panel value="cargas" pt="md">
              <Tabla
                cols={['Carrera', 'Carga GD (ejemplo)', 'Costo']}
                rows={filas.flatMap((f) => [
                  [f.carrera, 'Coordinación académica', usd(Math.round(f.gestionDocencia * 0.6))],
                  [f.carrera, 'Tutorías y titulación', usd(Math.round(f.gestionDocencia * 0.4))],
                ])}
              />
            </Tabs.Panel>
            <Tabs.Panel value="drill" pt="md">
              <Text c="dimmed">
                De dónde viene cada dólar de gestión docencia (componente → carrera → carga → persona). Datos de ejemplo,
                sin sueldos individuales.
              </Text>
            </Tabs.Panel>
          </Tabs>
        )
      }}
    </Marco>
  )
}
