---
slug: "revisar-tableros-fase-detectar-anomalias"
title: "Revisar los tableros de cada fase para detectar anomalías"
description: "El analista revisa los tableros de las seis fases del cálculo para detectar anomalías de datos antes de publicar."
spec_kind: use-case
status: approved
created_at: "2026-10-26T02:01:49.961Z"
last_updated: "2026-10-26T02:39:46.702Z"
---
## Actor, goal, and trigger

- Actor: analista de la Gerencia de Planificación Estratégica (identificado con usuario institucional y rol; cómo queda identificado queda fuera de este caso).
- Objetivo: revisar los tableros de cada una de las seis fases del cálculo y las anomalías de datos, para detectar inconsistencias antes de publicar los resultados.
- Disparador: existe un cálculo del año completado (caso "Cargar los archivos del año y obtener el cálculo por fases").
- Relación: este caso sigue al de carga y cálculo; el registro de una anomalía no corregible y la publicación son casos aparte.

## Preconditions and main flow

Precondiciones: el analista está identificado con rol de analista; hay un cálculo del año con las seis fases completadas y sus tableros disponibles.

Flujo principal:
1. El analista abre el tablero de una fase.
2. Revisa el tablero para detectar anomalías de datos (datos procesables con inconsistencias).
3. Si no encuentra anomalías, o ya las trató, marca la fase como revisada.
4. Repite para cada una de las seis fases.
5. Cuando las seis fases están marcadas como revisadas, el cálculo queda listo para publicarse (la publicación es un caso aparte).

## Alternatives, failures, and rules

Alternativas:
- Si encuentra una anomalía que se puede corregir en los archivos, el analista corrige el archivo y vuelve a subir el conjunto completo; se recalcula todo y las marcas de revisión se borran.
- Si encuentra una anomalía que no se puede corregir porque el dato de origen tiene esa irregularidad, la deja registrada (caso "Registrar una anomalía de los datos que no se puede corregir").

Fallos:
- Si un control de una fase falló, el cálculo se detuvo en esa fase (ver caso de carga y cálculo); el analista puede ver los tableros de las fases ya calculadas para buscar el origen del problema. No hay cálculo completo que publicar.

Reglas de negocio:
- La revisión se marca por fase: el analista marca cada fase como revisada.
- Solo se puede publicar cuando las seis fases están marcadas como revisadas.
- Al recalcular, todas las marcas de revisión se borran y el analista vuelve a revisar las seis fases.
- Una anomalía de datos no impide calcular ni revisar; una falla de control sí detiene el cálculo.
- Las anomalías registradas las ve solo el analista; Rectorado y Decano no las ven.

Exclusiones: comparar con el cálculo anterior; conservar marcas de revisión o anomalías entre cálculos; que las autoridades vean anomalías registradas; gestión de usuarios y roles.

## Observable outcome and acceptance criteria

Resultado observable: cada una de las seis fases aparece como revisada por el analista, y cuando lo están todas el cálculo queda listo para publicarse; o la revisión termina con una corrección (nuevo conjunto subido) o con una anomalía registrada.

Criterios de aceptación:
- Dado un cálculo completado, cuando el analista abre el tablero de una fase, entonces puede revisarlo y marcar esa fase como revisada.
- Dado un cálculo con las seis fases marcadas como revisadas, entonces el cálculo puede publicarse.
- Dado un cálculo con alguna fase sin marcar, entonces no puede publicarse.
- Dado un cálculo que se recalcula, entonces todas las marcas de revisión anteriores se borran y las seis fases quedan sin revisar.
- Dada una anomalía corregible, cuando el analista sube de nuevo el conjunto completo, entonces se recalcula todo y debe revisar de nuevo.
- Dada una anomalía no corregible, el analista puede dejarla registrada según el caso de registro de anomalías.
- Dada una anomalía de datos procesable, entonces el cálculo ya se completó y la revisión puede realizarse (no se bloquea).

## Decisions and open questions

Decisiones confirmadas por el usuario: (D8) la revisión se marca por fase y solo se puede publicar con las seis marcadas; (D9) al recalcular se borran todas las marcas y se revisa de nuevo todo.

Preguntas abiertas (no resueltas, no asumir):
- Si el tablero de cada fase muestra los resultados de los controles (ok, aviso, falla) y los avisos, o qué contenido concreto tiene cada tablero (fase de reglas).
- Si el analista puede quitar una marca de "revisada" antes de publicar.
- Si, con el cálculo detenido por una falla de control, el analista puede marcar como revisadas las fases ya calculadas (por defecto no se puede publicar de todos modos).
- Qué ocurre si el analista marca las seis fases sin haber abierto algún tablero (si el sistema lo exige o no).
