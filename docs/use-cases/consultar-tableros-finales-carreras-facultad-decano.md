---
slug: "consultar-tableros-finales-carreras-facultad-decano"
title: "Consultar los tableros finales de las carreras de su facultad (Decano)"
description: "El Decano consulta por su cuenta los tableros finales publicados solo de las carreras de su facultad."
spec_kind: use-case
status: approved
created_at: "2026-10-26T02:06:50.598Z"
last_updated: "2026-10-26T02:58:55.435Z"
---
## Actor, goal, and trigger

- Actor: Decano (usuario con rol Decano y su facultad asignada, ya identificado).
- Objetivo: consultar por su cuenta los mismos tableros finales que Rectorado (los tres: superávit y déficit, costo de clases y gestión docencia), solo de las carreras de su facultad.
- Disparador: el Decano necesita consultar los resultados.

## Preconditions and main flow

Precondiciones:
- El analista ha publicado resultados del año.
- El Decano está identificado con su rol y tiene su facultad asignada (cómo se asigna, decisión posterior).

Flujo principal:
1. El Decano accede a los tableros finales.
2. Ve los tres tableros finales (superávit y déficit, costo de clases y gestión docencia) solo de las carreras de su facultad.
3. Por defecto ve el año en curso y puede elegir entre los años publicados; siempre solo de las carreras de su facultad.
4. Ve lo último publicado.
5. Cada tablero muestra la fecha de publicación.
6. Puede descargar o exportar, siempre solo de las carreras de su facultad.

## Alternatives, failures, and rules

Alternativas:
- Mientras se recalcula un cálculo nuevo, ve lo último publicado.

Fallos:
- Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
- Si el Decano no tiene facultad asignada, no ve ninguna carrera.

Reglas:
- Ve los mismos tres tableros finales que Rectorado pero solo de las carreras de su facultad.
- No ve carreras de otras facultades.
- No ve resultados sin publicar.
- No ve los tableros de las fases.
- No ve las anomalías registradas (que las autoridades las vean es mejora futura).
- Un Decano sin facultad asignada no ve ninguna carrera (decisión de gobernanza).
- Por defecto se muestra el año en curso y puede elegir entre los años publicados (D18, D20).
- Puede descargar o exportar, limitado a las carreras de su facultad (D18, D20).
- Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados (D18, D20).
- El tablero muestra la fecha de publicación (D18, D20).
- No aplica al Decano filtrar o agrupar por facultad, porque ya ve una sola facultad (D20).

Exclusiones: promedios institucionales para Decanato (mejora futura); gestión de usuarios; integración con identidad institucional; roles Webmaster y Visitante.

## Observable outcome and acceptance criteria

Resultado observable: el Decano ve los tres tableros finales publicados (superávit y déficit, costo de clases y gestión docencia) solo de las carreras de su facultad.

Criterios de aceptación:
- Dada una publicación, cuando el Decano consulta, entonces ve los tres tableros finales solo de las carreras de su facultad.
- Dado un Decano de la facultad A, entonces no ve carreras de la facultad B.
- Dado un cálculo sin publicar, entonces no lo ve.
- Dado un cálculo nuevo en curso, entonces sigue viendo lo último publicado.
- Dadas anomalías registradas, entonces no las ve.
- Dada una publicación, entonces el Decano no ve los tableros de las fases.
- Dado un Decano sin facultad asignada, cuando consulta, entonces no ve ninguna carrera.
- Dados uno o más años publicados, cuando el Decano consulta, entonces ve por defecto el año en curso y puede elegir entre los años publicados, siempre solo de las carreras de su facultad.
- Dado un Decano de la facultad A, cuando descarga o exporta, entonces lo obtenido incluye solo las carreras de la facultad A.
- Dado que no hay nada publicado, cuando el Decano consulta, entonces ve una etiqueta que indica que no existen datos procesados.
- Dada una publicación, cuando el Decano ve un tablero, entonces el tablero muestra la fecha de publicación.

## Decisions and open questions

Decisiones confirmadas relevantes (docs/proceso.md): D1 (separado de Rectorado por regla de acceso distinta; los usuarios tendrán acceso solo a su contenido), D2, D5, D11 (los tableros finales son tres: superávit y déficit, costo de clases y gestión docencia; la publicación incluye solo los tableros finales, no los de las fases; un Decano sin facultad asignada no ve ninguna carrera, por gobernanza), D20 (las respuestas D18 aplican al Decano, salvo filtrar o agrupar por facultad).

Preguntas abiertas:
- Si una facultad puede tener más de un Decano o un Decano más de una facultad.
- Si ve algún total o referencia institucional para comparar (los promedios institucionales para Decanato son mejora futura, no incluir).
- Qué significa "año en curso" (año calendario actual o el último año publicado) y qué se muestra por defecto si el año en curso no tiene nada publicado pero otros años sí.
- Qué se descarga o exporta (qué contenido y en qué formato).
