---
slug: "t2-revision-y-anomalias"
title: "T2 · Diseño técnico del registro de anomalías y del layout del analista (E2)"
description: "Borrador de diseño técnico del frontend para registrar, editar y consultar anomalías (P3 y P4): formulario con Zod y Mantine Form dentro de un Modal, layout del analista y límites de integración. Las marcas de revisión por fase y el tablero de fase de P3 quedan como preguntas abiertas y no se diseñan todavía. Propuesta documental; nada está implementado."
spec_kind: spec-tech
status: approved
created_at: "2026-11-10T16:33:58.281Z"
last_updated: "2026-11-11T02:42:42.039Z"
source_spec: e2-revision-y-anomalias
---
## Source and current evidence

**Origen funcional.** Especificación funcional E2 (e2-revision-y-anomalias), aprobada; last_updated 2026-11-05T06:14:34.746Z. Casos de uso de origen: revisar-tableros-fase-detectar-anomalias y registrar-anomalia-datos-no-corregible. Reglas que gobiernan este diseño: RN-23 a RN-32, con foco en RN-26, RN-30, RN-31 y RN-32. Criterios: CA-23 a CA-32. Ejemplos: EJ-11 (válido), EJ-12 (duplicado), EJ-13 (incompleto).

**Hechos sobre la base existente (comprobados leyendo el repositorio el 2026-11-09).**
- Plantilla de Vite con React 19.2.8 y TypeScript 6.0.3. En src/ solo hay App.tsx de demostración y recursos; no hay rutas, componentes ni servicios del producto.
- package.json solo declara react y react-dom como dependencias. React Router, TanStack Query, Zustand, Zod y Mantine NO están instalados; aquí son propuestas.
- Scripts: dev, build (tsc -b && vite build), lint (oxlint) y preview. No hay tests.
- El health del harness es health.bat, que ejecuta pnpm build. El lanzamiento de health.bat desde AHK 3.0.0 falla en este equipo por un problema de comillas, ya documentado en la fase 2; ver Decisions and open questions.

**Pantallas de origen (fase 2).** P2 Estado del cálculo y publicación; P3 Tablero de fase; P4 Anomalías registradas. Solo el analista las usa (RN-31).

**P2 se reparte entre documentos (D60 y D70).** Marcas de revisión de P2: este documento (T2, D70), todavía sin diseñar (ver «Lo que este borrador todavía no diseña»). Estado del cálculo de P2: T1 (D68). Botón «Publicar» y Modal de confirmar de P2: T3 (D64 y D66). La composición de la pantalla P2, que junta las tres partes, no tiene dueño: queda como pregunta abierta (pregunta 9), sin decidir.

**Documentación oficial consultada (2026-11-10).** Mantine (Context7 /mantinedev/mantine): schemaResolver integrado en @mantine/form 9 con Zod v4 importado de zod/v4; form.reset restablece valores iniciales y limpia errores; Modal con closeOnClickOutside y closeOnEscape activos por defecto y keepMounted en falso (contenido desmontado al cerrar). El índice describe la rama 9.x y cita la 9.7.5; el stack fijado es 9.4.1, así que el comportamiento por defecto queda POR COMPROBAR contra 9.4.1. React Router (Context7 /remix-run/react-router): modo declarativo con rutas de layout sin path y Outlet; el índice lista 7.x y no la 8.3.1 fijada, compatibilidad POR COMPROBAR.

## Boundaries, contracts, and design

**Alcance de este documento.** Formulario de registro y edición de anomalía (PR-03), su Modal, la lista de anomalías de P4, el layout del analista que enmarca P1 a P4 (D58) y la propiedad de su estado. Quedan fuera: carga y cálculo (T1), publicación (T3), consulta de Rectorado y Decano (T4). Todavía no diseña la revisión de tableros y las marcas por fase (PR-02): ver «Lo que este borrador todavía no diseña». Lo transversal (stack, árbol de carpetas) se describe en la entrega acumulativa; aquí solo se referencia.

**Estructura (propuesta, no implementada).**
- Layout del analista: ruta de layout sin segmento de URL con Outlet, que comparte la navegación entre P1 a P4 (decisión D58 de Fase 3). P3 recibe la fase como parámetro de ruta (1 a 6). Ruta desconocida con path="*".
- Año de trabajo del analista: parámetro de consulta `?anio` de la URL (por ejemplo `?anio=2026`), no un segmento de ruta (D69, que respeta D58). La URL es una entrada libre, no una validación ni un permiso; el diseño no está probado. Pendientes, sin decidir (ver D69): qué se muestra en P2 a P4 si no hay año; qué ocurre con un año inválido (E1 no lo define; relacionado con D67); cómo llega el año a la URL tras subir los archivos en P1 (se lleva en T1, pregunta 14, por referencia a D69 y D70); que el parámetro se conserve al navegar entre P1 a P4; compatibilidad de `useSearchParams` con react-router 8.3.1.
- Componente de formulario de anomalía, dentro de un Modal de Mantine, reutilizado desde P3 (crear) y P4 (crear y editar). Un solo componente, sin duplicar: PROPUESTA; D56 deja pendiente dónde vive el componente reutilizado.
- La lista de P4 con filtro por fase (RN-31).

**Campos y reglas (RN-30).** Fase: obligatoria, una de las seis. Descripción: obligatoria. Referencia al archivo o dato: obligatoria. Fecha de registro: la pone el producto; NO es un campo del formulario. Duplicado: misma fase y misma referencia, texto idéntico sin distinguir mayúsculas; aviso fijo «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.»; misma regla al editar (CA-32).

**Cadena de validación (propuesta).** regla funcional → schema Zod (import desde zod/v4) → Mantine Form con schemaResolver (con sync: true si el schema es síncrono) → mensaje visible en el campo. Los tipos derivados con z.infer, si se usan, solo describen la forma; no ejecutan la validación.
- Entradas válidas (EJ-11): fase 2, descripción «Horas sin término en el archivo de cargas», referencia «Cargas CTP del año, fila de la persona A».
- Entradas inválidas: sin fase, sin descripción o sin referencia (EJ-13): no se guarda y se pide completar el dato.
- Duplicado (EJ-12): NO se puede decidir solo con los campos del formulario; necesita conocer los registros existentes. Es una limitación: PROPUESTA no confirmada de comprobarlo en el cliente con la lista disponible y, como garantía real, en el servicio que persista (dependencia sin resolver).

**Ciclo del Modal (decisiones confirmadas D56 y D59).**
- Propósito: crear o editar una anomalía sin salir de la pantalla.
- Abre: el analista, con «Registrar anomalía» (P3 y P4) o «Editar» en una fila (P4). El estado abierto/cerrado es estado local de React de la pantalla que lo abre; no va a Zustand (PROPUESTA, sub-decisión pendiente de confirmar).
- Contiene: los tres campos y los botones Guardar y Cancelar.
- Cierre y cancelación: cerrar de cualquier forma (X, Escape, clic fuera o Cancelar) descarta lo escrito; al reabrir, el formulario vuelve a los valores iniciales (vacío al crear, el registro guardado al editar). Mejora futura: confirmar si hay cambios sin guardar.
- Éxito: guardar correctamente cierra el Modal y la lista refleja el cambio.
- Error: campo vacío o duplicado mantienen el Modal abierto con el mensaje y sin descartar lo escrito (RN-30, CA-25, CA-30, CA-32). Fallo al persistir: sin servicio definido, queda pendiente.
- PROPUESTA (no está en D56 ni en D59): impedir el cierre mientras haya un guardado en curso (Mantine recomienda controlarlo con closeOnClickOutside y closeOnEscape). Qué pasa con el botón Cancelar en ese caso: sin decidir.

**Propiedad del estado.** Valores y errores del formulario: Mantine Form. Estado abierto del Modal: estado local React. Filtro por fase de P4: estado local o URL (PROPUESTA, no decidido). Lista de anomalías y estado de revisión de cada fase: datos del servidor; hoy NO existe servicio. Qué se usa en P2 y P4 en el navegador sin servicio, incluida la posibilidad de datos de ejemplo locales, no está decidido (pregunta 10); D54 solo trata los tableros publicados. Zustand no interviene en este documento: su responsabilidad (selección de año y facultades) pertenece a T4.

**Habilitación según el estado del cálculo.** El formulario no debe ofrecerse con el cálculo detenido por una falla (RN-26) ni publicado (RN-32). Ese estado es dato del servidor, no resuelto (ver pendientes). Una guardia visual no es autorización del servicio.

**Sin Effects.** No se usa useEffect para filtros, eventos ni estado derivado.

**Lo que este borrador todavía no diseña.** E2 define también el proceso PR-02 (revisar los tableros y marcar fases). D70 asigna a T2 la parte de marcas de revisión de P2, y el tablero de fase de P3 es de E2. Este borrador no los diseña; quedan como preguntas abiertas, sin decidirlas:
- a) Marcas de revisión por fase (RN-23 a RN-25 y RN-27; CA-13 a CA-17 y CA-19): marcar y quitar la marca de cada una de las seis fases, cálculo listo para publicar con las seis marcadas, borrado de las marcas al recalcular y que no se exija abrir el tablero antes de marcar. Qué pieza del cliente muestra y cambia las marcas, qué componente usa y de dónde sale su estado: sin decidir.
- b) Marcas con el cálculo detenido por una falla (RN-26) y con el cálculo publicado (RN-32): qué se ofrece en cada caso, sin decidir (relacionado con las preguntas 4 y 5 de T3).
- c) Tablero de fase de P3 (RN-28; CA-20 y CA-33): pestaña «Resumen» al inicio, «Controles» al final y pestañas intermedias por fase, que solo ve el analista; qué componentes lo muestran y cómo se organizan las seis fases: sin decidir.
- d) Ver los tableros de las fases ya calculadas cuando el cálculo se detuvo por una falla (RN-26, CA-18; CA-03 de E1): sin decidir.

## Dependencies, rollout, risks, and validation

**Dependencias propuestas, NO instaladas (versiones de la cohorte).** react-router 8.3.1; zod 4.4.3; @mantine/core 9.4.1; @mantine/form 9.4.1 (los paquetes Mantine comparten versión). Sin mantine-form-zod-resolver ni librería de notificaciones. TanStack Query y Zustand se justifican en T4. Instalarlas requiere autorización aparte.

**Etapas de construcción propuestas (sin fechas).**
1. Layout del analista y rutas P1 a P4 con pantallas vacías; criterio de cierre: se navega entre ellas y la ruta desconocida muestra su pantalla.
2. Schema Zod de la anomalía con pruebas puras de EJ-11, EJ-12 y EJ-13 y los criterios CA-23, CA-25, CA-30 y CA-32.
3. Formulario con Mantine Form y schemaResolver, sin Modal; criterio: errores visibles por campo.
4. Modal con el ciclo de cierre y cancelación descrito.
5. Lista de P4 con filtro por fase; qué datos usa en el navegador sin servicio: sin decidir (pregunta 10).
Bloqueo externo: persistencia de anomalías y estado del cálculo, sin servicio.

**Riesgos.** El duplicado depende de datos que el formulario no tiene (mitigación: declararlo y fijar su ubicación antes de construir). Diferencias entre la documentación consultada (Mantine 9.7.5, React Router 7.x) y las versiones fijadas (9.4.1, 8.3.1) (mitigación: comprobar contra cada versión al instalar). Cierre accidental del Modal pierde lo escrito (aceptado en la primera versión).

**Validación PREVISTA (no ejecutada).**
- Pruebas puras con Vitest del schema: válido, inválido, incompleto, duplicado con mayúsculas distintas.
- Recorrido de navegador (depende de la pregunta 10): abrir, cancelar, guardar, duplicado y cierre con X, Escape y clic fuera.
- Build de la plantilla: solo demuestra que compila, no estas integraciones.
Nada de esto se ha ejecutado.

## Decisions and open questions

**Decisiones confirmadas por el autor (conversación de Fase 3, 2026-11-10; numeración de docs/proceso.md).** D55 formulario de anomalía como formulario real; D56 dos Modales de Mantine (formulario de anomalía y confirmación de publicar); D58 dos layouts sin segmento de URL; D59 descartar lo escrito al cerrar; D54 tableros sin API: bloqueo declarado, datos de ejemplo locales y consulta con el docente según el autor; D60 un spec-tech por cada E1 a E4; D69 año de trabajo del analista en el parámetro de consulta ?anio de la URL; D70 reparto de dueños entre los spec-tech; D71 no se simula ningún servicio en la aplicación; dobles de prueba solo en pruebas.

**Preguntas abiertas (no son decisiones).**
1. Mensaje exacto de campo obligatorio: pendiente 2 de E2; sin texto aprobado.
2. Longitud máxima de descripción y referencia y tratamiento de espacios al inicio y al final: no definido.
3. Dónde se comprueba el duplicado y con qué datos.
4. Confirmación al eliminar un registro: E2 no la define.
5. Fuente y persistencia de anomalías, estado del cálculo y marcas de revisión: sin servicio.
6. Estado abierto del Modal y filtro por fase: confirmar propiedad.
7. Compatibilidad con las versiones fijadas de React Router 8.3.1 y Mantine 9.4.1.
8. El health automático de AHK falla al lanzar health.bat; pendiente de resolver y declarar (D63 y D72).
9. Composición de la pantalla P2, que junta las partes de T1, T2 y T3 y no tiene dueño: D70, sin decidir.
10. Qué se ve en P2 y P4 en el navegador sin servicio, incluida la posibilidad de datos de ejemplo locales: análogo a la pregunta 12 de T4 y a la pregunta 16 de T1 (D71); D54 solo trata los tableros publicados; sin decidir.
11. Diseño de las marcas por fase y del tablero de fase de P3: ver «Lo que este borrador todavía no diseña» (a a d); sin decidir.
12. En P3, si el selector de fase del formulario de anomalía viene preseleccionado con la fase del tablero abierto: E2 dice solo que la fase «la elige el analista» (RN-30); sin decidir.
13. Qué componente se usa para el selector de fase y para los demás campos del formulario: sin decidir.