---
slug: "registrar-anomalia-datos-no-corregible"
title: "Registrar una anomalía de los datos que no se puede corregir"
description: "El analista deja registrada una anomalía de datos cuyo dato de origen tiene la irregularidad y no se corrige."
spec_kind: use-case
status: approved
created_at: "2026-10-26T02:06:50.551Z"
last_updated: "2026-10-26T02:44:32.344Z"
---
## Actor, goal, and trigger

- Actor: analista de la Gerencia de Planificación Estratégica (identificado con usuario institucional y rol).
- Objetivo: dejar registrada, visible, una anomalía de datos cuyo dato de origen tiene la irregularidad y no se corrige, para que no se pierda (hoy esas inconsistencias no quedan registradas).
- Disparador: durante la revisión de los tableros, el analista encuentra una anomalía que no puede corregir en los archivos.

## Preconditions and main flow

Precondiciones:
- Hay un cálculo del año completado.
- El analista está identificado con rol de analista.
- El analista identificó una anomalía de datos (datos procesables con inconsistencias, que no bloquearon el cálculo).

Flujo principal:
1. El analista identifica una anomalía que no se puede corregir porque el dato de origen tiene la irregularidad.
2. La deja registrada.
3. El registro queda guardado y visible para el analista.

## Alternatives, failures, and rules

Alternativas:
- Si la anomalía sí se puede corregir, no se registra: el analista corrige el archivo y vuelve a subir el conjunto completo (caso de carga).

Fallos: ninguno decidido (ver preguntas abiertas).

Reglas:
- Las anomalías registradas las ve solo el analista; Rectorado y Decano no las ven (que las autoridades las vean es mejora futura, fuera de la primera versión).
- Los registros de anomalías pertenecen al cálculo en curso; si se recalcula, el analista vuelve a registrar las que sigan presentes.
- Una anomalía de datos no impide calcular.

Exclusiones: conservar anomalías entre cálculos; que las autoridades las vean.

## Observable outcome and acceptance criteria

Resultado observable: queda un registro de la anomalía, guardado y visible para el analista, dentro del cálculo en curso.

Criterios de aceptación:
- Dada una anomalía no corregible, cuando el analista la registra, entonces el registro queda guardado y visible para el analista.
- Dado un registro de anomalía, entonces Rectorado y Decano no lo ven.
- Dado un cálculo que se recalcula, entonces los registros del cálculo anterior no se conservan y el analista debe volver a registrar los que sigan presentes.
- Dada una anomalía corregible, entonces no se registra: se corrige y se vuelve a subir el conjunto.

## Decisions and open questions

Decisiones confirmadas relevantes (docs/proceso.md): D1 (caso aparte; solo el analista ve las anomalías), D5 (pertenecen al cálculo en curso).

Preguntas abiertas:
- Qué datos tiene un registro de anomalía (p. ej. fase, referencia al archivo/dato, descripción).
- Si el analista puede editar o eliminar un registro.
- Si el registro se asocia a una fase concreta.
- Si registrar anomalías es obligatorio antes de marcar una fase como revisada o antes de publicar.
- Si el analista puede registrar una anomalía antes de terminar de revisar las seis fases.
- Dónde y cómo ve el analista la lista de anomalías registradas.
- Qué ocurre si registra la misma anomalía dos veces.
