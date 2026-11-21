---
slug: "consultar-tableros-finales-todas-carreras-rectorado"
title: "Consultar los tableros finales de todas las carreras (Rectorado)"
description: "Rectorado consulta por su cuenta los tableros finales publicados de todas las carreras."
spec_kind: use-case
status: approved
created_at: "2026-10-26T02:06:50.583Z"
last_updated: "2026-10-26T02:54:27.786Z"
---
## Actor, goal, and trigger

- Actor: Rectorado (usuario con rol Rectorado, ya identificado).
- Objetivo: consultar por su cuenta los tableros finales de todas las carreras (los tres: superávit y déficit, costo de clases y gestión docencia), sin depender del analista.
- Disparador: Rectorado necesita consultar los resultados.

## Preconditions and main flow

Precondiciones:
- El analista ha publicado resultados del año.
- Rectorado está identificado con su rol.

Flujo principal:
1. Rectorado accede a los tableros finales.
2. Ve por defecto el año en curso y puede elegir entre los años publicados.
3. Ve los tres tableros finales (superávit y déficit, costo de clases y gestión docencia) de todas las carreras.
4. Puede filtrar o agrupar por facultad.
5. Puede descargar o exportar.
6. Cada tablero muestra la fecha de publicación.
7. Ve lo último publicado.

## Alternatives, failures, and rules

Alternativas:
- Mientras se recalcula un cálculo nuevo, ve lo último publicado.

Fallos:
- Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.

Reglas:
- No ve resultados sin publicar.
- No ve los tableros de las fases.
- No ve las anomalías registradas (que las autoridades las vean es mejora futura).
- Ve todas las carreras, sin restricción por facultad (el filtro o la agrupación por facultad es opcional).
- Por defecto se muestra el año en curso y puede elegir entre los años publicados.
- Puede filtrar o agrupar por facultad.
- Puede descargar o exportar.
- Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
- El tablero muestra la fecha de publicación.

Exclusiones: promedios institucionales para Decanato (mejora futura de otro rol); gestión de usuarios; roles Webmaster y Visitante; integración con identidad institucional.

## Observable outcome and acceptance criteria

Resultado observable: Rectorado ve los tres tableros finales publicados (superávit y déficit, costo de clases y gestión docencia) de todas las carreras.

Criterios de aceptación:
- Dada una publicación, cuando Rectorado consulta, entonces ve los tres tableros finales (superávit y déficit, costo de clases y gestión docencia) de todas las carreras.
- Dado un cálculo sin publicar, entonces Rectorado no lo ve.
- Dado un cálculo nuevo en curso, entonces Rectorado sigue viendo lo último publicado.
- Dadas anomalías registradas, entonces Rectorado no las ve.
- Dada una publicación, entonces Rectorado no ve los tableros de las fases.
- Dados uno o más años publicados, cuando Rectorado accede a los tableros finales, entonces ve por defecto el año en curso y puede elegir entre los años publicados.
- Dados tableros finales publicados, cuando Rectorado filtra o agrupa por facultad, entonces ve los tableros según esa facultad.
- Dados tableros finales publicados, cuando Rectorado descarga o exporta, entonces obtiene la descarga o exportación.
- Dado que no hay nada publicado, cuando Rectorado accede a los tableros finales, entonces se muestra una etiqueta que indica que no existen datos procesados.
- Dada una publicación, cuando Rectorado consulta un tablero, entonces el tablero muestra la fecha de publicación.

## Decisions and open questions

Decisiones confirmadas relevantes (docs/proceso.md): D1 (caso separado del Decano por regla de acceso distinta), D2, D5, D11 (los tableros finales son tres: superávit y déficit, costo de clases y gestión docencia; la publicación incluye solo los tableros finales, no los de las fases), D18 (respuestas del usuario sobre este caso: año en curso por defecto y elección entre años publicados; filtrar o agrupar por facultad; descargar o exportar; etiqueta si no hay nada publicado; fecha de publicación visible).

Preguntas abiertas:
- Qué significa "año en curso" (año calendario actual o el último año publicado) y qué se muestra por defecto si el año en curso no tiene nada publicado pero otros años sí.
- Si "filtrar o agrupar por facultad" significa filtrar, agrupar o ambas cosas.
- Qué se descarga o exporta (qué contenido y en qué formato).
