---
slug: "e4-consulta-tableros-finales"
title: "E4 · Consulta de los tableros finales (Rectorado y Decano)"
description: "Especificación funcional de la consulta de los tres tableros finales publicados por Rectorado (todas las carreras) y por el Decano (carreras de sus facultades): alcance por rol, año por defecto, filtro y agrupación, descarga y reglas de visibilidad."
spec_kind: spec
status: approved
created_at: "2026-11-05T06:35:13.209Z"
last_updated: "2026-11-05T06:48:05.457Z"
source_use_cases:
  - consultar-tableros-finales-todas-carreras-rectorado
  - consultar-tableros-finales-carreras-facultad-decano
---
## Upstream use cases and scope

Casos fuente (aprobados): consultar-tableros-finales-todas-carreras-rectorado (caso 5, versión 2026-10-26T02:52:29.135Z) y consultar-tableros-finales-carreras-facultad-decano (caso 6, versión 2026-10-26T02:57:44.045Z). Depende de E3 (publicación, aprobada), que deja disponibles los tableros finales, y de E2 y E1 por las reglas que referencia.

Alcance de E4:
- PR-05 · Rectorado consulta los tableros finales de todas las carreras. Actor: Rectorado (usuario con ese rol, ya identificado). Inicio: Rectorado necesita consultar los resultados; el analista ha publicado resultados.
- PR-06 · El Decano consulta los tableros finales de las carreras de su facultad. Actor: Decano (usuario con rol Decano y su facultad asignada, ya identificado). Cada facultad tiene un Decano y un subdecano que entran con el mismo rol (Decano) y ven lo mismo; el producto no los distingue. Inicio: el Decano necesita consultar los resultados; el analista ha publicado resultados.
- Los tableros finales son tres: Superávit / Déficit, Costo de Clases y Gestión docencia. La diferencia entre ambos actores es solo de alcance: Rectorado ve todas las carreras; el Decano, las carreras de su facultad.
- Hoy el autor genera los tres tableros con todas las carreras y un solo año y los comparte él mismo: no hay diferencia de acceso entre Rectorado y Decano, ni selector de año, ni filtro por facultad en los tableros finales, ni descarga. Todo eso es función nueva del producto.

Fuera de E4: la carga y el cálculo (E1); la revisión y las anomalías (E2); la publicación (E3). Exclusiones: promedios institucionales para Decanato (mejora futura); que las autoridades vean anomalías registradas (mejora futura); cómo se identifica a los usuarios y cómo se asigna la facultad (decisión posterior); gestión de usuarios y roles Webmaster/Visitante; integración con identidad institucional.

Etiquetas: RN = regla del negocio, PR = proceso, CA = criterio de aceptación, EJ = ejemplo. No reemplazan los identificadores de AHK. En E4 se definen RN-41 a RN-49. RN-03, RN-36, RN-37 y RN-39 se definen en E3; RN-31 en E2; aquí solo se referencian.

## Rules, exclusions, and acceptance criteria

### Procesos

PR-05 · Rectorado consulta los tableros finales.
1. Rectorado accede a los tableros finales.
2. Ve por defecto el año que corresponde según RN-43 y puede elegir entre los años publicados.
3. Ve los tres tableros finales de todas las carreras; cada tablero muestra la fecha de publicación (RN-44).
4. Puede filtrar por una o varias facultades y ver los totales agrupados por facultad (RN-45).
5. Puede descargar la tabla que está viendo en CSV (RN-46).
Alternativas: mientras se recalcula un cálculo nuevo, ve lo ya publicado (RN-48). Fallo: si no hay nada publicado, ve la etiqueta «No existen datos procesados.» (RN-43). Solo consulta: no cambia nada del cálculo ni de la publicación.

PR-06 · El Decano consulta los tableros finales.
1. El Decano accede a los tableros finales.
2. Ve por defecto el año que corresponde según RN-43 y puede elegir entre los años publicados, siempre solo de las carreras de su facultad.
3. Ve los tres tableros finales solo de esas carreras; cada tablero muestra la fecha de publicación (RN-44).
4. Puede descargar la tabla que está viendo en CSV, limitada a esas carreras (RN-46).
Alternativas: mientras se recalcula un cálculo nuevo, ve lo ya publicado (RN-48). Fallos: si no hay nada publicado, ve la etiqueta «No existen datos procesados.» (RN-43); si no tiene facultad asignada, no ve ninguna carrera y ve el mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» (RN-41). Solo consulta.

### Reglas
- RN-41. Alcance por rol. Rectorado ve las carreras de todas las facultades. El Decano ve solo las carreras de su facultad; no ve carreras de otras facultades. Cada rol de Decano ve las carreras de una sola facultad. Cada facultad tiene un Decano y un subdecano con el mismo rol (Decano): ven lo mismo y el producto no los distingue. Un Decano sin facultad asignada no ve ninguna carrera (decisión de gobernanza, D11) y ve el mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» Procesos: PR-05, PR-06.
- RN-42. Qué se ve. Rectorado y Decano ven solo los tres tableros finales publicados (Superávit / Déficit, Costo de Clases y Gestión docencia). No ven resultados sin publicar (RN-03), ni los tableros de las fases (RN-39), ni las anomalías registradas (RN-31 de E2). Procesos: PR-05, PR-06.
- RN-43. Año por defecto y elección. Por defecto se muestra el año en curso, que es el año calendario actual. Si ese año no tiene nada publicado pero otros años sí, se muestra por defecto el año publicado más reciente, con el aviso «Se muestra el año [año publicado] porque el año [año actual] aún no tiene resultados publicados.» Si no hay nada publicado, se muestra la etiqueta «No existen datos procesados.» Rectorado y el Decano pueden elegir entre los años publicados (RN-37 de E3; D18, D20). Procesos: PR-05, PR-06.
- RN-44. Fecha de publicación. Cada tablero muestra la fecha de publicación (RN-36 de E3; D18, D20). Procesos: PR-05, PR-06.
- RN-45. Filtro y agrupación por facultad (solo Rectorado). Ambas: puede elegir una o varias facultades para filtrar y ver los totales agrupados por facultad. Si no elige ninguna facultad, ve todas las carreras. Los totales agrupados por facultad muestran estudiantes, costo real, esperado y diferencia. No aplica al Decano (D20): cada Decano ve una sola facultad. Procesos: PR-05.
- RN-46. Descarga o exportación. Rectorado y el Decano pueden descargar la tabla que están viendo, con el año y el filtro aplicados, en CSV. El CSV tiene las columnas que muestra la tabla, pero sin nombres ni puestos de personas y sin sueldos individuales: los nombres y los puestos se ven en pantalla (RN-49), pero no salen en el archivo descargado. En el caso del Decano, lo descargado incluye solo las carreras de su facultad. El nombre del archivo, el separador y la codificación quedan pendientes. Procesos: PR-05, PR-06.
- RN-47. Sin total institucional para el Decano. En la primera versión el Decano no ve total ni referencia institucional para comparar; los promedios institucionales para Decanato son mejora futura. Procesos: PR-06.
- RN-48. Lo último publicado durante un cálculo nuevo. Mientras se recalcula o hay un cálculo nuevo sin publicar, Rectorado y el Decano siguen viendo lo ya publicado (RN-03 y RN-38 de E3). Procesos: PR-05, PR-06.
- RN-49. Contenido de los tres tableros finales (ver EJ-18 a EJ-20), tal como los genera hoy el proceso del autor. Los tres se enlazan entre sí.
  - Superávit / Déficit: pestaña «Resultado por carrera» (por carrera: esperado, que es estudiantes por la línea base; costo real, que es clases más gestión docencia más cursos sin estudiantes más cola sin estudiantes; la diferencia, y de dónde sale cada rubro; con un gráfico de esperado contra real) y pestaña «Cuadre y metodología» (de dónde sale cada número, cuadre contra las fuentes y reglas aplicadas).
  - Costo de Clases: pestañas «Costo de materias» (por materia y paralelo, con sus profesores y sin sueldos individuales), «Costo por estudiante» y «Costo promedio por carrera».
  - Gestión docencia: pestañas «Resumen general», «Por carrera», «Detalle de cargas GD» y «Drill-down de carrera»; muestra de dónde viene cada dólar de gestión docencia, por componente, carrera, carga y persona.
  Estos tableros muestran en pantalla nombres y puestos de las personas (en Gestión docencia y en Costo de Clases), nunca sueldos individuales. El Decano los ve solo de las carreras de su facultad. Decisión del autor: se mantiene como hoy. Procesos: PR-05, PR-06.

### Datos, permisos y estados
Datos que se muestran: los tres tableros finales del año elegido, con el año publicado y la fecha de publicación (contenido en RN-49). Datos que se descargan: las columnas de la tabla vista, sin nombres ni puestos de personas ni sueldos individuales (RN-46). Datos que conoce el producto: los años publicados, el año calendario actual y la facultad asignada a cada Decano. Datos que elige el usuario: el año (ambos) y las facultades del filtro (solo Rectorado).
Permisos: Rectorado ve todas las carreras; el Decano, las de su facultad; ninguno ve resultados sin publicar, tableros de fase ni anomalías; ninguno modifica nada. Ocultar una opción no define el permiso: el alcance se define por la regla RN-41.
Estados: la consulta es de solo lectura y no tiene ciclo de estados propio. Lo que ve cada actor depende del estado de la publicación (E3): nada publicado (etiqueta), año en curso sin publicar con otros años publicados (año más reciente con aviso) o publicaciones vigentes (una por año). El año elegido y el filtro son respuestas temporales de la pantalla, no estados del producto.

### Criterios de aceptación (comportamiento esperado; no se afirma ejecución)
- CA-49 (PR-05; RN-41, RN-42). Dada una publicación, cuando Rectorado consulta, entonces ve los tres tableros finales de todas las carreras (EJ-18).
- CA-50 (PR-06; RN-41, RN-42). Dada una publicación, cuando el Decano consulta, entonces ve los tres tableros finales solo de las carreras de su facultad (EJ-20).
- CA-51 (PR-06; RN-41). Dado un Decano de la facultad A, entonces no ve carreras de la facultad B (EJ-20).
- CA-52 (PR-06; RN-41). Dados el Decano y el subdecano de una misma facultad, que entran con el mismo rol, entonces ven exactamente lo mismo (EJ-20).
- CA-53 (PR-06; RN-41). Dado un Decano sin facultad asignada, cuando consulta, entonces no ve ninguna carrera y ve el mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» (EJ-23).
- CA-54 (PR-05, PR-06; RN-42, RN-03). Dado un cálculo sin publicar, entonces Rectorado y el Decano no lo ven.
- CA-55 (PR-05, PR-06; RN-48). Dado un cálculo nuevo en curso, entonces siguen viendo lo ya publicado.
- CA-56 (PR-05, PR-06; RN-42). Dadas anomalías registradas, entonces no las ven; dada una publicación, entonces no ven los tableros de las fases (EJ-20).
- CA-57 (PR-05, PR-06; RN-43). Dados uno o más años publicados incluido el año calendario actual, cuando consultan, entonces ven por defecto el año calendario actual y pueden elegir entre los años publicados (EJ-18).
- CA-58 (PR-05, PR-06; RN-43). Dado que el año calendario actual no tiene nada publicado y otros años sí, cuando consultan, entonces ven por defecto el año publicado más reciente con el aviso «Se muestra el año [año publicado] porque el año [año actual] aún no tiene resultados publicados.» (EJ-21).
- CA-59 (PR-05, PR-06; RN-43). Dado que no hay nada publicado, cuando consultan, entonces ven la etiqueta «No existen datos procesados.» (EJ-22).
- CA-60 (PR-05, PR-06; RN-44). Dada una publicación, cuando ven un tablero, entonces el tablero muestra la fecha de publicación (EJ-18).
- CA-61 (PR-05; RN-45). Dados tableros finales publicados, cuando Rectorado elige una o varias facultades, entonces ve los tableros filtrados por esas facultades y los totales agrupados por facultad (estudiantes, costo real, esperado y diferencia); cuando no elige ninguna, ve todas las carreras (EJ-19).
- CA-62 (PR-05, PR-06; RN-46). Dados tableros finales publicados, cuando descargan, entonces obtienen un CSV con las columnas que muestra la tabla, con el año y el filtro aplicados, sin nombres ni puestos de personas y sin sueldos individuales (EJ-19).
- CA-63 (PR-06; RN-46). Dado un Decano, cuando descarga, entonces lo obtenido incluye solo las carreras de su facultad.
- CA-64 (PR-06; RN-47). Dado un Decano, entonces no ve total ni referencia institucional para comparar.
- CA-65 (PR-05, PR-06; RN-49). Dado cada uno de los tres tableros finales, entonces tiene las pestañas descritas en RN-49 y se enlaza con los otros dos.
- CA-66 (PR-05, PR-06; RN-49). Dados los tableros de Gestión docencia y de Costo de Clases, entonces muestran en pantalla nombres y puestos de las personas y nunca sueldos individuales.
- CA-67 (PR-05; RN-45). Dado Rectorado, cuando no elige ninguna facultad, entonces ve todas las carreras; y dado un Decano, entonces no tiene filtro ni agrupación por facultad.

### Ejemplos ilustrativos (escritos por el autor; son ejemplos de la regla, no datos reales)
- EJ-18 (RN-41, RN-43, RN-44; CA-49, CA-57, CA-60). La Facultad A tiene las Carreras 01, 02 y 03; la Facultad B tiene las Carreras 04 y 05. Están publicados los años 2025 y 2026 y el año actual es 2026. Rectorado entra y ve por defecto el 2026 con las cinco carreras y la fecha de publicación; puede elegir el 2025.
- EJ-19 (RN-45, RN-46; CA-61, CA-62). Rectorado elige la Facultad B en el filtro: ve solo las Carreras 04 y 05, con el año y el filtro aplicados. Descarga el CSV de esa tabla.
- EJ-20 (RN-41, RN-42; CA-50, CA-51, CA-52, CA-56). El Decano de la Facultad A entra: ve solo las Carreras 01, 02 y 03 del año por defecto. El subdecano de la Facultad A, con el mismo rol, ve exactamente lo mismo. Ninguno ve las Carreras 04 y 05, ni las anomalías, ni los tableros de fase.
- EJ-21 (RN-43; CA-58). El año actual es 2027, sin nada publicado, y el 2025 y el 2026 sí están publicados: se muestra por defecto el 2026 con el aviso de año por defecto.
- EJ-22 (RN-43; CA-59). No hay ningún año publicado: se muestra «No existen datos procesados.»
- EJ-23 (RN-41; CA-53). Un usuario con rol de Decano sin facultad asignada entra: no ve ninguna carrera y ve el mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.»
Los ejemplos de las reglas restantes se completan en la revisión.

## Decisions and open questions

Decisiones confirmadas por el autor, ya registradas (docs/proceso.md): D1 (Rectorado y Decano separados por regla de acceso), D11 (los tableros finales son tres; un Decano sin facultad asignada no ve ninguna carrera), D18 (año en curso por defecto y elección entre años publicados; filtro o agrupación por facultad para Rectorado; descarga o exportación; etiqueta si no hay nada publicado; fecha de publicación visible), D20 (D18 vale también para el Decano, salvo filtrar o agrupar por facultad), D38 a D43 (E3: una publicación vigente por año; varios años publicados a la vez).

Decisiones confirmadas por el autor en esta sesión (las respuestas a las preguntas abiertas de los casos 5 y 6):
- Año en curso es el año calendario actual; si no tiene nada publicado pero otros años sí, se muestra el año publicado más reciente con el aviso fijado; si no hay nada publicado, la etiqueta fijada (RN-43).
- Filtrar y agrupar por facultad (solo Rectorado): ambas, una o varias facultades, totales agrupados por facultad; sin elegir facultad, ve todas; los totales agrupados muestran estudiantes, costo real, esperado y diferencia (RN-45).
- Descarga: CSV con las columnas que muestra la tabla, año y filtro aplicados, sin nombres ni puestos de personas y sin sueldos individuales; los nombres y puestos se ven en pantalla pero no salen en el archivo (RN-46).
- Un Decano no puede tener varias facultades: cada rol de Decano ve una sola facultad; cada facultad tiene un Decano y un subdecano con el mismo rol (Decano) que ven lo mismo y el producto no los distingue (RN-41). Cierra la tensión con D20.
- El Decano no ve total ni referencia institucional en la primera versión (RN-47).
- Contenido de los tres tableros finales, tal como los genera hoy el proceso del autor; muestran en pantalla nombres y puestos de personas, nunca sueldos individuales; el Decano los ve solo de las carreras de su facultad; se mantiene como hoy (RN-49).
- Un Decano sin facultad asignada no ve ninguna carrera y ve el mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» (RN-41).
- Ejemplos EJ-18 a EJ-23.

Pendientes (no son reglas firmes; no se asumen). Los pendientes 1, 2, 3, 4, 6 y 8 quedaron cerrados; se conserva la numeración.
5. Detalles de la descarga CSV: nombre del archivo, separador y codificación.
7. Los ejemplos de las reglas restantes (distintas de las cubiertas por EJ-18 a EJ-23) y los mensajes comprensibles distintos de los ya fijados se completan en la revisión.
