---
slug: "t3-publicacion-de-resultados"
title: "T3 · Diseño técnico de la publicación de los resultados del año (E3)"
description: "Borrador de diseño técnico del frontend para publicar los resultados del año: botón «Publicar» de P2, Modal de confirmación y sincronización tras publicar (diseño previsto condicionado a que exista un servicio). Propuesta documental; nada está implementado."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T01:07:17.875Z"
last_updated: "2026-11-11T03:02:27.869Z"
source_spec: e3-publicacion-de-resultados
---
## Source and current evidence

**Origen funcional.** Especificación funcional E3 (e3-publicacion-de-resultados), aprobada; last_updated 2026-11-05T06:29:32.577Z. Caso de origen: publicar-resultados-del-anio (caso 4). Reglas: RN-33 a RN-40 y RN-03 (definidas en E3); RN-24, RN-26 y RN-32 (definidas en E2, aquí solo se referencian). Criterios: CA-34 a CA-48. Ejemplos: EJ-14 a EJ-17. Pantalla de origen (fase 2): P2 Estado del cálculo y publicación. Solo el analista publica (RN-40).

**Hechos sobre la base existente (repositorio, 2026-11-09).** Plantilla Vite con React 19.2.8 y TypeScript 6.0.3; src/ solo contiene App.tsx de demostración; React Router, TanStack Query, Zustand, Zod y Mantine NO están instalados; no hay tests. El health del harness es health.bat (pnpm build); su lanzamiento desde AHK 3.0.0 falla en este equipo y está documentado.

**Hechos sobre las fuentes remotas.** NO existe servicio de publicación (D65); D54 declara que no existe ninguna API para los tableros publicados. Lo que se diseña aquí es previsto y condicionado a que exista un servicio.

**P2 se reparte entre documentos (D60 y D70).** Botón «Publicar» y Modal de confirmar de P2: este documento (T3). Marcas de revisión de P2: T2. Estado del cálculo de P2: T1 (D68). La composición de la pantalla P2, que junta las tres partes, no tiene dueño: queda como pregunta abierta, sin decidir.

**Documentación oficial consultada (2026-11-10; reutilizada de D64 y D65, sin consulta nueva para este borrador).**
- Mantine Modal (Context7 /mantinedev/mantine): closeOnClickOutside y closeOnEscape activos por defecto y controlables; se puede impedir el cierre durante una operación asíncrona. El código consultado indica la 9.7.5; el stack fija la 9.4.1: comportamiento POR COMPROBAR.
- TanStack Query (Context7 /tanstack/query, React v5): useMutation expone isPending e isError; el patrón documentado es onSuccess con queryClient.invalidateQueries; devolver la promesa de la invalidación mantiene la mutación en isPending hasta que termine el refetch. El índice no ofrece la 5.102.8 fijada (lista 5.103.2 y otras v5): compatibilidad POR COMPROBAR.

## Boundaries, contracts, and design

**Alcance de este documento.** Botón «Publicar» de P2, Modal de confirmación y sincronización tras publicar. Fuera: carga y cálculo (T1), marcas de revisión y anomalías (T2), consulta de Rectorado y Decano (T4). El layout del analista (D58) y el año de trabajo en ?anio (D69) son de T2; aquí se referencian sin repetirlos (D70).

**Botón «Publicar» (D66; dueño: este documento).** Siempre es clicable. Con alguna fase sin revisar no abre el Modal y el mensaje nombra la fase que falta (EJ-15; regla: RN-24 y CA-15 de E2, CA-35 de E3; EJ-15 es un ejemplo, no una regla). Con las seis revisadas abre el Modal. Texto del mensaje: PROPUESTO, sin aprobar. Qué fases están revisadas lo conoce el servidor (T2): hoy no hay servicio; qué se ve en P2 en el navegador sin servicio, incluida la posibilidad de datos de ejemplo locales, no está decidido (pregunta 17).

P2 no ofrece retirar ni despublicar una publicación (RN-34, CA-43); solo se sustituye publicando de nuevo ese año.

**Modal de confirmar publicar (D64; dueño: este documento).** Propósito: confirmar la publicación del año. Lo abre el analista desde P2. Contiene el mensaje fijado en D41 (RN-33, CA-37): «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» con los botones Confirmar y Cancelar.
- Cancelar antes de confirmar: no se publica y nada cambia (CA-38, EJ-16); que el Modal se cierre en ese caso es una decisión de diseño, no una regla de E3.
- Al confirmar: el Modal permanece abierto con el botón en «publicando» y sin poder cerrarse (ni con la X, ni con Escape, ni con clic fuera; el botón Cancelar queda deshabilitado mientras está en «publicando») hasta que haya resultado.
- Éxito: se cierra y P2 refleja la publicación.
- Fallo: permanece abierto con un mensaje. El texto del mensaje y el comportamiento tras el fallo (propuesta: se habilita el cierre y lo ya publicado no cambia) son PROPUESTOS, sin aprobar; tocan el pendiente 4 de E3.
- Sin «Reintentar» (D64; D62 solo como precedente en la identidad): iría por la skill funcional si se quisiera como regla.
- Estado abierto del Modal: estado local de React de P2 (PROPUESTA, sin confirmar).
- El año que muestra el mensaje: PROPUESTA, el año de trabajo del analista (D69); sin confirmar.
- El Modal del formulario de anomalía es de T2 (D56); aquí solo se usa el mismo componente de Mantine para otro fin.

**Sincronización tras publicar (D65; dueño: este documento).** DISEÑO PREVISTO condicionado a que exista un servicio de publicación: la publicación se modela como una mutación de TanStack Query; el cambio se considera confirmado cuando la mutación termina con éxito; al confirmarse se invalidan las consultas de P2 y de los años publicados para que se vuelvan a pedir. No existe servicio de publicación (D65): el diseño no se afirma probado ni funcionando, y no se usa ninguna función simulada que publique (D71). Los nombres de las consultas a invalidar no están decididos; la de estado del cálculo de P2 es de T1 (D68).

**Propiedad del estado.** Abierto o cerrado del Modal: estado local de React (propuesta). «Publicando» y error: relación con el estado de la mutación NO decidida (D64, D65). Qué fases están revisadas, el estado del cálculo y las publicaciones vigentes: datos del servidor; hoy sin servicio. Sin Zustand (su responsabilidad es de T4) y sin useEffect para filtros, eventos ni estado derivado.

**Lo que el cliente no garantiza.** Que solo el analista publique (RN-40, CA-47), que haya seis fases revisadas (RN-24), que la publicación del año sustituya a la anterior de ese año sin tocar los demás (RN-37, CA-39, CA-48), que lo publicado no cambie si un cálculo nuevo falla (RN-38, CA-41, EJ-17) y que el cálculo publicado quede en solo lectura (RN-32) son garantías del servicio. Una guardia visual no es autorización del servicio.

## Dependencies, rollout, risks, and validation

**Dependencias propuestas, NO instaladas (versiones de la cohorte).** @mantine/core 9.4.1 (Modal); @tanstack/react-query 5.102.8 (useMutation, condicionado a que exista el servicio); react-router 8.3.1 (P2 dentro del layout del analista de T2). Instalarlas requiere autorización aparte.

**Etapas de construcción propuestas (sin fechas).**
1. Botón «Publicar» en P2 (qué datos usa sin servicio: pregunta 17): con una fase sin revisar muestra el mensaje y no abre el Modal; con las seis revisadas abre el Modal. Criterio de cierre: ambos casos observables (EJ-14, EJ-15); sujeta a las preguntas abiertas 3, 4, 5, 6, 7, 8 y 17.
2. Modal de confirmar con el texto fijado en D41 y los botones Confirmar y Cancelar; cancelar no cambia nada (CA-37, CA-38).
3. Estado «publicando» con cierre bloqueado y manejo del fallo: sujeto a las preguntas abiertas 2, 9 y 10.
4. Mutación e invalidación (D65): BLOQUEADA hasta que exista un servicio de publicación.
Bloqueos externos: servicio de publicación (contrato, errores y plazo de espera), constancia del docente sobre el servicio.

**Riesgos.** Confundir una guardia visual con autorización (mitigación: declararlo). Modal bloqueado en «publicando» si el servicio no responde (mitigación: decidir plazo de espera y qué se muestra al agotarlo; hoy sin decidir). Mezclar datos de ejemplo, si se usan (pregunta 17), con estado remoto (mitigación: aislarlos y rotularlos, D71). Mensajes sin texto aprobado. Diferencias entre la documentación consultada y las versiones fijadas (9.7.5 frente a 9.4.1; la 5.102.8 no figura en el índice).

**Validación PREVISTA (no ejecutada).**
- Se puede probar sin servicio (todo pendiente de ejecutar):
  - Una función pura que decida, a partir del estado de las seis marcas, si el botón abre el Modal o qué fase falta (PROPUESTA; casos EJ-14, EJ-15, CA-34 y CA-35), con pruebas de Vitest sin DOM.
  - El texto fijo del mensaje de confirmación (RN-33, CA-37).
  - Recorrido de navegador (depende de la pregunta 17): abrir el Modal y cancelar sin cambios (CA-38, EJ-16).
- Previsto pero con viabilidad por comprobar: el comportamiento «publicando» (cierre bloqueado, Cancelar deshabilitado) en pruebas de componentes; análogo a la pregunta 13 de T4.
- No se puede probar sin servicio: la publicación real y su efecto para Rectorado y Decano (CA-34, CA-42), la sustitución por año (CA-39, CA-48), que un cálculo nuevo que falla no cambie lo publicado (CA-41, EJ-17), el solo lectura (CA-46), que un usuario que no es el analista no publique (CA-47) y la invalidación de consultas.
- El build de la plantilla solo demuestra que compila. Nada de esto se ha ejecutado.

## Decisions and open questions

**Decisiones del autor (conversación de Fase 3, 2026-11-10; numeración de docs/proceso.md).** Dueño de D64 (ciclo del Modal de confirmar publicar), D65 (sincronización tras publicar) y D66 (botón «Publicar» de P2), según el reparto de D70. Referencia sin repetir: D54 (sin API para los tableros publicados), D56 (el Modal del formulario es de T2), D58 y D69 (layout del analista y ?anio, de T2), D68 (estado del cálculo, de T1), D60 y D70 (reparto) y D71 (no se simula ningún servicio).

**Preguntas abiertas (no son decisiones; cada una remite a su origen).**
1. Formato de la fecha de publicación y a quién se le muestra: pendiente 3 de E3.
2. Qué ocurre si la publicación no puede completarse por una causa distinta de fases sin revisar o cálculo detenido, y qué texto y comportamiento tiene el fallo: pendiente 4 de E3 y D64.
3. Textos de los mensajes distintos del de confirmación, por ejemplo el que nombra la fase faltante: pendiente 5 de E3 y D66.
4. Qué ofrece el botón con el cálculo detenido por una falla de control (RN-26 de E2): D66, sin decidir.
5. Qué ofrece el botón con el cálculo ya publicado (RN-32 de E2): D66, sin decidir.
6. Quién ve el botón si no es el analista (RN-40, CA-47): D66, sin decidir.
7. Si hay más de una fase sin revisar, si el mensaje nombra todas o solo la primera: D66, sin decidir.
8. Dónde aparece el mensaje de la fase faltante (junto al botón, en la pantalla u otra forma): D66, sin decidir.
9. Plazo de espera y qué se muestra si el servicio no responde y el Modal queda en «publicando»: D64, sin decidir.
10. Relación del estado «publicando» con el estado de la mutación y con el plazo de espera: D64 y D65, no decidida.
11. Contrato del servicio de publicación y nombres de las consultas a invalidar: D65.
12. Qué año muestra el mensaje de confirmación (propuesta: el año de trabajo de D69): sin confirmar.
13. Composición de la pantalla P2, que junta las partes de T1, T2 y T3 y no tiene dueño: D70.
14. Interpretación del caso 4 («sustituye a la última publicación del mismo año»): pendiente 6 de E3; se declara en la sección 20 de la entrega y no cambia este diseño.
15. Compatibilidad con las versiones fijadas de Mantine 9.4.1 (Modal) y TanStack Query 5.102.8 (useMutation).
16. El health automático de AHK falla al lanzar health.bat (D63 y D72).
17. Qué se ve en P2 en el navegador sin servicio, incluida la posibilidad de datos de ejemplo locales: análogo a la pregunta 12 de T4 y a la pregunta 16 de T1 (D71); D54 solo trata los tableros publicados; sin decidir.