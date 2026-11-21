---
slug: "e3-publicacion-de-resultados"
title: "E3 · Publicación de los resultados del año"
description: "Especificación funcional de la publicación de los tres tableros finales para que Rectorado y Decano los vean: condición previa, confirmación, publicación vigente única, efectos y reglas de visibilidad."
spec_kind: spec
status: approved
created_at: "2026-11-05T06:20:03.874Z"
last_updated: "2026-11-05T06:29:32.577Z"
source_use_cases:
  - publicar-resultados-del-anio
---
## Upstream use cases and scope

Caso fuente (aprobado, versión 2026-10-26T02:15:33.302Z): publicar-resultados-del-anio (caso 4). Depende de E1 (cálculo, aprobada) y de E2 (revisión por fase, aprobada).

Interpretación del caso 4 (el caso no se reabre): el caso dice «una publicación nueva sustituye a la última publicada»; en esta especificación se lee como «sustituye a la última publicación del mismo año». Sigue sin haber historial de publicaciones. Esta interpretación queda pendiente de declarar en la sección de cambios de la entrega (pendiente 6).

Alcance de E3:
- PR-04 · Publicar los resultados del año. Actor: analista de la Gerencia de Planificación Estratégica, ya identificado con su rol; solo el analista publica. Inicio: el analista terminó la revisión (las seis fases marcadas como revisadas) y decide publicar.
- Resultado: Rectorado y Decano pasan a ver los tres tableros finales del año publicado, cada uno con su alcance (E4).
- Los tres tableros finales son: Superávit / Déficit, Costo de Clases y Gestión docencia. La publicación incluye solo esos tres; los tableros de las fases no se publican y los ve solo el analista.

Fuera de E3: la carga y el cálculo (E1); la revisión de tableros de fase y las anomalías (E2); la consulta de Rectorado y Decano, incluido qué significa «año en curso» y qué se muestra por defecto (E4). Exclusiones: historial de publicaciones; comparar con el cálculo anterior; retirar o despublicar una publicación; avisos a Rectorado y Decano; gestión de usuarios y roles.

Hoy el autor genera los tres tableros finales a partir de las salidas de las fases y los comparte él mismo; no existe un paso formal de «publicar». Publicar como acción del producto es una función nueva.

Etiquetas: RN = regla del negocio, PR = proceso, CA = criterio de aceptación, EJ = ejemplo. No reemplazan los identificadores de AHK. En E3 se definen RN-03 (ya referenciada por E1) y RN-33 a RN-40. RN-24 y RN-32 se definen en E2; RN-01, RN-02 y RN-05 en E1; aquí solo se referencian.

## Rules, exclusions, and acceptance criteria

### Proceso PR-04 · Publicar los resultados del año
Condiciones previas: hay un cálculo del año completado y las seis fases están marcadas como revisadas (RN-24); el analista está identificado con rol de analista.
1. El analista decide publicar los resultados del año.
2. El producto pide confirmar: «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» (RN-33).
3. Al confirmar, el producto pone a disposición de Rectorado y Decano los tres tableros finales, con el año publicado y la fecha en que se publicó (RN-36, RN-39). La publicación nueva pasa a ser la vigente de ese año y sustituye a la publicación anterior de ese mismo año; los demás años publicados no cambian (RN-37).
4. El cálculo publicado queda en solo lectura (RN-32 de E2).
5. Rectorado y Decano no reciben aviso: ven la publicación al entrar (RN-35).
Alternativas: si se detecta una anomalía después de publicar, se vuelve a calcular y se publica de nuevo; mientras tanto Rectorado y Decano siguen viendo lo ya publicado (RN-03, RN-38).
Fallos: si alguna fase no está marcada como revisada, no se puede publicar (RN-24). Si el cálculo se detuvo por una falla de control, no hay cálculo completo que publicar (RN-26 de E2). Si un cálculo nuevo falla en una fase, lo publicado no cambia (RN-38).
Cancelación: si el analista no confirma, no se publica y nada cambia (consecuencia del paso de confirmación; no se dijo con otras palabras; EJ-16).
Distinción: éxito (la publicación vigente del año queda actualizada), cancelación (no se publica; nada cambia), imposibilidad de publicar (fases sin revisar o cálculo detenido; nada cambia).

### Reglas
- RN-03. Visibilidad hasta publicar. Rectorado y Decano no ven los resultados de un cálculo hasta que el analista lo publica. Un cálculo nuevo, mientras no se publique, no cambia lo que ven: siguen viendo lo ya publicado (la publicación vigente de cada año). Procesos: PR-04. Referenciada por E1 y E4.
- RN-33. Confirmación previa. Antes de publicar, el producto pide confirmar con el mensaje «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» Procesos: PR-04.
- RN-34. Sin retirar ni despublicar. En esta primera versión no se puede retirar ni despublicar una publicación; solo se sustituye publicando de nuevo ese año. Procesos: PR-04.
- RN-35. Sin aviso. En esta primera versión no se avisa a Rectorado y Decano cuando hay una publicación nueva; la ven al entrar. Procesos: PR-04.
- RN-36. Año y fecha de la publicación. La publicación muestra el año publicado y la fecha en que se publicó. Procesos: PR-04. Referenciada por E4.
- RN-37. Una publicación vigente por año. Hay una publicación vigente por año y puede haber varios años publicados a la vez. Publicar de nuevo un año sustituye la publicación anterior de ese mismo año; los demás años publicados no cambian. Publicar un año distinto del vigente no sustituye a los demás años. No hay historial de publicaciones. Rectorado y Decano pueden elegir entre los años publicados (D18 y D20, E4); qué año se muestra por defecto se define en E4. Procesos: PR-04.
- RN-38. Un cálculo nuevo que falla no cambia lo publicado. Si un cálculo nuevo falla en una fase, lo publicado no cambia: Rectorado y Decano siguen viendo lo ya publicado. Procesos: PR-04. Referencia a RN-05 y RN-07 (E1).
- RN-39. Contenido de la publicación. La publicación incluye solo los tres tableros finales (Superávit / Déficit, Costo de Clases y Gestión docencia); los tableros de las fases no se publican y los ve solo el analista. Procesos: PR-04. Referenciada por E4.
- RN-40. Quién publica y cuándo. Solo el analista publica, y solo cuando las seis fases están marcadas como revisadas (RN-24 de E2). Procesos: PR-04.
- Reflejo de RN-32 (E2): al publicar, el cálculo publicado queda en solo lectura: las marcas de revisión y los registros de anomalía solo se pueden leer, y para cambiar algo hay que recalcular y se vuelve a empezar. Recalcular no cambia la publicación vigente del año hasta que se publique de nuevo (RN-03, RN-38).

### Datos, permisos y estados
Datos de la publicación: año publicado (el del cálculo publicado), fecha en que se publicó (la conoce el producto; formato y hora pendientes) y los tres tableros finales. Quién la introduce: nadie; el analista solo confirma. Puede haber una publicación vigente por cada año publicado.
Permisos: solo el analista publica; Rectorado y Decano ven lo publicado, sin los tableros de fase (RN-39) y sin las anomalías (RN-31 de E2).
Estados del cálculo de un año respecto de la publicación:
- sin publicar → publicado: lo inicia el analista; condiciones: seis fases revisadas y confirmación (RN-24, RN-33); efecto: pasa a ser la publicación vigente de ese año, sustituye a la publicación anterior de ese mismo año, no cambia los demás años y el cálculo queda en solo lectura (RN-37, RN-32).
- publicado → (no hay retirada): solo se sustituye publicando de nuevo ese año (RN-34).
- Un cálculo nuevo reemplaza al cálculo del año (RN-02 de E1) y empieza sin publicar y con las seis fases sin revisar (RN-25 de E2); la publicación vigente del año no cambia hasta que se publique de nuevo.
Estado de lo que ven Rectorado y Decano: nada publicado, o una o varias publicaciones vigentes (una por año); qué se muestra por defecto se define en E4.

### Criterios de aceptación (comportamiento esperado; no se afirma ejecución)
- CA-34 (PR-04; RN-24, RN-40). Dado un cálculo con las seis fases revisadas, cuando el analista publica y confirma, entonces Rectorado y Decano pasan a ver los tres tableros finales de ese año (EJ-14).
- CA-35 (PR-04; RN-24). Dado un cálculo con alguna fase sin revisar, entonces no se puede publicar (EJ-15).
- CA-36 (PR-04; RN-03). Dado un cálculo sin publicar, entonces Rectorado y Decano no ven sus resultados.
- CA-37 (PR-04; RN-33). Dado que el analista decide publicar, entonces el producto pide confirmar con el mensaje «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» y no publica hasta que confirma (EJ-14).
- CA-38 (PR-04; RN-33). Dado el mensaje de confirmación, cuando el analista no confirma, entonces no se publica y nada cambia (EJ-16).
- CA-39 (PR-04; RN-37). Dada una publicación nueva de un año que ya tiene publicación vigente, entonces sustituye a la publicación anterior de ese mismo año, es la única vigente de ese año y no hay historial (EJ-16).
- CA-40 (PR-04; RN-03). Dado un cálculo nuevo sin publicar, entonces Rectorado y Decano siguen viendo lo ya publicado.
- CA-41 (PR-04; RN-38). Dado un cálculo nuevo que falla en una fase, entonces lo publicado no cambia y Rectorado y Decano siguen viendo lo ya publicado (EJ-17).
- CA-42 (PR-04; RN-39). Dada una publicación, entonces Rectorado y Decano ven los tres tableros finales (Superávit / Déficit, Costo de Clases y Gestión docencia) y no los tableros de las fases (EJ-14).
- CA-43 (PR-04; RN-34). Dada una publicación vigente, entonces el producto no ofrece retirarla ni despublicarla; solo puede sustituirse publicando de nuevo ese año.
- CA-44 (PR-04; RN-35). Dada una publicación nueva, entonces Rectorado y Decano no reciben aviso y la ven al entrar.
- CA-45 (PR-04; RN-36). Dada una publicación, entonces muestra el año publicado y la fecha en que se publicó (EJ-14).
- CA-46 (PR-04; RN-32 de E2). Dado un cálculo publicado, entonces las marcas de revisión y los registros de anomalía solo se pueden leer; para cambiar algo hay que recalcular y se vuelve a empezar.
- CA-47 (PR-04; RN-40). Dado un usuario que no es el analista, entonces no puede publicar.
- CA-48 (PR-04; RN-37). Dados dos años ya publicados, cuando el analista publica de nuevo uno de ellos, entonces solo se sustituye la publicación de ese año y la publicación del otro año no cambia; ambos años siguen publicados (EJ-16).

### Ejemplos ilustrativos (escritos por el autor; son ejemplos de la regla, no datos reales)
- EJ-14 (RN-24, RN-33, RN-36, RN-39; CA-34, CA-37, CA-42, CA-45; válido). El cálculo del año 2026 tiene las seis fases marcadas como revisadas. El analista pulsa publicar. El producto muestra el mensaje de confirmación y el analista confirma. Rectorado y Decano pasan a ver los tres tableros finales del 2026 (Superávit / Déficit, Costo de Clases y Gestión docencia), con la fecha de publicación.
- EJ-15 (RN-24; CA-35; inválido). El cálculo del 2026 tiene cinco fases revisadas y la fase 4 sin revisar. El analista intenta publicar. El producto no publica e indica que falta revisar la fase 4. Rectorado y Decano no ven nada nuevo.
- EJ-16 (RN-33, RN-37; CA-38, CA-39, CA-48; varios años). El año 2025 ya está publicado y se publica el 2026: ahora Rectorado y Decano pueden elegir entre 2025 y 2026. Después el analista recalcula el 2026 y lo publica de nuevo: solo se sustituye la publicación del 2026; el 2025 sigue como estaba. Si el analista no confirma el mensaje, no se publica nada y nada cambia.
- EJ-17 (RN-38; CA-41; cálculo nuevo que falla). El 2026 ya está publicado. El analista sube un conjunto corregido y el cálculo se detiene en la fase 3 por una falla de control. Rectorado y Decano siguen viendo el 2026 que estaba publicado.
Los ejemplos de las reglas restantes se completan en la revisión.

## Decisions and open questions

Decisiones confirmadas por el autor, ya registradas en los casos aprobados (docs/proceso.md): D2, D3, D5, D8, D9, D11 (los tres tableros finales; la publicación incluye solo esos tres), D18 y D20 (Rectorado y Decano ven por defecto el año en curso y pueden elegir entre los años publicados), y la regla de que Rectorado y Decano no ven nada hasta que se publica.

Decisiones confirmadas por el autor en esta sesión (las respuestas a las preguntas abiertas del caso 4): (1) paso de confirmación antes de publicar, con el mensaje «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» (RN-33); (2) no se puede retirar ni despublicar (RN-34); (3) no se avisa a Rectorado y Decano (RN-35); (4) la publicación muestra el año publicado y la fecha (RN-36); (5) corregida: hay una publicación vigente por año; puede haber varios años publicados a la vez; publicar de nuevo un año sustituye la publicación anterior de ese mismo año y los demás años no cambian (RN-37); (6) si un cálculo nuevo falla en una fase, lo publicado no cambia (RN-38). Cierre del antiguo pendiente 2: publicar un año distinto del vigente no sustituye los demás años. Interpretación del caso 4 («sustituye a la última publicación del mismo año»), sin reabrir el caso. El autor pidió además reflejar RN-24, RN-32 y RN-03 (definida aquí). Ejemplos EJ-14 a EJ-17.

Pendientes (no son reglas firmes; no se asumen). Los pendientes 1 (contradicción con D18 y D20) y 2 (publicar un año distinto) quedaron cerrados; se conserva la numeración.
3. Formato de la fecha de publicación y a quién se le muestra (si a Rectorado y Decano, al analista o a ambos).
4. Qué ocurre si la publicación no puede completarse por una causa distinta de fases sin revisar o cálculo detenido: no se ha decidido.
5. Los ejemplos de las reglas restantes (distintas de las cubiertas por EJ-14 a EJ-17) y los mensajes comprensibles distintos del de confirmación (por ejemplo, el texto exacto con que el producto indica que falta revisar una fase, como en EJ-15) se completan en la revisión.
6. Declarar en la sección de cambios de la entrega (sección 20) la interpretación del caso 4: «sustituye a la última publicación del mismo año».
7. Qué significa «año en curso» (año calendario actual o último año publicado) y qué se muestra por defecto si el año en curso no tiene nada publicado pero otros años sí: sigue abierto y se resuelve en E4; no se cierra aquí.
