# Fase 1 · Definición funcional — Panel Académico

> Síntesis de la Fase 1, versión 1.0. Leída y aprobada por el autor.

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | Panel Académico (nombre **provisional**, declarado expresamente por el autor) |
| Entrega | Fase 1 · Definición funcional |
| Autor | Elías Emilio Madrid Mosquera (trabajo individual) |
| Cohorte | 6 |
| Fecha | 2026-10-25 (fecha de hoy indicada por el autor; las marcas de versión de AHK están en UTC y figuran como 2026-10-26) |
| Versión del documento | 1.0 |
| Proyecto en el repositorio | proyecto-bootcamp |

## 2. Problema y contexto

**Situación que se busca mejorar.** Cada año se calcula cuánto cuesta la docencia de la universidad por carrera y por facultad: el costo de las clases, la gestión docente asociada y si ese costo queda por encima o por debajo de lo esperado según el número de estudiantes (superávit o déficit).

**Quién la vive.** El autor, que hoy hace los cálculos, y quienes necesitan los resultados: el Rectorado y los Decanos. El producto pertenecería a la Gerencia de Planificación Estratégica.

**Cómo se resuelve hoy.** El autor ejecuta a mano una serie de cuadernos de Python, por fases, desde los contratos del personal hasta el costo por carrera. Cada fase genera su propio tablero en HTML para revisar si hay anomalías, y los resultados se comparten como archivos que se abren con doble clic. No existe un sistema ni un sitio web.

**Dificultades que persisten.** (1) Se cometen errores en los pasos manuales. (2) Los resultados llegan con demora. (3) Quienes los necesitan no pueden consultarlos por su cuenta. (4) Todo depende del autor.

**Observaciones y supuestos.** Todo lo anterior es la descripción que hace el autor de su propio trabajo. No se han hecho entrevistas ni se aporta ninguna estadística o estudio: las cuatro dificultades no están medidas y se tratan como observación personal del autor, no como evidencia verificada. Además, hoy las inconsistencias de los datos que no se pueden corregir no quedan registradas en ningún sitio.

## 3. Usuarios y objetivos

| Actor | Quién es | Resultado que busca |
|---|---|---|
| Analista | Persona de la Gerencia de Planificación Estratégica que prepara el cálculo del año | Subir los archivos del año, obtener el cálculo por fases, revisar los tableros de cada fase para detectar anomalías, registrar las que no se pueden corregir y publicar los resultados |
| Rectorado | Rol de consulta | Consultar por su cuenta los tableros finales de todas las carreras |
| Decano | Rol de consulta con una facultad asignada | Consultar por su cuenta los mismos tableros finales, solo de las carreras de su facultad |

No hay sistemas externos que participen en los recorridos de la primera versión. No se añaden administradores, autenticación ni integraciones: se **supone** que los tres actores ya están identificados con su usuario institucional y su rol, y que el Decano ya tiene su facultad asignada. Cómo se logra eso es una decisión posterior (ver sección 8).

## 4. Descripción general de la solución

El producto permite que el analista suba los archivos del año, y el sistema calcula las seis fases del costo de la docencia, desde los contratos del personal hasta el costo de clases y el superávit o déficit por carrera. En cada fase se aplican controles (cuadres entre totales) y se genera un tablero que el analista revisa. Cuando el analista publica, el Rectorado y los Decanos consultan por su cuenta los tableros finales, sin depender del autor. Con ello se busca reducir los pasos manuales, acortar la demora y eliminar la dependencia de una sola persona.

**Recorrido breve de principio a fin.** El analista indica el año y sube a la vez los seis archivos. El sistema comprueba que estén los archivos y datos obligatorios y ejecuta las seis fases seguidas. El analista abre el tablero de cada fase y la marca como revisada; si encuentra una anomalía que no puede corregir, la deja registrada. Con las seis fases revisadas, publica. El Rectorado ve los tres tableros finales de todas las carreras, y cada Decano los de las carreras de su facultad. Si algo falla (un archivo obligatorio ausente, un control en falla o una anomalía corregible), el analista corrige y vuelve a subir el conjunto completo, y se recalcula todo; mientras tanto, Rectorado y Decano siguen viendo lo último publicado.

Esta descripción solo cubre comportamiento. No decide componentes, librerías ni almacenamiento.

## 5. Alcance inicial y exclusiones

**Capacidades comprometidas para la primera versión** (los seis casos de uso aprobados, sección 7):
- Cargar el conjunto de archivos del año y obtener el cálculo por seis fases con sus controles.
- Revisar el tablero de cada fase y marcarla como revisada.
- Registrar una anomalía de datos que no se puede corregir.
- Publicar los resultados del año.
- Consulta de los tres tableros finales por el Rectorado (todas las carreras).
- Consulta de los tres tableros finales por el Decano (solo su facultad).

**Excluidas de la primera versión y justificación registrada:**
- Reemplazar un solo archivo sin volver a subir el conjunto: el conjunto del año es pequeño (unos seis archivos) y casi nunca se corrige un solo archivo después de la primera carga.
- Historial de publicaciones, comparar un cálculo con el anterior y conservar las anomalías entre cálculos: el autor no necesita demostrar qué vieron Rectorado y Decano en una fecha dada ni comparar cálculos, y el cálculo nuevo reemplaza al anterior.

**Mejoras futuras declaradas por el autor** (sin casos de uso): roles Webmaster y Visitante; gestión de usuarios; promedios institucionales para Decanato; que las autoridades vean las anomalías registradas; conexión directa a la base de datos de la institución; integración con el sistema de identidad institucional.

**Motivo de las exclusiones, en palabras del autor.** Los roles quedaron para después, cuando tengamos el backend; ahora solo tenemos usuarios de prueba. Lo mismo para la gestión de usuarios, las bases de datos y la identidad. Las anomalías visibles y los promedios institucionales no eran valores que yo había pensado antes: se nos ocurrieron durante este análisis, por lo que aún no puedo implementarlos ahora, pero sí en el futuro.

## 6. Secciones o pantallas previstas

Propuesta del autor de siete pantallas, revisada y aprobada por el autor junto con el resto del documento. La descripción de cada una se deriva solo de los casos de uso aprobados (CU1 a CU6, sección 7); lo que los casos dejan abierto se indica como pendiente. Por indicación del autor no se incluyen inicio de sesión ni gestión de usuarios. Una pantalla puede participar en varios casos y un caso puede recorrer varias pantallas.

| N.º | Pantalla | Quién la usa | Casos |
|---|---|---|---|
| P1 | Carga del año | Analista | CU1 |
| P2 | Estado del cálculo y publicación | Analista | CU1, CU2, CU4 |
| P3 | Tablero de fase | Analista | CU1, CU2, CU3 |
| P4 | Anomalías registradas | Analista | CU3 |
| P5 | Superávit y déficit | Rectorado y Decano | CU5, CU6 |
| P6 | Costo de clases | Rectorado y Decano | CU5, CU6 |
| P7 | Gestión docencia | Rectorado y Decano | CU5, CU6 |

### P1 · Carga del año
- **Propósito.** Iniciar el cálculo del año subiendo el conjunto de archivos.
- **Quién la usa.** Analista.
- **Información que muestra.** El año que se indica y los archivos del año. Si la comprobación previa falla, el mensaje que indica qué archivo o dato falta o falla.
- **Acciones que permite.** Indicar el año y subir todos los archivos del año a la vez. Para corregir, volver a subir el conjunto completo.
- **Casos relacionados.** CU1.
- **Pendiente.** Lista exacta de archivos y datos obligatorios (CU1).

### P2 · Estado del cálculo y publicación
- **Propósito.** Seguir el estado del cálculo del año, ver qué fases están revisadas y publicar.
- **Quién la usa.** Analista.
- **Información que muestra.** Si el cálculo se completó o se detuvo en una fase indicando qué control falló, y qué fases están marcadas como revisadas.
- **Acciones que permite.** Acceder al tablero de cada fase (P3) y publicar los resultados, solo cuando las seis fases están marcadas como revisadas.
- **Casos relacionados.** CU1, CU2, CU4.
- **Pendiente.** Si hay un paso de confirmación antes de publicar, si se puede retirar una publicación y si se avisa a Rectorado y Decano (CU4).

### P3 · Tablero de fase
- **Propósito.** Revisar el tablero de una de las seis fases para detectar anomalías.
- **Quién la usa.** Analista.
- **Información que muestra.** El tablero de la fase. Si un control falló, también los tableros de las fases ya calculadas, para buscar el origen del problema.
- **Acciones que permite.** Revisar el tablero, marcar la fase como revisada y registrar una anomalía que no se puede corregir.
- **Casos relacionados.** CU1, CU2, CU3.
- **Pendiente.** Contenido concreto del tablero y si muestra los resultados de los controles (ok, aviso, falla); si se puede quitar la marca de revisada (CU2); si se puede marcar una fase cuando el cálculo se detuvo por una falla (CU1, CU2).

### P4 · Anomalías registradas
- **Propósito.** Dejar visibles las anomalías de datos registradas del cálculo en curso.
- **Quién la usa.** Solo el analista; Rectorado y Decano no la ven.
- **Información que muestra.** Las anomalías registradas en el cálculo en curso.
- **Acciones que permite.** Ninguna decidida: editar o eliminar un registro es una pregunta abierta de CU3.
- **Casos relacionados.** CU3.
- **Pendiente.** Su ubicación: dónde y cómo ve el analista la lista de anomalías registradas es una pregunta abierta de CU3, por lo que esta pantalla podría cambiar de lugar o integrarse en otra. También los datos que tiene cada registro.

### P5, P6 y P7 · Tableros finales: superávit y déficit, costo de clases y gestión docencia
Son los tres tableros finales. Comparten comportamiento y se describen juntas; cada una muestra su propio tablero.
- **Propósito.** Que Rectorado y Decano consulten por su cuenta el tablero final publicado: P5, superávit y déficit; P6, costo de clases; P7, gestión docencia.
- **Quién las usa.** Rectorado y Decano, con alcance según el rol: Rectorado ve todas las carreras; el Decano ve solo las carreras de su facultad, y si no tiene facultad asignada no ve ninguna carrera.
- **Información que muestran.** El tablero final publicado por carrera, la fecha de publicación y, por defecto, el año en curso. Si no hay nada publicado, una etiqueta que indica que no existen datos procesados. No muestran los tableros de las fases ni las anomalías registradas.
- **Acciones que permiten.** Elegir entre los años publicados y descargar o exportar (el Decano, solo las carreras de su facultad). Solo Rectorado puede filtrar o agrupar por facultad.
- **Casos relacionados.** CU5, CU6.
- **Pendiente.** Qué significa "año en curso" y qué se muestra por defecto si no tiene nada publicado; si "filtrar o agrupar" es filtrar, agrupar o ambas (CU5); si una facultad puede tener varios Decanos o un Decano varias facultades y si ve algún total institucional (CU6); qué se descarga o exporta, en qué contenido y formato (CU5, CU6).

## 7. Casos de uso de la versión inicial

Los seis casos están en estado **aprobado** en AHK 3.0.0. El identificador es el slug del caso; AHK no devolvió un identificador numérico.

### Catálogo

| Ref. | Identificador (AHK) | Nombre | Actor | Objetivo | Archivo fuente | Versión aprobada |
|---|---|---|---|---|---|---|
| CU1 | cargar-archivos-anio-calculo-por-fases | Cargar los archivos del año y obtener el cálculo por fases | Analista | Subir el conjunto del año y obtener el cálculo por seis fases | docs/use-cases/cargar-archivos-anio-calculo-por-fases.md | 2026-10-26T02:27:17.038Z |
| CU2 | revisar-tableros-fase-detectar-anomalias | Revisar los tableros de cada fase para detectar anomalías | Analista | Detectar inconsistencias antes de publicar | docs/use-cases/revisar-tableros-fase-detectar-anomalias.md | 2026-10-26T02:01:49.961Z |
| CU3 | registrar-anomalia-datos-no-corregible | Registrar una anomalía de los datos que no se puede corregir | Analista | Dejar registrada y visible una anomalía no corregible | docs/use-cases/registrar-anomalia-datos-no-corregible.md | 2026-10-26T02:06:50.551Z |
| CU4 | publicar-resultados-del-anio | Publicar los resultados del año | Analista | Que Rectorado y Decano pasen a ver los tableros finales | docs/use-cases/publicar-resultados-del-anio.md | 2026-10-26T02:15:33.302Z |
| CU5 | consultar-tableros-finales-todas-carreras-rectorado | Consultar los tableros finales de todas las carreras (Rectorado) | Rectorado | Consultar los tres tableros finales de todas las carreras | docs/use-cases/consultar-tableros-finales-todas-carreras-rectorado.md | 2026-10-26T02:52:29.135Z |
| CU6 | consultar-tableros-finales-carreras-facultad-decano | Consultar los tableros finales de las carreras de su facultad (Decano) | Decano | Consultar los tres tableros finales de su facultad | docs/use-cases/consultar-tableros-finales-carreras-facultad-decano.md | 2026-10-26T02:57:44.045Z |

Los tres tableros finales son: superávit y déficit (un solo tablero), costo de clases y gestión docencia. Las seis fases del cálculo son: (1) contratos: sueldo de cada persona por periodo; (2) cargas: horas de clases de cada persona, incluida la que queda del periodo anterior; (3) costo de cada carga: el sueldo repartido entre las horas; (4) costo por categoría: ese costo agrupado por tipo de actividad; (5) gestión docencia: el costo de gestión por estudiante y carrera; (6) costo de clases y superávit o déficit por carrera.

### CU1 · cargar-archivos-anio-calculo-por-fases — Cargar los archivos del año y obtener el cálculo por fases

1. **Identificador y nombre.** cargar-archivos-anio-calculo-por-fases · Cargar los archivos del año y obtener el cálculo por fases.
2. **Actor principal y objetivo.** Analista de la Gerencia de Planificación Estratégica. Subir los archivos del año y obtener el cálculo completo, fase por fase, desde los contratos del personal hasta el costo por carrera y el superávit o déficit.
3. **Situación que lo inicia y condiciones previas.** El analista dispone del conjunto de archivos del año y decide cargarlo. Está identificado con rol de analista y tiene los seis archivos originales (contratos de admisiones y global, cargas CTP, planificación de clases, registros de estudiantes e histórico de contratos para el fondo de reserva). La lista exacta de archivos y datos obligatorios está pendiente; está por verificar si existen archivos mantenidos a mano que también deba subir.
4. **Pasos del recorrido principal.**
   1. El analista indica el año y sube todos los archivos del año a la vez.
   2. El sistema comprueba que estén todos los archivos y datos obligatorios.
   3. El sistema ejecuta las seis fases una tras otra, sin pausas intermedias, aplicando los controles de cada fase (cuadres entre totales). Cada control termina en ok, aviso o falla.
   4. Al terminar, quedan disponibles para el analista los resultados y el tablero de cada fase, listos para su revisión (CU2).
   5. Los resultados no son visibles para Rectorado ni Decano hasta que el analista los publique (CU4).
5. **Alternativas, errores y restricciones relevantes.**
   - Error de archivo (falta un archivo o dato obligatorio): se detecta antes de calcular; el sistema no calcula nada y muestra qué archivo o dato falla.
   - Falla de control: el sistema se detiene en esa fase, muestra qué control falló y no ejecuta las siguientes; el analista puede ver los tableros de las fases ya calculadas para buscar el origen. Un control con resultado aviso no detiene el cálculo.
   - Error de archivo y falla de control son comprobaciones distintas: el error se detecta antes de calcular y el control se evalúa sobre los resultados de una fase.
   - Anomalía de datos (datos procesables pero inconsistentes): no bloquea el cálculo; el analista las revisa en CU2.
   - Para corregir un archivo se vuelve a subir el conjunto completo y se recalcula todo. No se admiten cargas parciales.
   - El cálculo nuevo de un año sustituye al anterior; Rectorado y Decano siguen viendo lo último publicado hasta que se publique el nuevo.
   - Los registros de anomalías pertenecen al cálculo en curso; al recalcular, el analista vuelve a registrar las que sigan presentes.
   - Fuera de alcance: reemplazar un solo archivo, historial de publicaciones, comparar con el cálculo anterior, conservar anomalías entre cálculos, conexión directa a la base de datos, integración con identidad institucional, gestión de usuarios y roles Webmaster y Visitante.
6. **Resultado observable.** El analista ve que el cálculo del año se completó y dispone de los resultados y del tablero de cada fase; o ve un mensaje que indica qué archivo o dato falta, o qué control de qué fase falló.
7. **Criterios de aceptación.**
   - Dado un conjunto completo de archivos del año, cuando el analista indica el año y lo sube, entonces el sistema ejecuta las seis fases en secuencia y deja disponibles los resultados y el tablero de cada fase para el analista.
   - Dado un conjunto al que le falta un archivo o dato obligatorio, cuando el analista lo sube, entonces el sistema no calcula nada y muestra qué archivo o dato falla.
   - Dado que un control de una fase falla, cuando el sistema calcula, entonces se detiene en esa fase, indica qué control falló, no ejecuta las siguientes, y el analista puede ver los tableros de las fases ya calculadas.
   - Dado un control cuyo resultado es aviso, cuando el sistema calcula, entonces el cálculo continúa con las fases siguientes.
   - Dado un conjunto con anomalías de datos procesables, cuando el analista lo sube, entonces el sistema calcula igualmente y las anomalías quedan para revisión.
   - Dado un año con cálculo previo, cuando el analista sube un conjunto nuevo, entonces el cálculo nuevo reemplaza al anterior y Rectorado y Decano siguen viendo lo último publicado.
   - Dado un cálculo recién completado o recalculado, entonces Rectorado y Decano no lo ven hasta que se publique.

### CU2 · revisar-tableros-fase-detectar-anomalias — Revisar los tableros de cada fase para detectar anomalías

1. **Identificador y nombre.** revisar-tableros-fase-detectar-anomalias · Revisar los tableros de cada fase para detectar anomalías.
2. **Actor principal y objetivo.** Analista. Revisar los tableros de las seis fases y las anomalías de datos para detectar inconsistencias antes de publicar los resultados.
3. **Situación que lo inicia y condiciones previas.** Existe un cálculo del año completado (CU1). El analista tiene rol de analista y el cálculo tiene las seis fases completadas con sus tableros disponibles.
4. **Pasos del recorrido principal.**
   1. El analista abre el tablero de una fase.
   2. Lo revisa para detectar anomalías de datos (datos procesables con inconsistencias).
   3. Si no encuentra anomalías, o ya las trató, marca la fase como revisada.
   4. Repite para cada una de las seis fases.
   5. Con las seis fases marcadas como revisadas, el cálculo queda listo para publicarse (CU4).
5. **Alternativas, errores y restricciones relevantes.**
   - Anomalía corregible: el analista corrige el archivo y vuelve a subir el conjunto completo; se recalcula todo y las marcas de revisión se borran.
   - Anomalía no corregible, porque el dato de origen tiene la irregularidad: la deja registrada (CU3).
   - Si un control de una fase falló, el cálculo se detuvo en esa fase; el analista puede ver los tableros de las fases ya calculadas para buscar el origen, pero no hay cálculo completo que publicar.
   - La revisión se marca por fase y solo se puede publicar con las seis marcadas. Al recalcular se borran todas las marcas y se revisan de nuevo las seis fases.
   - Una anomalía de datos no impide calcular ni revisar; una falla de control sí detiene el cálculo.
   - Las anomalías registradas las ve solo el analista; Rectorado y Decano no las ven.
   - Fuera de alcance: comparar con el cálculo anterior, conservar marcas o anomalías entre cálculos, que las autoridades vean anomalías registradas, gestión de usuarios y roles.
6. **Resultado observable.** Cada una de las seis fases aparece como revisada y, cuando lo están todas, el cálculo queda listo para publicarse; o la revisión termina con una corrección (nuevo conjunto subido) o con una anomalía registrada.
7. **Criterios de aceptación.**
   - Dado un cálculo completado, cuando el analista abre el tablero de una fase, entonces puede revisarlo y marcar esa fase como revisada.
   - Dado un cálculo con las seis fases marcadas como revisadas, entonces el cálculo puede publicarse.
   - Dado un cálculo con alguna fase sin marcar, entonces no puede publicarse.
   - Dado un cálculo que se recalcula, entonces todas las marcas de revisión anteriores se borran y las seis fases quedan sin revisar.
   - Dada una anomalía corregible, cuando el analista sube de nuevo el conjunto completo, entonces se recalcula todo y debe revisar de nuevo.
   - Dada una anomalía no corregible, el analista puede dejarla registrada según CU3.
   - Dada una anomalía de datos procesable, entonces el cálculo ya se completó y la revisión puede realizarse (no se bloquea).

### CU3 · registrar-anomalia-datos-no-corregible — Registrar una anomalía de los datos que no se puede corregir

1. **Identificador y nombre.** registrar-anomalia-datos-no-corregible · Registrar una anomalía de los datos que no se puede corregir.
2. **Actor principal y objetivo.** Analista. Dejar registrada y visible una anomalía de datos cuyo dato de origen tiene la irregularidad y no se corrige, para que no se pierda (hoy esas inconsistencias no quedan registradas).
3. **Situación que lo inicia y condiciones previas.** Durante la revisión de los tableros (CU2), el analista encuentra una anomalía que no puede corregir en los archivos. Hay un cálculo del año completado, el analista tiene rol de analista y ha identificado una anomalía de datos procesable que no bloqueó el cálculo.
4. **Pasos del recorrido principal.**
   1. El analista identifica una anomalía que no se puede corregir porque el dato de origen tiene la irregularidad.
   2. La deja registrada.
   3. El registro queda guardado y visible para el analista.
5. **Alternativas, errores y restricciones relevantes.**
   - Si la anomalía sí se puede corregir, no se registra: el analista corrige el archivo y vuelve a subir el conjunto completo (CU1).
   - Fallos específicos: ninguno decidido (ver preguntas abiertas en la sección 8).
   - Las anomalías registradas las ve solo el analista; Rectorado y Decano no las ven (que las autoridades las vean es mejora futura).
   - Los registros pertenecen al cálculo en curso; si se recalcula, el analista vuelve a registrar las que sigan presentes.
   - Una anomalía de datos no impide calcular.
   - Fuera de alcance: conservar anomalías entre cálculos; que las autoridades las vean.
6. **Resultado observable.** Queda un registro de la anomalía, guardado y visible para el analista, dentro del cálculo en curso.
7. **Criterios de aceptación.**
   - Dada una anomalía no corregible, cuando el analista la registra, entonces el registro queda guardado y visible para el analista.
   - Dado un registro de anomalía, entonces Rectorado y Decano no lo ven.
   - Dado un cálculo que se recalcula, entonces los registros del cálculo anterior no se conservan y el analista debe volver a registrar los que sigan presentes.
   - Dada una anomalía corregible, entonces no se registra: se corrige y se vuelve a subir el conjunto.

### CU4 · publicar-resultados-del-anio — Publicar los resultados del año

1. **Identificador y nombre.** publicar-resultados-del-anio · Publicar los resultados del año.
2. **Actor principal y objetivo.** Analista. Hacer que Rectorado y Decano pasen a ver los tableros finales del año.
3. **Situación que lo inicia y condiciones previas.** El analista termina la revisión (las seis fases marcadas como revisadas) y decide publicar. Hay un cálculo del año completado y el analista tiene rol de analista.
4. **Pasos del recorrido principal.**
   1. El analista publica los resultados del año.
   2. El sistema pone a disposición de Rectorado y Decano los tres tableros finales: superávit y déficit, costo de clases y gestión docencia.
   3. Rectorado ve los de todas las carreras y cada Decano los de las carreras de su facultad (CU5 y CU6).
5. **Alternativas, errores y restricciones relevantes.**
   - Si se detecta una anomalía después de publicar, se vuelve a calcular y se publica de nuevo; mientras tanto Rectorado y Decano siguen viendo lo último publicado.
   - Si alguna fase no está marcada como revisada, no se puede publicar.
   - Rectorado y Decano no ven resultados hasta que el analista publica; solo el analista publica.
   - Una publicación nueva sustituye a la última publicada; no hay historial de publicaciones en la primera versión.
   - Un cálculo nuevo, mientras no se publique, no cambia lo que ven Rectorado y Decano.
   - La publicación incluye solo los tableros finales; los tableros de las fases no se publican y los ve solo el analista.
   - Fuera de alcance: historial de publicaciones; comparar con el cálculo anterior.
6. **Resultado observable.** Rectorado y Decano pasan a ver los tableros finales del año publicado.
7. **Criterios de aceptación.**
   - Dado un cálculo con las seis fases revisadas, cuando el analista publica, entonces Rectorado y Decano pasan a ver los tableros finales.
   - Dado un cálculo con alguna fase sin revisar, entonces no se puede publicar.
   - Dado un cálculo sin publicar, entonces Rectorado y Decano no ven sus resultados.
   - Dada una nueva publicación, entonces sustituye a la última publicada.
   - Dado un cálculo nuevo sin publicar, entonces Rectorado y Decano siguen viendo lo último publicado.
   - Dada una publicación, entonces Rectorado y Decano ven los tres tableros finales (superávit y déficit, costo de clases, gestión docencia) y no los tableros de las fases.

### CU5 · consultar-tableros-finales-todas-carreras-rectorado — Consultar los tableros finales de todas las carreras (Rectorado)

1. **Identificador y nombre.** consultar-tableros-finales-todas-carreras-rectorado · Consultar los tableros finales de todas las carreras (Rectorado).
2. **Actor principal y objetivo.** Rectorado (usuario con rol Rectorado, ya identificado). Consultar por su cuenta los tres tableros finales de todas las carreras, sin depender del analista.
3. **Situación que lo inicia y condiciones previas.** Rectorado necesita consultar los resultados. El analista ha publicado resultados del año y Rectorado está identificado con su rol.
4. **Pasos del recorrido principal.**
   1. Rectorado accede a los tableros finales.
   2. Ve por defecto el año en curso y puede elegir entre los años publicados.
   3. Ve los tres tableros finales (superávit y déficit, costo de clases y gestión docencia) de todas las carreras.
   4. Puede filtrar o agrupar por facultad.
   5. Puede descargar o exportar.
   6. Cada tablero muestra la fecha de publicación.
   7. Ve lo último publicado.
5. **Alternativas, errores y restricciones relevantes.**
   - Mientras se recalcula un cálculo nuevo, ve lo último publicado.
   - Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
   - No ve resultados sin publicar, ni los tableros de las fases, ni las anomalías registradas (que las autoridades las vean es mejora futura).
   - Ve todas las carreras, sin restricción por facultad; el filtro o la agrupación por facultad es opcional.
   - Fuera de alcance: promedios institucionales para Decanato, gestión de usuarios, roles Webmaster y Visitante, integración con identidad institucional.
6. **Resultado observable.** Rectorado ve los tres tableros finales publicados de todas las carreras.
7. **Criterios de aceptación.**
   - Dada una publicación, cuando Rectorado consulta, entonces ve los tres tableros finales de todas las carreras.
   - Dado un cálculo sin publicar, entonces Rectorado no lo ve.
   - Dado un cálculo nuevo en curso, entonces Rectorado sigue viendo lo último publicado.
   - Dadas anomalías registradas, entonces Rectorado no las ve.
   - Dada una publicación, entonces Rectorado no ve los tableros de las fases.
   - Dados uno o más años publicados, cuando Rectorado accede a los tableros finales, entonces ve por defecto el año en curso y puede elegir entre los años publicados.
   - Dados tableros finales publicados, cuando Rectorado filtra o agrupa por facultad, entonces ve los tableros según esa facultad.
   - Dados tableros finales publicados, cuando Rectorado descarga o exporta, entonces obtiene la descarga o exportación.
   - Dado que no hay nada publicado, cuando Rectorado accede a los tableros finales, entonces se muestra una etiqueta que indica que no existen datos procesados.
   - Dada una publicación, cuando Rectorado consulta un tablero, entonces el tablero muestra la fecha de publicación.

### CU6 · consultar-tableros-finales-carreras-facultad-decano — Consultar los tableros finales de las carreras de su facultad (Decano)

1. **Identificador y nombre.** consultar-tableros-finales-carreras-facultad-decano · Consultar los tableros finales de las carreras de su facultad (Decano).
2. **Actor principal y objetivo.** Decano (usuario con rol Decano y su facultad asignada, ya identificado). Consultar por su cuenta los mismos tres tableros finales que Rectorado, solo de las carreras de su facultad.
3. **Situación que lo inicia y condiciones previas.** El Decano necesita consultar los resultados. El analista ha publicado resultados del año y el Decano está identificado con su rol y tiene su facultad asignada (cómo se asigna es una decisión posterior).
4. **Pasos del recorrido principal.**
   1. El Decano accede a los tableros finales.
   2. Ve los tres tableros finales (superávit y déficit, costo de clases y gestión docencia) solo de las carreras de su facultad.
   3. Por defecto ve el año en curso y puede elegir entre los años publicados, siempre solo de las carreras de su facultad.
   4. Ve lo último publicado.
   5. Cada tablero muestra la fecha de publicación.
   6. Puede descargar o exportar, siempre solo de las carreras de su facultad.
5. **Alternativas, errores y restricciones relevantes.**
   - Mientras se recalcula un cálculo nuevo, ve lo último publicado.
   - Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
   - Si el Decano no tiene facultad asignada, no ve ninguna carrera (decisión de gobernanza).
   - No ve carreras de otras facultades, resultados sin publicar, tableros de las fases ni anomalías registradas.
   - No le aplica filtrar o agrupar por facultad, porque ya ve una sola facultad.
   - Fuera de alcance: promedios institucionales para Decanato, gestión de usuarios, integración con identidad institucional, roles Webmaster y Visitante.
6. **Resultado observable.** El Decano ve los tres tableros finales publicados solo de las carreras de su facultad.
7. **Criterios de aceptación.**
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

## 8. Decisiones y preguntas pendientes

Fuente: docs/proceso.md (decisiones D1 a D21). Solo se consideran confirmadas las decisiones y los casos aprobados.

### 8.1 Decisiones confirmadas

| Decisión | Contenido |
|---|---|
| D1 | Seis casos de uso. Rectorado y Decano van separados por tener una regla de acceso distinta; cada caso tiene un solo resultado observable. Las anomalías registradas las ve solo el analista |
| D2 | Cálculo de las seis fases todo seguido; si falla un control se detiene en esa fase y muestra cuál. Rectorado y Decano no ven resultados hasta que el analista publica. Si se corrige y se vuelve a subir, se recalcula todo; si se detecta una anomalía tras publicar, se recalcula y se publica de nuevo, y mientras tanto ven lo último publicado |
| D3 | Publicar los resultados del año es un caso aparte |
| D4 | El analista sube todo el conjunto del año de una vez; para corregir se vuelve a subir el conjunto completo |
| D5 | El cálculo nuevo reemplaza al anterior; las anomalías registradas pertenecen al cálculo en curso |
| D6 | El analista indica el año al subir; las seis fases y la semántica ok, aviso y falla de los controles; con un control en falla el analista ve los tableros de las fases ya calculadas |
| D7 | Proceso: el caso 1 se dejó en borrador y se avanzó al caso 2; el caso 1 se aprobó después (D14) |
| D8 | El analista marca cada fase como revisada y solo se publica con las seis marcadas |
| D9 | Al recalcular se borran todas las marcas de revisión |
| D10 | Orden de trabajo: primero cerrar tres preguntas (D11) y después revisar y aprobar los casos uno por uno |
| D11 | Los tableros finales son tres; la publicación incluye solo los tableros finales; un Decano sin facultad asignada no ve ninguna carrera |
| D12 | En CU5 y CU6 no ven los tableros de las fases; "superávit y déficit" es un solo tablero |
| D13 | Error de archivo y falla de control son comprobaciones distintas |
| D18 y D20 | Año en curso por defecto y elección entre años publicados; descargar o exportar; etiqueta si no hay nada publicado; fecha de publicación visible (el filtro o agrupación por facultad solo aplica a Rectorado) |
| D14, D15, D16, D17, D19, D21 | Aprobación explícita de CU1, CU2, CU3, CU4, CU5 y CU6, cada uno con la versión indicada en el catálogo |

### 8.2 Supuestos por validar

- Los tres actores ya están identificados con su usuario institucional y rol, y el Decano ya tiene su facultad asignada (D1). Cómo se logra queda como decisión posterior.
- Las cuatro dificultades del problema (errores manuales, demora, falta de consulta propia, dependencia del autor) son observaciones personales del autor, sin medición ni entrevistas.
- El conjunto de archivos del año son seis archivos originales; está por verificar si existen archivos mantenidos a mano que el analista deba subir.
- Los casos describen el comportamiento previsto y no se han contrastado con Rectorado ni con los Decanos.

### 8.3 Preguntas abiertas

La columna de impacto es una valoración preliminar por confirmar por el autor: ninguna pregunta afecta a quién usa el producto, a su objetivo central ni al resultado que debe producir. En las preguntas de CU1 y CU2, el autor indicó que se resuelven en la fase de reglas.

| Caso | Pregunta abierta | Casos afectados | ¿Impide cerrar el alcance? |
|---|---|---|---|
| CU1 | Lista exacta de archivos obligatorios y de datos obligatorios dentro de cada uno | CU1 | No: fase de reglas |
| CU1 | Controles concretos de cada fase (qué totales deben cuadrar) | CU1, CU2 | No: fase de reglas |
| CU1 | Si existen archivos mantenidos a mano, además de los seis originales, que el analista deba subir (el autor debe verificarlo) | CU1 | No, pero debe verificarse antes de la fase de reglas |
| CU2 | Contenido concreto del tablero de cada fase y si muestra los resultados ok, aviso y falla | CU2 | No: fase de reglas |
| CU2 | Si el analista puede quitar una marca de "revisada" antes de publicar | CU2, CU4 | No (valoración por confirmar) |
| CU2 | Si, con el cálculo detenido por una falla de control, puede marcar como revisadas las fases ya calculadas | CU1, CU2 | No (valoración por confirmar) |
| CU2 | Si el sistema exige haber abierto un tablero antes de marcarlo | CU2 | No (valoración por confirmar) |
| CU3 | Qué datos tiene un registro de anomalía; si se asocia a una fase concreta | CU3, CU2 | No (valoración por confirmar) |
| CU3 | Si el analista puede editar o eliminar un registro | CU3 | No (valoración por confirmar) |
| CU3 | Si registrar anomalías es obligatorio antes de marcar una fase como revisada o antes de publicar | CU3, CU2, CU4 | No (valoración por confirmar) |
| CU3 | Si puede registrar una anomalía antes de terminar de revisar las seis fases | CU3, CU2 | No (valoración por confirmar) |
| CU3 | Dónde y cómo ve el analista la lista de anomalías registradas | CU3 | No (valoración por confirmar) |
| CU3 | Qué ocurre si registra la misma anomalía dos veces | CU3 | No (valoración por confirmar) |
| CU4 | Si hay un paso de confirmación antes de publicar | CU4 | No (valoración por confirmar) |
| CU4 | Si se puede retirar o despublicar una publicación | CU4, CU5, CU6 | No (valoración por confirmar) |
| CU4 | Si se avisa a Rectorado y Decano cuando hay una publicación nueva | CU4, CU5, CU6 | No (valoración por confirmar) |
| CU4 | Si la publicación muestra fecha o identificación del cálculo publicado (CU5 y CU6 ya muestran la fecha de publicación) | CU4, CU5, CU6 | No (valoración por confirmar) |
| CU4 | Si hay varios años publicados a la vez y cómo se elige el año visible (D18 lo resuelve en parte para Rectorado) | CU4, CU5, CU6 | No (valoración por confirmar) |
| CU4 | Qué ocurre con lo publicado si un cálculo nuevo falla en una fase | CU1, CU4, CU5, CU6 | No (valoración por confirmar) |
| CU5 y CU6 | Qué significa "año en curso" (año calendario actual o último año publicado) y qué se muestra por defecto si no tiene nada publicado pero otros años sí | CU5, CU6 | No (valoración por confirmar) |
| CU5 | Si "filtrar o agrupar por facultad" significa filtrar, agrupar o ambas cosas | CU5 | No (valoración por confirmar) |
| CU5 y CU6 | Qué se descarga o exporta (contenido y formato) | CU5, CU6 | No (valoración por confirmar) |
| CU6 | Si una facultad puede tener más de un Decano o un Decano más de una facultad | CU6 | No (valoración por confirmar) |
| CU6 | Si ve algún total o referencia institucional para comparar (los promedios institucionales son mejora futura) | CU6 | No (valoración por confirmar) |

### 8.4 Tensiones detectadas entre casos

- CU4 dice que una publicación nueva sustituye a la última publicada, y CU5 y CU6 permiten elegir entre años publicados. No se ha decidido si "la última publicada" se refiere a cada año por separado. CU4 está aprobado y no se modificó; queda como pregunta abierta de CU4.
- La sección 3 de la consigna pide no añadir autenticación; los casos suponen usuarios ya identificados con rol. Se declara como supuesto en 8.2.

### 8.5 Propuestas pendientes

No hay propuestas pendientes de revisión: los borradores de CU3 a CU6 fueron redactados por el agente a partir de las decisiones D1 a D9 y el autor los revisó y aprobó uno por uno.

## 9. Decisiones propias y uso de IA

Trabajo individual (Elías Emilio Madrid Mosquera): no hay aportaciones de otros integrantes.

**Agente utilizado y comprobación de AHK 3.0.0.** Trabajé con Claude Code (modelo Sonnet 5.5) como agente coordinador (`lead`). Este agente no escribe archivos: delegó cada escritura a un subagente `builder`. Antes de empezar comprobé el entorno y no di nada por preparado. Ejecuté `ahk --version`, que devolvió `3.0.0`. Cargué la skill `ahk-use-case` y leí sus dos recursos, `workflow.md` y `template.md`. Revisé la raíz del proyecto y la configuración local (`agent-harness-kit.config.json`, la configuración local y `.mcp.json`). Hice una llamada real de lectura al MCP, `specs.list`, que devolvió la lista vacía (`items: []`). Con eso supe que el proyecto no tenía casos de uso previos.

**Decisiones propias y por qué.**
- **Seis casos de uso.** Separé a Rectorado y al Decano porque tienen una regla de acceso distinta: el Decano solo ve su facultad y eso necesita sus propios criterios de aceptación. Separé también la carga y el cálculo de la revisión, porque tienen resultados distintos. El registro de anomalías es un caso aparte porque su resultado es un registro que queda guardado. Más tarde añadí "publicar" como sexto caso, porque tiene un resultado propio: Rectorado y el Decano pasan a ver los tableros.
- **Todo el conjunto del año se sube de una vez.** El conjunto es pequeño (unos seis archivos) y casi nunca se corrige un solo archivo después de la primera carga.
- **El cálculo nuevo reemplaza al anterior.** No necesito demostrar qué vieron Rectorado y Decano en una fecha dada, ni comparar un cálculo con el anterior.
- **Revisión por fase.** Cada fase se marca como revisada y solo se publica con las seis marcadas. Si se recalcula, se borran todas las marcas.
- **Exclusión del alcance.** Dejé fuera de la primera versión el historial de publicaciones y la comparación entre cálculos. Los dos habrían exigido guardar versiones de cada cálculo, y no los necesito para el objetivo de esta fase. Quedan anotados como mejoras futuras, igual que reemplazar un solo archivo, conservar anomalías entre cálculos y los roles Webmaster y Visitante.

**Propuesta del agente que modifiqué.** El agente propuso cuatro casos: cargar, revisar, consulta de Rectorado y consulta de Decano. Propuso además unir a Rectorado y Decano en un solo caso con alcance según el rol. Rechacé esas opciones y elegí otra separación, con cinco casos. Después, al decidir cómo se publican los resultados, la amplié a seis. Como segunda alternativa que evalué y rechacé: al decidir qué pasa con las marcas de revisión al recalcular, el agente ofreció conservar las marcas de las fases que no cambiaron. La descarté porque obligaría a comparar con el cálculo anterior, que yo había dejado fuera.

**Recorrido principal.** El analista indica el año y sube los seis archivos a la vez. El sistema comprueba que estén los archivos y datos obligatorios y ejecuta las seis fases seguidas, aplicando los controles de cada una. El analista abre el tablero de cada fase, lo revisa y la marca como revisada. Con las seis marcadas, publica. Rectorado ve por defecto el año en curso con los tres tableros finales (superávit y déficit, costo de clases y gestión docencia). El Decano ve lo mismo, pero solo de las carreras de su facultad.

**Situación alternativa.** Si un control falla, el sistema se detiene en esa fase y el analista ve los tableros de las fases ya calculadas para buscar el origen. Si el analista encuentra una anomalía que se puede corregir, corrige el archivo y vuelve a subir el conjunto completo. Se recalcula todo y las marcas se borran. Si no se puede corregir, la deja registrada, y solo el analista la ve. Mientras se recalcula, Rectorado y Decano siguen viendo lo último publicado.

**Qué sigue sin validar.**
- Los seis casos están aprobados, pero con preguntas abiertas: la lista exacta de archivos y datos obligatorios, los controles concretos de cada fase, si hay archivos mantenidos a mano que el analista deba subir (lo tengo que verificar), el significado de "año en curso", y el formato y contenido de la exportación.
- Los casos describen el comportamiento previsto. No los he contrastado con Rectorado ni con los Decanos, y no hay nada implementado ni especificación técnica.
- La elección entre años publicados puede chocar con la regla de CU4 de que una publicación nueva sustituye a la anterior. No lo he resuelto.
- La validación de formato (`specs.validate`) la ejecutó el subagente y devolvió válido. Eso solo comprueba la estructura, no que los casos sean correctos.

**Ayuda recibida de la IA.** La IA hizo de facilitadora: formuló una pregunta de decisión por turno, explicó las opciones y sus consecuencias, y redactó los borradores con la plantilla. También señaló huecos que yo no había planteado, como qué pasa con las marcas al recalcular o el efecto de elegir entre años sobre CU4. No tomó decisiones ni aprobó nada. Cada aprobación la di yo, nombrando el caso y su versión. Cuando respondí solo "A", me pidió la frase completa antes de cambiar el estado. Dos redacciones suyas que yo no había pedido las revisé: el criterio de que Rectorado y Decano no ven los tableros de las fases, que conservé, y la duplicación de reglas en CU5. Las decisiones y sus motivos quedan registrados en `docs/proceso.md` (D1 a D21). También usé otro asistente de IA, en una conversación aparte, para analizar las opciones, redactar a partir de mis explicaciones el párrafo inicial con la descripción de mi idea y ayudarme a redactar mensajes para este agente. Las decisiones y sus motivos fueron míos.

## 10. Fuentes y comprobaciones de esta fase

**Archivos fuente e identificadores**

| Archivo | Identificador / versión |
|---|---|
| `docs/use-cases/cargar-archivos-anio-calculo-por-fases.md` | CU1, `last_updated` `2026-10-26T02:29:53.912Z` (aprobada la versión `2026-10-26T02:27:17.038Z`) |
| `docs/use-cases/revisar-tableros-fase-detectar-anomalias.md` | CU2, `2026-10-26T02:39:46.702Z` (aprobada `2026-10-26T02:01:49.961Z`) |
| `docs/use-cases/registrar-anomalia-datos-no-corregible.md` | CU3, `2026-10-26T02:44:32.344Z` (aprobada `2026-10-26T02:06:50.551Z`) |
| `docs/use-cases/publicar-resultados-del-anio.md` | CU4, `2026-10-26T02:47:46.336Z` (aprobada `2026-10-26T02:15:33.302Z`) |
| `docs/use-cases/consultar-tableros-finales-todas-carreras-rectorado.md` | CU5, `2026-10-26T02:54:27.786Z` (aprobada `2026-10-26T02:52:29.135Z`) |
| `docs/use-cases/consultar-tableros-finales-carreras-facultad-decano.md` | CU6, `2026-10-26T02:58:55.435Z` (aprobada `2026-10-26T02:57:44.045Z`) |
| `docs/proceso.md` | registro de decisiones D1 a D21 |
| `.claude/skills/ahk-use-case/` (`SKILL.md`, `resources/workflow.md`, `resources/template.md`) | skill y plantilla usadas |
| `agent-harness-kit.config.json`, `agent-harness-kit.config.local.json`, `.mcp.json` | configuración local leída |

Las marcas de versión están en UTC (2026-10-26).

**Referencias externas.** Se consultaron el registro de npm (requisitos de Node de AHK, Vite y pnpm) y el código publicado de AHK 3.0.0 y 3.2.0. El resto salió de las skills, de la configuración del proyecto y de las respuestas del autor.

**Comprobaciones**

| Comprobación | ¿Ejecutada? | Resultado | Límite |
|---|---|---|---|
| `ahk --version` | Sí (autor) | `3.0.0` | Confirma la versión del CLI que se ejecutó, nada más. |
| Versión de Node | Sí (autor) | El equipo tiene Node 24.21.0; la consigna pide la línea 22 o mayor, por lo que cumple. | Comprueba solo ese requisito. |
| Plantilla de Vite en el navegador | Sí (autor) | Se ejecutó `pnpm dev`; Vite arrancó en localhost:5173; se abrió la URL y se vio la plantilla. | Confirma el arranque inicial de React con Vite, no funcionalidades. |
| `ahk doctor` | Sí (autor) | Archivos del agente y skills correctos. Solo dos avisos que anuncian que existe la versión 3.2.0; no se cambió de versión porque la consigna exige la 3.0.0. | Diagnóstico del entorno y disponibilidad del flujo documental; no prueba las decisiones del producto. |
| Acceso real a `specs.*` | Sí | `specs.list` respondió sin error: primero con `items: []` y, al preparar este documento, con los seis casos en `approved`. | Prueba que el flujo documental responde, no que las decisiones del producto sean correctas. |
| Validación de los casos con AHK | Sí, por el subagente | `specs.validate` devolvió `{"valid":true,"errors":[]}` tras cada cambio; la última ejecución fue tras aprobar CU6. | No se repitió en la sesión del agente coordinador: es el resultado que informó el subagente. Valida todo `docs/use-cases` de una vez y solo comprueba formato. Los campos de relación (`sourceUseCases`, `relatedSpecs`) están vacíos: los casos se refieren entre sí solo en el texto. No prueba conveniencia pedagógica ni de negocio. |
| `ahk health` | Sí (autor): **falló** | Falló al lanzar `health.bat`, con el mensaje de que la ruta entre comillas no se reconoce como comando; el build no llegó a ejecutarse. La causa se identificó en el código de AHK 3.0.0: lanza el script con una orden de cmd.exe con las comillas mal escapadas en Windows; el código publicado de la 3.2.0 ya lo corrige. No se cambió de versión ni se modificó la configuración. | No hay comprobación del build a través de AHK. |
| `health.bat` ejecutado directamente | Sí (autor) | `tsc -b && vite build` terminó bien (20 módulos) y el código de salida fue 0. | No sustituye a `ahk health`; comprueba el build de la base, no funcionalidades futuras. |
| Lectura final del documento | Sí (autor) | El autor leyó el Markdown completo y lo aprobó. | Comprueba títulos, referencias y coherencia respecto de las decisiones. |

**Impacto de las comprobaciones.**
- **`ahk health` falló.** El build no se ejecutó a través de AHK, por un defecto de AHK 3.0.0 en Windows (comillas mal escapadas al lanzar `health.bat`), no por el proyecto. El build de la base sí se comprobó ejecutando `health.bat` directamente (código de salida 0), pero eso no sustituye a `ahk health`. La configuración del proyecto marca el health como requerido (`health.required: true`), así que, mientras el defecto persista, no puede darse por cumplido el control de salud de AHK con la versión 3.0.0 que exige la consigna. Se decidió no cambiar de versión ni modificar la configuración. Según el CLAUDE.md del proyecto, reclamar o cerrar una tarea del harness ejecuta el health automáticamente, por lo que este defecto podría afectar a ese flujo; en la sesión del agente coordinador no se reclamó ninguna tarea.
- **`ahk doctor`.** Sin impacto: los dos avisos solo anuncian la versión 3.2.0, y se mantiene la 3.0.0 por exigencia de la consigna.
- **Plantilla de Vite y Node.** Sin impacto: la plantilla arrancó y Node 24.21.0 cumple el requisito.
- **Lo demás.** La validación con AHK solo comprueba formato; la lectura final del Markdown completo la hizo y aprobó el autor. Nada de esto afecta al contenido de los casos de uso, que son documentos.
