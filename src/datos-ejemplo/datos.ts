/** Datos ficticios (D54): no hay servicio todavía. Valores inventados solo para ilustrar. */

export const FACULTADES = ['Ingeniería', 'Ciencias Sociales', 'Negocios', 'Ciencias de la Vida'] as const

export interface Carrera {
  codigo: string
  nombre: string
  facultad: string
  base: number
}

export const CARRERAS: Carrera[] = [
  { codigo: 'C01', nombre: 'Ingeniería en Sistemas', facultad: 'Ingeniería', base: 420 },
  { codigo: 'C02', nombre: 'Ingeniería Civil', facultad: 'Ingeniería', base: 310 },
  { codigo: 'C03', nombre: 'Ingeniería Eléctrica', facultad: 'Ingeniería', base: 190 },
  { codigo: 'C04', nombre: 'Psicología', facultad: 'Ciencias Sociales', base: 380 },
  { codigo: 'C05', nombre: 'Derecho', facultad: 'Ciencias Sociales', base: 450 },
  { codigo: 'C06', nombre: 'Comunicación', facultad: 'Ciencias Sociales', base: 220 },
  { codigo: 'C07', nombre: 'Administración', facultad: 'Negocios', base: 520 },
  { codigo: 'C08', nombre: 'Economía', facultad: 'Negocios', base: 260 },
  { codigo: 'C09', nombre: 'Contabilidad', facultad: 'Negocios', base: 340 },
  { codigo: 'C10', nombre: 'Biología', facultad: 'Ciencias de la Vida', base: 170 },
  { codigo: 'C11', nombre: 'Medicina', facultad: 'Ciencias de la Vida', base: 480 },
  { codigo: 'C12', nombre: 'Nutrición', facultad: 'Ciencias de la Vida', base: 210 },
]

/** Línea base (umbral por estudiante), valor inventado. */
export const UMBRAL = 2000

export interface FilaCarrera {
  codigo: string
  carrera: string
  facultad: string
  estudiantes: number
  esperado: number
  clases: number
  gestionClases: number
  gestionDocencia: number
  sinEstudiantes: number
  costoReal: number
  diferencia: number
  costoPorEstudiante: number
}

/** Generador determinista: mismos números para el mismo año. */
export function datosTableros(anio: number): FilaCarrera[] {
  return CARRERAS.map((c, i) => {
    const f = 1 + ((anio * 7 + i * 13) % 17) / 100 - 0.08
    const estudiantes = Math.round(c.base * (1 + ((anio + i) % 5) / 50))
    const clases = Math.round(estudiantes * UMBRAL * 0.52 * f)
    const gestionClases = Math.round(estudiantes * UMBRAL * 0.12 * f)
    const gestionDocencia = Math.round(estudiantes * UMBRAL * 0.3 * (2 - f))
    const sinEstudiantes = Math.round(estudiantes * 6 * ((i % 3) + 1))
    const costoReal = clases + gestionClases + gestionDocencia + sinEstudiantes
    const esperado = estudiantes * UMBRAL
    return {
      codigo: c.codigo,
      carrera: c.nombre,
      facultad: c.facultad,
      estudiantes,
      esperado,
      clases,
      gestionClases,
      gestionDocencia,
      sinEstudiantes,
      costoReal,
      diferencia: esperado - costoReal,
      costoPorEstudiante: Math.round((clases + gestionClases) / estudiantes),
    }
  })
}

export const NOMBRES_FASE = [
  'Contratos',
  'Cargas',
  'Costo de cada carga',
  'Costo por categoría',
  'Gestión docencia',
  'Clases y superávit o déficit',
] as const

export const PESTANAS_FASE: string[][] = [
  ['Resumen', 'Poblaciones', 'Pérdida de personas', 'Anomalías', 'Fondo de reserva', 'Cargas', 'Controles'],
  ['Resumen', 'Cuadre de horas', 'Cargas sin sueldo', 'Sueldos sin cargas', 'Clases de grado', 'Sobrecarga', 'Controles'],
  ['Resumen', 'Detalle por término y persona', 'Cuadre del sueldo', 'Sueldo sin carga', 'Carga sin contrato o sin sueldo', 'Clases sin registros', 'Controles'],
  ['Resumen', 'Costo por componente', 'Categorías', 'Reparto por defecto', 'Carreras', 'Contratos', 'Controles'],
  ['Resumen', 'Costo por estudiante', 'Composición', 'Estudiantes', 'Cobertura de componentes', 'Controles'],
  ['Resumen', 'Superávit y déficit', 'Cola del PAOII', 'Costo por estudiante', 'Alertas de cursos', 'Cursos sin estudiantes', 'Gestión de clases', 'Controles'],
]

/** Controles de cada fase (cuadres entre totales). */
export const CONTROLES_FASE: string[][] = [
  ['Suma de términos = sueldo anual', 'Contratos sin fecha de fin', 'Personas desvinculadas con cargas'],
  ['Horas de la cola entre 0 y 1 del término', 'Cuadre de horas por persona', 'Sobrecarga de horas'],
  ['Suma de costos de cargas = sueldo del término', 'Costo por hora menor al umbral (100)', 'Sueldo sin carga'],
  ['Porcentajes de categoría suman 100', 'Reparto por defecto aplicado', 'Costo por categoría = costo de carga'],
  ['Estudiantes contados una vez por carrera', 'Costo de gestión cuadra con fase 4', 'Cobertura de componentes'],
  ['Esperado = estudiantes × umbral', 'Costo real = suma de rubros', 'Horas de gestión de clases mayores a 0'],
]

export const ARCHIVOS_REQUERIDOS = [
  { id: 'contratos-global', nombre: 'Contratos del personal global', grupo: 'Original' },
  { id: 'contratos-admisiones', nombre: 'Contratos de Admisiones', grupo: 'Original' },
  { id: 'fondo-reserva', nombre: 'Historial para fondo de reserva', grupo: 'Original' },
  { id: 'cargas-ctp', nombre: 'Cargas CTP (carga horaria)', grupo: 'Original' },
  { id: 'clases-grado', nombre: 'Planificación de clases de grado', grupo: 'Original' },
  { id: 'clases-postgrado', nombre: 'Clases de postgrado', grupo: 'Original' },
  { id: 'estudiantes', nombre: 'Registros de estudiantes', grupo: 'Original' },
  { id: 'cargas-ctp-prev', nombre: 'Cargas CTP (año anterior)', grupo: 'Año anterior' },
  { id: 'clases-grado-prev', nombre: 'Planificación de clases de grado (año anterior)', grupo: 'Año anterior' },
  { id: 'clases-postgrado-prev', nombre: 'Clases de postgrado (año anterior)', grupo: 'Año anterior' },
  { id: 'estudiantes-prev', nombre: 'Registros de estudiantes (año anterior)', grupo: 'Año anterior' },
  { id: 'carrera-persona', nombre: 'Carrera por persona', grupo: 'Apoyo' },
  { id: 'programas-postgrado', nombre: 'Programas de postgrado', grupo: 'Apoyo' },
  { id: 'porcentajes', nombre: 'Porcentajes de categorías', grupo: 'Apoyo' },
  { id: 'duracion-carreras', nombre: 'Duración de carreras', grupo: 'Apoyo' },
  { id: 'novatos', nombre: 'NOVATOS de cada año', grupo: 'Apoyo' },
] as const
