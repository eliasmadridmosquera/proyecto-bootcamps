---
slug: "e2-revision-y-anomalias"
title: "E2 · Revisión de tableros por fase y registro de anomalías"
description: "Especificación funcional de la revisión de los tableros de las seis fases (marcas de revisión por fase) y del registro de anomalías de datos no corregibles, antes de publicar."
spec_kind: spec
status: approved
created_at: "2026-11-05T05:52:28.383Z"
last_updated: "2026-11-05T06:14:34.746Z"
source_use_cases:
  - revisar-tableros-fase-detectar-anomalias
  - registrar-anomalia-datos-no-corregible
---
## Upstream use cases and scope

Casos fuente (aprobados): revisar-tableros-fase-detectar-anomalias (caso 2, versión 2026-10-26T02:01:49.961Z) y registrar-anomalia-datos-no-corregible (caso 3, versión 2026-10-26T02:06:50.551Z). Depende de E1 (e1-carga-y-calculo-por-fases, aprobada), que produce el cálculo y los tableros que aquí se revisan.

Alcance de E2:
- PR-02 · Revisar los tableros de las seis fases y marcar cada fase como revisada. Actor: analista de la Gerencia de Planificación Estratégica, ya identificado con su rol. Inicio: existe un cálculo del año completado (E1).
- PR-03 · Registrar una anomalía de datos que no se puede corregir (con su edición, eliminación y consulta). Mismo actor. Inicio: durante la revisión, el analista encuentra una anomalía cuyo dato de origen tiene la irregularidad.
- Resultado: cada fase aparece como revisada y, con las seis marcadas, el cálculo queda listo para publicarse (la publicación es E3); o la revisión termina con una corrección (nuevo conjunto subido, E1) o con una anomalía registrada.
- Aclaración de alcance: los tableros que el analista revisa en PR-02 son los seis tableros de fase (uno por cada fase del cálculo). Son distintos de los tres tableros finales (Superávit / Déficit, Costo de Clases y Gestión docencia), que son el resultado que se publica y que consultan Rectorado y Decano. Los tableros finales no se revisan ni se marcan en E2: se tratan en E3 y E4.

Fuera de E2: la carga, el cálculo y sus controles (E1); la publicación (E3); la consulta de Rectorado y Decano (E4). Exclusiones: comparar con el cálculo anterior; conservar marcas de revisión o anomalías entre cálculos; que las autoridades vean anomalías registradas; gestión de usuarios y roles; revisar o marcar los tres tableros finales (Superávit / Déficit, Costo de Clases y Gestión docencia), que se tratan en E3 y E4.

Etiquetas: RN = regla del negocio, PR = proceso, CA = criterio de aceptación, EJ = ejemplo. No reemplazan los identificadores de AHK. En E2 se definen RN-04 (ya referenciada por E1) y RN-23 a RN-32. RN-01, RN-02, RN-05 y RN-07 se definen en E1 y aquí solo se referencian. RN-24, RN-31 y RN-32 las referencian E3 y E4.

## Rules, exclusions, and acceptance criteria

### Procesos

PR-02 · Revisar tableros y marcar fases.
1. El analista abre el tablero de una fase.
2. Revisa los resultados, los controles (ok, aviso, falla) y las excepciones y alertas para detectar anomalías de datos.
3. Si no encuentra anomalías, o ya las trató, marca la fase como revisada.
4. Repite para cada una de las seis fases. Puede quitar la marca de una fase antes de publicar.
5. Con las seis fases marcadas, el cálculo queda listo para publicarse (E3).
Alternativas: si la anomalía se puede corregir, corrige el archivo y vuelve a subir el conjunto completo (RN-01, RN-02 de E1): se recalcula todo y se borran todas las marcas (RN-25). Si no se puede corregir, la registra (PR-03). Cancelación: el analista puede salir sin marcar; no cambia ninguna marca. Fallo: si el cálculo se detuvo por una falla de control, ve los tableros de las fases ya calculadas, pero no puede marcar fases ni registrar anomalías (RN-26). Una vez publicado el cálculo, las marcas quedan solo de lectura (RN-32).

PR-03 · Registrar una anomalía no corregible.
1. El analista identifica una anomalía que no se puede corregir porque el dato de origen tiene la irregularidad.
2. La registra indicando la fase, una descripción y la referencia al archivo o dato donde está la irregularidad (los tres son obligatorios); el producto pone la fecha de registro.
3. El registro queda guardado y visible para el analista, en la lista del cálculo en curso.
Variantes: si registra la misma anomalía dos veces (misma fase y misma referencia), el producto avisa y no crea el duplicado (RN-30). Si falta un dato obligatorio, el producto no guarda el registro y pide completarlo. El analista puede editar y eliminar un registro hasta que el cálculo se publique (RN-30, RN-32); si al editar un registro este pasa a coincidir con otro (misma fase y misma referencia), se trata como duplicado: el producto avisa y no guarda el cambio (RN-30). Si la anomalía sí se puede corregir, no se registra (RN-29).

### Reglas

- RN-04. Anomalías del cálculo en curso. Los registros de anomalías pertenecen al cálculo en curso. Al recalcular no se conservan; el analista vuelve a registrar las que sigan presentes. Procesos: PR-03. Referenciada por E1.
- RN-23. Revisión por fase. La revisión se marca por fase: el analista marca cada una de las seis fases como revisada y puede quitar la marca de una fase antes de publicar. Quitar la marca de una fase solo cambia esa fase: los registros de anomalía y las demás marcas no cambian. Procesos: PR-02.
- RN-24. Condición para publicar. Solo se puede publicar cuando las seis fases están marcadas como revisadas. Con alguna fase sin marcar, no puede publicarse. Procesos: PR-02. Referenciada por E3.
- RN-25. Recalcular borra las marcas. Al recalcular, todas las marcas de revisión se borran y las seis fases quedan sin revisar; el analista revisa de nuevo las seis. Procesos: PR-02. Referencia a RN-02 (E1).
- RN-26. Cálculo detenido por una falla de control. El analista puede ver los tableros de las fases ya calculadas, pero no puede marcar fases como revisadas ni registrar anomalías, porque no hay cálculo completo. Procesos: PR-02, PR-03. Referencia a RN-05 y RN-07 (E1).
- RN-27. Sin obligación de abrir el tablero. El producto no exige haber abierto un tablero antes de marcar la fase como revisada; en esta primera versión la responsabilidad es del analista. Procesos: PR-02.
- RN-28. Contenido del tablero de cada fase. Regla común: cada tablero de fase tiene una pestaña «Resumen» al inicio con los resultados principales, una pestaña «Controles» al final con el resultado de cada control (ok, aviso, falla) y pestañas intermedias con el detalle de la fase y de sus excepciones y alertas (por ejemplo, personas con cargas y sin sueldo, cursos sin planificación, estudiantes en más de una carrera). Los avisos aparecen con sus casos. Pestañas de cada tablero, tal como las genera hoy el proceso del autor:
  - Fase 1, contratos: Resumen, Poblaciones, Pérdida de personas, Anomalías, Fondo de reserva, Cargas, Controles.
  - Fase 2, cargas: Resumen, Cuadre de horas, Cargas sin sueldo, Sueldos sin cargas, Clases de grado, Sobrecarga, Controles.
  - Fase 3, costo de cada carga: Resumen, Detalle por término y persona, Cuadre del sueldo, Sueldo sin carga, Carga sin contrato o sin sueldo, Clases sin registros, Controles.
  - Fase 4, costo por categoría: Resumen, Costo por componente, Categorías, Reparto por defecto, Carreras, Contratos, Controles.
  - Fase 5, gestión docencia: Resumen, Costo por estudiante, Composición, Estudiantes, Cobertura de componentes, Controles.
  - Fase 6, clases y superávit o déficit: Resumen, Superávit y déficit, Cola del PAOII, Costo por estudiante, Alertas de cursos, Cursos sin estudiantes, Gestión de clases, Controles.
  Los tableros de las fases 1 a 4 contienen nombres de personas; los de las fases 5 y 6 solo códigos. En el producto solo el analista ve los tableros de fase. Estos seis tableros son distintos de los tres tableros finales, que no se tratan en E2. Procesos: PR-02.
- RN-29. Anomalía de datos corregible frente a no corregible. Una anomalía de datos no impide calcular ni revisar (una falla de control sí detiene el cálculo, RN-05 de E1). Si se puede corregir en los archivos, se corrige y se vuelve a subir el conjunto completo; no se registra. Solo si el dato de origen tiene la irregularidad y no se puede corregir, se registra. Procesos: PR-02, PR-03.
- RN-30. Registro de anomalía (ver EJ-11 a EJ-13). Cada registro tiene la fase, una descripción, la referencia al archivo o dato donde está la irregularidad y la fecha en que se registró; se asocia a una fase concreta. La fase, la descripción y la referencia son obligatorias; la fecha la pone el producto, no el analista. Registrar anomalías no es obligatorio antes de marcar una fase como revisada ni antes de publicar. El analista puede registrar una anomalía en cualquier momento de la revisión, sin esperar a terminar las seis fases. Puede editar y eliminar un registro mientras el cálculo no esté publicado (RN-32). Duplicado: dos registros son iguales si tienen la misma fase y la misma referencia, entendida como texto idéntico sin distinguir mayúsculas de minúsculas; en ese caso el producto avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no crea el duplicado. La misma regla se aplica al editar: si al editar un registro este pasa a coincidir (misma fase y misma referencia) con otro, el producto avisa con el mismo mensaje y no guarda el cambio. Procesos: PR-03.
- RN-31. Visibilidad de las anomalías. Los registros de anomalías los ve solo el analista; Rectorado y Decano no los ven. El analista ve la lista en una pantalla del cálculo en curso, con un filtro por fase. Procesos: PR-03. Referenciada por E4.
- RN-32. Cálculo publicado: solo lectura. Una vez publicado el cálculo, las marcas de revisión y los registros de anomalía quedan solo de lectura. Para cambiar algo hay que recalcular, y se vuelve a empezar (RN-02 de E1, RN-04, RN-25). Procesos: PR-02, PR-03. Efecto en E3: la publicación deja el cálculo publicado en solo lectura; E3 debe reflejarlo.

### Datos, permisos y estados

Datos del registro de anomalía (RN-30): fase (de las seis; obligatoria, la elige el analista), descripción (obligatoria, la escribe el analista), referencia al archivo o dato (obligatoria, la escribe el analista), fecha de registro (la pone el producto). Datos de la revisión: estado de revisión de cada fase (sin revisar o revisada), conocido por el producto.

Permisos: solo el analista revisa, marca, quita marcas, registra, edita, elimina y consulta anomalías, y solo el analista ve los tableros de fase; Rectorado y Decano no ven las anomalías (RN-31) ni los tableros de fase (RN-28). Con el cálculo detenido por una falla, el analista no puede marcar ni registrar (RN-26). Con el cálculo publicado, nadie puede cambiar marcas ni registros (RN-32).

Estados de una fase en la revisión:
- Inicial: sin revisar (al completarse el cálculo o al recalcular).
- sin revisar → revisada: el analista marca la fase; condición: el cálculo está completo y no está publicado (RN-26, RN-32).
- revisada → sin revisar: el analista quita la marca, antes de publicar (RN-23). Solo cambia esa fase.
- Cualquier estado → sin revisar: al recalcular, todas las fases (RN-25).
- Tras publicar, el estado de cada fase queda solo de lectura (RN-32).
Cálculo listo para publicarse: las seis fases están revisadas (RN-24); si se quita una marca, deja de estarlo.
Los registros de anomalía no tienen ciclo de estados propio: se registran, se editan o se eliminan hasta que el cálculo se publique, y desaparecen al recalcular (RN-04).

### Criterios de aceptación (comportamiento esperado; no se afirma ejecución)
- CA-13 (PR-02; RN-23). Dado un cálculo completado, cuando el analista abre el tablero de una fase, entonces puede revisarlo y marcar esa fase como revisada.
- CA-14 (PR-02; RN-24). Dado un cálculo con las seis fases marcadas como revisadas, entonces el cálculo puede publicarse (EJ-10).
- CA-15 (PR-02; RN-24). Dado un cálculo con alguna fase sin marcar, entonces no puede publicarse (EJ-10).
- CA-16 (PR-02; RN-23). Dada una fase marcada como revisada y un cálculo aún sin publicar, cuando el analista quita la marca, entonces la fase queda sin revisar, las demás marcas y los registros de anomalía no cambian y el cálculo deja de estar listo para publicarse (EJ-10).
- CA-17 (PR-02; RN-25). Dado un cálculo que se recalcula, entonces todas las marcas anteriores se borran y las seis fases quedan sin revisar (EJ-10).
- CA-18 (PR-02, PR-03; RN-26). Dado un cálculo detenido por una falla de control, entonces el analista puede ver los tableros de las fases ya calculadas y no puede marcar ninguna fase como revisada ni registrar anomalías.
- CA-19 (PR-02; RN-27). Dado un tablero que el analista no abrió, cuando marca la fase como revisada, entonces el producto lo permite.
- CA-20 (PR-02; RN-28). Dado el tablero de una fase, entonces muestra los resultados de los controles (ok, aviso, falla), los avisos con sus casos y los resultados principales de la fase.
- CA-21 (PR-02; RN-29). Dada una anomalía de datos procesable, entonces el cálculo ya se completó y la revisión puede realizarse (no se bloquea).
- CA-22 (PR-02; RN-29, RN-01 y RN-02 de E1). Dada una anomalía corregible, cuando el analista sube de nuevo el conjunto completo, entonces se recalcula todo, se borran las marcas y debe revisar de nuevo.
- CA-23 (PR-03; RN-30). Dada una anomalía no corregible, cuando el analista la registra con fase, descripción y referencia, entonces el registro queda guardado con la fecha puesta por el producto y visible para el analista, asociado a esa fase (EJ-11).
- CA-24 (PR-03; RN-30). Dada una anomalía registrada y un cálculo sin publicar, cuando el analista la edita o la elimina, entonces el cambio se aplica a la lista.
- CA-25 (PR-03; RN-30). Dado un registro con la misma fase y la misma referencia (texto idéntico sin distinguir mayúsculas) que uno existente, cuando el analista intenta registrarlo, entonces el producto avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no crea el duplicado (EJ-12).
- CA-26 (PR-03; RN-30). Dado un cálculo con fases sin revisar y sin ninguna anomalía registrada, entonces el analista puede registrar anomalías en cualquier momento y puede marcar fases y publicar sin haber registrado ninguna (no es obligatorio).
- CA-27 (PR-03; RN-31). Dado un registro de anomalía, entonces Rectorado y Decano no lo ven, y el analista lo ve en la lista del cálculo en curso, filtrable por fase.
- CA-28 (PR-03; RN-04). Dado un cálculo que se recalcula, entonces los registros del cálculo anterior no se conservan y el analista debe volver a registrar los que sigan presentes.
- CA-29 (PR-03; RN-29). Dada una anomalía corregible, entonces no se registra: se corrige y se vuelve a subir el conjunto.
- CA-30 (PR-03; RN-30). Dado un intento de registrar una anomalía sin fase, sin descripción o sin referencia, entonces el producto no la guarda y pide completar el dato que falta (EJ-13).
- CA-31 (PR-02, PR-03; RN-32). Dado un cálculo publicado, entonces las marcas de revisión y los registros de anomalía solo se pueden leer; para cambiar algo hay que recalcular, y se vuelve a empezar con las seis fases sin revisar.
- CA-32 (PR-03; RN-30). Dado un registro de anomalía existente y otro registro distinto, cuando el analista edita uno de ellos hasta que coincida con el otro (misma fase y misma referencia, texto idéntico sin distinguir mayúsculas), entonces el producto avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no guarda el cambio.
- CA-33 (PR-02; RN-28). Dado el tablero de cualquiera de las seis fases, entonces tiene una pestaña «Resumen» al inicio, una pestaña «Controles» al final y pestañas intermedias de detalle, excepciones y alertas; y solo el analista ve los tableros de fase.

### Ejemplos ilustrativos (escritos por el autor; son ejemplos de la regla, no datos reales)
- EJ-10 (RN-23, RN-24, RN-25; CA-14 a CA-17). El cálculo del año tiene las seis fases sin revisar. El analista marca las fases 1, 2, 3, 4 y 5. Con la fase 6 sin marcar, el cálculo no puede publicarse. Marca la fase 6 y ahora puede publicarse. Quita la marca de la fase 3: la fase 3 queda sin revisar y el cálculo deja de estar listo para publicarse; las fases 1, 2, 4, 5 y 6 siguen marcadas. Si después sube un conjunto nuevo y recalcula, las seis fases quedan sin revisar.
- EJ-11 (RN-30, válido; CA-23). En la fase 2, el analista encuentra que una persona de ejemplo aparece con horas sin término en el archivo de cargas del año y que el dato de origen tiene esa irregularidad. La registra con la fase 2, la descripción «Horas sin término en el archivo de cargas» y la referencia «Cargas CTP del año, fila de la persona A». El registro queda guardado con la fecha del día y lo ve solo el analista.
- EJ-12 (RN-30, inválido; CA-25). El analista intenta registrar de nuevo lo mismo: misma fase 2 y misma referencia «Cargas CTP del año, fila de la persona A». El producto avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no crea el duplicado.
- EJ-13 (RN-30, incompleto; CA-30). El analista intenta registrar una anomalía sin descripción. El producto no la guarda y pide completar la descripción.
Los ejemplos de las demás reglas y los mensajes comprensibles que no cubre lo anterior se completan en la revisión.

## Decisions and open questions

Decisiones confirmadas por el autor, ya registradas en los casos aprobados (docs/proceso.md): D8 (la revisión se marca por fase y solo se publica con las seis marcadas), D9 (al recalcular se borran todas las marcas), D1 y D5 (las anomalías las ve solo el analista y pertenecen al cálculo en curso).

Decisiones confirmadas por el autor en esta sesión:
- Las 11 respuestas sobre las preguntas abiertas de los casos 2 y 3: (1) contenido del tablero (RN-28); (2) quitar la marca antes de publicar (RN-23); (3) con el cálculo detenido, ver tableros pero no marcar (RN-26); (4) no se exige abrir el tablero (RN-27); (5) datos del registro: fase, descripción, referencia y fecha (RN-30); (6) cada registro se asocia a una fase; (7) registrar anomalías no es obligatorio; (8) se puede registrar en cualquier momento de la revisión; (9) se puede editar y eliminar; (10) la lista está en una pantalla del cálculo en curso con filtro por fase; (11) el duplicado se avisa y no se crea.
- La fecha del registro la pone el producto; fase, descripción y referencia son obligatorias (RN-30).
- «Misma referencia» es texto idéntico sin distinguir mayúsculas de minúsculas; texto del aviso de duplicado fijado (RN-30).
- Una vez publicado el cálculo, las marcas de revisión y los registros de anomalía son solo de lectura; para cambiar algo hay que recalcular (RN-32). Esto afecta a E3.
- Con el cálculo detenido por una falla de control, el analista no puede registrar anomalías (RN-26).
- Quitar la marca de una sola fase solo cambia esa fase (RN-23).
- Pestañas de cada tablero de fase y regla común de «Resumen» al inicio y «Controles» al final; los tableros de las fases 1 a 4 contienen nombres de personas y los de las fases 5 y 6 solo códigos; solo el analista los ve (RN-28).
- Aclaración de alcance: los seis tableros de fase que se revisan son distintos de los tres tableros finales, que no se revisan ni se marcan en E2 (E3 y E4).
- Editar un registro hasta que coincida con otro se trata como duplicado, con el mismo aviso, y no se guarda el cambio (RN-30, CA-32).
- Ejemplos EJ-10 a EJ-13.

Pendientes (no son reglas firmes; no se asumen). Los pendientes 1 y 3 quedaron cerrados en esta revisión (1: RN-28; 3: RN-30 y CA-32); se conserva la numeración.
2. Mensajes comprensibles para el analista distintos del aviso de duplicado (por ejemplo, el texto exacto que pide completar un dato obligatorio) y ejemplos de las reglas de E2 no cubiertos por EJ-10 a EJ-13.
4. E3 debe reflejar RN-32 al definir la publicación (E3 aún no está creada).
