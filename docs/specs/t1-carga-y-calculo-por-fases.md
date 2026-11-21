---
slug: "t1-carga-y-calculo-por-fases"
title: "T1 · Diseño técnico de la carga del año y del estado del cálculo (E1)"
description: "Borrador de diseño técnico del frontend para la carga del conjunto anual de archivos (P1) y el estado del cálculo en P2 (diseño previsto condicionado a que exista un servicio). El cálculo corre en el servidor (según D60) y no se diseña aquí. Propuesta documental; nada está implementado."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T01:14:00.472Z"
last_updated: "2026-11-11T03:25:22.581Z"
source_spec: e1-carga-y-calculo-por-fases
---
## Source and current evidence

**Origen funcional.** Especificación funcional E1 (e1-carga-y-calculo-por-fases), aprobada; last_updated 2026-11-05T04:53:21.308Z. Caso de origen: cargar-archivos-anio-calculo-por-fases (caso 1). Reglas que afectan al cliente: RN-01, RN-02, RN-05, RN-07 y RN-08; RN-03 (de E3) y RN-04 (de E2) solo se referencian. Criterios que el cliente muestra o puede comprobar: CA-01, CA-02, CA-03 y CA-08; el resto es del servicio. Mensajes propuestos: MS-01 a MS-03. Ejemplo: EJ-02. Pantallas de origen (fase 2): P1 Carga del año; P2 Estado del cálculo y publicación (la parte del resultado del cálculo).

**Hechos sobre la base existente (repositorio, 2026-11-09).** Plantilla Vite con React 19.2.8 y TypeScript 6.0.3; src/ solo contiene App.tsx de demostración; React Router, TanStack Query, Zustand, Zod y Mantine NO están instalados; no hay tests. El health del harness es health.bat (pnpm build); su lanzamiento desde AHK 3.0.0 falla en este equipo y está documentado.

**Hechos sobre las fuentes remotas.** La subida sería hacia un servicio que hoy no existe (D67); el estado del cálculo está condicionado a que exista un servicio (D68); el servicio de validación de columnas es un pendiente (pregunta 9), no un hecho verificado. El cálculo de las seis fases corre en el servidor, según D60, y no se diseña aquí.

**P2 se reparte entre documentos (D60 y D70).** Estado del cálculo de P2: este documento (T1, D68). Marcas de revisión de P2: T2. Botón «Publicar» y Modal de confirmar de P2: T3. La composición de la pantalla P2, que junta las tres partes, no tiene dueño: queda como pregunta abierta, sin decidir.

**Documentación oficial consultada.** No se consultó documentación nueva para este borrador. El estado del cálculo reutiliza los conceptos de TanStack Query ya citados en D53 y D68 (queryKey, enabled, isLoading frente a isPending, estados), versión fijada @tanstack/react-query 5.102.8 (por comprobar; el índice no la lista). No se consultó documentación de ningún componente de Mantine para seleccionar archivos: no está decidido (pregunta 7).

## Boundaries, contracts, and design

**Alcance de este documento.** P1 (indicar el año y seleccionar los archivos del año), la comprobación del cliente (D67) y el estado del cálculo en P2 (D68). Fuera: las seis fases del cálculo, sus controles (RN-10 a RN-15) y las reglas de costo (RN-16 a RN-22), que son del servicio porque el cálculo corre en el servidor, según D60; revisión y anomalías (T2); publicación (T3); consulta de Rectorado y Decano (T4). El layout del analista (D58) y el año de trabajo en ?anio (D69) son de T2; aquí se referencian sin repetirlos (D70).

**P1 · Carga del año (D67; dueño: este documento).** El analista indica el año y selecciona los archivos requeridos, que son los de RN-08 (siete originales, cuatro equivalentes del año anterior y cinco de apoyo; lista final sin decidir). El cliente comprueba solo que el año esté indicado y que cada archivo requerido esté seleccionado, sin leer su contenido (D67). Esa comprobación es una comodidad, no una garantía: el servicio debe volver a comprobar (RN-08, RN-01). El dato faltante dentro de un archivo (MS-02) y la validación de columnas dependen del servicio. No se admiten cargas parciales (RN-01, CA-08). Texto de MS-01: PROPUESTO, sin aprobar. Dónde y cómo aparece MS-01: sin decidir (D67). Qué componente selecciona los archivos: sin decidir (pregunta 7).

**Función pura candidata (PROPUESTA, sin decidir).** Dada la lista de archivos requeridos y la de los seleccionados, devuelve cuáles faltan (el caso de MS-01). No lee el contenido de los archivos.

**Subida (D67).** Mutación hacia un servicio que hoy no existe: diseño previsto condicionado a que exista, sin simular la subida ni el cálculo (D71); no se afirma probado. El reemplazo del cálculo anterior (RN-02) lo garantiza el servicio.

**Estado del cálculo en P2 (D68; dueño: este documento).** Consulta de TanStack Query con identidad ['calculo', año], DISEÑO PREVISTO condicionado a que exista un servicio. Estados de la interfaz: en curso, completado, detenido en la fase N con el control que falló, y error de archivo. «En curso» es un estado de la interfaz (de carga), no del negocio. E1 distingue éxito, error de archivo (RN-07: se detecta antes de calcular y no se calcula nada) y falla de control (RN-05: detiene el cálculo en esa fase; el analista puede ver los tableros de las fases ya calculadas, CA-03; mensaje MS-03, propuesto). El año de la consulta sale del parámetro ?anio (procedencia cerrada por D69); qué ocurre si falta o es inválido: sin decidir (D68, D69). Sin simular el cálculo ni su progreso (D71).

**Propiedad del estado.** Año de trabajo: parámetro ?anio de la URL (D69, de T2). Archivos seleccionados en P1: estado local de React (PROPUESTA, sin confirmar). Estado del cálculo: datos del servidor, previsto como consulta; el resultado de una carga es una respuesta temporal y no un estado del producto (fase 2, 15.2). Sin Zustand (su responsabilidad es de T4); D67 descartó el formulario con Zod (alternativa 3) y el uso de Mantine Form en P1 no está decidido (pregunta 22; el formulario real es el de la anomalía, D55, de T2); sin useEffect para filtros, eventos ni estado derivado.

**Lo que el cliente no garantiza.** Los archivos y datos obligatorios (RN-08), el conjunto completo y de una vez (RN-01), el reemplazo del cálculo (RN-02), la distinción entre error de archivo y falla de control (RN-07), los controles y su tolerancia (RN-05, RN-06, RN-10 a RN-15) y que Rectorado y Decano no vean un cálculo hasta que se publique (RN-03) son garantías del servicio. Una guardia visual no es autorización del servicio.

## Dependencies, rollout, risks, and validation

**Dependencias propuestas, NO instaladas (versiones de la cohorte).** @tanstack/react-query 5.102.8 (consulta del estado del cálculo, condicionado a que exista el servicio); react-router 8.3.1 (P1 y P2 dentro del layout del analista de T2). Qué componentes visuales de Mantine usa P1, incluida la selección de archivos: sin decidir (pregunta 7). Instalar cualquier dependencia requiere autorización aparte.

**Etapas de construcción propuestas (sin fechas).**
1. P1 dentro del layout del analista (T2, D58): indicar el año y seleccionar archivos, con la función pura (PROPUESTA) que dice cuáles faltan. Criterio de cierre: con una selección incompleta se observa la lista de archivos que faltan; sujeta a las preguntas abiertas 1, 2, 3, 5, 7, 18 y 21.
2. Mensaje de archivo faltante (MS-01): sujeto a las preguntas abiertas 4, 6 y 21.
3. Estado del cálculo en P2 con los cuatro estados de la interfaz (D68): sujeto a las preguntas abiertas 11, 12, 13, 15, 16 y 17.
4. Subida y consulta del cálculo contra un servicio: BLOQUEADAS hasta que exista; sujetas a las preguntas abiertas 8, 9, 10 y 14.
Bloqueos externos: servicio de carga, cálculo y validación de columnas; lista final de archivos requeridos (pendientes 6, 7 y 8 de E1).

**Riesgos.** Confundir la comprobación del cliente con una garantía (mitigación: declararlo, D67). Cambios en la lista final de archivos (pendientes 6, 7 y 8 de E1) que obliguen a ajustar la función pura y P1 (mitigación (PROPUESTA): mantenerla como dato, no como código fijo). Estado «en curso» sin sondeo ni contrato de servicio (preguntas 10 y 11). Mostrar como estado remoto algo que no lo es (mitigación: D71). Diferencias entre la documentación consultada y las versiones fijadas.

**Validación PREVISTA (no ejecutada).**
- Se puede probar sin servicio (todo pendiente de ejecutar):
  - La función pura que dice qué archivos faltan (PROPUESTA), con pruebas de Vitest sin DOM: ninguno falta, falta uno, faltan varios y no hay ninguno seleccionado (CA-02 y CA-08, en lo que toca al cliente; MS-01).
  - Que el año esté indicado (D67); qué es un año válido no está definido (pregunta 5).
- Previsto pero con viabilidad por comprobar: la selección de archivos en el navegador, que depende del componente (pregunta 7); y la traducción de la respuesta de la consulta a los cuatro estados de la interfaz, análogo a la pregunta 13 de T4.
- No se puede probar sin servicio: la subida real, el reemplazo del cálculo (RN-01, RN-02), el dato faltante dentro de un archivo (MS-02) y las columnas, los controles y la detención del cálculo (CA-01, CA-03, EJ-02), que Rectorado y Decano no vean un cálculo sin publicar (RN-03) y el estado real del cálculo (en curso, completado, detenido).
- El build de la plantilla solo demuestra que compila. Nada de esto se ha ejecutado.

## Decisions and open questions

**Decisiones del autor (conversación de Fase 3, 2026-11-10; numeración de docs/proceso.md).** Dueño de D67 (qué comprueba el cliente al subir los archivos) y D68 (estado del cálculo en P2), según el reparto de D70. Referencia sin repetir: D58 y D69 (layout del analista y ?anio, de T2), D55 (el formulario real es el de la anomalía, de T2), D60 y D70 (reparto) y D71 (no se simula ningún servicio).

**Preguntas abiertas (no son decisiones; cada una remite a su origen).**
1. Archivo de ajustes manuales de componente (archivo propio y opcional): pendiente 6 de E1, sin decidir.
2. Lista de carreras, de «movilidades» y componentes centrales, como archivo de apoyo o parte del sistema: pendiente 7 de E1, sin decidir.
3. Columnas obligatorias de los cinco archivos de apoyo: pendiente 8 de E1, sin decidir.
4. Confirmación de los textos de MS-01 a MS-03 (propuestos, sin aprobar): pendiente 9 de E1 (la parte de ejemplos de reglas restantes es del servicio) y D67, sin decidir.
5. Qué es un año válido: E1 no lo define; D67, sin decidir.
6. Dónde y cómo aparece el mensaje de archivo faltante (MS-01): D67, sin decidir.
7. Qué componente selecciona los archivos (de Mantine u otro): D67 no lo decidió; sin decidir.
8. Si la subida se modela con TanStack Query, como D65: D67 la llama «mutación»; sin decidir.
9. Servicio de carga y de validación de columnas (contrato, errores y respuesta): D67, sin decidir.
10. Sondeo periódico y contrato del servicio del cálculo: D68, sin decidir.
11. Reparto de las consultas de P2 (resultado del cálculo, marcas de revisión y publicación): D68 y D70; pregunta abierta de T1, sin decidir.
12. Qué ve P2 tras un error de archivo (¿el cálculo anterior de ese año o nada?): D68; E1 no lo dice, sin decidir.
13. Qué ocurre si el año falta o es inválido en la URL: D68 y D69, sin decidir.
14. Cómo llega el año a la URL tras subir los archivos en P1: pendiente de D69, que se lleva en T1 por referencia (D69 y D70), sin decidir.
15. Composición de la pantalla P2, que junta las partes de T1, T2 y T3 y no tiene dueño: D70, sin decidir.
16. Qué se ve en P1 y en P2 en el navegador sin servicio: análogo a la pregunta 12 de T4 (D71), sin decidir.
17. Cómo ejercitar en pruebas los estados de la consulta del cálculo: análogo a la pregunta 13 de T4 (D71), sin decidir.
18. Dónde se guardan los archivos seleccionados antes de enviarlos (propuesta: estado local de React): sin confirmar.
19. Compatibilidad con las versiones fijadas de TanStack Query 5.102.8 y React Router 8.3.1.
20. El health automático de AHK falla al lanzar health.bat (D63 y D72).
21. Si el cliente impide enviar mientras falte un archivo requerido o solo lo avisa (E1 dice solo «no se calcula nada y se indica qué falta»): RN-07, CA-02 y CA-08; sin decidir.
22. Si P1 usa Mantine Form: D67 descartó el formulario con Zod; el uso de Mantine Form en P1 no está decidido; sin decidir.