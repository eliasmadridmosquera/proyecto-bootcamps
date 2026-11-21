---
slug: "publicar-resultados-del-anio"
title: "Publicar los resultados del año"
description: "El analista publica los resultados para que Rectorado y Decano pasen a ver los tableros finales del año."
spec_kind: use-case
status: approved
created_at: "2026-10-26T02:06:50.567Z"
last_updated: "2026-10-26T02:47:46.336Z"
---
## Actor, goal, and trigger

- Actor: analista de la Gerencia de Planificación Estratégica (identificado con usuario institucional y rol).
- Objetivo: hacer que Rectorado y Decano pasen a ver los tableros finales del año.
- Disparador: el analista termina la revisión (las seis fases marcadas como revisadas) y decide publicar.

## Preconditions and main flow

Precondiciones:
- Hay un cálculo del año completado.
- Las seis fases están marcadas como revisadas.
- El analista está identificado con rol de analista.

Flujo principal:
1. El analista publica los resultados del año.
2. El sistema pone a disposición de Rectorado y Decano los tableros finales, que son tres: superávit y déficit, costo de clases y gestión docencia.
3. Rectorado ve los de todas las carreras y cada Decano los de las carreras de su facultad (casos aparte).

## Alternatives, failures, and rules

Alternativas:
- Si se detecta una anomalía después de publicar, se vuelve a calcular y se publica de nuevo; mientras tanto Rectorado y Decano siguen viendo lo último publicado.

Fallos:
- Si alguna fase no está marcada como revisada, no se puede publicar.

Reglas:
- Rectorado y Decano no ven resultados hasta que el analista publica.
- Una publicación nueva sustituye a la última publicada (no hay historial de publicaciones en la primera versión).
- Un cálculo nuevo, mientras no se publique, no cambia lo que ven Rectorado y Decano.
- Solo el analista publica.
- La publicación incluye solo los tableros finales; los tableros de las fases no se publican y los ve solo el analista.

Exclusiones: historial de publicaciones; comparar con el cálculo anterior.

## Observable outcome and acceptance criteria

Resultado observable: Rectorado y Decano pasan a ver los tableros finales del año publicado.

Criterios de aceptación:
- Dado un cálculo con las seis fases revisadas, cuando el analista publica, entonces Rectorado y Decano pasan a ver los tableros finales.
- Dado un cálculo con alguna fase sin revisar, entonces no se puede publicar.
- Dado un cálculo sin publicar, entonces Rectorado y Decano no ven sus resultados.
- Dada una nueva publicación, entonces sustituye a la última publicada.
- Dado un cálculo nuevo sin publicar, entonces Rectorado y Decano siguen viendo lo último publicado.
- Dada una publicación, entonces Rectorado y Decano ven los tres tableros finales (superávit y déficit, costo de clases, gestión docencia) y no los tableros de las fases.

## Decisions and open questions

Decisiones confirmadas relevantes (docs/proceso.md): D2, D3, D5, D8, D9, D11 (los tableros finales son tres: superávit y déficit, costo de clases y gestión docencia; la publicación incluye solo los tableros finales, no los de las fases).

Preguntas abiertas:
- Si hay un paso de confirmación antes de publicar.
- Si se puede retirar o despublicar una publicación.
- Si se avisa a Rectorado y Decano cuando hay una publicación nueva.
- Si la publicación muestra fecha o identificación del cálculo publicado.
- Si hay varios años publicados a la vez y cómo se elige el año visible.
- Qué ocurre con lo publicado si un cálculo nuevo falla en una fase.
